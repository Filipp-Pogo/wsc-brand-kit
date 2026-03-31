/*
 * WSC & Tier 1 Performance — Brand Kit
 * Design: "The Performance Codex" — Dark-first, Tier 1 world, WSC warmth in specific sections
 * Nav: Fixed left sidebar (charcoal #1a1d21) with blue active indicators + search filter
 * Content: Full-width stacking sections, brand-accurate backgrounds per section
 * Features: Sidebar search, Brand Checklist tool, CSS Variables export (in ColorPalette)
 */

import { useState, useEffect, useRef } from "react";
import { LOGOS, CORE_VALUES, WE_ARE_WE_ARE_NOT } from "@/lib/brandData";
import BrandArchitecture from "@/components/sections/BrandArchitecture";
import ColorPalette from "@/components/sections/ColorPalette";
import Typography from "@/components/sections/Typography";
import LogoGallery from "@/components/sections/LogoGallery";
import VoiceConstants from "@/components/sections/VoiceConstants";
import ToneMatrix from "@/components/sections/ToneMatrix";
import MessagingPillars from "@/components/sections/MessagingPillars";
import Taglines from "@/components/sections/Taglines";
import ChannelGuidelines from "@/components/sections/ChannelGuidelines";
import SignageConcepts from "@/components/sections/SignageConcepts";
import Terminology from "@/components/sections/Terminology";
import AntiPatterns from "@/components/sections/AntiPatterns";
import InstagramGuidelines from "@/components/sections/InstagramGuidelines";
import SignageSystem from "@/components/sections/SignageSystem";
import EmailGuidelines from "@/components/sections/EmailGuidelines";
import BrandVoiceScorer from "@/components/sections/BrandVoiceScorer";
import CoBranding from "@/components/sections/CoBranding";
import BrandOnboardingQuiz from "@/components/sections/BrandOnboardingQuiz";
import ClaudeSystemPrompt from "@/components/sections/ClaudeSystemPrompt";
import VersionChangelog from "@/components/sections/VersionChangelog";
import QuickReferenceCard from "@/components/sections/QuickReferenceCard";
import ApprovalWorkflow from "@/components/sections/ApprovalWorkflow";
import OnboardingChecklist from "@/components/sections/OnboardingChecklist";
import EmailSignatureTemplates from "@/components/sections/EmailSignatureTemplates";
import PresentationTemplateGuide from "@/components/sections/PresentationTemplateGuide";
import BrandChecklist from "@/components/BrandChecklist";

const NAV_SECTIONS = [
  { id: "brand-architecture", label: "Brand Architecture", group: "Foundation" },
  { id: "core-values", label: "Core Values", group: "Foundation" },
  { id: "we-are", label: "We Are / We Are Not", group: "Foundation" },
  { id: "color-palette", label: "Color Palette", group: "Visual Identity" },
  { id: "typography", label: "Typography", group: "Visual Identity" },
  { id: "logos", label: "Logo Gallery", group: "Visual Identity" },
  { id: "signage", label: "Signage Concepts", group: "Visual Identity" },
  { id: "voice-constants", label: "Voice Constants", group: "Brand Voice" },
  { id: "tone-matrix", label: "Tone-by-Context Matrix", group: "Brand Voice" },
  { id: "messaging-pillars", label: "Messaging Pillars", group: "Brand Voice" },
  { id: "taglines", label: "Taglines & Vocabulary", group: "Brand Voice" },
  { id: "channel-guidelines", label: "Channel Guidelines", group: "Application" },
  { id: "terminology", label: "Terminology Guide", group: "Application" },
  { id: "anti-patterns", label: "Anti-Patterns", group: "Application" },
  { id: "instagram", label: "Instagram Guidelines", group: "Application" },
  { id: "signage-system", label: "Signage System", group: "Application" },
  { id: "email-guidelines", label: "Email Guidelines", group: "Application" },
  { id: "co-branding", label: "Co-Branding & Partnerships", group: "Governance" },
  { id: "approval-workflow", label: "Approval Workflow Guide", group: "Governance" },
  { id: "onboarding-checklist", label: "New Staff Onboarding", group: "Governance" },
  { id: "version-changelog", label: "Version Changelog", group: "Governance" },
  { id: "quick-reference", label: "Quick Reference Card", group: "Governance" },
  { id: "email-signatures", label: "Email Signature Templates", group: "Content Production" },
  { id: "presentation-guide", label: "Presentation Template Guide", group: "Content Production" },
  { id: "brand-onboarding-quiz", label: "Brand Onboarding Quiz", group: "Tools" },
  { id: "claude-system-prompt", label: "Claude System Prompt", group: "Tools" },
  { id: "voice-scorer", label: "Brand Voice Scorer", group: "Tools" },
];

