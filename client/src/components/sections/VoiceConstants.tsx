import { VOICE_CONSTANTS } from "@/lib/brandData";
import { SectionHeader } from "@/pages/Home";

export default function VoiceConstants() {
  return (
    <div style={{ backgroundColor: "#22262b", padding: "80px 48px" }}>
      <SectionHeader
        label="08 — Brand Voice"
        title="Voice Constants"
        subtitle="These traits never change — regardless of channel, audience, or context. They are the non-negotiable DNA of how both brands communicate."
        dark
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 max-w-6xl">
        {VOICE_CONSTANTS.map((vc, i) => (
          <div
            key={vc.trait}
            style={{
              backgroundColor: "#1a1d21",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              borderLeft: "3px solid #3b82f6",
              padding: "24px",
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                }}
              >
                {vc.trait}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#3b82f6",
                  backgroundColor: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  padding: "3px 8px",
                  flexShrink: 0,
                }}
              >
                {vc.brand}
              </div>
            </div>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: "#a0a5ad",
                lineHeight: 1.65,
                marginBottom: "16px",
              }}
            >
              {vc.description}
            </p>

            {/* Examples */}
            <div className="space-y-2">
              {vc.examples.map((ex, j) => (
                <div
                  key={j}
                  style={{
                    backgroundColor: "#22262b",
                    border: "1px solid rgba(255,255,255,0.04)",
                    padding: "10px 14px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: ex.type === "do" ? "#22c55e" : "#ef4444",
                      marginBottom: "4px",
                    }}
                  >
                    {ex.type === "do" ? "✓ Do" : "✗ Don't"}
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
                    "{ex.text}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
