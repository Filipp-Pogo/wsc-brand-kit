/**
 * SignageSystem — Comprehensive campus signage creation guide
 * Design: "The Performance Codex"
 *
 * Brand assignment rule:
 *   TIER 1  = academy program, athletes, APL, performance training, coaching staff
 *   WSC     = physical campus, facilities, membership, general public, events
 *   SHARED  = campus-wide policy that applies to all users regardless of program
 *
 * Covers all major sign types across the 67-acre WSC campus.
 * Includes the full Reserved Bay Signs (formerly a standalone section).
 */

import { useState } from "react";
import { SectionHeader } from "@/pages/Home";
import { toast } from "sonner";

// ─── Types ──────────────────────────────────────────────────────────────────

interface SignTemplate {
  id: string;
  name: string;
  brand: "tier1" | "wsc" | "shared";
  format: string;
  size: string;
  material: string;
  defaultLines: string[];
  editableLines: boolean[];
  notes: string;
  vendorSpec: string;
  brandRationale: string; // explains WHY this brand owns this sign
  vendorType: "door-placard" | "a-frame" | "wall-panel" | "large-format" | "retractable-banner";
}

interface SignCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
  signs: SignTemplate[];
}

// ─── Brand Tokens ────────────────────────────────────────────────────────────

function getBrandTokens(brand: "tier1" | "wsc" | "shared") {
  if (brand === "tier1") {
    return {
      bg: "#1a1d21",
      surface: "#22262b",
      accent: "#3b82f6",
      accentDim: "rgba(59,130,246,0.15)",
      textPrimary: "#e8e8e8",
      textMuted: "#a0a5ad",
      border: "rgba(255,255,255,0.08)",
      brandLine: "TIER 1 PERFORMANCE",
      badgeLabel: "TIER 1",
      badgeColor: "#3b82f6",
      noteBg: "#172554",
      noteBorder: "#3b82f6",
      noteText: "#3b82f6",
      specBg: "#0d1117",
      accentBar: "#3b82f6",
    };
  }
  if (brand === "wsc") {
    return {
      bg: "#e8e0d3",
      surface: "#faf9f5",
      accent: "#0d1b2a",
      accentDim: "rgba(13,27,42,0.08)",
      textPrimary: "#0e0a07",
      textMuted: "#4b4038",
      border: "rgba(14,10,7,0.12)",
      brandLine: "WOODINVILLE SPORTS CLUB",
      badgeLabel: "WSC",
      badgeColor: "#0d1b2a",
      noteBg: "#ded6c9",
      noteBorder: "#0d1b2a",
      noteText: "#0d1b2a",
      specBg: "#d4ccc0",
      accentBar: "#0d1b2a",
    };
  }
  // shared — neutral dark
  return {
    bg: "#16191d",
    surface: "#1e2126",
    accent: "#a0a5ad",
    accentDim: "rgba(160,165,173,0.12)",
    textPrimary: "#e8e8e8",
    textMuted: "#a0a5ad",
    border: "rgba(255,255,255,0.07)",
    brandLine: "WOODINVILLE SPORTS CLUB",
    badgeLabel: "SHARED",
    badgeColor: "#a0a5ad",
    noteBg: "#1a1d21",
    noteBorder: "#a0a5ad",
    noteText: "#a0a5ad",
    specBg: "#0d0f11",
    accentBar: "#a0a5ad",
  };
}

// ─── Sign Data ───────────────────────────────────────────────────────────────

