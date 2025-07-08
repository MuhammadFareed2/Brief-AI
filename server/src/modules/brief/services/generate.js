import OpenAI from "openai";
import "dotenv/config";
import { saveBriefToDB } from "../db/generate.js";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

const generateBriefService = async (data, user) => {
    if (!process.env.OPENROUTER_API_KEY) {
        throw new Error("OpenRouter API key not set.");
    }

    const { rawBrief } = data;

    if (!rawBrief || !user.id) {
        throw new Error("Missing raw brief or userId.");
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-r1-0528:free",
            messages: [
                {
                    role: "system",
                    content: `
You are an expert project brief assistant.
Analyze the raw project brief text, find what’s missing (target audience, tone, deliverables, deadlines, KPIs),
generate clarifying questions, and rewrite a clean, bullet-point summary.
Respond ONLY with a valid JSON object in this format:
{
  "missingInfo": [],
  "clarifyingQuestions": [],
  "structuredBrief": ""
}
          `,
                },
                {
                    role: "user",
                    content: `Raw Project Brief:\n${rawBrief}`,
                },
            ],
            extra_headers: {
                "HTTP-Referer": "<YOUR_SITE_URL>", // optional
                "X-Title": "<YOUR_SITE_NAME>",     // optional
            },
        });

        // ✅ Safe parsing with cleanup for ```json fences
        let raw = completion.choices[0].message.content.trim();

        if (raw.startsWith("```")) {
            raw = raw.replace(/```[a-z]*\n?/gi, "").replace(/```$/gi, "").trim();
        }

        const parsed = JSON.parse(raw);

        const savedBrief = await saveBriefToDB(
            user.id,
            rawBrief,
            parsed.structuredBrief,
            parsed.missingInfo,
            parsed.clarifyingQuestions
        );

        return {
            savedBriefId: savedBrief._id,
            rawBrief,
            structuredBrief: parsed.structuredBrief,
            missingInfo: parsed.missingInfo,
            clarifyingQuestions: parsed.clarifyingQuestions,
        };

    } catch (error) {
        console.error("BriefAI Service Error:", error);
        throw error;
    }
};

export default generateBriefService;
