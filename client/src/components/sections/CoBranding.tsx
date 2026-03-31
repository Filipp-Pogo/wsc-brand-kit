/**
 * CoBranding — Co-Branding & Partnership Rules for Tier 1 and WSC
 * Design: "The Performance Codex"
 * Covers: lockup rules, partner logo sizing, approved arrangements,
 * prohibited uses, and approval workflow.
 */

import { useState } from "react";
import { SectionHeader } from "@/pages/Home";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PARTNER_TIERS = [
  {
    tier: "Presenting Partner",
    description: "Top-level sponsor with naming rights to a program, event, or facility zone.",
    logoRule: "Partner logo may appear at equal size to Tier 1 / WSC logo in co-branded materials.",
    placement: "Partner logo appears LEFT of brand logo, separated by a vertical rule.",
    colorRule: "Partner brand colors may appear in the co-branded asset background only — not in typography.",
    approvalRequired: true,
    examples: ["Program naming: '[Partner] Tier 1 Academy'", "Facility zone: '[Partner] Performance Lab'", "Event: '[Partner] WSC Open'"],
  },
  {
    tier: "Supporting Partner",
    description: "Sponsor with category exclusivity but no naming rights.",
    logoRule: "Partner logo appears at 75% of the brand logo size.",
    placement: "Partner logo appears BELOW the brand logo, centered, with minimum 24px clear space.",
    colorRule: "Partner brand colors do not appear in the asset — neutral or brand colors only.",
    approvalRequired: true,
    examples: ["'Powered by [Partner]'", "'Official [Category] Partner of Tier 1 Performance'", "Equipment co-branding on signage"],
  },
  {
    tier: "Community Partner",
    description: "Local business, school, or organization with a non-financial partnership.",
    logoRule: "Partner logo appears at 60% of the brand logo size.",
    placement: "Partner logo appears in the footer zone only — not in the primary visual area.",
    colorRule: "Partner brand colors do not appear in the asset.",
    approvalRequired: false,
    examples: ["School partnership announcements", "Community event co-promotion", "Referral partner acknowledgment"],
  },
];

const LOCKUP_RULES = [
  {
    rule: "Clear Space",
    spec: "Minimum 1× logo height on all sides of both logos",
    icon: "□",
  },
  {
    rule: "Minimum Size",
    spec: "Neither logo may appear smaller than 80px wide in digital or 0.75\" in print",
    icon: "↔",
  },
  {
    rule: "Separator",
    spec: "Vertical rule between logos: 1px, 60% opacity, color matches the darker brand",
    icon: "|",
  },
  {
    rule: "Background",
    spec: "Co-branded assets use white, black, or WSC parchment (#e8e0d3) backgrounds only",
    icon: "▭",
  },
  {
    rule: "Stacking",
    spec: "Horizontal lockup preferred. Vertical stacking only when width < 400px",
    icon: "⇔",
  },
  {
    rule: "Color Integrity",
    spec: "Both logos must appear in their approved color versions — no recoloring for co-branding",
    icon: "◉",
  },
];

const PROHIBITED = [
  "Placing a partner logo inside or overlapping the WSC or Tier 1 logo",
  "Recoloring either logo to match the partner's brand palette",
  "Using a partner logo that is larger than the WSC or Tier 1 logo",
  "Using the Tier 1 Performance name in a partner's own marketing without written approval",
  "Allowing a partner to use WSC or Tier 1 assets without a signed co-branding agreement",
  "Creating co-branded materials that imply Tier 1 or WSC endorses the partner's products",
  "Using the WSC or Tier 1 logo on partner merchandise without written approval",
  "Placing partner logos on athlete uniforms without approval from the program director",
  "Co-branding with a competitor in the same market category",
];

