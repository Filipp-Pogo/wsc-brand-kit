// WSC & Tier 1 Performance — Brand Data
// Source: WSC_Tier1_Brand_Voice_Guidelines.docx (March 2026)

export const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663356767696/ZPsMJTEeF9cNbnWWtGpFHU";

export const LOGOS = {
  wsc: {
    fullBlackWhite: `${CDN}/WSC-logo-Black-Full-White_1d0a7846.png`,
    fullBlackTransparent: `${CDN}/WSC-logo-Black-Full-Transparent_66bf1427.png`,
    fullWhiteTransparent: `${CDN}/WSC-logo-White-Full-Transparent_28ab6d43.png`,
    fullWhiteBlack: `${CDN}/WSC-logo-White-Full-BlackBG_2d60c25a.png`,
    shortBlackWhite: `${CDN}/WSC-Logo-Short-Black-White_818a8833.png`,
    shortBlackTransparent: `${CDN}/WSC-Logo-Short-Black-Transparent_9eab88e5.png`,
    shortWhiteTransparent: `${CDN}/WSC-logo-Short-White-Transparent_8ec97b84.png`,
    shortWhiteBlack: `${CDN}/WSC-logo-Short-White-Black_abedcde2.png`,
  },
  tier1: {
    black: `${CDN}/tier1_logo_black_c0aed48e.webp`,
    white: `${CDN}/tier1_logo_white_e523441d.webp`,
    blue: `${CDN}/tier1_logo_white_e523441d.webp`, // white on blue bg
  },
  tier1Golf: {
    white: `${CDN}/tier1_GOLF_logo_White_transparent_1abb07d2.jpg`,
    black: `${CDN}/tier1_GOLF_logo_Black_transparent_45efe455.jpg`,
  },
};

export const TIER1_COLORS = [
  {
    token: "Background (Primary)",
    hex: "#1a1d21",
    usage: "Near-black charcoal. Dominant backdrop. Projects intensity and focus.",
    category: "tier1",
    textColor: "#e8e8e8",
  },
  {
    token: "Card / Surface Layer",
    hex: "#22262b",
    usage: "Slightly lighter. Cards, content blocks, raised surfaces.",
    category: "tier1",
    textColor: "#e8e8e8",
  },
  {
    token: "Secondary / Muted Surface",
    hex: "#2a2e34",
    usage: "Inputs, inactive states, tertiary backgrounds.",
    category: "tier1",
    textColor: "#e8e8e8",
  },
  {
    token: "Foreground / Primary Text",
    hex: "#e8e8e8",
    usage: "Off-white. All body text. Maximum contrast against dark base.",
    category: "tier1",
    textColor: "#1a1d21",
  },
  {
    token: "Muted Text",
    hex: "#a0a5ad",
    usage: "Secondary labels, captions, and supporting copy.",
    category: "tier1",
    textColor: "#1a1d21",
  },
  {
    token: "Blue Accent (Primary)",
    hex: "#3b82f6",
    usage: "Primary interactive color. CTAs, active indicators, links, key highlights.",
    category: "shared",
    textColor: "#ffffff",
  },
  {
    token: "Deep Navy Accent",
    hex: "#172554",
    usage: "Accent background used behind blue-text elements.",
    category: "tier1",
    textColor: "#e8e8e8",
  },
  {
    token: "Red Accent",
    hex: "#ef4444",
    usage: "Alerts, critical indicators, urgency markers. Tryouts, deadlines, closures. Never decorative.",
    category: "tier1",
    textColor: "#ffffff",
  },
  {
    token: "Amber Accent (Operational)",
    hex: "#f59e0b",
    usage: "Operational alerts only — schedule changes, facility updates, weather delays. Distinct from blue (positive/announcement) and red (urgent/critical). Never decorative.",
    category: "tier1",
    textColor: "#1a1d21",
  },
  {
    token: "Subtle Border",
    hex: "#ffffff14",
    usage: "8% opacity white border. Refined separation, not decorative.",
    category: "tier1",
    textColor: "#e8e8e8",
    displayHex: "rgba(255,255,255,0.08)",
  },
];

