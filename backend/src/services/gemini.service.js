// import fetch from "node-fetch";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export async function explainWithGemini(insight) {
  if (!process.env.GEMINI_API_KEY) {
    return null; // Safe fallback
  }

  const prompt = `
Analyze the following portfolio data. 
Format output as:
1. Summary (1-2 sentences)
2. Patterns (bullet list)
3. Factors (bullet list)

Rules:
- Neutral financial tone
- Do NOT give investment advice
- Do NOT tell user to buy or sell
- Do NOT predict markets
- Focus on risk, exposure, and diversification concepts

Data:
${JSON.stringify(insight, null, 2)}
`;

  

  const res = await fetch(
    `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await res.json();

  return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
}
