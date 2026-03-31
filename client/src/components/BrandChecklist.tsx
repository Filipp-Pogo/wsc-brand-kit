/*
 * BrandChecklist.tsx
 * WSC & Tier 1 Performance — Brand Kit
 * Design: "The Performance Codex" — floating checklist panel, dark charcoal surface
 * A pre-publish checklist grounded in the brand's core values, voice constants, and guidelines
 */

import { useState } from "react";
import { toast } from "sonner";

type ChecklistItem = {
  id: string;
  category: string;
  text: string;
  brand: "Tier 1" | "WSC" | "Both";
};

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Identity
  { id: "c1", category: "Identity", text: "Content is traceable to at least one core value (Excellence, Care, Belonging, Authenticity, Innovation, Long-Term, Truth)", brand: "Both" },
  { id: "c2", category: "Identity", text: "Tier 1 materials do NOT use WSC/parchment tones or Oswald in WSC context", brand: "Both" },
  // Voice
  { id: "v1", category: "Voice", text: "Content is story-led — tied to a real moment, person, or process (not a generic announcement)", brand: "Both" },
  { id: "v2", category: "Voice", text: "Copy is specific and operational — uses names, numbers, real details (not vague or ambient)", brand: "Both" },
  { id: "v3", category: "Voice", text: "Confidence is earned, not claimed — no 'we are the best' statements", brand: "Both" },
  { id: "v4", category: "Voice", text: "No generic filler words: 'world-class', 'state-of-the-art', 'amazing', 'incredible', 'awesome'", brand: "Both" },
  { id: "v5", category: "Voice", text: "No discount or promotional language in narrative contexts ('sale', 'deal', 'promo', '% off')", brand: "Both" },
  // Tone
  { id: "t1", category: "Tone", text: "Tone is calibrated to the correct channel (raw/urgent for Tier 1 social; personal/trusted for WSC email)", brand: "Both" },
  { id: "t2", category: "Tone", text: "Athletes and families are referred to as people with names — not as 'our athlete' or 'our members'", brand: "Both" },
  { id: "t3", category: "Tone", text: "Tier 1 content shows the process/grind — not just polished victories", brand: "Tier 1" },
  { id: "t4", category: "Tone", text: "WSC email has one story and one call-to-action only", brand: "WSC" },
  // Visual
  { id: "vis1", category: "Visual", text: "Correct logo version is used for the background (black logo on light, white logo on dark)", brand: "Both" },
  { id: "vis2", category: "Visual", text: "Logo is not stretched, recolored, rotated, or has effects applied", brand: "Both" },
  { id: "vis3", category: "Visual", text: "Corner radius is 0rem (Tier 1) or 0.125rem (WSC) — no rounded corners", brand: "Both" },
  { id: "vis4", category: "Visual", text: "Tier 1 uses Oswald 700 for headlines; WSC uses Inter 300/400 for headlines", brand: "Both" },
  { id: "vis5", category: "Visual", text: "No stock imagery or studio shots disconnected from real training/facility", brand: "Both" },
  // Messaging
  { id: "m1", category: "Messaging", text: "Content maps to at least one story thread: The Why, The Who, or The Process", brand: "Both" },
  { id: "m2", category: "Messaging", text: "If using a tagline, it is from the approved list — not paraphrased or modified", brand: "Both" },
  { id: "m3", category: "Messaging", text: "No competitor comparisons by name in public-facing content", brand: "Both" },
  { id: "m4", category: "Messaging", text: "No sales content posted in or near active training environments", brand: "Both" },
];

const CATEGORIES = ["Identity", "Voice", "Tone", "Visual", "Messaging"];

const BRAND_COLORS: Record<string, string> = {
  "Tier 1": "#3b82f6",
  "WSC": "#4cabfd",
  "Both": "#a0a5ad",
};

