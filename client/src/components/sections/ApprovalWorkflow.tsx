/**
 * ApprovalWorkflow.tsx
 * Design: "The Performance Codex" — dark charcoal base, blue accents for Tier 1, parchment for WSC
 * Section: Brand Governance — who approves what before it goes out
 */

import { useState } from "react";
import { SectionHeader } from "@/pages/Home";

// ─── Data ────────────────────────────────────────────────────────────────────

type ContentType =
  | "social-post"
  | "printed-sign"
  | "email"
  | "co-brand"
  | "press-media"
  | "internal";

interface ApprovalStep {
  step: number;
  action: string;
  owner: string;
  timeline: string;
  notes: string;
}

interface ContentRule {
  id: ContentType;
  label: string;
  icon: string;
  brand: "tier1" | "wsc" | "both";
  description: string;
  approvalSteps: ApprovalStep[];
  fastTrack: string | null; // condition under which approval can be skipped
  escalateTo: string;
}

const CONTENT_RULES: ContentRule[] = [
  {
    id: "social-post",
    label: "Social Media Post",
    icon: "📱",
    brand: "both",
    description:
      "Any post published to Tier 1 or WSC Instagram, Facebook, or other social channels. Includes stories, reels, static posts, and shared content.",
    approvalSteps: [
      {
        step: 1,
        action: "Draft content (copy + visual)",
        owner: "Marketing staff",
        timeline: "Day 0",
        notes: "Use the Caption Templates and Voice Constants sections of this kit. Check brand assignment — Tier 1 vs WSC.",
      },
      {
        step: 2,
        action: "Self-review against brand kit",
        owner: "Marketing staff",
        timeline: "Day 0",
        notes: "Run through the Brand Voice Scorer. Confirm: correct brand voice, no prohibited terms, correct logo/palette.",
      },
      {
        step: 3,
        action: "Director review",
        owner: "Marketing Director",
        timeline: "Same day or next morning",
        notes: "Required for all posts featuring athlete names, college recruitment content, or partnership mentions.",
      },
      {
        step: 4,
        action: "Publish",
        owner: "Marketing staff",
        timeline: "Per content calendar",
        notes: "Post at scheduled time. Log in the content calendar.",
      },
    ],
    fastTrack:
      "Routine event recap posts (no athlete names, no partners) may be published same-day without director review if the marketing lead approves.",
    escalateTo: "Marketing Director → General Manager for any post involving media, sponsors, or legal risk.",
  },
  {
    id: "printed-sign",
    label: "Printed Sign / Signage",
    icon: "🪧",
    brand: "both",
    description:
      "Any physical sign sent to a print vendor — door placards, A-frames, wall panels, banners, or large-format prints. Includes both Tier 1 and WSC signs.",
    approvalSteps: [
      {
        step: 1,
        action: "Select sign from Signage System",
        owner: "Marketing staff",
        timeline: "Day 0",
        notes: "Use the Signage System section of this kit. Confirm brand assignment (Tier 1 vs WSC). Edit editable fields only.",
      },
      {
        step: 2,
        action: "Copy print specs from kit",
        owner: "Marketing staff",
        timeline: "Day 0",
        notes: "Use the 'Copy Print Specs' button or 'Print All' for a full category. Paste directly into vendor order form.",
      },
      {
        step: 3,
        action: "Marketing lead sign-off",
        owner: "Marketing Lead",
        timeline: "Same day",
        notes: "Required before sending to vendor. Confirm size, material, and brand palette are correct.",
      },
      {
        step: 4,
        action: "Send to vendor",
        owner: "Marketing staff",
        timeline: "Day 1",
        notes: "Include print specs, brand color profiles (CMYK), and bleed/safe zone requirements from the spec sheet.",
      },
      {
        step: 5,
        action: "Proof review",
        owner: "Marketing Lead",
        timeline: "Before final print run",
        notes: "Review vendor proof against the kit mockup. Reject if colors, fonts, or layout deviate from spec.",
      },
    ],
    fastTrack:
      "Reorders of previously approved signs (same spec, no wording changes) can be sent to vendor without re-approval.",
    escalateTo: "Marketing Director for any new sign design not covered by the Signage System.",
  },
  {
    id: "email",
    label: "Email Communication",
    icon: "✉️",
    brand: "both",
    description:
      "Any email sent from a Tier 1 or WSC address — enrollment confirmations, session reminders, program announcements, re-engagement campaigns, and partner communications.",
    approvalSteps: [
      {
        step: 1,
        action: "Select email type and template",
        owner: "Marketing staff",
        timeline: "Day 0",
        notes: "Use the Email Guidelines section. Match email type (transactional vs marketing) to the correct template and brand.",
      },
      {
        step: 2,
        action: "Customize copy",
        owner: "Marketing staff",
        timeline: "Day 0",
        notes: "Follow subject line rules. Use approved vocabulary. No prohibited terms. Check CTA language.",
      },
      {
        step: 3,
        action: "Marketing lead review",
        owner: "Marketing Lead",
        timeline: "Same day",
        notes: "Required for all marketing emails. Transactional emails (confirmations, reminders) may skip this step.",
      },
      {
        step: 4,
        action: "Send / schedule",
        owner: "Marketing staff",
        timeline: "Per calendar",
        notes: "Log send date and list segment in the content calendar.",
      },
    ],
    fastTrack:
      "Automated transactional emails (enrollment confirmation, session reminder) do not require review once the template is approved.",
    escalateTo: "Marketing Director for any email to a media contact, sponsor, or external partner.",
  },
  {
    id: "co-brand",
    label: "Co-Branding / Partnership",
    icon: "🤝",
    brand: "both",
    description:
      "Any content, signage, or communication that places the WSC or Tier 1 logo alongside a partner or sponsor logo. Includes event signage, social posts, and printed materials.",
    approvalSteps: [
      {
        step: 1,
        action: "Confirm partner tier",
        owner: "Marketing staff",
        timeline: "Day 0",
        notes: "Check the Co-Branding & Partnerships section. Confirm the partner's tier (Presenting / Official / Supporting / Community).",
      },
      {
        step: 2,
        action: "Apply lockup rules",
        owner: "Marketing staff",
        timeline: "Day 0",
        notes: "Follow logo sizing, clear space, and placement rules from the Co-Branding section. WSC or Tier 1 logo must always be primary.",
      },
      {
        step: 3,
        action: "Marketing Director approval",
        owner: "Marketing Director",
        timeline: "1–2 business days",
        notes: "Required for ALL co-branded content regardless of partner tier. No exceptions.",
      },
      {
        step: 4,
        action: "General Manager sign-off",
        owner: "General Manager",
        timeline: "1–2 business days",
        notes: "Required for Presenting Sponsor content and any new partnership not previously approved.",
      },
      {
        step: 5,
        action: "Publish / print",
        owner: "Marketing staff",
        timeline: "After both approvals",
        notes: "Do not publish or send to print vendor until both approvals are confirmed in writing.",
      },
    ],
    fastTrack: null,
    escalateTo: "General Manager → Legal review for any partnership involving exclusivity, financial terms, or naming rights.",
  },
  {
    id: "press-media",
    label: "Press / Media Statement",
    icon: "📰",
    brand: "both",
    description:
      "Any statement, quote, or content shared with a journalist, media outlet, or public platform on behalf of WSC or Tier 1 Performance.",
    approvalSteps: [
      {
        step: 1,
        action: "Draft statement",
        owner: "Marketing Director",
        timeline: "Day 0",
        notes: "Marketing Director drafts all press statements. Staff do not communicate directly with media without authorization.",
      },
      {
        step: 2,
        action: "General Manager review",
        owner: "General Manager",
        timeline: "Same day",
        notes: "All press statements require GM review before release.",
      },
      {
        step: 3,
        action: "Legal review (if applicable)",
        owner: "Legal counsel",
        timeline: "1–3 business days",
        notes: "Required for any statement involving litigation, athlete injury, employment matters, or regulatory issues.",
      },
      {
        step: 4,
        action: "Release",
        owner: "Marketing Director",
        timeline: "After all approvals",
        notes: "Marketing Director is the sole authorized spokesperson unless otherwise designated by the GM.",
      },
    ],
    fastTrack: null,
    escalateTo: "General Manager immediately for any unsolicited media inquiry or crisis communication.",
  },
  {
    id: "internal",
    label: "Internal Communication",
    icon: "📋",
    brand: "both",
    description:
      "Emails, announcements, and documents shared internally with staff, coaches, and contractors. Lower approval burden but still brand-consistent.",
    approvalSteps: [
      {
        step: 1,
        action: "Draft communication",
        owner: "Any staff member",
        timeline: "Day 0",
        notes: "Internal communications still follow brand voice. No prohibited terms. Use correct brand (Tier 1 or WSC) based on audience.",
      },
      {
        step: 2,
        action: "Department head review",
        owner: "Department head",
        timeline: "Same day",
        notes: "Required for communications sent to all staff or all coaches. One-to-one messages do not require review.",
      },
      {
        step: 3,
        action: "Send",
        owner: "Sender",
        timeline: "After review",
        notes: "Log any all-staff communications in the content calendar for reference.",
      },
    ],
    fastTrack:
      "One-to-one internal messages (e.g., scheduling, logistics) do not require review.",
    escalateTo: "Marketing Director for any internal communication that may be shared externally.",
  },
];

