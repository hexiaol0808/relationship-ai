import Anthropic from "@anthropic-ai/sdk";
import type { AiProvider, GenerateReportParams, GenerateReportResult } from "../types";

const MODEL = "claude-sonnet-5";

export const claudeProvider: AiProvider = {
  name: "claude",

  async generate({ systemPrompt, userPrompt, maxTokens }: GenerateReportParams): Promise<GenerateReportResult> {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not set");
    }

    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: maxTokens ?? 4096,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    return { text, modelUsed: MODEL };
  },
};
