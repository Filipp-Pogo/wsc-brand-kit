/**
 * VersionChangelog.tsx
 * Design: Performance Codex — dark charcoal base, Oswald headers, Inter body
 * Purpose: Displays the Brand Kit version history with change types, affected sections,
 *          and a "Last Updated" badge visible on every entry. Also exports the
 *          SECTION_VERSIONS map used by other sections to show their own last-updated date.
 */

import { useState } from "react";
import { SectionHeader } from "@/pages/Home";

// ─── Section Version Map ──────────────────────────────────────────────────────
// Each key is a section nav ID. Value is the last-updated date string.
// Update this map whenever a section's content changes.
export const SECTION_VERSIONS: Record<string, string> = {
  "brand-architecture":    "March 27, 2026",
  "core-values":           "March 27, 2026",
  "we-are":                "March 27, 2026",
  "color-palette":         "May 1, 2026",
  "typography":            "May 1, 2026",
  "logos":                 "May 1, 2026",
  "signage":               "March 27, 2026",
  "voice-constants":       "March 27, 2026",
  "tone-matrix":           "March 27, 2026",
  "messaging-pillars":     "March 27, 2026",
  "taglines":              "March 27, 2026",
  "channel-guidelines":    "March 27, 2026",
  "terminology":           "March 27, 2026",
  "anti-patterns":         "March 27, 2026",
  "instagram":             "May 1, 2026",
  "signage-examples":      "March 27, 2026",
  "email-guidelines":      "March 27, 2026",
  "co-branding":           "March 27, 2026",
  "brand-onboarding-quiz": "May 1, 2026",
  "voice-scorer":          "March 27, 2026",
  "changelog":             "May 1, 2026",
  "quick-reference":       "May 1, 2026",
};

// ─── Current Kit Version ─────────────────────────────────────────────────────
export const KIT_VERSION = "1.5.1";
export const KIT_LAST_UPDATED = "May 1, 2026";

// ─── Changelog Data ───────────────────────────────────────────────────────────
type ChangeType = "new" | "updated" | "removed" | "governance";

interface ChangeEntry {
  version: string;
  date: string;
  summary: string;
  changes: {
    type: ChangeType;
    section: string;
    description: string;
  }[];
  requiresRecertification: boolean;
}

