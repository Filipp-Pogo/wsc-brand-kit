import { ANTI_PATTERNS } from "@/lib/brandData";
import { SectionHeader } from "@/pages/Home";

export default function AntiPatterns() {
  return (
    <div style={{ backgroundColor: "#22262b", padding: "80px 48px" }}>
      <SectionHeader
        label="14 — Application"
        title="Anti-Patterns"
        subtitle="What we never do. These are the most common brand mistakes — each one dilutes the identity we've worked to build."
        dark
      />

      <div className="mt-10 max-w-6xl space-y-4">
        {ANTI_PATTERNS.map((ap, i) => (
          <div
            key={ap.pattern}
            style={{
              backgroundColor: "#1a1d21",
              borderTop: "1px solid rgba(239,68,68,0.15)",
              borderRight: "1px solid rgba(239,68,68,0.15)",
              borderBottom: "1px solid rgba(239,68,68,0.15)",
              borderLeft: "3px solid #ef4444",
              padding: "20px 24px",
            }}
          >
            <div className="flex items-start gap-4 flex-wrap">
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#ef4444",
                  backgroundColor: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  padding: "3px 8px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                ✗ Never
              </div>
              <div className="flex-1 min-w-0">
                <div
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    color: "#ffffff",
                    marginBottom: "6px",
                  }}
                >
                  {ap.pattern}
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "#a0a5ad",
                    lineHeight: 1.6,
                    marginBottom: ap.example ? "12px" : 0,
                  }}
                >
                  {ap.reason}
                </p>
                {ap.example && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      style={{
                        backgroundColor: "rgba(239,68,68,0.06)",
                        border: "1px solid rgba(239,68,68,0.15)",
                        padding: "10px 14px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "10px",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#ef4444",
                          marginBottom: "4px",
                        }}
                      >
                        ✗ Wrong
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#e8e8e8",
                          fontStyle: "italic",
                          lineHeight: 1.5,
                        }}
                      >
                        "{ap.example.wrong}"
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(34,197,94,0.06)",
                        border: "1px solid rgba(34,197,94,0.15)",
                        padding: "10px 14px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "10px",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#22c55e",
                          marginBottom: "4px",
                        }}
                      >
                        ✓ Right
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#e8e8e8",
                          fontStyle: "italic",
                          lineHeight: 1.5,
                        }}
                      >
                        "{ap.example.right}"
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#a0a5ad",
                  flexShrink: 0,
                }}
              >
                {ap.brand}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final note */}
      <div
        className="mt-10 max-w-6xl"
        style={{
          backgroundColor: "#0f1114",
          borderTop: "3px solid #3b82f6",
          borderRight: "1px solid rgba(59,130,246,0.2)",
          borderBottom: "1px solid rgba(59,130,246,0.2)",
          borderLeft: "1px solid rgba(59,130,246,0.2)",
          padding: "28px",
        }}
      >
        <div
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "18px",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            color: "#ffffff",
            marginBottom: "12px",
          }}
        >
          The Brand Is the Culture
        </div>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            color: "#a0a5ad",
            lineHeight: 1.7,
            maxWidth: "700px",
          }}
        >
          Every word, every sign, every post is a vote for the kind of organization we are. When the brand is consistent, it builds trust. When it's inconsistent, it creates confusion. The same discipline should show up in how we train, how we coach, and how we communicate.
        </p>
      </div>
    </div>
  );
}
