import type { AiProvider } from "./types";
import { claudeProvider } from "./providers/claude";
import { openaiProvider } from "./providers/openai";

const providers: Record<string, AiProvider> = {
  claude: claudeProvider,
  openai: openaiProvider,
};

export function getAiProvider(): AiProvider {
  const name = process.env.AI_PROVIDER || "openai";
  const provider = providers[name];
  if (!provider) {
    throw new Error(
      `Unknown AI provider "${name}". Available: ${Object.keys(providers).join(", ")}`
    );
  }
  return provider;
}

export type { AiProvider, GenerateReportParams, GenerateReportResult } from "./types";
