/**
 * BrandVoiceScorer — Interactive brand voice compliance tool
 * Design: "The Performance Codex"
 * Paste copy → get flagged words, voice score, and specific line-level notes.
 */

import { useState, useCallback } from "react";
import { SectionHeader } from "@/pages/Home";
import { toast } from "sonner";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NEVER_USE = [
  { word: "cheap", reason: "Implies low value — use 'accessible' or 'straightforward pricing'" },
  { word: "discount", reason: "Undermines premium positioning" },
  { word: "deal", reason: "Transactional framing — not brand-aligned" },
  { word: "sale", reason: "Retail language — not appropriate for performance programs" },
  { word: "free", reason: "Devalues the offering — use 'complimentary' if needed" },
  { word: "just", reason: "Minimizing language — removes authority from the statement" },
  { word: "simply", reason: "Patronizing — implies the audience doesn't understand" },
  { word: "easy", reason: "Contradicts the performance brand — nothing worth having is easy" },
  { word: "amazing", reason: "Vague superlative — be specific about what is exceptional" },
  { word: "awesome", reason: "Informal filler — use specific, earned language" },
  { word: "incredible", reason: "Hyperbolic — undermines credibility" },
  { word: "world-class", reason: "Unverified claim — use specific credentials instead" },
  { word: "best-in-class", reason: "Unverified claim — use specific results instead" },
  { word: "passionate", reason: "Overused — show the passion through specifics, don't claim it" },
  { word: "excited", reason: "Informal and overused — use direct, confident language" },
  { word: "thrilled", reason: "Informal — not aligned with performance brand tone" },
  { word: "synergy", reason: "Corporate jargon — be specific about the relationship" },
  { word: "leverage", reason: "Corporate jargon — use 'use' or 'apply'" },
  { word: "utilize", reason: "Unnecessarily formal — use 'use'" },
  { word: "innovative", reason: "Overused claim — describe what specifically is new" },
  { word: "cutting-edge", reason: "Cliché — be specific about the advancement" },
  { word: "state-of-the-art", reason: "Cliché — describe the specific capability" },
];

const APPROVED_ALTERNATIVES: Record<string, string> = {
  "cheap": "accessible · straightforward pricing",
  "discount": "early enrollment · program pricing",
  "deal": "program · enrollment",
  "sale": "enrollment open · spots available",
  "free": "complimentary · included",
  "just": "[remove entirely]",
  "simply": "[remove entirely]",
  "easy": "straightforward · clear",
  "amazing": "[specific outcome or result]",
  "awesome": "[specific outcome or result]",
  "incredible": "[specific outcome or result]",
  "world-class": "[specific credential or result]",
  "best-in-class": "[specific result or metric]",
  "passionate": "[show it — describe the specific action]",
  "excited": "ready · committed",
  "thrilled": "ready · committed",
  "synergy": "partnership · collaboration",
  "leverage": "use · apply",
  "utilize": "use",
  "innovative": "[describe the specific advancement]",
  "cutting-edge": "[describe the specific capability]",
  "state-of-the-art": "[describe the specific feature]",
};

const VOICE_CONSTANTS_CHECK = [
  {
    id: "direct",
    label: "Direct",
    description: "No filler, no hedging, no passive voice",
    passivePatterns: ["it is", "there is", "there are", "it was", "we would like to", "please note that", "we wanted to", "just wanted to"],
    tip: "Replace passive constructions with direct subject-verb-object sentences.",
  },
  {
    id: "specific",
    label: "Specific",
    description: "Vague claims replaced with concrete details",
    vaguePatterns: ["many", "some", "a lot", "various", "several", "numerous", "things", "stuff", "aspects"],
    tip: "Replace vague quantifiers with specific numbers, names, or outcomes.",
  },
  {
    id: "earned",
    label: "Earned",
    description: "Claims backed by proof, not assertion",
    assertionPatterns: ["we believe", "we think", "we feel", "in our opinion", "we are confident", "we are sure"],
    tip: "Back every claim with a specific result, credential, or example.",
  },
];

// ─── Scoring Logic ─────────────────────────────────────────────────────────────

interface Flag {
  word: string;
  reason: string;
  alternative: string;
  positions: number[];
}

