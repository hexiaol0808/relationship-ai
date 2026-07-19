import { getAiProvider } from "@/lib/ai";
import { getSupabaseServerClient } from "@/lib/supabase";
import { validateAnswers, type Answers, type FTextInputs } from "@/lib/questions";
import { buildUserPrompt, parseReportJson, SYSTEM_PROMPT, PROMPT_VERSION } from "@/lib/report-prompt";
import { generateReportId } from "@/lib/report-id";

interface RequestBody {
  answers?: Answers;
  f_text_inputs?: FTextInputs;
  email?: string;
}

export async function POST(request: Request) {
  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "请求体不是合法 JSON" }, { status: 400 });
  }

  const answers = body.answers;
  const fTextInputs = body.f_text_inputs ?? {};
  const email = body.email?.trim() || null;

  if (!answers || typeof answers !== "object") {
    return Response.json({ error: "缺少 answers" }, { status: 400 });
  }

  const errors = validateAnswers(answers);
  if (errors.length > 0) {
    return Response.json({ error: "答案格式不合法", details: errors }, { status: 400 });
  }

  const userPrompt = buildUserPrompt(answers, fTextInputs);

  let reportJson: unknown;
  let modelUsed: string;
  try {
    const provider = getAiProvider();
    const result = await provider.generate({
      systemPrompt: SYSTEM_PROMPT,
      userPrompt,
      jsonMode: true,
      maxTokens: 8000,
    });
    reportJson = parseReportJson(result.text);
    modelUsed = result.modelUsed;
  } catch (err) {
    console.error("generate-report: AI generation failed", err);
    return Response.json({ error: "报告生成失败，请稍后重试" }, { status: 502 });
  }

  const report = reportJson as { modules?: unknown; summary?: unknown };
  if (!Array.isArray(report.modules) || typeof report.summary !== "string") {
    console.error("generate-report: unexpected report shape", reportJson);
    return Response.json({ error: "报告生成失败，请稍后重试" }, { status: 502 });
  }

  const supabase = getSupabaseServerClient();

  let reportId = generateReportId();
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const { error } = await supabase.from("reports").insert({
      report_id: reportId,
      email,
      answers,
      f_text_inputs: fTextInputs,
      full_report: reportJson,
      summary: report.summary,
      model_used: modelUsed,
      prompt_version: PROMPT_VERSION,
    });

    if (!error) {
      return Response.json({ report_id: reportId });
    }

    if (error.code === "23505" && attempt < maxAttempts) {
      reportId = generateReportId();
      continue;
    }

    console.error("generate-report: supabase insert failed", error);
    return Response.json({ error: "报告已生成，但保存失败，请稍后重试" }, { status: 500 });
  }

  return Response.json({ error: "报告已生成，但保存失败，请稍后重试" }, { status: 500 });
}
