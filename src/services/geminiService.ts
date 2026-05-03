import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

function getAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

export async function getTattooInspiration(title: string, category: string, artist: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert tattoo historian and artist at 'Canvas of Dreams Tattoo Studio'. 
      Provide a brief, poetic, and insightful description (about 3-4 sentences) of the tattoo style and possible inspiration for a piece titled "${title}". 
      The style category is "${category}" and it was created by the artist "${artist}".
      Focus on the artistic techniques, cultural significance (if applicable), and the emotional mood the piece evokes.
      Keep the tone sophisticated and inspiring.`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Could not fetch insights at this time.");
  }
}
