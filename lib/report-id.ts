import { randomBytes } from "crypto";

/** 生成一个短随机 report_id（10位小写十六进制），用于专属链接 /report/{id}。 */
export function generateReportId(): string {
  return randomBytes(5).toString("hex");
}
