const {
  getRecommendation,
} = require(
  "../services/geminiService"
);

const askAI =
  async (req, res) => {

    try {

      const { query } =
        req.body;

      if (!query) {

        return res.status(400)
          .json({
            success: false,
            message:
              "Query is required",
          });

      }

      const answer =
        await getRecommendation(
          query
        );

      res.status(200).json({
        success: true,
        answer,
      });

    } catch (error) {

      console.log("========== AI ERROR ==========");
      console.log(error);
      console.log("==============================");

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

module.exports = {
  askAI,
};