const SIGN_CATEGORIES: SignCategory[] = [
  // ── 1. RESERVED / IN-USE ──────────────────────────────────────────────────
  {
    id: "reserved",
    label: "Reserved / In-Use",
    description:
      "Temporary signs placed before sessions to designate reserved courts, bays, and spaces. Printed on durable stock or coroplast. Reused weekly. Brand is determined by WHO is reserving the space — academy program = Tier 1, member/facility = WSC.",
    icon: "🚫",
    signs: [
      // ── TIER 1 reserved signs ──
      {
        id: "golf-bay-reserved-placard",
        name: "Golf Bay Reserved — Door Placard",
        brand: "tier1",
        vendorType: "door-placard",
        format: "Door Placard (5\"×7\")",
        size: "5\" × 7\"",
        material: "Brushed aluminium panel, UV print, wall-mount hardware",
        defaultLines: ["TIER 1 ACADEMY", "GOLF BAY RESERVED", "BAY", "1"],
        editableLines: [false, false, false, true],
        notes:
          "Change bay number only. Mounted directly on the bay door or divider post at eye level. Place 30–60 min before session begins.",
        vendorSpec:
          "5×7\" brushed aluminium, UV direct print, matte finish, double-sided tape or magnetic strip mount. 300 DPI · CMYK · no bleed required.",
        brandRationale:
          "Golf bays are Tier 1 Academy training spaces. The academy program — not the facility — owns this reservation.",
      },
      {
        id: "golf-bay-reserved-aframe",
        name: "Golf Bay Reserved — A-Frame",
        brand: "tier1",
        vendorType: "a-frame",
        format: "A-Frame / Stake Post (12\"×18\")",
        size: "12\" × 18\"",
        material: "Coroplast 4mm insert in standard A-frame stand",
        defaultLines: ["TIER 1 ACADEMY", "GOLF BAY RESERVED", "BAY", "1"],
        editableLines: [false, false, false, true],
        notes:
          "Change bay number only. Place at the bay entrance or aisle. Visible from 20+ feet. Used for high-traffic or outdoor bay areas.",
        vendorSpec:
          "Coroplast 4mm, full-bleed print, matte laminate. 300 DPI · CMYK · 0.125\" bleed on all sides. A-frame stand or ground stake.",
        brandRationale:
          "Large-format version of the door placard for high-visibility bay entrances. Academy program owns this space.",
      },
      {
        id: "tennis-court-reserved",
        name: "Tennis Court Reserved — Academy",
        brand: "tier1",
        vendorType: "a-frame",
        format: "A-Frame / Door Placard",
        size: "12\"×18\" A-Frame  |  5\"×7\" Door Placard",
        material: "Coroplast (A-Frame) / Brushed aluminum (Placard)",
        defaultLines: ["TIER 1 ACADEMY", "COURT RESERVED", "COURT", "3"],
        editableLines: [false, false, false, true],
        notes:
          "Change court number only. Use for all Tier 1 academy training blocks. Do not use this sign for member or recreational court reservations — use the WSC Court Reserved sign instead.",
        vendorSpec:
          "Coroplast 4mm, full-bleed print, matte laminate. Placard: 5×7\" brushed aluminum, UV print.",
        brandRationale:
          "Academy training sessions on WSC courts are Tier 1 program time. The academy brand identifies the reservation, not the facility.",
      },
      {
        id: "apl-reserved",
        name: "APL — Private Session In Progress",
        brand: "tier1",
        vendorType: "door-placard",
        format: "Door Placard",
        size: "5\" × 7\"",
        material: "Brushed aluminum, UV print, wall-mount hardware",
        defaultLines: ["ATHLETIC PERFORMANCE LAB", "PRIVATE SESSION", "IN PROGRESS"],
        editableLines: [false, false, false],
        notes:
          "Fixed text — no editable fields. Used when the APL (Strength & Conditioning facility) is closed for a private training session. The APL is a Tier 1 sub-brand facility.",
        vendorSpec:
          "5×7\" brushed aluminum, UV print, wall-mount hardware included.",
        brandRationale:
          "The APL (Athletic Performance Lab) is a Tier 1 sub-brand. All APL signage uses Tier 1 identity.",
      },
      // ── WSC reserved signs ──
      {
        id: "wsc-court-reserved",
        name: "Court Reserved — Member / Recreational",
        brand: "wsc",
        vendorType: "a-frame",
        format: "A-Frame",
        size: "12\" × 18\"",
        material: "Coroplast 4mm, matte laminate",
        defaultLines: ["WOODINVILLE SPORTS CLUB", "COURT RESERVED", "COURT", "5"],
        editableLines: [false, false, false, true],
        notes:
          "WSC warm palette. Used for member reservations and club events — NOT for Tier 1 academy training. If a Tier 1 session is on the court, use the Tier 1 Tennis Court Reserved sign instead.",
        vendorSpec:
          "Coroplast 4mm, full-bleed print, matte laminate. WSC warm parchment palette.",
        brandRationale:
          "Recreational and member court bookings are WSC facility operations, not academy programming.",
      },
      {
        id: "fitness-reserved",
        name: "Fitness Center — Reserved",
        brand: "wsc",
        vendorType: "door-placard",
        format: "Door Placard",
        size: "5\" × 7\"",
        material: "Brushed aluminum, UV print, wall-mount hardware",
        defaultLines: ["FITNESS CENTER", "RESERVED", "PRIVATE SESSION"],
        editableLines: [false, false, false],
        notes:
          "Fixed text. Used for private training sessions in the WSC fitness center. The fitness center is a WSC facility — not an academy space.",
        vendorSpec:
          "5×7\" brushed aluminum, UV print, wall-mount hardware included.",
        brandRationale:
          "The fitness center is a WSC campus facility open to members. It is not a Tier 1 program space.",
      },
    ],
  },

  // ── 2. ZONE / PROGRAM ID ──────────────────────────────────────────────────
  {
    id: "zone-id",
    label: "Zone / Program ID",
    description:
      "Permanent or semi-permanent signs that identify spaces, programs, and facilities. Mounted at entrances, on doors, and above key areas. Tier 1 signs identify academy program zones. WSC signs identify campus facilities and member spaces.",
    icon: "📍",
    signs: [
      // ── TIER 1 zone signs ──
      {
        id: "tier1-academy-entrance",
        name: "Tier 1 Performance Academy — Entrance",
        brand: "tier1",
        vendorType: "large-format",
        format: "Wall Panel / Overhead Banner",
        size: "24\"\u00d712\" Wall Panel  |  36\"\u00d712\" Overhead Banner",
        material: "Dibond 3mm aluminum composite, UV print, standoff hardware",
        defaultLines: ["TIER 1 PERFORMANCE", "ACADEMY"],
        editableLines: [false, false],
        notes:
          "Primary academy entrance identification. No editable fields — contact marketing for any wording changes. Installed once; not a temporary sign.",
        vendorSpec:
          "Dibond 3mm aluminum composite, UV direct print, matte finish. Standoff hardware included.",
        brandRationale:
          "This is the entry point to the Tier 1 academy program. The performance brand leads — not WSC.",
      },
      {
        id: "tier1-entrance-banner",
        name: "Tier 1 Academy — Entrance Banner",
        brand: "tier1",
        vendorType: "large-format",
        format: "Large-Format Entrance Banner (24\"\u00d736\")",
        size: "24\" \u00d7 36\" (portrait)",
        material: "Dibond 3mm aluminum composite, UV print, matte finish, standoff hardware",
        defaultLines: ["TIER 1 PERFORMANCE", "ACADEMY", "TRAIN WITHOUT LIMITS"],
        editableLines: [false, false, false],
        notes:
          "Large-format portrait banner for the academy entrance lobby or main corridor. Tier 1 cold dark palette. Fixed text — do not alter wording or substitute WSC branding. Counterpart to the WSC Welcome Banner.",
        vendorSpec:
          "24\u00d736\" Dibond 3mm aluminum composite. Full-bleed UV print. Matte finish. Standoff hardware (4\u00d7). Bleed: 0.125\". Safe zone: 0.25\" from edge. Color profile: CMYK. Resolution: 150 dpi minimum at final size.",
        brandRationale:
          "The academy entrance banner sets the performance tone the moment an athlete, parent, or college coach walks in. WSC branding here would dilute the elite identity the academy is built on.",
      },
      {
        id: "apl-entrance",
        name: "Athletic Performance Lab (APL) — Entrance",
        brand: "tier1",
        vendorType: "wall-panel",
        format: "Wall Panel / Door Sign",
        size: "18\"×9\" Wall Panel  |  5\"×7\" Door Placard",
        material: "Dibond aluminum composite / Brushed aluminum",
        defaultLines: ["ATHLETIC PERFORMANCE LAB", "TIER 1 PERFORMANCE"],
        editableLines: [false, false],
        notes:
          "Fixed text. Identifies the S&C (Strength & Conditioning) facility entrance. The APL is a Tier 1 sub-brand — do not use WSC palette here.",
        vendorSpec:
          "Dibond 3mm, UV print, matte finish. Door placard: 5×7\" brushed aluminum.",
        brandRationale:
          "The APL is a dedicated Tier 1 sub-brand facility. WSC branding would misrepresent the space as a general fitness area.",
      },
      {
        id: "golf-academy-zone",
        name: "Golf Academy Zone — Bay Range",
        brand: "tier1",
        vendorType: "wall-panel",
        format: "Wall Panel",
        size: "24\" × 12\"",
        material: "Dibond 3mm aluminum composite, UV print, standoff hardware",
        defaultLines: ["TIER 1 GOLF ACADEMY", "BAYS 1–8"],
        editableLines: [false, true],
        notes:
          "Update the bay range field if the layout changes. Contact marketing before reprinting — this is a permanent installation.",
        vendorSpec:
          "Dibond 3mm, UV print, matte finish, standoff hardware.",
        brandRationale:
          "Golf bays are Tier 1 Academy training infrastructure. The academy brand identifies the zone.",
      },
      {
        id: "tennis-academy-zone",
        name: "Tennis Academy Zone — Court Range",
        brand: "tier1",
        vendorType: "wall-panel",
        format: "Wall Panel",
        size: "24\" × 12\"",
        material: "Dibond 3mm aluminum composite, UV print, standoff hardware",
        defaultLines: ["TIER 1 TENNIS ACADEMY", "COURTS 1–6"],
        editableLines: [false, true],
        notes:
          "Update the court range field if the layout changes. Contact marketing before reprinting.",
        vendorSpec:
          "Dibond 3mm, UV print, matte finish, standoff hardware.",
        brandRationale:
          "Courts designated for academy training are Tier 1 program zones, even though they sit on WSC property.",
      },
      // ── WSC zone signs ──
      {
        id: "wsc-welcome",
        name: "Welcome to WSC — Entrance Banner",
        brand: "wsc",
        vendorType: "large-format",
        format: "Large-Format Entrance Banner (24\"×36\")",
        size: "24\" × 36\" (portrait)",
        material: "Dibond 3mm aluminum composite, UV print, matte laminate, standoff hardware",
        defaultLines: ["WELCOME TO", "WOODINVILLE\nSPORTS CLUB", "Elevate Your Game.\nEnrich Your Life.", "WOODINVILLE, WA"],
        editableLines: [false, false, false, false],
        notes:
          "Large-format entrance banner. WSC warm parchment palette. Mounted at main campus entrance and lobby. Fixed text — do not alter wording or substitute Tier 1 branding. This is the campus identity sign.",
        vendorSpec:
          "24×36\" Dibond 3mm aluminum composite. Full-bleed UV print. Matte laminate finish. Standoff hardware (4×). Bleed: 0.125\". Safe zone: 0.25\" from edge. Color profile: CMYK. Resolution: 150 dpi minimum at final size.",
        brandRationale:
          "The main campus entrance represents WSC as the host facility for all members, families, and visitors. Tier 1 is a program within WSC — the entrance sign must reflect the campus identity, not the academy.",
      },
      {
        id: "fitness-center-id",
        name: "Fitness Center — Entrance ID",
        brand: "wsc",
        vendorType: "wall-panel",
        format: "Wall Panel / Door Sign",
        size: "18\"×9\" Wall Panel  |  5\"×7\" Door Placard",
        material: "Dibond aluminum composite / Brushed aluminum",
        defaultLines: ["FITNESS CENTER", "WOODINVILLE SPORTS CLUB"],
        editableLines: [false, false],
        notes:
          "WSC warm palette. Identifies the fitness center entrance. The fitness center is a WSC facility — do not use Tier 1 branding here.",
        vendorSpec:
          "Dibond 3mm, UV print, matte finish. Door placard: 5×7\" brushed aluminum.",
        brandRationale:
          "The fitness center serves all WSC members, not exclusively Tier 1 athletes. WSC brand is correct.",
      },
      {
        id: "pro-shop-id",
        name: "Pro Shop / Member Services",
        brand: "wsc",
        vendorType: "wall-panel",
        format: "Wall Panel / Door Sign",
        size: "18\"×9\" Wall Panel  |  5\"×7\" Door Placard",
        material: "Dibond aluminum composite / Brushed aluminum",
        defaultLines: ["PRO SHOP", "MEMBER SERVICES"],
        editableLines: [false, false],
        notes:
          "WSC warm palette. Identifies the pro shop and member services desk. Fixed text.",
        vendorSpec:
          "Dibond 3mm, UV print, matte finish. Door placard: 5×7\" brushed aluminum.",
        brandRationale:
          "The pro shop and member services are WSC campus operations, not academy programming.",
      },
      {
        id: "locker-room-id",
        name: "Locker Rooms — Entrance ID",
        brand: "wsc",
        vendorType: "door-placard",
        format: "Door Sign",
        size: "5\" × 7\" Door Placard",
        material: "Brushed aluminum, UV print",
        defaultLines: ["LOCKER ROOMS", "WOODINVILLE SPORTS CLUB"],
        editableLines: [false, false],
        notes:
          "WSC warm palette. Fixed text. Used on locker room doors throughout the campus.",
        vendorSpec:
          "5×7\" brushed aluminum, UV print, wall-mount hardware.",
        brandRationale:
          "Locker rooms are shared campus facilities for all members and athletes. WSC is the correct brand.",
      },
    ],
  },

  // ── 3. WAYFINDING / DIRECTIONAL ───────────────────────────────────────────
  {
    id: "wayfinding",
    label: "Wayfinding / Directional",
    description:
      "Signs that guide members, athletes, and visitors to key areas across the 67-acre campus. Arrow direction is editable. Most wayfinding is WSC-branded because it serves all campus users — Tier 1 directional signs are used only when pointing specifically to academy program spaces.",
    icon: "➡️",
    signs: [
      // ── WSC directional signs ──
      {
        id: "courts-directional",
        name: "Courts — Directional",
        brand: "wsc",
        vendorType: "wall-panel",
        format: "Wall-Mount / Post Sign",
        size: "18\"×6\" Wall-Mount  |  12\"×4\" Post Sign",
        material: "Dibond 3mm aluminum composite, UV print",
        defaultLines: ["COURTS 1–6", "→"],
        editableLines: [true, true],
        notes:
          "Edit court range and arrow direction (→ ← ↑ ↓). Used throughout the campus for all visitors and members. WSC brand — courts are campus property.",
        vendorSpec:
          "Dibond 3mm, UV print, matte finish. Post sign: includes stake hardware.",
        brandRationale:
          "Campus wayfinding serves all users. Courts are WSC property. General directional signs use WSC brand.",
      },
      {
        id: "fitness-directional",
        name: "Fitness Center — Directional",
        brand: "wsc",
        vendorType: "wall-panel",
        format: "Wall-Mount",
        size: "18\" × 6\"",
        material: "Dibond 3mm aluminum composite, UV print",
        defaultLines: ["FITNESS CENTER", "→"],
        editableLines: [false, true],
        notes:
          "Edit arrow direction only. The fitness center is a WSC facility — WSC brand is correct.",
        vendorSpec:
          "Dibond 3mm, UV print, matte finish.",
        brandRationale:
          "Fitness center is a WSC campus facility open to all members.",
      },
      {
        id: "pro-shop-directional",
        name: "Pro Shop / Front Desk — Directional",
        brand: "wsc",
        vendorType: "wall-panel",
        format: "Wall-Mount",
        size: "18\" × 6\"",
        material: "Dibond 3mm aluminum composite, UV print",
        defaultLines: ["PRO SHOP / FRONT DESK", "←"],
        editableLines: [true, true],
        notes:
          "Edit text and arrow direction. Can split into two separate signs if needed. WSC brand — serves all campus visitors.",
        vendorSpec:
          "Dibond 3mm, UV print, matte finish.",
        brandRationale:
          "The front desk and pro shop are WSC member-facing operations.",
      },
      {
        id: "locker-room-directional",
        name: "Locker Rooms — Directional",
        brand: "wsc",
        vendorType: "wall-panel",
        format: "Wall-Mount",
        size: "18\" × 6\"",
        material: "Dibond 3mm aluminum composite, UV print",
        defaultLines: ["LOCKER ROOMS", "↓"],
        editableLines: [false, true],
        notes:
          "Edit arrow direction only. Text is fixed. Serves all campus users.",
        vendorSpec:
          "Dibond 3mm, UV print, matte finish.",
        brandRationale:
          "Locker rooms are shared campus facilities. WSC brand is correct for general wayfinding.",
      },
      // ── TIER 1 directional signs ──
      {
        id: "apl-directional",
        name: "Athletic Performance Lab — Directional",
        brand: "tier1",
        vendorType: "wall-panel",
        format: "Wall-Mount",
        size: "18\" × 6\"",
        material: "Dibond 3mm aluminum composite, UV print",
        defaultLines: ["ATHLETIC PERFORMANCE LAB", "↑"],
        editableLines: [false, true],
        notes:
          "Edit arrow direction only. APL name is fixed — do not abbreviate or alter. This is the only Tier 1 directional sign because the APL is a dedicated academy facility.",
        vendorSpec:
          "Dibond 3mm, UV print, matte finish.",
        brandRationale:
          "The APL is a Tier 1 sub-brand facility. Pointing to it uses Tier 1 identity to signal that this is an academy space, not a general fitness area.",
      },
      {
        id: "tier1-academy-directional",
        name: "Tier 1 Academy — Directional",
        brand: "tier1",
        vendorType: "wall-panel",
        format: "Wall-Mount / Post Sign",
        size: "18\"×6\" Wall-Mount  |  12\"×4\" Post Sign",
        material: "Dibond 3mm aluminum composite, UV print",
        defaultLines: ["TIER 1 ACADEMY", "→"],
        editableLines: [false, true],
        notes:
          "Edit arrow direction only. Used to direct athletes and families to the academy entrance from the main campus. Tier 1 brand signals this is a program destination, not a general facility.",
        vendorSpec:
          "Dibond 3mm, UV print, matte finish. Post sign: includes stake hardware.",
        brandRationale:
          "Directing people to the academy program uses Tier 1 identity to distinguish it from general WSC facilities.",
      },
    ],
  },

  // ── 4. RULES / POLICY ─────────────────────────────────────────────────────
  {
    id: "rules-policy",
    label: "Rules / Policy",
    description:
      "Signs that communicate facility rules, access restrictions, and conduct policies. Tone is direct and clear — not apologetic. Brand is determined by WHO enforces the policy: academy staff = Tier 1, facility management = WSC, campus-wide = Shared.",
    icon: "📋",
    signs: [
      // ── TIER 1 policy signs ──
      {
        id: "coaching-staff-only",
        name: "Coaching Staff Only",
        brand: "tier1",
        vendorType: "door-placard",
        format: "Door Placard",
        size: "5\" × 7\"",
        material: "Brushed aluminum, UV print, wall-mount hardware",
        defaultLines: ["COACHING STAFF ONLY", "TIER 1 PERFORMANCE"],
        editableLines: [false, false],
        notes:
          "Fixed text. Used on staff rooms, equipment storage, and restricted access areas within the academy. Tier 1 brand signals this is academy-controlled space.",
        vendorSpec:
          "5×7\" brushed aluminum, UV print, wall-mount hardware.",
        brandRationale:
          "Coaching staff restrictions are enforced by Tier 1 academy management, not WSC facility operations.",
      },
      {
        id: "apl-athletes-only",
        name: "APL — Tier 1 Athletes Only",
        brand: "tier1",
        vendorType: "door-placard",
        format: "Door Placard / Wall Panel",
        size: "5\"×7\" Door Placard  |  8.5\"×11\" Wall Panel",
        material: "Brushed aluminum / Foam board",
        defaultLines: ["ATHLETIC PERFORMANCE LAB", "TIER 1 ATHLETES ONLY", "AUTHORIZED ENTRY"],
        editableLines: [false, false, false],
        notes:
          "Fixed text. Restricts APL access to enrolled Tier 1 athletes only. This is an academy policy, not a facility rule.",
        vendorSpec:
          "Placard: 5×7\" brushed aluminum. Panel: foam board 5mm, matte laminate.",
        brandRationale:
          "The APL is a Tier 1 program space. Access restrictions are set by the academy, not by WSC facility management.",
      },
      // ── WSC policy signs ──
      {
        id: "members-only",
        name: "Members Only",
        brand: "wsc",
        vendorType: "door-placard",
        format: "Door Placard",
        size: "5\" × 7\"",
        material: "Brushed aluminum, UV print, wall-mount hardware",
        defaultLines: ["MEMBERS ONLY", "WOODINVILLE SPORTS CLUB"],
        editableLines: [false, false],
        notes:
          "WSC warm palette. Fixed text. Used on member-exclusive areas such as the member lounge, private courts, and restricted facilities.",
        vendorSpec:
          "5×7\" brushed aluminum, UV print, wall-mount hardware.",
        brandRationale:
          "WSC membership is a facility-level relationship. Member-only access is a WSC policy, not an academy rule.",
      },
      // ── SHARED policy signs ──
      {
        id: "no-unauthorized-coaching",
        name: "No Unauthorized Coaching",
        brand: "shared",
        vendorType: "wall-panel",
        format: "Wall Panel",
        size: "8.5\" × 11\"",
        material: "Foam board 5mm, matte laminate",
        defaultLines: ["NO UNAUTHORIZED", "COACHING ON COURTS", "WSC POLICY"],
        editableLines: [false, false, false],
        notes:
          "Shared brand — neutral dark palette. Fixed text. Post at all court entrances. This policy applies to all courts regardless of whether they are in use by Tier 1 or WSC members.",
        vendorSpec:
          "8.5×11\" foam board 5mm, matte laminate, adhesive back or frame mount.",
        brandRationale:
          "This is a campus-wide court policy that applies to all users — Tier 1 athletes, WSC members, and visitors alike. Neither brand alone owns this rule.",
      },
    ],
  },

  // ── 5. EVENT / TEMPORARY ──────────────────────────────────────────────────
  {
    id: "event-temp",
    label: "Event / Temporary",
    description:
      "Short-run signs for tournaments, special events, and temporary closures. Printed on foam board or banner material. Discarded after use. Brand follows the event host: WSC-hosted events = WSC brand, Tier 1 academy events = Tier 1 brand.",
    icon: "🏆",
    signs: [
      // ── WSC event signs ──
      {
        id: "tournament-check-in",
        name: "Tournament Check-In",
        brand: "wsc",
        vendorType: "a-frame",
        format: "A-Frame / Foam Board",
        size: "18\" × 24\"",
        material: "Foam board 5mm, matte laminate",
        defaultLines: ["TOURNAMENT CHECK-IN", "WSC OPEN", "→ COURT 1"],
        editableLines: [false, true, true],
        notes:
          "Edit event name and direction. Short-run print — discard after event. WSC hosts campus tournaments open to members and the public.",
        vendorSpec:
          "Foam board 5mm, matte laminate. Short-run digital print. Discard after event.",
        brandRationale:
          "WSC-hosted tournaments are campus events. The club brand leads, not the academy.",
      },
      {
        id: "court-closed-event",
        name: "Court / Bay Closed — Event",
        brand: "wsc",
        vendorType: "a-frame",
        format: "A-Frame",
        size: "12\" × 18\"",
        material: "Coroplast 4mm, matte laminate",
        defaultLines: ["CLOSED FOR", "SPECIAL EVENT", "REOPENS AT", "5:00 PM"],
        editableLines: [false, true, false, true],
        notes:
          "Edit event description and reopen time. Reusable — wipe clean after use. Used for facility-level closures that affect all campus users.",
        vendorSpec:
          "Coroplast 4mm, full-bleed print, matte laminate. Reusable.",
        brandRationale:
          "Facility closures are WSC operational decisions. This sign communicates to all campus users regardless of program.",
      },
      {
        id: "event-welcome",
        name: "Event Welcome Banner",
        brand: "wsc",
        vendorType: "retractable-banner",
        format: "Retractable Banner",
        size: "33\" × 80\"",
        material: "Polyester banner, retractable aluminum stand",
        defaultLines: ["WELCOME TO", "WSC OPEN 2026", "Woodinville Sports Club"],
        editableLines: [false, true, false],
        notes:
          "Edit event name only. WSC warm palette. Retractable stand is reused across events — only the banner insert is replaced.",
        vendorSpec:
          "33×80\" polyester banner, retractable aluminum stand. Full-bleed UV print.",
        brandRationale:
          "Campus-wide welcome banners represent WSC as the host facility.",
      },
      // ── TIER 1 event signs ──
      {
        id: "tier1-showcase",
        name: "Tier 1 Showcase Day",
        brand: "tier1",
        vendorType: "retractable-banner",
        format: "Retractable Banner",
        size: "33\" × 80\"",
        material: "Polyester banner, retractable aluminum stand",
        defaultLines: ["TIER 1 PERFORMANCE", "SHOWCASE DAY", "TRAIN WITHOUT LIMITS"],
        editableLines: [false, true, false],
        notes:
          "Edit event name only. Tier 1 cold dark palette. Retractable stand is reused — only the banner insert is replaced. Used for academy showcase events, college recruitment days, and parent observation sessions.",
        vendorSpec:
          "33×80\" polyester banner, retractable aluminum stand. Full-bleed UV print.",
        brandRationale:
          "Academy showcase events are Tier 1 program events. The performance brand leads to signal this is an elite training environment, not a general club event.",
      },
      {
        id: "tier1-college-day",
        name: "College Recruitment Day",
        brand: "tier1",
        vendorType: "a-frame",
        format: "A-Frame / Foam Board",
        size: "18\" × 24\"",
        material: "Foam board 5mm, matte laminate",
        defaultLines: ["TIER 1 PERFORMANCE", "COLLEGE RECRUITMENT DAY", "ATHLETES & COACHES ONLY"],
        editableLines: [false, true, false],
        notes:
          "Edit event name. Short-run print — discard after event. Used to identify restricted access during college recruitment visits.",
        vendorSpec:
          "Foam board 5mm, matte laminate. Short-run digital print. Discard after event.",
        brandRationale:
          "College recruitment is an academy program event. Tier 1 brand signals the elite performance context to visiting coaches.",
      },
    ],
  },
];