const APPROVAL_STEPS = [
  {
    step: 1,
    title: "Submit Co-Brand Request",
    description: "Complete the Co-Brand Request form with: partner name, tier level, asset type, dimensions, intended use, and distribution channel.",
    owner: "Requesting party",
    timeline: "Before any design work begins",
  },
  {
    step: 2,
    title: "Brand Review",
    description: "Brand lead reviews the request against these guidelines. Approves the tier classification and confirms the partner logo file is in an approved format (SVG, EPS, or high-res PNG).",
    owner: "Brand Lead",
    timeline: "2–3 business days",
  },
  {
    step: 3,
    title: "Design & Lockup",
    description: "Designer creates the co-branded asset following the lockup rules for the approved tier. No partner colors in typography. Correct logo sizing applied.",
    owner: "Designer",
    timeline: "Per project scope",
  },
  {
    step: 4,
    title: "Final Approval",
    description: "Brand lead reviews the final asset. For Presenting Partner materials, the partner also receives a review copy. Written approval required before production or publication.",
    owner: "Brand Lead + Partner (if Presenting)",
    timeline: "1–2 business days",
  },
  {
    step: 5,
    title: "Archive",
    description: "Approved co-branded assets are saved to the shared brand asset library with the partner name, tier, date, and approval record.",
    owner: "Brand Lead",
    timeline: "Same day as approval",
  },
];