const CHANGELOG: ChangeEntry[] = [
  {
    version: "1.5.1",
    date: "May 1, 2026",
    summary: "WSC Instagram recalibration. Caveat font added. Soft companion colors added. All 16 WSC templates updated with warmer treatment. Anti-Pattern 06 (Caveat Overuse) added. Quiz Ch.13 expanded to 11 questions.",
    requiresRecertification: true,
    changes: [
      { type: "updated", section: "Instagram Guidelines — WSC", description: "All 16 WSC templates updated with warmer treatment: Soft Blue italic highlights, Caveat accent lines, Sage/Sun category dots in schedule grids, filled deep blue checkmarks. Anti-Pattern 06 (Caveat Overuse) added with live bad/good comparison." },
      { type: "updated", section: "Instagram Guidelines — WSC — Principles", description: "Principle 02 reframed to 'Warmth Is a Design Decision.' Principle 04 added: 'One Accent Per Post.' Intro text updated." },
      { type: "updated", section: "Instagram Guidelines — WSC — Atoms", description: "Caveat added to WSC type scale. Color Roles expanded with Soft Blue, Sage, Sun, Deep Blue Text. Hard Rules expanded from 7 to 9." },
      { type: "new", section: "Typography — WSC", description: "Caveat (handwritten accent font, 400–700) added to WSC Type Scale with rules card: one accent line per post, 13–18px, rotate ±2°, Deep Blue only." },
      { type: "new", section: "Color Palette — WSC", description: "Five soft companion colors added: Soft Blue (#bfdbfe), Lighter Blue (#dbeafe), Sage (#a7c4a0), Sun (#f5d87e), Deep Blue Text (#1e3a5f)." },
      { type: "updated", section: "Brand Onboarding Quiz — Chapter 13", description: "Three new questions added (Q9–11): Caveat correct use, soft companion color roles, italic highlight maximum. Chapter now has 11 questions." },
      { type: "updated", section: "Quick Reference Card — Side B", description: "Caveat added to WSC typography. Soft Blue, Sage, Sun added to companion colors. Three new Never Do items: Caveat overuse, companion colors as backgrounds, italic highlight stacking." },
      { type: "updated", section: "Claude System Prompts", description: "Both Opus and Sonnet prompts updated to v2.3 with Caveat accent rules, soft companion color roles, italic highlight technique, and Anti-Pattern 06." },
    ],
  },
  {
    version: "1.5.0",
    date: "April 30, 2026",
    summary: "WSC Instagram Design System v1. Inter 200 ExtraLight added. Parchment/Cream/Navy surface roles codified. Quiz Chapter 13 added. Quick Reference Card Side B updated. Claude System Prompts updated with WSC sections.",
    requiresRecertification: true,
    changes: [
      { type: "new", section: "Instagram Guidelines — WSC", description: "Full 6-page WSC Instagram Design System: Design Principles (hospitality brand, not sports brand), Atoms (Inter 200/300, parchment palette, italic rule), Everyday Templates (6 templates, 2–3 mockups each), Pricing Rules (4 templates), Transactional Templates (6 templates), and Anti-Patterns (5 side-by-side comparisons: Newsletter Trap, Discount Flyer, Text Overload, Urgency Theater, Stock Photo Substitute)." },
      { type: "updated", section: "Typography — WSC", description: "Inter 200 ExtraLight added as WSC Display weight. Italic Emphasis Rule documented: use italic on one word or short phrase per post for warmth and personality." },
      { type: "updated", section: "Color Palette — WSC", description: "Surface role distinction codified: Parchment Light (#e8e0d3) = primary post background, Cream (#faf9f5) = card/container surface, Navy (#0d1b2a) = accent bars and data callouts only." },
      { type: "new", section: "Brand Onboarding Quiz — Chapter 13", description: "WSC Instagram Design System chapter added: 8 questions covering primary background color, Inter 200 display weight, italic emphasis rule, Urgency Theater anti-pattern, Discount Flyer anti-pattern, Navy usage rules, Community Moment template, and Pricing Rules rationale." },
      { type: "updated", section: "Quick Reference Card — Side B", description: "WSC column updated with Inter 200 display weight, italic emphasis rule, surface role table (Parchment/Cream/Navy), and three new WSC Instagram Never Do items." },
      { type: "updated", section: "Claude System Prompts", description: "Both Opus and Sonnet prompts updated to v2.2 with WSC Instagram Design System rules: Inter 200 display, italic emphasis, parchment palette, surface role hierarchy, and the five anti-patterns." },
    ],
  },
  {
    version: "1.4.0",
    date: "April 30, 2026",
    summary: "Tier 1 Instagram Design System v1. Amber Accent added. Inter Light added. Quiz Chapter 12 expanded to 8 questions. Quick Reference Card Side A updated with Status Badges.",
    requiresRecertification: true,
    changes: [
      { type: "new", section: "Instagram Guidelines — Tier 1", description: "Full 6-page Tier 1 Instagram Design System: Design Principles, Atoms (grid, type, color, badges), 6 Universal Templates (3 mockups each), 8 Announcement Templates, 6 Credibility Templates, and Anti-Patterns with 5 side-by-side comparisons. 60+ total mockups." },
      { type: "new", section: "Color Palette — Tier 1", description: "Amber Accent (#f59e0b) added as the third Tier 1 accent color. Used exclusively for operational alerts and status badges." },
      { type: "updated", section: "Typography — Tier 1", description: "Inter Light (300) added as Body Light for supporting copy, captions, and secondary text in the Tier 1 type scale." },
      { type: "updated", section: "Brand Onboarding Quiz — Chapter 12", description: "Instagram Guidelines chapter expanded from 3 questions to 8. All questions now cover the new Design System: voice registers, atomic rules, template taxonomy, badge color logic, and anti-patterns." },
      { type: "updated", section: "Quick Reference Card — Side A", description: "Status Badges section added: Blue (Standard), Amber (Alert), Red (Urgent). Never Do list updated with three new Tier 1 Instagram violations." },
      { type: "updated", section: "Claude System Prompts", description: "Both Opus and Sonnet prompts updated to reference the Tier 1 Instagram Design System, Amber Accent, Inter Light, and the template taxonomy." },
    ],
  },
  {
    version: "1.3.0",
    date: "March 27, 2026",
    summary: "Company-wide deployment package. Added governance tools, onboarding quiz, and operational signage.",
    requiresRecertification: true,
    changes: [
      { type: "new", section: "Brand Onboarding Quiz", description: "14-chapter, 42-question certification quiz covering every section of the Brand Kit. 75% pass threshold per chapter." },
      { type: "new", section: "Email Marketing Guidelines", description: "Full email guidelines for Tier 1 and WSC including 4 template types, subject line formulas, and technical specs." },
      { type: "new", section: "Brand Voice Scorer", description: "Interactive tool to score any draft copy against brand voice constants and vocabulary rules." },
      { type: "new", section: "Co-Branding & Partnership Rules", description: "Three partner tiers, lockup rules, channel-by-channel co-brand rules, and a 5-step approval workflow." },
      { type: "new", section: "Reserved Bay Signs", description: "Two physical format mockups for Tier 1 Academy Golf Bay Reserved signage with print specs." },
      { type: "new", section: "Version Changelog", description: "This section. Tracks all changes to the Brand Kit with recertification triggers." },
      { type: "new", section: "Quick Reference Card", description: "Print-ready 1-page double-sided quick reference card for non-desk staff." },
      { type: "governance", section: "All Sections", description: "Last Updated dates added to every section header. Re-certification trigger added to the Onboarding Quiz." },
    ],
  },
  {
    version: "1.2.0",
    date: "March 26, 2026",
    summary: "Instagram content system expanded with Post Anatomy, Reel Storyboard, and Content Calendar.",
    requiresRecertification: false,
    changes: [
      { type: "new", section: "Instagram — Post Anatomy", description: "Annotated phone mockup with 6 clickable zones showing exact placement specs for both brands." },
      { type: "new", section: "Instagram — Reel Storyboard", description: "6-frame storyboard template (Hook → Setup → Action → Detail → Reaction → Close) for Tier 1 and WSC." },
      { type: "new", section: "Instagram — Content Calendar", description: "7-day weekly posting cadence with color-coded content pillars and per-day format guidance." },
      { type: "updated", section: "Instagram Guidelines", description: "Tab count expanded from 7 to 10. Tier 1 / WSC switcher now applies to all 10 tabs." },
    ],
  },
  {
    version: "1.1.0",
    date: "March 25, 2026",
    summary: "Instagram Guidelines section added with Post Anatomy, Reel Storyboard, and Content Calendar.",
    requiresRecertification: false,
    changes: [
      { type: "new", section: "Instagram Guidelines", description: "Full Instagram post and video guidelines for Tier 1 and WSC: 7 sub-tabs covering formats, visual rules, captions, hashtags, content mix, and do's & don'ts." },
      { type: "updated", section: "Instagram Guidelines", description: "Post Anatomy, Reel Storyboard, and Content Calendar sub-tabs added." },
      { type: "new", section: "Brand Checklist", description: "Pre-publish compliance checklist with 21 items across 5 categories. Tier 1 / WSC filter." },
      { type: "new", section: "CSS Variables Export", description: "One-click copy of full :root {} CSS variable block for both brand palettes." },
      { type: "new", section: "Sidebar Search", description: "Real-time search/filter across all 20+ nav sections with keyword highlighting." },
    ],
  },
  {
    version: "1.0.0",
    date: "March 24, 2026",
    summary: "Initial Brand Kit launch. All core guidelines sections from the WSC Tier 1 Brand Voice Guidelines document.",
    requiresRecertification: false,
    changes: [
      { type: "new", section: "Brand Architecture", description: "Two-brand hierarchy: Tier 1 Performance + WSC." },
      { type: "new", section: "Core Values", description: "7 core values with descriptions." },
      { type: "new", section: "We Are / We Are Not", description: "Full identity anchor table for both brands." },
      { type: "new", section: "Color Palette", description: "Complete color systems for Tier 1 (dark) and WSC (warm parchment) with hex codes." },
      { type: "new", section: "Typography", description: "Oswald (Tier 1) and Inter (WSC) type specimens with hierarchy rules." },
      { type: "new", section: "Logo Gallery", description: "All 11 WSC and Tier 1 logo variants with download buttons." },
      { type: "new", section: "Signage Concepts", description: "8 signage types with visual mockups." },
      { type: "new", section: "Voice Constants", description: "6 voice constants with DO / DON'T examples." },
      { type: "new", section: "Tone-by-Context Matrix", description: "Full channel × tone × sample language table." },
      { type: "new", section: "Messaging Pillars", description: "5 pillars with proof points." },
      { type: "new", section: "Taglines & Vocabulary", description: "Click-to-copy taglines and approved/avoid word banks." },
      { type: "new", section: "Channel Guidelines", description: "Platform-by-platform rules." },
      { type: "new", section: "Terminology Guide", description: "Approved terms with avoid alternatives." },
      { type: "new", section: "Anti-Patterns", description: "Never-do rules with wrong/right examples." },
    ],
  },
];

