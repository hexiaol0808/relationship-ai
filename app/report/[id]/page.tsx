import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase";
import type { Answers } from "@/lib/questions";
import type { Report } from "@/lib/report-types";
import Button from "@/app/components/Button";
import RelationshipCard from "./components/RelationshipCard";
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
    <div className="min-h-dvh bg-paper px-6 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <RelationshipCard summary={report.summary} answers={report.answers} />

        <div id="full-report" className="scroll-mt-6 pt-4">
          <p className="mb-4 text-center text-sm text-clay-dark">你的完整关系报告</p>
          <ReportModules modules={modules} answers={report.answers} />
        </div>

        <div className="flex flex-col items-center gap-3 pt-4">
          <Button
            href={`/report/${report.report_id}/opengraph-image`}
            target="_blank"
            rel="noopener noreferrer"
            className="!max-w-none"
          >
            一键生成分享图
          </Button>
          <p className="text-center text-xs text-ink-soft">长按图片保存到相册</p>
          <Button href="/questionnaire" variant="outline" className="!max-w-none">
            邀请 TA 也来测
          </Button>
        </div>
      </div>
    </div>
  );
}
