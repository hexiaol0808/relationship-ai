import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase";
import { isChangeModule, isTensionsModule, type Report, type ReportModule } from "@/lib/report-types";

interface ReportRow {
  report_id: string;
  summary: string;
  full_report: Report;
}

async function getReport(reportId: string): Promise<ReportRow | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("reports")
    .select("report_id, summary, full_report")
    .eq("report_id", reportId)
    .single();

  if (error || !data) return null;
  return data as unknown as ReportRow;
}

function ModuleCard({ module: m }: { module: ReportModule }) {
  if (isTensionsModule(m)) {
    return (
      <section className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{m.title}</h3>
        {m.tensions.length === 0 ? (
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{m.body}</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {m.tensions.map((t, i) => (
              <li key={i} className="rounded-xl bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                {t.body}
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  if (isChangeModule(m)) {
    return (
      <section className="flex flex-col gap-4 rounded-2xl border border-zinc-900 bg-zinc-50 p-5 dark:border-zinc-50 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{m.title}</h3>
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-zinc-50 dark:text-black">
            {m.g1_alignment}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{m.insight}</p>
        <dl className="flex flex-col gap-3 text-sm">
          <div>
            <dt className="font-medium text-zinc-500 dark:text-zinc-400">为什么会这样</dt>
            <dd className="mt-1 leading-relaxed text-zinc-700 dark:text-zinc-300">{m.function}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-500 dark:text-zinc-400">什么时候会开始失效</dt>
            <dd className="mt-1 leading-relaxed text-zinc-700 dark:text-zinc-300">{m.cost}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-500 dark:text-zinc-400">可以试试</dt>
            <dd className="mt-1 leading-relaxed text-zinc-700 dark:text-zinc-300">{m.practice}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-500 dark:text-zinc-400">7-14天后回顾</dt>
            <dd className="mt-1 leading-relaxed text-zinc-700 dark:text-zinc-300">{m.review}</dd>
          </div>
        </dl>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{m.title}</h3>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{m.body}</p>
    </section>
  );
}

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await getReport(id);
  if (!report) notFound();

  const modules = [...report.full_report.modules].sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-dvh bg-zinc-50 px-6 py-10 dark:bg-black">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col gap-3 rounded-2xl bg-zinc-900 p-6 text-center dark:bg-white">
          <p className="text-xs uppercase tracking-wide text-zinc-400 dark:text-zinc-500">你的关系操作系统说明书</p>
          <p className="text-lg font-medium leading-relaxed text-white dark:text-black">{report.summary}</p>
        </div>

        {modules.map((m) => (
          <ModuleCard key={m.id} module={m} />
        ))}

        <div className="flex flex-col gap-3 pt-4">
          <a
            href={`/report/${report.report_id}/opengraph-image`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            一键生成分享图
          </a>
          <p className="text-center text-xs text-zinc-400 dark:text-zinc-600">长按图片保存到相册</p>
          <Link
            href="/questionnaire"
            className="flex h-12 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
          >
            邀请 TA 也来测
          </Link>
        </div>
      </div>
    </div>
  );
}
