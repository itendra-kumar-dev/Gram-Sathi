// GeminiService - placeholder for Google Gemini AI integration
// To enable: install @google/generative-ai and set GEMINI_API_KEY in .env

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate a crop or equipment recommendation using Gemini AI
 * @param {string} prompt - User query or context
 * @returns {Promise<string>} AI-generated response text
 */
const generateRecommendation = async (prompt) => {
  // Uncomment once @google/generative-ai is installed and GEMINI_API_KEY is set:
  //
  // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  // const result = await model.generateContent(prompt);
  // return result.response.text();

  throw new Error("Gemini service is not configured. Set GEMINI_API_KEY in .env and install @google/generative-ai.");
};

module.exports = { generateRecommendation };
