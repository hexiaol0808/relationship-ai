import { ImageResponse } from "next/og";
import { getSupabaseServerClient } from "@/lib/supabase";
import { getQuestion, type Answers } from "@/lib/questions";
import { iconForTitle } from "@/lib/love-language-icons";

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

function cp1Titles(answers: Answers | undefined): string[] {
  if (!answers) return [];
  const ans = answers["q1"];
  if (!ans || !("first" in ans)) return [];
  const question = getQuestion(1);
  return [ans.first, ans.second]
    .map((letter) => question.options.find((o) => o.letter === letter)?.title)
    .filter((t): t is string => Boolean(t));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getShareData(id);
  const summary = data?.summary ?? "一份更了解自己的关系操作系统说明书";
  const loveLanguages = cp1Titles(data?.answers);

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
          background: "linear-gradient(135deg, #FFF9F7 0%, #FBE7E4 60%, #FDE3D0 100%)",
          fontSize: 28,
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#3f3f46" }}>你的关系说明书</div>

        <div
          style={{
            display: "flex",
            width: 320,
            height: 2,
            background: "#C98A93",
            margin: "36px 0",
          }}
        />

        <div style={{ display: "flex", fontSize: 56, marginBottom: 20 }}>❤️</div>

        {loveLanguages.length > 0 && (
          <div style={{ display: "flex", gap: 24, marginBottom: 8 }}>
            {loveLanguages.map((title) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#ffffff",
                  borderRadius: 999,
                  padding: "10px 24px",
                  fontSize: 26,
                  color: "#52525b",
                }}
              >
                <span>{iconForTitle(title)}</span>
                <span>{title}</span>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            display: "flex",
            width: 320,
            height: 2,
            background: "#C98A93",
            margin: "36px 0",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 800 }}>
          <div style={{ display: "flex", justifyContent: "center", fontSize: 24, color: "#a8677a" }}>你在关系中：</div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 600, color: "#3f3f46", lineHeight: 1.5 }}>
            “{summary}”
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: 320,
            height: 2,
            background: "#C98A93",
            margin: "36px 0",
          }}
        />

        <div style={{ display: "flex", fontSize: 22, color: "#a8677a" }}>来自 · Rela 关系雕塑家</div>
      </div>
    ),
    { ...size }
  );
}