interface VoiceIssue {
  constant: string;
  pattern: string;
  tip: string;
}

interface ScoreResult {
  score: number;
  grade: "PASS" | "REVIEW" | "FAIL";
  flags: Flag[];
  voiceIssues: VoiceIssue[];
  wordCount: number;
  sentenceCount: number;
}

function scoreCopy(text: string): ScoreResult {
  if (!text.trim()) {
    return { score: 0, grade: "FAIL", flags: [], voiceIssues: [], wordCount: 0, sentenceCount: 0 };
  }

  const lower = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  // Check never-use words
  const flags: Flag[] = [];
  NEVER_USE.forEach(({ word, reason }) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    const matches: number[] = [];
    let m;
    while ((m = regex.exec(lower)) !== null) {
      matches.push(m.index);
    }
    if (matches.length > 0) {
      flags.push({
        word,
        reason,
        alternative: APPROVED_ALTERNATIVES[word] || "—",
        positions: matches,
      });
    }
  });

  // Check voice constants
  const voiceIssues: VoiceIssue[] = [];
  VOICE_CONSTANTS_CHECK.forEach((vc) => {
    const patterns = [
      ...(vc.passivePatterns || []),
      ...(vc.vaguePatterns || []),
      ...(vc.assertionPatterns || []),
    ];
    patterns.forEach((pattern) => {
      if (lower.includes(pattern)) {
        voiceIssues.push({
          constant: vc.label,
          pattern,
          tip: vc.tip,
        });
      }
    });
  });

  // Calculate score (0–100)
  const flagPenalty = Math.min(flags.length * 10, 50);
  const voicePenalty = Math.min(voiceIssues.length * 8, 30);
  const score = Math.max(0, 100 - flagPenalty - voicePenalty);

  const grade: "PASS" | "REVIEW" | "FAIL" =
    score >= 80 ? "PASS" : score >= 55 ? "REVIEW" : "FAIL";

  return { score, grade, flags, voiceIssues, wordCount: words.length, sentenceCount: sentences.length };
}

