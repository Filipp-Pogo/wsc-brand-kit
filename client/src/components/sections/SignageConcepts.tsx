import { SIGNAGE_CONCEPTS } from "@/lib/brandData";
import { SectionHeader } from "@/pages/Home";

export default function SignageConcepts() {
  return (
    <div style={{ backgroundColor: "#0d1b2a", padding: "80px 48px" }}>
      <SectionHeader
        label="07 — Visual Identity"
        title="Signage Concepts"
        subtitle="Physical brand expressions across the 67-acre WSC campus. Every sign reinforces the brand hierarchy: Tier 1 for performance spaces, WSC for community and facility spaces."
        dark
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 max-w-6xl">
        {SIGNAGE_CONCEPTS.map((sign) => (
          <div
            key={sign.name}
            style={{
              backgroundColor: "#1a1d21",
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            {/* Visual mockup */}
            <div
              style={{
                backgroundColor: sign.bgColor,
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px 28px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background texture lines for Tier 1 */}
              {sign.brand === "Tier 1" && (
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    top: "0",
                    bottom: "0",
                    width: "40%",
                    opacity: 0.05,
                    background: "repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 2px, transparent 2px, transparent 8px)",
                  }}
                />
              )}
              <div style={{ textAlign: sign.textAlign as any, zIndex: 1 }}>
                <div
                  style={{
                    fontFamily: sign.brand === "Tier 1" ? "Oswald, sans-serif" : "Inter, sans-serif",
                    fontWeight: sign.brand === "Tier 1" ? 700 : 300,
                    fontSize: sign.fontSize,
                    textTransform: sign.brand === "Tier 1" ? "uppercase" : "none",
                    letterSpacing: sign.brand === "Tier 1" ? "-0.02em" : "-0.02em",
                    color: sign.textColor,
                    lineHeight: 1.1,
                  }}
                >
                  {sign.mockupText}
                </div>
                {sign.mockupSubtext && (
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: sign.accentColor,
                      marginTop: "6px",
                    }}
                  >
                    {sign.mockupSubtext}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: "18px 20px" }}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                    fontSize: "15px",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    color: "#ffffff",
                  }}
                >
                  {sign.name}
                </div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#3b82f6",
                    backgroundColor: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    padding: "2px 7px",
                    flexShrink: 0,
                  }}
                >
                  {sign.brand}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "#a0a5ad",
                  lineHeight: 1.55,
                  marginBottom: "10px",
                }}
              >
                {sign.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {sign.specs.map((spec: string) => (
                  <span
                    key={spec}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      color: "#a0a5ad",
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "2px 8px",
                    }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