// ─── Decision Tree ────────────────────────────────────────────────────────────

interface TreeNode {
  question: string;
  yes: string | TreeNode;
  no: string | TreeNode;
}

const DECISION_TREE: TreeNode = {
  question: "Does the content include a partner or sponsor logo?",
  yes: "→ Co-Branding workflow. Requires Marketing Director + GM approval.",
  no: {
    question: "Is it going to a print vendor?",
    yes: "→ Printed Sign workflow. Use Signage System specs. Marketing Lead sign-off required.",
    no: {
      question: "Is it going to a media outlet or journalist?",
      yes: "→ Press / Media workflow. Marketing Director drafts; GM approves.",
      no: {
        question: "Is it an email?",
        yes: "→ Email workflow. Transactional = no review. Marketing = Marketing Lead review.",
        no: {
          question: "Is it a social media post?",
          yes: "→ Social Post workflow. Self-review + Director review for athlete/partner content.",
          no: "→ Internal Communication workflow. Department head review for all-staff messages.",
        },
      },
    },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function DecisionNode({ node, depth = 0 }: { node: TreeNode | string; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);

  if (typeof node === "string") {
    return (
      <div
        style={{
          marginLeft: `${depth * 20}px`,
          padding: "8px 12px",
          background: "rgba(59,130,246,0.08)",
          borderLeft: "2px solid #3b82f6",
          fontSize: "12px",
          color: "#e8e8e8",
          lineHeight: 1.5,
        }}
      >
        {node}
      </div>
    );
  }

  return (
    <div style={{ marginLeft: depth > 0 ? "20px" : "0" }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          textAlign: "left",
          background: expanded ? "#22262b" : "#1a1d21",
          border: "1px solid rgba(255,255,255,0.08)",
          borderLeft: "2px solid rgba(255,255,255,0.2)",
          padding: "10px 14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "4px",
        }}
      >
        <span style={{ color: "#3b82f6", fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "12px", flexShrink: 0 }}>
          {expanded ? "▾" : "▸"}
        </span>
        <span style={{ fontSize: "12px", color: "#e8e8e8", lineHeight: 1.4 }}>{node.question}</span>
      </button>
      {expanded && (
        <div style={{ marginBottom: "8px" }}>
          <div style={{ marginLeft: "20px", marginBottom: "4px" }}>
            <span style={{ fontSize: "9px", letterSpacing: "0.12em", color: "#3b82f6", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>YES</span>
          </div>
          <DecisionNode node={node.yes} depth={depth + 1} />
          <div style={{ marginLeft: "20px", marginTop: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "9px", letterSpacing: "0.12em", color: "#a0a5ad", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>NO</span>
          </div>
          <DecisionNode node={node.no} depth={depth + 1} />
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ApprovalWorkflow() {
  const [activeType, setActiveType] = useState<ContentType>("social-post");
  const [showTree, setShowTree] = useState(false);

  const rule = CONTENT_RULES.find((r) => r.id === activeType)!;

  return (
    <div>
      <SectionHeader
        label="Governance"
        title="Approval Workflow Guide"
        subtitle="Who approves what before it goes out. Every content type has a clear owner, timeline, and escalation path. When in doubt, go up one level."
      />

      {/* Decision tree toggle */}
      <div
        style={{
          background: "#22262b",
          border: "1px solid rgba(255,255,255,0.06)",
          marginBottom: "32px",
          overflow: "hidden",
        }}
      >
        <button
          onClick={() => setShowTree(!showTree)}
          style={{
            width: "100%",
            textAlign: "left",
            background: "none",
            border: "none",
            padding: "16px 20px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "11px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.14em", color: "#3b82f6", marginBottom: "2px" }}>
              NOT SURE WHICH WORKFLOW TO USE?
            </div>
            <div style={{ fontSize: "12px", color: "#a0a5ad" }}>
              Use the decision tree to find the right approval path in under 30 seconds.
            </div>
          </div>
          <span style={{ color: "#3b82f6", fontSize: "18px", flexShrink: 0 }}>{showTree ? "▲" : "▼"}</span>
        </button>
        {showTree && (
          <div style={{ padding: "0 20px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ paddingTop: "16px" }}>
              <DecisionNode node={DECISION_TREE} depth={0} />
            </div>
          </div>
        )}
      </div>

      {/* Content type tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
          marginBottom: "28px",
        }}
      >
        {CONTENT_RULES.map((rule) => (
          <button
            key={rule.id}
            onClick={() => setActiveType(rule.id)}
            style={{
              background: activeType === rule.id ? "#22262b" : "#1a1d21",
              padding: "14px 12px",
              textAlign: "left",
              borderTop: activeType === rule.id ? "2px solid #3b82f6" : "2px solid transparent",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "none",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <div style={{ fontSize: "16px", marginBottom: "4px" }}>{rule.icon}</div>
            <div
              style={{
                fontSize: "10px",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: activeType === rule.id ? "#e8e8e8" : "#a0a5ad",
                textTransform: "uppercase",
              }}
            >
              {rule.label}
            </div>
          </button>
        ))}
      </div>

      {/* Active workflow */}
      <div>
        {/* Header */}
        <div
          style={{
            background: "#22262b",
            border: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "none",
            padding: "20px 24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "9px", letterSpacing: "0.16em", color: "#3b82f6", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "4px" }}>
                {rule.approvalSteps.length}-STEP WORKFLOW
              </div>
              <div style={{ fontSize: "18px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: "#e8e8e8", letterSpacing: "-0.01em", textTransform: "uppercase" }}>
                {rule.icon} {rule.label}
              </div>
              <p style={{ fontSize: "13px", color: "#a0a5ad", lineHeight: 1.6, marginTop: "6px", marginBottom: 0, maxWidth: "600px" }}>
                {rule.description}
              </p>
            </div>
            <div
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                padding: "10px 14px",
                flexShrink: 0,
                maxWidth: "280px",
              }}
            >
              <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#ef4444", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "4px" }}>ESCALATE TO</div>
              <div style={{ fontSize: "11px", color: "#e8e8e8", lineHeight: 1.5 }}>{rule.escalateTo}</div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div style={{ background: "#1a1d21", border: "1px solid rgba(255,255,255,0.06)", borderBottom: "none" }}>
          {rule.approvalSteps.map((step, i) => (
            <div
              key={step.step}
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr 140px 120px",
                gap: "0",
                borderBottom: i < rule.approvalSteps.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              {/* Step number */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#22262b",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "16px", color: "#3b82f6" }}>
                  {String(step.step).padStart(2, "0")}
                </span>
              </div>
              {/* Action + notes */}
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontSize: "12px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: "#e8e8e8", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "4px" }}>
                  {step.action}
                </div>
                <div style={{ fontSize: "11px", color: "#a0a5ad", lineHeight: 1.5 }}>{step.notes}</div>
              </div>
              {/* Owner */}
              <div
                style={{
                  padding: "14px 12px",
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontSize: "9px", letterSpacing: "0.12em", color: "#a0a5ad", marginBottom: "4px" }}>OWNER</div>
                <div style={{ fontSize: "11px", color: "#e8e8e8", lineHeight: 1.4 }}>{step.owner}</div>
              </div>
              {/* Timeline */}
              <div
                style={{
                  padding: "14px 12px",
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontSize: "9px", letterSpacing: "0.12em", color: "#a0a5ad", marginBottom: "4px" }}>TIMELINE</div>
                <div style={{ fontSize: "11px", color: "#3b82f6", lineHeight: 1.4, fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>{step.timeline}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Fast track */}
        {rule.fastTrack && (
          <div
            style={{
              background: "rgba(59,130,246,0.06)",
              border: "1px solid rgba(59,130,246,0.15)",
              borderTop: "none",
              padding: "12px 20px",
            }}
          >
            <span style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#3b82f6", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginRight: "8px" }}>⚡ FAST TRACK:</span>
            <span style={{ fontSize: "12px", color: "#a0a5ad", lineHeight: 1.5 }}>{rule.fastTrack}</span>
          </div>
        )}
        {!rule.fastTrack && (
          <div
            style={{
              background: "rgba(239,68,68,0.04)",
              border: "1px solid rgba(239,68,68,0.1)",
              borderTop: "none",
              padding: "12px 20px",
            }}
          >
            <span style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#ef4444", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginRight: "8px" }}>🚫 NO FAST TRACK:</span>
            <span style={{ fontSize: "12px", color: "#a0a5ad" }}>All steps are required. No exceptions.</span>
          </div>
        )}
      </div>

      {/* Summary table */}
      <div
        style={{
          marginTop: "40px",
          background: "#22262b",
          border: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "11px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.14em", color: "#3b82f6" }}>
            APPROVAL MATRIX — QUICK REFERENCE
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
            <thead>
              <tr style={{ background: "#1a1d21" }}>
                {["Content Type", "Steps", "Min. Approver", "Fast Track?", "Escalation"].map((h) => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "9px", letterSpacing: "0.12em", color: "#a0a5ad", fontFamily: "'Oswald', sans-serif", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.06)", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CONTENT_RULES.map((r, i) => (
                <tr
                  key={r.id}
                  style={{ background: i % 2 === 0 ? "#22262b" : "#1e2226", cursor: "pointer" }}
                  onClick={() => setActiveType(r.id)}
                >
                  <td style={{ padding: "10px 14px", color: "#e8e8e8", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    {r.icon} {r.label}
                  </td>
                  <td style={{ padding: "10px 14px", color: "#3b82f6", fontFamily: "'Oswald', sans-serif", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    {r.approvalSteps.length}
                  </td>
                  <td style={{ padding: "10px 14px", color: "#e8e8e8", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    {r.approvalSteps[r.approvalSteps.length - 2]?.owner ?? r.approvalSteps[r.approvalSteps.length - 1].owner}
                  </td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    {r.fastTrack
                      ? <span style={{ color: "#3b82f6", fontSize: "9px", letterSpacing: "0.1em", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>YES</span>
                      : <span style={{ color: "#ef4444", fontSize: "9px", letterSpacing: "0.1em", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>NO</span>}
                  </td>
                  <td style={{ padding: "10px 14px", color: "#a0a5ad", borderBottom: "1px solid rgba(255,255,255,0.04)", maxWidth: "240px" }}>
                    {r.escalateTo.split("→")[0].trim()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
