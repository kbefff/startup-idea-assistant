import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStartupIdea({
  domain,
  trend,
  audience,
}: {
  domain: string;
  trend: string;
  audience: string;
}) {
  const prompt = `
You are a startup strategist at a venture studio. 
Given the following parameters, generate a startup idea. The idea may operate in a known space, but it must include a **clearly differentiated angle, competitive advantage, or underserved need** that gives it a compelling reason to exist.

Domain: ${domain}
Trend: ${trend}
Target audience: ${audience}

Respond in **JSON format** with the following fields:
{
  "startupName": string,
  "elevatorPitch": string,
  "mvpFeatures": string[],
  "pricingModel": string,
  "competitiveEdge": string, // What makes this better, new, or different?
  "whyNow": string // Why this idea is especially relevant at this moment
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You generate startup ideas in structured JSON format." },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
    });

    const raw = completion.choices[0].message.content ?? "{}";
    const parsed = JSON.parse(raw);

    return { success: true, data: parsed };
  } catch (error: any) {
    console.error("GPT error:", error);
    return { success: false, error: error.message };
  }
}
