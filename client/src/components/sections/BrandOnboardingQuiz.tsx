/**
 * BrandOnboardingQuiz — Section-by-section brand certification quiz
 * Design: "The Performance Codex"
 * Covers all 14 content sections, tracks progress per chapter,
 * scores answers, and outputs a Brand Certified confirmation on completion.
 */

import { useState, useEffect } from "react";
import { SectionHeader } from "@/pages/Home";
import { toast } from "sonner";

// ─── Quiz Data ─────────────────────────────────────────────────────────────────

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number; // index into options
  explanation: string;
}

interface Chapter {
  id: string;
  title: string;
  section: string;
  description: string;
  questions: Question[];
}

const CHAPTERS: Chapter[] = [
  {
    id: "brand-architecture",
    title: "Brand Architecture",
    section: "Foundation",
    description: "Understand the two-brand structure (Tier 1 Performance + WSC) and which brand appears in which context. Tier 1 is the performance brand. WSC is the 67-acre platform it lives on.",
    questions: [
      {
        id: "ba-1",
        question: "Which brand is used on all marketing materials, social content, and consumer-facing communications?",
        options: [
          "Athletic Performance Lab (APL)",
          "Tier 1 Performance and Woodinville Sports Club (WSC)",
          "Athletic Performance Lab (APL) only",
          "Neither brand — only the APL name is used",
        ],
        correct: 1,
        explanation: "Tier 1 Performance and WSC are the two public-facing brands. Tier 1 is the performance brand. WSC is the platform it lives on.",
      },
      {
        id: "ba-2",
        question: "What is the correct way to describe the relationship between Tier 1 and WSC?",
        options: [
          "In all social media posts to establish credibility",
          "In program descriptions for parents and athletes",
          "In investor decks, partnership agreements, and formal credibility contexts only",
          "In the footer of every email",
        ],
        correct: 2,
        explanation: "Tier 1 is the performance brand for all programming. WSC is the 67-acre platform it lives on. Never describe Tier 1 as 'a program at WSC' — it IS the performance brand.",
      },
      {
        id: "ba-3",
        question: "What is the correct relationship between Tier 1 Performance and WSC?",
        options: [
          "They are competing brands targeting different demographics",
          "Tier 1 is the performance brand; WSC is the platform and facility it lives on",
          "WSC is the parent company; Tier 1 is a sub-brand of WSC",
          "They are interchangeable names for the same organization",
        ],
        correct: 1,
        explanation: "Tier 1 is the performance brand responsible for all programming. WSC is the platform and 67-acre facility it operates within. They are distinct but work together.",
      },
      {
        id: "ba-4",
        question: "What is the primary tagline for WSC (Woodinville Sports Club)?",
        options: [
          "Train Without Limits",
          "The Standard Is The Standard.",
          "Elevate Your Game. Enrich Your Life.",
          "Two Divisions. One System.",
        ],
        correct: 2,
        explanation: "'Elevate Your Game. Enrich Your Life.' is the WSC primary tagline — the dual value proposition of performance + lifestyle. Always use the pair together, never paraphrase or split them.",
      },
    ],
  },
  {
    id: "core-values",
    title: "Core Values",
    section: "Foundation",
    description: "Know the seven values that every piece of content must trace back to.",
    questions: [
      {
        id: "cv-1",
        question: "Every piece of content — in any channel, for any audience — must be traceable back to at least one of how many core values?",
        options: ["3", "5", "7", "10"],
        correct: 2,
        explanation: "There are 7 core values: Excellence, Care, Belonging, Authenticity, Innovation, Long-Term Over Short-Term, and Truth. Every content piece must connect to at least one.",
      },
      {
        id: "cv-2",
        question: "Which core value is described as 'the culture is the product'?",
        options: ["Excellence", "Authenticity", "Belonging", "Care"],
        correct: 2,
        explanation: "Belonging: Athletes and families stay not because of facilities, but because they are part of something. The culture is the product — it fuels pride, commitment, and word-of-mouth growth.",
      },
      {
        id: "cv-3",
        question: "The core value of Authenticity means:",
        options: [
          "Using professional photography and polished brand assets at all times",
          "No outsourced narratives — telling our own stories from inside the culture",
          "Maintaining consistent brand colors and typography across all platforms",
          "Being transparent about pricing and program structures",
        ],
        correct: 1,
        explanation: "Authenticity means no outsourced narratives, no generic PR. Marketing must be embedded in the program — attending practices, speaking with families, capturing real moments.",
      },
      {
        id: "cv-4",
        question: "Which core value directly prohibits discounts, gimmicks, and short-term revenue tactics?",
        options: ["Truth", "Excellence", "Long-Term Over Short-Term", "Innovation"],
        correct: 2,
        explanation: "Long-Term Over Short-Term: We reject shortcuts that undermine sustainable success. Every decision is made with long-term growth in mind. No gimmicks. No discount culture.",
      },
    ],
  },
  {
    id: "we-are",
    title: "We Are / We Are Not",
    section: "Foundation",
    description: "Internalize the identity anchors that define what the brand is and is not.",
    questions: [
      {
        id: "wa-1",
        question: "Which of the following correctly describes what this brand IS?",
        options: [
          "A gym or club you pay to use and then leave without identity",
          "Polished advertisers producing stock-photo content",
          "Authentic storytellers who reveal the grind, setbacks, and real process",
          "Discount or promotion-driven — ads that reduce the story to a transaction",
        ],
        correct: 2,
        explanation: "We ARE authentic storytellers who reveal the grind, setbacks, and real process. We are NOT polished advertisers producing stock-photo content disconnected from real training.",
      },
      {
        id: "wa-2",
        question: "The brand is described as 'inclusive through exclusivity.' What does this mean?",
        options: [
          "Only elite athletes are welcome in any program",
          "Hard to earn entry, but family once you're in",
          "Exclusive pricing for members who refer others",
          "Inclusive marketing language with exclusive program content",
        ],
        correct: 1,
        explanation: "Inclusive through exclusivity means: hard to earn entry, family once you're in. This is NOT gatekeeping without warmth, or open access without standards.",
      },
      {
        id: "wa-3",
        question: "Which of the following is explicitly something this brand is NOT?",
        options: [
          "Performance-minded at every level",
          "Community-driven with word-of-mouth as the growth engine",
          "Vague or corporate — empty motivational filler or generic mission statements",
          "Direct and honest with real feedback and accountability",
        ],
        correct: 2,
        explanation: "We are NOT vague or corporate. We do not use empty motivational filler or generic mission statements. We ARE direct, honest, and specific.",
      },
    ],
  },
  {
    id: "color-palette",
    title: "Color Palette",
    section: "Visual Identity",
    description: "Know the two brand palettes and the rules that govern how they are used.",
    questions: [
      {
        id: "cp-1",
        question: "What is the primary background color for Tier 1 Performance materials?",
        options: ["#0a0704 (warm near-black)", "#1a1d21 (near-black charcoal)", "#172554 (deep navy)", "#e8e0d3 (parchment)"],
        correct: 1,
        explanation: "#1a1d21 is the Tier 1 primary background — near-black charcoal that projects intensity and focus. It is the dominant backdrop for all Tier 1 materials.",
      },
      {
        id: "cp-2",
        question: "Which of the following is a hard rule about mixing the two brand palettes?",
        options: [
          "Parchment/cream tones may be used as accent colors in Tier 1 materials",
          "Tier 1's cold charcoal palette must never be mixed with WSC's warm tones in a single layout",
          "Both brands share the same background color for consistency",
          "The Tier 1 blue accent (#3b82f6) must not be used in WSC materials",
        ],
        correct: 1,
        explanation: "Do NOT mix Tier 1's cold charcoal palette with WSC's warm tones in a single layout. The palettes are intentionally distinct and must remain separate.",
      },
      {
        id: "cp-3",
        question: "What is the shared design language rule about corner radii?",
        options: [
          "Tier 1 uses 8px radius; WSC uses 4px radius",
          "Both brands use fully rounded corners for a modern feel",
          "Tier 1 uses 0rem; WSC uses 0.125rem — neither brand uses rounded corners",
          "Corner radius is not specified and left to designer discretion",
        ],
        correct: 2,
        explanation: "Sharp corners are a shared design language rule. Tier 1 uses 0rem, WSC uses 0.125rem. Neither brand uses rounded corners — do not introduce them anywhere.",
      },
      {
        id: "cp-4",
        question: "Which color is explicitly prohibited in Tier 1 materials?",
        options: [
          "Deep navy (#172554)",
          "Parchment/cream tones (#e8e0d3, #faf9f5)",
          "Blue accent (#3b82f6)",
          "Off-white foreground (#e8e8e8)",
        ],
        correct: 1,
        explanation: "Do NOT use parchment/cream tones in Tier 1 materials — they are too soft for the performance context and belong exclusively to the WSC palette.",
      },
    ],
  },
  {
    id: "typography",
    title: "Typography",
    section: "Visual Identity",
    description: "Know which typefaces belong to which brand and the rules governing their use.",
    questions: [
      {
        id: "ty-1",
        question: "Which typeface is the primary display font for Tier 1 Performance?",
        options: ["Inter", "Georgia", "Oswald 700", "Montserrat"],
        correct: 2,
        explanation: "Oswald 700 is the Tier 1 display font — uppercase, -0.02em letter-spacing. It projects authority and performance. It must NOT be used in WSC materials.",
      },
      {
        id: "ty-2",
        question: "Which typeface is shared by both Tier 1 and WSC as the body copy font?",
        options: ["Oswald", "Inter", "Playfair Display", "Roboto"],
        correct: 1,
        explanation: "Inter is the shared body typeface for both brands. It creates typographic unity across the two distinct visual identities.",
      },
      {
        id: "ty-3",
        question: "What is the rule about using Oswald in WSC materials?",
        options: [
          "Oswald may be used in WSC materials at lighter weights (300–400)",
          "Oswald is permitted in WSC event signage only",
          "Do NOT use Oswald in WSC materials — it is the wrong emotional register",
          "Oswald is the preferred headline font for both brands",
        ],
        correct: 2,
        explanation: "Do NOT use Oswald in WSC materials. It carries the wrong emotional register for WSC's warm, welcoming identity. WSC uses a different typographic approach.",
      },
    ],
  },
  {
    id: "logos",
    title: "Logo Usage",
    section: "Visual Identity",
    description: "Understand the logo variants and the rules that govern their correct use.",
    questions: [
      {
        id: "lo-1",
        question: "When placing the WSC logo on a dark background, which version should be used?",
        options: [
          "The black logo with white background",
          "The white/transparent logo variant",
          "Either version — background color does not affect logo choice",
          "The full-color logo regardless of background",
        ],
        correct: 1,
        explanation: "The white/transparent logo variant is used on dark backgrounds. Logo version selection must ensure maximum contrast and legibility against the background.",
      },
      {
        id: "lo-2",
        question: "Which of the following is a prohibited logo use?",
        options: [
          "Using the short/icon version on small formats like social profile images",
          "Recoloring the logo to match a partner's brand palette in co-branded materials",
          "Using the full horizontal logo on wide-format signage",
          "Using the white version on a dark photography background",
        ],
        correct: 1,
        explanation: "Recoloring either logo to match a partner's brand palette is explicitly prohibited. Both logos must appear in their approved color versions at all times.",
      },
    ],
  },
  {
    id: "voice-constants",
    title: "Voice Constants",
    section: "Brand Voice",
    description: "Know the six voice constants and the DO / DON'T rules for each.",
    questions: [
      {
        id: "vc-1",
        question: "Which of the following is an example of the 'Direct' voice constant?",
        options: [
          "\"We would like to invite you to consider joining our program.\"",
          "\"Our program might be a good fit for athletes who are looking to improve.\"",
          "\"Enrollment opens Monday. 12 spots. First come, first served.\"",
          "\"There are many benefits to training with our experienced coaching staff.\"",
        ],
        correct: 2,
        explanation: "'Direct' means no filler, no hedging, no passive voice. 'Enrollment opens Monday. 12 spots. First come, first served.' is direct, specific, and action-oriented.",
      },
      {
        id: "vc-2",
        question: "The word 'passionate' is on the Never Use list. Why?",
        options: [
          "It is too informal for a performance brand",
          "It is overused — show the passion through specifics, don't claim it",
          "It implies emotional instability in coaching staff",
          "It is a competitor's trademarked term",
        ],
        correct: 1,
        explanation: "'Passionate' is overused and hollow. The brand rule is: show the passion through specific actions, results, and stories — don't assert it as a claim.",
      },
      {
        id: "vc-3",
        question: "Which voice constant requires that every claim be backed by proof rather than assertion?",
        options: ["Direct", "Specific", "Earned", "Grounded"],
        correct: 2,
        explanation: "'Earned' means claims are backed by proof, not assertion. Phrases like 'we believe' or 'we think' are voice violations — replace with specific results, credentials, or examples.",
      },
      {
        id: "vc-4",
        question: "Which of the following words is approved for use in brand copy?",
        options: ["Amazing", "World-class", "Committed", "Incredible"],
        correct: 2,
        explanation: "'Committed' is approved. 'Amazing,' 'world-class,' and 'incredible' are all on the Never Use list — they are vague superlatives or unverified claims.",
      },
    ],
  },
  {
    id: "tone-matrix",
    title: "Tone-by-Context",
    section: "Brand Voice",
    description: "Understand how tone shifts by channel and context while staying on-brand.",
    questions: [
      {
        id: "tm-1",
        question: "How should the tone differ between a social media post and a parent email?",
        options: [
          "Social should be more formal; email should be casual",
          "Both should use identical tone — consistency is the priority",
          "Social is direct and culture-forward; email is warm, clear, and relationship-focused",
          "Email should use Tier 1 voice; social should use WSC voice regardless of content",
        ],
        correct: 2,
        explanation: "Tone shifts by context. Social media is direct, culture-forward, and performance-driven. Parent emails are warm, clear, and relationship-focused — same brand, different register.",
      },
      {
        id: "tm-2",
        question: "Which tone is appropriate for a Tier 1 Academy program description?",
        options: [
          "Casual and conversational — like a friend recommending a program",
          "Authoritative and performance-focused — specific outcomes, clear standards",
          "Inspirational and aspirational — heavy use of motivational language",
          "Neutral and informational — facts only, no emotional language",
        ],
        correct: 1,
        explanation: "Tier 1 program descriptions use an authoritative, performance-focused tone — specific outcomes, clear standards, and earned language. Not casual, not generic inspiration.",
      },
    ],
  },
  {
    id: "messaging-pillars",
    title: "Messaging Pillars",
    section: "Brand Voice",
    description: "Know the five messaging pillars and what they communicate.",
    questions: [
      {
        id: "mp-1",
        question: "How many core messaging pillars does the brand have?",
        options: ["3", "4", "5", "7"],
        correct: 2,
        explanation: "There are 5 messaging pillars. Each pillar represents a core proof point that the brand communicates consistently across all channels.",
      },
      {
        id: "mp-2",
        question: "Which messaging pillar is most directly supported by the APL's performance analytics and Uneekor launch monitor technology?",
        options: ["Community & Belonging", "Coach Quality & Expertise", "Innovation & Systems", "Long-Term Development"],
        correct: 2,
        explanation: "Innovation & Systems is supported by the APL's (Athletic Performance Lab) performance analytics and Uneekor launch monitor technology — a precision ball-tracking system used for golf and tennis swing analysis. These are data-driven development systems others haven't imagined yet.",
      },
    ],
  },
  {
    id: "taglines",
    title: "Taglines & Vocabulary",
    section: "Brand Voice",
    description: "Know the approved taglines and the vocabulary rules for both brands.",
    questions: [
      {
        id: "tl-1",
        question: "What is the primary tagline for Woodinville Sports Club?",
        options: [
          "\"The Standard Is The Standard.\"",
          "\"Train Without Limits\"",
          "\"Elevate Your Game. Enrich Your Life.\"",
          "\"Two Divisions / One System\"",
        ],
        correct: 2,
        explanation: "'Elevate Your Game. Enrich Your Life.' is the WSC primary tagline — the dual value proposition of performance + lifestyle. It should always be used in its complete form.",
      },
      {
        id: "tl-2",
        question: "\"The Standard Is The Standard.\" is used as:",
        options: [
          "WSC's secondary tagline for facility communications",
          "Tier 1's primary culture anchor — hero copy, program introductions, academy communications",
          "A generic motivational quote that could appear at any sports club",
          "A shared tagline used by both Tier 1 and WSC equally",
        ],
        correct: 1,
        explanation: "'The Standard Is The Standard.' is Tier 1's primary culture anchor — used in hero copy, program introductions, and academy communications. It is not a WSC tagline.",
      },
      {
        id: "tl-3",
        question: "Which of the following words is in the 'Avoid' vocabulary list?",
        options: ["Athlete", "Competitor", "Facility", "Cheap"],
        correct: 3,
        explanation: "'Cheap' is on the Never Use list — it implies low value. 'Athlete,' 'Competitor,' and 'Facility' are all approved vocabulary terms.",
      },
    ],
  },
  {
    id: "channel-guidelines",
    title: "Channel Guidelines",
    section: "Application",
    description: "Know the platform-specific rules for how the brand communicates on each channel.",
    questions: [
      {
        id: "cg-1",
        question: "For Instagram posts, what is the approved maximum number of hashtags for Tier 1 content?",
        options: ["5", "10", "15", "30"],
        correct: 2,
        explanation: "The approved maximum is 15 hashtags for Instagram posts. Using more dilutes the brand's authority and looks spammy — quality and relevance over quantity.",
      },
      {
        id: "cg-2",
        question: "Which channel requires the most formal and relationship-focused tone?",
        options: ["Instagram Stories", "Twitter/X", "Parent and family email communications", "Facility signage"],
        correct: 2,
        explanation: "Parent and family email communications require the most formal, warm, and relationship-focused tone. These are high-stakes communications that directly affect enrollment and trust.",
      },
    ],
  },
  {
    id: "instagram",
    title: "Instagram Guidelines",
    section: "Application",
    description: "Know the Instagram-specific rules for posts, Reels, captions, and content mix.",
    questions: [
      {
        id: "ig-1",
        question: "What is the recommended content mix for Tier 1's Instagram feed?",
        options: [
          "100% training and performance content",
          "Equal split between promotional and organic content",
          "A structured mix: Process/Training, Athlete Stories, Culture/Team, and Program/Standard content",
          "Primarily event announcements and enrollment promotions",
        ],
        correct: 2,
        explanation: "The Tier 1 content mix is structured across pillars: Process/Training content, Athlete Stories, Culture/Team moments, and Program/Standard communications — not purely promotional.",
      },
      {
        id: "ig-2",
        question: "For Instagram Reels, where should the partner logo appear?",
        options: [
          "Overlaid on action footage throughout the video",
          "In the opening or closing card only — not overlaid on action footage",
          "In the lower-right corner at all times",
          "Partner logos are not permitted in Reels",
        ],
        correct: 1,
        explanation: "Partner logos in Reels appear in the opening or closing card only — never overlaid on action footage. Maximum 3-second hold on the card.",
      },
      {
        id: "ig-3",
        question: "What is the 6-frame Reel storyboard structure?",
        options: [
          "Intro → Brand → Content → CTA → Outro → Credits",
          "Opening Hook → Setup → Core Action → Detail → Reaction → Closing Frame",
          "Problem → Solution → Proof → Testimonial → CTA → Brand",
          "Athlete → Drill → Result → Coach → Culture → Enrollment",
        ],
        correct: 1,
        explanation: "The approved 6-frame Reel storyboard is: Opening Hook → Setup → Core Action → Detail → Reaction → Closing Frame. This structure ensures every Reel has a complete narrative arc.",
      },
      {
        id: "ig-4",
        question: "What is the intended register mix for Tier 1 Instagram posts?",
        options: [
          "100% manifesto posts so the brand always feels intense",
          "50% Teaching, 40% Documentary, and 10% Manifesto",
          "Equal thirds: Teaching, Documentary, and Manifesto",
          "Mostly promotional announcements with occasional training footage",
        ],
        correct: 1,
        explanation: "Tier 1 earns its loud manifesto moments by being measured most of the time: 50% Teaching, 40% Documentary, and 10% Manifesto.",
      },
      {
        id: "ig-5",
        question: "Which Tier 1 Instagram badge color should be used for weather delays or schedule changes?",
        options: ["Blue standard badge", "Amber alert badge", "Red urgent badge", "No badge color is specified"],
        correct: 1,
        explanation: "Amber (#f59e0b) is for operational alerts such as weather delays, schedule changes, and facility updates. Red is reserved for urgent/time-critical items.",
      },
      {
        id: "ig-6",
        question: "Which rule protects Tier 1 post hierarchy?",
        options: [
          "Use two or three focal points so the post feels energetic",
          "One hero per post — never two competing focal points",
          "Use both blue and red accents to create contrast",
          "Put pricing on canvas when urgency matters",
        ],
        correct: 1,
        explanation: "A Tier 1 post has one visual hero. Competing focal points dilute the performance signal and make the post feel like a flyer.",
      },
      {
        id: "ig-7",
        question: "Where does pricing belong in Tier 1 Instagram materials?",
        options: [
          "On the post canvas in a large callout",
          "In the caption only — never on the canvas",
          "In a red badge if the price is time-sensitive",
          "In the hero zone next to the headline",
        ],
        correct: 1,
        explanation: "Pricing never belongs on the Tier 1 canvas. It can live in the caption, bio, or registration surface, but not as graphic hierarchy.",
      },
      {
        id: "ig-8",
        question: "What is the most common Tier 1 Instagram anti-pattern?",
        options: [
          "Using real training photography",
          "The Flyer Trap: gradients, pricing, urgency language, decorative emoji, and multiple CTAs",
          "Naming the source of third-party recognition at the top",
          "Using Inter Light for supporting copy",
        ],
        correct: 1,
        explanation: "The Flyer Trap is the most common failure: multi-gradient backgrounds, price-first hierarchy, urgency theater, decorative emoji, and multiple CTAs.",
      },
    ],
  },
  {
    id: "co-branding",
    title: "Co-Branding Rules",
    section: "Governance",
    description: "Know the partner tier rules and what requires approval before production.",
    questions: [
      {
        id: "cb-1",
        question: "For a Supporting Partner, the partner logo should appear at what size relative to the brand logo?",
        options: ["Equal size (100%)", "75% of the brand logo size", "50% of the brand logo size", "60% of the brand logo size"],
        correct: 1,
        explanation: "Supporting Partners: the partner logo appears at 75% of the brand logo size. Presenting Partners may appear at equal size. Community Partners appear at 60%.",
      },
      {
        id: "cb-2",
        question: "Which of the following co-branding uses is explicitly prohibited?",
        options: [
          "Placing a Presenting Partner logo to the left of the brand logo",
          "Using a partner logo that is larger than the WSC or Tier 1 logo",
          "Acknowledging a Community Partner in the footer of a flyer",
          "Tagging a Supporting Partner's account in an Instagram caption",
        ],
        correct: 1,
        explanation: "Using a partner logo that is larger than the WSC or Tier 1 logo is explicitly prohibited. The brand logo must always be equal to or larger than any partner logo.",
      },
      {
        id: "cb-3",
        question: "What must happen before any co-branded material goes to production or publication?",
        options: [
          "The partner must approve the design",
          "Written approval from the brand lead is required",
          "The design team must review it internally",
          "It must be posted as a draft on social media first",
        ],
        correct: 1,
        explanation: "Written approval from the brand lead is required before any co-branded material goes to production or publication — regardless of partner tier.",
      },
    ],
  },
  {
    id: "anti-patterns",
    title: "Anti-Patterns",
    section: "Application",
    description: "Know the absolute never-do rules and why they violate the brand.",
    questions: [
      {
        id: "ap-1",
        question: "Which of the following is a brand anti-pattern that must never occur?",
        options: [
          "Using the short/icon logo version on social profile images",
          "Using Tier 1's dark charcoal palette on WSC materials",
          "Using stock imagery instead of real training photos",
          "Using the white logo version on a dark photography background",
        ],
        correct: 2,
        explanation: "Using stock imagery or overly polished graphics disconnected from real training undermines authenticity. Marketing must be embedded in the program — real athletes, real moments, real coaches.",
      },
      {
        id: "ap-2",
        question: "Why is using stock photography of generic athletes an anti-pattern for this brand?",
        options: [
          "Stock photography is too expensive for the budget",
          "It violates the Authenticity core value — the brand tells its own stories from inside the culture",
          "Stock photos have incorrect aspect ratios for social media",
          "Generic athletes may not represent the correct sport",
        ],
        correct: 1,
        explanation: "Stock photography of generic athletes directly violates the Authenticity core value. The brand must tell its own stories from inside the culture — real athletes, real training, real moments.",
      },
      {
        id: "ap-3",
        question: "Using rounded corners in Tier 1 or WSC design is:",
        options: [
          "Acceptable for WSC materials only",
          "Acceptable when used sparingly as a design accent",
          "An absolute anti-pattern — neither brand uses rounded corners",
          "Required for button elements but not containers",
        ],
        correct: 2,
        explanation: "Rounded corners are an absolute anti-pattern for both brands. Tier 1 uses 0rem radius; WSC uses 0.125rem. Do not introduce rounded corners anywhere in either brand.",
      },
    ],
  },
  {
    id: "wsc-instagram-design-system",
    title: "WSC Instagram Design System",
    section: "Application",
    description: "Know WSC's hospitality-first Instagram rules: warm surfaces, Inter 200/300 typography, one italic moment, one Caveat accent, and no urgency theater.",
    questions: [
      {
        id: "wi-1",
        question: "What is the default background for WSC Instagram posts?",
        options: ["Dark charcoal #1a1d21", "Parchment #e8e0d3", "Navy #0d1b2a", "Pure white #ffffff"],
        correct: 1,
        explanation: "WSC Instagram starts from parchment (#e8e0d3). Cream is the card/container surface; navy is an accent only.",
      },
      {
        id: "wi-2",
        question: "How should Navy (#0d1b2a) be used in WSC Instagram posts?",
        options: [
          "As the full post background for premium posts",
          "As accent bars and data callouts only — never full background",
          "As body copy color on parchment",
          "As a replacement for the WSC blue link color",
        ],
        correct: 1,
        explanation: "Navy is reserved for accent bars and data callouts. A full navy WSC post shifts the brand into the wrong register.",
      },
      {
        id: "wi-3",
        question: "Which type weight was added for WSC display headlines?",
        options: ["Oswald 700", "Inter 200 ExtraLight", "Inter 700 Bold", "Caveat 700"],
        correct: 1,
        explanation: "Inter 200 ExtraLight is the WSC display weight for large, tightly tracked, premium moments.",
      },
      {
        id: "wi-4",
        question: "What is the WSC italic emphasis rule?",
        options: [
          "Use italic freely whenever copy needs warmth",
          "Use italic on one word or short phrase per post",
          "Never use italic in WSC content",
          "Use italic only in captions, never on canvas",
        ],
        correct: 1,
        explanation: "WSC gets one italic word or short phrase per post. More than one dilutes the warmth signal.",
      },
      {
        id: "wi-5",
        question: "What is the correct use of Caveat in WSC posts?",
        options: [
          "Use it for headlines and body copy",
          "Use it for one handwritten accent line only",
          "Use it in Tier 1 templates to add warmth",
          "Use it in multiple places when a post is event-focused",
        ],
        correct: 1,
        explanation: "Caveat is a one-line handwritten accent only. It is never a headline face, body face, or Tier 1 font.",
      },
      {
        id: "wi-6",
        question: "What are Soft Blue, Sage, and Sun used for?",
        options: [
          "Full post backgrounds",
          "Accent tools such as italic highlights and category dots",
          "Tier 1 alert states",
          "Logo recoloring",
        ],
        correct: 1,
        explanation: "Soft Blue supports italic highlights. Sage and Sun support schedule/category dots. They are accent tools only, never full backgrounds.",
      },
      {
        id: "wi-7",
        question: "What does the Urgency Theater anti-pattern look like?",
        options: [
          "Stating real numbers calmly",
          "ALL CAPS, fire emoji, and 'ACT FAST' language",
          "Using a single warm CTA",
          "Showing real community moments",
        ],
        correct: 1,
        explanation: "Urgency theater uses ALL CAPS, fire emoji, and panic language. WSC states real numbers calmly instead.",
      },
      {
        id: "wi-8",
        question: "Why is the Discount Flyer anti-pattern off-brand for WSC?",
        options: [
          "It leads with price instead of the experience",
          "It uses too little information",
          "It avoids CTAs",
          "It uses warm photography",
        ],
        correct: 0,
        explanation: "WSC leads with the experience and community value. Pricing belongs in the caption or bio, not as the canvas hierarchy.",
      },
      {
        id: "wi-9",
        question: "Which template is part of the WSC Everyday category?",
        options: ["Community Moment", "Hero Commit", "Tryout Urgency", "Ranking Wall"],
        correct: 0,
        explanation: "Community Moment is a WSC Everyday template. Hero Commit and Ranking Wall belong to Tier 1 credibility logic.",
      },
      {
        id: "wi-10",
        question: "How many Caveat accent lines are allowed in one WSC post?",
        options: ["None", "One", "Two", "Unlimited if small"],
        correct: 1,
        explanation: "One Caveat accent line per post. More than one turns the post into a greeting-card treatment.",
      },
      {
        id: "wi-11",
        question: "What is the maximum number of italic highlights in a WSC post?",
        options: ["One", "Two", "Three", "No maximum"],
        correct: 0,
        explanation: "One italic highlight maximum. Stacking multiple italic highlights dilutes the emotional emphasis.",
      },
    ],
  },
];

