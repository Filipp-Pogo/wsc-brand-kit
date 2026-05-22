/**
 * QuickReferenceCard.tsx
 * Design: Performance Codex — print-ready 1-page double-sided quick reference card
 * Purpose: A compact, printable brand reference for non-desk staff (coaches, front desk,
 *          event staff). Covers the most critical rules from every section.
 *          Two sides: Side A = Tier 1 Performance | Side B = WSC
 *          Print at 5"×8" (index card) or 8.5"×11" (letter, folded).
 */

import { useState } from "react";
import { SectionHeader } from "@/pages/Home";
import { KIT_VERSION, KIT_LAST_UPDATED } from "./VersionChangelog";

// ─── Quick Reference Data ─────────────────────────────────────────────────────
const TIER1_QUICK = {
  brand: "TIER 1 PERFORMANCE",
  tagline: "The Standard Is The Standard.",
  secondaryTagline: "Train Without Limits",
  colors: [
    { name: "Background", hex: "#1a1d21", label: "Charcoal" },
    { name: "Blue Accent", hex: "#3b82f6", label: "Brand Blue" },
    { name: "Text", hex: "#e8e8e8", label: "Off-White" },
    { name: "Red Alert", hex: "#ef4444", label: "Red" },
    { name: "Operational", hex: "#f59e0b", label: "Operational" },
  ],
  fonts: ["Oswald 700 — Headlines", "Inter Regular/Medium — Body", "Inter Light 300 — Supporting Copy"],
  statusBadges: [
    { label: "Standard", desc: "Announcements, enrollment opens, new programs" },
    { label: "Alert", desc: "Weather delays, schedule changes, facility issues" },
    { label: "Urgent", desc: "Tryout deadlines, full closures, time-critical" },
  ],
  surfaceRoles: [] as { label: string; desc: string }[],
  italicRule: "",
  voiceWords: ["Direct", "Earned", "Precise", "Demanding", "Honest"],
  neverSay: ["Easy", "Fun", "Casual", "Just", "Try", "Exciting", "Amazing"],
  doSay: ["Compete", "Standard", "Earn", "Perform", "Execute", "Develop"],
  channels: [
    { ch: "Instagram", tone: "Confident, minimal captions" },
    { ch: "Email", tone: "Direct subject lines, no fluff" },
    { ch: "In-Person", tone: "Coach-to-athlete, earned respect" },
    { ch: "Signage", tone: "Oswald caps, no decoration" },
  ],
  logoRules: [
    "Always use approved file — never recreate",
    "Minimum 1\" width on print",
    "Clear space = height of the 'T' on all sides",
    "Never stretch, recolor, or add drop shadow",
    "Dark background → white logo",
    "Light background → black logo",
  ],
  neverDo: [
    "Mix Tier 1 and WSC voice in same piece",
    "Use recreational language (fun, casual, easy)",
    "Post without approved hashtags",
    "Use logo on busy/clashing backgrounds",
    "Put pricing or discounts on the post canvas (caption only)",
    "Use Red badge for non-urgent content",
    "Use rounded corners on Tier 1 Instagram graphics",
  ],
};