export const WSC_COLORS = [
  {
    token: "Dark Base",
    hex: "#0a0704",
    usage: "Very warm near-black. Primary nav and hero backgrounds. Feels natural, not industrial.",
    category: "wsc",
    textColor: "#e8e0d3",
  },
  {
    token: "Dark Mid",
    hex: "#110c09",
    usage: "Warm secondary dark. Banners, accent panels.",
    category: "wsc",
    textColor: "#e8e0d3",
  },
  {
    token: "Navy",
    hex: "#0d1b2a",
    usage: "Premium register only. Reserved for tagline anchors, brand statements, and elevated moments — used ~once or twice a month. Equivalent to Tier 1’s manifesto register.",
    category: "wsc",
    textColor: "#e8e0d3",
  },
  {
    token: "Warm Dark",
    hex: "#161310",
    usage: "Subtle warm dark for badges and inline highlights.",
    category: "wsc",
    textColor: "#e8e0d3",
  },
  {
    token: "Parchment Mid",
    hex: "#ded6c9",
    usage: "Content-heavy section backgrounds. Warm, natural, readable.",
    category: "wsc",
    textColor: "#0e0a07",
  },
  {
    token: "Parchment",
    hex: "#e8e0d3",
    usage: "Everyday community surface. Used for narrative posts, brand voice anchors, week recaps, and event posts. The ‘warm baseline’ of the WSC feed.",
    category: "wsc",
    textColor: "#0e0a07",
  },
  {
    token: "Cream",
    hex: "#faf9f5",
    usage: "Premium / structured surface. Used for member spotlights, program announcements, membership tier posts, and recurring schedules. Signals a more structured or higher-stakes post than everyday content.",
    category: "wsc",
    textColor: "#0e0a07",
  },
  {
    token: "Primary Text",
    hex: "#0e0a07",
    usage: "Body text. Warm near-black (not pure black). Softer, more natural on screen.",
    category: "wsc",
    textColor: "#e8e0d3",
  },
  {
    token: "Secondary Text",
    hex: "#4b4038",
    usage: "Warm brown. Secondary body copy, supporting information.",
    category: "wsc",
    textColor: "#e8e0d3",
  },
  {
    token: "Muted Text",
    hex: "#84786f",
    usage: "Captions, labels, metadata.",
    category: "wsc",
    textColor: "#0e0a07",
  },
  {
    token: "Accent / Link Blue",
    hex: "#4cabfd",
    usage: "Interactive elements, hyperlinks, and CTAs. Lighter blue variant consistent with Tier 1 accent family. Also used for decorative edges and accent text.",
    category: "wsc",
    textColor: "#0e0a07",
  },
  {
    token: "Deep Blue",
    hex: "#1e6fb8",
    usage: "Handwritten Caveat accent color. Primary accent for deep blue text moments, pretitle lines, and deep-blue checkmarks. Always paired with Caveat or Inter 500+.",
    category: "wsc",
    textColor: "#ffffff",
  },
  {
    token: "Soft Blue",
    hex: "#b8dcf9",
    usage: "Italic emphasis highlight blocks only. Placed behind the one italic moment per post. Never used as a background for full sections or as a decorative accent.",
    category: "wsc",
    textColor: "#0d1b2a",
  },
  {
    token: "Lighter Blue",
    hex: "#d6e9f7",
    usage: "Softer variant of soft blue. Used for borders, secondary highlight blocks, and Caveat example pill borders.",
    category: "wsc",
    textColor: "#0d1b2a",
  },
  {
    token: "Sage",
    hex: "#8fa687",
    usage: "Calendar category marker only. Used as W-08 event-type dots and T-06 color stripe. NEVER used as a decorative accent outside calendar contexts.",
    category: "wsc",
    textColor: "#0e0a07",
  },
  {
    token: "Sun",
    hex: "#f0b85a",
    usage: "Calendar category marker only. Used as W-08 event-type dots and T-06 color stripe. NEVER used as a decorative accent outside calendar contexts.",
    category: "wsc",
    textColor: "#0e0a07",
  },
];

export const BRAND_ARCHITECTURE = [
  {
    brand: "Tier 1 Performance",
    role: "Performance Brand",
    description: "The performance brand for all programming — tennis, golf, and athletic development. Appears on marketing materials, social content, athlete communications, tournament presence, coaching apparel, and any public-facing performance context.",
    tagline: "Train Without Limits.",
    color: "#1a1d21",
    textColor: "#e8e8e8",
    accentColor: "#3b82f6",
    restricted: false,
  },
  {
    brand: "Woodinville Sports Club (WSC)",
    role: "Platform & Facility",
    description: "The physical home — the 67-acre campus where everything happens. Entry point for community members, recreational athletes, and families. WSC does not carry performance programming identity; Tier 1 does.",
    tagline: "Elevate Your Game. Enrich Your Life.",
    color: "#e8e0d3",
    textColor: "#0e0a07",
    accentColor: "#4cabfd",
    restricted: false,
  },
  {
    brand: "Athletic Performance Lab (APL)",
    role: "Performance Sub-Brand",
    description: "Performance sub-brand operating under Tier 1 within WSC. Data-driven S&C, sport-specific training. The only dedicated high-performance youth training facility of its kind in the PNW. Presents under Tier 1's performance identity.",
    tagline: "Two Divisions / One System",
    color: "#0d1b2a",
    textColor: "#e8e8e8",
    accentColor: "#3b82f6",
    restricted: false,
  },
  {
    brand: "Athlete Services (Experience Layer)",
    role: "Human Interface",
    description: "The human interface of the club. Operates within WSC but upholds Tier 1 standards in every interaction. Proactive, mobile, relationship-driven. The bridge between the platform and the daily lived experience.",
    tagline: "The Standard of the Environment",
    color: "#22262b",
    textColor: "#e8e8e8",
    accentColor: "#3b82f6",
    restricted: false,
  },

];

