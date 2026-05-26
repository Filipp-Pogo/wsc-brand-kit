/*
 * InstagramGuidelines.tsx
 * WSC & Tier 1 Performance — Brand Kit
 * Design: "The Performance Codex" — dark charcoal for Tier 1, warm parchment for WSC
 * Full Instagram post + video/reel guidelines for both brands
 */

import { useState } from "react";
import { SectionHeader } from "@/pages/Home";
import { toast } from "sonner";
import { LOGOS } from "@/lib/brandData";

// ─── Data ────────────────────────────────────────────────────────────────────

const TIER1_POST_FORMATS = [
  {
    format: "Feed — Square",
    ratio: "1:1",
    px: "1080 × 1080 px",
    use: "Standard training content, athlete spotlights, milestone posts",
    primary: true,
  },
  {
    format: "Feed — Portrait",
    ratio: "4:5",
    px: "1080 × 1350 px",
    use: "Preferred for maximum feed real estate. Use for high-impact single images.",
    primary: true,
  },
  {
    format: "Reel / Video",
    ratio: "9:16",
    px: "1080 × 1920 px",
    use: "Training clips, drill breakdowns, athlete progress, behind-the-scenes",
    primary: true,
  },
  {
    format: "Story",
    ratio: "9:16",
    px: "1080 × 1920 px",
    use: "Real-time updates, polls, Q&A, event countdowns, quick clips",
    primary: false,
  },
  {
    format: "Carousel",
    ratio: "1:1 or 4:5",
    px: "1080 × 1080 or 1080 × 1350 px",
    use: "Multi-step breakdowns, before/after, program explainers, athlete journeys",
    primary: false,
  },
];

const WSC_POST_FORMATS = [
  {
    format: "Feed — Portrait",
    ratio: "4:5",
    px: "1080 × 1350 px",
    use: "Facility moments, family events, community highlights — primary format",
    primary: true,
  },
  {
    format: "Feed — Square",
    ratio: "1:1",
    px: "1080 × 1080 px",
    use: "Announcements, quotes, program promotions, event graphics",
    primary: true,
  },
  {
    format: "Reel / Video",
    ratio: "9:16",
    px: "1080 × 1920 px",
    use: "Facility tours, event recaps, member stories, seasonal content",
    primary: true,
  },
  {
    format: "Story",
    ratio: "9:16",
    px: "1080 × 1920 px",
    use: "Daily updates, event reminders, member shoutouts, behind-the-scenes",
    primary: false,
  },
  {
    format: "Carousel",
    ratio: "4:5",
    px: "1080 × 1350 px",
    use: "Program overviews, facility features, seasonal programming, event recaps",
    primary: false,
  },
];

const TIER1_VISUAL_RULES = [
  { rule: "Background", spec: "Dark charcoal (#1a1d21) or near-black. Never white or parchment." },
  { rule: "Text on image", spec: "Off-white (#e8e8e8) or blue (#3b82f6). Never black text on dark backgrounds." },
  { rule: "Headline font", spec: "Oswald 700, uppercase, tight letter-spacing (−0.02em). No other headline font." },
  { rule: "Body / caption font", spec: "Inter 400 or 500. Clean, readable. No decorative fonts." },
  { rule: "Corner radius", spec: "0rem — no rounded corners anywhere in graphics." },
  { rule: "Overlays", spec: "Dark gradient overlays only. Never white or warm overlays." },
  { rule: "Imagery", spec: "Real training moments. Athletes in motion. Grit, focus, process. No stock photos." },
  { rule: "Logo placement", spec: "White version only. Bottom-right or top-left. Minimum 40px clear space." },
  { rule: "Accent color", spec: "Blue (#3b82f6) for highlights, CTAs, and key data points only. Use sparingly." },
  { rule: "Borders / lines", spec: "Subtle white borders at 6–8% opacity only. No decorative borders." },
];

const WSC_VISUAL_RULES = [
  { rule: "Background", spec: "Parchment (#e8e0d3), cream (#faf9f5), or warm dark (#0a0704). Never cold charcoal." },
  { rule: "Text on image", spec: "Warm near-black (#0e0a07) on light backgrounds. Off-white (#e8e8e8) on dark." },
  { rule: "Headline font", spec: "Inter 300 (light) for warmth. Never Oswald — wrong emotional register for WSC." },
  { rule: "Body / caption font", spec: "Inter 400. Warm, approachable, readable." },
  { rule: "Corner radius", spec: "0.125rem maximum — barely perceptible. No large rounded corners." },
  { rule: "Overlays", spec: "Warm dark gradient overlays. Parchment-tinted overlays on lifestyle imagery." },
  { rule: "Imagery", spec: "Facility life, families, community moments, court/course beauty shots. Warm and natural." },
  { rule: "Logo placement", spec: "Black version on light backgrounds. White version on dark. Bottom-right preferred." },
  { rule: "Accent color", spec: "Blue (#4cabfd) for links and CTAs only. Warm tones carry the visual weight." },
  { rule: "Borders / lines", spec: "Warm parchment or subtle warm-dark borders. No cold grays." },
];

const TIER1_CAPTION_TEMPLATES = [
  {
    type: "Training Post",
    template: "[Athlete name] putting in the work.\n\n[One specific detail about what they did — drill, weight, reps, time.]\n\n[One line about what it means for their development.]\n\n#Tier1Performance #TrainWithoutLimits",
    note: "Lead with the person, not the program. Specific details over generic hype.",
  },
  {
    type: "Milestone / Achievement",
    template: "[Athlete name]. [Achievement — specific and factual.]\n\n[One sentence on the process that got them there.]\n\n[One sentence on what comes next.]\n\n#Tier1Performance #WeDontBuildRecreationalPlayers",
    note: "Milestones are earned, not celebrated generically. Show the work behind the result.",
  },
  {
    type: "Program / Drill Breakdown",
    template: "Why we train [specific movement/drill]:\n\n[Bullet 1 — biomechanical or tactical reason]\n[Bullet 2 — performance outcome]\n[Bullet 3 — how it transfers to competition]\n\nThis is the work.\n\n#Tier1Performance #APL",
    note: "Educational content builds authority. Always tie drills to competition outcomes.",
  },
  {
    type: "Culture / Behind-the-Scenes",
    template: "[Time of day or specific moment]. [What's happening — no fluff.]\n\n[One line that reveals something real about the culture.]\n\n#Tier1Performance #BuildHereCompeteEverywhere",
    note: "Authenticity over polish. Imperfect real moments beat perfect staged ones.",
  },
  {
    type: "Reel / Video Caption",
    template: "[Hook line — one sentence, no punctuation, all lowercase or CAPS]\n\n[One or two lines of context if needed]\n\n#Tier1Performance #[relevant secondary hashtag]",
    note: "Reels captions are secondary to the video. Hook line must work standalone.",
  },
];

const WSC_CAPTION_TEMPLATES = [
  {
    type: "Community / Member Story",
    template: "[Member name or family name] has been part of WSC for [time].\n\n[One specific thing they love or a moment that stood out.]\n\n[Warm closing line that invites others into the community.]\n\n#WoodinvilleSportsClub #ElevateYourGame",
    note: "Community stories are WSC's most powerful content. Use real names, real moments.",
  },
  {
    type: "Event / Program Announcement",
    template: "[Program or event name] is [happening / back / open for registration].\n\n[Two to three lines: what it is, who it's for, what makes it special.]\n\nLink in bio.\n\n#WoodinvilleSportsClub #[program-specific hashtag]",
    note: "One CTA only. Link in bio is the standard CTA — do not add multiple links.",
  },
  {
    type: "Facility / Lifestyle",
    template: "[Time of day or season]. [What's happening on the 67-acre campus.]\n\n[One line about what makes WSC a home, not just a facility.]\n\n#WoodinvilleSportsClub ",
    note: "Facility content should feel like an invitation, not a brochure.",
  },
  {
    type: "Seasonal / Holiday",
    template: "[Warm seasonal greeting tied to something real happening at WSC.]\n\n[One line connecting the season to the WSC community.]\n\n#WoodinvilleSportsClub",
    note: "Seasonal posts should feel personal and grounded — not generic holiday graphics.",
  },
  {
    type: "Reel / Video Caption",
    template: "[Warm hook — one sentence, inviting and specific]\n\n[One or two lines of context]\n\n#WoodinvilleSportsClub #ElevateYourGameEnrichYourLife",
    note: "WSC reels should feel warm and welcoming, not performance-driven.",
  },
];