function highlightText(text: string, flags: Flag[]): React.ReactNode[] {
  if (flags.length === 0) return [text];

  const allWords = flags.map((f) => f.word);
  const regex = new RegExp(`\\b(${allWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "gi");

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <mark
        key={match.index}
        style={{
          backgroundColor: "rgba(239,68,68,0.25)",
          color: "#ef4444",
          borderBottom: "2px solid #ef4444",
          background: "none",
          fontWeight: 600,
        }}
      >
        {match[0]}
      </mark>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function BrandVoiceScorer() {
  const [copy, setCopy] = useState("");
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [activeTab, setActiveTab] = useState<"score" | "flags" | "voice" | "reference">("score");

  const handleScore = useCallback(() => {
    if (!copy.trim()) {
      toast.error("Paste some copy first");
      return;
    }
    const r = scoreCopy(copy);
    setResult(r);
    setActiveTab("score");
    toast.success("Copy scored");
  }, [copy]);

  const handleClear = () => {
    setCopy("");
    setResult(null);
  };

  const gradeColor = result
    ? result.grade === "PASS" ? "#22c55e" : result.grade === "REVIEW" ? "#f59e0b" : "#ef4444"
    : "#a0a5ad";

  const gradeLabel = result
    ? result.grade === "PASS" ? "Brand Compliant" : result.grade === "REVIEW" ? "Needs Review" : "Non-Compliant"
    : "";

  return (
    <div style={{ backgroundColor: "#0f1114" }}>
      <div style={{ padding: "80px 48px" }}>
        <SectionHeader
          label="— Tools"
          title="Brand Voice Scorer"
          subtitle="Paste any draft copy — caption, email, announcement, or script — and get an instant brand compliance score with specific flags and approved alternatives."
          dark
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 max-w-6xl">
          {/* Input panel */}
          <div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: "#3b82f6",
                marginBottom: "10px",
              }}
            >
              Paste Copy to Score
            </div>
            <textarea
              value={copy}
              onChange={(e) => setCopy(e.target.value)}
              placeholder="Paste any draft copy here — caption, email subject, announcement, social post, or script..."
              style={{
                width: "100%",
                minHeight: "280px",
                backgroundColor: "#1a1d21",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                color: "#e8e8e8",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                lineHeight: 1.65,
                padding: "16px",
                resize: "vertical" as const,
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(59,130,246,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />

            {/* Highlighted preview */}
            {result && copy && (
              <div style={{ marginTop: "12px" }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#a0a5ad", marginBottom: "8px" }}>
                  Flagged Words Highlighted
                </div>
                <div
                  style={{
                    backgroundColor: "#1a1d21",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                    padding: "16px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#e8e8e8",
                    lineHeight: 1.65,
                    whiteSpace: "pre-wrap" as const,
                  }}
                >
                  {highlightText(copy, result.flags)}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleScore}
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
                  flex: 1,
                }}
              >
                Score Copy
              </button>
              {copy && (
                <button
                  onClick={handleClear}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "12px 20px",
                    backgroundColor: "transparent",
                    color: "#a0a5ad",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    borderRight: "1px solid rgba(255,255,255,0.1)",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    borderLeft: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Results panel */}
          <div>
            {!result ? (
              <div
                style={{
                  backgroundColor: "#1a1d21",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                  padding: "48px 32px",
                  textAlign: "center" as const,
                  minHeight: "280px",
                  display: "flex",
                  flexDirection: "column" as const,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "48px", color: "rgba(255,255,255,0.06)", letterSpacing: "-0.02em" }}>
                  —
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad" }}>
                  Paste copy and click Score to see your brand compliance result
                </div>
              </div>
            ) : (
              <div>
                {/* Score card */}
                <div
                  style={{
                    backgroundColor: "#1a1d21",
                    borderTop: `3px solid ${gradeColor}`,
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                    padding: "24px",
                    marginBottom: "16px",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        style={{
                          fontFamily: "Oswald, sans-serif",
                          fontWeight: 700,
                          fontSize: "64px",
                          color: gradeColor,
                          lineHeight: 1,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {result.score}
                      </div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#a0a5ad", marginTop: "4px" }}>
                        out of 100
                      </div>
                    </div>
                    <div style={{ textAlign: "right" as const }}>
                      <div
                        style={{
                          fontFamily: "Oswald, sans-serif",
                          fontWeight: 700,
                          fontSize: "20px",
                          textTransform: "uppercase" as const,
                          letterSpacing: "0.04em",
                          color: gradeColor,
                        }}
                      >
                        {result.grade}
                      </div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", marginTop: "2px" }}>
                        {gradeLabel}
                      </div>
                    </div>
                  </div>

                  {/* Score bar */}
                  <div style={{ marginTop: "16px", backgroundColor: "rgba(255,255,255,0.06)", height: "4px" }}>
                    <div
                      style={{
                        height: "4px",
                        width: `${result.score}%`,
                        backgroundColor: gradeColor,
                        transition: "width 600ms ease",
                      }}
                    />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {[
                      { label: "Flagged Words", value: result.flags.length, color: result.flags.length > 0 ? "#ef4444" : "#22c55e" },
                      { label: "Voice Issues", value: result.voiceIssues.length, color: result.voiceIssues.length > 0 ? "#f59e0b" : "#22c55e" },
                      { label: "Word Count", value: result.wordCount, color: "#a0a5ad" },
                    ].map((stat) => (
                      <div key={stat.label} style={{ textAlign: "center" as const }}>
                        <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "28px", color: stat.color, letterSpacing: "-0.02em" }}>
                          {stat.value}
                        </div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#a0a5ad", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: "2px" }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Result tabs */}
                <div className="flex gap-0 mb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {[
                    { id: "flags", label: `Flags (${result.flags.length})` },
                    { id: "voice", label: `Voice Issues (${result.voiceIssues.length})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase" as const,
                        padding: "8px 16px",
                        background: "none",
                        border: "none",
                        borderBottom: activeTab === tab.id ? "2px solid #3b82f6" : "2px solid transparent",
                        color: activeTab === tab.id ? "#3b82f6" : "#a0a5ad",
                        cursor: "pointer",
                        marginBottom: "-1px",
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Flags */}
                {activeTab === "flags" && (
                  <div>
                    {result.flags.length === 0 ? (
                      <div
                        style={{
                          backgroundColor: "rgba(34,197,94,0.06)",
                          borderTop: "1px solid rgba(34,197,94,0.2)",
                          borderRight: "1px solid rgba(34,197,94,0.2)",
                          borderBottom: "1px solid rgba(34,197,94,0.2)",
                          borderLeft: "3px solid #22c55e",
                          padding: "16px 20px",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#22c55e",
                        }}
                      >
                        No flagged words found. Vocabulary is brand-compliant.
                      </div>
                    ) : (
                      result.flags.map((flag) => (
                        <div
                          key={flag.word}
                          style={{
                            backgroundColor: "#1a1d21",
                            borderTop: "1px solid rgba(239,68,68,0.15)",
                            borderRight: "1px solid rgba(239,68,68,0.15)",
                            borderBottom: "1px solid rgba(239,68,68,0.15)",
                            borderLeft: "3px solid #ef4444",
                            padding: "12px 16px",
                            marginBottom: "8px",
                          }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "15px", textTransform: "uppercase" as const, color: "#ef4444", letterSpacing: "0.02em" }}>
                              "{flag.word}"
                            </span>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#a0a5ad" }}>
                              Never Use
                            </span>
                          </div>
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#a0a5ad", marginBottom: "6px" }}>
                            {flag.reason}
                          </div>
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#3b82f6" }}>
                            <span style={{ color: "#a0a5ad" }}>Use instead: </span>{flag.alternative}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Voice Issues */}
                {activeTab === "voice" && (
                  <div>
                    {result.voiceIssues.length === 0 ? (
                      <div
                        style={{
                          backgroundColor: "rgba(34,197,94,0.06)",
                          borderTop: "1px solid rgba(34,197,94,0.2)",
                          borderRight: "1px solid rgba(34,197,94,0.2)",
                          borderBottom: "1px solid rgba(34,197,94,0.2)",
                          borderLeft: "3px solid #22c55e",
                          padding: "16px 20px",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#22c55e",
                        }}
                      >
                        No voice constant violations found. Copy is on-brand.
                      </div>
                    ) : (
                      result.voiceIssues.map((issue, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor: "#1a1d21",
                            borderTop: "1px solid rgba(245,158,11,0.15)",
                            borderRight: "1px solid rgba(245,158,11,0.15)",
                            borderBottom: "1px solid rgba(245,158,11,0.15)",
                            borderLeft: "3px solid #f59e0b",
                            padding: "12px 16px",
                            marginBottom: "8px",
                          }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#f59e0b", backgroundColor: "rgba(245,158,11,0.1)", padding: "2px 8px" }}>
                              {issue.constant}
                            </span>
                            <span style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "14px", color: "#f59e0b" }}>
                              "{issue.pattern}"
                            </span>
                          </div>
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#a0a5ad" }}>
                            {issue.tip}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reference: Never Use list */}
        <div className="mt-12 max-w-6xl">
          <div
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              textTransform: "uppercase" as const,
              letterSpacing: "0.02em",
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            Full "Never Use" Reference
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              className="grid"
              style={{
                gridTemplateColumns: "1fr 1.5fr 1.5fr",
                backgroundColor: "#22262b",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {["Word", "Why Not", "Use Instead"].map((h) => (
                <div key={h} style={{ padding: "10px 16px", fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#3b82f6" }}>
                  {h}
                </div>
              ))}
            </div>
            {NEVER_USE.map((item, i) => (
              <div
                key={item.word}
                className="grid"
                style={{
                  gridTemplateColumns: "1fr 1.5fr 1.5fr",
                  backgroundColor: i % 2 === 0 ? "#1a1d21" : "#0f1114",
                  borderBottom: i < NEVER_USE.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <div style={{ padding: "12px 16px", fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "14px", textTransform: "uppercase" as const, color: "#ef4444", letterSpacing: "0.02em" }}>
                  {item.word}
                </div>
                <div style={{ padding: "12px 16px", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#a0a5ad", lineHeight: 1.5 }}>
                  {item.reason}
                </div>
                <div style={{ padding: "12px 16px", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#3b82f6" }}>
                  {APPROVED_ALTERNATIVES[item.word]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