export const CORE_VALUES = [
  {
    value: "Excellence",
    description: "We hire top talent and never compromise standards. Excellence is not an exception here — it is the expectation. Our coaches, our training environments, and our brand communications all hold the same bar.",
  },
  {
    value: "Care",
    description: "Every athlete, every relationship, every family matters. We place value on doing what is right — not what is easy. Care over profits. Relationships over revenue.",
  },
  {
    value: "Belonging",
    description: "Athletes and families stay not because of facilities, but because they are part of something. The culture is the product. Belonging fuels pride, commitment, and word of mouth — our most powerful growth driver.",
  },
  {
    value: "Authenticity",
    description: "No outsourced narratives. No generic PR. We tell our own stories from inside the culture. Our marketing must be embedded in the program — attending practices, speaking with families, capturing real moments.",
  },
  {
    value: "Innovation",
    description: "Data-driven, forward-thinking, constantly redefining what athlete development looks like. From the APL's (Athletic Performance Lab) performance analytics and Uneekor launch monitor technology (a precision ball-tracking system used for golf and tennis swing analysis) to internal systems that track brand consistency, we build development infrastructure others haven't imagined yet.",
  },
  {
    value: "Long-Term Over Short-Term",
    description: "We reject shortcuts that undermine sustainable success. Every decision — in training, in business, and in brand communication — is made with long-term growth in mind. No gimmicks. No discount culture.",
  },
  {
    value: "Truth",
    description: "Direct, honest feedback. Internal transparency. Real accountability. We lead with honesty and clarity because real development requires real accountability — on the court and in every conversation.",
  },
];

export const WE_ARE_WE_ARE_NOT = [
  { weAre: "Authentic storytellers — we reveal the grind, setbacks, and real process", weAreNot: "Polished advertisers producing stock-photo content disconnected from real training" },
  { weAre: "Aspirational yet warm — elite standards met with genuine human care", weAreNot: "Arrogant or exclusionary — prestige without belonging or community" },
  { weAre: "Player-first and long-term — every decision serves athlete development", weAreNot: "Transactional — chasing short-term revenue, discounts, or quick wins" },
  { weAre: "A culture, not a service — families join because they want to belong", weAreNot: "A gym or club you pay to use and then leave without identity" },
  { weAre: "Direct and honest — real feedback, real accountability, real dialogue", weAreNot: "Vague or corporate — empty motivational filler or generic mission statements" },
  { weAre: "Performance-minded at every level — even recreational content has purpose", weAreNot: "Casual or low-energy — stock smiles, passive imagery, no sense of direction" },
  { weAre: "Community-driven — word of mouth and belonging are our growth engine", weAreNot: "Discount or promotion-driven — ads that reduce our story to a transaction" },
  { weAre: "Inclusive through exclusivity — hard to earn entry, family once you're in", weAreNot: "Gatekeeping without warmth, or open access without standards or identity" },
  { weAre: "Proactive and relationship-driven in every interaction", weAreNot: "Reactive, stationary, and waiting for problems to arise" },
  { weAre: "Specific and operational — we speak in facts, names, and clear direction", weAreNot: "Generic and ambient — wallpaper copy that no one reads or remembers" },
];

export const VOICE_CONSTANTS = [
  {
    trait: "Story-Led",
    brand: "Both Brands",
    description: "Every piece of content is part of a bigger narrative. Not 'we have a class open' — but 'here is what happened in training today, and why it matters.' We tie moments to meaning.",
    examples: [
      { type: "dont", text: "Tennis class open this Saturday." },
      { type: "do", text: "Coach Martinez ran a 90-minute serve clinic this morning. Three athletes hit personal bests. Here's what changed." },
    ],
  },
  {
    trait: "Process Over Perfection",
    brand: "Both Brands",
    description: "We show the grind — the early morning reps, the missed shots, the coach corrections, the breakthrough after the setback. Polished victories alone are not our story.",
    examples: [
      { type: "dont", text: "Congratulations to our tournament champions!" },
      { type: "do", text: "Six weeks of early mornings. 400+ serves in the last week alone. Today it showed." },
    ],
  },
  {
    trait: "Human First",
    brand: "Both Brands",
    description: "Coaches are mentors, not instructors. Athletes are whole people, not performance metrics. Families are partners, not customers. Always write about people with their name, their journey, their why.",
    examples: [
      { type: "dont", text: "Our athlete won the regional tournament." },
      { type: "do", text: "Marcus has been working on his second serve for three months. Yesterday, it won him the match." },
      { type: "dont", text: "WSC: Join us for a fun family tennis day this weekend!" },
      { type: "do", text: "WSC: The Johnson family has been on Court 6 every Saturday morning for two years. That's what belonging looks like." },
    ],
  },
  {
    trait: "Confident Without Arrogance",
    brand: "Both Brands",
    description: "We speak with conviction about what we do and what we stand for. We do not qualify or hedge our identity. But we never punch down — our confidence comes from our culture, not comparison.",
    examples: [
      { type: "dont", text: "We think we might be one of the better programs in the area." },
      { type: "do", text: "Our alumni destinations speak for themselves." },
    ],
  },
  {
    trait: "Earned, Not Claimed",
    brand: "Both Brands",
    description: "We do not say 'we are the best.' We show it through athlete stories, outcomes, coach credentials, and community impact. Evidence feels credible. Our alumni destinations are the proof.",
    examples: [
      { type: "dont", text: "We're the best tennis program in the Pacific Northwest." },
      { type: "do", text: "Penn. Harvard. Stanford. USC. Princeton. Miami. Auburn. Boston College. Built here." },
    ],
  },
  {
    trait: "Specific Over Generic",
    brand: "Both Brands",
    description: "'Morning Andrew. Warm up is on Courts 3 and 4 today' is the model. Personal, operational, and purposeful. Never vague. Always grounded in something real.",
    examples: [
      { type: "dont", text: "Great training today everyone!" },
      { type: "do", text: "Courts 1–3 ran full-match simulation today. Intensity was high. See you at 7am tomorrow." },
    ],
  },
];

