/**
 * SignageExamples — Tier 1 Academy Golf Bay Reserved
 * Design: "The Performance Codex"
 * Brand rules applied:
 *   - Tier 1 palette: #1a1d21 bg, #e8e8e8 text, #3b82f6 accent
 *   - Oswald 700 uppercase for all primary sign text
 *   - Zero corner radius (brand rule: no rounded corners)
 *   - Tight negative letter-spacing on headlines
 *   - Blue accent line as the brand's primary visual anchor
 *   - Two formats: Door Placard (5"×7") and A-Frame Stake Post (12"×18")
 */

import { useState } from "react";
import { SectionHeader } from "@/pages/Home";
import { toast } from "sonner";

// ─── Sign data ────────────────────────────────────────────────────────────────
const SIGNS = [
  {
    id: "door-placard",
    formatLabel: "Format A",
    formatName: "Door Placard",
    dimensions: '5" × 7"',
    material: "Brushed aluminium panel",
    mounting: "Double-sided tape or magnetic strip",
    use: "Mounted directly on the bay door or divider post at eye level. Placed 30–60 min before session begins.",
    printSpec: "300 DPI · CMYK · No bleed required",
  },
  {
    id: "aframe",
    formatLabel: "Format B",
    formatName: "A-Frame / Stake Post",
    dimensions: '12" × 18"',
    material: "Coroplast or foam-core insert in a standard A-frame stand",
    mounting: "Floor-standing A-frame or outdoor ground stake",
    use: "Placed at the bay entrance or aisle. Visible from 20+ feet. Used for high-traffic or outdoor bay areas.",
    printSpec: "300 DPI · CMYK · 0.125\" bleed on all sides",
  },
];