// ─── Change Type Config ───────────────────────────────────────────────────────
const CHANGE_TYPE_CONFIG: Record<ChangeType, { label: string; color: string; bg: string }> = {
  new:        { label: "NEW",        color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  updated:    { label: "UPDATED",    color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  removed:    { label: "REMOVED",    color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  governance: { label: "GOVERNANCE", color: "#c9a84c", bg: "rgba(201,168,76,0.12)" },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function VersionChangelog() {
  const [expandedVersion, setExpandedVersion] = useState<string>("1.3.0");
  const [filterType, setFilterType] = useState<ChangeType | "all">("all");

  const filterTypes: { value: ChangeType | "all"; label: string }[] = [
    { value: "all", label: "All Changes" },
    { value: "new", label: "New" },
    { value: "updated", label: "Updated" },
    { value: "governance", label: "Governance" },
    { value: "removed", label: "Removed" },
  ];

  return (
    <div
      id="changelog"
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
          title="Version Changelog"
          subtitle="A complete record of every change to the Brand Kit. Re-certification is required when a version is marked with a trigger."
        />
        {/* Current version badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
          <div style={{
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.4)",
            borderRadius: "4px",
            padding: "8px 16px",
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "20px",
            color: "#3b82f6",
            letterSpacing: "0.05em",
          }}>
            v{KIT_VERSION}
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a0a5ad", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Current Version
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a0a5ad" }}>
            Last Updated: {KIT_LAST_UPDATED}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
        {filterTypes.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilterType(f.value)}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "6px 14px",
              border: filterType === f.value ? "1px solid #3b82f6" : "1px solid rgba(255,255,255,0.1)",
              background: filterType === f.value ? "rgba(59,130,246,0.15)" : "transparent",
              color: filterType === f.value ? "#3b82f6" : "#a0a5ad",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Changelog entries */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {CHANGELOG.map((entry) => {
          const isExpanded = expandedVersion === entry.version;
          const filteredChanges = filterType === "all" ? entry.changes : entry.changes.filter((c) => c.type === filterType);
          if (filterType !== "all" && filteredChanges.length === 0) return null;

          return (
            <div
              key={entry.version}
              style={{
                background: "#22262b",
                border: isExpanded ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.2s ease",
              }}
            >
              {/* Version header row */}
              <button
                onClick={() => setExpandedVersion(isExpanded ? "" : entry.version)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  flexWrap: "wrap",
                }}
              >
                {/* Version number */}
                <div style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "#e8e8e8",
                  letterSpacing: "0.05em",
                  minWidth: "60px",
                }}>
                  v{entry.version}
                </div>

                {/* Date */}
                <div style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  color: "#a0a5ad",
                  minWidth: "120px",
                }}>
                  {entry.date}
                </div>

                {/* Recertification badge */}
                {entry.requiresRecertification && (
                  <div style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    background: "rgba(239,68,68,0.15)",
                    border: "1px solid rgba(239,68,68,0.4)",
                    color: "#ef4444",
                  }}>
                    Re-certification Required
                  </div>
                )}

                {/* Change count */}
                <div style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  color: "#a0a5ad",
                  marginLeft: "auto",
                  marginRight: "16px",
                }}>
                  {entry.changes.length} change{entry.changes.length !== 1 ? "s" : ""}
                </div>

                {/* Expand arrow */}
                <div style={{
                  color: "#a0a5ad",
                  fontSize: "16px",
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}>
                  ▾
                </div>
              </button>

              {/* Summary */}
              {isExpanded && (
                <div style={{ padding: "0 24px 24px" }}>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#a0a5ad",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "20px",
                  }}>
                    {entry.summary}
                  </p>

                  {/* Change list */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {filteredChanges.map((change, i) => {
                      const cfg = CHANGE_TYPE_CONFIG[change.type];
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            gap: "16px",
                            alignItems: "flex-start",
                            padding: "12px 16px",
                            background: "#1a1d21",
                            borderLeft: `3px solid ${cfg.color}`,
                          }}
                        >
                          {/* Type badge */}
                          <div style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            padding: "3px 8px",
                            background: cfg.bg,
                            color: cfg.color,
                            whiteSpace: "nowrap",
                            marginTop: "1px",
                            flexShrink: 0,
                          }}>
                            {cfg.label}
                          </div>

                          <div style={{ flex: 1 }}>
                            {/* Section name */}
                            <div style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#e8e8e8",
                              marginBottom: "4px",
                            }}>
                              {change.section}
                            </div>
                            {/* Description */}
                            <div style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              color: "#a0a5ad",
                              lineHeight: 1.5,
                            }}>
                              {change.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div style={{
        marginTop: "48px",
        padding: "20px 24px",
        background: "rgba(201,168,76,0.08)",
        border: "1px solid rgba(201,168,76,0.2)",
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
      }}>
        <div style={{ color: "#c9a84c", fontSize: "18px", flexShrink: 0 }}>⚑</div>
        <div>
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            fontWeight: 700,
            color: "#c9a84c",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}>
            Re-certification Policy
          </div>
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            color: "#a0a5ad",
            lineHeight: 1.6,
          }}>
            When a version is marked <strong style={{ color: "#ef4444" }}>Re-certification Required</strong>, all team members who previously completed the Brand Onboarding Quiz must re-take the affected chapters. The Brand Onboarding Quiz section will display a notification banner when your certification is out of date relative to the current kit version.
          </div>
        </div>
      </div>
    </div>
  );
}
