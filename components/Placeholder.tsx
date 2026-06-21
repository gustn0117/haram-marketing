import { IconImage } from "@/components/icons";

/* 빗금(대각선 해치) 이미지 플레이스홀더 — 실제 사진 확보 시 교체.
   부모가 position: relative 여야 함 (absolute inset-0로 채움). */
export function Placeholder({
  tone = "light",
  label,
}: {
  tone?: "light" | "dark";
  label?: string;
}) {
  const dark = tone === "dark";
  const line = dark ? "rgba(255,255,255,0.10)" : "rgba(13,27,46,0.14)";
  const bg = dark ? "#0d1b2e" : "#eceef1";

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
      style={{
        backgroundColor: bg,
        backgroundImage: `repeating-linear-gradient(45deg, ${line} 0, ${line} 1px, transparent 1px, transparent 12px)`,
      }}
    >
      {label ? (
        <span
          className={`inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-xs ${
            dark
              ? "border border-white/20 bg-ink/40 text-white/75"
              : "border border-line-strong bg-ink/70 text-faint"
          }`}
        >
          <IconImage className="h-4 w-4" />
          {label}
        </span>
      ) : null}
    </div>
  );
}
