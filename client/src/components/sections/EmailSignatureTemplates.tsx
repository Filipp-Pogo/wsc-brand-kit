/**
 * EmailSignatureTemplates.tsx
 * Design: "The Performance Codex" — dark charcoal base, blue accents for Tier 1, parchment for WSC
 * Section: Content Production — standardized email signature blocks for Tier 1 and WSC staff
 */

import { useState } from "react";
import { toast } from "sonner";
import { SectionHeader } from "@/pages/Home";

// ─── Data ────────────────────────────────────────────────────────────────────

type Brand = "tier1" | "wsc";
type Role = "coach" | "director" | "admin" | "marketing" | "gm";

interface SignatureField {
  key: string;
  label: string;
  placeholder: string;
  required: boolean;
}

interface SignatureTemplate {
  id: string;
  brand: Brand;
  role: Role;
  roleLabel: string;
  description: string;
  fields: SignatureField[];
}

const SIGNATURE_TEMPLATES: SignatureTemplate[] = [
  {
    id: "tier1-coach",
    brand: "tier1",
    role: "coach",
    roleLabel: "Academy Coach",
    description: "For all Tier 1 Performance Academy coaches — tennis, golf, and S&C. Used in all athlete and parent communications.",
    fields: [
      { key: "name", label: "Full Name", placeholder: "Alex Rivera", required: true },
      { key: "title", label: "Title", placeholder: "Head Tennis Coach, Tier 1 Performance", required: true },
      { key: "phone", label: "Direct Phone", placeholder: "(425) 555-0101", required: true },
      { key: "email", label: "Email Address", placeholder: "arivera@tier1performance.com", required: true },
      { key: "certifications", label: "Certifications (optional)", placeholder: "USPTA Elite Professional · PTR Pro", required: false },
    ],
  },
  {
    id: "tier1-director",
    brand: "tier1",
    role: "director",
    roleLabel: "Academy Director",
    description: "For Tier 1 Performance Academy directors and program leads. Used in college recruitment, partner, and parent communications.",
    fields: [
      { key: "name", label: "Full Name", placeholder: "Jordan Kim", required: true },
      { key: "title", label: "Title", placeholder: "Academy Director, Tier 1 Performance", required: true },
      { key: "phone", label: "Direct Phone", placeholder: "(425) 555-0102", required: true },
      { key: "email", label: "Email Address", placeholder: "jkim@tier1performance.com", required: true },
      { key: "linkedin", label: "LinkedIn URL (optional)", placeholder: "linkedin.com/in/jordankim", required: false },
    ],
  },
  {
    id: "tier1-marketing",
    brand: "tier1",
    role: "marketing",
    roleLabel: "Marketing Staff",
    description: "For Tier 1 Performance marketing and content staff. Used in partner, media, and vendor communications.",
    fields: [
      { key: "name", label: "Full Name", placeholder: "Sam Chen", required: true },
      { key: "title", label: "Title", placeholder: "Marketing Coordinator, Tier 1 Performance", required: true },
      { key: "phone", label: "Direct Phone", placeholder: "(425) 555-0103", required: true },
      { key: "email", label: "Email Address", placeholder: "schen@tier1performance.com", required: true },
    ],
  },
  {
    id: "wsc-coach",
    brand: "wsc",
    role: "coach",
    roleLabel: "WSC Coach / Instructor",
    description: "For Woodinville Sports Club coaches and instructors — recreational programs, clinics, and member communications.",
    fields: [
      { key: "name", label: "Full Name", placeholder: "Taylor Brooks", required: true },
      { key: "title", label: "Title", placeholder: "Tennis Instructor, Woodinville Sports Club", required: true },
      { key: "phone", label: "Direct Phone", placeholder: "(425) 555-0201", required: true },
      { key: "email", label: "Email Address", placeholder: "tbrooks@woodinvillesportsclub.com", required: true },
      { key: "certifications", label: "Certifications (optional)", placeholder: "USPTA Professional", required: false },
    ],
  },
  {
    id: "wsc-admin",
    brand: "wsc",
    role: "admin",
    roleLabel: "WSC Admin / Front Desk",
    description: "For WSC administrative staff, front desk, and member services. Used in all member-facing communications.",
    fields: [
      { key: "name", label: "Full Name", placeholder: "Morgan Davis", required: true },
      { key: "title", label: "Title", placeholder: "Member Services, Woodinville Sports Club", required: true },
      { key: "phone", label: "Main Phone", placeholder: "(425) 555-0200", required: true },
      { key: "email", label: "Email Address", placeholder: "mdavis@woodinvillesportsclub.com", required: true },
    ],
  },
  {
    id: "wsc-gm",
    brand: "wsc",
    role: "gm",
    roleLabel: "General Manager",
    description: "For the General Manager and senior leadership. Used in all external, partner, and media communications.",
    fields: [
      { key: "name", label: "Full Name", placeholder: "Casey Morgan", required: true },
      { key: "title", label: "Title", placeholder: "General Manager, Woodinville Sports Club", required: true },
      { key: "phone", label: "Direct Phone", placeholder: "(425) 555-0200", required: true },
      { key: "email", label: "Email Address", placeholder: "cmorgan@woodinvillesportsclub.com", required: true },
      { key: "linkedin", label: "LinkedIn URL (optional)", placeholder: "linkedin.com/in/caseymorgan", required: false },
    ],
  },
];

