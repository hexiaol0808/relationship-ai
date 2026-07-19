import { getAiProvider } from "@/lib/ai";

export async function GET() {
  const provider = getAiProvider();
  const result = await provider.generate({
    systemPrompt: "You reply with exactly one short sentence confirming you received this test message.",
    userPrompt: "ping",
    maxTokens: 20,
  });

  return Response.json({ provider: provider.name, ...result });
}