export const TONE_MATRIX = [
  { context: "Social Media (Reels/posts)", brand: "Tier 1", toneWords: ["Raw", "Urgent", "Inspiring"], sample: "Six weeks of early mornings. 400+ serves. Today it showed." },
  { context: "Athlete Spotlights & Captions", brand: "Both", toneWords: ["Warm", "Personal", "Celebratory"], sample: "Marcus has been working on his second serve for three months. Yesterday, it won him the match." },
  { context: "Email to Families", brand: "WSC", toneWords: ["Personal", "Direct", "Trusted"], sample: "One story. One action. Families should feel they're hearing from someone who knows them." },
  { context: "Website Copy (WSC)", brand: "WSC", toneWords: ["Welcoming", "Comprehensive", "Family-oriented"], sample: "Your Saturday at WSC starts with a 7am junior clinic and ends with the whole family on the courts." },
  { context: "Website Copy (Tier 1)", brand: "Tier 1", toneWords: ["Aspirational", "Intense", "Transformation-focused"], sample: "We don't build recreational players. We build competitors." },
  { context: "Sponsor / Partner Outreach", brand: "Both", toneWords: ["Data-forward", "Vision-anchored", "Professional"], sample: "Our athlete development pipeline has placed alumni at Penn, Harvard, Stanford, and USC." },

  { context: "Athlete / Coach Communications", brand: "Tier 1", toneWords: ["Direct", "Honest", "Coach-like"], sample: "Morning Andrew. Warm up is on Courts 3 and 4 today." },
  { context: "S&C / APL-Specific Marketing (Strength & Conditioning / Athletic Performance Lab)", brand: "Tier 1", toneWords: ["Credential-heavy", "Performance-specific", "Differentiated"], sample: "The only dedicated high-performance youth training facility of its kind in the PNW." },
  { context: "Member / Family Communications", brand: "WSC", toneWords: ["Personal", "Warm", "Name-based", "Proactive"], sample: "Hi Sarah — just a reminder that your family's court reservation is at 10am Saturday on Court 4. See you then!" },
  { context: "Physical Signage (Wayfinding)", brand: "WSC", toneWords: ["Specific", "Directional", "Purposeful"], sample: "Courts 1–6 → | APL Performance Lab ↑ | Family Lounge ←" },
  { context: "Physical Signage (Inspirational)", brand: "Tier 1", toneWords: ["Process-focused", "Culture-affirming", "Non-cliché"], sample: "The standard of the environment dictates the standard of the athlete." },
  { context: "Athlete Services Interactions", brand: "WSC", toneWords: ["Personal", "Proactive", "Name-based"], sample: "Good morning, Sarah — your court is ready on 4. Coach is already there." },
];

export const MESSAGING_PILLARS = [
  {
    pillar: "Performance Brand on a Platform",
    brand: "Both Brands",
    description: "Tier 1 is the performance brand. WSC is the platform it lives on. Use this framework in all brand introductions — it explains the relationship clearly.",
    proofPoint: "Tier 1 is what you feel. WSC is where you feel it.",
    sampleMessages: [
      "Tier 1 Performance operates within WSC — the 67-acre campus that makes it possible.",
      "The performance programming is Tier 1. The home is WSC.",
      "Two brands. One campus. One standard.",
      "WSC is the platform. Tier 1 is the product.",
    ],
  },
  {
    pillar: "The Paradox",
    brand: "Both Brands",
    description: "Not everyone trains here. But everyone here belongs. Excellence is earned. Family is given. The inclusivity-through-exclusivity paradox is our most differentiated positioning.",
    proofPoint: "Aspirational entry + magnetic belonging once inside.",
    sampleMessages: [
      "We don't build recreational players. We build competitors.",
      "Hard to earn. Impossible to leave.",
      "The standard is high. The welcome is real.",
      "Elite development. Genuine belonging.",
    ],
  },
  {
    pillar: "The Three Story Threads",
    brand: "Both Brands",
    description: "Every content series maps to one of three threads: The Why (building champions), The Who (coaches, athletes, families), The Process (what high performance actually looks like).",
    proofPoint: "The majority of posts should emphasize The Who and The Why. The Process provides credibility.",
    sampleMessages: [
      "The Why: Why does this matter to this athlete and family?",
      "The Who: Who is this coach, this athlete, this family?",
      "The Process: What does training actually look like here?",
      "Tie every post to at least one thread.",
    ],
  },

  {
    pillar: "PNW Anchor, National Ambition",
    brand: "Both Brands",
    description: "We are rooted in Woodinville, building toward national recognition. Local pride and national aspiration are not in tension. They reinforce each other.",
    proofPoint: "Hold both simultaneously — local pride and national aspiration.",
    sampleMessages: [
      "Built in Woodinville. Recognized nationally.",
      "The PNW's first high-performance youth development facility of its kind.",
      "Local roots. National reach.",
      "Woodinville is where champions are made.",
    ],
  },
  {
    pillar: "The Standard of the Environment",
    brand: "WSC / Athlete Services",
    description: "The standard of the environment dictates the standard of the athlete. The environment is a brand signal before any person speaks.",
    proofPoint: "Use for Athlete Services, facility, and physical brand communications.",
    sampleMessages: [
      "The environment is the first message.",
      "Every surface, every sign, every interaction sets the standard.",
      "The standard of the environment dictates the standard of the athlete.",
      "Proactive. Mobile. Name-based. That is Athlete Services.",
    ],
  },
];

