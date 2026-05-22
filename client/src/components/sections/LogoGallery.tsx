import { useState } from "react";
import { LOGOS } from "@/lib/brandData";
import { SectionHeader } from "@/pages/Home";
import { toast } from "sonner";

const WSC_LOGOS = [
  {
    name: "Full Logo — Black on White",
    url: LOGOS.wsc.fullBlackWhite,
    bg: "#ffffff",
    label: "Primary",
    usage: "Default usage on white/light backgrounds",
  },
  {
    name: "Full Logo — Black on Transparent",
    url: LOGOS.wsc.fullBlackTransparent,
    bg: "#f0f0f0",
    label: "Transparent",
    usage: "Documents, overlays on light surfaces",
  },
  {
    name: "Full Logo — White on Black",
    url: LOGOS.wsc.fullWhiteBlack,
    bg: "#000000",
    label: "Reversed",
    usage: "Dark backgrounds, print on dark stock",
  },
  {
    name: "Full Logo — White on Transparent",
    url: LOGOS.wsc.fullWhiteTransparent,
    bg: "#1a1d21",
    label: "Reversed Transparent",
    usage: "Digital overlays on dark surfaces",
  },
  {
    name: "Short Mark — Black on White",
    url: LOGOS.wsc.shortBlackWhite,
    bg: "#ffffff",
    label: "Short Mark",
    usage: "App icons, favicons, compact spaces",
  },
  {
    name: "Short Mark — Black on Transparent",
    url: LOGOS.wsc.shortBlackTransparent,
    bg: "#f0f0f0",
    label: "Short Mark Transparent",
    usage: "Compact overlays on light surfaces",
  },
  {
    name: "Short Mark — White on Black",
    url: LOGOS.wsc.shortWhiteBlack,
    bg: "#000000",
    label: "Short Mark Reversed",
    usage: "Compact overlays on dark surfaces",
  },
  {
    name: "Short Mark — White on Transparent",
    url: LOGOS.wsc.shortWhiteTransparent,
    bg: "#1a1d21",
    label: "Short Mark Rev. Transparent",
    usage: "Digital dark overlays, compact",
  },
];

const TIER1_LOGOS = [
  {
    name: "Tier 1 Performance — Black",
    url: LOGOS.tier1.black,
    bg: "#ffffff",
    label: "Primary",
    usage: "Default usage on white/light backgrounds",
  },
  {
    name: "Tier 1 Performance — White",
    url: LOGOS.tier1.white,
    bg: "#1a1d21",
    label: "Reversed",
    usage: "Dark backgrounds, digital dark surfaces",
  },
  {
    name: "Tier 1 Performance — Blue",
    url: LOGOS.tier1.blue,
    bg: "#1a3a8f",
    label: "Brand Blue",
    usage: "On Tier 1 blue brand backgrounds",
  },
];

const TIER1_GOLF_LOGOS = [
  {
    name: "Tier 1 Golf — White on Transparent",
    url: LOGOS.tier1Golf.white,
    bg: "#1a1d21",
    label: "Golf — Reversed",
    usage: "Dark backgrounds, digital surfaces, social posts, apparel on dark stock",
  },
  {
    name: "Tier 1 Golf — Black on Transparent",
    url: LOGOS.tier1Golf.black,
    bg: "#f0f0f0",
    label: "Golf — Primary",
    usage: "Light backgrounds, print on white stock, documents, parchment surfaces",
  },
];

function LogoCard({ logo, index }: { logo: any; index: number }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(logo.url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const ext = logo.url.split(".").pop()?.split("?")[0] || "png";
      a.download = `${logo.name.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Logo downloaded");
    } catch {
      toast.error("Download failed");
    }
    setDownloading(false);
  };

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Preview */}
      <div
        style={{
          backgroundColor: logo.bg,
          height: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
        }}
      >
        <img
          src={logo.url}
          alt={logo.name}
          style={{ maxHeight: "70px", maxWidth: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Info */}
      <div style={{ backgroundColor: "#22262b", padding: "14px 16px" }}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "2px",
              }}
            >
              {logo.name}
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                color: "#3b82f6",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {logo.label}
            </div>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            style={{
              backgroundColor: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.3)",
              color: "#3b82f6",
              padding: "5px 10px",
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 150ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(59,130,246,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(59,130,246,0.1)";
            }}
          >
            {downloading ? "..." : "↓ Download"}
          </button>
        </div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a0a5ad", lineHeight: 1.5 }}>
          {logo.usage}
        </p>
      </div>
    </div>
  );
}

export default function LogoGallery() {
  return (
    <div style={{ backgroundColor: "#1a1d21", padding: "80px 48px" }}>
      <SectionHeader
        label="06 — Visual Identity"
        title="Logo Gallery"
        subtitle="All approved logo variations for both brands. Click download to get the file. Never stretch, recolor, or add effects to any logo."
        dark
      />

      {/* WSC Logos */}
      <div className="mt-10 max-w-6xl">
        <div
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#3b82f6",
            marginBottom: "16px",
            paddingBottom: "12px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Woodinville Sports Club
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WSC_LOGOS.map((logo, i) => (
            <LogoCard key={logo.name} logo={logo} index={i} />
          ))}
        </div>
      </div>

      {/* Tier 1 Logos */}
      <div className="mt-12 max-w-6xl">
        <div
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#3b82f6",
            marginBottom: "16px",
            paddingBottom: "12px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Tier 1 Performance
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TIER1_LOGOS.map((logo, i) => (
            <LogoCard key={logo.name} logo={logo} index={i} />
          ))}
        </div>
      </div>

      {/* Tier 1 Golf Logos */}
      <div className="mt-12 max-w-6xl">
        <div
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#3b82f6",
            marginBottom: "8px",
            paddingBottom: "12px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Tier 1 Performance — Golf
        </div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", lineHeight: 1.6, marginBottom: "16px" }}>
          Sport-specific logo with golf ball mark. Use for all golf program materials, bay signage, apparel, and tournament collateral.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TIER1_GOLF_LOGOS.map((logo, i) => (
            <LogoCard key={logo.name} logo={logo} index={i} />
          ))}
        </div>
      </div>

      {/* Logo Rules */}
      <div className="mt-10 max-w-6xl">
        <div
          style={{
            backgroundColor: "#0f1114",
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
              color: "#ef4444",
              marginBottom: "16px",
            }}
          >
            Logo Usage Rules
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Never stretch or distort the logo proportions",
              "Never recolor the logo outside approved variations",
              "Never add drop shadows, outlines, or effects",
              "Never place on a background that reduces contrast",
              "Never use the Tier 1 logo in WSC-only materials",
              "Never use the WSC logo in Tier 1-only materials",
              "Maintain minimum clear space equal to the height of the 'W'",
              "Never rotate the logo at any angle",
            ].map((rule, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "#a0a5ad",
                  lineHeight: 1.5,
                  paddingLeft: "14px",
                  borderLeft: "2px solid rgba(239,68,68,0.4)",
                }}
              >
                {rule}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