// ─── Welcome Banner Mockup ──────────────────────────────────────────────────

function WelcomeBannerMockup() {
  const t = getBrandTokens("wsc");
  return (
    <div
      style={{
        background: t.bg,
        borderTop: `1px solid ${t.border}`,
        borderLeft: `1px solid ${t.border}`,
        borderRight: `1px solid ${t.border}`,
        borderBottom: `1px solid ${t.border}`,
        position: "relative",
        width: "100%",
        maxWidth: "320px",
        margin: "0 auto",
        // 24×36 = 2:3 ratio
        aspectRatio: "2 / 3",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: "6px", background: t.accentBar, flexShrink: 0 }} />

      {/* Inner content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "8% 10%",
          gap: "0",
        }}
      >
        {/* Brand eyebrow */}
        <div
          style={{
            fontSize: "clamp(7px, 1.8vw, 11px)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            letterSpacing: "0.22em",
            color: t.textMuted,
            textTransform: "uppercase",
            marginBottom: "6%",
          }}
        >
          WOODINVILLE, WA
        </div>

        {/* Welcome to */}
        <div
          style={{
            fontSize: "clamp(9px, 2.2vw, 14px)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            letterSpacing: "0.28em",
            color: t.textMuted,
            textTransform: "uppercase",
            marginBottom: "2%",
          }}
        >
          WELCOME TO
        </div>

        {/* Main name — large */}
        <div
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(18px, 5.5vw, 38px)",
            letterSpacing: "-0.01em",
            lineHeight: 1.0,
            color: t.textPrimary,
            textTransform: "uppercase",
            marginBottom: "6%",
          }}
        >
          WOODINVILLE<br />SPORTS CLUB
        </div>

        {/* Divider */}
        <div
          style={{
            width: "40px",
            height: "2px",
            background: t.accentBar,
            marginBottom: "6%",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(8px, 1.9vw, 12px)",
            lineHeight: 1.5,
            color: t.textMuted,
            letterSpacing: "0.04em",
            marginBottom: "auto",
          }}
        >
          Elevate Your Game.<br />Enrich Your Life.
        </div>

        {/* Bottom section — WSC wordmark area */}
        <div
          style={{
            marginTop: "8%",
            paddingTop: "5%",
            borderTop: `1px solid ${t.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(14px, 4vw, 26px)",
              letterSpacing: "0.04em",
              color: t.textPrimary,
            }}
          >
            WSC
          </div>
          <div
            style={{
              fontSize: "clamp(6px, 1.4vw, 9px)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.14em",
              color: t.textMuted,
              textTransform: "uppercase",
              textAlign: "right",
              lineHeight: 1.4,
            }}
          >
            67-ACRE SPORTS<br />CAMPUS
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div style={{ height: "4px", background: t.accentBar, flexShrink: 0 }} />

      {/* Size annotation */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-36px",
          transform: "translateY(-50%) rotate(90deg)",
          fontSize: "8px",
          fontFamily: "'Inter', sans-serif",
          color: "#a0a5ad",
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
        }}
      >
        36\"
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "8px",
          fontFamily: "'Inter', sans-serif",
          color: "#a0a5ad",
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
        }}
      >
        24\"
      </div>
    </div>
  );
}

// ─── Sign Mockup Component ───────────────────────────────────────────────────

function SignMockup({
  sign,
  editedLines,
  onLineChange,
}: {
  sign: SignTemplate;
  editedLines: string[];
  onLineChange: (idx: number, val: string) => void;
}) {
  const t = getBrandTokens(sign.brand);

  // Determine which line is the "big" headline (index 1 if 3+ lines, else 0)
  const bigLineIdx = editedLines.length > 2 ? 1 : 0;

  return (
    <div
      style={{
        background: t.bg,
        borderTop: `3px solid ${t.accentBar}`,
        borderLeft: `1px solid ${t.border}`,
        borderRight: `1px solid ${t.border}`,
        borderBottom: `1px solid ${t.border}`,
        padding: "28px 24px 20px",
        position: "relative",
        minHeight: "160px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      {/* Brand label */}
      <div
        style={{
          fontSize: "9px",
          letterSpacing: "0.18em",
          color: t.accent,
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 700,
          marginBottom: "4px",
          textTransform: "uppercase",
        }}
      >
        {t.brandLine}
      </div>

      {/* Sign lines */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
        {editedLines.map((line, idx) => {
          const isEditable = sign.editableLines[idx];
          const isBig = idx === bigLineIdx;
          const isNumber = /^\d+$/.test(line) && editedLines.length > 2;

          if (isNumber && isEditable) {
            return (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: t.textMuted,
                    fontFamily: "'Oswald', sans-serif",
                  }}
                >
                  {editedLines[idx - 1] || ""}:
                </span>
                <input
                  value={line}
                  onChange={(e) => onLineChange(idx, e.target.value)}
                  style={{
                    background: t.surface,
                    border: `1px solid ${t.accent}55`,
                    color: t.accent,
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    fontSize: "28px",
                    width: "60px",
                    textAlign: "center",
                    padding: "4px 8px",
                    outline: "none",
                  }}
                  maxLength={3}
                />
              </div>
            );
          }

          if (isEditable) {
            return (
              <input
                key={idx}
                value={line}
                onChange={(e) => onLineChange(idx, e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: `1px dashed ${t.accent}66`,
                  color: isBig ? t.textPrimary : t.textMuted,
                  fontFamily: isBig ? "'Oswald', sans-serif" : "'Inter', sans-serif",
                  fontWeight: isBig ? 700 : 400,
                  fontSize: isBig ? "22px" : "13px",
                  letterSpacing: isBig ? "0.06em" : "0.08em",
                  textTransform: isBig ? "uppercase" : "none",
                  padding: "2px 0",
                  outline: "none",
                  width: "100%",
                }}
              />
            );
          }

          return (
            <div
              key={idx}
              style={{
                color: isBig ? t.textPrimary : t.textMuted,
                fontFamily: isBig ? "'Oswald', sans-serif" : "'Inter', sans-serif",
                fontWeight: isBig ? 700 : 400,
                fontSize: isBig ? "22px" : "12px",
                letterSpacing: isBig ? "0.06em" : "0.1em",
                textTransform: "uppercase",
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      {/* Editable indicator */}
      {sign.editableLines.some(Boolean) && (
        <div
          style={{
            fontSize: "9px",
            color: t.accent + "99",
            letterSpacing: "0.12em",
            marginTop: "8px",
          }}
        >
          ✎ DASHED FIELDS ARE EDITABLE
        </div>
      )}
    </div>
  );
}

// ─── Copy Specs Helper ───────────────────────────────────────────────────────

function copySpecs(sign: SignTemplate, lines: string[]) {
  const text = [
    `SIGN: ${sign.name}`,
    `BRAND: ${sign.brand === "tier1" ? "TIER 1 PERFORMANCE" : sign.brand === "wsc" ? "WOODINVILLE SPORTS CLUB" : "SHARED (WSC + TIER 1)"}`,
    `FORMAT: ${sign.format}`,
    `SIZE: ${sign.size}`,
    `MATERIAL: ${sign.material}`,
    `VENDOR SPEC: ${sign.vendorSpec}`,
    ``,
    `COPY:`,
    ...lines.map((l, i) => `  Line ${i + 1}: ${l}`),
    ``,
    `NOTES: ${sign.notes}`,
    ``,
    `BRAND RATIONALE: ${sign.brandRationale}`,
  ].join("\n");
  navigator.clipboard.writeText(text).then(() => {
    toast.success("Print specs copied to clipboard");
  });
}

// ─── Tier 1 Entrance Banner Mockup ─────────────────────────────────────────

function Tier1EntranceBannerMockup() {
  const t = getBrandTokens("tier1");
  return (
    <div
      style={{
        background: "#0f1114",
        border: `1px solid ${t.border}`,
        position: "relative",
        width: "100%",
        aspectRatio: "2/3",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top blue accent bar */}
      <div style={{ background: "#3b82f6", height: "6px", width: "100%", flexShrink: 0 }} />
      {/* Subtle background text */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", pointerEvents: "none" }}>
        <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(40px, 10vw, 80px)", color: "rgba(255,255,255,0.03)", letterSpacing: "-0.02em", textTransform: "uppercase", whiteSpace: "nowrap" }}>T1</span>
      </div>
      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "16px 14px 14px" }}>
        {/* Top: eyebrow */}
        <div>
          <div style={{ fontSize: "7px", letterSpacing: "0.22em", color: "#3b82f6", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "6px" }}>TIER 1 PERFORMANCE</div>
          <div style={{ width: "24px", height: "2px", background: "#3b82f6", marginBottom: "10px" }} />
        </div>
        {/* Middle: headline */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(18px, 5vw, 28px)", color: "#ffffff", letterSpacing: "-0.01em", lineHeight: 1.05, textTransform: "uppercase", marginBottom: "6px" }}>TIER 1<br />PERFORMANCE<br />ACADEMY</div>
          <div style={{ fontSize: "7px", letterSpacing: "0.18em", color: "#a0a5ad", fontFamily: "'Oswald', sans-serif", marginTop: "8px" }}>TRAIN WITHOUT LIMITS</div>
        </div>
        {/* Bottom: wordmark area */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: "7px", letterSpacing: "0.14em", color: "#a0a5ad", fontFamily: "'Oswald', sans-serif" }}>WOODINVILLE, WA</div>
          <div style={{ fontSize: "7px", letterSpacing: "0.1em", color: "#3b82f6", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>TIER 1</div>
        </div>
      </div>
      {/* Bottom blue accent bar */}
      <div style={{ background: "#3b82f6", height: "4px", width: "100%", flexShrink: 0 }} />
    </div>
  );
}

// ─── Brand Legend Component ──────────────────────────────────────────────────

function BrandLegend() {
  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        flexWrap: "wrap",
        marginBottom: "28px",
        padding: "16px 20px",
        background: "#22262b",
        borderLeft: "3px solid #3b82f6",
      }}
    >
      <div style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#a0a5ad", fontFamily: "'Oswald', sans-serif", fontWeight: 700, alignSelf: "center", marginRight: "8px" }}>
        BRAND KEY:
      </div>
      {[
        { color: "#3b82f6", label: "TIER 1", desc: "Academy program, athletes, APL, coaching staff" },
        { color: "#0d1b2a", label: "WSC", desc: "Campus facilities, membership, general public" },
        { color: "#a0a5ad", label: "SHARED", desc: "Campus-wide policy — applies to all users" },
      ].map((item) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              background: item.color,
              flexShrink: 0,
            }}
          />
          <div>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: item.color,
              }}
            >
              {item.label}
            </span>
            <span style={{ fontSize: "10px", color: "#a0a5ad", marginLeft: "6px" }}>
              — {item.desc}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const VENDOR_FILTERS: { id: SignTemplate["vendorType"] | "all"; label: string }[] = [
  { id: "all", label: "All Types" },
  { id: "door-placard", label: "Door Placard" },
  { id: "a-frame", label: "A-Frame / Coroplast" },
  { id: "wall-panel", label: "Wall Panel" },
  { id: "large-format", label: "Large Format" },
  { id: "retractable-banner", label: "Retractable Banner" },
];

export default function SignageSystem() {
  const [activeCategory, setActiveCategory] = useState("reserved");
  const [activeSignId, setActiveSignId] = useState<string | null>(null);
  const [editedLinesMap, setEditedLinesMap] = useState<Record<string, string[]>>({});
  const [vendorFilter, setVendorFilter] = useState<SignTemplate["vendorType"] | "all">("all");

  const category = SIGN_CATEGORIES.find((c) => c.id === activeCategory)!;

  function getLines(sign: SignTemplate): string[] {
    return editedLinesMap[sign.id] ?? [...sign.defaultLines];
  }

  function handleLineChange(sign: SignTemplate, idx: number, val: string) {
    const current = getLines(sign);
    const updated = [...current];
    updated[idx] = val;
    setEditedLinesMap((prev) => ({ ...prev, [sign.id]: updated }));
  }

  function resetSign(sign: SignTemplate) {
    setEditedLinesMap((prev) => {
      const next = { ...prev };
      delete next[sign.id];
      return next;
    });
    toast.success("Sign reset to defaults");
  }

  const brandColor = (brand: SignTemplate["brand"]) =>
    brand === "tier1" ? "#3b82f6" : brand === "wsc" ? "#0d1b2a" : "#a0a5ad";

  const brandLabel = (brand: SignTemplate["brand"]) =>
    brand === "tier1" ? "TIER 1" : brand === "wsc" ? "WSC" : "SHARED";

  // Count signs by brand in the current category
  const tier1Count = category.signs.filter((s) => s.brand === "tier1").length;
  const wscCount = category.signs.filter((s) => s.brand === "wsc").length;
  const sharedCount = category.signs.filter((s) => s.brand === "shared").length;

  // Filtered signs for current category + vendor filter
  const filteredSigns = vendorFilter === "all"
    ? category.signs
    : category.signs.filter((s) => s.vendorType === vendorFilter);

  function printAllSpecs() {
    const allSigns = category.signs;
    const text = allSigns.map((sign) => {
      const lines = getLines(sign);
      return [
        `SIGN: ${sign.name}`,
        `BRAND: ${sign.brand === "tier1" ? "TIER 1 PERFORMANCE" : sign.brand === "wsc" ? "WOODINVILLE SPORTS CLUB" : "SHARED"}`,
        `FORMAT: ${sign.format}`,
        `SIZE: ${sign.size}`,
        `MATERIAL: ${sign.material}`,
        `VENDOR SPEC: ${sign.vendorSpec}`,
        `COPY: ${lines.join(" | ")}`,
        `NOTES: ${sign.notes}`,
        `---`,
      ].join("\n");
    }).join("\n\n");
    navigator.clipboard.writeText(
      `PRINT ORDER — ${category.label.toUpperCase()} (${allSigns.length} SIGNS)\nWoodinville Sports Club / Tier 1 Performance\n${"-".repeat(60)}\n\n` + text
    ).then(() => {
      toast.success(`${allSigns.length} sign specs copied — paste into vendor order`);
    });
  }

  return (
    <div>
      <SectionHeader
        label="Signage System"
        title="Signage System"
        subtitle="Every sign on campus, built to brand. Tier 1 signs identify academy program spaces. WSC signs identify campus facilities. Select a category, customize editable fields, and copy print specs for your vendor."
      />

      {/* Brand Legend */}
      <BrandLegend />

      {/* Category tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
          marginBottom: "32px",
        }}
      >
        {SIGN_CATEGORIES.map((cat) => {
          const catTier1 = cat.signs.filter((s) => s.brand === "tier1").length;
          const catWSC = cat.signs.filter((s) => s.brand === "wsc").length;
          const catShared = cat.signs.filter((s) => s.brand === "shared").length;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveSignId(null);
              }}
              style={{
                background: activeCategory === cat.id ? "#22262b" : "#1a1d21",
                padding: "16px 12px",
                textAlign: "left",
                borderTop:
                  activeCategory === cat.id
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "none",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <div style={{ fontSize: "18px", marginBottom: "6px" }}>{cat.icon}</div>
              <div
                style={{
                  fontSize: "10px",
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color:
                    activeCategory === cat.id ? "#e8e8e8" : "#a0a5ad",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                {cat.label}
              </div>
              {/* Mini brand breakdown */}
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                {catTier1 > 0 && (
                  <span style={{ fontSize: "9px", color: "#3b82f6" }}>
                    {catTier1} T1
                  </span>
                )}
                {catWSC > 0 && (
                  <span style={{ fontSize: "9px", color: "#84786f" }}>
                    {catTier1 > 0 ? "· " : ""}{catWSC} WSC
                  </span>
                )}
                {catShared > 0 && (
                  <span style={{ fontSize: "9px", color: "#a0a5ad" }}>
                    {(catTier1 > 0 || catWSC > 0) ? "· " : ""}{catShared} shared
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Category description + brand summary */}
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            color: "#a0a5ad",
            fontSize: "14px",
            lineHeight: "1.6",
            maxWidth: "600px",
            margin: 0,
          }}
        >
          {category.description}
        </p>
        <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
          {tier1Count > 0 && (
            <div
              style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.25)",
                padding: "6px 12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  color: "#3b82f6",
                }}
              >
                {tier1Count}
              </div>
              <div style={{ fontSize: "9px", color: "#3b82f6", letterSpacing: "0.1em" }}>
                TIER 1
              </div>
            </div>
          )}
          {wscCount > 0 && (
            <div
              style={{
              background: "rgba(232,224,211,0.12)",
              border: "1px solid rgba(232,224,211,0.25)",
              padding: "6px 12px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                color: "#e8e0d3",
              }}
            >
              {wscCount}
            </div>
            <div style={{ fontSize: "9px", color: "#e8e0d3", letterSpacing: "0.1em" }}>
                WSC
              </div>
            </div>
          )}
          {sharedCount > 0 && (
            <div
              style={{
                background: "rgba(160,165,173,0.08)",
                border: "1px solid rgba(160,165,173,0.2)",
                padding: "6px 12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  color: "#a0a5ad",
                }}
              >
                {sharedCount}
              </div>
              <div style={{ fontSize: "9px", color: "#a0a5ad", letterSpacing: "0.1em" }}>
                SHARED
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vendor filter + Print All bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {VENDOR_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setVendorFilter(f.id)}
              style={{
                background: vendorFilter === f.id ? "#3b82f6" : "rgba(255,255,255,0.05)",
                border: vendorFilter === f.id ? "1px solid #3b82f6" : "1px solid rgba(255,255,255,0.1)",
                color: vendorFilter === f.id ? "#fff" : "#a0a5ad",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "9px",
                letterSpacing: "0.1em",
                padding: "5px 10px",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {f.label.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          onClick={printAllSpecs}
          style={{
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.3)",
            color: "#3b82f6",
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: "10px",
            letterSpacing: "0.12em",
            padding: "7px 14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.2)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)"; }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
          PRINT ALL ({category.signs.length})
        </button>
      </div>

      {/* No results message */}
      {filteredSigns.length === 0 && (
        <div style={{ padding: "32px", textAlign: "center", color: "#a0a5ad", fontSize: "13px", background: "#22262b", border: "1px solid rgba(255,255,255,0.06)" }}>
          No {VENDOR_FILTERS.find(f => f.id === vendorFilter)?.label} signs in this category.
        </div>
      )}

      {/* Sign grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
        }}
      >
        {filteredSigns.map((sign) => {
          const isActive = activeSignId === sign.id;
          const lines = getLines(sign);
          const hasEdits = editedLinesMap[sign.id] !== undefined;
          const t = getBrandTokens(sign.brand);

          return (
            <div
              key={sign.id}
              style={{
                background: "#22262b",
                border: isActive
                  ? `1px solid ${t.accent}`
                  : "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.15s",
                cursor: "pointer",
                ...((sign.id === "wsc-welcome" || sign.id === "tier1-entrance-banner") ? { gridColumn: "1 / -1" } : {}),
              }}
              onClick={() => setActiveSignId(isActive ? null : sign.id)}
            >
              {/* Sign header */}
              <div
                style={{
                  padding: "14px 16px 10px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#e8e8e8",
                      textTransform: "uppercase",
                    }}
                  >
                    {sign.name}
                  </div>
                  <div style={{ fontSize: "10px", color: "#a0a5ad", marginTop: "2px" }}>
                    {sign.format}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "9px",
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: brandColor(sign.brand),
                    background: brandColor(sign.brand) + "18",
                    padding: "2px 6px",
                    flexShrink: 0,
                  }}
                >
                  {brandLabel(sign.brand)}
                </span>
              </div>

              {/* Sign mockup */}
              <div style={(sign.id === "wsc-welcome" || sign.id === "tier1-entrance-banner") ? { padding: "24px 32px", display: "flex", gap: "48px", alignItems: "flex-start" } : { padding: "16px" }}>
                {sign.id === "tier1-entrance-banner" ? (
                  <>
                    {/* Left: Tier 1 banner mockup */}
                    <div style={{ flexShrink: 0, width: "220px" }}>
                      <Tier1EntranceBannerMockup />
                    </div>
                    {/* Right: design notes */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px", paddingTop: "4px" }}>
                      <div>
                        <div style={{ fontSize: "9px", letterSpacing: "0.16em", color: "#a0a5ad", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "8px" }}>DESIGN INTENT</div>
                        <p style={{ fontSize: "12px", color: "#e8e8e8", lineHeight: 1.6, margin: 0 }}>
                          The academy entrance banner sets the performance tone immediately. Cold charcoal palette, Oswald bold, blue accent bars — signals elite training environment. Direct counterpart to the WSC Welcome Banner; the two together communicate that this campus holds both a welcoming club and a serious academy.
                        </p>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div style={{ background: "#1a1d21", padding: "12px 14px" }}>
                          <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#a0a5ad", marginBottom: "6px" }}>BACKGROUND</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "16px", height: "16px", background: "#0f1114", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }} />
                            <span style={{ fontSize: "11px", color: "#e8e8e8", fontFamily: "'Inter', sans-serif" }}>#0f1114 — Dark Base</span>
                          </div>
                        </div>
                        <div style={{ background: "#1a1d21", padding: "12px 14px" }}>
                          <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#a0a5ad", marginBottom: "6px" }}>HEADLINE</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "16px", height: "16px", background: "#ffffff", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }} />
                            <span style={{ fontSize: "11px", color: "#e8e8e8", fontFamily: "'Inter', sans-serif" }}>#ffffff — White</span>
                          </div>
                        </div>
                        <div style={{ background: "#1a1d21", padding: "12px 14px" }}>
                          <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#a0a5ad", marginBottom: "6px" }}>ACCENT BARS</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "16px", height: "16px", background: "#3b82f6", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }} />
                            <span style={{ fontSize: "11px", color: "#e8e8e8", fontFamily: "'Inter', sans-serif" }}>#3b82f6 — Blue Accent</span>
                          </div>
                        </div>
                        <div style={{ background: "#1a1d21", padding: "12px 14px" }}>
                          <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#a0a5ad", marginBottom: "6px" }}>TYPEFACES</div>
                          <div style={{ fontSize: "11px", color: "#e8e8e8", lineHeight: 1.5 }}>Oswald 700 — Headline<br /><span style={{ color: "#a0a5ad" }}>Inter 400 — Subtext</span></div>
                        </div>
                      </div>
                      <div style={{ background: "#1a1d21", padding: "12px 14px" }}>
                        <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#a0a5ad", marginBottom: "6px" }}>VENDOR PRINT SPEC</div>
                        <div style={{ fontSize: "11px", color: "#e8e8e8", lineHeight: 1.6 }}>24×36" · Dibond 3mm aluminum composite · Full-bleed UV print · Matte finish · Standoff hardware (4×) · Bleed 0.125" · Safe zone 0.25" · CMYK · 150 dpi min</div>
                      </div>
                    </div>
                  </>
                ) : sign.id === "wsc-welcome" ? (
                  <>
                    {/* Left: banner mockup */}
                    <div style={{ flexShrink: 0, width: "220px" }}>
                      <WelcomeBannerMockup />
                    </div>
                    {/* Right: design notes */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px", paddingTop: "4px" }}>
                      <div>
                        <div style={{ fontSize: "9px", letterSpacing: "0.16em", color: "#a0a5ad", fontFamily: "'Oswald', sans-serif", fontWeight: 700, marginBottom: "8px" }}>DESIGN INTENT</div>
                        <p style={{ fontSize: "12px", color: "#e8e8e8", lineHeight: 1.6, margin: 0 }}>
                          The primary campus entrance sign. Warm parchment palette signals a welcoming, community-first environment — distinct from the cold performance identity of Tier 1. The WSC wordmark anchors the bottom; the tagline sits mid-panel as the emotional hook.
                        </p>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div style={{ background: "#1a1d21", padding: "12px 14px" }}>
                          <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#a0a5ad", marginBottom: "6px" }}>BACKGROUND</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "16px", height: "16px", background: "#e8e0d3", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }} />
                            <span style={{ fontSize: "11px", color: "#e8e8e8", fontFamily: "'Inter', sans-serif" }}>#e8e0d3 — Parchment Light</span>
                          </div>
                        </div>
                        <div style={{ background: "#1a1d21", padding: "12px 14px" }}>
                          <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#a0a5ad", marginBottom: "6px" }}>HEADLINE</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "16px", height: "16px", background: "#0e0a07", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }} />
                            <span style={{ fontSize: "11px", color: "#e8e8e8", fontFamily: "'Inter', sans-serif" }}>#0e0a07 — Primary Text</span>
                          </div>
                        </div>
                        <div style={{ background: "#1a1d21", padding: "12px 14px" }}>
                          <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#a0a5ad", marginBottom: "6px" }}>ACCENT BAR</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "16px", height: "16px", background: "#0d1b2a", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }} />
                            <span style={{ fontSize: "11px", color: "#e8e8e8", fontFamily: "'Inter', sans-serif" }}>#0d1b2a — Navy Accent</span>
                          </div>
                        </div>
                        <div style={{ background: "#1a1d21", padding: "12px 14px" }}>
                          <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#a0a5ad", marginBottom: "6px" }}>TYPEFACES</div>
                          <div style={{ fontSize: "11px", color: "#e8e8e8", lineHeight: 1.5 }}>Oswald 700 — Headline<br /><span style={{ color: "#a0a5ad" }}>Inter 400 — Body / Tagline</span></div>
                        </div>
                      </div>
                      <div style={{ background: "#1a1d21", padding: "12px 14px" }}>
                        <div style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#a0a5ad", marginBottom: "6px" }}>VENDOR PRINT SPEC</div>
                        <div style={{ fontSize: "11px", color: "#e8e8e8", lineHeight: 1.6 }}>24×36" · Dibond 3mm aluminum composite · Full-bleed UV print · Matte laminate · Standoff hardware (4×) · Bleed 0.125" · Safe zone 0.25" · CMYK · 150 dpi min</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <SignMockup
                    sign={sign}
                    editedLines={lines}
                    onLineChange={(idx, val) => handleLineChange(sign, idx, val)}
                  />
                )}
              </div>

              {/* Expanded detail panel */}
              {isActive && (
                <div
                  style={{ padding: "0 16px 16px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Size & Material */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                      marginBottom: "12px",
                    }}
                  >
                    <div style={{ background: "#1a1d21", padding: "10px 12px" }}>
                      <div
                        style={{
                          fontSize: "9px",
                          letterSpacing: "0.14em",
                          color: "#a0a5ad",
                          marginBottom: "4px",
                        }}
                      >
                        SIZE
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#e8e8e8",
                          lineHeight: "1.4",
                        }}
                      >
                        {sign.size}
                      </div>
                    </div>
                    <div style={{ background: "#1a1d21", padding: "10px 12px" }}>
                      <div
                        style={{
                          fontSize: "9px",
                          letterSpacing: "0.14em",
                          color: "#a0a5ad",
                          marginBottom: "4px",
                        }}
                      >
                        MATERIAL
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#e8e8e8",
                          lineHeight: "1.4",
                        }}
                      >
                        {sign.material}
                      </div>
                    </div>
                  </div>

                  {/* Brand Rationale */}
                  <div
                    style={{
                      background: t.noteBg,
                      borderLeft: `2px solid ${t.noteBorder}`,
                      padding: "10px 12px",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.14em",
                        color: t.noteText,
                        marginBottom: "4px",
                      }}
                    >
                      WHY {brandLabel(sign.brand)} BRAND
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#e8e8e8",
                        lineHeight: "1.5",
                      }}
                    >
                      {sign.brandRationale}
                    </div>
                  </div>

                  {/* Notes */}
                  <div
                    style={{
                      background: "#1a1d21",
                      borderLeft: "2px solid rgba(255,255,255,0.12)",
                      padding: "10px 12px",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.14em",
                        color: "#a0a5ad",
                        marginBottom: "4px",
                      }}
                    >
                      NOTES FOR MARKETING
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#e8e8e8",
                        lineHeight: "1.5",
                      }}
                    >
                      {sign.notes}
                    </div>
                  </div>

                  {/* Vendor spec */}
                  <div
                    style={{
                      background: t.specBg,
                      padding: "10px 12px",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.14em",
                        color: "#a0a5ad",
                        marginBottom: "4px",
                      }}
                    >
                      VENDOR PRINT SPEC
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#84786f",
                        lineHeight: "1.5",
                        fontFamily: "monospace",
                      }}
                    >
                      {sign.vendorSpec}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => copySpecs(sign, lines)}
                      style={{
                        flex: 1,
                        background: t.accent,
                        border: "none",
                        color: sign.brand === "shared" ? "#1a1d21" : "#fff",
                        fontFamily: "'Oswald', sans-serif",
                        fontWeight: 700,
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        padding: "10px",
                        cursor: "pointer",
                      }}
                    >
                      COPY PRINT SPECS
                    </button>
                    {hasEdits && (
                      <button
                        onClick={() => resetSign(sign)}
                        style={{
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "#a0a5ad",
                          fontFamily: "'Oswald', sans-serif",
                          fontWeight: 700,
                          fontSize: "11px",
                          letterSpacing: "0.1em",
                          padding: "10px 14px",
                          cursor: "pointer",
                        }}
                      >
                        RESET
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Click to expand hint */}
              {!isActive && (
                <div
                  style={{
                    padding: "8px 16px 12px",
                    fontSize: "10px",
                    color: "#a0a5ad",
                    letterSpacing: "0.08em",
                  }}
                >
                  Click to view specs & copy for vendor →
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Usage guide */}
      <div
        style={{
          marginTop: "40px",
          background: "#22262b",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "24px 28px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "#3b82f6",
            marginBottom: "16px",
          }}
        >
          HOW TO USE THIS SECTION
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            {
              step: "01",
              label: "Select category",
              desc: "Choose the sign type from the five tabs. Each tab shows a T1/WSC breakdown.",
            },
            {
              step: "02",
              label: "Check the brand badge",
              desc: "Blue TIER 1 badge = academy program. Light blue WSC badge = campus facility. Grey SHARED = campus-wide policy.",
            },
            {
              step: "03",
              label: "Edit editable fields",
              desc: "Dashed fields in the mockup are editable. Fixed fields are locked — contact marketing to change them.",
            },
            {
              step: "04",
              label: "Click to expand",
              desc: "Expand any sign card to see the brand rationale, size, material, and vendor print specs.",
            },
            {
              step: "05",
              label: "Copy print specs",
              desc: "Hit 'Copy Print Specs' and paste directly into your vendor order form or email.",
            },
          ].map((item) => (
            <div key={item.step} style={{ display: "flex", gap: "12px" }}>
              <div
                style={{
                  fontSize: "18px",
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  color: "#3b82f6",
                  minWidth: "28px",
                }}
              >
                {item.step}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#e8e8e8",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#a0a5ad",
                    lineHeight: "1.5",
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
