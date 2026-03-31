/**
 * PresentationTemplateGuide.tsx
 * Design: "The Performance Codex" — dark charcoal base, blue accents for Tier 1, parchment for WSC
 * Section: Content Production — slide layout rules for internal decks, parent presentations, and recruitment materials
 */

import { useState } from "react";
import { toast } from "sonner";
import { SectionHeader } from "@/pages/Home";

// ─── Data ────────────────────────────────────────────────────────────────────

type PresentationType = "internal" | "parent" | "recruitment" | "partner" | "event";
type Brand = "tier1" | "wsc" | "both";

interface SlideLayout {
  id: string;
  name: string;
  description: string;
  useCase: string;
  doList: string[];
  dontList: string[];
}

interface PresentationTemplate {
  id: PresentationType;
  label: string;
  icon: string;
  brand: Brand;
  audience: string;
  purpose: string;
  slideCount: string;
  keyLayouts: SlideLayout[];
  colorGuidance: string;
  fontGuidance: string;
  imageGuidance: string;
  toneGuidance: string;
  checklist: string[];
}

const PRESENTATION_TEMPLATES: PresentationTemplate[] = [
  {
    id: "internal",
    label: "Internal Deck",
    icon: "📋",
    brand: "both",
    audience: "Staff, coaches, contractors",
    purpose: "Operations, strategy, training, updates",
    slideCount: "5–15 slides",
    colorGuidance: "Use the brand of the team being addressed — Tier 1 dark palette for academy staff, WSC parchment for facility staff. Internal decks may use slightly looser color application but never mix brand palettes in a single deck.",
    fontGuidance: "Oswald 700 for slide titles (all caps). Inter 400 for body text. Minimum 18pt body text. No decorative fonts.",
    imageGuidance: "Staff and facility photos only. No athlete photos without consent. Diagrams and charts preferred over stock photography for internal content.",
    toneGuidance: "Direct and efficient. Skip the marketing language — staff know the brand. Focus on clarity, action items, and accountability.",
    keyLayouts: [
      {
        id: "int-title",
        name: "Title Slide",
        description: "Opening slide with deck title, date, and presenter name.",
        useCase: "First slide of every internal deck.",
        doList: ["Use brand logo in top-left corner", "Include date and presenter name", "Keep title to 6 words or fewer", "Use brand accent color for the title"],
        dontList: ["Do not use a hero image on internal title slides", "Do not include taglines on internal decks", "Do not mix Tier 1 and WSC logos on the same slide"],
      },
      {
        id: "int-agenda",
        name: "Agenda / Contents",
        description: "Numbered list of topics with estimated time per item.",
        useCase: "Second slide for decks over 10 minutes.",
        doList: ["Number each agenda item", "Include time estimates", "Use consistent list formatting"],
        dontList: ["Do not use bullet points without numbers for agenda items", "Do not exceed 8 agenda items on one slide"],
      },
      {
        id: "int-data",
        name: "Data / Metrics",
        description: "Charts, tables, and KPI callouts.",
        useCase: "Performance reviews, enrollment reports, financial summaries.",
        doList: ["Label all axes and data points", "Use brand accent color for primary data series", "Include a one-sentence insight below each chart"],
        dontList: ["Do not use 3D charts", "Do not use more than 3 data series per chart", "Do not present data without context"],
      },
    ],
    checklist: [
      "Correct brand palette for the audience",
      "Oswald 700 for all slide titles",
      "No mixed brand logos",
      "Action items clearly labeled",
      "Date and presenter name on title slide",
    ],
  },
  {
    id: "parent",
    label: "Parent Presentation",
    icon: "👨‍👩‍👧",
    brand: "tier1",
    audience: "Current and prospective academy parents",
    purpose: "Program overview, enrollment, season kickoff, progress updates",
    slideCount: "10–20 slides",
    colorGuidance: "Always use Tier 1 cold dark palette. Parents attending academy presentations expect the performance brand. WSC branding should not appear unless presenting a joint facility event.",
    fontGuidance: "Oswald 700 for titles. Inter 400 for body. Minimum 20pt body text — parents may be viewing from a distance. Avoid Inter Light for parent-facing content.",
    imageGuidance: "High-quality athlete action photos (with consent). Court and facility photos. Avoid stock photography — parents want to see the real environment. Photos should be sharp, well-lit, and consistent with Instagram Guidelines.",
    toneGuidance: "Confident and reassuring. Parents want to know their child is in expert hands. Lead with outcomes and development milestones. Avoid jargon — explain technical terms when used.",
    keyLayouts: [
      {
        id: "par-title",
        name: "Title Slide",
        description: "Program name, season/year, and Tier 1 wordmark.",
        useCase: "First slide of every parent presentation.",
        doList: ["Use Tier 1 logo prominently", "Include season and year", "Use a high-quality facility or athlete photo as background (dark overlay)", "White text on dark background"],
        dontList: ["Do not use WSC logo on Tier 1 parent presentations", "Do not use stock photography", "Do not use light backgrounds for parent presentations"],
      },
      {
        id: "par-outcomes",
        name: "Program Outcomes",
        description: "Key results, milestones, and athlete achievements.",
        useCase: "Second or third slide — establish credibility immediately.",
        doList: ["Lead with specific numbers (e.g., '12 athletes advanced to regional rankings')", "Use blue accent for key stats", "Include athlete quotes (with permission)"],
        dontList: ["Do not use vague claims without data", "Do not include athlete full names without consent"],
      },
      {
        id: "par-schedule",
        name: "Schedule / Calendar",
        description: "Training schedule, key dates, and milestones.",
        useCase: "Every parent presentation — parents always want schedule information.",
        doList: ["Use a clear table or timeline layout", "Highlight key dates in blue", "Include contact information for schedule questions"],
        dontList: ["Do not use dense paragraph text for schedules", "Do not present a schedule without a contact for questions"],
      },
    ],
    checklist: [
      "Tier 1 logo on every slide (footer or corner)",
      "All athlete photos have consent on file",
      "Outcomes and data on slide 2 or 3",
      "Schedule or key dates included",
      "Contact information on final slide",
      "Minimum 20pt body text",
      "No WSC branding unless joint event",
    ],
  },
  {
    id: "recruitment",
    label: "College Recruitment",
    icon: "🎓",
    brand: "tier1",
    audience: "College coaches, athletic directors, recruiting coordinators",
    purpose: "Athlete showcasing, program credibility, recruitment event overview",
    slideCount: "8–15 slides",
    colorGuidance: "Tier 1 cold dark palette only. College coaches are evaluating the program's professionalism. Every slide should reinforce elite performance identity.",
    fontGuidance: "Oswald 700 for all titles. Inter 500 for key stats. Inter 400 for body. Tighter line spacing than parent presentations — college coaches read faster.",
    imageGuidance: "Action photos, stat overlays, and ranking graphics. Photos must be high-resolution (minimum 1920px wide). Include court/facility photos to establish environment quality.",
    toneGuidance: "Peer-to-peer professional. College coaches are experts — speak their language. Lead with rankings, stats, and outcomes. Be specific. No filler slides.",
    keyLayouts: [
      {
        id: "rec-athlete",
        name: "Athlete Profile",
        description: "Individual athlete stats, rankings, and highlights.",
        useCase: "One slide per featured athlete.",
        doList: ["Include current UTR/ranking", "List tournament results (last 12 months)", "Include a high-quality action photo", "Add GPA and graduation year"],
        dontList: ["Do not include personal contact information for minors", "Do not use unofficial rankings", "Do not include photos without consent"],
      },
      {
        id: "rec-program",
        name: "Program Overview",
        description: "Training methodology, coaching credentials, and facility specs.",
        useCase: "Establish program credibility in the first 3 slides.",
        doList: ["List coach certifications and playing experience", "Include training hours per week", "Reference facility specs (court surfaces, APL equipment)"],
        dontList: ["Do not make unverifiable claims", "Do not compare directly to competitor programs by name"],
      },
    ],
    checklist: [
      "All athlete data is current (within 30 days)",
      "All athlete photos have consent on file",
      "Coach credentials listed and verified",
      "No personal contact info for minors",
      "Tier 1 logo on every slide",
      "Contact information for follow-up on final slide",
    ],
  },
  {
    id: "partner",
    label: "Partner / Sponsor Deck",
    icon: "🤝",
    brand: "both",
    audience: "Potential and current sponsors, community partners",
    purpose: "Partnership proposals, sponsorship packages, co-branding opportunities",
    slideCount: "10–20 slides",
    colorGuidance: "Lead with WSC parchment palette for community/facility partnerships. Use Tier 1 dark palette for performance/academy partnerships. Never mix palettes in the same deck — choose based on the primary relationship.",
    fontGuidance: "Oswald 700 for titles. Inter 400 for body. Partner decks should feel polished — tighter spacing and more whitespace than internal decks.",
    imageGuidance: "Facility photos, event photos, and community images. Avoid athlete photos in partner decks unless the partnership directly involves the academy program. Use co-branded mockups from the Co-Branding section.",
    toneGuidance: "Professional and aspirational. Partners want to understand the value exchange. Lead with audience reach, community impact, and brand alignment. Be specific about deliverables.",
    keyLayouts: [
      {
        id: "par-value",
        name: "Value Proposition",
        description: "What the partner gets — audience reach, brand exposure, community association.",
        useCase: "Slide 3–4 in every partner deck.",
        doList: ["Include specific audience numbers", "List all deliverables clearly", "Use a two-column layout (what we offer / what you get)"],
        dontList: ["Do not make promises that require GM approval without that approval", "Do not include pricing on slides — present verbally"],
      },
    ],
    checklist: [
      "Correct brand palette for partnership type",
      "Audience reach data is current",
      "All deliverables reviewed by Marketing Director",
      "No pricing on slides",
      "Co-branding mockups follow lockup rules",
      "GM approval obtained before presenting",
    ],
  },
  {
    id: "event",
    label: "Event / Ceremony",
    icon: "🏆",
    brand: "both",
    audience: "Athletes, parents, guests, media",
    purpose: "Award ceremonies, season-end events, showcase days, tournaments",
    slideCount: "5–30 slides (varies by event length)",
    colorGuidance: "Match the event brand — WSC events use parchment palette, Tier 1 events use dark palette. Joint events (e.g., campus-wide tournaments) use WSC as the host brand with Tier 1 acknowledged in the program.",
    fontGuidance: "Oswald 700 for all display text. Inter 400 for body. Event slides are often viewed from a distance — minimum 28pt body text. Generous line spacing.",
    imageGuidance: "Event and athlete photos are the hero content. Every slide should have at least one image. Use a consistent photo treatment (dark overlay, consistent crop) throughout the deck.",
    toneGuidance: "Celebratory and energetic. Event presentations should feel like a highlight reel. Short sentences, big visuals, minimal text. The audience is there to celebrate — not to read.",
    keyLayouts: [
      {
        id: "evt-award",
        name: "Award Announcement",
        description: "Recipient name, award title, and photo.",
        useCase: "One slide per award.",
        doList: ["Large photo of recipient", "Award name in Oswald 700", "Brief (1–2 sentence) citation below the name", "Blue accent for award title"],
        dontList: ["Do not include multiple awards on one slide", "Do not use small text — this is a display slide"],
      },
    ],
    checklist: [
      "Correct host brand palette",
      "Minimum 28pt body text",
      "All athlete photos have consent on file",
      "Award recipient names verified (spelling)",
      "Slide transitions are consistent (fade or none)",
      "Backup PDF version prepared",
    ],
  },
];

