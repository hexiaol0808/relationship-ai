export interface GenerateReportParams {
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
  /** Ask the provider to constrain output to valid JSON, when it natively supports doing so. */
  jsonMode?: boolean;
}

export interface GenerateReportResult {
  text: string;
  modelUsed: string;
}

export interface AiProvider {
  name: string;
  generate(params: GenerateReportParams): Promise<GenerateReportResult>;
}