export const TAGLINES = [
  {
    brand: "Tier 1 Performance",
    lines: [
      { text: "Train Without Limits", usage: "Primary performance tagline. Use in hero copy, program introductions, academy communications, and court-specific copy." },
      { text: "We Don't Build Recreational Players. We Build Competitors.", usage: "Core positioning statement. The clearest We Are / We Are Not line in the brand." },
      { text: "Two Divisions / One System", usage: "Program architecture framing for Tennis + Golf. Use in program descriptions, academy introductions, and enrollment materials." },
    ],
  },
  {
    brand: "Woodinville Sports Club",
    lines: [
      { text: "Elevate Your Game. Enrich Your Life.", usage: "Primary tagline. The dual value proposition: performance + lifestyle. Always use the pair together." },
      { text: "Train Without Limits", usage: "Secondary tagline. Performance-adjacent; appropriate for facility and court-specific copy." },

    ],
  },
];

export const VOCABULARY = [
  {
    category: "People & Athletes",
    type: "use",
    words: ["Athlete", "Player development", "Academy", "Family", "Athlete Services Host", "The Tier 1 pathway", "Experience Layer", "Tier 1 at WSC"],
  },
  {
    category: "Facility & Culture",
    type: "use",
    words: ["Cultural home", "Physical home", "Performance", "Two Divisions / One System", "Full-Time [Sport]", "The standard", "The environment"],
  },
  {
    category: "Generic Filler",
    type: "avoid",
    words: ["World-class", "State-of-the-art", "Amazing", "Incredible", "Awesome", "Just", "Passive voice", "Discount", "Deal", "Sale", "Promo"],
  },
  {
    category: "Wrong Context",
    type: "avoid",
    words: ["Student (formal)", "Kid (formal)", "Coaching (formal brand copy)", "Fitness (Tier 1 context)", "Members (internal culture)", "Front desk staff", "Two separate programs", "Recreational (Tier 1 context)"],
  },
];

