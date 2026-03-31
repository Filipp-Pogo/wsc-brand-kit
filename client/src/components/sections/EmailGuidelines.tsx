/**
 * EmailGuidelines — Email Marketing Guidelines for Tier 1 and WSC
 * Design: "The Performance Codex"
 * Brand rules: Oswald 700 uppercase headers, Inter body, zero radius,
 * blue accent (#3b82f6) for Tier 1, warm parchment (#e8e0d3) for WSC.
 */

import { useState } from "react";
import { SectionHeader } from "@/pages/Home";
import { toast } from "sonner";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BRANDS = {
  tier1: {
    label: "Tier 1 Performance",
    bg: "#0f1114",
    card: "#1a1d21",
    surface: "#22262b",
    accent: "#3b82f6",
    text: "#e8e8e8",
    muted: "#a0a5ad",
    border: "rgba(255,255,255,0.06)",
    accentBorder: "rgba(59,130,246,0.3)",
    dark: true,
  },
  wsc: {
    label: "Woodinville Sports Club",
    bg: "#e8e0d3",
    card: "#faf9f5",
    surface: "#ded6c9",
    accent: "#4cabfd",
    text: "#0e0a07",
    muted: "#84786f",
    border: "rgba(14,10,7,0.08)",
    accentBorder: "rgba(76,171,253,0.3)",
    dark: false,
  },
};

