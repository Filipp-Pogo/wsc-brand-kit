import { MESSAGING_PILLARS } from "@/lib/brandData";
import { SectionHeader } from "@/pages/Home";

export default function MessagingPillars() {
  return (
    <div style={{ backgroundColor: "#1a1d21", padding: "80px 48px" }}>
      <SectionHeader
        label="10 — Brand Voice"
        title="Messaging Pillars"
        subtitle="The core narrative architecture. Every campaign, post, email, or sign should connect to at least one of these pillars."
        dark
      />

      <div className="mt-10 max-w-6xl space-y-6">
        {MESSAGING_PILLARS.map((pillar, i) => (
          <div
            key={pillar.pillar}
            style={{
              backgroundColor: "#22262b",
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: "#0f1114",
                padding: "20px 28px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#3b82f6",
                  backgroundColor: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  padding: "4px 10px",
                  flexShrink: 0,
                }}
              >
                Pillar {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                }}
              >
                {pillar.pillar}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#a0a5ad",
                  marginLeft: "auto",
                  flexShrink: 0,
                }}
              >
                {pillar.brand}
              </div>
            </div>

            {/* Body */}
            <div className="p-7 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#a0a5ad",
                    lineHeight: 1.65,
                    marginBottom: "16px",
                  }}
                >
                  {pillar.description}
                </p>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontStyle: "italic",
                    color: "#3b82f6",
                    borderLeft: "2px solid #3b82f6",
                    paddingLeft: "12px",
                    lineHeight: 1.5,
                  }}
                >
                  "{pillar.proofPoint}"
                </div>
              </div>

              <div className="lg:col-span-2">
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#a0a5ad",
                    marginBottom: "10px",
                  }}
                >
                  Sample Messages
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pillar.sampleMessages.map((msg, j) => (
                    <div
                      key={j}
                      style={{
                        backgroundColor: "#1a1d21",
                        border: "1px solid rgba(255,255,255,0.05)",
                        padding: "12px 14px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "#e8e8e8",
                        lineHeight: 1.5,
                        fontStyle: "italic",
                      }}
                    >
                      "{msg}"
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
