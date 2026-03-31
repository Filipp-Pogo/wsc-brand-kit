import { TAGLINES, VOCABULARY } from "@/lib/brandData";
import { SectionHeader } from "@/pages/Home";
import { toast } from "sonner";

export default function Taglines() {
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div>
      {/* Taglines */}
      <div style={{ backgroundColor: "#22262b", padding: "80px 48px" }}>
        <SectionHeader
          label="11 — Brand Voice"
          title="Taglines & Vocabulary"
          subtitle="Approved taglines, brand vocabulary, and the words we use (and avoid) across all communications."
          dark
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 max-w-6xl">
          {TAGLINES.map((brand) => (
            <div key={brand.brand}>
              <div
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#3b82f6",
                  marginBottom: "16px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {brand.brand}
              </div>
              <div className="space-y-3">
                {brand.lines.map((line) => (
                  <div
                    key={line.text}
                    className="group cursor-pointer"
                    onClick={() => copy(line.text)}
                    style={{
                      backgroundColor: "#1a1d21",
                      border: "1px solid rgba(255,255,255,0.06)",
                      padding: "16px 20px",
                      transition: "border-color 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div
                          style={{
                            fontFamily: brand.brand.includes("Tier 1") ? "Oswald, sans-serif" : "Inter, sans-serif",
                            fontWeight: brand.brand.includes("Tier 1") ? 700 : 300,
                            fontSize: brand.brand.includes("Tier 1") ? "20px" : "22px",
                            textTransform: brand.brand.includes("Tier 1") ? "uppercase" : "none",
                            letterSpacing: brand.brand.includes("Tier 1") ? "-0.01em" : "-0.02em",
                            color: "#ffffff",
                            marginBottom: "6px",
                            lineHeight: 1.2,
                          }}
                        >
                          {line.text}
                        </div>
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            color: "#a0a5ad",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                          }}
                        >
                          {line.usage}
                        </div>
                      </div>
                      <div
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "#3b82f6", flexShrink: 0, marginTop: "2px" }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vocabulary */}
      <div style={{ backgroundColor: "#1a1d21", padding: "60px 48px" }}>
        <div className="max-w-6xl">
          <div
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            Brand Vocabulary
          </div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              color: "#a0a5ad",
              marginBottom: "24px",
            }}
          >
            Words and phrases that define how we talk about ourselves — and what we avoid.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VOCABULARY.map((section) => (
              <div key={section.category}>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: section.type === "use" ? "#22c55e" : "#ef4444",
                    marginBottom: "10px",
                  }}
                >
                  {section.type === "use" ? "✓ Use" : "✗ Avoid"} — {section.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {section.words.map((word) => (
                    <span
                      key={word}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: section.type === "use" ? "#e8e8e8" : "#a0a5ad",
                        backgroundColor: section.type === "use" ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
                        border: `1px solid ${section.type === "use" ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
                        padding: "4px 10px",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
