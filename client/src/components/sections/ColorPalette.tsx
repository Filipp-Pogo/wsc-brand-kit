import { useState } from "react";
import { TIER1_COLORS, WSC_COLORS } from "@/lib/brandData";
import { SectionHeader } from "@/pages/Home";
import { toast } from "sonner";

function tokenToVar(token: string): string {
  return "--" + token.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildCSSVars(colors: any[], prefix: string): string {
  const lines = [`/* ${prefix} Color Tokens */`, `:root {`];
  colors.forEach((c) => {
    if (c.hex && !c.hex.includes("rgba") && c.hex.length === 7) {
      lines.push(`  ${tokenToVar(c.token)}: ${c.hex};`);
    }
  });
  lines.push(`}`);
  return lines.join("\n");
}

function CSSExportButton({ dark = true }: { dark?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const tier1CSS = buildCSSVars(TIER1_COLORS, "Tier 1 Performance");
    const wscCSS = buildCSSVars(WSC_COLORS, "Woodinville Sports Club");
    const full = `${tier1CSS}\n\n${wscCSS}`;
    navigator.clipboard.writeText(full);
    setCopied(true);
    toast.success("CSS variables copied to clipboard");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        padding: "8px 18px",
        backgroundColor: copied ? "rgba(34,197,94,0.15)" : "rgba(59,130,246,0.12)",
        border: copied ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(59,130,246,0.35)",
        color: copied ? "#22c55e" : "#3b82f6",
        cursor: "pointer",
        transition: "all 200ms ease",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {copied ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          Copy as CSS Variables
        </>
      )}
    </button>
  );
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return { r, g, b };
}

function ColorSwatch({ color, dark = true }: { color: any; dark?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copyHex = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    toast.success(`Copied ${color.hex}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const rgb = hexToRgb(color.displayHex ? color.displayHex.replace("rgba(", "").split(",")[0] : color.hex);

  return (
    <div
      className="group cursor-pointer"
      onClick={copyHex}
      style={{
        border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)",
        overflow: "hidden",
        transition: "transform 150ms ease, box-shadow 150ms ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Color block */}
      <div
        style={{
          backgroundColor: color.hex,
          height: "80px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            opacity: copied ? 1 : 0,
            transition: "opacity 200ms ease",
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "#ffffff",
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            padding: "4px 10px",
          }}
        >
          ✓ Copied
        </div>
        <div
          className="group-hover:opacity-100"
          style={{
            position: "absolute",
            bottom: "6px",
            right: "8px",
            opacity: 0,
            transition: "opacity 150ms ease",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color.textColor} strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="0" ry="0" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </div>
      </div>

      {/* Info */}
      <div
        style={{
          padding: "12px",
          backgroundColor: dark ? "#22262b" : "#faf9f5",
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: dark ? "#a0a5ad" : "#84786f",
            letterSpacing: "0.05em",
            marginBottom: "4px",
            textTransform: "uppercase",
          }}
        >
          {color.token}
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: dark ? "#ffffff" : "#0e0a07",
            letterSpacing: "0.02em",
            marginBottom: "6px",
          }}
        >
          {color.hex}
        </div>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            color: dark ? "#a0a5ad" : "#84786f",
            lineHeight: 1.5,
          }}
        >
          {color.usage}
        </p>
      </div>
    </div>
  );
}

export default function ColorPalette() {
  return (
    <div>
      {/* Tier 1 Colors */}
      <div style={{ backgroundColor: "#1a1d21", padding: "80px 48px" }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <SectionHeader
            label="04 — Visual Identity"
            title="Color Palette"
            subtitle="Two distinct palettes. One shared accent. Click any swatch to copy the hex value."
            dark
          />
          <div className="pt-2 flex-shrink-0">
            <CSSExportButton dark />
          </div>
        </div>

        <div className="mt-8 mb-2">
          <div
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#3b82f6",
              marginBottom: "4px",
            }}
          >
            Tier 1 Performance
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad" }}>
            Cold, industrial, and intentional. Every color reinforces the performance-first identity.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-6 max-w-6xl">
          {TIER1_COLORS.map((color) => (
            <ColorSwatch key={color.token} color={color} dark />
          ))}
        </div>
      </div>

      {/* WSC Colors */}
      <div style={{ backgroundColor: "#e8e0d3", padding: "80px 48px" }}>
        <div className="max-w-3xl mb-8">
          <div
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#4cabfd",
              marginBottom: "4px",
            }}
          >
            Woodinville Sports Club
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4b4038" }}>
            Moves between warm dark tones and natural parchment tones. Premium without coldness — a physical home, not a performance lab.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-w-6xl">
          {WSC_COLORS.map((color) => (
            <ColorSwatch key={color.token} color={color} dark={false} />
          ))}
        </div>
      </div>

      {/* Shared rules */}
      <div style={{ backgroundColor: "#0d1b2a", padding: "48px 48px" }}>
        <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#3b82f6",
                marginBottom: "12px",
              }}
            >
              Shared Design Language
            </div>
            <ul className="space-y-2">
              {[
                "Sharp corner radii — Tier 1 uses 0rem, WSC uses 0.125rem. Neither brand uses rounded corners.",
                "Tight negative letter-spacing on headlines — both sites pull letterforms together.",
                "Inter as the shared body typeface — creates typographic unity.",
                "Warmed or cooled tones over pure black/white — neither brand uses #000000 or #ffffff as primary surfaces.",
                "Intentional whitespace — both sites breathe. Do not crowd surfaces.",
              ].map((rule, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "#a0a5ad",
                    lineHeight: 1.6,
                    paddingLeft: "12px",
                    borderLeft: "2px solid rgba(59,130,246,0.4)",
                  }}
                >
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#ef4444",
                marginBottom: "12px",
              }}
            >
              Never Mix
            </div>
            <ul className="space-y-2">
              {[
                "Do NOT use Oswald in WSC materials — wrong emotional register",
                "Do NOT use parchment/cream tones in Tier 1 materials — too soft for performance context",
                "Do NOT mix Tier 1's cold charcoal palette with WSC's warm tones in a single layout",
                "Do NOT introduce unrelated accent colors not present in the established palette",
                "Do NOT introduce rounded corners anywhere in either brand",
              ].map((rule, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "#a0a5ad",
                    lineHeight: 1.6,
                    paddingLeft: "12px",
                    borderLeft: "2px solid rgba(239,68,68,0.4)",
                  }}
                >
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
