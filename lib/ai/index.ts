import type { AiProvider } from "./types";
import { claudeProvider } from "./providers/claude";

const providers: Record<string, AiProvider> = {
  claude: claudeProvider,
};

export function getAiProvider(): AiProvider {
  const name = process.env.AI_PROVIDER || "claude";
  const provider = providers[name];
  if (!provider) {
    throw new Error(
      `Unknown AI provider "${name}". Available: ${Object.keys(providers).join(", ")}`
    );
  }
  return provider;
}

export type { AiProvider, GenerateReportParams, GenerateReportResult } from "./types";
