/**
 * OnboardingChecklist.tsx
 * Design: "The Performance Codex" — dark charcoal base, blue accents, parchment for WSC
 * Section: New Staff Onboarding — printable checklist walking new hires through the brand kit in order
 */

import { useState } from "react";
import { toast } from "sonner";
import { SectionHeader } from "@/pages/Home";

// ─── Data ────────────────────────────────────────────────────────────────────

interface ChecklistItem {
  id: string;
  task: string;
  detail: string;
  section: string; // which brand kit section to visit
  priority: "required" | "recommended" | "optional";
  timeEstimate: string;
}

interface ChecklistPhase {
  id: string;
  phase: string;
  label: string;
  color: string;
  timeframe: string;
  items: ChecklistItem[];
}

const CHECKLIST_PHASES: ChecklistPhase[] = [
  {
    id: "day1",
    phase: "Day 1",
    label: "Brand Foundation",
    color: "#3b82f6",
    timeframe: "First day — 45 min",
    items: [
      {
        id: "d1-1",
        task: "Read the Brand Architecture overview",
        detail: "Understand the relationship between Caliber Sports (platform), WSC (facility brand), and Tier 1 Performance (academy brand). This is the most important concept in the entire kit.",
        section: "Brand Architecture",
        priority: "required",
        timeEstimate: "5 min",
      },
      {
        id: "d1-2",
        task: "Review both color palettes",
        detail: "Memorize the key difference: WSC = warm parchment (#e8e0d3 bg, #0d1b2a navy). Tier 1 = cold charcoal (#0f1114 bg, #3b82f6 blue). You will use this every day.",
        section: "Color Palette",
        priority: "required",
        timeEstimate: "5 min",
      },
      {
        id: "d1-3",
        task: "Review the logo gallery",
        detail: "Know which logo to use for which brand and context. Understand clear space rules and what is prohibited.",
        section: "Logo Gallery",
        priority: "required",
        timeEstimate: "5 min",
      },
      {
        id: "d1-4",
        task: "Read the typography system",
        detail: "Oswald for headlines, Inter for body. Know which weights and sizes are standard for each brand.",
        section: "Typography",
        priority: "required",
        timeEstimate: "5 min",
      },
      {
        id: "d1-5",
        task: "Read Brand Voice Constants",
        detail: "Learn the approved vocabulary and prohibited terms for both brands. This directly affects every caption, email, and sign you produce.",
        section: "Voice Constants",
        priority: "required",
        timeEstimate: "10 min",
      },
      {
        id: "d1-6",
        task: "Take the Brand Onboarding Quiz",
        detail: "Complete the quiz at the end of the Brand Onboarding Quiz section. Score 80% or above before producing any external content.",
        section: "Brand Onboarding Quiz",
        priority: "required",
        timeEstimate: "15 min",
      },
    ],
  },
  {
    id: "week1",
    phase: "Week 1",
    label: "Operational Systems",
    color: "#8b5cf6",
    timeframe: "First week — 60 min total",
    items: [
      {
        id: "w1-1",
        task: "Study the Signage System",
        detail: "Browse all five sign categories. Understand the brand assignment logic (Tier 1 vs WSC). Practice using the vendor filter and Print All export.",
        section: "Signage System",
        priority: "required",
        timeEstimate: "10 min",
      },
      {
        id: "w1-2",
        task: "Read the Approval Workflow Guide",
        detail: "Know the approval path for every content type you will produce: social posts, signs, emails, co-branding. Know who to escalate to.",
        section: "Approval Workflow Guide",
        priority: "required",
        timeEstimate: "10 min",
      },
      {
        id: "w1-3",
        task: "Review the Email Guidelines",
        detail: "Understand the email template system, subject line rules, and the difference between transactional and marketing emails.",
        section: "Email Guidelines",
        priority: "required",
        timeEstimate: "10 min",
      },
      {
        id: "w1-4",
        task: "Read the Instagram Guidelines",
        detail: "Review the content pillars, caption structure, hashtag strategy, and visual direction for both Tier 1 and WSC accounts.",
        section: "Instagram Guidelines",
        priority: "required",
        timeEstimate: "10 min",
      },
      {
        id: "w1-5",
        task: "Review the Tone Matrix",
        detail: "Understand how tone shifts across channels and audiences — parent communication vs athlete communication vs media vs internal.",
        section: "Tone Matrix",
        priority: "recommended",
        timeEstimate: "5 min",
      },
      {
        id: "w1-6",
        task: "Set up your email signature",
        detail: "Install the correct email signature template for your role and brand (Tier 1 or WSC). Instructions are in the Email Signature Templates section.",
        section: "Email Signature Templates",
        priority: "required",
        timeEstimate: "5 min",
      },
      {
        id: "w1-7",
        task: "Review the Presentation Template Guide",
        detail: "Understand the slide layout rules before creating any internal decks, parent presentations, or recruitment materials.",
        section: "Presentation Template Guide",
        priority: "recommended",
        timeEstimate: "10 min",
      },
    ],
  },
  {
    id: "month1",
    phase: "Month 1",
    label: "Advanced & Governance",
    color: "#10b981",
    timeframe: "First month — as needed",
    items: [
      {
        id: "m1-1",
        task: "Read the Co-Branding & Partnerships section",
        detail: "Understand partner tiers, lockup rules, and the approval requirements for any co-branded content. Required before working on any partner or sponsor materials.",
        section: "Co-Branding & Partnerships",
        priority: "required",
        timeEstimate: "10 min",
      },
      {
        id: "m1-2",
        task: "Review the Anti-Patterns section",
        detail: "Study the most common brand mistakes and how to avoid them. This section is updated as new mistakes are identified.",
        section: "Anti-Patterns",
        priority: "recommended",
        timeEstimate: "5 min",
      },
      {
        id: "m1-3",
        task: "Run the Brand Voice Scorer on your first three pieces of content",
        detail: "Use the Brand Voice Scorer to self-evaluate your first social post, email, and sign before submitting for approval.",
        section: "Brand Voice Scorer",
        priority: "recommended",
        timeEstimate: "15 min",
      },
      {
        id: "m1-4",
        task: "Review the Messaging Pillars",
        detail: "Understand the core messages for each brand and how they translate into content across channels.",
        section: "Messaging Pillars",
        priority: "recommended",
        timeEstimate: "5 min",
      },
      {
        id: "m1-5",
        task: "Review the Quick Reference Card",
        detail: "Print or bookmark the Quick Reference Card for day-to-day use. It contains the most-used brand rules on a single page.",
        section: "Quick Reference Card",
        priority: "recommended",
        timeEstimate: "5 min",
      },
      {
        id: "m1-6",
        task: "Review the Channel Guidelines",
        detail: "Understand the content strategy and tone for each channel: Instagram, email, in-facility signage, and partner communications.",
        section: "Channel Guidelines",
        priority: "optional",
        timeEstimate: "10 min",
      },
    ],
  },
];