const TIER1_HASHTAGS = {
  primary: ["#Tier1Performance", "#BuildHereCompeteEverywhere", "#WeDontBuildRecreationalPlayers"],
  secondary: ["#APL", "#AthleticPerformanceLab", "#TennisDevelopment", "#GolfDevelopment", "#AthleteDevelopment"],
  avoid: ["#Sports", "#Training", "#Fitness", "#Motivation", "#Hustle", "#Grind", "#Goals", "#Blessed"],
};

const WSC_HASHTAGS = {
  primary: ["#WoodinvilleSportsClub", "#ElevateYourGame", "#ElevateYourGameEnrichYourLife", ],
  secondary: ["#WoodinvilleWA", "#WoodinvilleTennis", "#WoodinvilleGolf", "#WSCFamily"],
  avoid: ["#Sports", "#Fitness", "#Community", "#Family", "#Fun", "#Lifestyle", "#Wellness", "#ActiveLifestyle"],
};

const TIER1_VIDEO_RULES = [
  { rule: "Opening frame", spec: "Action or athlete in motion within the first 0.5 seconds. No black intro frames, no logo intros." },
  { rule: "Duration — Reel", spec: "15–30 seconds optimal. 45 seconds maximum. Cut ruthlessly — every second must earn its place." },
  { rule: "Duration — Story", spec: "7–15 seconds per story card. Use multiple cards for longer content." },
  { rule: "Music / audio", spec: "High-energy, instrumental preferred. No lyrics that could distract from the athlete. Volume: background, not dominant." },
  { rule: "Text overlays", spec: "Oswald 700 uppercase. White or blue only. Bottom third preferred. Never cover the athlete's face or key action." },
  { rule: "Captions", spec: "Auto-captions on for all spoken content. Style: white text, no background box." },
  { rule: "Pacing", spec: "Fast cuts for training clips (0.5–1.5s per cut). Slower for emotional/milestone content (2–4s per cut)." },
  { rule: "Logo", spec: "White Tier 1 logo, bottom-right, appears at 2 seconds and stays to end. Never animated or bouncing." },
  { rule: "Color grade", spec: "Cool, high-contrast grade. Slightly desaturated. Never warm-toned or golden-hour filtered." },
  { rule: "Ending frame", spec: "Freeze on a strong action frame or athlete expression. Hold 1 second. Logo visible." },
];

const WSC_VIDEO_RULES = [
  { rule: "Opening frame", spec: "A warm, inviting moment — facility beauty shot, family interaction, or natural community scene within 1 second." },
  { rule: "Duration — Reel", spec: "20–45 seconds optimal. 60 seconds maximum for event recaps or facility tours." },
  { rule: "Duration — Story", spec: "10–20 seconds per story card. Warm pacing — do not rush." },
  { rule: "Music / audio", spec: "Warm, acoustic, or light instrumental. Uplifting but not aggressive. Volume: present but not overwhelming." },
  { rule: "Text overlays", spec: "Inter 300 or 400. Warm near-black on light scenes. Off-white on dark scenes. Never Oswald." },
  { rule: "Captions", spec: "Auto-captions on for all spoken content. Style: warm dark text, clean and readable." },
  { rule: "Pacing", spec: "Relaxed, flowing cuts (2–4s per cut). Facility tours and event recaps can hold longer (4–6s)." },
  { rule: "Logo", spec: "Black WSC logo on light backgrounds, white on dark. Bottom-right. Appears at 2 seconds. Never animated." },
  { rule: "Color grade", spec: "Warm, natural grade. Slightly golden. Parchment tones in highlights. Never cold or desaturated." },
  { rule: "Ending frame", spec: "Warm still — smiling face, beautiful facility shot, or community moment. Hold 1.5 seconds. Logo visible." },
];

const TIER1_CONTENT_PILLARS = [
  { pillar: "The Process", pct: "40%", desc: "Training footage, drill breakdowns, APL data, coaching moments. The daily grind.", color: "#3b82f6" },
  { pillar: "The Athlete", pct: "30%", desc: "Individual spotlights, milestones, personal stories, development arcs.", color: "#6366f1" },
  { pillar: "The Culture", pct: "20%", desc: "Behind-the-scenes, team moments, facility life, coach perspectives.", color: "#8b5cf6" },
  { pillar: "The Standard", pct: "10%", desc: "Program announcements, philosophy posts, recruiting content.", color: "#a78bfa" },
];

const WSC_CONTENT_PILLARS = [
  { pillar: "Community", pct: "35%", desc: "Member stories, family moments, events, belonging and connection.", color: "#4cabfd" },
  { pillar: "Facility Life", pct: "30%", desc: "Courts, courses, amenities, seasonal beauty, the 67-acre campus.", color: "#60a5fa" },
  { pillar: "Programming", pct: "25%", desc: "Program spotlights, event announcements, registration reminders.", color: "#93c5fd" },
  { pillar: "Inspiration", pct: "10%", desc: "Quotes, philosophy, seasonal content, values-driven posts.", color: "#bfdbfe" },
];

const DO_DONTS = {
  tier1: {
    dos: [
      "Show the real work — sweat, focus, repetition",
      "Name athletes and coaches specifically",
      "Use data and specifics (times, weights, rankings)",
      "Post during or immediately after training sessions",
      "Let the athlete's expression tell the story",
      "Use silence or ambient sound when it's more powerful than music",
    ],
    donts: [
      "Post generic motivational quotes with stock imagery",
      "Use warm filters, golden tones, or parchment backgrounds",
      "Write captions longer than 150 words",
      "Use Tier 1 content to promote WSC programs or events",
      "Post polished, studio-quality imagery that looks disconnected from training",
      "Use emojis beyond a single accent (⚡ or 🎾 maximum)",
    ],
  },
  wsc: {
    dos: [
      "Show real families and real members by name",
      "Capture the facility in natural light — morning, golden hour",
      "Connect seasonal content to something actually happening at WSC",
      "Use warm, conversational language — write like you're talking to a neighbor",
      "Tag members and families when they've given permission",
      "Post event content before, during, and after for full coverage",
    ],
    donts: [
      "Use Oswald font or cold charcoal backgrounds",
      "Post performance/training content that belongs to Tier 1",
      "Use discount or promotional language ('sale', '% off', 'deal')",
      "Post without a clear subject — every post needs a person or a place",
      "Use generic stock smiles or staged family photos",
      "Overload captions with hashtags — maximum 5 per post",
    ],
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormatCard({ f, dark }: { f: typeof TIER1_POST_FORMATS[0]; dark: boolean }) {
  return (
    <div
      style={{
        backgroundColor: dark ? "#22262b" : "#faf9f5",
        borderTop: f.primary
          ? `3px solid ${dark ? "#3b82f6" : "#4cabfd"}`
          : `3px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(14,10,7,0.1)"}`,
        borderRight: dark
          ? f.primary ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(255,255,255,0.06)"
          : f.primary ? "1px solid rgba(76,171,253,0.4)" : "1px solid rgba(14,10,7,0.1)",
        borderBottom: dark
          ? f.primary ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(255,255,255,0.06)"
          : f.primary ? "1px solid rgba(76,171,253,0.4)" : "1px solid rgba(14,10,7,0.1)",
        borderLeft: dark
          ? f.primary ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(255,255,255,0.06)"
          : f.primary ? "1px solid rgba(76,171,253,0.4)" : "1px solid rgba(14,10,7,0.1)",
        padding: "18px 20px",
        position: "relative" as const,
      }}
    >
      {f.primary && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            fontFamily: "Inter, sans-serif",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            color: dark ? "#3b82f6" : "#4cabfd",
            backgroundColor: dark ? "rgba(59,130,246,0.1)" : "rgba(76,171,253,0.1)",
            border: dark ? "1px solid rgba(59,130,246,0.2)" : "1px solid rgba(76,171,253,0.2)",
            padding: "2px 6px",
          }}
        >
          Primary
        </div>
      )}
      <div
        style={{
          fontFamily: "Oswald, sans-serif",
          fontWeight: 700,
          fontSize: "15px",
          textTransform: "uppercase" as const,
          letterSpacing: "-0.01em",
          color: dark ? "#ffffff" : "#0e0a07",
          marginBottom: "6px",
        }}
      >
        {f.format}
      </div>
      <div className="flex items-center gap-3 mb-3">
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: dark ? "#3b82f6" : "#4cabfd",
          }}
        >
          {f.ratio}
        </span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: dark ? "#a0a5ad" : "#84786f" }}>
          {f.px}
        </span>
      </div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: dark ? "#a0a5ad" : "#4b4038", lineHeight: 1.55 }}>
        {f.use}
      </p>
    </div>
  );
}

