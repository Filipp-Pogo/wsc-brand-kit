import { BRAND_ARCHITECTURE, LOGOS } from "@/lib/brandData";
import { SectionHeader } from "@/pages/Home";

export default function BrandArchitecture() {
  return (
    <div style={{ backgroundColor: "#22262b", padding: "80px 48px" }}>
      <SectionHeader
        label="01 — Foundation"
        title="Brand Architecture"
        subtitle="Two public-facing brands. One performance identity. Clear lanes. Tier 1 is the performance brand. WSC is the platform it lives on."
        dark
      />

      {/* WHAT WE DO — Plain-language context for new team members and vendors */}
      <div
        className="mt-10 mb-8 max-w-6xl"
        style={{
          backgroundColor: "rgba(59,130,246,0.07)",
          borderLeft: "3px solid #3b82f6",
          padding: "20px 24px",
        }}
      >
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3b82f6", marginBottom: "8px" }}>
          Context — What We Do
        </div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#e8e8e8", lineHeight: 1.75, margin: 0 }}>
          <strong style={{ color: "#ffffff" }}>Tier 1 Performance</strong> is a full-time tennis and golf performance academy for youth athletes, operating inside{" "}
          <strong style={{ color: "#ffffff" }}>Woodinville Sports Club (WSC)</strong> — a 67-acre sports campus in Woodinville, WA. Tier 1 athletes train daily in the{" "}
          <strong style={{ color: "#ffffff" }}>Athletic Performance Lab (APL)</strong>, a dedicated Strength &amp; Conditioning (S&amp;C) facility, alongside sport-specific court and course training. The program’s goal is competitive development and college placement. WSC is the physical home — a broader community sports club that also serves recreational members and families. These are two separate brands sharing one campus.
        </p>
      </div>

      <div className="mt-0 grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl">
        {BRAND_ARCHITECTURE.map((brand) => (
          <div
            key={brand.brand}
            className="relative overflow-hidden"
            style={{
              backgroundColor: brand.color,
              border: brand.restricted ? "1px solid rgba(201,168,76,0.4)" : "1px solid rgba(255,255,255,0.06)",
              padding: "28px",
            }}
          >
            {brand.restricted && (
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  backgroundColor: "rgba(201,168,76,0.12)",
                  border: "1px solid rgba(201,168,76,0.5)",
                  color: "#c9a84c",
                  fontSize: "10px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  padding: "3px 8px",
                  textTransform: "uppercase",
                }}
              >
                Investor / Partner Only
              </div>
            )}

            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: brand.accentColor,
                marginBottom: "8px",
              }}
            >
              {brand.role}
            </div>

            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "22px",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                color: brand.textColor,
                marginBottom: "12px",
                lineHeight: 1.1,
              }}
            >
              {brand.brand}
            </div>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: brand.textColor,
                opacity: 0.75,
                lineHeight: 1.65,
                marginBottom: "16px",
              }}
            >
              {brand.description}
            </p>

            <div
              style={{
                display: "inline-block",
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                fontStyle: "italic",
                color: brand.accentColor,
                borderLeft: `2px solid ${brand.accentColor}`,
                paddingLeft: "10px",
              }}
            >
              "{brand.tagline}"
            </div>
          </div>
        ))}
      </div>

      {/* Architecture diagram */}
      <div className="mt-10 max-w-6xl">
        <div
          style={{
            backgroundColor: "#1a1d21",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "28px",
          }}
        >
          <div
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#3b82f6",
              marginBottom: "20px",
            }}
          >
            The Relationship
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            {[
              { label: "TIER 1 PERFORMANCE", sub: "Performance Brand", bg: "#1a1d21", text: "#ffffff", note: "Tennis + Golf academies" },
              { label: "+", bg: "transparent", text: "#3b82f6", sub: "" },
              { label: "APL", sub: "Athletic Performance Lab", bg: "#0d1b2a", text: "#ffffff", note: "S&C sub-brand under Tier 1" },
              { label: "+", bg: "transparent", text: "#3b82f6", sub: "" },
              { label: "WSC", sub: "Platform & Facility", bg: "#0a0704", text: "#e8e0d3", note: "67-acre campus, Woodinville WA" },
            ].map((item, i) =>
              item.label === "→" || item.label === "+" ? (
                <span key={i} style={{ color: item.text, fontSize: "20px", fontWeight: 700 }}>{item.label}</span>
              ) : (
                <div
                  key={i}
                  style={{
                    backgroundColor: item.bg,
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "12px 16px",
                    minWidth: "160px",
                  }}
                >
                  <div style={{ color: item.text, fontWeight: 700, fontSize: "13px", letterSpacing: "0.05em" }}>
                    {item.label}
                  </div>
                  {item.sub && <div style={{ color: "#a0a5ad", fontSize: "11px", marginTop: "2px" }}>{item.sub}</div>}
                  {item.note && <div style={{ color: "#3b82f6", fontSize: "10px", marginTop: "4px" }}>{item.note}</div>}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