// ─── Brand tokens ─────────────────────────────────────────────────────────────

const BRAND_TOKENS = {
  tier1: {
    bg: "#0f1114",
    surface: "#1a1d21",
    border: "#3b82f6",
    accent: "#3b82f6",
    text: "#ffffff",
    subtext: "#a0a5ad",
    label: "TIER 1 PERFORMANCE",
    website: "tier1performance.com",
    tagline: "THE STANDARD IS THE STANDARD.",
    address: "Woodinville Sports Club · Woodinville, WA",
    badgeBg: "rgba(59,130,246,0.15)",
    badgeColor: "#3b82f6",
  },
  wsc: {
    bg: "#faf9f5",
    surface: "#f0ece4",
    border: "#0d1b2a",
    accent: "#0d1b2a",
    text: "#0e0a07",
    subtext: "#5a4f47",
    label: "WOODINVILLE SPORTS CLUB",
    website: "woodinvillesportsclub.com",
    tagline: "Elevate Your Game. Enrich Your Life.",
    address: "Woodinville, WA · A Caliber Sports Facility",
    badgeBg: "rgba(13,27,42,0.1)",
    badgeColor: "#0d1b2a",
  },
};

// ─── Signature Preview ────────────────────────────────────────────────────────

function SignaturePreview({
  template,
  values,
}: {
  template: SignatureTemplate;
  values: Record<string, string>;
}) {
  const t = BRAND_TOKENS[template.brand];
  const name = values.name || template.fields.find((f) => f.key === "name")!.placeholder;
  const title = values.title || template.fields.find((f) => f.key === "title")!.placeholder;
  const phone = values.phone || template.fields.find((f) => f.key === "phone")?.placeholder || "";
  const email = values.email || template.fields.find((f) => f.key === "email")!.placeholder;
  const certs = values.certifications || "";
  const linkedin = values.linkedin || "";

  return (
    <div
      style={{
        background: t.bg,
        border: `1px solid ${t.border}`,
        padding: "0",
        fontFamily: "Arial, sans-serif",
        maxWidth: "480px",
        overflow: "hidden",
      }}
    >
      {/* Top accent bar */}
      <div style={{ background: t.accent, height: "4px", width: "100%" }} />
      <div style={{ padding: "16px 20px" }}>
        {/* Name + title */}
        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "16px", color: t.text, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
            {name}
          </div>
          <div style={{ fontSize: "11px", color: t.subtext, marginTop: "2px", lineHeight: 1.4 }}>{title}</div>
          {certs && <div style={{ fontSize: "10px", color: t.subtext, marginTop: "2px", fontStyle: "italic" }}>{certs}</div>}
        </div>
        {/* Divider */}
        <div style={{ borderTop: `1px solid ${t.border}`, opacity: 0.2, marginBottom: "10px" }} />
        {/* Contact */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "10px" }}>
          {phone && (
            <div style={{ fontSize: "11px", color: t.subtext }}>
              <span style={{ color: t.accent, fontWeight: 700, marginRight: "6px" }}>P</span>{phone}
            </div>
          )}
          <div style={{ fontSize: "11px", color: t.subtext }}>
            <span style={{ color: t.accent, fontWeight: 700, marginRight: "6px" }}>E</span>{email}
          </div>
          <div style={{ fontSize: "11px", color: t.subtext }}>
            <span style={{ color: t.accent, fontWeight: 700, marginRight: "6px" }}>W</span>{t.website}
          </div>
          {linkedin && (
            <div style={{ fontSize: "11px", color: t.subtext }}>
              <span style={{ color: t.accent, fontWeight: 700, marginRight: "6px" }}>in</span>{linkedin}
            </div>
          )}
        </div>
        {/* Footer */}
        <div style={{ borderTop: `1px solid ${t.border}`, opacity: 0.15, marginBottom: "8px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: t.accent, fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>{t.label}</div>
            <div style={{ fontSize: "9px", color: t.subtext, marginTop: "1px" }}>{t.address}</div>
          </div>
          <div style={{ fontSize: "8px", color: t.subtext, fontStyle: "italic", textAlign: "right" }}>{t.tagline}</div>
        </div>
      </div>
    </div>
  );
}

// ─── HTML export ──────────────────────────────────────────────────────────────

function buildHtmlSignature(template: SignatureTemplate, values: Record<string, string>): string {
  const t = BRAND_TOKENS[template.brand];
  const name = values.name || template.fields.find((f) => f.key === "name")!.placeholder;
  const title = values.title || template.fields.find((f) => f.key === "title")!.placeholder;
  const phone = values.phone || template.fields.find((f) => f.key === "phone")?.placeholder || "";
  const email = values.email || template.fields.find((f) => f.key === "email")!.placeholder;
  const certs = values.certifications || "";
  const linkedin = values.linkedin || "";

  return `<!-- WSC / Tier 1 Email Signature — paste into Gmail/Outlook HTML signature editor -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:480px;">
  <tr><td style="background:${t.accent};height:4px;line-height:4px;font-size:1px;">&nbsp;</td></tr>
  <tr><td style="background:${t.bg};padding:16px 20px;">
    <p style="margin:0 0 2px;font-family:Oswald,Arial,sans-serif;font-weight:700;font-size:16px;color:${t.text};letter-spacing:-0.01em;">${name}</p>
    <p style="margin:0 0 ${certs ? "2px" : "10px"};font-size:11px;color:${t.subtext};">${title}</p>
    ${certs ? `<p style="margin:0 0 10px;font-size:10px;color:${t.subtext};font-style:italic;">${certs}</p>` : ""}
    <hr style="border:none;border-top:1px solid ${t.border};opacity:0.2;margin:0 0 10px;" />
    ${phone ? `<p style="margin:0 0 3px;font-size:11px;color:${t.subtext};"><span style="color:${t.accent};font-weight:700;margin-right:6px;">P</span>${phone}</p>` : ""}
    <p style="margin:0 0 3px;font-size:11px;color:${t.subtext};"><span style="color:${t.accent};font-weight:700;margin-right:6px;">E</span>${email}</p>
    <p style="margin:0 0 ${linkedin ? "3px" : "10px"};font-size:11px;color:${t.subtext};"><span style="color:${t.accent};font-weight:700;margin-right:6px;">W</span>${t.website}</p>
    ${linkedin ? `<p style="margin:0 0 10px;font-size:11px;color:${t.subtext};"><span style="color:${t.accent};font-weight:700;margin-right:6px;">in</span>${linkedin}</p>` : ""}
    <hr style="border:none;border-top:1px solid ${t.border};opacity:0.15;margin:0 0 8px;" />
    <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
      <td><p style="margin:0;font-size:9px;letter-spacing:0.14em;color:${t.accent};font-family:Oswald,Arial,sans-serif;font-weight:700;">${t.label}</p>
      <p style="margin:2px 0 0;font-size:9px;color:${t.subtext};">${t.address}</p></td>
      <td align="right"><p style="margin:0;font-size:8px;color:${t.subtext};font-style:italic;">${t.tagline}</p></td>
    </tr></table>
  </td></tr>
</table>`;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EmailSignatureTemplates() {
  const [activeId, setActiveId] = useState("tier1-coach");
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [showInstall, setShowInstall] = useState(false);

  const template = SIGNATURE_TEMPLATES.find((t) => t.id === activeId)!;
  const currentValues = values[activeId] ?? {};

  function handleChange(key: string, val: string) {
    setValues((prev) => ({ ...prev, [activeId]: { ...(prev[activeId] ?? {}), [key]: val } }));
  }

  function copyHtml() {
    const html = buildHtmlSignature(template, currentValues);
    navigator.clipboard.writeText(html).then(() =>
      toast.success("HTML signature copied — paste into Gmail/Outlook signature editor")
    );
  }

  function copyPlainText() {
    const t = BRAND_TOKENS[template.brand];
    const name = currentValues.name || template.fields.find((f) => f.key === "name")!.placeholder;
    const title = currentValues.title || template.fields.find((f) => f.key === "title")!.placeholder;
    const phone = currentValues.phone || template.fields.find((f) => f.key === "phone")?.placeholder || "";
    const email = currentValues.email || template.fields.find((f) => f.key === "email")!.placeholder;
    const certs = currentValues.certifications || "";
    const linkedin = currentValues.linkedin || "";
    const lines = [
      name,
      title,
      certs,
      "—",
      phone ? `P: ${phone}` : "",
      `E: ${email}`,
      `W: ${t.website}`,
      linkedin ? `in: ${linkedin}` : "",
      "—",
      t.label,
      t.address,
      t.tagline,
    ].filter(Boolean);
    navigator.clipboard.writeText(lines.join("\n")).then(() =>
      toast.success("Plain text signature copied")
    );
  }

  const tier1Templates = SIGNATURE_TEMPLATES.filter((t) => t.brand === "tier1");
  const wscTemplates = SIGNATURE_TEMPLATES.filter((t) => t.brand === "wsc");

  return (
    <div>
      <SectionHeader
        label="Content Production"
        title="Email Signature Templates"
        subtitle="Standardized HTML signature blocks for Tier 1 and WSC staff. Fill in your details, copy the HTML, and paste into your email client's signature editor."
      />

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "24px", alignItems: "flex-start" }}>
        {/* Left: template selector */}
        <div>
          {/* Tier 1 group */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "9px", letterSpacing: "0.16em", color: "#3b82f6", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "8px", padding: "0 2px" }}>
              TIER 1 PERFORMANCE
            </div>
            {tier1Templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: activeId === t.id ? "#22262b" : "#1a1d21",
                  border: activeId === t.id ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  borderLeft: activeId === t.id ? "3px solid #3b82f6" : "3px solid transparent",
                  padding: "10px 12px",
                  cursor: "pointer",
                  marginBottom: "4px",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontSize: "11px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: activeId === t.id ? "#e8e8e8" : "#a0a5ad", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {t.roleLabel}
                </div>
              </button>
            ))}
          </div>
          {/* WSC group */}
          <div>
            <div style={{ fontSize: "9px", letterSpacing: "0.16em", color: "#84786f", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "8px", padding: "0 2px" }}>
              WOODINVILLE SPORTS CLUB
            </div>
            {wscTemplates.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: activeId === t.id ? "#22262b" : "#1a1d21",
                  border: activeId === t.id ? "1px solid rgba(232,224,211,0.3)" : "1px solid rgba(255,255,255,0.06)",
                  borderLeft: activeId === t.id ? "3px solid #e8e0d3" : "3px solid transparent",
                  padding: "10px 12px",
                  cursor: "pointer",
                  marginBottom: "4px",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontSize: "11px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: activeId === t.id ? "#e8e8e8" : "#a0a5ad", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {t.roleLabel}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: editor + preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Template description */}
          <div style={{ background: "#22262b", border: "1px solid rgba(255,255,255,0.06)", padding: "14px 16px" }}>
            <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: template.brand === "tier1" ? "#3b82f6" : "#84786f", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "4px" }}>
              {template.brand === "tier1" ? "TIER 1 PERFORMANCE" : "WOODINVILLE SPORTS CLUB"} — {template.roleLabel.toUpperCase()}
            </div>
            <div style={{ fontSize: "12px", color: "#a0a5ad", lineHeight: 1.5 }}>{template.description}</div>
          </div>

          {/* Fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {template.fields.map((field) => (
              <div key={field.key} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "9px", letterSpacing: "0.12em", color: "#a0a5ad", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>
                  {field.label.toUpperCase()}{field.required && <span style={{ color: "#ef4444", marginLeft: "3px" }}>*</span>}
                </label>
                <input
                  type="text"
                  value={currentValues[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  style={{
                    background: "#1a1d21",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e8e8e8",
                    fontSize: "12px",
                    padding: "8px 10px",
                    fontFamily: "inherit",
                    outline: "none",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Preview */}
          <div>
            <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#a0a5ad", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "10px" }}>LIVE PREVIEW</div>
            <SignaturePreview template={template} values={currentValues} />
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={copyHtml}
              style={{
                background: template.brand === "tier1" ? "#3b82f6" : "#0d1b2a",
                border: "none",
                color: "#fff",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.1em",
                padding: "10px 20px",
                cursor: "pointer",
                flex: 1,
              }}
            >
              COPY HTML (GMAIL / OUTLOOK)
            </button>
            <button
              onClick={copyPlainText}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#a0a5ad",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.1em",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              COPY PLAIN TEXT
            </button>
          </div>
        </div>
      </div>

      {/* Install instructions */}
      <div
        style={{
          marginTop: "40px",
          background: "#22262b",
          border: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        <button
          onClick={() => setShowInstall(!showInstall)}
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
          <div style={{ fontSize: "11px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.14em", color: "#3b82f6" }}>
            HOW TO INSTALL YOUR SIGNATURE
          </div>
          <span style={{ color: "#3b82f6" }}>{showInstall ? "▲" : "▼"}</span>
        </button>
        {showInstall && (
          <div
            style={{
              padding: "0 20px 20px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              paddingTop: "20px",
            }}
          >
            {[
              {
                client: "Gmail",
                steps: [
                  "Open Gmail → Settings (gear icon) → See all settings",
                  "Scroll to the Signature section",
                  "Click 'Create new' and name it (e.g., 'Tier 1 Signature')",
                  "Click the '<>' source button in the signature editor",
                  "Paste the copied HTML code",
                  "Click 'Save Changes' at the bottom",
                ],
              },
              {
                client: "Outlook (Desktop)",
                steps: [
                  "Open Outlook → File → Options → Mail → Signatures",
                  "Click 'New' and name the signature",
                  "In the editor, click the HTML source button (or use Insert → Signature → Signatures)",
                  "Paste the copied HTML code",
                  "Set as default for New messages and Replies",
                  "Click OK to save",
                ],
              },
            ].map((inst) => (
              <div key={inst.client}>
                <div style={{ fontSize: "10px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.1em", color: "#e8e8e8", marginBottom: "10px" }}>
                  {inst.client}
                </div>
                {inst.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "11px", color: "#3b82f6", minWidth: "18px" }}>{i + 1}.</span>
                    <span style={{ fontSize: "11px", color: "#a0a5ad", lineHeight: 1.5 }}>{step}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