export const SIGNAGE_CONCEPTS = [
  {
    name: "Dark Performance",
    brand: "Tier 1",
    description: "Primary exterior and lobby signage. The default branded sign. Performance-forward, premium, serious.",
    bgColor: "#1a1d21",
    textColor: "#ffffff",
    accentColor: "#3b82f6",
    fontSize: "clamp(24px, 4vw, 40px)",
    textAlign: "left",
    mockupText: "TRAIN WITHOUT\nLIMITS",
    mockupSubtext: "TIER 1 PERFORMANCE",
    specs: ["Oswald 700 Uppercase", "Monument / Facade", "Lobby Feature Wall"],
  },
  {
    name: "Parchment Welcome",
    brand: "WSC",
    description: "Family-facing areas and warm welcome zones. Welcoming, club-like, inclusive. Puts families at ease.",
    bgColor: "#e8e0d3",
    textColor: "#0d1b2a",
    accentColor: "#0d1b2a",
    fontSize: "clamp(22px, 3.5vw, 36px)",
    textAlign: "left",
    mockupText: "Elevate Your Game.\nEnrich Your Life.",
    mockupSubtext: "WOODINVILLE SPORTS CLUB",
    specs: ["Inter 600", "Family Lounge", "Welcome Desk"],
  },
  {
    name: "Navy Premium",
    brand: "Both",
    description: "Unified dual-brand signage for premium/formal contexts. Elevated, polished, institutional in the best sense.",
    bgColor: "#0d1b2a",
    textColor: "#ffffff",
    accentColor: "#3b82f6",
    fontSize: "clamp(20px, 3vw, 32px)",
    textAlign: "center",
    mockupText: "TIER 1 PERFORMANCE\nat Woodinville Sports Club",
    mockupSubtext: "A CALIBER SPORTS FACILITY",
    specs: ["Oswald 500 + Inter 500", "Sponsor Walls", "Partnership Signage"],
  },
  {
    name: "Full Black — Maximum Contrast",
    brand: "Tier 1",
    description: "Bold cultural statement pieces in active training environments. Intense, uncompromising, competitive.",
    bgColor: "#000000",
    textColor: "#ffffff",
    accentColor: "#3b82f6",
    fontSize: "clamp(28px, 5vw, 52px)",
    textAlign: "left",
    mockupText: "DISCIPLINE.\nEXCELLENCE.\nACCOUNTABILITY.",
    mockupSubtext: null,
    specs: ["Oswald 700 Large-Scale", "Court-Facing Walls", "APL Interior", "Weight Room"],
  },
  {
    name: "Blue Field",
    brand: "Both",
    description: "High-energy promotional and event signage. Electric, energetic, launch-ready.",
    bgColor: "#3b82f6",
    textColor: "#ffffff",
    accentColor: "#ffffff",
    fontSize: "clamp(22px, 3.5vw, 38px)",
    textAlign: "center",
    mockupText: "PROGRAM LAUNCH\nFALL 2026",
    mockupSubtext: "TIER 1 PERFORMANCE AT WSC",
    specs: ["Oswald 700", "Tournament Banners", "Event Signage", "Social Backdrops"],
  },
  {
    name: "Courtside Culture",
    brand: "Tier 1",
    description: "Quote-forward cultural signage in and around training areas. Thoughtful, aspirational, culture-building.",
    bgColor: "#1a1812",
    textColor: "#e8e8e8",
    accentColor: "#3b82f6",
    fontSize: "clamp(18px, 2.5vw, 28px)",
    textAlign: "left",
    mockupText: "The standard of the environment\ndictates the standard of the athlete.",
    mockupSubtext: "TIER 1 PERFORMANCE",
    specs: ["Oswald 300 Large-Scale", "Court-Facing Walls", "Corridor Feature Panels"],
  },
  {
    name: "Wayfinding Panel",
    brand: "WSC",
    description: "Functional directional signage throughout the campus. Clear, confident, branded but invisible.",
    bgColor: "#0d1b2a",
    textColor: "#ffffff",
    accentColor: "#3b82f6",
    fontSize: "clamp(14px, 2vw, 20px)",
    textAlign: "left",
    mockupText: "Courts 1–6  →\nAPL Performance Lab  ↑\nFamily Lounge  ←",
    mockupSubtext: null,
    specs: ["Inter 600", "Hallway Junctions", "Entrance Directories", "Parking Directionals"],
  },
  {
    name: "Built Here — Athlete Recognition",
    brand: "Tier 1",
    description: "Achievement and proof walls celebrating named athletes and their journeys. Proof over promises.",
    bgColor: "#1a1d21",
    textColor: "#ffffff",
    accentColor: "#3b82f6",
    fontSize: "clamp(20px, 3vw, 32px)",
    textAlign: "center",
    mockupText: "BUILT HERE",
    mockupSubtext: "PENN · HARVARD · STANFORD · USC · PRINCETON",
    specs: ["Oswald 600 Headline", "Lobby Commitment Wall", "Full-Time Academy House"],
  },
];

