import { SectionHeader } from "@/pages/Home";

export default function Typography() {
  return (
    <div>
      {/* Tier 1 Typography */}
      <div style={{ backgroundColor: "#22262b", padding: "80px 48px" }}>
        <SectionHeader
          label="05 — Visual Identity"
          title="Typography"
          subtitle="Two brands. Shared precision. Distinct emotional registers — one warm and welcoming, one sharp and performance-driven."
          dark
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 max-w-6xl">
          {/* Tier 1 */}
          <div
            style={{
              backgroundColor: "#1a1d21",
              borderTop: "3px solid #3b82f6",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              padding: "32px",
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#3b82f6",
                marginBottom: "20px",
              }}
            >
              Tier 1 Performance
            </div>

            {/* Display specimen */}
            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 5vw, 56px)",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                color: "#ffffff",
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              THE STANDARD
              <br />
              IS THE STANDARD
            </div>

            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "#a0a5ad",
                marginBottom: "24px",
              }}
            >
              Oswald 700 · Uppercase · -0.02em letter-spacing
            </div>

            {/* Body specimen */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "15px",
                color: "#e8e8e8",
                lineHeight: 1.65,
                marginBottom: "8px",
              }}
            >
              Every athlete, every relationship, every family matters. We place value on doing what is right — not what is easy.
            </p>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "#a0a5ad",
                marginBottom: "24px",
              }}
            >
              Inter 400 · 15px · 1.65 line-height
            </div>

            {/* Specs */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px" }}>
              {[
                { label: "Display Font", value: "Oswald" },
                { label: "Body Font", value: "Inter" },
                { label: "Heading Weight", value: "700 (Bold)" },
                { label: "Heading Style", value: "Uppercase" },
                { label: "Letter Spacing", value: "-0.02em on headings" },
                { label: "Hero Size", value: "96px tightly tracked" },
                { label: "Corner Radius", value: "0rem — zero rounding" },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between items-center py-2"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#a0a5ad" }}>
                    {spec.label}
                  </span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "#e8e8e8" }}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WSC */}
          <div
            style={{
              backgroundColor: "#e8e0d3",
              borderTop: "3px solid #4cabfd",
              borderRight: "1px solid rgba(0,0,0,0.08)",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              borderLeft: "1px solid rgba(0,0,0,0.08)",
              padding: "32px",
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#4cabfd",
                marginBottom: "20px",
              }}
            >
              Woodinville Sports Club
            </div>

            {/* Display specimen */}
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.025em",
                color: "#0e0a07",
                lineHeight: 1.1,
                marginBottom: "8px",
              }}
            >
              Elevate Your Game.
              <br />
              Enrich Your Life.
            </div>

            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "#84786f",
                marginBottom: "24px",
              }}
            >
              Inter 300 · 64px h1 · -1.6px letter-spacing
            </div>

            {/* Body specimen */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "15px",
                color: "#0e0a07",
                lineHeight: 1.65,
                marginBottom: "8px",
              }}
            >
              The culture is the product. Belonging fuels pride, commitment, and word of mouth — our most powerful growth driver.
            </p>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "#84786f",
                marginBottom: "24px",
              }}
            >
              Inter 400 · 15px · 1.65 line-height
            </div>

            {/* Specs */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "20px" }}>
              {[
                { label: "Primary Font", value: "Inter (all uses)" },
                { label: "Heading Weight", value: "300 (Light)" },
                { label: "h1 Size", value: "64px" },
                { label: "h2 Size", value: "38px" },
                { label: "Letter Spacing", value: "-1.6px at 64px" },
                { label: "Body Weight", value: "400 / 500" },
                { label: "Corner Radius", value: "0.125rem — near-sharp" },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between items-center py-2"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#84786f" }}>
                    {spec.label}
                  </span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "#0e0a07" }}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Type Scale */}
        <div className="mt-8 max-w-6xl">
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
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#3b82f6",
                marginBottom: "20px",
              }}
            >
              Tier 1 Type Scale
            </div>
            <div className="space-y-4">
              {[
                { label: "Hero / H1", sample: "THE STANDARD", style: { fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "clamp(40px, 6vw, 72px)", textTransform: "uppercase" as const, letterSpacing: "-0.02em", color: "#ffffff" }, spec: "Oswald 700 · 96px · -0.02em" },
                { label: "H2", sample: "PERFORMANCE IDENTITY", style: { fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "clamp(24px, 3vw, 48px)", textTransform: "uppercase" as const, letterSpacing: "-0.02em", color: "#ffffff" }, spec: "Oswald 700 · 48px" },
                { label: "H3", sample: "Two Divisions / One System", style: { fontFamily: "Oswald, sans-serif", fontWeight: 600, fontSize: "clamp(18px, 2vw, 28px)", textTransform: "uppercase" as const, letterSpacing: "-0.01em", color: "#e8e8e8" }, spec: "Oswald 600 · 28px" },
                { label: "Body", sample: "We hire top talent and never compromise standards. Excellence is not an exception here — it is the expectation.", style: { fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "15px", color: "#a0a5ad" }, spec: "Inter 400 · 15px · 1.65 line-height" },
                { label: "Label", sample: "DISCIPLINE · EXCELLENCE · ACCOUNTABILITY", style: { fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#3b82f6" }, spec: "Inter 600 · 12px · 0.12em" },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline gap-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "16px" }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a0a5ad", minWidth: "60px", flexShrink: 0 }}>
                    {item.label}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={item.style}>{item.sample}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a0a5ad", marginTop: "4px" }}>{item.spec}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
