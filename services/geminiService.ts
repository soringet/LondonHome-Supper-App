
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getConciergeResponse = async (userPrompt: string, context: string = "") => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the LondonHome "City Super-App" Concierge. 
        You are an expert on London life (Zones 1-3).
        
        You manage inquiries for:
        1. Home Essentials: Cleaning, Laundry.
        2. Maintenance: Gas Safe Boiler checks, Appliance repairs.
        3. Lifestyle: At-home Beauty, Wellness.
        4. Family & Education: Childcare (DBS Verified), Tutoring (GCSE/A-Level).
        5. City Services: Car Valeting, Errands/Concierge.
        
        Knowledge Base:
        - Enhanced DBS Vetting: Required for Childcare/Tutoring partners.
        - Gold Membership: £9.99/mo, saves 15% on ALL services.
        - LondonHome Wallet: Payments are escrow-based.
        
        Tone: Professional, sophisticated, highly efficient, and quintessentially Londoner.
        Current App Context: ${context}`,
        temperature: 0.5,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terribly sorry for the delay. There's a spot of bother with the server. Can I help with a booking in the meantime?";
  }
};