function CaptionTemplate({ t, dark }: { t: typeof TIER1_CAPTION_TEMPLATES[0]; dark: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(t.template);
    setCopied(true);
    toast.success("Caption template copied");
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      style={{
        backgroundColor: dark ? "#22262b" : "#faf9f5",
        border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(14,10,7,0.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "12px 18px",
          backgroundColor: dark ? "#0f1114" : "#e8e0d3",
          borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(14,10,7,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.05em",
            color: dark ? "#ffffff" : "#0e0a07",
          }}
        >
          {t.type}
        </span>
        <button
          onClick={copy}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: copied ? "#22c55e" : dark ? "#3b82f6" : "#4cabfd",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 0",
            transition: "color 150ms ease",
          }}
        >
          {copied ? (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="0" ry="0" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div style={{ padding: "16px 18px" }}>
        <pre
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            color: dark ? "#e8e8e8" : "#0e0a07",
            lineHeight: 1.65,
            whiteSpace: "pre-wrap" as const,
            margin: 0,
            marginBottom: "12px",
          }}
        >
          {t.template}
        </pre>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            color: dark ? "#a0a5ad" : "#84786f",
            borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(14,10,7,0.08)",
            paddingTop: "10px",
            fontStyle: "italic",
          }}
        >
          {t.note}
        </div>
      </div>
    </div>
  );
}

