export interface GenerateTextOptions {
  prompt: string;
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

export interface GenerateTextResponse {
  success: boolean;
  text?: string;
  error?: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}