export const CHANNEL_GUIDELINES = [
  {
    channel: "Instagram / TikTok",
    brand: "Tier 1",
    frequency: "Daily",
    purpose: "Primary performance brand visibility. Show the grind, the process, the people.",
    dos: [
      "Short captions — motivational but specific, never generic",
      "Action over polish — candid, raw, high-energy training clips",
      "Vertical-first video with captions enabled",
      "Tie every post to a story thread (The Why, The Who, The Process)",
    ],
    donts: [
      "Generic 'grind' posts without context or a specific story",
      "Promotional spam — no class sale posts without a story attached",
      "Studio shots or stock imagery disconnected from real training",
      "Posting wins without showing the work that earned them",
    ],
    samplePost: "Six weeks of early mornings. 400+ serves in the last week alone. Today it showed. #Tier1Performance",
  },
  {
    channel: "Email — Family Communications",
    brand: "WSC",
    frequency: "Weekly",
    purpose: "Personal, trusted voice speaking to a trusted community. One story per email.",
    dos: [
      "Personal tone — not a newsletter blast; a trusted voice",
      "One story per email. One call to action. Clarity over volume",
      "Families should feel they are hearing from someone who knows them",
      "Use names when possible — personalization is the standard",
    ],
    donts: [
      "Generic subject lines — no 'check out our latest classes'",
      "Multiple CTAs in one email — pick one",
      "Corporate marketing language — this is a community, not a customer list",
      "Promotional discounts or sale language in narrative contexts",
    ],
    samplePost: "Subject: Marcus hit a milestone this week — and it started three months ago.",
  },
  {
    channel: "Website — Tier 1 Performance",
    brand: "Tier 1",
    frequency: "Ongoing",
    purpose: "Primary marketing surface for all programming. Attracts serious athletes and families committed to elite development.",
    dos: [
      "Lead with the competitive claim — attract serious athletes",
      "Use real proof: Penn, Harvard, Stanford, USC, Princeton, Miami, Auburn, Boston College",
      "Two-program framing: 'Two Divisions / One System'",
      "Intense, aspirational, transformation-focused tone throughout",
    ],
    donts: [
      "Soften the message or apologize for high standards",
      "Use WSC's warm parchment palette or light typography",
      "Describe Tier 1 as 'a program at WSC' — it is THE performance brand",
    ],
    samplePost: "WE DON'T BUILD RECREATIONAL PLAYERS. WE BUILD COMPETITORS.",
  },
  {
    channel: "Website — WSC",
    brand: "WSC",
    frequency: "Ongoing",
    purpose: "Entry point for recreational members, families, and the broader Woodinville community.",
    dos: [
      "Welcoming, comprehensive, family-oriented tone",
      "Use the 'Your Saturday at WSC' narrative format",
      "Highlight member voice: testimonials and community stories",
      "Reference Tier 1 as the performance programming available at the facility",
    ],
    donts: [
      "Use Tier 1's dark charcoal palette or Oswald font",
      "Position WSC as a performance brand — that is Tier 1's role",
      "Describe the facility without connecting it to the human culture inside",
    ],
    samplePost: "Your Saturday at WSC starts with a 7am junior clinic and ends with the whole family on the courts.",
  },
  {
    channel: "Physical Signage",
    brand: "Both",
    frequency: "Permanent",
    purpose: "The environment is a brand signal before any person speaks. Every sign reinforces the brand hierarchy.",
    dos: [
      "Match signage concept to space type (performance vs. community)",
      "Use Tier 1 concepts in training and performance spaces",
      "Use WSC concepts in family, community, and administrative spaces",
      "Wayfinding must be specific — never generic",
    ],
    donts: [
      "Mix Tier 1 and WSC visual identities on a single sign",
      "Use generic inspirational quotes that could appear at any sports club",
      "Post promotional or sales content in or near active training environments",
      "Use rounded corners on any signage element",
    ],
    samplePost: null,
  },
  {
    channel: "Athlete Services Interactions",
    brand: "WSC",
    frequency: "Daily",
    purpose: "The human interface of the club. Proactive, mobile, name-based operational warmth.",
    dos: [
      "Use names — always. 'Good morning, Sarah' not 'Good morning'",
      "Be proactive — anticipate needs before they are expressed",
      "Stay mobile — Athlete Services is not a desk job",
      "Resolve logistical questions so coaches never have to",
    ],
    donts: [
      "Wait for problems to arise — be proactive, not reactive",
      "Use corporate or formal language in daily interactions",
      "Interrupt coaches with questions that Athlete Services should handle",
      "Treat interactions as transactional — every interaction is a relationship moment",
    ],
    samplePost: "Good morning, Sarah — your court is ready on 4. Coach is already there.",
  },
];

export const TERMINOLOGY = [
  {
    category: "People & Roles",
    terms: [
      { term: "Athlete", avoid: "Student / Kid / Player (formal)", definition: "Use in all formal brand communications" },
      { term: "Athlete Services Host", avoid: "Front desk staff", definition: "The human interface of the club" },
      { term: "Family", avoid: "Members (internal culture)", definition: "Families join — they don't subscribe" },
      { term: "Coach / Mentor", avoid: "Instructor", definition: "Coaches are mentors, not instructors" },
    ],
  },
  {
    category: "Programs & Structure",
    terms: [
      { term: "Academy", avoid: "Program (for Tier 1)", definition: "Tier 1 runs academies, not programs. An academy implies a structured, long-term development system — not a class you sign up for." },
      { term: "Two Divisions / One System", avoid: "Two separate programs", definition: "Tennis + Golf — two sports, one shared performance methodology. Both divisions train in the APL, follow the same development philosophy, and operate under the Tier 1 identity. Use when describing program architecture." },
      { term: "Full-Time Tennis", avoid: "Elite program / Advanced program / Tennis program", definition: "The full-time tennis academy track within Tier 1 Performance. High-volume training, competition preparation, college placement pathway. Athletes train 4–6 days/week with structured periodization." },
      { term: "Full-Time Golf", avoid: "Elite program / Advanced program / Golf program", definition: "The full-time golf academy track within Tier 1 Performance. Mirrors the tennis structure — performance-first, competition-focused, college placement pathway. Uses Uneekor launch monitor technology for data-driven development." },
      { term: "The Tier 1 pathway", avoid: "Our programs", definition: "The full development arc from entry-level academy to college placement. A pathway implies progression and a destination — not just participation." },
      { term: "APL (Athletic Performance Lab)", avoid: "Gym / Weight room / Fitness center / S&C room", definition: "The dedicated Strength & Conditioning (S&C) facility operating under Tier 1 within WSC. Uses data-driven training, sport-specific programming, and performance analytics technology. The only dedicated high-performance youth training facility of its kind in the Pacific Northwest. All Tier 1 athletes train here regardless of sport." },
    ],
  },
  {
    category: "Facility & Brand",
    terms: [
      { term: "Cultural home / Physical home", avoid: "Just a club", definition: "WSC is more than a facility — it is the physical and cultural home for athletes and families. The 67-acre campus in Woodinville, WA." },
      { term: "Tier 1 at WSC", avoid: "Tier 1 as a program", definition: "Tier 1 is THE performance brand, not just a program at WSC. It operates within WSC but carries its own identity." },
      { term: "Experience Layer", avoid: "Front of house / Reception / Front desk", definition: "Athlete Services is the experience layer — the human interface of the club. Proactive, mobile, name-based." },
      { term: "Performance", avoid: "Fitness (Tier 1 context)", definition: "Tier 1 is performance, not fitness. Fitness implies general wellness. Performance implies competitive development, measurable outcomes, and a pathway." },
      { term: "Campus", avoid: "Club / Facility / Building", definition: "WSC is a 67-acre campus — the scale and scope matters. 'Campus' signals a full environment, not just a building." },
    ],
  },
  {
    category: "Words to Avoid",
    terms: [
      { term: "World-class", avoid: "", definition: "Without specific proof, this is noise" },
      { term: "State-of-the-art", avoid: "", definition: "Without specifics, this is noise" },
      { term: "Amazing / Incredible / Awesome", avoid: "", definition: "Show, don't assert" },
      { term: "Discount / Deal / Sale / Promo", avoid: "", definition: "In narrative contexts — reduces story to transaction" },
    ],
  },
];

