import { ImageResponse } from "next/og";
import { getSupabaseServerClient } from "@/lib/supabase";

export const alt = "你的亲密关系说明书";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function getSummary(reportId: string): Promise<string | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("reports").select("summary").eq("report_id", reportId).single();
  if (error || !data) return null;
  return (data as { summary: string }).summary;
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const summary = (await getSummary(id)) ?? "一份更了解自己的关系操作系统说明书";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "96px",
          background: "linear-gradient(135deg, #18181b 0%, #3f3f46 100%)",
          color: "#fafafa",
          fontSize: 44,
          fontWeight: 600,
          lineHeight: 1.5,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 400, color: "#a1a1aa", marginBottom: 40 }}>
          你的亲密关系说明书
        </div>
        <div>{summary}</div>
      </div>
    ),
    { ...size }
  );
}