const WSC_QUICK = {
  brand: "WOODINVILLE SPORTS CLUB",
  tagline: "Elevate Your Game. Enrich Your Life.",
  secondaryTagline: "Train Without Limits",
  colors: [
    { name: "Post Background", hex: "#e8e0d3", label: "Post Background" },
    { name: "Card / Container", hex: "#faf9f5", label: "Card / Container" },
    { name: "Accent / Data Bars", hex: "#0d1b2a", label: "Accent / Data Bars" },
    { name: "Dark Base", hex: "#0a0704", label: "Warm Black" },
    { name: "Link Blue", hex: "#4cabfd", label: "Light Blue" },
    { name: "Italic Highlight", hex: "#bfdbfe", label: "Italic Highlight" },
    { name: "Category Dot", hex: "#a7c4a0", label: "Category Dot" },
    { name: "Category Dot", hex: "#f5d87e", label: "Category Dot" },
  ],
  fonts: [
    "Inter 200 ExtraLight — Display headlines (large, tight tracking)",
    "Inter 300 Light — Body copy",
    "Inter 400 Regular — UI & captions",
    "Inter italic — One word/phrase per post for warmth",
    "Caveat 400–700 — ONE accent line per post only",
  ],
  statusBadges: [] as { label: string; desc: string }[],
  surfaceRoles: [
    { label: "Parchment #e8e0d3", desc: "Primary post background — all Instagram posts start here" },
    { label: "Cream #faf9f5", desc: "Card & container surface — inner panels, stat boxes" },
    { label: "Navy #0d1b2a", desc: "Accent bars & data callouts only — never full background" },
  ],
  italicRule: "Use italic on ONE word or short phrase per post. e.g. 'Summer *is here*' — adds warmth without decoration.",
  voiceWords: ["Welcoming", "Community", "Premium", "Inclusive", "Aspirational"],
  neverSay: ["Exclusive", "Elite only", "Members only", "Restricted", "Limited"],
  doSay: ["Community", "Facility", "Programs", "Members", "Campus", "Experience"],
  channels: [
    { ch: "Instagram", tone: "Warm, community-forward" },
    { ch: "Email", tone: "Friendly, informative, clear CTAs" },
    { ch: "In-Person", tone: "Welcoming, helpful, professional" },
    { ch: "Signage", tone: "Inter caps, warm and clear" },
  ],
  logoRules: [
    "Always use approved file — never recreate",
    "Minimum 1\" width on print",
    "Clear space = height of the 'W' on all sides",
    "Never stretch, recolor, or add drop shadow",
    "Light background → black/dark logo",
    "Dark background → white logo",
  ],
  neverDo: [
    "Use Tier 1 performance language for WSC general content",
    "Use cold, intimidating tone in member communications",
    "Post facility content without WSC branding",
    "Use logo on busy/clashing backgrounds",
    "Lead with price on the post canvas — price belongs in caption or bio",
    "Use Navy (#0d1b2a) as a full post background — accent bars only",
    "Use urgency theater (ALL CAPS, 🔥, 'ACT FAST') — state real numbers calmly",
    "Use Caveat for more than one accent line per post — one whisper only",
    "Use Soft Blue, Sage, or Sun as post backgrounds — accent tools only",
    "Stack multiple italic highlights in one post — one per post maximum",
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function ColorDot({ hex, label }: { hex: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{
        width: "16px",
        height: "16px",
        background: hex,
        border: "1px solid rgba(255,255,255,0.15)",
        flexShrink: 0,
      }} />
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#e8e8e8" }}>
        {label} <span style={{ color: "#a0a5ad" }}>{hex}</span>
      </div>
    </div>
  );
}

function CardSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "9px",
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#3b82f6",
        marginBottom: "8px",
        borderBottom: "1px solid rgba(59,130,246,0.2)",
        paddingBottom: "4px",
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function ReferenceCard({ data, side }: { data: typeof TIER1_QUICK; side: "A" | "B" }) {
  const isTier1 = side === "A";
  const cardBg = isTier1 ? "#1a1d21" : "#e8e0d3";
  const textColor = isTier1 ? "#e8e8e8" : "#0e0a07";
  const mutedColor = isTier1 ? "#a0a5ad" : "#4b4038";
  const accentColor = isTier1 ? "#3b82f6" : "#0d1b2a";
  const borderColor = isTier1 ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  const sectionTitleColor = isTier1 ? "#3b82f6" : "#0d1b2a";
  const tagBg = isTier1 ? "rgba(59,130,246,0.15)" : "rgba(13,27,42,0.1)";
  const tagBorder = isTier1 ? "rgba(59,130,246,0.3)" : "rgba(13,27,42,0.25)";

  return (
    <div style={{
      background: cardBg,
      border: `1px solid ${borderColor}`,
      padding: "24px",
      width: "100%",
      maxWidth: "420px",
      position: "relative",
    }}>
      {/* Side label */}
      <div style={{
        position: "absolute",
        top: "12px",
        right: "12px",
        fontFamily: "Inter, sans-serif",
        fontSize: "9px",
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: mutedColor,
      }}>
        SIDE {side}
      </div>

      {/* Brand header */}
      <div style={{ marginBottom: "20px", paddingRight: "40px" }}>
        <div style={{
          fontFamily: "Oswald, sans-serif",
          fontWeight: 700,
          fontSize: "15px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: textColor,
          lineHeight: 1.1,
          marginBottom: "4px",
        }}>
          {data.brand}
        </div>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "11px",
          color: accentColor,
          fontStyle: "italic",
        }}>
          "{data.tagline}"
        </div>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "10px",
          color: mutedColor,
          marginTop: "2px",
        }}>
          {data.secondaryTagline}
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* Left column */}
        <div>
          {/* Colors */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: sectionTitleColor,
              marginBottom: "8px",
              borderBottom: `1px solid ${tagBorder}`,
              paddingBottom: "4px",
            }}>
              Core Colors
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {data.colors.map((c) => (
                <div key={c.hex} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{
                    width: "12px",
                    height: "12px",
                    background: c.hex,
                    border: `1px solid ${borderColor}`,
                    flexShrink: 0,
                  }} />
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: textColor }}>
                    {c.label} <span style={{ color: mutedColor, fontSize: "9px" }}>{c.hex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fonts */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: sectionTitleColor,
              marginBottom: "8px",
              borderBottom: `1px solid ${tagBorder}`,
              paddingBottom: "4px",
            }}>
              Typography
            </div>
            {data.fonts.map((f) => (
              <div key={f} style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: textColor, marginBottom: "3px" }}>
                {f}
              </div>
            ))}
          </div>

          {data.statusBadges.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: sectionTitleColor,
                marginBottom: "8px",
                borderBottom: `1px solid ${tagBorder}`,
                paddingBottom: "4px",
              }}>
                Status Badges
              </div>
              {data.statusBadges.map((badge) => (
                <div key={badge.label} style={{ marginBottom: "6px" }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, color: textColor, textTransform: "uppercase" }}>
                    {badge.label}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: mutedColor, lineHeight: 1.35 }}>
                    {badge.desc}
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.surfaceRoles.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: sectionTitleColor,
                marginBottom: "8px",
                borderBottom: `1px solid ${tagBorder}`,
                paddingBottom: "4px",
              }}>
                Surface Roles
              </div>
              {data.surfaceRoles.map((role) => (
                <div key={role.label} style={{ marginBottom: "6px" }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, color: textColor }}>
                    {role.label}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: mutedColor, lineHeight: 1.35 }}>
                    {role.desc}
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.italicRule && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: sectionTitleColor,
                marginBottom: "8px",
                borderBottom: `1px solid ${tagBorder}`,
                paddingBottom: "4px",
              }}>
                Italic Emphasis Rule
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: mutedColor, lineHeight: 1.45, fontStyle: "italic" }}>
                {data.italicRule}
              </div>
            </div>
          )}

          {/* Channel tones */}
          <div>
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: sectionTitleColor,
              marginBottom: "8px",
              borderBottom: `1px solid ${tagBorder}`,
              paddingBottom: "4px",
            }}>
              Channel Tones
            </div>
            {data.channels.map((ch) => (
              <div key={ch.ch} style={{ marginBottom: "5px" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, color: textColor }}>
                  {ch.ch}:{" "}
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: mutedColor }}>
                  {ch.tone}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div>
          {/* Voice words */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: sectionTitleColor,
              marginBottom: "8px",
              borderBottom: `1px solid ${tagBorder}`,
              paddingBottom: "4px",
            }}>
              Voice Is
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {data.voiceWords.map((w) => (
                <div key={w} style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "9px",
                  fontWeight: 600,
                  padding: "2px 7px",
                  background: tagBg,
                  border: `1px solid ${tagBorder}`,
                  color: isTier1 ? "#3b82f6" : "#0d1b2a",
                }}>
                  {w}
                </div>
              ))}
            </div>
          </div>

          {/* DO say */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#22c55e",
              marginBottom: "8px",
              borderBottom: "1px solid rgba(34,197,94,0.2)",
              paddingBottom: "4px",
            }}>
              ✓ Do Say
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {data.doSay.map((w) => (
                <div key={w} style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "9px",
                  fontWeight: 600,
                  padding: "2px 7px",
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  color: "#22c55e",
                }}>
                  {w}
                </div>
              ))}
            </div>
          </div>

          {/* NEVER say */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#ef4444",
              marginBottom: "8px",
              borderBottom: "1px solid rgba(239,68,68,0.2)",
              paddingBottom: "4px",
            }}>
              ✕ Never Say
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {data.neverSay.map((w) => (
                <div key={w} style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "9px",
                  fontWeight: 600,
                  padding: "2px 7px",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  color: "#ef4444",
                }}>
                  {w}
                </div>
              ))}
            </div>
          </div>

          {/* Never do */}
          <div>
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#ef4444",
              marginBottom: "8px",
              borderBottom: "1px solid rgba(239,68,68,0.2)",
              paddingBottom: "4px",
            }}>
              ✕ Never Do
            </div>
            {data.neverDo.map((rule, i) => (
              <div key={i} style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "10px",
                color: mutedColor,
                marginBottom: "4px",
                paddingLeft: "10px",
                position: "relative",
              }}>
                <span style={{ position: "absolute", left: 0, color: "#ef4444" }}>—</span>
                {rule}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logo rules footer */}
      <div style={{
        marginTop: "16px",
        paddingTop: "12px",
        borderTop: `1px solid ${borderColor}`,
      }}>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: sectionTitleColor,
          marginBottom: "6px",
        }}>
          Logo Rules
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
          {data.logoRules.map((rule, i) => (
            <div key={i} style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "9px",
              color: mutedColor,
              paddingLeft: "10px",
              position: "relative",
            }}>
              <span style={{ position: "absolute", left: 0, color: accentColor }}>·</span>
              {rule}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: "12px",
        paddingTop: "8px",
        borderTop: `1px solid ${borderColor}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", color: mutedColor }}>
          Brand Kit v{KIT_VERSION} · {KIT_LAST_UPDATED}
        </div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", color: mutedColor }}>
          Confidential — Internal Use Only
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function QuickReferenceCard() {
  const [view, setView] = useState<"preview" | "print">("preview");
  const [activeSide, setActiveSide] = useState<"A" | "B">("A");

  return (
    <div
      id="quick-reference"
      style={{
        background: "#1a1d21",
        padding: "80px 48px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "24px", marginBottom: "48px" }}>
        <SectionHeader
          label="Governance"
          title="Quick Reference Card"
          subtitle={'A print-ready 1-page double-sided reference card for non-desk staff. Print at 5"×8" (index card size) or 8.5"×11" folded. Side A = Tier 1 Performance. Side B = WSC.'}
        />

        <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Print button */}
          <button
            onClick={() => window.print()}
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "10px 20px",
              background: "#3b82f6",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            ⎙ Print / Save PDF
          </button>
        </div>
      </div>

      {/* Side toggle */}
      <div style={{ display: "flex", gap: "0", marginBottom: "32px" }}>
        {(["A", "B"] as const).map((side) => (
          <button
            key={side}
            onClick={() => setActiveSide(side)}
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "10px 28px",
              background: activeSide === side ? "#3b82f6" : "transparent",
              border: "1px solid",
              borderColor: activeSide === side ? "#3b82f6" : "rgba(255,255,255,0.15)",
              color: activeSide === side ? "#ffffff" : "#a0a5ad",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            Side {side} — {side === "A" ? "Tier 1 Performance" : "Woodinville Sports Club"}
          </button>
        ))}
      </div>

      {/* Card preview */}
      <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "40px" }}>
        <ReferenceCard
          data={activeSide === "A" ? TIER1_QUICK : WSC_QUICK}
          side={activeSide}
        />
      </div>

      {/* Both sides side by side (for print layout reference) */}
      <div style={{
        marginTop: "48px",
        padding: "24px",
        background: "#22262b",
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#a0a5ad",
          marginBottom: "24px",
        }}>
          Both Sides — Print Layout Reference
        </div>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <ReferenceCard data={TIER1_QUICK} side="A" />
          <ReferenceCard data={WSC_QUICK} side="B" />
        </div>
      </div>

      {/* Print instructions */}
      <div style={{
        marginTop: "32px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "16px",
      }}>
        {[
          { icon: "⎙", title: "5\" × 8\" Index Card", desc: "Print at 67% scale. Laminate for durability. Ideal for coaches and front desk staff." },
          { icon: "📄", title: "8.5\" × 11\" Folded", desc: "Print at 100%, fold in half. Side A on front, Side B on back. Fits in a pocket or binder." },
          { icon: "📌", title: "Posting", desc: "Print at 100% and post on the staff bulletin board, coaching office, or break room wall." },
        ].map((item) => (
          <div key={item.title} style={{
            padding: "16px 20px",
            background: "#22262b",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ fontSize: "20px", marginBottom: "8px" }}>{item.icon}</div>
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              color: "#e8e8e8",
              marginBottom: "6px",
            }}>
              {item.title}
            </div>
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: "#a0a5ad",
              lineHeight: 1.5,
            }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
