export interface GenerateReportParams {
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
}

export interface GenerateReportResult {
  text: string;
  modelUsed: string;
}

export interface AiProvider {
  name: string;
  generate(params: GenerateReportParams): Promise<GenerateReportResult>;
}
