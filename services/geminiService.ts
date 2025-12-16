import { GoogleGenAI } from "@google/genai";

// Initialize the API client
// Note: process.env.API_KEY is assumed to be available and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLoveNote = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Write a very short, unique, and poetic love note specifically for someone named Jana (max 20 words). Do not use quotes. Keep it lowercase and aesthetic.',
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Minimize latency
        temperature: 1.2, // High creativity
      }
    });

    return response.text?.trim() || "you are my favorite thought.";
  } catch (error) {
    console.error("Failed to generate love note:", error);
    // Fallback if API fails (e.g., quota or network issues)
    return "jana, in every universe, i would find you.";
  }
};