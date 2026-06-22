const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

const getRecommendation =
  async (query) => {

    const prompt = `
You are an agricultural expert.

Detect the user's language.

Reply in the same language.

Farmer Query:
${query}

Provide:
1. Recommended Equipment
2. Estimated Cost
3. Benefits
4. Tips

Keep response simple.
`;

    const result =
      await model.generateContent(
        prompt
      );

    return result.response.text();
  };

module.exports = {
  getRecommendation,
};