// ─── Slide Mockup ─────────────────────────────────────────────────────────────

function SlideMockup({ brand, type }: { brand: Brand; type: "title" | "content" | "data" }) {
  const isTier1 = brand === "tier1" || brand === "both";
  const bg = isTier1 ? "#0f1114" : "#faf9f5";
  const text = isTier1 ? "#ffffff" : "#0e0a07";
  const accent = isTier1 ? "#3b82f6" : "#0d1b2a";
  const subtext = isTier1 ? "#a0a5ad" : "#5a4f47";
  const surface = isTier1 ? "#1a1d21" : "#f0ece4";

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${accent}30`,
        aspectRatio: "16/9",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <div style={{ background: accent, height: "3px", width: "100%", flexShrink: 0 }} />
      {/* Logo area */}
      <div style={{ position: "absolute", top: "8px", left: "10px", fontSize: "6px", letterSpacing: "0.1em", color: accent, fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>
        {isTier1 ? "TIER 1" : "WSC"}
      </div>
      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: type === "title" ? "12px 16px" : "20px 14px 10px" }}>
        {type === "title" && (
          <>
            <div style={{ width: "20px", height: "2px", background: accent, marginBottom: "6px" }} />
            <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "13px", color: text, letterSpacing: "-0.01em", lineHeight: 1.1, textTransform: "uppercase", marginBottom: "4px" }}>
              SLIDE TITLE<br />GOES HERE
            </div>
            <div style={{ fontSize: "7px", color: subtext }}>Presenter Name · Date</div>
          </>
        )}
        {type === "content" && (
          <>
            <div style={{ fontSize: "8px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: accent, letterSpacing: "0.1em", marginBottom: "6px", textTransform: "uppercase" }}>
              SECTION TITLE
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", gap: "6px", marginBottom: "5px", alignItems: "flex-start" }}>
                <div style={{ width: "4px", height: "4px", background: accent, flexShrink: 0, marginTop: "3px" }} />
                <div style={{ background: subtext + "30", height: "6px", flex: 1, borderRadius: "1px" }} />
              </div>
            ))}
          </>
        )}
        {type === "data" && (
          <>
            <div style={{ fontSize: "8px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: accent, letterSpacing: "0.1em", marginBottom: "8px", textTransform: "uppercase" }}>
              KEY METRICS
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
              {[{ v: "87%", l: "Retention" }, { v: "24", l: "Athletes" }, { v: "#3", l: "Regional" }].map((stat) => (
                <div key={stat.l} style={{ background: surface, padding: "6px 4px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "11px", color: accent }}>{stat.v}</div>
                  <div style={{ fontSize: "6px", color: subtext }}>{stat.l}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* Bottom bar */}
      <div style={{ background: accent, height: "2px", width: "100%", flexShrink: 0 }} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PresentationTemplateGuide() {
  const [activeType, setActiveType] = useState<PresentationType>("internal");
  const [expandedLayout, setExpandedLayout] = useState<string | null>(null);

  const template = PRESENTATION_TEMPLATES.find((t) => t.id === activeType)!;

  function copyChecklist() {
    const text = `PRESENTATION CHECKLIST — ${template.label.toUpperCase()}\n${"-".repeat(50)}\n${template.checklist.map((item) => `[ ] ${item}`).join("\n")}`;
    navigator.clipboard.writeText(text).then(() => toast.success("Checklist copied to clipboard"));
  }

  return (
    <div>
      <SectionHeader
        label="Content Production"
        title="Presentation Template Guide"
        subtitle="Slide layout rules for every presentation type — internal decks, parent nights, college recruitment, partner proposals, and events. Follow these rules before creating any deck."
      />

      {/* Type tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
          marginBottom: "28px",
        }}
      >
        {PRESENTATION_TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveType(t.id)}
            style={{
              background: activeType === t.id ? "#22262b" : "#1a1d21",
              padding: "14px 10px",
              textAlign: "left",
              borderTop: activeType === t.id ? "2px solid #3b82f6" : "2px solid transparent",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "none",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <div style={{ fontSize: "16px", marginBottom: "4px" }}>{t.icon}</div>
            <div style={{ fontSize: "10px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.08em", color: activeType === t.id ? "#e8e8e8" : "#a0a5ad", textTransform: "uppercase" }}>
              {t.label}
            </div>
          </button>
        ))}
      </div>

      {/* Overview */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        {/* Left: meta */}
        <div style={{ background: "#22262b", border: "1px solid rgba(255,255,255,0.06)", padding: "20px" }}>
          <div style={{ fontSize: "9px", letterSpacing: "0.16em", color: "#3b82f6", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "12px" }}>
            {template.icon} {template.label.toUpperCase()}
          </div>
          {[
            { label: "AUDIENCE", value: template.audience },
            { label: "PURPOSE", value: template.purpose },
            { label: "SLIDE COUNT", value: template.slideCount },
            { label: "BRAND", value: template.brand === "both" ? "Context-dependent (see Color Guidance)" : template.brand === "tier1" ? "Tier 1 Performance" : "Woodinville Sports Club" },
          ].map((row) => (
            <div key={row.label} style={{ marginBottom: "10px" }}>
              <div style={{ fontSize: "9px", letterSpacing: "0.12em", color: "#a0a5ad", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "2px" }}>{row.label}</div>
              <div style={{ fontSize: "12px", color: "#e8e8e8", lineHeight: 1.4 }}>{row.value}</div>
            </div>
          ))}
        </div>

        {/* Right: slide mockups */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <div>
            <div style={{ fontSize: "8px", letterSpacing: "0.1em", color: "#a0a5ad", marginBottom: "4px" }}>TITLE SLIDE</div>
            <SlideMockup brand={template.brand === "both" ? "tier1" : template.brand} type="title" />
          </div>
          <div>
            <div style={{ fontSize: "8px", letterSpacing: "0.1em", color: "#a0a5ad", marginBottom: "4px" }}>CONTENT SLIDE</div>
            <SlideMockup brand={template.brand === "both" ? "tier1" : template.brand} type="content" />
          </div>
          <div>
            <div style={{ fontSize: "8px", letterSpacing: "0.1em", color: "#a0a5ad", marginBottom: "4px" }}>DATA SLIDE</div>
            <SlideMockup brand={template.brand === "both" ? "tier1" : template.brand} type="data" />
          </div>
          {template.brand === "both" && (
            <div>
              <div style={{ fontSize: "8px", letterSpacing: "0.1em", color: "#a0a5ad", marginBottom: "4px" }}>WSC VARIANT</div>
              <SlideMockup brand="wsc" type="title" />
            </div>
          )}
        </div>
      </div>

      {/* Design guidance */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        {[
          { label: "COLOR", value: template.colorGuidance },
          { label: "TYPOGRAPHY", value: template.fontGuidance },
          { label: "IMAGERY", value: template.imageGuidance },
          { label: "TONE", value: template.toneGuidance },
        ].map((item) => (
          <div key={item.label} style={{ background: "#22262b", border: "1px solid rgba(255,255,255,0.06)", padding: "14px 16px" }}>
            <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#3b82f6", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "6px" }}>{item.label}</div>
            <div style={{ fontSize: "12px", color: "#a0a5ad", lineHeight: 1.6 }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Key layouts */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "11px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.14em", color: "#e8e8e8", marginBottom: "12px" }}>
          KEY SLIDE LAYOUTS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {template.keyLayouts.map((layout) => {
            const isOpen = expandedLayout === layout.id;
            return (
              <div key={layout.id} style={{ background: "#22262b", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <button
                  onClick={() => setExpandedLayout(isOpen ? null : layout.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: "14px 16px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "12px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: "#e8e8e8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {layout.name}
                    </div>
                    <div style={{ fontSize: "11px", color: "#a0a5ad", marginTop: "2px" }}>{layout.description}</div>
                  </div>
                  <span style={{ color: "#3b82f6", fontSize: "14px", flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div style={{ padding: "0 16px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ paddingTop: "12px", marginBottom: "10px" }}>
                      <span style={{ fontSize: "9px", letterSpacing: "0.12em", color: "#a0a5ad", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>USE WHEN: </span>
                      <span style={{ fontSize: "11px", color: "#e8e8e8" }}>{layout.useCase}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <div style={{ fontSize: "9px", letterSpacing: "0.12em", color: "#10b981", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "6px" }}>DO</div>
                        {layout.doList.map((item, i) => (
                          <div key={i} style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
                            <span style={{ color: "#10b981", flexShrink: 0 }}>✓</span>
                            <span style={{ fontSize: "11px", color: "#a0a5ad", lineHeight: 1.4 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontSize: "9px", letterSpacing: "0.12em", color: "#ef4444", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "6px" }}>DON'T</div>
                        {layout.dontList.map((item, i) => (
                          <div key={i} style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
                            <span style={{ color: "#ef4444", flexShrink: 0 }}>✗</span>
                            <span style={{ fontSize: "11px", color: "#a0a5ad", lineHeight: 1.4 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pre-send checklist */}
      <div style={{ background: "#22262b", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "11px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.14em", color: "#3b82f6" }}>
            PRE-SEND CHECKLIST — {template.label.toUpperCase()}
          </div>
          <button
            onClick={copyChecklist}
            style={{
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.25)",
              color: "#3b82f6",
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "9px",
              letterSpacing: "0.1em",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            COPY CHECKLIST
          </button>
        </div>
        <div style={{ padding: "16px 20px" }}>
          {template.checklist.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "flex-start" }}>
              <div style={{ width: "16px", height: "16px", border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0, marginTop: "1px" }} />
              <span style={{ fontSize: "12px", color: "#e8e8e8", lineHeight: 1.4 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