export default function BrandChecklist({ onClose }: { onClose: () => void }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<"All" | "Tier 1" | "WSC" | "Both">("All");

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = CHECKLIST_ITEMS.filter(
    (item) => activeFilter === "All" || item.brand === activeFilter || item.brand === "Both"
  );

  const totalChecked = filteredItems.filter((item) => checked[item.id]).length;
  const totalItems = filteredItems.length;
  const allDone = totalChecked === totalItems;
  const pct = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  const reset = () => {
    setChecked({});
    toast.info("Checklist reset");
  };

  const approve = () => {
    if (!allDone) {
      toast.error(`${totalItems - totalChecked} item${totalItems - totalChecked !== 1 ? "s" : ""} still unchecked`);
      return;
    }
    toast.success("✓ Content approved — all brand standards met");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative flex flex-col w-full max-w-2xl"
        style={{
          backgroundColor: "#0f1114",
          border: "1px solid rgba(255,255,255,0.1)",
          maxHeight: "90vh",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between p-6 pb-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#3b82f6",
                marginBottom: "6px",
              }}
            >
              Pre-Publish Tool
            </div>
            <h2
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "26px",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                color: "#ffffff",
              }}
            >
              Brand Checklist
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", marginTop: "4px" }}>
              Run through before publishing any piece of content.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 transition-colors"
            style={{ color: "#a0a5ad" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#a0a5ad")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#a0a5ad" }}>
              {totalChecked} / {totalItems} checked
            </span>
            <span
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: allDone ? "#22c55e" : "#3b82f6",
                transition: "color 300ms ease",
              }}
            >
              {pct}%
            </span>
          </div>
          <div style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                backgroundColor: allDone ? "#22c55e" : "#3b82f6",
                transition: "width 300ms ease, background-color 300ms ease",
              }}
            />
          </div>
        </div>

        {/* Brand filter */}
        <div className="px-6 py-3 flex gap-2 flex-wrap" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {(["All", "Tier 1", "WSC"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "4px 12px",
                backgroundColor: activeFilter === f ? "#3b82f6" : "rgba(255,255,255,0.06)",
                color: activeFilter === f ? "#ffffff" : "#a0a5ad",
                border: "none",
                cursor: "pointer",
                transition: "all 150ms ease",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Checklist items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {CATEGORIES.map((cat) => {
            const items = filteredItems.filter((i) => i.category === cat);
            if (items.length === 0) return null;
            const catChecked = items.filter((i) => checked[i.id]).length;
            return (
              <div key={cat} className="mb-5">
                <div
                  className="flex items-center gap-3 mb-3"
                >
                  <span
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      fontWeight: 700,
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: catChecked === items.length ? "#22c55e" : "#3b82f6",
                    }}
                  >
                    {cat}
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      color: "#a0a5ad",
                    }}
                  >
                    {catChecked}/{items.length}
                  </span>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />
                </div>
                <div className="space-y-1">
                  {items.map((item) => {
                    const isChecked = !!checked[item.id];
                    return (
                      <label
                        key={item.id}
                        className="flex items-start gap-3 cursor-pointer group p-3 transition-colors"
                        style={{
                          backgroundColor: isChecked ? "rgba(34,197,94,0.05)" : "rgba(255,255,255,0.02)",
                          border: isChecked ? "1px solid rgba(34,197,94,0.15)" : "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {/* Custom checkbox */}
                        <div
                          className="flex-shrink-0 mt-0.5"
                          style={{
                            width: "16px",
                            height: "16px",
                            backgroundColor: isChecked ? "#22c55e" : "transparent",
                            border: isChecked ? "none" : "1.5px solid rgba(255,255,255,0.25)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 150ms ease",
                          }}
                        >
                          {isChecked && (
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                              <polyline points="2,6 5,9 10,3" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isChecked}
                          onChange={() => toggle(item.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              color: isChecked ? "#a0a5ad" : "#e8e8e8",
                              lineHeight: 1.55,
                              textDecoration: isChecked ? "line-through" : "none",
                              textDecorationColor: "rgba(160,165,173,0.5)",
                              transition: "all 150ms ease",
                            }}
                          >
                            {item.text}
                          </span>
                        </div>
                        {item.brand !== "Both" && (
                          <span
                            style={{
                              flexShrink: 0,
                              fontFamily: "Inter, sans-serif",
                              fontSize: "10px",
                              fontWeight: 600,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: BRAND_COLORS[item.brand],
                              padding: "2px 6px",
                              backgroundColor: `${BRAND_COLORS[item.brand]}18`,
                              border: `1px solid ${BRAND_COLORS[item.brand]}30`,
                            }}
                          >
                            {item.brand}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div
          className="flex items-center justify-between gap-3 p-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <button
            onClick={reset}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#a0a5ad",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 0",
            }}
          >
            Reset
          </button>
          <button
            onClick={approve}
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "10px 28px",
              backgroundColor: allDone ? "#22c55e" : "#3b82f6",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              transition: "background-color 300ms ease",
            }}
          >
            {allDone ? "✓ Approved" : `Approve Content (${totalItems - totalChecked} remaining)`}
          </button>
        </div>
      </div>
    </div>
  );
}