// ─── Door Placard Mockup (5×7 ratio = 5:7) ───────────────────────────────────
function DoorPlacardMockup({ bayNumber }: { bayNumber: string }) {
  return (
    <div
      style={{
        width: "200px",
        height: "280px",
        backgroundColor: "#1a1d21",
        border: "1px solid rgba(255,255,255,0.12)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
        flexShrink: 0,
      }}
    >
      {/* Top blue accent bar */}
      <div style={{ height: "4px", backgroundColor: "#3b82f6", width: "100%" }} />

      {/* Subtle vertical stripe texture (right side) */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "35%",
          opacity: 0.04,
          background: "repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 6px)",
        }}
      />

      {/* Content */}
      <div
        style={{
          padding: "18px 16px 16px",
          height: "calc(100% - 4px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top: Brand label */}
        <div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#3b82f6",
              marginBottom: "10px",
            }}
          >
            Tier 1 Performance Academy
          </div>

          {/* Main headline */}
          <div
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "26px",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "#ffffff",
              lineHeight: 1.0,
            }}
          >
            GOLF BAY
          </div>
          <div
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "26px",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "#3b82f6",
              lineHeight: 1.0,
              marginBottom: "10px",
            }}
          >
            RESERVED
          </div>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: "10px" }} />

          {/* Status line */}
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#a0a5ad",
              lineHeight: 1.5,
            }}
          >
            Academy Training
            <br />
            In Progress
          </div>
        </div>

        {/* Bottom: Bay number + WSC sub-brand line */}
        <div>
          {/* Bay number badge */}
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(59,130,246,0.12)",
              border: "1px solid rgba(59,130,246,0.3)",
              padding: "4px 10px",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                color: "#3b82f6",
              }}
            >
              BAY {bayNumber}
            </span>
          </div>

          {/* Bottom brand line */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ height: "1px", flex: 1, backgroundColor: "rgba(255,255,255,0.06)" }} />
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "7px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#a0a5ad",
                whiteSpace: "nowrap",
              }}
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── A-Frame Mockup (12×18 ratio = 2:3) ──────────────────────────────────────
function AFrameMockup({ bayNumber }: { bayNumber: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
      {/* Sign panel */}
      <div
        style={{
          width: "200px",
          height: "300px",
          backgroundColor: "#1a1d21",
          border: "1px solid rgba(255,255,255,0.12)",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        {/* Top blue accent bar — thicker for large format */}
        <div style={{ height: "6px", backgroundColor: "#3b82f6", width: "100%" }} />

        {/* Subtle vertical stripe texture */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "30%",
            opacity: 0.04,
            background: "repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 8px)",
          }}
        />

        {/* Blue left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "6px",
            bottom: 0,
            width: "3px",
            backgroundColor: "#3b82f6",
            opacity: 0.6,
          }}
        />

        {/* Content */}
        <div
          style={{
            padding: "20px 20px 16px 22px",
            height: "calc(100% - 6px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            {/* Brand label */}
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "8px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#3b82f6",
                marginBottom: "14px",
              }}
            >
              Tier 1 Performance Academy
            </div>

            {/* Large headline — scaled for 12×18 */}
            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "36px",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                color: "#ffffff",
                lineHeight: 0.95,
              }}
            >
              GOLF
              <br />
              BAY
            </div>
            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "36px",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                color: "#3b82f6",
                lineHeight: 0.95,
                marginBottom: "14px",
              }}
            >
              RESERVED
            </div>

            {/* Divider */}
            <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: "12px" }} />

            {/* Status */}
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#a0a5ad",
                lineHeight: 1.6,
              }}
            >
              Academy Training
              <br />
              In Progress
            </div>
          </div>

          {/* Bottom section */}
          <div>
            {/* Bay number — large for far visibility */}
            <div
              style={{
                backgroundColor: "#3b82f6",
                padding: "8px 14px",
                display: "inline-block",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                }}
              >
                BAY {bayNumber}
              </span>
            </div>

            {/* Bottom brand line */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ height: "1px", flex: 1, backgroundColor: "rgba(255,255,255,0.06)" }} />
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "7px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#a0a5ad",
                  whiteSpace: "nowrap",
                }}
              >
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* A-frame legs */}
      <div style={{ display: "flex", gap: "120px", marginTop: "0" }}>
        <div
          style={{
            width: "3px",
            height: "40px",
            backgroundColor: "#4a4a4a",
            transform: "rotate(-12deg)",
            transformOrigin: "top center",
          }}
        />
        <div
          style={{
            width: "3px",
            height: "40px",
            backgroundColor: "#4a4a4a",
            transform: "rotate(12deg)",
            transformOrigin: "top center",
          }}
        />
      </div>
      {/* A-frame base */}
      <div
        style={{
          width: "160px",
          height: "2px",
          backgroundColor: "#4a4a4a",
          marginTop: "-4px",
        }}
      />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function SignageExamples() {
  const [bayNumber, setBayNumber] = useState("3");
  const [activeSign, setActiveSign] = useState<"door-placard" | "aframe">("door-placard");
  const [copied, setCopied] = useState(false);

  const copySpecs = () => {
    const sign = SIGNS.find((s) => s.id === activeSign)!;
    const text = `Tier 1 Academy Golf Bay Reserved — ${sign.formatName}\nDimensions: ${sign.dimensions}\nMaterial: ${sign.material}\nMounting: ${sign.mounting}\nPrint Spec: ${sign.printSpec}\nUsage: ${sign.use}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success("Sign specs copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const activeSigns = SIGNS.find((s) => s.id === activeSign)!;

  return (
    <div style={{ backgroundColor: "#0f1114", padding: "80px 48px" }}>
      <SectionHeader
        label="08 — Signage Examples"
        title="Reserved Bay Signs"
        subtitle="Physical signage for Tier 1 Academy Golf Bays. Placed at bay entrances before and during training sessions. Two approved physical formats — choose based on bay layout and visibility requirements."
        dark
      />

      {/* Format selector */}
      <div className="flex gap-2 mt-10 mb-10 flex-wrap">
        {SIGNS.map((sign) => (
          <button
            key={sign.id}
            onClick={() => setActiveSign(sign.id as any)}
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "10px 22px",
              backgroundColor: activeSign === sign.id ? "#3b82f6" : "transparent",
              color: activeSign === sign.id ? "#ffffff" : "#a0a5ad",
              border: `1px solid ${activeSign === sign.id ? "#3b82f6" : "rgba(255,255,255,0.12)"}`,
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
          >
            {sign.formatLabel} — {sign.formatName}
          </button>
        ))}
      </div>

      {/* Main layout: mockup + controls + specs */}
      <div className="flex flex-col lg:flex-row gap-12 items-start max-w-6xl">

        {/* Left: Mockup display */}
        <div
          className="flex flex-col items-center justify-center"
          style={{
            backgroundColor: "#1a1d21",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "48px 40px",
            minWidth: "320px",
            minHeight: "420px",
          }}
        >
          {/* Format label */}
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#a0a5ad",
              marginBottom: "28px",
            }}
          >
            {activeSigns.formatName} · {activeSigns.dimensions}
          </div>

          {/* Sign mockup */}
          {activeSign === "door-placard" ? (
            <DoorPlacardMockup bayNumber={bayNumber} />
          ) : (
            <AFrameMockup bayNumber={bayNumber} />
          )}

          {/* Scale note */}
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              color: "#a0a5ad",
              marginTop: "24px",
              letterSpacing: "0.05em",
            }}
          >
            Not to scale — for visual reference only
          </div>
        </div>

        {/* Right: Controls + Specs */}
        <div className="flex-1 min-w-0">

          {/* Bay number control */}
          <div style={{ marginBottom: "32px" }}>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#a0a5ad",
                marginBottom: "10px",
              }}
            >
              Bay Number
            </div>
            <div className="flex gap-2 flex-wrap">
              {["1", "2", "3", "4", "5", "6", "7", "8"].map((n) => (
                <button
                  key={n}
                  onClick={() => setBayNumber(n)}
                  style={{
                    width: "40px",
                    height: "40px",
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    backgroundColor: bayNumber === n ? "#3b82f6" : "rgba(255,255,255,0.04)",
                    color: bayNumber === n ? "#ffffff" : "#a0a5ad",
                    border: `1px solid ${bayNumber === n ? "#3b82f6" : "rgba(255,255,255,0.1)"}`,
                    cursor: "pointer",
                    transition: "all 120ms ease",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Print specifications */}
          <div
            style={{
              backgroundColor: "#1a1d21",
              borderTop: "3px solid #3b82f6",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              padding: "24px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "#ffffff",
                marginBottom: "16px",
              }}
            >
              Print Specifications
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Dimensions", value: activeSigns.dimensions },
                { label: "Material", value: activeSigns.material },
                { label: "Mounting", value: activeSigns.mounting },
                { label: "Print Spec", value: activeSigns.printSpec },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "10px" }}>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#3b82f6",
                      minWidth: "90px",
                      flexShrink: 0,
                      paddingTop: "1px",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      color: "#e8e8e8",
                      lineHeight: 1.5,
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usage guidance */}
          <div
            style={{
              backgroundColor: "rgba(59,130,246,0.06)",
              borderTop: "1px solid rgba(59,130,246,0.15)",
              borderRight: "1px solid rgba(59,130,246,0.15)",
              borderBottom: "1px solid rgba(59,130,246,0.15)",
              borderLeft: "3px solid #3b82f6",
              padding: "16px 18px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#3b82f6",
                marginBottom: "6px",
              }}
            >
              Usage
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "#a0a5ad",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {activeSigns.use}
            </p>
          </div>

          {/* Design rules */}
          <div
            style={{
              backgroundColor: "#1a1d21",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "20px 24px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "#ffffff",
                marginBottom: "12px",
              }}
            >
              Brand Rules Applied
            </div>
            <div className="flex flex-col gap-2">
              {[
                "Oswald 700 uppercase for all primary sign text",
                "Blue accent (#3b82f6) as the dominant visual anchor",
                "Zero corner radius — no rounded corners on any element",
                "Tight −0.02em letter-spacing on all headlines",
                "Charcoal #1a1d21 as primary background",
              ].map((rule) => (
                <div key={rule} className="flex items-start gap-2">
                  <div
                    style={{
                      width: "5px",
                      height: "5px",
                      backgroundColor: "#3b82f6",
                      flexShrink: 0,
                      marginTop: "5px",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      color: "#a0a5ad",
                      lineHeight: 1.5,
                    }}
                  >
                    {rule}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Copy specs button */}
          <button
            onClick={copySpecs}
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "12px 24px",
              backgroundColor: copied ? "rgba(59,130,246,0.15)" : "#3b82f6",
              color: copied ? "#3b82f6" : "#ffffff",
              border: `1px solid ${copied ? "#3b82f6" : "transparent"}`,
              cursor: "pointer",
              transition: "all 150ms ease",
              width: "100%",
            }}
          >
            {copied ? "✓ Specs Copied" : "Copy Print Specs"}
          </button>
        </div>
      </div>

      {/* Format comparison table */}
      <div style={{ marginTop: "64px", maxWidth: "6xl" }}>
        <div
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          Format Comparison
        </div>
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          {/* Header row */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr 1fr 1fr",
              backgroundColor: "#22262b",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {["", "Format A — Door Placard", "Format B — A-Frame / Stake Post"].map((h, i) => (
              <div
                key={i}
                style={{
                  padding: "12px 16px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: i === 0 ? "#a0a5ad" : "#3b82f6",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                {h}
              </div>
            ))}
          </div>
          {/* Data rows */}
          {[
            ["Dimensions", '5" × 7"', '12" × 18"'],
            ["Visibility Range", "1–5 feet", "10–25 feet"],
            ["Best For", "Bay door / divider post", "Bay entrance / aisle / outdoor"],
            ["Material", "Brushed aluminium", "Coroplast or foam-core"],
            ["Mounting", "Tape or magnetic strip", "A-frame stand or ground stake"],
            ["Print Cost", "Low", "Medium"],
          ].map(([label, a, b], i) => (
            <div
              key={label}
              className="grid"
              style={{
                gridTemplateColumns: "1fr 1fr 1fr",
                backgroundColor: i % 2 === 0 ? "#1a1d21" : "#1e2226",
                borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              {[label, a, b].map((cell, j) => (
                <div
                  key={j}
                  style={{
                    padding: "12px 16px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: j === 0 ? "#a0a5ad" : "#e8e8e8",
                    fontWeight: j === 0 ? 500 : 400,
                    borderRight: j < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