// ─── Types ─────────────────────────────────────────────────────────────────────

type QuizState = "intro" | "chapter-intro" | "question" | "chapter-result" | "final";

interface UserAnswer {
  questionId: string;
  selected: number;
  correct: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGrade(score: number): { label: string; color: string; description: string } {
  if (score >= 90) return { label: "CERTIFIED", color: "#22c55e", description: "Exceptional brand knowledge. You are fully certified." };
  if (score >= 75) return { label: "PROFICIENT", color: "#3b82f6", description: "Strong brand knowledge with minor gaps to review." };
  if (score >= 60) return { label: "DEVELOPING", color: "#f59e0b", description: "Good foundation — review the flagged sections before publishing." };
  return { label: "NEEDS REVIEW", color: "#ef4444", description: "Please re-read the Brand Kit before creating brand content." };
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ current, total, color = "#3b82f6" }: { current: number; total: number; color?: string }) {
  return (
    <div style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.08)", marginBottom: "32px" }}>
      <div
        style={{
          height: "3px",
          width: `${(current / total) * 100}%`,
          backgroundColor: color,
          transition: "width 400ms ease",
        }}
      />
    </div>
  );
}

function ChapterPill({ chapter, status }: { chapter: Chapter; status: "locked" | "active" | "passed" | "failed" }) {
  const colors = {
    locked: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.06)", text: "#a0a5ad" },
    active: { bg: "rgba(59,130,246,0.1)", border: "#3b82f6", text: "#3b82f6" },
    passed: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.3)", text: "#22c55e" },
    failed: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.3)", text: "#ef4444" },
  };
  const c = colors[status];
  return (
    <div
      style={{
        padding: "6px 12px",
        backgroundColor: c.bg,
        borderTop: `1px solid ${c.border}`,
        borderRight: `1px solid ${c.border}`,
        borderBottom: `1px solid ${c.border}`,
        borderLeft: `1px solid ${c.border}`,
        fontFamily: "Inter, sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        color: c.text,
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {status === "passed" && "✓ "}
      {status === "failed" && "✕ "}
      {chapter.title}
    </div>
  );
}

/// ─── Current Kit Version (keep in sync with VersionChangelog.tsx KIT_VERSION) ──
const CURRENT_KIT_VERSION = "1.5.1";
const LS_KEY_VERSION = "wsc_brand_kit_certified_version";
const LS_KEY_NAME    = "wsc_brand_kit_certified_name";
const LS_KEY_DATE    = "wsc_brand_kit_certified_date";

// ─── Main Component ────────────────────────────────────────────────────────────
export default function BrandOnboardingQuiz() {
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [chapterScores, setChapterScores] = useState<Record<string, number>>({});
  const [userName, setUserName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [completedAt] = useState(() => new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));

  // Re-certification: detect if user has a prior cert and if it's outdated
  const storedVersion  = typeof window !== "undefined" ? localStorage.getItem(LS_KEY_VERSION) : null;
  const storedCertName = typeof window !== "undefined" ? localStorage.getItem(LS_KEY_NAME)    : null;
  const storedCertDate = typeof window !== "undefined" ? localStorage.getItem(LS_KEY_DATE)    : null;
  const isPreviouslyCertified    = storedVersion !== null;
  const isRecertificationRequired = isPreviouslyCertified && storedVersion !== CURRENT_KIT_VERSION;

  const chapter = CHAPTERS[currentChapterIndex];
  const question = chapter?.questions[currentQuestionIndex];
  const totalQuestions = CHAPTERS.reduce((sum, c) => sum + c.questions.length, 0);
  const answeredCount = answers.length;

  const chapterAnswers = answers.filter((a) =>
    chapter?.questions.some((q) => q.id === a.questionId)
  );
  const chapterScore = chapter
    ? Math.round((chapterAnswers.filter((a) => a.correct).length / chapter.questions.length) * 100)
    : 0;

  const totalScore = answers.length > 0
    ? Math.round((answers.filter((a) => a.correct).length / answers.length) * 100)
    : 0;

  const getChapterStatus = (idx: number): "locked" | "active" | "passed" | "failed" => {
    if (idx === currentChapterIndex && quizState !== "final") return "active";
    const ch = CHAPTERS[idx];
    const chAnswers = answers.filter((a) => ch.questions.some((q) => q.id === a.questionId));
    if (chAnswers.length === 0) return idx < currentChapterIndex ? "failed" : "locked";
    const score = Math.round((chAnswers.filter((a) => a.correct).length / ch.questions.length) * 100);
    return score >= 75 ? "passed" : "failed";
  };

  const handleAnswer = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === question.correct;
    const newAnswer: UserAnswer = {
      questionId: question.id,
      selected: selectedOption,
      correct: isCorrect,
    };
    setAnswers((prev) => [...prev, newAnswer]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentQuestionIndex < chapter.questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      // End of chapter
      const chAnswers = [...answers];
      const score = Math.round(
        (chAnswers.filter((a) => chapter.questions.some((q) => q.id === a.questionId && a.correct)).length /
          chapter.questions.length) * 100
      );
      setChapterScores((prev) => ({ ...prev, [chapter.id]: score }));
      setQuizState("chapter-result");
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < CHAPTERS.length - 1) {
      setCurrentChapterIndex((i) => i + 1);
      setCurrentQuestionIndex(0);
      setQuizState("chapter-intro");
    } else {
      // Save certification to localStorage for re-certification tracking
      const certDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
      localStorage.setItem(LS_KEY_VERSION, CURRENT_KIT_VERSION);
      localStorage.setItem(LS_KEY_NAME, userName || "Team Member");
      localStorage.setItem(LS_KEY_DATE, certDate);
      setQuizState("final");
    }
  };

  const handleRestart = () => {
    setQuizState("intro");
    setCurrentChapterIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowExplanation(false);
    setChapterScores({});
    setUserName("");
    setNameInput("");
  };

  const handleCopyCertificate = () => {
    const grade = getGrade(totalScore);
    const text = `WSC & Tier 1 Performance — Brand Certification\n${userName || "Team Member"} — ${grade.label}\nScore: ${totalScore}/100\nCompleted: ${completedAt}\nAll ${CHAPTERS.length} sections completed.`;
    navigator.clipboard.writeText(text).then(() => toast.success("Certificate details copied"));
  };

  const grade = getGrade(totalScore);

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (quizState === "intro") {
    return (
      <div style={{ backgroundColor: "#0f1114" }}>
        <div style={{ padding: "80px 48px" }}>
          <SectionHeader
            label="— Tools"
            title="Brand Onboarding Quiz"
            subtitle={`${CHAPTERS.length} chapters · ${totalQuestions} questions · Covers every section of the Brand Kit`}
            dark
          />

          {/* Re-certification banner */}
          {isRecertificationRequired && (
            <div style={{
              marginTop: "24px",
              padding: "16px 20px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.4)",
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              maxWidth: "900px",
            }}>
              <div style={{ color: "#ef4444", fontSize: "20px", flexShrink: 0 }}>⚠️</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "15px", textTransform: "uppercase" as const, letterSpacing: "0.04em", color: "#ef4444", marginBottom: "6px" }}>
                  Re-Certification Required
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", lineHeight: 1.6 }}>
                  {storedCertName ? <strong style={{ color: "#e8e8e8" }}>{storedCertName}</strong> : "You"}, your certification was completed on <strong style={{ color: "#e8e8e8" }}>{storedCertDate}</strong> for Brand Kit <strong style={{ color: "#e8e8e8" }}>v{storedVersion}</strong>. The Brand Kit has been updated to <strong style={{ color: "#ef4444" }}>v{CURRENT_KIT_VERSION}</strong>. Please re-take the quiz to renew your certification.
                </div>
              </div>
            </div>
          )}

          {/* Previously certified (up to date) banner */}
          {isPreviouslyCertified && !isRecertificationRequired && (
            <div style={{
              marginTop: "24px",
              padding: "16px 20px",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.3)",
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              maxWidth: "900px",
            }}>
              <div style={{ color: "#22c55e", fontSize: "20px", flexShrink: 0 }}>✓</div>
              <div>
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "15px", textTransform: "uppercase" as const, letterSpacing: "0.04em", color: "#22c55e", marginBottom: "6px" }}>
                  Certification Current
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", lineHeight: 1.6 }}>
                  {storedCertName ? <strong style={{ color: "#e8e8e8" }}>{storedCertName}</strong> : "You"} completed certification on <strong style={{ color: "#e8e8e8" }}>{storedCertDate}</strong> for Brand Kit <strong style={{ color: "#22c55e" }}>v{storedVersion}</strong> — the current version. You may re-take at any time to refresh your knowledge.
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 max-w-6xl">
            {/* Left: overview */}
            <div className="lg:col-span-2">
              <div
                style={{
                  backgroundColor: "#1a1d21",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: "3px solid #3b82f6",
                  padding: "28px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "18px", textTransform: "uppercase" as const, letterSpacing: "-0.01em", color: "#ffffff", marginBottom: "10px" }}>
                  How It Works
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", lineHeight: 1.7 }}>
                  Work through each chapter in order. Each chapter covers one section of the Brand Kit and ends with a short quiz. You need 75% or higher per chapter to be considered proficient in that section. Complete all {CHAPTERS.length} chapters to receive your Brand Certification.
                </div>
              </div>

              {/* Chapter list */}
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#3b82f6", marginBottom: "12px" }}>
                Chapters
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CHAPTERS.map((ch, i) => (
                  <div
                    key={ch.id}
                    style={{
                      backgroundColor: "#1a1d21",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      borderRight: "1px solid rgba(255,255,255,0.06)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      borderLeft: "1px solid rgba(255,255,255,0.06)",
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "18px", color: "rgba(59,130,246,0.4)", minWidth: "28px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#e8e8e8" }}>{ch.title}</div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a0a5ad" }}>{ch.questions.length} questions · {ch.section}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: start */}
            <div>
              <div
                style={{
                  backgroundColor: "#1a1d21",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                  padding: "28px",
                }}
              >
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "16px", textTransform: "uppercase" as const, letterSpacing: "-0.01em", color: "#ffffff", marginBottom: "16px" }}>
                  Your Name
                </div>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Enter your name (optional)"
                  style={{
                    width: "100%",
                    backgroundColor: "#0f1114",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    borderRight: "1px solid rgba(255,255,255,0.08)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    borderLeft: "1px solid rgba(255,255,255,0.08)",
                    color: "#e8e8e8",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    padding: "12px 14px",
                    outline: "none",
                    marginBottom: "20px",
                  }}
                />
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Chapters", value: CHAPTERS.length },
                    { label: "Questions", value: totalQuestions },
                    { label: "Pass Score", value: "75%" },
                  ].map((s) => (
                    <div key={s.label} style={{ textAlign: "center" as const }}>
                      <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "28px", color: "#3b82f6", letterSpacing: "-0.02em" }}>{s.value}</div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#a0a5ad", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setUserName(nameInput);
                    setQuizState("chapter-intro");
                  }}
                  style={{
                    width: "100%",
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                    fontSize: "15px",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.04em",
                    padding: "14px",
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Begin Certification
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Chapter Intro ──────────────────────────────────────────────────────────
  if (quizState === "chapter-intro") {
    return (
      <div style={{ backgroundColor: "#0f1114" }}>
        <div style={{ padding: "80px 48px" }}>
          <ProgressBar current={currentChapterIndex} total={CHAPTERS.length} />
          <div style={{ maxWidth: "640px" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#3b82f6", marginBottom: "8px" }}>
              Chapter {currentChapterIndex + 1} of {CHAPTERS.length} — {chapter.section}
            </div>
            <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "40px", textTransform: "uppercase" as const, letterSpacing: "-0.02em", color: "#ffffff", lineHeight: 1.1, marginBottom: "16px" }}>
              {chapter.title}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#a0a5ad", lineHeight: 1.65, marginBottom: "32px" }}>
              {chapter.description}
            </div>
            <div
              style={{
                backgroundColor: "#1a1d21",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                borderLeft: "3px solid #3b82f6",
                padding: "16px 20px",
                marginBottom: "28px",
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "#a0a5ad",
              }}
            >
              <strong style={{ color: "#e8e8e8" }}>{chapter.questions.length} questions</strong> · Need 75% to pass this chapter · You can review the Brand Kit section before starting
            </div>
            <button
              onClick={() => setQuizState("question")}
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                textTransform: "uppercase" as const,
                letterSpacing: "0.04em",
                padding: "14px 36px",
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Start Chapter
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Question ───────────────────────────────────────────────────────────────
  if (quizState === "question" && question) {
    return (
      <div style={{ backgroundColor: "#0f1114" }}>
        <div style={{ padding: "80px 48px" }}>
          <ProgressBar
            current={answeredCount}
            total={totalQuestions}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
            <div className="lg:col-span-2">
              {/* Chapter + question counter */}
              <div className="flex items-center gap-3 mb-6">
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#3b82f6" }}>
                  {chapter.title}
                </span>
                <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "10px" }}>·</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a0a5ad" }}>
                  Question {currentQuestionIndex + 1} of {chapter.questions.length}
                </span>
              </div>

              {/* Question */}
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 1.55,
                  marginBottom: "28px",
                }}
              >
                {question.question}
              </div>

              {/* Options */}
              <div className="flex flex-col gap-3 mb-6">
                {question.options.map((opt, i) => {
                  let bg = "#1a1d21";
                  let borderColor = "rgba(255,255,255,0.06)";
                  let textColor = "#e8e8e8";
                  let leftBorderColor = "rgba(255,255,255,0.06)";

                  if (showExplanation) {
                    if (i === question.correct) {
                      bg = "rgba(34,197,94,0.08)";
                      borderColor = "rgba(34,197,94,0.3)";
                      leftBorderColor = "#22c55e";
                      textColor = "#22c55e";
                    } else if (i === selectedOption && i !== question.correct) {
                      bg = "rgba(239,68,68,0.08)";
                      borderColor = "rgba(239,68,68,0.3)";
                      leftBorderColor = "#ef4444";
                      textColor = "#ef4444";
                    }
                  } else if (i === selectedOption) {
                    bg = "rgba(59,130,246,0.1)";
                    borderColor = "rgba(59,130,246,0.4)";
                    leftBorderColor = "#3b82f6";
                    textColor = "#3b82f6";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => !showExplanation && setSelectedOption(i)}
                      disabled={showExplanation}
                      style={{
                        width: "100%",
                        textAlign: "left" as const,
                        backgroundColor: bg,
                        borderTop: `1px solid ${borderColor}`,
                        borderRight: `1px solid ${borderColor}`,
                        borderBottom: `1px solid ${borderColor}`,
                        borderLeft: `3px solid ${leftBorderColor}`,
                        padding: "14px 18px",
                        cursor: showExplanation ? "default" : "pointer",
                        transition: "all 150ms ease",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      <span style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "14px", color: textColor, minWidth: "20px", marginTop: "1px" }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: textColor, lineHeight: 1.5 }}>
                        {opt}
                      </span>
                      {showExplanation && i === question.correct && (
                        <span style={{ marginLeft: "auto", color: "#22c55e", fontSize: "16px", flexShrink: 0 }}>✓</span>
                      )}
                      {showExplanation && i === selectedOption && i !== question.correct && (
                        <span style={{ marginLeft: "auto", color: "#ef4444", fontSize: "16px", flexShrink: 0 }}>✕</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div
                  style={{
                    backgroundColor: answers[answers.length - 1]?.correct
                      ? "rgba(34,197,94,0.06)"
                      : "rgba(239,68,68,0.06)",
                    borderTop: `1px solid ${answers[answers.length - 1]?.correct ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
                    borderRight: `1px solid ${answers[answers.length - 1]?.correct ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
                    borderBottom: `1px solid ${answers[answers.length - 1]?.correct ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
                    borderLeft: `3px solid ${answers[answers.length - 1]?.correct ? "#22c55e" : "#ef4444"}`,
                    padding: "16px 20px",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: answers[answers.length - 1]?.correct ? "#22c55e" : "#ef4444", marginBottom: "6px" }}>
                    {answers[answers.length - 1]?.correct ? "Correct" : "Incorrect"}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", lineHeight: 1.65 }}>
                    {question.explanation}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3">
                {!showExplanation ? (
                  <button
                    onClick={handleAnswer}
                    disabled={selectedOption === null}
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.04em",
                      padding: "12px 28px",
                      backgroundColor: selectedOption !== null ? "#3b82f6" : "#22262b",
                      color: selectedOption !== null ? "#ffffff" : "#a0a5ad",
                      border: "none",
                      cursor: selectedOption !== null ? "pointer" : "not-allowed",
                      transition: "all 150ms ease",
                    }}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.04em",
                      padding: "12px 28px",
                      backgroundColor: "#3b82f6",
                      color: "#ffffff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {currentQuestionIndex < chapter.questions.length - 1 ? "Next Question →" : "View Chapter Result →"}
                  </button>
                )}
              </div>
            </div>

            {/* Right: chapter progress sidebar */}
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#a0a5ad", marginBottom: "12px" }}>
                Chapter Progress
              </div>
              <div className="flex flex-col gap-2">
                {chapter.questions.map((q, i) => {
                  const ans = answers.find((a) => a.questionId === q.id);
                  return (
                    <div
                      key={q.id}
                      style={{
                        backgroundColor: "#1a1d21",
                        borderTop: "1px solid rgba(255,255,255,0.04)",
                        borderRight: "1px solid rgba(255,255,255,0.04)",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        borderLeft: `3px solid ${ans ? (ans.correct ? "#22c55e" : "#ef4444") : i === currentQuestionIndex ? "#3b82f6" : "rgba(255,255,255,0.06)"}`,
                        padding: "10px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "13px", color: ans ? (ans.correct ? "#22c55e" : "#ef4444") : i === currentQuestionIndex ? "#3b82f6" : "#a0a5ad", minWidth: "20px" }}>
                        {ans ? (ans.correct ? "✓" : "✕") : `Q${i + 1}`}
                      </div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a0a5ad", lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any }}>
                        {q.question.slice(0, 60)}...
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Overall progress */}
              <div style={{ marginTop: "20px", fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#a0a5ad", marginBottom: "8px" }}>
                Overall Progress
              </div>
              <div style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.06)", marginBottom: "6px" }}>
                <div style={{ height: "3px", width: `${(answeredCount / totalQuestions) * 100}%`, backgroundColor: "#3b82f6", transition: "width 300ms ease" }} />
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a0a5ad" }}>
                {answeredCount} of {totalQuestions} questions answered
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Chapter Result ─────────────────────────────────────────────────────────
  if (quizState === "chapter-result") {
    const chScore = chapterScores[chapter.id] ?? chapterScore;
    const passed = chScore >= 75;
    return (
      <div style={{ backgroundColor: "#0f1114" }}>
        <div style={{ padding: "80px 48px" }}>
          <ProgressBar current={currentChapterIndex + 1} total={CHAPTERS.length} color={passed ? "#22c55e" : "#f59e0b"} />
          <div style={{ maxWidth: "600px" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: passed ? "#22c55e" : "#f59e0b", marginBottom: "8px" }}>
              Chapter {currentChapterIndex + 1} Complete — {passed ? "Passed" : "Review Recommended"}
            </div>
            <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "40px", textTransform: "uppercase" as const, letterSpacing: "-0.02em", color: "#ffffff", lineHeight: 1.1, marginBottom: "24px" }}>
              {chapter.title}
            </div>

            {/* Score display */}
            <div
              style={{
                backgroundColor: "#1a1d21",
                borderTop: `3px solid ${passed ? "#22c55e" : "#f59e0b"}`,
                borderRight: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
                padding: "24px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "32px",
              }}
            >
              <div>
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "72px", color: passed ? "#22c55e" : "#f59e0b", lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {chScore}%
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#a0a5ad", marginTop: "4px" }}>
                  {chapterAnswers.filter((a) => a.correct).length} of {chapter.questions.length} correct
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "22px", textTransform: "uppercase" as const, color: passed ? "#22c55e" : "#f59e0b", letterSpacing: "0.02em" }}>
                  {passed ? "Chapter Passed" : "Needs Review"}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", marginTop: "4px", lineHeight: 1.5 }}>
                  {passed ? "You demonstrated solid knowledge of this section." : "Review this section in the Brand Kit before your next project."}
                </div>
              </div>
            </div>

            {/* Per-question review */}
            <div style={{ marginBottom: "24px" }}>
              {chapter.questions.map((q, i) => {
                const ans = chapterAnswers.find((a) => a.questionId === q.id);
                return (
                  <div
                    key={q.id}
                    style={{
                      backgroundColor: "#1a1d21",
                      borderTop: "1px solid rgba(255,255,255,0.04)",
                      borderRight: "1px solid rgba(255,255,255,0.04)",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      borderLeft: `3px solid ${ans?.correct ? "#22c55e" : "#ef4444"}`,
                      padding: "12px 16px",
                      marginBottom: "6px",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "16px", color: ans?.correct ? "#22c55e" : "#ef4444", flexShrink: 0, marginTop: "1px" }}>
                        {ans?.correct ? "✓" : "✕"}
                      </div>
                      <div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#e8e8e8", lineHeight: 1.5, marginBottom: "4px" }}>
                          {q.question}
                        </div>
                        {!ans?.correct && (
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#a0a5ad" }}>
                            <span style={{ color: "#22c55e" }}>Correct: </span>{q.options[q.correct]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleNextChapter}
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                textTransform: "uppercase" as const,
                letterSpacing: "0.04em",
                padding: "14px 36px",
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
              }}
            >
              {currentChapterIndex < CHAPTERS.length - 1 ? `Next: ${CHAPTERS[currentChapterIndex + 1].title} →` : "View Final Results →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Final / Certification ──────────────────────────────────────────────────
  if (quizState === "final") {
    const correctTotal = answers.filter((a) => a.correct).length;
    const g = getGrade(totalScore);
    const isCertified = totalScore >= 75;

    return (
      <div style={{ backgroundColor: "#0f1114" }}>
        <div style={{ padding: "80px 48px" }}>
          {/* Certificate */}
          <div
            style={{
              maxWidth: "760px",
              backgroundColor: "#1a1d21",
              borderTop: `4px solid ${g.color}`,
              borderRight: "1px solid rgba(255,255,255,0.08)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              padding: "48px",
              marginBottom: "32px",
              position: "relative" as const,
            }}
          >
            {/* Header logos */}
            <div className="flex items-center justify-between mb-8">
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "13px", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#a0a5ad" }}>
                WSC & Tier 1 Performance
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a0a5ad" }}>
                {completedAt}
              </div>
            </div>

            {/* Grade */}
            <div style={{ textAlign: "center" as const, marginBottom: "32px" }}>
              <div
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "11px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.2em",
                  color: "#a0a5ad",
                  marginBottom: "12px",
                }}
              >
                This certifies that
              </div>
              <div
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "36px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                  marginBottom: "12px",
                }}
              >
                {userName || "Team Member"}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "#a0a5ad",
                  marginBottom: "24px",
                }}
              >
                has completed the WSC & Tier 1 Performance Brand Onboarding Quiz
              </div>

              {/* Big score */}
              <div
                style={{
                  display: "inline-flex",
                  flexDirection: "column" as const,
                  alignItems: "center",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderTop: `1px solid rgba(255,255,255,0.06)`,
                  borderRight: `1px solid rgba(255,255,255,0.06)`,
                  borderBottom: `1px solid rgba(255,255,255,0.06)`,
                  borderLeft: `1px solid rgba(255,255,255,0.06)`,
                  padding: "24px 48px",
                  marginBottom: "24px",
                }}
              >
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "80px", color: g.color, lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {totalScore}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#a0a5ad", marginTop: "4px" }}>
                  {correctTotal} of {totalQuestions} correct
                </div>
              </div>

              <div
                style={{
                  display: "inline-block",
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.06em",
                  color: g.color,
                  backgroundColor: `${g.color}15`,
                  padding: "8px 24px",
                  marginBottom: "12px",
                }}
              >
                {g.label}
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad" }}>
                {g.description}
              </div>
            </div>

            {/* Chapter breakdown */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#a0a5ad", marginBottom: "12px" }}>
                Chapter Results
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CHAPTERS.map((ch) => {
                  const chAnswers = answers.filter((a) => ch.questions.some((q) => q.id === a.questionId));
                  const score = chAnswers.length > 0
                    ? Math.round((chAnswers.filter((a) => a.correct).length / ch.questions.length) * 100)
                    : 0;
                  const passed = score >= 75;
                  return (
                    <div
                      key={ch.id}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.03)",
                        borderTop: "1px solid rgba(255,255,255,0.04)",
                        borderRight: "1px solid rgba(255,255,255,0.04)",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        borderLeft: `3px solid ${passed ? "#22c55e" : "#ef4444"}`,
                        padding: "10px 14px",
                      }}
                    >
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: "#e8e8e8", marginBottom: "2px" }}>{ch.title}</div>
                      <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "18px", color: passed ? "#22c55e" : "#ef4444" }}>{score}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap max-w-760px">
            <button
              onClick={handleCopyCertificate}
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                textTransform: "uppercase" as const,
                letterSpacing: "0.04em",
                padding: "12px 24px",
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Copy Certificate Details
            </button>
            <button
              onClick={handleRestart}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                padding: "12px 24px",
                backgroundColor: "transparent",
                color: "#a0a5ad",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                borderRight: "1px solid rgba(255,255,255,0.1)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                borderLeft: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
              }}
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
