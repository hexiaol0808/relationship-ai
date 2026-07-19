import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase";
import type { Answers } from "@/lib/questions";
import type { Report } from "@/lib/report-types";
import ReportModules from "./components/ReportModules";

interface ReportRow {
  report_id: string;
  summary: string;
  full_report: Report;
  answers: Answers;
}

async function getReport(reportId: string): Promise<ReportRow | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("reports")
    .select("report_id, summary, full_report, answers")
    .eq("report_id", reportId)
    .single();

  if (error || !data) return null;
  return data as unknown as ReportRow;
}

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await getReport(id);
  if (!report) notFound();

  const modules = [...report.full_report.modules].sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-dvh bg-cream px-6 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-rose-gold to-rose-gold-dark p-6 text-center shadow-sm">
          <p className="text-xs uppercase tracking-wide text-white/70">你的关系操作系统说明书</p>
          <p className="text-lg font-medium leading-relaxed text-white">{report.summary}</p>
        </div>

        <ReportModules modules={modules} answers={report.answers} />

        <div className="flex flex-col gap-3 pt-4">
          <a
            href={`/report/${report.report_id}/opengraph-image`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center rounded-full bg-rose-gold px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-rose-gold-dark"
          >
            一键生成分享图
          </a>
          <p className="text-center text-xs text-zinc-400">长按图片保存到相册</p>
          <Link
            href="/questionnaire"
            className="flex h-12 items-center justify-center rounded-full border border-rose-gold/40 px-6 text-sm font-medium text-rose-gold-dark"
          >
            邀请 TA 也来测
          </Link>
        </div>
      </div>
    </div>
  );
}
