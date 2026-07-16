export interface GenerateReportParams {
  systemPrompt: string;
  userPrompt: string;
}

export interface GenerateReportResult {
  text: string;
  modelUsed: string;
}

export interface AiProvider {
  name: string;
  generate(params: GenerateReportParams): Promise<GenerateReportResult>;
}