const CHANNEL_RULES = [
  { channel: "Social Media", rule: "Partner logo in caption or image credit only — not overlaid on photography. Tag partner account instead of logo overlay." },
  { channel: "Email", rule: "Partner logo in footer only for Supporting and Community tiers. Presenting Partners may appear in the header at equal size." },
  { channel: "Signage", rule: "Follow tier sizing rules. Minimum 24px clear space from any edge. No partner logos on court-side safety signage." },
  { channel: "Uniforms", rule: "Requires written approval from program director. Partner patch maximum 3\"×3\". Placement: left chest or sleeve only." },
  { channel: "Digital Ads", rule: "Co-branded ads require brand lead approval before launch. Partner logo in lower-right corner at 60% of brand logo size." },
  { channel: "Video / Reels", rule: "Partner logo in opening or closing card only — not overlaid on action footage. Maximum 3-second hold." },
  { channel: "Print / Collateral", rule: "Follow tier sizing rules. Co-branded print materials require brand lead sign-off before sending to printer." },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function LockupMockup({ tier }: { tier: typeof PARTNER_TIERS[0] }) {
  const isPresenting = tier.tier === "Presenting Partner";
  const isSupporting = tier.tier === "Supporting Partner";

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "32px",
        display: "flex",
        flexDirection: isSupporting ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: isSupporting ? "16px" : "0",
        minHeight: "120px",
        position: "relative" as const,
      }}
    >
      {/* Brand logo placeholder */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1d21",
          padding: "10px 20px",
          minWidth: isPresenting ? "120px" : "140px",
        }}
      >
        <span style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: isPresenting ? "14px" : "16px", color: "#ffffff", textTransform: "uppercase" as const, letterSpacing: "-0.01em" }}>
          {isSupporting || tier.tier === "Community Partner" ? "TIER 1" : "TIER 1"}
        </span>
      </div>

      {/* Separator (horizontal lockup only) */}
      {!isSupporting && (
        <div style={{ width: "1px", height: "40px", backgroundColor: "rgba(0,0,0,0.2)", margin: "0 20px" }} />
      )}

      {/* Partner logo placeholder */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e8e0d3",
          padding: "10px 20px",
          minWidth: isPresenting ? "120px" : isSupporting ? "90px" : "84px",
          opacity: isPresenting ? 1 : isSupporting ? 0.85 : 0.7,
          transform: isPresenting ? "none" : isSupporting ? "scale(0.75)" : "scale(0.6)",
          transformOrigin: isSupporting ? "center center" : "center center",
        }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", color: "#0e0a07", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>
          PARTNER
        </span>
      </div>

      {/* Tier label */}
      <div
        style={{
          position: "absolute" as const,
          bottom: "8px",
          right: "12px",
          fontFamily: "Inter, sans-serif",
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          color: "#84786f",
        }}
      >
        {tier.tier} Lockup
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function CoBranding() {
  const [activeTab, setActiveTab] = useState<"tiers" | "lockup" | "channels" | "approval" | "prohibited">("tiers");
  const [expandedTier, setExpandedTier] = useState<string | null>("Presenting Partner");

  const tabs = [
    { id: "tiers", label: "Partner Tiers" },
    { id: "lockup", label: "Lockup Rules" },
    { id: "channels", label: "Channel Rules" },
    { id: "approval", label: "Approval Workflow" },
    { id: "prohibited", label: "Prohibited Uses" },
  ];

  return (
    <div style={{ backgroundColor: "#0f1114" }}>
      <div style={{ padding: "80px 48px" }}>
        <SectionHeader
          label="— Brand Governance"
          title="Co-Branding & Partnership Rules"
          subtitle="How Tier 1 Performance and WSC appear alongside sponsor, partner, school, and vendor brands. Every co-branded asset requires written approval before production or publication."
          dark
        />

        {/* Tab nav */}
        <div className="flex gap-0 mt-10 mb-8 flex-wrap" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                padding: "10px 18px",
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #3b82f6" : "2px solid transparent",
                color: activeTab === tab.id ? "#3b82f6" : "#a0a5ad",
                cursor: "pointer",
                marginBottom: "-1px",
                transition: "all 150ms ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Partner Tiers */}
        {activeTab === "tiers" && (
          <div className="max-w-5xl">
            {PARTNER_TIERS.map((tier) => (
              <div key={tier.tier} style={{ marginBottom: "12px" }}>
                <button
                  onClick={() => setExpandedTier(expandedTier === tier.tier ? null : tier.tier)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 20px",
                    backgroundColor: "#1a1d21",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                    borderBottom: expandedTier === tier.tier ? "none" : "1px solid rgba(255,255,255,0.06)",
                    borderLeft: `3px solid ${tier.tier === "Presenting Partner" ? "#3b82f6" : tier.tier === "Supporting Partner" ? "#a0a5ad" : "rgba(255,255,255,0.2)"}`,
                    cursor: "pointer",
                    textAlign: "left" as const,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      style={{
                        fontFamily: "Oswald, sans-serif",
                        fontWeight: 700,
                        fontSize: "16px",
                        textTransform: "uppercase" as const,
                        letterSpacing: "-0.01em",
                        color: "#ffffff",
                      }}
                    >
                      {tier.tier}
                    </span>
                    {tier.approvalRequired && (
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase" as const,
                          color: "#f59e0b",
                          backgroundColor: "rgba(245,158,11,0.1)",
                          padding: "2px 8px",
                        }}
                      >
                        Approval Required
                      </span>
                    )}
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a0a5ad"
                    strokeWidth="2"
                    style={{ transform: expandedTier === tier.tier ? "rotate(180deg)" : "none", transition: "transform 200ms ease", flexShrink: 0 }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {expandedTier === tier.tier && (
                  <div
                    style={{
                      backgroundColor: "#1a1d21",
                      borderTop: "none",
                      borderRight: "1px solid rgba(255,255,255,0.06)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      borderLeft: `3px solid ${tier.tier === "Presenting Partner" ? "#3b82f6" : tier.tier === "Supporting Partner" ? "#a0a5ad" : "rgba(255,255,255,0.2)"}`,
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Rules */}
                      <div style={{ padding: "20px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a0a5ad", lineHeight: 1.6, marginBottom: "16px" }}>
                          {tier.description}
                        </div>
                        {[
                          { label: "Logo Size", value: tier.logoRule },
                          { label: "Placement", value: tier.placement },
                          { label: "Color Rule", value: tier.colorRule },
                        ].map((row) => (
                          <div key={row.label} style={{ marginBottom: "12px" }}>
                            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#3b82f6", marginBottom: "4px" }}>
                              {row.label}
                            </div>
                            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#e8e8e8", lineHeight: 1.55 }}>
                              {row.value}
                            </div>
                          </div>
                        ))}
                        <div>
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#3b82f6", marginBottom: "6px" }}>
                            Examples
                          </div>
                          {tier.examples.map((ex, i) => (
                            <div key={i} className="flex items-start gap-2 mb-1">
                              <div style={{ width: "4px", height: "4px", backgroundColor: "#3b82f6", flexShrink: 0, marginTop: "5px" }} />
                              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#a0a5ad" }}>{ex}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mockup */}
                      <div style={{ padding: "20px" }}>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#a0a5ad", marginBottom: "10px" }}>
                          Lockup Example
                        </div>
                        <LockupMockup tier={tier} />
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a0a5ad", marginTop: "8px", lineHeight: 1.5 }}>
                          This is a structural reference only. Actual partner logos must follow the sizing and placement rules above.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Lockup Rules */}
        {activeTab === "lockup" && (
          <div className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LOCKUP_RULES.map((rule) => (
                <div
                  key={rule.rule}
                  style={{
                    backgroundColor: "#1a1d21",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    borderLeft: "3px solid #3b82f6",
                    padding: "18px 20px",
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      style={{
                        fontFamily: "Oswald, sans-serif",
                        fontWeight: 700,
                        fontSize: "20px",
                        color: "#3b82f6",
                        minWidth: "28px",
                      }}
                    >
                      {rule.icon}
                    </div>
                    <div
                      style={{
                        fontFamily: "Oswald, sans-serif",
                        fontWeight: 700,
                        fontSize: "15px",
                        textTransform: "uppercase" as const,
                        letterSpacing: "-0.01em",
                        color: "#ffffff",
                      }}
                    >
                      {rule.rule}
                    </div>
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", lineHeight: 1.6 }}>
                    {rule.spec}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Channel Rules */}
        {activeTab === "channels" && (
          <div className="max-w-4xl">
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}
            >
              {CHANNEL_RULES.map((row, i) => (
                <div
                  key={row.channel}
                  className="grid"
                  style={{
                    gridTemplateColumns: "160px 1fr",
                    backgroundColor: i % 2 === 0 ? "#1a1d21" : "#0f1114",
                    borderBottom: i < CHANNEL_RULES.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}
                >
                  <div
                    style={{
                      padding: "16px",
                      fontFamily: "Oswald, sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      textTransform: "uppercase" as const,
                      letterSpacing: "-0.01em",
                      color: "#3b82f6",
                      borderRight: "1px solid rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {row.channel}
                  </div>
                  <div style={{ padding: "16px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", lineHeight: 1.6 }}>
                    {row.rule}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approval Workflow */}
        {activeTab === "approval" && (
          <div className="max-w-3xl">
            {APPROVAL_STEPS.map((step, i) => (
              <div key={step.step} className="flex gap-0" style={{ marginBottom: i < APPROVAL_STEPS.length - 1 ? "0" : "0" }}>
                {/* Step number + connector */}
                <div className="flex flex-col items-center" style={{ minWidth: "48px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "#3b82f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "16px", color: "#ffffff" }}>
                      {step.step}
                    </span>
                  </div>
                  {i < APPROVAL_STEPS.length - 1 && (
                    <div style={{ width: "1px", flex: 1, backgroundColor: "rgba(59,130,246,0.2)", minHeight: "40px" }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingLeft: "20px", paddingBottom: "32px", flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                      textTransform: "uppercase" as const,
                      letterSpacing: "-0.01em",
                      color: "#ffffff",
                      marginBottom: "6px",
                      marginTop: "6px",
                    }}
                  >
                    {step.title}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", lineHeight: 1.65, marginBottom: "10px" }}>
                    {step.description}
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <div>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#3b82f6" }}>Owner: </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#e8e8e8" }}>{step.owner}</span>
                    </div>
                    <div>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#3b82f6" }}>Timeline: </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#e8e8e8" }}>{step.timeline}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Prohibited Uses */}
        {activeTab === "prohibited" && (
          <div className="max-w-4xl">
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "#a0a5ad",
                marginBottom: "20px",
                lineHeight: 1.6,
              }}
            >
              The following are absolute prohibitions. No exceptions. Any co-branded material that violates these rules must be corrected before publication, regardless of approval status.
            </div>
            {PROHIBITED.map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#1a1d21",
                  borderTop: "1px solid rgba(239,68,68,0.1)",
                  borderRight: "1px solid rgba(239,68,68,0.1)",
                  borderBottom: "1px solid rgba(239,68,68,0.1)",
                  borderLeft: "3px solid #ef4444",
                  padding: "14px 18px",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#ef4444",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  ✕
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#e8e8e8", lineHeight: 1.6 }}>
                  {item}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