export const ANTI_PATTERNS = [
  {
    pattern: "Generic Promotional Content",
    brand: "Both Brands",
    reason: "Flooding with generic ads or mass promotional emails reduces the story to a transaction. Every communication must be traceable to a brand value or story thread.",
    example: {
      wrong: "Join our tennis program this fall! Limited spots available. Sign up today!",
      right: "Coach Martinez ran a 90-minute serve clinic this morning. Three athletes hit personal bests. Fall enrollment opens Monday.",
    },
  },
  {
    pattern: "Stock Imagery or Polished Disconnection",
    brand: "Both Brands",
    reason: "Stock imagery or overly polished graphics disconnected from real training and real people undermine authenticity. Our marketing must be embedded in the program.",
    example: {
      wrong: "Using a stock photo of a smiling tennis player for a social post",
      right: "A candid training shot of an actual Tier 1 athlete mid-drill with a specific caption",
    },
  },
  {
    pattern: "Wins Without the Work",
    brand: "Tier 1",
    reason: "Posting only wins — the absence of the grind makes us look like every other club. The process is the differentiator. Show the work that earned the result.",
    example: {
      wrong: "Congratulations to our tournament champions!",
      right: "Six weeks of early mornings. 400+ serves in the last week alone. Today it showed.",
    },
  },
  {
    pattern: "Outsourced Narrative",
    brand: "Both Brands",
    reason: "Outsourcing the narrative to generic PR firms without cultural immersion produces content that could have been written for any sports club anywhere. Our marketing must come from inside the culture.",
    example: {
      wrong: "A press release about the facility's 'world-class amenities and state-of-the-art equipment'",
      right: "A first-person story from a coach about what changed in an athlete's game this week",
    },
  },
  {
    pattern: "Cross-Brand Visual Mixing",
    brand: "Both Brands",
    reason: "Using Oswald font or Tier 1's dark palette in WSC community-facing materials — or using soft/parchment palette in Tier 1 performance materials — sends the wrong signal and dilutes both identities.",
    example: {
      wrong: "A WSC family event flyer using Oswald 700 uppercase on a dark charcoal background",
      right: "A WSC family event flyer using Inter 300 on parchment (#e8e0d3) with warm dark text",
    },
  },
  {
    pattern: "Tagline Paraphrasing",
    brand: "Both Brands",
    reason: "Publishing tagline variations that are not on the confirmed list — paraphrasing protected brand lines — dilutes the equity built in those specific phrases.",
    example: {
      wrong: "Train Beyond Limits. / Elevate and Enrich. / The Limit Never Wavers.",
      right: "Train Without Limits. / Elevate Your Game. Enrich Your Life.",
    },
  },
  {
    pattern: "Competitor Comparisons",
    brand: "Both Brands",
    reason: "Comparing ourselves to competitors by name in public content is beneath the brand. Let the work speak. Our alumni destinations are the proof.",
    example: {
      wrong: "Unlike other tennis programs in the area, we offer...",
      right: "Penn. Harvard. Stanford. USC. Princeton. Miami. Auburn. Boston College. Built here.",
    },
  },
  {
    pattern: "Sales Content in Training Environments",
    brand: "Both Brands",
    reason: "Posting sales promotions in or near active training environments violates the standard of the environment. The environment is a brand signal — it should communicate performance, not transactions.",
    example: {
      wrong: "A 'Summer Special — 20% off enrollment' sign posted near the courts",
      right: "A cultural quote or athlete recognition wall in the same space",
    },
  },
];