function HashtagGroup({ data, dark }: { data: typeof TIER1_HASHTAGS; dark: boolean }) {
  const copyGroup = (tags: string[]) => {
    navigator.clipboard.writeText(tags.join(" "));
    toast.success("Hashtags copied");
  };
  return (
    <div className="space-y-4">
      {[
        { label: "Primary — Always Use", tags: data.primary, accent: dark ? "#3b82f6" : "#4cabfd" },
        { label: "Secondary — Use Contextually", tags: data.secondary, accent: dark ? "#6366f1" : "#60a5fa" },
        { label: "Never Use — Too Generic", tags: data.avoid, accent: "#ef4444" },
      ].map((group) => (
        <div key={group.label}>
          <div className="flex items-center justify-between mb-2">
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: group.accent,
              }}
            >
              {group.label}
            </span>
            {group.label !== "Never Use — Too Generic" && (
              <button
                onClick={() => copyGroup(group.tags)}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: dark ? "#a0a5ad" : "#84786f",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="0" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy All
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  if (group.label !== "Never Use — Too Generic") {
                    navigator.clipboard.writeText(tag);
                    toast.success(`${tag} copied`);
                  }
                }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: group.label === "Never Use — Too Generic"
                    ? "#ef4444"
                    : dark ? "#e8e8e8" : "#0e0a07",
                  backgroundColor: group.label === "Never Use — Too Generic"
                    ? "rgba(239,68,68,0.08)"
                    : dark ? "rgba(255,255,255,0.05)" : "rgba(14,10,7,0.05)",
                  border: group.label === "Never Use — Too Generic"
                    ? "1px solid rgba(239,68,68,0.2)"
                    : dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(14,10,7,0.1)",
                  padding: "4px 10px",
                  cursor: group.label !== "Never Use — Too Generic" ? "pointer" : "default",
                  textDecoration: group.label === "Never Use — Too Generic" ? "line-through" : "none",
                  textDecorationColor: "rgba(239,68,68,0.5)",
                  transition: "all 150ms ease",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContentPillarBar({ pillars, dark }: { pillars: typeof TIER1_CONTENT_PILLARS; dark: boolean }) {
  return (
    <div>
      {/* Stacked bar */}
      <div className="flex overflow-hidden mb-4" style={{ height: "8px" }}>
        {pillars.map((p) => (
          <div
            key={p.pillar}
            style={{
              width: p.pct,
              backgroundColor: p.color,
              transition: "width 600ms ease",
            }}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pillars.map((p) => (
          <div
            key={p.pillar}
            style={{
              backgroundColor: dark ? "#22262b" : "#faf9f5",
              borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(14,10,7,0.08)",
              borderRight: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(14,10,7,0.08)",
              borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(14,10,7,0.08)",
              borderLeft: `4px solid ${p.color}`,
              padding: "14px 16px",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "-0.01em",
                  color: dark ? "#ffffff" : "#0e0a07",
                }}
              >
                {p.pillar}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: p.color,
                }}
              >
                {p.pct}
              </span>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: dark ? "#a0a5ad" : "#84786f", lineHeight: 1.5 }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DoDontGrid({ data, dark }: { data: { dos: string[]; donts: string[] }; dark: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        style={{
          backgroundColor: dark ? "#22262b" : "#faf9f5",
          borderTop: "3px solid #22c55e",
          borderRight: dark ? "1px solid rgba(34,197,94,0.15)" : "1px solid rgba(34,197,94,0.2)",
          borderBottom: dark ? "1px solid rgba(34,197,94,0.15)" : "1px solid rgba(34,197,94,0.2)",
          borderLeft: dark ? "1px solid rgba(34,197,94,0.15)" : "1px solid rgba(34,197,94,0.2)",
        }}
      >
        <div
          style={{
            padding: "10px 18px",
            borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(14,10,7,0.08)",
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.08em",
            color: "#22c55e",
          }}
        >
          Do
        </div>
        <ul style={{ padding: "14px 18px", margin: 0, listStyle: "none" }}>
          {data.dos.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 mb-2"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: dark ? "#e8e8e8" : "#0e0a07", lineHeight: 1.55 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: "2px" }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          backgroundColor: dark ? "#22262b" : "#faf9f5",
          borderTop: "3px solid #ef4444",
          borderRight: dark ? "1px solid rgba(239,68,68,0.15)" : "1px solid rgba(239,68,68,0.2)",
          borderBottom: dark ? "1px solid rgba(239,68,68,0.15)" : "1px solid rgba(239,68,68,0.2)",
          borderLeft: dark ? "1px solid rgba(239,68,68,0.15)" : "1px solid rgba(239,68,68,0.2)",
        }}
      >
        <div
          style={{
            padding: "10px 18px",
            borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(14,10,7,0.08)",
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.08em",
            color: "#ef4444",
          }}
        >
          Don't
        </div>
        <ul style={{ padding: "14px 18px", margin: 0, listStyle: "none" }}>
          {data.donts.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 mb-2"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: dark ? "#e8e8e8" : "#0e0a07", lineHeight: 1.55 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: "2px" }}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function VisualRulesTable({ rules, dark }: { rules: typeof TIER1_VISUAL_RULES; dark: boolean }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: dark ? "#3b82f6" : "#4cabfd",
                padding: "10px 16px",
                textAlign: "left",
                backgroundColor: dark ? "rgba(59,130,246,0.06)" : "rgba(76,171,253,0.06)",
                borderBottom: dark ? "2px solid rgba(59,130,246,0.3)" : "2px solid rgba(76,171,253,0.3)",
                width: "28%",
              }}
            >
              Element
            </th>
            <th
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: dark ? "#3b82f6" : "#4cabfd",
                padding: "10px 16px",
                textAlign: "left",
                backgroundColor: dark ? "rgba(59,130,246,0.06)" : "rgba(76,171,253,0.06)",
                borderBottom: dark ? "2px solid rgba(59,130,246,0.3)" : "2px solid rgba(76,171,253,0.3)",
              }}
            >
              Specification
            </th>
          </tr>
        </thead>
        <tbody>
          {rules.map((r, i) => (
            <tr key={r.rule} style={{ borderBottom: dark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(14,10,7,0.06)" }}>
              <td
                style={{
                  padding: "12px 16px",
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.02em",
                  color: dark ? "#ffffff" : "#0e0a07",
                  backgroundColor: i % 2 === 0
                    ? dark ? "rgba(255,255,255,0.01)" : "rgba(14,10,7,0.02)"
                    : "transparent",
                  verticalAlign: "top",
                }}
              >
                {r.rule}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: dark ? "#a0a5ad" : "#4b4038",
                  lineHeight: 1.55,
                  backgroundColor: i % 2 === 0
                    ? dark ? "rgba(255,255,255,0.01)" : "rgba(14,10,7,0.02)"
                    : "transparent",
                }}
              >
                {r.spec}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Post Anatomy data ───────────────────────────────────────────────────────

const TIER1_ANATOMY = {
  format: "4:5 Portrait — 1080 × 1350 px",
  bg: "#1a1d21",
  zones: [
    { id: "safe-top", label: "Safe Zone — Top", y: 0, h: 12, color: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.4)", note: "72px minimum clear space. No text, no logo, no graphic elements." },
    { id: "logo", label: "Logo Placement", y: 12, h: 10, color: "rgba(59,130,246,0.18)", border: "rgba(59,130,246,0.6)", note: "White Tier 1 logo. Top-left or bottom-right. 40px from edges. Never centered." },
    { id: "image", label: "Primary Image Area", y: 22, h: 54, color: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.1)", note: "Real training imagery. Athlete in motion. No stock photos. High-contrast, cool-toned grade." },
    { id: "overlay", label: "Gradient Overlay", y: 58, h: 18, color: "rgba(26,29,33,0.5)", border: "rgba(255,255,255,0.08)", note: "Dark gradient overlay from transparent to #1a1d21. Enables text legibility without a box." },
    { id: "headline", label: "Headline Text", y: 68, h: 12, color: "rgba(59,130,246,0.2)", border: "rgba(59,130,246,0.5)", note: "Oswald 700 · Uppercase · White or Blue · Max 2 lines · -0.02em letter-spacing." },
    { id: "safe-bottom", label: "Safe Zone — Bottom", y: 88, h: 12, color: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.4)", note: "72px minimum clear space. Instagram UI overlaps this zone on mobile." },
  ],
  rules: [
    { label: "Corner Radius", value: "0rem — no rounded corners" },
    { label: "Text Color", value: "#e8e8e8 or #3b82f6 only" },
    { label: "Font", value: "Oswald 700 uppercase for headlines" },
    { label: "Overlay", value: "Dark gradient only — never white" },
    { label: "Logo Version", value: "White only on dark backgrounds" },
    { label: "Min Logo Size", value: "80px wide minimum" },
  ],
};

const WSC_ANATOMY = {
  format: "4:5 Portrait — 1080 × 1350 px",
  bg: "#e8e0d3",
  zones: [
    { id: "safe-top", label: "Safe Zone — Top", y: 0, h: 12, color: "rgba(76,171,253,0.1)", border: "rgba(76,171,253,0.35)", note: "72px minimum clear space. No text, no logo, no graphic elements." },
    { id: "logo", label: "Logo Placement", y: 12, h: 10, color: "rgba(76,171,253,0.15)", border: "rgba(76,171,253,0.5)", note: "Black WSC logo on light backgrounds. White on dark. Bottom-right preferred. 40px from edges." },
    { id: "image", label: "Primary Image Area", y: 22, h: 54, color: "rgba(14,10,7,0.03)", border: "rgba(14,10,7,0.12)", note: "Facility life, families, community moments. Warm natural light. Golden-hour tones preferred." },
    { id: "overlay", label: "Warm Overlay", y: 58, h: 18, color: "rgba(232,224,211,0.4)", border: "rgba(14,10,7,0.1)", note: "Warm parchment-tinted gradient overlay. Enables text legibility while keeping warmth." },
    { id: "headline", label: "Headline Text", y: 68, h: 12, color: "rgba(76,171,253,0.15)", border: "rgba(76,171,253,0.4)", note: "Inter 300 or 400 · Warm near-black (#0e0a07) on light · Off-white on dark · Max 2 lines." },
    { id: "safe-bottom", label: "Safe Zone — Bottom", y: 88, h: 12, color: "rgba(76,171,253,0.1)", border: "rgba(76,171,253,0.35)", note: "72px minimum clear space. Instagram UI overlaps this zone on mobile." },
  ],
  rules: [
    { label: "Corner Radius", value: "0.125rem maximum — barely perceptible" },
    { label: "Text Color", value: "#0e0a07 on light · #e8e8e8 on dark" },
    { label: "Font", value: "Inter 300–400 for warmth — never Oswald" },
    { label: "Overlay", value: "Warm parchment gradient — never cold" },
    { label: "Logo Version", value: "Black on light · White on dark" },
    { label: "Min Logo Size", value: "80px wide minimum" },
  ],
};

// ─── Reel Storyboard data ─────────────────────────────────────────────────────

const TIER1_STORYBOARD = [
  {
    frame: 1,
    label: "Opening Hook",
    duration: "0–1s",
    desc: "Athlete in full motion. No logo, no title card, no black frame. The action IS the hook.",
    textOverlay: "None — let the action speak",
    color: "#3b82f6",
  },
  {
    frame: 2,
    label: "Setup / Context",
    duration: "1–4s",
    desc: "Quick cut to establish what we're watching. Drill name, athlete name, or location as text overlay.",
    textOverlay: "Oswald 700 · Uppercase · White · Bottom third",
    color: "#6366f1",
  },
  {
    frame: 3,
    label: "Core Action",
    duration: "4–14s",
    desc: "The main content. Multiple fast cuts (0.5–1.5s each). Show the process — reps, technique, intensity.",
    textOverlay: "Optional data overlay (time, reps, weight) in blue",
    color: "#8b5cf6",
  },
  {
    frame: 4,
    label: "Detail / Close-up",
    duration: "14–20s",
    desc: "One tight close-up shot. Hands, feet, face, or equipment. Slows the pace briefly for impact.",
    textOverlay: "None — let the detail breathe",
    color: "#a78bfa",
  },
  {
    frame: 5,
    label: "Reaction / Result",
    duration: "20–26s",
    desc: "Athlete's expression, coach reaction, or the outcome. The emotional payoff of the process.",
    textOverlay: "Optional: one-line result stat in white Oswald",
    color: "#c4b5fd",
  },
  {
    frame: 6,
    label: "Closing Frame",
    duration: "26–30s",
    desc: "Freeze on a strong action frame or athlete expression. Tier 1 logo appears bottom-right. Hold 1 second.",
    textOverlay: "Logo: White Tier 1 · Bottom-right · Fade in at 28s",
    color: "#3b82f6",
  },
];

const WSC_STORYBOARD = [
  {
    frame: 1,
    label: "Opening Moment",
    duration: "0–2s",
    desc: "A warm, inviting scene. Facility beauty shot, family arriving, or natural community moment. Slow and welcoming.",
    textOverlay: "None — let the warmth land",
    color: "#4cabfd",
  },
  {
    frame: 2,
    label: "Establish the Story",
    duration: "2–8s",
    desc: "Introduce the subject — a family, an event, a program, or a place. Warm and conversational.",
    textOverlay: "Inter 300 · Warm near-black or off-white · Lower third",
    color: "#60a5fa",
  },
  {
    frame: 3,
    label: "The Heart of It",
    duration: "8–25s",
    desc: "The main content. Relaxed cuts (2–4s each). Show the experience — people, place, connection.",
    textOverlay: "Warm descriptive text if needed · Inter 400",
    color: "#93c5fd",
  },
  {
    frame: 4,
    label: "Human Detail",
    duration: "25–35s",
    desc: "A close-up human moment. A smile, a handshake, a child's expression. The emotional core.",
    textOverlay: "None — the moment is enough",
    color: "#bfdbfe",
  },
  {
    frame: 5,
    label: "Community Payoff",
    duration: "35–42s",
    desc: "Wide shot showing the community — the group, the facility, the gathering. Belonging made visible.",
    textOverlay: "Optional: one warm tagline in Inter 300",
    color: "#60a5fa",
  },
  {
    frame: 6,
    label: "Closing Frame",
    duration: "42–45s",
    desc: "Warm still — smiling face, beautiful facility shot, or golden-hour court. WSC logo appears. Hold 1.5 seconds.",
    textOverlay: "Logo: Black WSC (light bg) or White (dark bg) · Bottom-right",
    color: "#4cabfd",
  },
];

// ─── Content Calendar data ────────────────────────────────────────────────────

const TIER1_CALENDAR = [
  {
    day: "Monday",
    short: "MON",
    pillar: "The Process",
    format: "Reel",
    desc: "Training session clip from the weekend or Monday session. Fast cuts, real work, no polish.",
    caption: "Short. Specific. One athlete or one drill.",
    color: "#3b82f6",
  },
  {
    day: "Tuesday",
    short: "TUE",
    pillar: "The Athlete",
    format: "Feed — 4:5",
    desc: "Athlete spotlight. One image, one story. Name, sport, specific achievement or development moment.",
    caption: "2–4 sentences. Name the athlete. Name the work.",
    color: "#6366f1",
  },
  {
    day: "Wednesday",
    short: "WED",
    pillar: "The Process",
    format: "Carousel",
    desc: "Drill breakdown or technique explainer. 4–6 slides. Each slide = one step or one principle.",
    caption: "Educational. Tie every point to competition outcomes.",
    color: "#3b82f6",
  },
  {
    day: "Thursday",
    short: "THU",
    pillar: "The Culture",
    format: "Story",
    desc: "Behind-the-scenes. Real moment from practice, coaching conversation, or facility life. Unpolished.",
    caption: "Minimal. One line or none. Let the moment speak.",
    color: "#8b5cf6",
  },
  {
    day: "Friday",
    short: "FRI",
    pillar: "The Athlete",
    format: "Reel",
    desc: "End-of-week highlight. Best training moment of the week. High energy. Strong hook in first 0.5s.",
    caption: "One strong line. Specific result or moment.",
    color: "#6366f1",
  },
  {
    day: "Saturday",
    short: "SAT",
    pillar: "The Standard",
    format: "Feed — 1:1",
    desc: "Program or philosophy post. What Tier 1 believes. What the standard means. No hype — just truth.",
    caption: "Direct. One clear idea. No filler.",
    color: "#a78bfa",
  },
  {
    day: "Sunday",
    short: "SUN",
    pillar: "Rest / Flex",
    format: "Optional",
    desc: "Optional post. Use for timely content — tournament results, athlete news, or a strong training moment that can't wait.",
    caption: "Only post if the content is genuinely strong.",
    color: "rgba(255,255,255,0.2)",
  },
];

const WSC_CALENDAR = [
  {
    day: "Monday",
    short: "MON",
    pillar: "Community",
    format: "Feed — 4:5",
    desc: "Member or family spotlight. Start the week with a real person and their WSC story.",
    caption: "Warm and personal. Name the family. Name the moment.",
    color: "#4cabfd",
  },
  {
    day: "Tuesday",
    short: "TUE",
    pillar: "Programming",
    format: "Feed — 1:1 or Carousel",
    desc: "Program spotlight or upcoming event announcement. What's happening this week at WSC.",
    caption: "Clear and inviting. One CTA. Link in bio.",
    color: "#93c5fd",
  },
  {
    day: "Wednesday",
    short: "WED",
    pillar: "Facility Life",
    format: "Reel",
    desc: "Midweek facility reel. Courts, courses, amenities, or a beautiful moment on the 67-acre campus.",
    caption: "Warm and descriptive. Invite the viewer in.",
    color: "#60a5fa",
  },
  {
    day: "Thursday",
    short: "THU",
    pillar: "Community",
    format: "Story",
    desc: "Behind-the-scenes story. A real moment from a class, event, or casual facility interaction.",
    caption: "Conversational. One or two lines maximum.",
    color: "#4cabfd",
  },
  {
    day: "Friday",
    short: "FRI",
    pillar: "Programming",
    format: "Feed — 4:5",
    desc: "Weekend event or program reminder. What's happening this weekend. Warm and inviting.",
    caption: "Specific. What, when, who it's for. Link in bio.",
    color: "#93c5fd",
  },
  {
    day: "Saturday",
    short: "SAT",
    pillar: "Facility Life",
    format: "Reel or Feed",
    desc: "Weekend facility content. Events in action, families on campus, golden-hour shots of the grounds.",
    caption: "Warm and celebratory. Show the community in action.",
    color: "#60a5fa",
  },
  {
    day: "Sunday",
    short: "SUN",
    pillar: "Inspiration",
    format: "Feed — 1:1",
    desc: "A values-driven or seasonal post. A quote, a reflection, or a beautiful facility moment to close the week.",
    caption: "Warm and thoughtful. Short. No CTA needed.",
    color: "#bfdbfe",
  },
];

// ─── Post Anatomy component ───────────────────────────────────────────────────

function PostAnatomy({ data, dark }: { data: typeof TIER1_ANATOMY; dark: boolean }) {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const textPrimary = dark ? "#ffffff" : "#0e0a07";
  const textMuted = dark ? "#a0a5ad" : "#84786f";
  const accent = dark ? "#3b82f6" : "#4cabfd";
  const borderColor = dark ? "rgba(255,255,255,0.06)" : "rgba(14,10,7,0.1)";

  const activeZoneData = data.zones.find((z) => z.id === activeZone);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Phone mockup */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div
          style={{
            width: "220px",
            background: dark ? "#0f1114" : "#ded6c9",
            border: `2px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,10,7,0.15)"}`,
            borderRadius: "20px",
            padding: "12px",
            boxShadow: dark ? "0 20px 60px rgba(0,0,0,0.6)" : "0 20px 60px rgba(14,10,7,0.15)",
          }}
        >
          {/* Instagram header bar */}
          <div className="flex items-center gap-2 mb-2 px-1">
            <div style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: accent, flexShrink: 0 }} />
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, color: textPrimary, flex: 1 }}>
              {dark ? "tier1performance" : "woodinvillesportsclub"}
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2">
              <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
            </svg>
          </div>
          {/* Post image area with zones */}
          <div
            style={{
              width: "100%",
              aspectRatio: "4/5",
              backgroundColor: data.bg,
              position: "relative",
              overflow: "hidden",
              border: `1px solid ${borderColor}`,
            }}
          >
            {data.zones.map((zone) => (
              <div
                key={zone.id}
                onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: `${zone.y}%`,
                  height: `${zone.h}%`,
                  backgroundColor: activeZone === zone.id ? zone.color.replace(/[^,]+\)$/, "0.35)") : zone.color,
                  border: `1px dashed ${zone.border}`,
                  borderLeft: activeZone === zone.id ? `3px solid ${accent}` : `1px dashed ${zone.border}`,
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "6px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "7px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                    color: activeZone === zone.id ? accent : dark ? "rgba(255,255,255,0.5)" : "rgba(14,10,7,0.4)",
                    whiteSpace: "nowrap" as const,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {zone.label}
                </span>
              </div>
            ))}
          </div>
          {/* Instagram action bar */}
          <div className="flex items-center gap-3 mt-2 px-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="1.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            <div style={{ flex: 1 }} />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </div>
        </div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: textMuted, marginTop: "10px", textAlign: "center" }}>
          Click any zone to inspect
        </p>
      </div>

      {/* Zone detail panel */}
      <div className="flex-1">
        {/* Active zone detail */}
        {activeZoneData ? (
          <div
            style={{
              backgroundColor: dark ? "#22262b" : "#faf9f5",
              border: `1px solid ${accent}`,
              borderLeft: `4px solid ${accent}`,
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                textTransform: "uppercase" as const,
                color: accent,
                letterSpacing: "-0.01em",
                marginBottom: "8px",
              }}
            >
              {activeZoneData.label}
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textPrimary, lineHeight: 1.65, marginBottom: "0" }}>
              {activeZoneData.note}
            </p>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: dark ? "rgba(59,130,246,0.06)" : "rgba(76,171,253,0.06)",
              border: `1px dashed ${dark ? "rgba(59,130,246,0.3)" : "rgba(76,171,253,0.3)"}`,
              padding: "20px",
              marginBottom: "20px",
              textAlign: "center" as const,
            }}
          >
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: textMuted, margin: 0 }}>
              Click any highlighted zone on the mockup to see its specification.
            </p>
          </div>
        )}

        {/* Format spec */}
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            color: textMuted,
            marginBottom: "12px",
          }}
        >
          Format: {data.format}
        </div>

        {/* Rules grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {data.rules.map((r) => (
            <div
              key={r.label}
              style={{
                backgroundColor: dark ? "#22262b" : "#faf9f5",
                border: `1px solid ${borderColor}`,
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: accent,
                  marginBottom: "4px",
                }}
              >
                {r.label}
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: textPrimary }}>
                {r.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Reel Storyboard component ────────────────────────────────────────────────

function ReelStoryboard({ frames, dark }: { frames: typeof TIER1_STORYBOARD; dark: boolean }) {
  const [activeFrame, setActiveFrame] = useState<number | null>(null);
  const textPrimary = dark ? "#ffffff" : "#0e0a07";
  const textMuted = dark ? "#a0a5ad" : "#84786f";
  const borderColor = dark ? "rgba(255,255,255,0.06)" : "rgba(14,10,7,0.1)";

  return (
    <div>
      {/* Storyboard grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {frames.map((f) => (
          <div
            key={f.frame}
            onClick={() => setActiveFrame(activeFrame === f.frame ? null : f.frame)}
            style={{
              cursor: "pointer",
              border: activeFrame === f.frame
                ? `2px solid ${f.color}`
                : `1px solid ${borderColor}`,
              backgroundColor: dark ? "#22262b" : "#faf9f5",
              overflow: "hidden",
              transition: "all 150ms ease",
              transform: activeFrame === f.frame ? "translateY(-2px)" : "none",
              boxShadow: activeFrame === f.frame
                ? `0 4px 20px ${f.color}30`
                : "none",
            }}
          >
            {/* Frame number bar */}
            <div
              style={{
                backgroundColor: f.color,
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "11px",
                  textTransform: "uppercase" as const,
                  color: "#ffffff",
                  letterSpacing: "0.05em",
                }}
              >
                {f.frame}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "9px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {f.duration}
              </span>
            </div>
            {/* Frame thumbnail area */}
            <div
              style={{
                aspectRatio: "9/16",
                backgroundColor: dark ? "#1a1d21" : "#e8e0d3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "9px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.04em",
                  color: f.color,
                  textAlign: "center" as const,
                  lineHeight: 1.4,
                }}
              >
                {f.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Active frame detail */}
      {activeFrame !== null && (() => {
        const f = frames.find((fr) => fr.frame === activeFrame)!;
        return (
          <div
            style={{
              backgroundColor: dark ? "#22262b" : "#faf9f5",
              border: `1px solid ${f.color}`,
              borderLeft: `4px solid ${f.color}`,
              padding: "20px 24px",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                style={{
                  backgroundColor: f.color,
                  padding: "4px 10px",
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  textTransform: "uppercase" as const,
                  color: "#ffffff",
                  letterSpacing: "0.05em",
                }}
              >
                Frame {f.frame}
              </div>
              <span
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  textTransform: "uppercase" as const,
                  color: textPrimary,
                  letterSpacing: "-0.01em",
                }}
              >
                {f.label}
              </span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: textMuted }}>
                {f.duration}
              </span>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textPrimary, lineHeight: 1.65, marginBottom: "12px" }}>
              {f.desc}
            </p>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                color: textMuted,
                borderTop: `1px solid ${borderColor}`,
                paddingTop: "10px",
                fontStyle: "italic",
              }}
            >
              Text overlay: {f.textOverlay}
            </div>
          </div>
        );
      })()}

      {!activeFrame && (
        <div
          style={{
            backgroundColor: dark ? "rgba(59,130,246,0.04)" : "rgba(76,171,253,0.04)",
            border: `1px dashed ${dark ? "rgba(59,130,246,0.25)" : "rgba(76,171,253,0.25)"}`,
            padding: "16px",
            textAlign: "center" as const,
          }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: textMuted, margin: 0 }}>
            Click any frame to see its full specification.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Content Calendar component ───────────────────────────────────────────────

function ContentCalendar({ days, dark }: { days: typeof TIER1_CALENDAR; dark: boolean }) {
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const textPrimary = dark ? "#ffffff" : "#0e0a07";
  const textMuted = dark ? "#a0a5ad" : "#84786f";
  const borderColor = dark ? "rgba(255,255,255,0.06)" : "rgba(14,10,7,0.1)";

  const activeData = days.find((d) => d.day === activeDay);

  return (
    <div>
      {/* Weekly strip */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {days.map((d) => (
          <div
            key={d.day}
            onClick={() => setActiveDay(activeDay === d.day ? null : d.day)}
            style={{
              cursor: "pointer",
              backgroundColor: activeDay === d.day
                ? dark ? "#22262b" : "#faf9f5"
                : dark ? "#1a1d21" : "#e8e0d3",
              border: activeDay === d.day
                ? `2px solid ${d.color}`
                : `1px solid ${borderColor}`,
              borderTop: `3px solid ${d.color}`,
              padding: "10px 6px",
              textAlign: "center" as const,
              transition: "all 150ms ease",
              transform: activeDay === d.day ? "translateY(-2px)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                textTransform: "uppercase" as const,
                letterSpacing: "0.05em",
                color: activeDay === d.day ? d.color : textMuted,
                marginBottom: "4px",
              }}
            >
              {d.short}
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px",
                fontWeight: 600,
                color: activeDay === d.day ? textPrimary : textMuted,
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
                lineHeight: 1.3,
              }}
            >
              {d.format}
            </div>
          </div>
        ))}
      </div>

      {/* Active day detail */}
      {activeData ? (
        <div
          style={{
            backgroundColor: dark ? "#22262b" : "#faf9f5",
            border: `1px solid ${activeData.color}`,
            borderLeft: `4px solid ${activeData.color}`,
            padding: "20px 24px",
          }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                textTransform: "uppercase" as const,
                color: textPrimary,
                letterSpacing: "-0.01em",
              }}
            >
              {activeData.day}
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: activeData.color,
                backgroundColor: `${activeData.color}18`,
                border: `1px solid ${activeData.color}40`,
                padding: "2px 8px",
              }}
            >
              {activeData.pillar}
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: textMuted,
                backgroundColor: dark ? "rgba(255,255,255,0.04)" : "rgba(14,10,7,0.04)",
                border: `1px solid ${borderColor}`,
                padding: "2px 8px",
              }}
            >
              {activeData.format}
            </span>
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textPrimary, lineHeight: 1.65, marginBottom: "12px" }}>
            {activeData.desc}
          </p>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: textMuted,
              borderTop: `1px solid ${borderColor}`,
              paddingTop: "10px",
              fontStyle: "italic",
            }}
          >
            Caption guidance: {activeData.caption}
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: dark ? "rgba(59,130,246,0.04)" : "rgba(76,171,253,0.04)",
            border: `1px dashed ${dark ? "rgba(59,130,246,0.25)" : "rgba(76,171,253,0.25)"}`,
            padding: "16px",
            textAlign: "center" as const,
          }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: textMuted, margin: 0 }}>
            Click any day to see the recommended content type, format, and caption guidance.
          </p>
        </div>
      )}

      {/* Weekly summary row */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Posts per week", value: dark ? "5–6" : "4–5", note: dark ? "Sunday is optional" : "Sunday is a values post" },
          { label: "Primary formats", value: dark ? "Reel + 4:5" : "4:5 + Reel", note: dark ? "Reels drive growth" : "Portrait drives engagement" },
          { label: "Max hashtags", value: "3–5", note: dark ? "Tight and intentional" : "Community-specific only" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              backgroundColor: dark ? "#22262b" : "#faf9f5",
              border: `1px solid ${borderColor}`,
              padding: "14px 16px",
            }}
          >
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: dark ? "#3b82f6" : "#4cabfd", marginBottom: "4px" }}>
              {s.label}
            </div>
            <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "20px", color: textPrimary, letterSpacing: "-0.02em" }}>
              {s.value}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: textMuted, marginTop: "2px" }}>
              {s.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sub-section tab switcher ─────────────────────────────────────────────────

type SubTab =
  | "formats"
  | "visual"
  | "video"
  | "captions"
  | "hashtags"
  | "pillars"
  | "dodont"
  | "anatomy"
  | "storyboard"
  | "calendar"
  | "principles"
  | "atoms"
  | "universal"
  | "announcements"
  | "credibility"
  | "antipatterns";

const TIER1_TABS: { id: SubTab; label: string }[] = [
  { id: "formats", label: "Post Formats" },
  { id: "visual", label: "Visual Rules" },
  { id: "video", label: "Video / Reel Rules" },
  { id: "captions", label: "Caption Templates" },
  { id: "hashtags", label: "Hashtags" },
  { id: "pillars", label: "Content Mix" },
  { id: "dodont", label: "Do's & Don'ts" },
  { id: "anatomy", label: "Post Anatomy" },
  { id: "storyboard", label: "Reel Storyboard" },
  { id: "calendar", label: "Content Calendar" },
  { id: "principles", label: "1 · Principles" },
  { id: "atoms", label: "2 · Atoms" },
  { id: "universal", label: "3 · Universal" },
  { id: "announcements", label: "4 · Announcements" },
  { id: "credibility", label: "5 · Credibility" },
  { id: "antipatterns", label: "6 · Anti-Patterns" },
];

const TIER1_REGISTERS = [
  {
    id: "01",
    name: "Manifesto",
    freq: "~10% of posts",
    heroSize: "76–140px Oswald",
    bestFor: "Tagline anchors · alumni proof · major announcements · season opens",
    tone: "Demanding · cultural · declarative",
    accent: "#ef4444",
  },
  {
    id: "02",
    name: "Teaching",
    freq: "~50% of posts",
    heroSize: "28–38px Oswald + Inter Light body",
    bestFor: "Drill breakdowns · program explainers · coach notes · carousels",
    tone: "Informative · disciplined · accessible",
    accent: "#3b82f6",
  },
  {
    id: "03",
    name: "Documentary",
    freq: "~40% of posts",
    heroSize: "17–22px max",
    bestFor: "Training moments · athlete spotlights · BTS · daily process content",
    tone: "Cinematic · restrained · earned",
    accent: "#a0a5ad",
  },
];

function DesignSystemIntro({ isTier1 }: { isTier1: boolean }) {
  if (!isTier1) {
    return (
      <div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#1e6fb8", textTransform: "uppercase", marginBottom: "10px" }}>Page 1</div>
        <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: "32px", letterSpacing: "-0.04em", color: "#0e0a07", marginBottom: "14px" }}>
          WSC Instagram · Design Principles
        </h3>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: "15px", color: "#4b4038", lineHeight: 1.7, maxWidth: "760px", marginBottom: "24px" }}>
          WSC Instagram is a hospitality and community brand, not a sports performance brand. Warmth is a design decision: parchment surfaces, soft emphasis, one accent per post, and real campus life leading the story.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["01", "Hospitality First", "Default register is warm, editorial, and facility-proud — never a sports-brand shout."],
            ["02", "Warmth Is a Design Decision", "Use Inter Light, parchment, cream, italic emphasis, and one soft accent with discipline."],
            ["03", "Experience Before Price", "Lead with the human or campus moment. Pricing belongs in caption or bio."],
            ["04", "One Accent Per Post", "One italic moment or Caveat aside is enough. More becomes decoration."],
          ].map(([id, title, desc]) => (
            <div key={id} style={{ background: "#faf9f5", border: "1px solid rgba(14,10,7,0.1)", padding: "18px" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.18em", color: "#1e6fb8", fontWeight: 700, textTransform: "uppercase" }}>Principle {id}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: "22px", letterSpacing: "-0.03em", color: "#0e0a07", margin: "6px 0" }}>{title}</div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4b4038", lineHeight: 1.55 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "10px" }}>Page 1</div>
      <h3 style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "32px", textTransform: "uppercase", letterSpacing: "-0.02em", color: "#ffffff", marginBottom: "14px" }}>
        Tier 1 Instagram · Design Principles
      </h3>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#a0a5ad", lineHeight: 1.7, maxWidth: "760px", marginBottom: "24px" }}>
        Most posts shouldn't be the manifesto. The brand earns its loud moments by being measured most of the time. This is a design system, not a moodboard — anyone on the team can pick up a template, drop in content, and the post comes out on-brand.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {TIER1_REGISTERS.map((register) => (
          <div key={register.id} style={{ backgroundColor: "#22262b", border: "1px solid rgba(255,255,255,0.08)", borderTop: `3px solid ${register.accent}`, padding: "20px" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: register.accent, marginBottom: "4px" }}>
              Register {register.id}
            </div>
            <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "20px", textTransform: "uppercase", letterSpacing: "-0.02em", color: "#fff", marginBottom: "12px" }}>
              {register.name}
            </div>
            {[
              ["Frequency", register.freq],
              ["Hero Size", register.heroSize],
              ["Best For", register.bestFor],
              ["Tone", register.tone],
            ].map(([label, value]) => (
              <div key={label} style={{ marginBottom: "10px" }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a0a5ad", marginBottom: "2px" }}>{label}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: label === "Frequency" ? register.accent : "#e8e8e8", lineHeight: 1.45 }}>{value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <blockquote style={{ margin: 0, background: "rgba(59,130,246,0.06)", borderLeft: "3px solid #3b82f6", padding: "18px 22px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontStyle: "italic", color: "#e8e8e8", lineHeight: 1.65 }}>
        "When every post is the manifesto, the brand starts to feel like it's performing intensity rather than embodying it. Anyone can shout. A brand that lets its work speak signals confidence — and audiences read that signal instantly. The mix matters more than any individual post."
      </blockquote>
    </div>
  );
}

function DesignSystemDetail({ tab, isTier1 }: { tab: SubTab; isTier1: boolean }) {
  const dark = isTier1;
  const surface = dark ? "#22262b" : "#faf9f5";
  const text = dark ? "#e8e8e8" : "#0e0a07";
  const muted = dark ? "#a0a5ad" : "#4b4038";
  const accent = dark ? "#3b82f6" : "#1e6fb8";
  const titleMap: Record<string, string> = {
    atoms: isTier1 ? "Tier 1 Instagram · The Atoms" : "WSC Instagram · The Atoms",
    universal: isTier1 ? "Universal Templates" : "Everyday Templates",
    announcements: isTier1 ? "Announcement Templates" : "Pricing Rules",
    credibility: isTier1 ? "Credibility Templates" : "Transactional Templates",
    antipatterns: "Anti-Patterns",
  };
  const items = isTier1
    ? {
        atoms: ["Blue accents ONE element per post — never two.", "Red is for urgency only; Amber is for operational alerts.", "Sharp corners always — never rounded on Tier 1 graphics.", "Pricing never appears on the canvas."],
        universal: ["Templates A–F cover training, stats, quotes, lists, photo+label, and culture.", "Use Universal templates for 80%+ of posts."],
        announcements: ["Templates A-01 through A-08 cover enrollment, tryouts, events, schedule, weather, new programs, closures, and staff.", "Always include a status badge."],
        credibility: ["Templates C-01 through C-06 cover hero commits, class walls, rankings, milestones, third-party recognition, and alumni.", "Source always named at top."],
        antipatterns: ["Flyer Trap", "Credibility Burial", "Badge Inflation", "Corner Rounding", "Canvas Pricing"],
      }
    : {
        atoms: ["Parchment is the primary post background.", "Cream is the card/container surface.", "Navy is accent bars and data callouts only.", "One italic moment and one Caveat accent maximum."],
        universal: ["Community Moment", "Facility Showcase", "Program Spotlight", "Staff/Coach Feature", "Member Story", "Seasonal Moment"],
        announcements: ["Lead with experience, not price.", "Price belongs in caption or bio.", "Never use discount-flyer hierarchy."],
        credibility: ["Event Announcement", "Registration Open", "Waitlist", "Cancellation", "Reminder", "Recap"],
        antipatterns: ["Newsletter Trap", "Discount Flyer", "Text Overload", "Urgency Theater", "Stock Photo Substitute", "Caveat Overuse"],
      };
  const list = (items as Record<string, string[]>)[tab] ?? [];

  return (
    <div style={{ backgroundColor: surface, border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(14,10,7,0.1)", padding: "24px" }}>
      <div style={{ fontFamily: dark ? "Oswald, sans-serif" : "Inter, sans-serif", fontWeight: dark ? 700 : 300, fontSize: "28px", letterSpacing: dark ? "-0.02em" : "-0.035em", textTransform: dark ? "uppercase" : "none", color: text, marginBottom: "16px" }}>
        {titleMap[tab]}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {list.map((item) => (
          <div key={item} style={{ borderLeft: `3px solid ${accent}`, background: dark ? "#1a1d21" : "#e8e0d3", padding: "12px 14px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: muted, lineHeight: 1.55 }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function InstagramGuidelines() {
  const [brand, setBrand] = useState<"tier1" | "wsc">("tier1");
  const [tab, setTab] = useState<SubTab>("principles");

  const isTier1 = brand === "tier1";
  const dark = isTier1;

  const bgOuter = isTier1 ? "#1a1d21" : "#e8e0d3";
  const bgInner = isTier1 ? "#0f1114" : "#ded6c9";
  const textPrimary = isTier1 ? "#ffffff" : "#0e0a07";
  const textMuted = isTier1 ? "#a0a5ad" : "#84786f";
  const accent = isTier1 ? "#3b82f6" : "#4cabfd";
  const borderColor = isTier1 ? "rgba(255,255,255,0.06)" : "rgba(14,10,7,0.1)";

  return (
    <div style={{ backgroundColor: bgOuter, padding: "80px 48px" }}>
      {/* Section header */}
      <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
        <SectionHeader
          label="15 — Application"
          title="Instagram Guidelines"
          subtitle="Post formats, visual rules, video specs, caption templates, hashtag strategy, and content mix — for both brands."
          dark={dark}
        />
        {/* Brand switcher */}
        <div
          className="flex flex-shrink-0"
          style={{
            border: `1px solid ${borderColor}`,
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => { setBrand("tier1"); setTab("principles"); }}
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              textTransform: "uppercase" as const,
              letterSpacing: "0.05em",
              padding: "10px 20px",
              backgroundColor: isTier1 ? "#3b82f6" : "transparent",
              color: isTier1 ? "#ffffff" : textMuted,
              border: "none",
              cursor: "pointer",
              transition: "all 150ms ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img src={LOGOS.tier1.white} alt="Tier 1" style={{ height: "14px", width: "auto", filter: isTier1 ? "none" : "invert(0.5)" }} />
            Tier 1
          </button>
          <button
            onClick={() => { setBrand("wsc"); setTab("principles"); }}
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              textTransform: "uppercase" as const,
              letterSpacing: "0.05em",
              padding: "10px 20px",
              backgroundColor: !isTier1 ? "#4cabfd" : "transparent",
              color: !isTier1 ? "#ffffff" : textMuted,
              border: "none",
              cursor: "pointer",
              transition: "all 150ms ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img src={LOGOS.wsc.shortBlackTransparent} alt="WSC" style={{ height: "14px", width: "auto", filter: !isTier1 ? "none" : "invert(0.5)" }} />
            WSC
          </button>
        </div>
      </div>

      {/* Brand identity bar */}
      <div
        className="flex items-center gap-4 p-4 mb-8"
        style={{
          backgroundColor: bgInner,
          border: `1px solid ${borderColor}`,
          borderLeft: `4px solid ${accent}`,
        }}
      >
        <img
          src={isTier1 ? LOGOS.tier1.white : LOGOS.wsc.fullBlackTransparent}
          alt={isTier1 ? "Tier 1" : "WSC"}
          style={{ height: "28px", width: "auto" }}
        />
        <div>
          <div
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              textTransform: "uppercase" as const,
              color: textPrimary,
              letterSpacing: "-0.01em",
            }}
          >
            {isTier1 ? "Tier 1 Performance" : "Woodinville Sports Club"}
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: textMuted }}>
            {isTier1
              ? "Performance brand · Cold, industrial, high-contrast · @tier1performance"
              : "Platform & facility brand · Warm, natural, community-first · @woodinvillesportsclub"}
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div
        className="flex flex-wrap gap-1 mb-8"
        style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: "0" }}
      >
        {TIER1_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              padding: "8px 14px",
              backgroundColor: "transparent",
              color: tab === t.id ? accent : textMuted,
              border: "none",
              borderBottom: tab === t.id ? `2px solid ${accent}` : "2px solid transparent",
              cursor: "pointer",
              transition: "all 150ms ease",
              marginBottom: "-1px",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="max-w-6xl">

        {/* DESIGN SYSTEM */}
        {tab === "principles" && <DesignSystemIntro isTier1={isTier1} />}
        {(["atoms", "universal", "announcements", "credibility", "antipatterns"] as SubTab[]).includes(tab) && (
          <DesignSystemDetail tab={tab} isTier1={isTier1} />
        )}

        {/* POST FORMATS */}
        {tab === "formats" && (
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textMuted, lineHeight: 1.65, marginBottom: "24px", maxWidth: "640px" }}>
              {isTier1
                ? "Tier 1 uses portrait and square formats for maximum feed impact. Reels are the primary growth format — prioritize training content that shows the process."
                : "WSC uses portrait format as the primary feed format. Reels are used for facility tours, event recaps, and community stories. Warm, natural imagery in every format."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(isTier1 ? TIER1_POST_FORMATS : WSC_POST_FORMATS).map((f) => (
                <FormatCard key={f.format} f={f} dark={dark} />
              ))}
            </div>
          </div>
        )}

        {/* VISUAL RULES */}
        {tab === "visual" && (
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textMuted, lineHeight: 1.65, marginBottom: "24px", maxWidth: "640px" }}>
              {isTier1
                ? "Every visual element must reinforce the performance identity. Cold, industrial, and intentional. No warmth, no softness, no rounded corners."
                : "Every visual element must feel like a warm welcome. Natural light, parchment tones, and human moments. Never cold or clinical."}
            </p>
            <VisualRulesTable rules={isTier1 ? TIER1_VISUAL_RULES : WSC_VISUAL_RULES} dark={dark} />
          </div>
        )}

        {/* VIDEO RULES */}
        {tab === "video" && (
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textMuted, lineHeight: 1.65, marginBottom: "24px", maxWidth: "640px" }}>
              {isTier1
                ? "Reels are Tier 1's highest-priority format. Fast, raw, and real. The first 0.5 seconds must hook — no intros, no logos, no black frames."
                : "WSC reels are warm and inviting. Pacing is relaxed. The goal is to make the viewer feel like they're already part of the community."}
            </p>
            <VisualRulesTable rules={isTier1 ? TIER1_VIDEO_RULES : WSC_VIDEO_RULES} dark={dark} />
          </div>
        )}

        {/* CAPTION TEMPLATES */}
        {tab === "captions" && (
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textMuted, lineHeight: 1.65, marginBottom: "24px", maxWidth: "640px" }}>
              These are structural templates — not scripts. Fill in the brackets with real, specific details. Click "Copy" on any template to paste it into your drafting tool.
            </p>
            <div className="space-y-3">
              {(isTier1 ? TIER1_CAPTION_TEMPLATES : WSC_CAPTION_TEMPLATES).map((t) => (
                <CaptionTemplate key={t.type} t={t} dark={dark} />
              ))}
            </div>
          </div>
        )}

        {/* HASHTAGS */}
        {tab === "hashtags" && (
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textMuted, lineHeight: 1.65, marginBottom: "24px", maxWidth: "640px" }}>
              {isTier1
                ? "Tier 1 uses a tight, intentional hashtag set. Maximum 3–5 per post. Never use generic fitness or motivation hashtags — they dilute the brand signal."
                : "WSC uses community and location-specific hashtags. Maximum 4–5 per post. Avoid generic lifestyle hashtags that blend WSC into the noise."}
              {" "}Click any tag to copy it individually, or use "Copy All" for the full primary or secondary set.
            </p>
            <HashtagGroup data={isTier1 ? TIER1_HASHTAGS : WSC_HASHTAGS} dark={dark} />
          </div>
        )}

        {/* CONTENT MIX */}
        {tab === "pillars" && (
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textMuted, lineHeight: 1.65, marginBottom: "24px", maxWidth: "640px" }}>
              {isTier1
                ? "The content mix is weighted toward process and athlete content. Culture and program content support — they do not lead. Review your last 10 posts against this mix monthly."
                : "The content mix is weighted toward community and facility content. Programming content supports but does not dominate. WSC's feed should feel like a community board, not a marketing channel."}
            </p>
            <ContentPillarBar pillars={isTier1 ? TIER1_CONTENT_PILLARS : WSC_CONTENT_PILLARS} dark={dark} />
          </div>
        )}

        {/* DO'S & DON'TS */}
        {tab === "dodont" && (
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textMuted, lineHeight: 1.65, marginBottom: "24px", maxWidth: "640px" }}>
              {isTier1
                ? "These rules are non-negotiable for Tier 1. Any post that violates the Don'ts list should be revised before publishing — no exceptions."
                : "These rules protect WSC's warm, community-first identity. Any post that violates the Don'ts list should be revised before publishing."}
            </p>
            <DoDontGrid data={isTier1 ? DO_DONTS.tier1 : DO_DONTS.wsc} dark={dark} />
          </div>
        )}

        {/* POST ANATOMY */}
        {tab === "anatomy" && (
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textMuted, lineHeight: 1.65, marginBottom: "24px", maxWidth: "640px" }}>
              {isTier1
                ? "An annotated breakdown of the standard Tier 1 4:5 feed post. Every zone has a defined purpose and strict rules. Click each zone on the mockup to inspect its specification."
                : "An annotated breakdown of the standard WSC 4:5 feed post. Warm zones, natural hierarchy, and clear placement rules. Click each zone on the mockup to inspect its specification."}
            </p>
            <PostAnatomy data={isTier1 ? TIER1_ANATOMY : WSC_ANATOMY} dark={dark} />
          </div>
        )}

        {/* REEL STORYBOARD */}
        {tab === "storyboard" && (
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textMuted, lineHeight: 1.65, marginBottom: "24px", maxWidth: "640px" }}>
              {isTier1
                ? "A 6-frame structural template for every Tier 1 Reel. 15–30 seconds total. Fast, raw, and real. Click any frame to see its full specification and text overlay guidance."
                : "A 6-frame structural template for every WSC Reel. 20–45 seconds total. Warm, inviting, and community-focused. Click any frame to see its full specification and text overlay guidance."}
            </p>
            <ReelStoryboard frames={isTier1 ? TIER1_STORYBOARD : WSC_STORYBOARD} dark={dark} />
          </div>
        )}

        {/* CONTENT CALENDAR */}
        {tab === "calendar" && (
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textMuted, lineHeight: 1.65, marginBottom: "24px", maxWidth: "640px" }}>
              {isTier1
                ? "A recommended weekly posting cadence for Tier 1. 5–6 posts per week across 4 content pillars. Click any day to see the recommended content type, format, and caption guidance."
                : "A recommended weekly posting cadence for WSC. 4–5 posts per week across 4 content pillars. Click any day to see the recommended content type, format, and caption guidance."}
            </p>
            <ContentCalendar days={isTier1 ? TIER1_CALENDAR : WSC_CALENDAR} dark={dark} />
          </div>
        )}

      </div>
    </div>
  );
}