const GROUPS = ["Foundation", "Visual Identity", "Brand Voice", "Application", "Governance", "Content Production", "Tools"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("brand-architecture");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
      setSidebarOpen(false);
      setSearchQuery("");
    }
  };

  // Filter nav sections by search query
  const filteredSections = searchQuery.trim()
    ? NAV_SECTIONS.filter((s) =>
        s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.group.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : NAV_SECTIONS;

  const filteredGroups = searchQuery.trim()
    ? Array.from(new Set(filteredSections.map((s) => s.group)))
    : GROUPS;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#1a1d21", color: "#e8e8e8" }}>
      {/* Brand Checklist Modal */}
      {showChecklist && <BrandChecklist onClose={() => setShowChecklist(false)} />}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col overflow-y-auto transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{
          width: "260px",
          backgroundColor: "#0f1114",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Sidebar Header */}
        <div className="p-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <img
            src={LOGOS.wsc.fullWhiteTransparent}
            alt="Woodinville Sports Club"
            className="h-8 w-auto mb-3"
            style={{ filter: "brightness(1)" }}
          />
          <div
            className="text-xs font-medium tracking-widest uppercase mt-2"
            style={{ color: "#3b82f6", fontFamily: "Inter, sans-serif", letterSpacing: "0.15em" }}
          >
            Brand Kit
          </div>
          <div className="text-xs mt-1" style={{ color: "#a0a5ad", fontFamily: "Inter, sans-serif" }}>
            Confidential — March 2026
          </div>
        </div>

        {/* Search bar */}
        <div className="px-4 pt-3 pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="relative">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a0a5ad"
              strokeWidth="2"
              style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#e8e8e8",
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                padding: "7px 10px 7px 30px",
                outline: "none",
                borderRadius: "0",
                transition: "border-color 150ms ease",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#a0a5ad",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 pb-4">
          {filteredSections.length === 0 ? (
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                color: "#a0a5ad",
                textAlign: "center",
                padding: "24px 8px",
              }}
            >
              No sections match "{searchQuery}"
            </div>
          ) : (
            filteredGroups.map((group) => {
              const groupSections = filteredSections.filter((s) => s.group === group);
              if (groupSections.length === 0) return null;
              return (
                <div key={group} className="mb-5">
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-2 px-2"
                    style={{ color: "#a0a5ad", fontFamily: "Inter, sans-serif", letterSpacing: "0.12em", fontSize: "10px" }}
                  >
                    {group}
                  </div>
                  {groupSections.map((section) => {
                    const isActive = activeSection === section.id;
                    // Highlight matching text
                    const label = section.label;
                    const query = searchQuery.trim();
                    let labelEl: React.ReactNode = label;
                    if (query) {
                      const idx = label.toLowerCase().indexOf(query.toLowerCase());
                      if (idx !== -1) {
                        labelEl = (
                          <>
                            {label.slice(0, idx)}
                            <mark style={{ backgroundColor: "rgba(59,130,246,0.3)", color: "#ffffff", padding: "0 1px" }}>
                              {label.slice(idx, idx + query.length)}
                            </mark>
                            {label.slice(idx + query.length)}
                          </>
                        );
                      }
                    }
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollTo(section.id)}
                        className="w-full text-left px-3 py-2 text-sm transition-all duration-150 block mb-0.5"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: isActive ? "#ffffff" : "#a0a5ad",
                          backgroundColor: isActive ? "rgba(59,130,246,0.12)" : "transparent",
                          borderLeft: isActive ? "3px solid #3b82f6" : "3px solid transparent",
                          borderRadius: "0",
                        }}
                      >
                        {labelEl}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </nav>

        {/* Brand Checklist button */}
        <div className="px-4 pb-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
          <button
            onClick={() => setShowChecklist(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-150"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#3b82f6",
              backgroundColor: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.2)",
              cursor: "pointer",
              borderRadius: "0",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(59,130,246,0.15)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(59,130,246,0.08)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.2)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            Brand Checklist
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-xs" style={{ color: "#a0a5ad", fontFamily: "Inter, sans-serif" }}>
            WSC & Tier 1 Performance
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[260px] min-w-0">
        {/* Top bar (mobile) */}
        <div
          className="lg:hidden sticky top-0 z-10 flex items-center justify-between px-4 py-3"
          style={{ backgroundColor: "#0f1114", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <img src={LOGOS.wsc.shortWhiteTransparent} alt="WSC" className="h-7 w-auto" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowChecklist(true)}
              className="p-2"
              style={{ color: "#3b82f6" }}
              title="Brand Checklist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
              style={{ color: "#e8e8e8" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hero Banner */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f1114 0%, #1a1d21 40%, #0d1b2a 100%)",
            borderBottom: "3px solid #3b82f6",
            padding: "80px 48px 60px",
          }}
        >
          {/* Background text */}
          <div
            className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none select-none overflow-hidden"
            style={{ opacity: 0.03 }}
          >
            <span
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(80px, 15vw, 200px)",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                color: "#ffffff",
                lineHeight: 1,
              }}
            >
              BRAND KIT
            </span>
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-6 mb-8 flex-wrap">
              <img src={LOGOS.wsc.fullWhiteTransparent} alt="Woodinville Sports Club" className="h-10 w-auto" />
              <div style={{ width: "1px", height: "40px", backgroundColor: "rgba(255,255,255,0.2)" }} />
              <img src={LOGOS.tier1.white} alt="Tier 1 Performance" className="h-10 w-auto" />
            </div>

            <h1
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(36px, 5vw, 64px)",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                color: "#ffffff",
                lineHeight: 1.05,
                marginBottom: "16px",
              }}
            >
              Brand Voice
              <br />
              <span style={{ color: "#3b82f6" }}>Guidelines</span>
            </h1>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                color: "#a0a5ad",
                maxWidth: "560px",
                lineHeight: 1.6,
                marginBottom: "24px",
              }}
            >
              The complete guide to how Tier 1 Performance and Woodinville Sports Club speak, write, and present — across every channel, surface, and interaction.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { label: "Tier 1 Performance", color: "#1a1d21", border: "#3b82f6", text: "#3b82f6" },
                { label: "Woodinville Sports Club", color: "#0d1b2a", border: "rgba(255,255,255,0.2)", text: "#e8e8e8" },
                { label: "Confidential — March 2026", color: "transparent", border: "rgba(255,255,255,0.1)", text: "#a0a5ad" },
              ].map((tag) => (
                <span
                  key={tag.label}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    padding: "4px 12px",
                    backgroundColor: tag.color,
                    border: `1px solid ${tag.border}`,
                    color: tag.text,
                    letterSpacing: "0.05em",
                  }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div>
          <section id="brand-architecture">
            <BrandArchitecture />
          </section>
          <section id="core-values">
            <CoreValuesSection />
          </section>
          <section id="we-are">
            <WeAreSection />
          </section>
          <section id="color-palette">
            <ColorPalette />
          </section>
          <section id="typography">
            <Typography />
          </section>
          <section id="logos">
            <LogoGallery />
          </section>
          <section id="signage">
            <SignageConcepts />
          </section>
          <section id="voice-constants">
            <VoiceConstants />
          </section>
          <section id="tone-matrix">
            <ToneMatrix />
          </section>
          <section id="messaging-pillars">
            <MessagingPillars />
          </section>
          <section id="taglines">
            <Taglines />
          </section>
          <section id="channel-guidelines">
            <ChannelGuidelines />
          </section>
          <section id="terminology">
            <Terminology />
          </section>
          <section id="anti-patterns">
            <AntiPatterns />
          </section>
          <section id="instagram">
            <InstagramGuidelines />
          </section>
          <section id="signage-system">
            <SignageSystem />
          </section>
          <section id="email-guidelines">
            <EmailGuidelines />
          </section>
          <section id="co-branding">
            <CoBranding />
          </section>
          <section id="approval-workflow">
            <ApprovalWorkflow />
          </section>
          <section id="onboarding-checklist">
            <OnboardingChecklist />
          </section>
          <section id="version-changelog">
            <VersionChangelog />
          </section>
          <section id="quick-reference">
            <QuickReferenceCard />
          </section>
          <section id="email-signatures">
            <EmailSignatureTemplates />
          </section>
          <section id="presentation-guide">
            <PresentationTemplateGuide />
          </section>
          <section id="brand-onboarding-quiz">
            <BrandOnboardingQuiz />
          </section>

          <section id="claude-system-prompt">
            <ClaudeSystemPrompt />
          </section>
          <section id="voice-scorer">
            <BrandVoiceScorer />
          </section>
        </div>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: "#0f1114",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "32px 48px",
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={LOGOS.wsc.shortWhiteTransparent} alt="WSC" className="h-6 w-auto" />
              <span style={{ color: "#a0a5ad", fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
                WSC & Tier 1 Performance
              </span>
            </div>
            <div style={{ color: "#a0a5ad", fontFamily: "Inter, sans-serif", fontSize: "12px" }}>
              Confidential — March 2026 · Internal Use Only
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Inline Core Values section
function CoreValuesSection() {
  return (
    <div style={{ backgroundColor: "#1a1d21", padding: "80px 48px" }}>
      <SectionHeader
        label="02 — Foundation"
        title="Core Values"
        subtitle="These apply to both Tier 1 and WSC. Every piece of content — in any channel, for any audience — must be traceable back to at least one of these values."
        dark
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 max-w-6xl">
        {CORE_VALUES.map((v: any) => (
          <div
            key={v.value}
            className="p-6"
            style={{
              backgroundColor: "#22262b",
              borderTop: "3px solid #3b82f6",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                color: "#ffffff",
                marginBottom: "10px",
              }}
            >
              {v.value}
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#a0a5ad", lineHeight: 1.65 }}>
              {v.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline We Are / We Are Not section
function WeAreSection() {
  return (
    <div style={{ backgroundColor: "#0d1b2a", padding: "80px 48px" }}>
      <SectionHeader
        label="03 — Foundation"
        title="We Are / We Are Not"
        subtitle="This table is the core identity anchor. Use it to evaluate any piece of content, copy, or communication before it goes out."
        dark
      />
      <div className="mt-10 max-w-6xl overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#3b82f6",
                  padding: "12px 20px",
                  textAlign: "left",
                  backgroundColor: "rgba(59,130,246,0.1)",
                  borderBottom: "2px solid #3b82f6",
                  width: "50%",
                }}
              >
                We Are
              </th>
              <th
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#ef4444",
                  padding: "12px 20px",
                  textAlign: "left",
                  backgroundColor: "rgba(239,68,68,0.08)",
                  borderBottom: "2px solid #ef4444",
                  width: "50%",
                }}
              >
                We Are Not
              </th>
            </tr>
          </thead>
          <tbody>
            {WE_ARE_WE_ARE_NOT.map((row: any, i: number) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td
                  style={{
                    padding: "14px 20px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#e8e8e8",
                    lineHeight: 1.55,
                    backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                  }}
                >
                  {row.weAre}
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#a0a5ad",
                    lineHeight: 1.55,
                    backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                  }}
                >
                  {row.weAreNot}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SectionHeader({
  label,
  title,
  subtitle,
  dark = true,
}: {
  label: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#3b82f6",
          marginBottom: "12px",
        }}
      >
        {label}
      </div>
      <h2
        style={{
          fontFamily: "Oswald, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(28px, 4vw, 48px)",
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          color: dark ? "#ffffff" : "#0e0a07",
          lineHeight: 1.05,
          marginBottom: subtitle ? "16px" : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "15px",
            color: dark ? "#a0a5ad" : "#4b4038",
            lineHeight: 1.65,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