const PRIORITY_COLORS: Record<ChecklistItem["priority"], string> = {
  required: "#ef4444",
  recommended: "#3b82f6",
  optional: "#a0a5ad",
};

const PRIORITY_LABELS: Record<ChecklistItem["priority"], string> = {
  required: "REQUIRED",
  recommended: "RECOMMENDED",
  optional: "OPTIONAL",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OnboardingChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [activePhase, setActivePhase] = useState("day1");

  const phase = CHECKLIST_PHASES.find((p) => p.id === activePhase)!;

  const totalRequired = CHECKLIST_PHASES.flatMap((p) => p.items).filter((i) => i.priority === "required").length;
  const completedRequired = CHECKLIST_PHASES.flatMap((p) => p.items)
    .filter((i) => i.priority === "required" && checked.has(i.id)).length;
  const totalAll = CHECKLIST_PHASES.flatMap((p) => p.items).length;
  const completedAll = checked.size;

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        if (completedRequired + 1 === totalRequired) {
          toast.success("All required items complete — you're cleared to produce content!");
        }
      }
      return next;
    });
  }

  function resetAll() {
    setChecked(new Set());
    toast.success("Checklist reset");
  }

  function copyProgress() {
    const lines = CHECKLIST_PHASES.flatMap((p) =>
      p.items.map((item) => `[${checked.has(item.id) ? "x" : " "}] ${item.task} (${item.priority.toUpperCase()})`)
    );
    const text = `WSC / TIER 1 BRAND ONBOARDING CHECKLIST\n${"-".repeat(50)}\nCompleted: ${completedAll}/${totalAll} total | ${completedRequired}/${totalRequired} required\n\n${lines.join("\n")}`;
    navigator.clipboard.writeText(text).then(() => toast.success("Progress copied to clipboard"));
  }

  const phaseProgress = (p: ChecklistPhase) => {
    const done = p.items.filter((i) => checked.has(i.id)).length;
    return { done, total: p.items.length, pct: Math.round((done / p.items.length) * 100) };
  };

  return (
    <div>
      <SectionHeader
        label="Governance"
        title="New Staff Onboarding Checklist"
        subtitle="A structured walkthrough of the brand kit for new hires. Complete all required items before producing any external content. Recommended items should be completed in the first month."
      />

      {/* Progress bar */}
      <div
        style={{
          background: "#22262b",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "20px 24px",
          marginBottom: "28px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "9px", letterSpacing: "0.16em", color: "#3b82f6", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "4px" }}>ONBOARDING PROGRESS</div>
            <div style={{ fontSize: "22px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: "#e8e8e8" }}>
              {completedRequired}/{totalRequired} <span style={{ fontSize: "13px", color: "#a0a5ad", fontWeight: 400 }}>required items</span>
            </div>
            <div style={{ fontSize: "11px", color: "#a0a5ad", marginTop: "2px" }}>{completedAll}/{totalAll} total items completed</div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={copyProgress}
              style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.25)",
                color: "#3b82f6",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "10px",
                letterSpacing: "0.1em",
                padding: "7px 14px",
                cursor: "pointer",
              }}
            >
              COPY PROGRESS
            </button>
            <button
              onClick={resetAll}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#a0a5ad",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "10px",
                letterSpacing: "0.1em",
                padding: "7px 14px",
                cursor: "pointer",
              }}
            >
              RESET
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ background: "rgba(255,255,255,0.06)", height: "6px", borderRadius: "0" }}>
          <div
            style={{
              background: completedRequired === totalRequired ? "#10b981" : "#3b82f6",
              height: "100%",
              width: `${(completedRequired / totalRequired) * 100}%`,
              transition: "width 0.3s ease",
            }}
          />
        </div>
        {completedRequired === totalRequired && (
          <div style={{ marginTop: "10px", fontSize: "11px", color: "#10b981", fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
            ✓ ALL REQUIRED ITEMS COMPLETE — CLEARED TO PRODUCE CONTENT
          </div>
        )}
      </div>

      {/* Phase tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
          marginBottom: "24px",
        }}
      >
        {CHECKLIST_PHASES.map((p) => {
          const prog = phaseProgress(p);
          return (
            <button
              key={p.id}
              onClick={() => setActivePhase(p.id)}
              style={{
                background: activePhase === p.id ? "#22262b" : "#1a1d21",
                padding: "14px 16px",
                textAlign: "left",
                border: "none",
                borderTop: activePhase === p.id ? `2px solid ${p.color}` : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: p.color, fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "2px" }}>
                    {p.phase}
                  </div>
                  <div style={{ fontSize: "11px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: activePhase === p.id ? "#e8e8e8" : "#a0a5ad", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {p.label}
                  </div>
                  <div style={{ fontSize: "10px", color: "#a0a5ad", marginTop: "2px" }}>{p.timeframe}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "14px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: prog.done === prog.total ? "#10b981" : p.color }}>
                    {prog.done}/{prog.total}
                  </div>
                  <div style={{ fontSize: "9px", color: "#a0a5ad" }}>{prog.pct}%</div>
                </div>
              </div>
              {/* Mini progress bar */}
              <div style={{ background: "rgba(255,255,255,0.06)", height: "3px", marginTop: "8px" }}>
                <div style={{ background: prog.done === prog.total ? "#10b981" : p.color, height: "100%", width: `${prog.pct}%`, transition: "width 0.3s" }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Checklist items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {phase.items.map((item) => {
          const done = checked.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              style={{
                background: done ? "rgba(59,130,246,0.05)" : "#22262b",
                border: done ? "1px solid rgba(59,130,246,0.2)" : "1px solid rgba(255,255,255,0.06)",
                padding: "14px 16px",
                cursor: "pointer",
                display: "grid",
                gridTemplateColumns: "32px 1fr auto",
                gap: "12px",
                alignItems: "flex-start",
                transition: "all 0.15s",
              }}
            >
              {/* Checkbox */}
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  border: done ? "2px solid #3b82f6" : "2px solid rgba(255,255,255,0.2)",
                  background: done ? "#3b82f6" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "1px",
                  transition: "all 0.15s",
                }}
              >
                {done && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {/* Content */}
              <div>
                <div style={{ fontSize: "12px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: done ? "#a0a5ad" : "#e8e8e8", letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: done ? "line-through" : "none", marginBottom: "4px" }}>
                  {item.task}
                </div>
                <div style={{ fontSize: "11px", color: "#a0a5ad", lineHeight: 1.5, marginBottom: "6px" }}>{item.detail}</div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.1em", color: "#a0a5ad", background: "rgba(255,255,255,0.06)", padding: "2px 6px", fontFamily: "'Oswald', sans-serif" }}>
                    → {item.section}
                  </span>
                  <span style={{ fontSize: "9px", color: "#a0a5ad" }}>{item.timeEstimate}</span>
                </div>
              </div>
              {/* Priority badge */}
              <div style={{ flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.12em",
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    color: PRIORITY_COLORS[item.priority],
                    background: PRIORITY_COLORS[item.priority] + "18",
                    padding: "3px 7px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {PRIORITY_LABELS[item.priority]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div
        style={{
          marginTop: "32px",
          background: "#22262b",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 20px",
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#a0a5ad", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>PRIORITY KEY:</div>
        {(["required", "recommended", "optional"] as const).map((p) => (
          <div key={p} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "8px", height: "8px", background: PRIORITY_COLORS[p], flexShrink: 0 }} />
            <span style={{ fontSize: "10px", color: "#a0a5ad" }}>
              <strong style={{ color: PRIORITY_COLORS[p] }}>{PRIORITY_LABELS[p]}</strong>
              {p === "required" && " — must complete before producing external content"}
              {p === "recommended" && " — complete within first month"}
              {p === "optional" && " — reference as needed"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
