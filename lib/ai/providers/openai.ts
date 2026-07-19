import OpenAI from "openai";
import type { AiProvider, GenerateReportParams, GenerateReportResult } from "../types";

const MODEL = "gpt-4o";

export const openaiProvider: AiProvider = {
  name: "openai",

  async generate({ systemPrompt, userPrompt, maxTokens, jsonMode }: GenerateReportParams): Promise<GenerateReportResult> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    const client = new OpenAI({ apiKey });
    const response = await client.chat.completions.create({
      model: MODEL,
      max_completion_tokens: maxTokens,
      response_format: jsonMode ? { type: "json_object" } : undefined,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const text = response.choices[0]?.message?.content ?? "";

    return { text, modelUsed: MODEL };
  },
};