const EMAIL_TYPES = {
  tier1: [
    {
      type: "Enrollment Confirmation",
      category: "Transactional",
      subjectFormula: "[First Name], your Tier 1 Academy enrollment is confirmed",
      preheader: "Session details, what to bring, and what to expect on Day 1.",
      tone: "Direct, confident, operational",
      cta: "View Your Schedule",
      doList: [
        "Lead with confirmation — athlete name, program, start date, location",
        "Include a single clear CTA to view the schedule or portal",
        "Close with coach name and direct contact — not a generic email address",
        "Use Oswald 700 uppercase for the header line only",
        "Keep body copy under 150 words — athletes and parents are busy",
      ],
      dontList: [
        "Do not use exclamation points or celebratory language ('Congrats!')",
        "Do not include promotional content in transactional emails",
        "Do not use 'Dear [First Name]' — use '[First Name],' only",
        "Do not send from a no-reply address — always use a monitored inbox",
      ],
      template: `[First Name],

Your enrollment in Tier 1 Performance Academy is confirmed.

Program: [Program Name]
Start Date: [Date]
Location: [Facility / Court]
Coach: [Coach Name]

What to bring: [List]

Questions? Reply directly to this email or contact [Coach Name] at [email].

The Standard Is The Standard.
Tier 1 Performance Academy`,
    },
    {
      type: "Session Reminder",
      category: "Transactional",
      subjectFormula: "Tomorrow: [Program Name] — [Time], [Location]",
      preheader: "Everything you need for tomorrow's session.",
      tone: "Operational, brief, no fluff",
      cta: "View Session Details",
      doList: [
        "Send 24 hours before — not 72, not 1 hour",
        "Lead with the time and location — that's all they need",
        "Include a weather note if the session is outdoors",
        "One CTA maximum — 'View Session Details' or 'Contact Coach'",
        "Sign with the coach's first name only",
      ],
      dontList: [
        "Do not send motivational quotes in reminder emails",
        "Do not include promotional content or upsells",
        "Do not use passive language ('Just a reminder that...')",
        "Do not include attachments — link to the portal instead",
      ],
      template: `[First Name],

Tomorrow's session:

[Program Name]
[Day], [Date] · [Time]
[Location / Court]

Coach: [Coach Name]

See you on the court.
[Coach First Name]`,
    },
    {
      type: "Program Announcement",
      category: "Marketing",
      subjectFormula: "New: [Program Name] — [Season/Year] enrollment open",
      preheader: "Limited spots. Built for athletes serious about development.",
      tone: "Authoritative, aspirational, specific",
      cta: "View Program Details",
      doList: [
        "Lead with what the program delivers — not what it is",
        "Include specific details: age range, session count, schedule, price",
        "Use one athlete quote or result as social proof — real, not generic",
        "One primary CTA: 'View Program Details' — not 'Sign Up Now'",
        "Close with scarcity if real: 'Limited to 8 athletes per cohort'",
      ],
      dontList: [
        "Do not use discount language or 'limited time offer' framing",
        "Do not use stock photography in email headers",
        "Do not write more than 200 words of body copy",
        "Do not include multiple CTAs — one action per email",
      ],
      template: `[First Name],

[Program Name] enrollment is now open for [Season/Year].

[One sentence: what this program builds in athletes.]

Program details:
— [Age range / Level]
— [Session count and frequency]
— [Start date]
— [Price / payment options]

[One athlete result or quote — real name, real outcome.]

Limited to [X] athletes per cohort.

[CTA Button: View Program Details]

The Standard Is The Standard.
Tier 1 Performance Academy`,
    },
    {
      type: "Re-Engagement",
      category: "Marketing",
      subjectFormula: "[First Name], your development doesn't stop in the off-season",
      preheader: "Here's what serious athletes are working on right now.",
      tone: "Direct, challenging, no guilt",
      cta: "See What's Available",
      doList: [
        "Address the athlete directly — not the parent",
        "Reference what they trained on previously if possible",
        "Frame the message around what they're missing, not what we're offering",
        "Keep it under 100 words — this is a nudge, not a pitch",
        "One CTA: 'See What's Available'",
      ],
      dontList: [
        "Do not use guilt-based language ('We miss you')",
        "Do not offer a discount to re-engage — it devalues the program",
        "Do not send more than one re-engagement email per quarter",
        "Do not include multiple program options — one clear path forward",
      ],
      template: `[First Name],

The off-season is where the gap widens.

Athletes currently in [Program Name] are [specific training focus]. The ones who show up in [Month] ahead are the ones who started now.

[CTA Button: See What's Available]

Tier 1 Performance Academy`,
    },
  ],
  wsc: [
    {
      type: "Member Welcome",
      category: "Transactional",
      subjectFormula: "Welcome to Woodinville Sports Club, [First Name]",
      preheader: "Everything you need to get started at WSC.",
      tone: "Warm, welcoming, practical",
      cta: "Explore Your Membership",
      doList: [
        "Open with a warm, personal welcome — use their first name",
        "Include the three most important things they need to know on Day 1",
        "Introduce the facility — courts, amenities, programs available",
        "Include a direct contact for questions — not a generic support email",
        "Close with the WSC tagline: 'Elevate Your Game. Enrich Your Life.'",
      ],
      dontList: [
        "Do not use corporate language ('We are pleased to inform you...')",
        "Do not overwhelm with every feature — three things maximum",
        "Do not include promotional content in the welcome email",
        "Do not use a no-reply sender address",
      ],
      template: `[First Name],

Welcome to Woodinville Sports Club. We're glad you're here.

Here's what you need to know to get started:

1. [Most important first step — e.g., download the app / book your first court]
2. [Second key action — e.g., explore programs / meet your member services contact]
3. [Third — e.g., upcoming events or community moments]

Questions? Contact [Name] directly at [email or phone].

Elevate Your Game. Enrich Your Life.
Woodinville Sports Club`,
    },
    {
      type: "Event Invitation",
      category: "Marketing",
      subjectFormula: "[Event Name] — [Date] at Woodinville Sports Club",
      preheader: "Join us for [brief event description].",
      tone: "Community-forward, warm, inviting",
      cta: "Reserve Your Spot",
      doList: [
        "Lead with the event name and date — not a teaser headline",
        "Describe who the event is for in the first sentence",
        "Include practical details: time, location, what to bring, cost",
        "Use community language — 'Join us', 'Bring the family', 'See you there'",
        "One CTA: 'Reserve Your Spot' or 'RSVP Now'",
      ],
      dontList: [
        "Do not use urgency language ('Act fast!', 'Don't miss out!')",
        "Do not include more than one event per email",
        "Do not use stock photography for WSC events — real facility imagery only",
        "Do not send event invitations more than 3 weeks in advance",
      ],
      template: `[First Name],

You're invited to [Event Name] at Woodinville Sports Club.

[One sentence: what the event is and who it's for.]

Date: [Day], [Date]
Time: [Start] – [End]
Location: [Specific area of WSC]
Cost: [Free / $X per person]

[One sentence about the experience or community element.]

[CTA Button: Reserve Your Spot]

We hope to see you there.
Woodinville Sports Club`,
    },
    {
      type: "Newsletter",
      category: "Marketing",
      subjectFormula: "WSC Update — [Month Year]",
      preheader: "What's happening at the club this month.",
      tone: "Community, informative, warm",
      cta: "Read More / Book Now",
      doList: [
        "Lead with the most important update — one sentence, above the fold",
        "Limit to 3–4 items maximum — each with a headline and 2–3 sentences",
        "Include at least one community story or member spotlight per issue",
        "Use real facility photography — not stock",
        "Close with upcoming events and a direct contact",
      ],
      dontList: [
        "Do not write more than 400 words total",
        "Do not include more than 4 separate topics",
        "Do not use the newsletter to push sales — inform first, sell second",
        "Do not send more than twice per month",
      ],
      template: `[First Name],

Here's what's happening at Woodinville Sports Club this [Month].

[HEADLINE 1]
[2–3 sentences. What happened or what's coming. Real, specific, community-focused.]

[HEADLINE 2]
[2–3 sentences.]

[HEADLINE 3 — Member Spotlight or Community Moment]
[2–3 sentences. Real name, real story.]

Upcoming:
— [Event 1] · [Date]
— [Event 2] · [Date]

Questions? [Contact name and email].

Elevate Your Game. Enrich Your Life.
Woodinville Sports Club`,
    },
    {
      type: "Program Promotion",
      category: "Marketing",
      subjectFormula: "[Program Name] — now enrolling for [Season]",
      preheader: "A program built for [audience]. [Season] spots are open.",
      tone: "Warm, aspirational, community-connected",
      cta: "Learn More",
      doList: [
        "Lead with the benefit to the member — not the program features",
        "Connect the program to the WSC community and facility",
        "Include a real participant quote or outcome if available",
        "One primary CTA: 'Learn More' — not 'Enroll Now'",
        "Close with a direct contact for questions",
      ],
      dontList: [
        "Do not use discount or urgency language",
        "Do not describe the program in technical terms — speak to the experience",
        "Do not include more than one program per email",
        "Do not use Tier 1 performance language in WSC program emails",
      ],
      template: `[First Name],

[Program Name] is now enrolling for [Season/Year].

[One sentence: what this program gives participants — the experience, not the features.]

[Optional: one real participant quote or outcome.]

Program details:
— [Who it's for]
— [Schedule]
— [Start date]
— [Cost]

[CTA Button: Learn More]

Questions? Contact [Name] at [email].

Elevate Your Game. Enrich Your Life.
Woodinville Sports Club`,
    },
  ],
};

