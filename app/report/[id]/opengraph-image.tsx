import { ImageResponse } from "next/og";
import { getSupabaseServerClient } from "@/lib/supabase";
import type { Answers } from "@/lib/questions";
import { cp1Picks } from "@/lib/love-language-icons";
import { stripConstructCodes } from "@/lib/text";

export const alt = "Rela · 你的亲密关系说明书";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface ShareData {
  summary: string;
  answers: Answers;
}

async function getShareData(reportId: string): Promise<ShareData | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("reports").select("summary, answers").eq("report_id", reportId).single();
  if (error || !data) return null;
  return data as unknown as ShareData;
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getShareData(id);
  const summary = stripConstructCodes(data?.summary ?? "一份更了解自己的关系说明书");
  const loveLanguages = data?.answers ? cp1Picks(data.answers).map((p) => p.title) : [];

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
          padding: "80px",
          background: "#F8F6F2",
          fontSize: 28,
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#2F2B29" }}>你的关系说明书</div>

        <div
          style={{
            display: "flex",
            width: 320,
            height: 1,
            background: "#8E776A",
            margin: "36px 0",
          }}
        />

        <div style={{ display: "flex", fontSize: 40, fontStyle: "italic", color: "#8E776A", marginBottom: 20 }}>
          Rela
        </div>

        {loveLanguages.length > 0 && (
          <div style={{ display: "flex", gap: 24, marginBottom: 8 }}>
            {loveLanguages.map((title) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#FAF8F5",
                  borderRadius: 999,
                  padding: "10px 24px",
                  fontSize: 26,
                  color: "#554D47",
                }}
              >
                <span>{title}</span>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            display: "flex",
            width: 320,
            height: 1,
            background: "#8E776A",
            margin: "36px 0",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 800 }}>
          <div style={{ display: "flex", justifyContent: "center", fontSize: 24, color: "#786356" }}>你在关系中：</div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 600, color: "#2F2B29", lineHeight: 1.5 }}>
            “{summary}”
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: 320,
            height: 1,
            background: "#8E776A",
            margin: "36px 0",
          }}
        />

        <div style={{ display: "flex", fontSize: 22, color: "#786356" }}>来自 · Rela 关系雕塑家</div>
      </div>
    ),
    { ...size }
  );
}