const SUBJECT_RULES = [
  { rule: "Length", spec: "40–60 characters", reason: "Displays fully on mobile without truncation" },
  { rule: "Personalization", spec: "[First Name] in subject when relevant", reason: "Increases open rate — use sparingly, not on every email" },
  { rule: "Punctuation", spec: "No exclamation points. No ALL CAPS.", reason: "Reads as spam or low-quality sender" },
  { rule: "Emoji", spec: "Never in Tier 1. Rare and purposeful in WSC.", reason: "Tier 1 tone is sharp and direct. WSC can use one max." },
  { rule: "Questions", spec: "Avoid question-format subjects", reason: "Performs below statement-format in sports/performance context" },
  { rule: "Urgency", spec: "Never manufactured. Only real scarcity.", reason: "Discount culture undermines brand positioning" },
];

const TECHNICAL_SPECS = [
  { label: "Max Width", value: "600px" },
  { label: "Header Image", value: "600×200px minimum · 2× for retina" },
  { label: "Body Font", value: "Inter · 15px · 1.65 line-height" },
  { label: "Heading Font", value: "Oswald 700 (Tier 1) · Inter 300 (WSC)" },
  { label: "CTA Button", value: "Minimum 44×44px tap target · Full-width on mobile" },
  { label: "Footer", value: "Unsubscribe link · Physical address · Brand name" },
  { label: "Alt Text", value: "Required on all images" },
  { label: "Send Time", value: "Tue–Thu · 9–11am or 6–8pm local time" },
  { label: "Sender Name", value: "Tier 1 Performance Academy / Woodinville Sports Club" },
  { label: "Reply-To", value: "Always a monitored inbox — never no-reply@" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function EmailTypeCard({
  emailType,
  brand,
  onCopy,
}: {
  emailType: typeof EMAIL_TYPES.tier1[0];
  brand: typeof BRANDS.tier1;
  onCopy: (text: string, label: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        borderTop: `3px solid ${brand.accent}`,
        borderRight: `1px solid ${brand.border}`,
        borderBottom: `1px solid ${brand.border}`,
        borderLeft: `1px solid ${brand.border}`,
        backgroundColor: brand.card,
        marginBottom: "16px",
      }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left" as const,
        }}
      >
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: brand.accent,
              backgroundColor: brand.dark ? "rgba(59,130,246,0.1)" : "rgba(76,171,253,0.1)",
              padding: "3px 8px",
            }}
          >
            {emailType.category}
          </span>
          <span
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              textTransform: "uppercase" as const,
              letterSpacing: "-0.01em",
              color: brand.text,
            }}
          >
            {emailType.type}
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={brand.muted}
          strokeWidth="2"
          style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 200ms ease", flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {expanded && (
        <div style={{ borderTop: `1px solid ${brand.border}` }}>
          {/* Subject + Preheader */}
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${brand.border}` }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: brand.accent, marginBottom: "6px" }}>
                  Subject Line Formula
                </div>
                <div
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: brand.text, backgroundColor: brand.surface, padding: "10px 12px", lineHeight: 1.5 }}
                >
                  {emailType.subjectFormula}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: brand.accent, marginBottom: "6px" }}>
                  Preheader Text
                </div>
                <div
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: brand.text, backgroundColor: brand.surface, padding: "10px 12px", lineHeight: 1.5 }}
                >
                  {emailType.preheader}
                </div>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: brand.muted }}>Tone: </span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: brand.text }}>{emailType.tone}</span>
            </div>
          </div>

          {/* Do / Don't */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderBottom: `1px solid ${brand.border}` }}>
            <div style={{ padding: "16px 20px", borderRight: `1px solid ${brand.border}` }}>
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "12px", textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#22c55e", marginBottom: "10px" }}>
                Do
              </div>
              {emailType.doList.map((item, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <div style={{ width: "5px", height: "5px", backgroundColor: "#22c55e", flexShrink: 0, marginTop: "5px" }} />
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: brand.text, lineHeight: 1.55 }}>{item}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 20px" }}>
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "12px", textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#ef4444", marginBottom: "10px" }}>
                Don't
              </div>
              {emailType.dontList.map((item, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <div style={{ width: "5px", height: "5px", backgroundColor: "#ef4444", flexShrink: 0, marginTop: "5px" }} />
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: brand.text, lineHeight: 1.55 }}>{item}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Template */}
          <div style={{ padding: "16px 20px" }}>
            <div className="flex items-center justify-between mb-3">
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "12px", textTransform: "uppercase" as const, letterSpacing: "0.08em", color: brand.accent }}>
                Copy Template
              </div>
              <button
                onClick={() => onCopy(emailType.template, emailType.type)}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  padding: "6px 14px",
                  backgroundColor: brand.accent,
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Copy Template
              </button>
            </div>
            <pre
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                color: brand.muted,
                backgroundColor: brand.surface,
                padding: "16px",
                whiteSpace: "pre-wrap" as const,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {emailType.template}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function EmailGuidelines() {
  const [activeBrand, setActiveBrand] = useState<"tier1" | "wsc">("tier1");
  const [activeTab, setActiveTab] = useState<"types" | "subject" | "specs">("types");
  const brand = BRANDS[activeBrand];
  const emailTypes = EMAIL_TYPES[activeBrand];

  const copyTemplate = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} template copied`);
    });
  };

  const tabs = [
    { id: "types", label: "Email Types & Templates" },
    { id: "subject", label: "Subject Line Rules" },
    { id: "specs", label: "Technical Specs" },
  ];

  return (
    <div style={{ backgroundColor: brand.bg, transition: "background-color 300ms ease" }}>
      <div style={{ padding: "80px 48px" }}>
        <SectionHeader
          label="— Email Marketing"
          title="Email Guidelines"
          subtitle="Approved email types, subject line formulas, copy templates, and technical specifications for Tier 1 and WSC. Every email must be traceable to a brand voice constant."
          dark={brand.dark}
        />

        {/* Brand switcher */}
        <div className="flex gap-2 mt-10 mb-8">
          {(["tier1", "wsc"] as const).map((b) => (
            <button
              key={b}
              onClick={() => setActiveBrand(b)}
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                textTransform: "uppercase" as const,
                letterSpacing: "0.05em",
                padding: "10px 22px",
                backgroundColor: activeBrand === b ? brand.accent : "transparent",
                color: activeBrand === b ? "#ffffff" : brand.muted,
                borderTop: `1px solid ${activeBrand === b ? brand.accent : brand.border}`,
                borderRight: `1px solid ${activeBrand === b ? brand.accent : brand.border}`,
                borderBottom: `1px solid ${activeBrand === b ? brand.accent : brand.border}`,
                borderLeft: `1px solid ${activeBrand === b ? brand.accent : brand.border}`,
                cursor: "pointer",
                transition: "all 150ms ease",
              }}
            >
              {BRANDS[b].label}
            </button>
          ))}
        </div>

        {/* Tab nav */}
        <div className="flex gap-0 mb-8 flex-wrap" style={{ borderBottom: `1px solid ${brand.border}` }}>
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
                borderBottom: activeTab === tab.id ? `2px solid ${brand.accent}` : "2px solid transparent",
                color: activeTab === tab.id ? brand.accent : brand.muted,
                cursor: "pointer",
                marginBottom: "-1px",
                transition: "all 150ms ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Email Types */}
        {activeTab === "types" && (
          <div className="max-w-5xl">
            {emailTypes.map((et) => (
              <EmailTypeCard key={et.type} emailType={et} brand={brand} onCopy={copyTemplate} />
            ))}
          </div>
        )}

        {/* Subject Line Rules */}
        {activeTab === "subject" && (
          <div className="max-w-5xl">
            <div
              style={{
                borderTop: `3px solid ${brand.accent}`,
                borderRight: `1px solid ${brand.border}`,
                borderBottom: `1px solid ${brand.border}`,
                borderLeft: `1px solid ${brand.border}`,
                backgroundColor: brand.card,
                overflow: "hidden",
              }}
            >
              {/* Header row */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: "1fr 1.2fr 1.5fr",
                  backgroundColor: brand.surface,
                  borderBottom: `1px solid ${brand.border}`,
                }}
              >
                {["Rule", "Specification", "Reason"].map((h) => (
                  <div
                    key={h}
                    style={{
                      padding: "12px 16px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      color: brand.accent,
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>
              {SUBJECT_RULES.map((row, i) => (
                <div
                  key={row.rule}
                  className="grid"
                  style={{
                    gridTemplateColumns: "1fr 1.2fr 1.5fr",
                    backgroundColor: i % 2 === 0 ? brand.card : brand.surface,
                    borderBottom: i < SUBJECT_RULES.length - 1 ? `1px solid ${brand.border}` : "none",
                  }}
                >
                  <div style={{ padding: "14px 16px", fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "14px", textTransform: "uppercase" as const, letterSpacing: "-0.01em", color: brand.text }}>
                    {row.rule}
                  </div>
                  <div style={{ padding: "14px 16px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: brand.accent, fontWeight: 500 }}>
                    {row.spec}
                  </div>
                  <div style={{ padding: "14px 16px", fontFamily: "Inter, sans-serif", fontSize: "12px", color: brand.muted, lineHeight: 1.5 }}>
                    {row.reason}
                  </div>
                </div>
              ))}
            </div>

            {/* Approved openers */}
            <div style={{ marginTop: "32px" }}>
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "16px", textTransform: "uppercase" as const, letterSpacing: "0.02em", color: brand.text, marginBottom: "16px" }}>
                Approved Opening Lines
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(activeBrand === "tier1" ? [
                  "[First Name], your enrollment is confirmed.",
                  "Tomorrow's session: [Program] · [Time] · [Location]",
                  "[Program Name] enrollment is now open for [Season].",
                  "The off-season is where the gap widens.",
                  "[First Name], [Coach Name] has a note for you.",
                  "New: [Program Name] — built for athletes serious about development.",
                ] : [
                  "Welcome to Woodinville Sports Club, [First Name].",
                  "You're invited to [Event Name] at WSC.",
                  "Here's what's happening at the club this [Month].",
                  "[Program Name] is now enrolling for [Season].",
                  "[First Name], your membership is confirmed.",
                  "A note from the WSC team.",
                ]).map((line, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: brand.surface,
                      borderLeft: `3px solid ${brand.accent}`,
                      borderTop: `1px solid ${brand.border}`,
                      borderRight: `1px solid ${brand.border}`,
                      borderBottom: `1px solid ${brand.border}`,
                      padding: "12px 14px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      color: brand.text,
                      lineHeight: 1.5,
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Technical Specs */}
        {activeTab === "specs" && (
          <div className="max-w-3xl">
            <div
              style={{
                borderTop: `3px solid ${brand.accent}`,
                borderRight: `1px solid ${brand.border}`,
                borderBottom: `1px solid ${brand.border}`,
                borderLeft: `1px solid ${brand.border}`,
                backgroundColor: brand.card,
                overflow: "hidden",
              }}
            >
              {TECHNICAL_SPECS.map((spec, i) => (
                <div
                  key={spec.label}
                  className="flex gap-0"
                  style={{
                    borderBottom: i < TECHNICAL_SPECS.length - 1 ? `1px solid ${brand.border}` : "none",
                    backgroundColor: i % 2 === 0 ? brand.card : brand.surface,
                  }}
                >
                  <div
                    style={{
                      padding: "14px 20px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      color: brand.accent,
                      minWidth: "160px",
                      flexShrink: 0,
                      borderRight: `1px solid ${brand.border}`,
                    }}
                  >
                    {spec.label}
                  </div>
                  <div
                    style={{
                      padding: "14px 20px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      color: brand.text,
                      lineHeight: 1.5,
                    }}
                  >
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer requirement */}
            <div
              style={{
                marginTop: "24px",
                backgroundColor: brand.dark ? "rgba(59,130,246,0.06)" : "rgba(76,171,253,0.06)",
                borderTop: `1px solid ${brand.accentBorder}`,
                borderRight: `1px solid ${brand.accentBorder}`,
                borderBottom: `1px solid ${brand.accentBorder}`,
                borderLeft: `3px solid ${brand.accent}`,
                padding: "16px 20px",
              }}
            >
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "13px", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: brand.accent, marginBottom: "8px" }}>
                Required Footer Elements
              </div>
              <div className="flex flex-col gap-1">
                {[
                  `Brand name: "${activeBrand === "tier1" ? "Tier 1 Performance Academy" : "Woodinville Sports Club"}"`,
                  "Physical address: WSC facility address",
                  "Unsubscribe link: CAN-SPAM compliant",
                  "Tagline: \"Elevate Your Game. Enrich Your Life.\"",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div style={{ width: "4px", height: "4px", backgroundColor: brand.accent, flexShrink: 0, marginTop: "6px" }} />
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: brand.muted }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
