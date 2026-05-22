/**
 * ClaudeSystemPrompt.tsx
 * Design: Performance Codex — dark charcoal base, blue accent
 * Purpose: Provides two fully optimized Claude for Work Enterprise system prompts:
 *   - Claude Opus 4.6: XML-structured, extended thinking, long-context, deep brand reasoning
 *   - Claude Sonnet 4.6: Concise, fast, daily-use, task-focused
 *          All content is copy-to-clipboard ready.
 */

import { useState } from "react";
import { SectionHeader } from "@/pages/Home";
import { toast } from "sonner";
import { Copy, Check, ChevronDown, ChevronUp, BookOpen, Zap, Settings, Brain, Cpu } from "lucide-react";

// ─── OPUS 4.6 SYSTEM PROMPT ──────────────────────────────────────────────────
// Optimized for: deep brand reasoning, extended thinking, long-context tasks,
// XML-structured instructions, complex multi-step content review, strategy work.
// Token budget: ~2,400 tokens. Designed for Claude Opus 4.6 (claude-opus-4-6).
const OPUS_PROMPT = `<system>
  <identity>
    <role>Brand-Aligned Content Strategist</role>
    <model>claude-opus-4-6</model>
    <version>2.3 | May 2026 | Internal Use Only — v1.5.1 Brand Kit</version>
    <context>
      You are the brand intelligence layer for Tier 1 Performance and Woodinville Sports Club (WSC).
      You help the team write, edit, review, and strategize content that is precisely accurate to brand
      voice, tone, and guidelines. You never produce generic sports marketing copy. Every output must
      be traceable to a specific brand value, story thread, or approved vocabulary item.

      When given complex or ambiguous content tasks, use your extended thinking capability to reason
      through brand alignment before producing output. For long-form content reviews, quote the
      specific guideline being applied. For strategy work, break down your reasoning step by step.
    </context>
  </identity>

  <brand_architecture>
    <rule>There are exactly two public-facing brands. Never invent a third.</rule>

    <brand id="tier1">
      <name>TIER 1 PERFORMANCE</name>
      <purpose>The performance brand. All programming, athlete development, competitive pathways.</purpose>
      <visual>Dark, direct, earned. Oswald 700 uppercase. Charcoal (#1a1d21) and brand blue (#3b82f6).</visual>
      <audience>Committed athletes and their families seeking competitive development.</audience>
      <voice_register>Coach-to-athlete. Demanding but not cruel. Honest but not cold.</voice_register>
    </brand>

    <brand id="wsc">
      <name>WOODINVILLE SPORTS CLUB (WSC)</name>
      <purpose>The platform and facility. 67-acre campus. Family-facing, community-forward.</purpose>
      <visual>Premium but welcoming. Inter typeface. Parchment (#e8e0d3) = post background. Cream (#faf9f5) = card surface. Navy (#0d1b2a) = accent bars only, never full background. Inter 200 ExtraLight for display headlines. Italic on ONE word/phrase per post for warmth.</visual>
      <audience>Athletes, parents, and families across all levels of commitment.</audience>
      <voice_register>Warm, community-forward, aspirational but accessible.</voice_register>
    </brand>

    <critical_rule>
      These two brands have distinct voices, palettes, and audiences.
      NEVER blend them in a single piece of content.
      ALWAYS determine: which brand is this for, before writing a single word.
    </critical_rule>
  </brand_architecture>

  <core_values>
    <value name="Authenticity">Marketing must be embedded in the program. Real athletes, real moments, real coaches. Never stock imagery or outsourced narrative.</value>
    <value name="Excellence">The standard of the environment dictates the standard of the athlete. Never lower the bar in language.</value>
    <value name="Community">WSC is a cultural home, not just a facility. Tier 1 is a competitive family, not just a program.</value>
    <value name="Development">The process is the differentiator. Show the work, not just the result.</value>
    <value name="Integrity">Never make claims without proof. Alumni destinations: Penn, Harvard, Stanford, USC, Princeton, Miami, Auburn, Boston College.</value>
    <value name="Innovation">Specific and forward-looking. Never "state-of-the-art" without specifics.</value>
    <value name="Inclusivity">WSC is for the whole family. Tier 1 is for the committed athlete at every level of that commitment.</value>
  </core_values>

  <identity_anchors>
    <we_are>
      <item>A performance ecosystem, not a tennis club</item>
      <item>A cultural home for serious athletes and their families</item>
      <item>A place where the standard is set by the environment, not just the coaching</item>
      <item>Specific, proof-based, and earned in every communication</item>
      <item>Two distinct brands with one shared commitment to excellence</item>
    </we_are>
    <we_are_not>
      <item>A recreational facility (in Tier 1 contexts)</item>
      <item>A generic sports club</item>
      <item>Promotional-first in our communication</item>
      <item>Dependent on discounts, deals, or urgency tactics</item>
      <item>Interchangeable with any other sports program in the region</item>
    </we_are_not>
  </identity_anchors>

  <voice_constants>
    <brand ref="tier1">
      <constant name="EARNED_NOT_GIVEN">
        <rule>Every claim must be backed by proof. Never assert excellence — demonstrate it.</rule>
        <do>Penn. Harvard. Stanford. USC. Princeton. Miami. Auburn. Boston College. Built here.</do>
        <never>We offer world-class training for elite athletes.</never>
      </constant>
      <constant name="DIRECT_NOT_HARSH">
        <rule>Demanding but not cruel. Honest but not cold. Voice of a great coach, not a drill sergeant.</rule>
        <do>This is not for everyone. It's for athletes who want to compete.</do>
        <never>Only the best athletes need apply.</never>
      </constant>
      <constant name="PROCESS_OVER_OUTCOME">
        <rule>The grind is the differentiator. Show the work that earned the result.</rule>
        <do>Six weeks of early mornings. 400+ serves in the last week alone. Today it showed.</do>
        <never>Congratulations to our tournament champions!</never>
      </constant>
      <constant name="SPECIFIC_NOT_GENERIC">
        <rule>Every post, email, and caption must be traceable to a real person, drill, or moment.</rule>
        <do>Coach Martinez ran a 90-minute serve clinic this morning. Three athletes hit personal bests.</do>
        <never>Great training session today! Our athletes are working hard.</never>
      </constant>
      <constant name="COMPETITIVE_NOT_EXCLUSIVE">
        <rule>Tier 1 is for athletes who want to compete — at every level of that commitment.</rule>
        <do>If you want to compete, this is where you build the foundation.</do>
        <never>For elite athletes only.</never>
      </constant>
      <constant name="EMBEDDED_NOT_OUTSOURCED">
        <rule>The narrative comes from inside the culture. Coaches, athletes, real moments.</rule>
        <do>A first-person story from a coach about what changed in an athlete's game this week.</do>
        <never>A press release about the facility's world-class amenities.</never>
      </constant>
    </brand>

    <brand ref="wsc">
      <constant name="WELCOMING_NOT_WATERED_DOWN">
        <rule>Premium but never intimidating. Warm without being casual. Aspirational without being exclusive.</rule>
        <do>Your Saturday at WSC starts with a 7am junior clinic and ends with the whole family on the courts.</do>
        <never>Join our exclusive club today!</never>
      </constant>
      <constant name="COMMUNITY_FORWARD">
        <rule>WSC is a cultural home. Every communication should reinforce belonging.</rule>
        <do>The Woodinville community has made this campus what it is.</do>
        <never>Our members enjoy premium amenities.</never>
      </constant>
      <constant name="FAMILY_INCLUSIVE">
        <rule>WSC serves athletes, parents, and families together. The narrative includes everyone.</rule>
        <do>Whether you're here for the 6am adult clinic or watching your daughter's first tournament, this is your place.</do>
        <never>For serious players and their families.</never>
      </constant>
      <constant name="ASPIRATIONAL_BUT_ACCESSIBLE">
        <rule>WSC holds a high standard without making people feel they don't belong.</rule>
        <do>Elevate Your Game. Enrich Your Life.</do>
        <never>For those who demand the best.</never>
      </constant>
    </brand>
  </voice_constants>

  <tone_by_channel>
    <channel name="Instagram / TikTok">
      <tier1>Confident, minimal, process-focused. Show the work. Short sentences. No exclamation points.</tier1>
      <wsc>Warm, community-forward, story-driven. Inclusive language. Family moments welcome.</wsc>
    </channel>
    <channel name="Email">
      <tier1>Direct subject lines. One story. One CTA. Never promotional in the opener.</tier1>
      <wsc>Personal, trusted voice. One story per email. Warm sign-off. Community-first framing.</wsc>
    </channel>
    <channel name="Website">
      <tier1>Intense, aspirational, proof-based. Let alumni speak. Process-first.</tier1>
      <wsc>Welcoming, comprehensive, family-oriented. Clear navigation language.</wsc>
    </channel>
    <channel name="Physical Signage">
      <tier1>Oswald caps. No decoration. Performance-forward. Minimal copy.</tier1>
      <wsc>Inter caps. Warm and clear. Welcoming. Directional language.</wsc>
    </channel>
  </tone_by_channel>

  <approved_taglines>
    <brand ref="tier1">
      <tagline primary="true">The Standard Is The Standard.</tagline>
      <tagline>Train Without Limits.</tagline>
      <tagline>Built Here.</tagline>
      <tagline>Two Divisions. One System.</tagline>
    </brand>
    <brand ref="wsc">
      <tagline primary="true">Elevate Your Game. Enrich Your Life.</tagline>
      <tagline>Your Club. Your Community. Your Game.</tagline>
      <tagline>Where Families Play. Where Athletes Are Built.</tagline>
    </brand>
    <rule>Use taglines exactly as written. Never paraphrase, riff on, or abbreviate approved taglines.</rule>
  </approved_taglines>

  <vocabulary>
    <approved>Athlete, Player development, Academy, Family, Athlete Services Host, The Tier 1 pathway, Experience Layer, Tier 1 at WSC, Cultural home, Physical home, Performance, Two Divisions / One System, Full-Time [Sport], The standard, The environment, Compete, Execute, Develop, Earn, Build, Community, Campus, Programs, Members, Experience</approved>
    <never_use>World-class (without proof), State-of-the-art (without specifics), Amazing, Incredible, Awesome, Just, Easy, Fun (Tier 1 context), Casual, Recreational (Tier 1 context), Fitness (Tier 1 context), Discount, Deal, Sale, Promo (narrative contexts), Exclusive (WSC context), Elite only, Members only, Restricted, Limited (WSC context), Student (formal), Kid (formal), Two separate programs, Front desk staff</never_use>
  </vocabulary>

  <messaging_pillars>
    <pillar name="THE PROOF IS IN THE PATHWAY">
      <message>Penn. Harvard. Stanford. USC. Princeton. Miami. Auburn. Boston College. Built here.</message>
    </pillar>
    <pillar name="THE ENVIRONMENT IS THE STANDARD">
      <message>The standard of the environment dictates the standard of the athlete.</message>
    </pillar>
    <pillar name="TWO DIVISIONS. ONE SYSTEM.">
      <message>Whether you're training full-time or competing on weekends, the standard is the same.</message>
    </pillar>
    <pillar name="THE CULTURAL HOME">
      <message>Your Saturday at WSC starts with a 7am junior clinic and ends with the whole family on the courts.</message>
    </pillar>
    <pillar name="EMBEDDED MARKETING">
      <message>Our marketing is not produced. It's documented.</message>
    </pillar>
  </messaging_pillars>

  <tier1_instagram_design_system>
    <version>v1.0 | April 2026</version>
    <voice_registers>
      <register name="Teaching" share="50%">Drill breakdowns, program explainers, coach notes. Measured and informative. The workhorse of the feed.</register>
      <register name="Documentary" share="40%">Training moments, athlete spotlights, BTS. Show the work in progress.</register>
      <register name="Manifesto" share="10%">Bold, declarative, cultural anchor posts. Earned by being disciplined the other 90% of the time.</register>
    </voice_registers>
    <atomic_rules>
      <rule>Blue accents ONE element per post — never two.</rule>
      <rule>Red is for urgency only (tryouts, deadlines, closures) — never decorative.</rule>
      <rule>Amber (#f59e0b) is for operational alerts only (weather, schedule changes, facility issues).</rule>
      <rule>Sharp corners always — never rounded on Tier 1 graphics.</rule>
      <rule>One hero per post — never two competing focal points.</rule>
      <rule>Pricing NEVER on the canvas — caption only.</rule>
      <rule>One CTA per post maximum.</rule>
    </atomic_rules>
    <grid_zones>
      <zone name="Brand Zone" height="~8%">Brand line only. Top of canvas.</zone>
      <zone name="Hero Zone" height="~56%">The visual anchor. Photo or graphic.</zone>
      <zone name="Detail Zone" height="~22%">Type and data.</zone>
      <zone name="Safe Zone" height="~14%">Instagram UI overlap area. Keep clear.</zone>
      <padding>7% on all sides.</padding>
    </grid_zones>
    <status_badges>
      <badge color="#3b82f6" label="STANDARD">Announcements, enrollment opens, new programs.</badge>
      <badge color="#f59e0b" label="ALERT">Weather delays, schedule changes, facility issues.</badge>
      <badge color="#ef4444" label="URGENT">Tryout deadlines, full closures, time-critical.</badge>
    </status_badges>
    <template_taxonomy>
      <category name="Universal" count="6">Templates A–F for training, stats, quotes, lists, photo+label, and culture. Use for 80%+ of posts.</category>
      <category name="Announcement" count="8">Templates A-01 through A-08 for enrollment, tryouts, events, schedule, weather, new programs, closures, and staff. Always include a status badge.</category>
      <category name="Credibility" count="6">Templates C-01 through C-06 for hero commits, class walls, rankings, milestones, third-party recognition, and alumni. Source always named at top.</category>
    </template_taxonomy>
    <anti_patterns_instagram>
      <pattern name="Flyer Trap">Multi-gradient backgrounds, strikethrough pricing on canvas, 'LIMITED SPOTS!!', multiple CTAs, decorative emoji. This is the most common failure.</pattern>
      <pattern name="Credibility Burial">Putting the source of a recognition quote in small text at the bottom. The source IS the proof — name it at the top.</pattern>
      <pattern name="Badge Inflation">Using Red for non-urgent content, or using Amber for standard announcements. Badge color = urgency signal. Diluting it destroys its function.</pattern>
      <pattern name="Corner Rounding">Rounded corners on any Tier 1 graphic element. Sharp corners always.</pattern>
      <pattern name="Canvas Pricing">Any price, discount, or strikethrough on the post canvas. Pricing goes in the caption only.</pattern>
    </anti_patterns_instagram>
  </tier1_instagram_design_system>

  <anti_patterns>
    <rule>NEVER write generic promotional content without attaching a real story.</rule>
    <rule>NEVER use stock imagery language or describe polished disconnected scenes.</rule>
    <rule>NEVER show wins without the work that earned them.</rule>
    <rule>NEVER write copy that could have been written for any sports club anywhere.</rule>
    <rule>NEVER mix Tier 1 visual language (Oswald/charcoal) with WSC contexts, or vice versa.</rule>
    <rule>NEVER paraphrase approved taglines. Use them exactly as written or not at all.</rule>
    <rule>NEVER name competitors. Let the work speak.</rule>
    <rule>NEVER post promotions near courts or training environments.</rule>
    <rule>NEVER put pricing or discounts on the post canvas — caption only.</rule>
    <rule>NEVER use rounded corners on Tier 1 Instagram graphics.</rule>
    <rule>NEVER use Red badge for non-urgent content.</rule>
    <rule>NEVER use Navy (#0d1b2a) as a full WSC post background — accent bars and data callouts only.</rule>
    <rule>NEVER use urgency theater on WSC posts (ALL CAPS, fire emoji, 'ACT FAST') — state real numbers calmly.</rule>
    <rule>NEVER lead with price on the WSC post canvas — lead with the experience, price in caption or bio.</rule>
  </anti_patterns>

  <wsc_instagram_design_system>
    <version>1.0 — April 2026</version>
    <principle>WSC Instagram is a hospitality and community brand, not a sports performance brand. The default register is warm, editorial, and facility-proud — never a sports-brand shout.</principle>

    <palette>
      <surface name="Primary post background">Parchment Light #e8e0d3 — all posts start here</surface>
      <surface name="Card / container">Cream #faf9f5 — inner panels, stat boxes</surface>
      <surface name="Accent only">Navy #0d1b2a — accent bars, data callouts, never full background</surface>
      <companion name="Soft Blue">#bfdbfe — italic highlight background (one per post maximum)</companion>
      <companion name="Sage">#a7c4a0 — category dot in schedule grids</companion>
      <companion name="Sun">#f5d87e — category dot in schedule grids</companion>
      <companion name="Deep Blue Text">#1e3a5f — Caveat accent lines only</companion>
    </palette>

    <typography>
      <weight name="Display">Inter 200 ExtraLight — large headlines, clamp(28px,5vw,48px), letter-spacing -0.04em</weight>
      <weight name="Body">Inter 300 Light — supporting copy, clamp(13px,2vw,16px)</weight>
      <weight name="UI">Inter 400 Regular — labels, captions, footers</weight>
      <italic_rule>Use Inter italic on ONE word or short phrase per post. Adds warmth without decoration. e.g. 'Summer *is here*' or 'Court *reserved*'.</italic_rule>
      <caveat_rule>Caveat (handwritten font) may be used for ONE accent line per post only — a date, a warm aside, a soft CTA. 13–18px, Deep Blue Text (#1e3a5f) only. Never use Caveat for headlines or body copy. Never use more than one Caveat line per post.</caveat_rule>
    </typography>

    <template_taxonomy>
      <category name="Everyday">Community Moment, Facility Showcase, Program Spotlight, Staff/Coach Feature, Member Story, Seasonal Moment — 6 templates</category>
      <category name="Pricing">Membership Tier, Program Pricing, Seasonal Offer, Referral — 4 templates. Lead with experience, price in caption.</category>
      <category name="Transactional">Event Announcement, Registration Open, Waitlist, Cancellation, Reminder, Recap — 6 templates</category>
    </template_taxonomy>

    <anti_patterns>
      <pattern name="Newsletter Trap">Small fonts, dense text, multiple columns — looks like a community center newsletter</pattern>
      <pattern name="Discount Flyer">Bright red background, starburst shapes, price-first hierarchy — looks like a grocery store circular</pattern>
      <pattern name="Text Overload">More than 3 text elements on canvas — WSC posts are visual-first, not information-dense</pattern>
      <pattern name="Urgency Theater">ALL CAPS, fire emoji, 'ACT FAST!!' — state real numbers calmly: '3 of 12 spots remaining'</pattern>
      <pattern name="Stock Photo Substitute">Generic tennis/golf stock imagery — use real WSC athletes, real courts, real campus moments</pattern>
      <pattern name="Caveat Overuse">Multiple Caveat lines in one post — one handwritten accent only; more than one turns the post into a greeting card</pattern>
    </anti_patterns>
  </wsc_instagram_design_system>

  <output_protocol>
    <step>1. Identify the brand: Tier 1 or WSC? If unclear, ask before writing.</step>
    <step>2. Identify the channel: Instagram, Email, Website, Signage, or other?</step>
    <step>3. Apply the correct voice constants for that brand × channel combination.</step>
    <step>4. Use only approved vocabulary. Flag any word from the never-use list.</step>
    <step>5. Attach the content to a real story, person, or moment — never write in the abstract.</step>
    <step>6. For captions: include the appropriate hashtag set.</step>
    <step>7. For emails: use the one-story, one-CTA structure.</step>
    <step>8. For taglines: use only the approved list. Never paraphrase.</step>
    <step>9. Final check: could this have been written for any other sports club? If yes, rewrite it.</step>
    <step>10. Flag any content that violates the anti-patterns list.</step>
  </output_protocol>

  <hashtags>
    <brand ref="tier1">
      <primary>#Tier1Performance #BuildHereCompeteEverywhere #TheStandardIsTheStandard #Tier1Academy #FullTimeTennis #FullTimeGolf #PerformancePathway #TrainWithoutLimits</primary>
      <secondary>#WSCTier1 #WoodinvilleSportsClub #PNWTennis #PNWGolf #JuniorTennis #JuniorGolf #AcademyLife #EliteTraining</secondary>
    </brand>
    <brand ref="wsc">
      <primary>#WoodinvillesSportsClub #WSC #ElevateYourGame #EnrichYourLife #YourClubYourCommunity #WSCFamily #WoodinvilleWA</primary>
      <secondary>#PNWSports #FamilySports #CommunityFirst #WSCTennis #WSCGolf #67AcreCampus #SportsCommunity</secondary>
    </brand>
  </hashtags>
</system>`;

// ─── SONNET 4.6 SYSTEM PROMPT ────────────────────────────────────────────────
// Optimized for: fast daily-use content generation, social captions, emails,
// quick copy reviews. Concise, task-focused, direct instructions.
// Token budget: ~1,100 tokens. Designed for Claude Sonnet 4.6 (claude-sonnet-4-6).
const SONNET_PROMPT = `# WSC & Tier 1 Performance — Brand Voice System Prompt
# Claude Sonnet 4.6 | v2.3 | May 2026 | Daily Use Version

## YOUR ROLE
You are a brand-aligned content assistant for Tier 1 Performance and Woodinville Sports Club (WSC). You write on-brand social captions, emails, program descriptions, and copy. You never write generic sports marketing. Every output must be traceable to a real person, moment, or proof point.

## TWO BRANDS — NEVER MIX THEM

**TIER 1 PERFORMANCE** — Performance brand. Dark, direct, earned. Charcoal + blue. Oswald uppercase. Voice: coach-to-athlete. Process-first. Proof-based.

**WSC (WOODINVILLE SPORTS CLUB)** — Platform + facility. 67-acre campus. Family-facing, warm, community-forward. Parchment (#e8e0d3) post backgrounds, Cream (#faf9f5) cards, Navy (#0d1b2a) accent bars only, Inter 200/300 display/body, one italic warmth signal, one Caveat accent maximum. Voice: welcoming, inclusive, aspirational.

Before writing anything: ask yourself — Tier 1 or WSC? Wrong answer = wrong output.

## TIER 1 VOICE RULES (apply every time)
- EARNED: Back every claim with proof. "Penn. Harvard. Stanford. USC. Princeton. Miami. Auburn. Boston College. Built here."
- DIRECT: Demanding but not cruel. "This is not for everyone. It's for athletes who want to compete."
- PROCESS-FIRST: Show the work. "Six weeks of early mornings. 400+ serves last week. Today it showed."
- SPECIFIC: Name the coach, the drill, the athlete. Never write "great session today."
- NO GATEKEEPING: Tier 1 is for committed athletes at every level — not "elite only."

## TIER 1 INSTAGRAM DESIGN SYSTEM
- Register mix: Teaching 50%, Documentary 40%, Manifesto 10%.
- Blue accents ONE element per post — never two.
- Red = urgency only. Amber #f59e0b = operational alerts only.
- Sharp corners always. Never rounded.
- One hero per post. Pricing never on canvas — caption only.
- Universal templates cover training, stats, quotes, lists, photo+label, and culture.

## WSC VOICE RULES (apply every time)
- WELCOMING: Premium but never intimidating. "Your Saturday at WSC starts with a 7am junior clinic."
- COMMUNITY: Every message reinforces belonging. "The Woodinville community made this campus what it is."
- FAMILY-INCLUSIVE: Athletes, parents, families — all in the narrative.
- ACCESSIBLE: High standard, low barrier. "Elevate Your Game. Enrich Your Life."

## WSC INSTAGRAM DESIGN SYSTEM
- Parchment #e8e0d3 = primary post background.
- Cream #faf9f5 = card/container surface.
- Navy #0d1b2a = accent bars and data callouts only, never full background.
- Inter 200 ExtraLight = display headlines. Inter 300 Light = body copy.
- Use italic on ONE word or short phrase per post for warmth.
- Caveat 400–700 = one handwritten accent line only, Deep Blue, never headline/body.
- Soft Blue = italic highlight; Sage/Sun = schedule category dots. Never use companion colors as full backgrounds.

## TONE BY CHANNEL
- Instagram/TikTok → Tier 1: minimal, confident, no exclamation points | WSC: warm, story-driven
- Email → Tier 1: direct subject, one story, one CTA | WSC: personal voice, community-first
- Website → Tier 1: proof-based, intense | WSC: welcoming, family-oriented
- Signage → Tier 1: Oswald caps, minimal | WSC: Inter caps, clear, warm

## APPROVED TAGLINES — USE EXACTLY AS WRITTEN
Tier 1: "The Standard Is The Standard." / "Train Without Limits." / "Built Here." / "Two Divisions. One System."
WSC: "Elevate Your Game. Enrich Your Life." / "Your Club. Your Community. Your Game." / "Where Families Play. Where Athletes Are Built."

## VOCABULARY
USE: Athlete, Academy, Player development, Family, Campus, Community, Programs, Compete, Execute, Develop, Earn, Build, Experience, The standard, The environment, Cultural home, Tier 1 at WSC, Two Divisions / One System
NEVER USE: World-class (no proof), Amazing/Incredible/Awesome, Easy/Fun (Tier 1), Casual/Recreational (Tier 1), Discount/Deal/Sale/Promo, Exclusive/Elite only (WSC), Student/Kid (formal), Front desk staff

## ANTI-PATTERNS — NEVER DO THESE
1. Generic promo without a story attached
2. Wins without the work that earned them
3. Copy that could be from any sports club anywhere
4. Tagline paraphrasing — use exact wording or nothing
5. Cross-brand visual language mixing
6. Tier 1 pricing or discounts on the post canvas
7. Rounded corners on Tier 1 Instagram graphics
8. Red badge for non-urgent content
9. Navy as a full WSC post background
10. WSC urgency theater: ALL CAPS, fire emoji, "ACT FAST"
11. Caveat overuse or multiple italic highlights in one WSC post

## OUTPUT CHECKLIST (run before every response)
☐ Which brand: Tier 1 or WSC?
☐ Which channel?
☐ Voice constants applied?
☐ No words from the never-use list?
☐ Attached to a real story/person/moment?
☐ Could this be from any other sports club? If yes — rewrite.

## HASHTAGS
Tier 1 primary: #Tier1Performance #BuildHereCompeteEverywhere #TheStandardIsTheStandard #Tier1Academy #FullTimeTennis #FullTimeGolf #PerformancePathway #TrainWithoutLimits
WSC primary: #WoodinvilleSportsClub #WSC #ElevateYourGame #EnrichYourLife #YourClubYourCommunity #WSCFamily #WoodinvilleWA`;

// ─── CHANNEL TEMPLATES ────────────────────────────────────────────────────────
const CHANNEL_TEMPLATES = [
  {
    id: "t1-instagram",
    brand: "Tier 1",
    model: "Both",
    label: "Tier 1 Instagram Caption",
    description: "Process-focused caption with hashtags. Fill in athlete, drill, and result.",
    prompt: `Write a Tier 1 Performance Instagram caption.

Brand: Tier 1 Performance
Channel: Instagram
Tone: Direct, process-first, earned — no exclamation points

Context:
- Athlete: [NAME, age optional]
- Drill / Session type: [DESCRIBE THE WORK]
- Result or moment: [WHAT HAPPENED — be specific]
- Coach (optional): [COACH NAME]

Requirements:
- Start with the work, not the result
- Maximum 3 sentences of caption copy
- One line break before hashtags
- Use Tier 1 primary hashtag set
- No generic openers ("What a session!", "So proud of...")
- Must pass the test: could this be from any other sports club? If yes, rewrite.`,
  },
  {
    id: "wsc-instagram",
    brand: "WSC",
    model: "Both",
    label: "WSC Instagram Caption",
    description: "Community-forward caption. Fill in event, people, and moment.",
    prompt: `Write a WSC (Woodinville Sports Club) Instagram caption.

Brand: Woodinville Sports Club (WSC)
Channel: Instagram
Tone: Warm, community-forward, family-inclusive

Context:
- Event / moment: [DESCRIBE WHAT HAPPENED]
- Who was there: [ATHLETES / FAMILIES / COMMUNITY MEMBERS]
- Feeling or theme: [WHAT MADE THIS MOMENT WSC]

Requirements:
- Lead with the community or family moment
- Warm but not saccharine
- 2-4 sentences
- One line break before hashtags
- Use WSC primary hashtag set
- Never use "exclusive," "elite only," or "members only"`,
  },
  {
    id: "t1-email",
    brand: "Tier 1",
    model: "Opus 4.6",
    label: "Tier 1 Enrollment Email",
    description: "One-story, one-CTA enrollment or program email. Opus 4.6 recommended for nuance.",
    prompt: `Write a Tier 1 Performance enrollment or program email.

Brand: Tier 1 Performance
Channel: Email
Tone: Direct, proof-based, coach-to-athlete register

Email details:
- Email type: [Enrollment confirmation / Program announcement / Session reminder]
- Program: [PROGRAM NAME]
- Key story or proof point: [REAL MOMENT, ATHLETE, OR RESULT TO ANCHOR THE EMAIL]
- Primary CTA: [ONE ACTION — enroll, confirm, register, etc.]
- Recipient: [Athlete / Parent / Both]

Requirements:
- Subject line: direct, no clickbait, under 50 characters
- Preheader: one sentence that extends the subject, not repeats it
- One story, one CTA — no secondary asks
- Never open with a promotional statement
- Sign off with coach or program director name, not "The Team"
- Flag any word from the never-use vocabulary list`,
  },
  {
    id: "wsc-email",
    brand: "WSC",
    model: "Opus 4.6",
    label: "WSC Community Email",
    description: "Personal, community-first email. Opus 4.6 recommended for tone accuracy.",
    prompt: `Write a WSC (Woodinville Sports Club) community or marketing email.

Brand: Woodinville Sports Club (WSC)
Channel: Email
Tone: Personal, trusted voice, community-forward

Email details:
- Email type: [Newsletter / Event invite / Program announcement / Re-engagement]
- Subject: [TOPIC OR EVENT]
- Community story or moment: [REAL WSC MOMENT TO ANCHOR THE EMAIL]
- Primary CTA: [ONE ACTION]
- Audience: [Members / Families / Prospective members]

Requirements:
- Subject line: warm, personal, under 55 characters
- Open with the community story — never with a promotion
- One story, one CTA
- Include at least one family-inclusive reference
- Sign off warmly — name + role, not "The WSC Team"
- Never use "exclusive," "limited time," or "don't miss out"`,
  },
  {
    id: "program-description",
    brand: "Both",
    model: "Opus 4.6",
    label: "Program Description",
    description: "Website or brochure program copy. Opus 4.6 recommended for long-form accuracy.",
    prompt: `Write a program description for [TIER 1 PERFORMANCE / WSC].

Brand: [Tier 1 Performance OR Woodinville Sports Club]
Channel: Website / Brochure
Tone: [Tier 1: proof-based, process-forward | WSC: welcoming, family-inclusive]

Program details:
- Program name: [NAME]
- Sport: [TENNIS / GOLF / OTHER]
- Target athlete: [AGE RANGE, LEVEL, COMMITMENT TYPE]
- Key differentiator: [WHAT MAKES THIS PROGRAM SPECIFIC TO THIS BRAND]
- Proof points: [REAL OUTCOMES, ALUMNI, COACHES, STATS]

Requirements:
- 150-200 words
- Lead with the differentiator, not the features
- Include at least one proof point (alumni, result, coach credential)
- Use approved vocabulary throughout
- End with the appropriate primary tagline
- No bullet points — flowing prose only`,
  },
  {
    id: "athlete-story",
    brand: "Tier 1",
    model: "Opus 4.6",
    label: "Athlete Story / Feature",
    description: "Long-form athlete spotlight. Opus 4.6 extended thinking recommended.",
    prompt: `Write a Tier 1 Performance athlete story or spotlight feature.

Brand: Tier 1 Performance
Channel: [Website / Email / Social long-form]
Tone: Embedded, process-first, earned — told from inside the culture

Athlete details:
- Name: [NAME]
- Age / Grade (optional): [AGE]
- Sport + program: [TENNIS / GOLF, FULL-TIME / COMPETITIVE]
- The work: [SPECIFIC DRILLS, SESSIONS, TIMELINE — what did they actually do?]
- The moment or result: [TOURNAMENT, COMMITMENT, MILESTONE]
- Coach perspective (optional): [WHAT DID THE COACH SEE CHANGE?]
- What's next: [NEXT GOAL OR DESTINATION]

Requirements:
- 250-400 words
- Start with the work — never the result
- Include at least one specific coaching moment or drill detail
- Quote the athlete or coach if details are provided
- End with forward momentum, not a summary
- Apply "Built Here" framing if appropriate
- No stock-photo language — this must read as documented, not produced`,
  },
  {
    id: "brand-review",
    brand: "Both",
    model: "Opus 4.6",
    label: "Brand Compliance Review",
    description: "Paste any draft copy for a full brand compliance audit. Opus 4.6 recommended.",
    prompt: `Review the following content for brand compliance against WSC & Tier 1 Performance guidelines.

Brand: [Tier 1 Performance / WSC / Both]
Channel: [CHANNEL WHERE THIS WILL BE PUBLISHED]

Content to review:
---
[PASTE CONTENT HERE]
---

Please provide:
1. BRAND DETERMINATION — Is this correctly identified as Tier 1 or WSC content?
2. VOICE CONSTANTS CHECK — Which voice constants are applied correctly? Which are violated?
3. VOCABULARY AUDIT — Flag any words from the never-use list. Suggest approved alternatives.
4. ANTI-PATTERN FLAGS — Does this content violate any of the 8 anti-patterns?
5. TAGLINE CHECK — Are any taglines used? Are they exact? Any paraphrasing?
6. THE FINAL TEST — Could this have been written for any other sports club? If yes, explain why and suggest a rewrite direction.
7. COMPLIANCE SCORE — Rate 1-10 with specific reasoning.
8. REVISED VERSION — Provide a corrected version if score is below 8.`,
  },
];

// ─── SETUP STEPS ─────────────────────────────────────────────────────────────
const SETUP_STEPS = [
  {
    step: 1,
    title: "Create a Claude for Work Project",
    description: "In Claude for Work Enterprise, click 'New Project' and name it 'WSC & Tier 1 Brand Voice'. Projects give every team member a shared workspace with the same system prompt loaded automatically.",
  },
  {
    step: 2,
    title: "Choose your model",
    description: "Select Claude Opus 4.6 (claude-opus-4-6) for strategy, long-form content, and brand compliance reviews. Select Claude Sonnet 4.6 (claude-sonnet-4-6) for daily social captions, quick emails, and fast copy tasks. You can create two separate Projects — one per model.",
  },
  {
    step: 3,
    title: "Paste the correct system prompt",
    description: "Copy the Opus 4.6 prompt for the strategy/review Project, or the Sonnet 4.6 prompt for the daily-use Project. Paste it into the Project's 'System Prompt' field. The entire brand voice, vocabulary, and anti-patterns are now loaded for every team member automatically.",
  },
  {
    step: 4,
    title: "Upload supporting knowledge files",
    description: "In the Project's Knowledge section, upload 3-5 real approved content examples (approved captions, emails, program descriptions). Claude uses these as style references — not just rules. Real examples dramatically improve output quality.",
  },
  {
    step: 5,
    title: "Save channel templates as Saved Prompts",
    description: "Copy each of the 7 channel templates and save them as Claude 'Saved Prompts' in the Project. Team members can then access any template in one click without returning to this Brand Kit.",
  },
  {
    step: 6,
    title: "Set the update trigger",
    description: "Whenever brand guidelines change, update the system prompt version number and date. This automatically triggers the re-certification requirement in the Brand Onboarding Quiz, ensuring the team stays current.",
  },
  {
    step: 7,
    title: "Run a Brand Compliance Review before publishing",
    description: "Use the Brand Compliance Review template (Channel Templates tab) to audit any Claude output before it goes live. Paste the draft, run the review, and check the compliance score. Target 8/10 or above before publishing.",
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ClaudeSystemPrompt() {
  const [activeTab, setActiveTab] = useState<"prompt" | "templates" | "setup">("prompt");
  const [activeModel, setActiveModel] = useState<"opus" | "sonnet">("opus");
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const currentPrompt = activeModel === "opus" ? OPUS_PROMPT : SONNET_PROMPT;
  const currentTokens = activeModel === "opus" ? "~2,400 tokens" : "~1,100 tokens";
  const currentModelLabel = activeModel === "opus" ? "Claude Opus 4.6" : "Claude Sonnet 4.6";
  const currentModelId = activeModel === "opus" ? "claude-opus-4-6" : "claude-sonnet-4-6";
  const currentUseCase = activeModel === "opus"
    ? "Strategy, long-form content, brand compliance reviews, complex multi-step tasks"
    : "Daily social captions, quick emails, fast copy generation, routine content tasks";

  const tabs = [
    { id: "prompt" as const, label: "System Prompt", icon: <Brain size={14} /> },
    { id: "templates" as const, label: "Channel Templates", icon: <Zap size={14} /> },
    { id: "setup" as const, label: "Setup Guide", icon: <Settings size={14} /> },
  ];

  return (
    <div style={{ padding: "48px 48px 64px", maxWidth: "1000px" }}>
      <SectionHeader
        label="TOOLS"
        title="CLAUDE SYSTEM PROMPT"
        subtitle="Two fully optimized brand voice prompts for Claude for Work Enterprise — one for deep strategy work (Opus 4.6), one for fast daily content (Sonnet 4.6). Paste either into your Claude Project system prompt to give your entire team an on-brand AI assistant from day one."
      />

      {/* Model Selector */}
      <div style={{
        background: "#1a1d21",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "20px 24px",
        marginBottom: "32px",
        display: "flex",
        flexDirection: "column" as const,
        gap: "16px",
      }}>
        <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "11px", color: "#a0a5ad", letterSpacing: "0.12em" }}>
          SELECT MODEL
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const }}>
          {/* Opus 4.6 */}
          <button
            onClick={() => setActiveModel("opus")}
            style={{
              flex: 1,
              minWidth: "240px",
              padding: "16px 20px",
              background: activeModel === "opus" ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.03)",
              border: `2px solid ${activeModel === "opus" ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.08)"}`,
              cursor: "pointer",
              textAlign: "left" as const,
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <Brain size={18} color={activeModel === "opus" ? "#3b82f6" : "#a0a5ad"} />
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "15px", color: activeModel === "opus" ? "#e8e8e8" : "#a0a5ad", letterSpacing: "0.04em" }}>
                CLAUDE OPUS 4.6
              </div>
              <div style={{
                padding: "2px 8px",
                background: activeModel === "opus" ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${activeModel === "opus" ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.1)"}`,
                fontFamily: "Inter, sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                color: activeModel === "opus" ? "#3b82f6" : "#a0a5ad",
                letterSpacing: "0.06em",
              }}>
                RECOMMENDED
              </div>
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: activeModel === "opus" ? "#a0a5ad" : "#6b7280", lineHeight: 1.5 }}>
              XML-structured prompt with extended thinking support. Best for strategy, long-form content, brand compliance reviews, and complex multi-step tasks. ~2,400 tokens.
            </div>
            <div style={{ marginTop: "10px", fontFamily: "ui-monospace, monospace", fontSize: "11px", color: activeModel === "opus" ? "#3b82f6" : "#6b7280" }}>
              claude-opus-4-6
            </div>
          </button>

          {/* Sonnet 4.6 */}
          <button
            onClick={() => setActiveModel("sonnet")}
            style={{
              flex: 1,
              minWidth: "240px",
              padding: "16px 20px",
              background: activeModel === "sonnet" ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.03)",
              border: `2px solid ${activeModel === "sonnet" ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.08)"}`,
              cursor: "pointer",
              textAlign: "left" as const,
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <Cpu size={18} color={activeModel === "sonnet" ? "#3b82f6" : "#a0a5ad"} />
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "15px", color: activeModel === "sonnet" ? "#e8e8e8" : "#a0a5ad", letterSpacing: "0.04em" }}>
                CLAUDE SONNET 4.6
              </div>
              <div style={{
                padding: "2px 8px",
                background: activeModel === "sonnet" ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${activeModel === "sonnet" ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.1)"}`,
                fontFamily: "Inter, sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                color: activeModel === "sonnet" ? "#3b82f6" : "#a0a5ad",
                letterSpacing: "0.06em",
              }}>
                DAILY USE
              </div>
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: activeModel === "sonnet" ? "#a0a5ad" : "#6b7280", lineHeight: 1.5 }}>
              Concise Markdown prompt. Fast, cost-efficient, ideal for daily social captions, quick emails, and routine content generation. ~1,100 tokens.
            </div>
            <div style={{ marginTop: "10px", fontFamily: "ui-monospace, monospace", fontSize: "11px", color: activeModel === "sonnet" ? "#3b82f6" : "#6b7280" }}>
              claude-sonnet-4-6
            </div>
          </button>
        </div>

        {/* Active model context bar */}
        <div style={{
          padding: "10px 14px",
          background: "rgba(59,130,246,0.06)",
          borderLeft: "3px solid rgba(59,130,246,0.5)",
          fontFamily: "Inter, sans-serif",
          fontSize: "12px",
          color: "#a0a5ad",
          lineHeight: 1.5,
        }}>
          <strong style={{ color: "#e8e8e8" }}>{currentModelLabel}</strong> — {currentUseCase}. Token count: <strong style={{ color: "#3b82f6" }}>{currentTokens}</strong>. Model ID: <code style={{ fontFamily: "ui-monospace, monospace", color: "#3b82f6", fontSize: "11px" }}>{currentModelId}</code>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: "0", marginBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${activeTab === tab.id ? "#3b82f6" : "transparent"}`,
              color: activeTab === tab.id ? "#e8e8e8" : "#a0a5ad",
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.08em",
              cursor: "pointer",
              transition: "all 0.15s ease",
              marginBottom: "-1px",
            }}
          >
            {tab.icon}
            {tab.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── TAB: System Prompt ── */}
      {activeTab === "prompt" && (
        <div style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap" as const, gap: "12px" }}>
            <div>
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "16px", color: "#e8e8e8", letterSpacing: "0.05em" }}>
                {activeModel === "opus" ? "OPUS 4.6 — XML STRUCTURED PROMPT" : "SONNET 4.6 — MARKDOWN PROMPT"}
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#a0a5ad", marginTop: "4px" }}>
                v2.0 · March 2026 · {currentTokens} · Optimized for {currentModelLabel}
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(currentPrompt, "full-prompt")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                background: copiedId === "full-prompt" ? "rgba(34,197,94,0.15)" : "rgba(59,130,246,0.15)",
                border: `1px solid ${copiedId === "full-prompt" ? "rgba(34,197,94,0.4)" : "rgba(59,130,246,0.4)"}`,
                color: copiedId === "full-prompt" ? "#4ade80" : "#3b82f6",
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.02em",
              }}
            >
              {copiedId === "full-prompt" ? <Check size={14} /> : <Copy size={14} />}
              {copiedId === "full-prompt" ? "Copied!" : "Copy Full Prompt"}
            </button>
          </div>

          {/* Opus-specific callout */}
          {activeModel === "opus" && (
            <div style={{
              padding: "12px 16px",
              background: "rgba(59,130,246,0.06)",
              borderLeft: "3px solid rgba(59,130,246,0.4)",
              marginBottom: "16px",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: "#a0a5ad",
              lineHeight: 1.6,
            }}>
              <strong style={{ color: "#e8e8e8" }}>Opus 4.6 optimization notes:</strong> This prompt uses XML tags for unambiguous parsing — Opus 4.6 processes structured XML with significantly higher accuracy than plain Markdown. The <code style={{ fontFamily: "ui-monospace, monospace", color: "#3b82f6", fontSize: "11px" }}>&lt;output_protocol&gt;</code> block activates Opus's step-by-step reasoning. For complex brand reviews, prepend your request with "Think through this carefully before responding" to engage extended thinking.
            </div>
          )}

          {/* Sonnet-specific callout */}
          {activeModel === "sonnet" && (
            <div style={{
              padding: "12px 16px",
              background: "rgba(59,130,246,0.06)",
              borderLeft: "3px solid rgba(59,130,246,0.4)",
              marginBottom: "16px",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: "#a0a5ad",
              lineHeight: 1.6,
            }}>
              <strong style={{ color: "#e8e8e8" }}>Sonnet 4.6 optimization notes:</strong> This prompt uses concise Markdown — Sonnet 4.6 is highly instruction-following and processes plain Markdown efficiently. The checklist format at the end activates Sonnet's structured compliance behavior. For best results, use the channel templates below as your user-turn prompts rather than free-form requests.
            </div>
          )}

          {/* Prompt Preview */}
          <div style={{
            background: "#141618",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "24px",
            maxHeight: "600px",
            overflowY: "auto",
            position: "relative",
          }}>
            <pre style={{
              fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace",
              fontSize: "12px",
              color: "#c9d1d9",
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              margin: 0,
            }}>
              {currentPrompt}
            </pre>
          </div>

          {/* Stats row */}
          <div style={{ marginTop: "12px", display: "flex", gap: "24px", flexWrap: "wrap" as const }}>
            {[
              { label: "Approx. Tokens", value: currentTokens },
              { label: "Model", value: currentModelLabel },
              { label: "Format", value: activeModel === "opus" ? "XML Structured" : "Markdown" },
              { label: "Version", value: "v2.0 — March 2026" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#a0a5ad", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{stat.label}</div>
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "14px", color: "#e8e8e8", marginTop: "2px" }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: Channel Templates ── */}
      {activeTab === "templates" && (
        <div style={{ maxWidth: "900px" }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", marginBottom: "24px", lineHeight: 1.6 }}>
            These prompt templates are designed to be used <strong style={{ color: "#e8e8e8" }}>inside the Claude Project</strong> (after the system prompt is loaded). Copy any template, fill in the bracketed fields, and paste into Claude. Templates marked <strong style={{ color: "#3b82f6" }}>Opus 4.6</strong> benefit from extended thinking for nuanced brand accuracy. Templates marked <strong style={{ color: "#a0a5ad" }}>Both</strong> work well with either model.
          </div>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px" }}>
            {CHANNEL_TEMPLATES.map((template) => (
              <div
                key={template.id}
                style={{
                  background: "#1a1d21",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    cursor: "pointer",
                  }}
                  onClick={() => setExpandedTemplate(expandedTemplate === template.id ? null : template.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" as const }}>
                    <div style={{
                      padding: "3px 8px",
                      background: template.brand === "Tier 1" ? "rgba(59,130,246,0.15)" : template.brand === "WSC" ? "rgba(232,224,211,0.1)" : "rgba(255,255,255,0.08)",
                      border: `1px solid ${template.brand === "Tier 1" ? "rgba(59,130,246,0.3)" : template.brand === "WSC" ? "rgba(232,224,211,0.2)" : "rgba(255,255,255,0.15)"}`,
                      fontFamily: "Oswald, sans-serif",
                      fontWeight: 700,
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      color: template.brand === "Tier 1" ? "#3b82f6" : template.brand === "WSC" ? "#e8e0d3" : "#a0a5ad",
                    }}>
                      {template.brand.toUpperCase()}
                    </div>
                    <div style={{
                      padding: "3px 8px",
                      background: template.model === "Opus 4.6" ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${template.model === "Opus 4.6" ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.1)"}`,
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: template.model === "Opus 4.6" ? "#3b82f6" : "#a0a5ad",
                      letterSpacing: "0.04em",
                    }}>
                      {template.model === "Opus 4.6" ? "OPUS 4.6 RECOMMENDED" : "BOTH MODELS"}
                    </div>
                    <div>
                      <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "15px", color: "#e8e8e8", letterSpacing: "0.03em" }}>
                        {template.label}
                      </div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#a0a5ad", marginTop: "2px" }}>
                        {template.description}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); copyToClipboard(template.prompt, template.id); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 14px",
                        background: copiedId === template.id ? "rgba(34,197,94,0.1)" : "rgba(59,130,246,0.1)",
                        border: `1px solid ${copiedId === template.id ? "rgba(34,197,94,0.3)" : "rgba(59,130,246,0.25)"}`,
                        color: copiedId === template.id ? "#4ade80" : "#3b82f6",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {copiedId === template.id ? <Check size={12} /> : <Copy size={12} />}
                      {copiedId === template.id ? "Copied" : "Copy"}
                    </button>
                    <div style={{ color: "#a0a5ad" }}>
                      {expandedTemplate === template.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </div>

                {expandedTemplate === template.id && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "16px 20px", background: "#141618" }}>
                    <pre style={{
                      fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace",
                      fontSize: "12px",
                      color: "#c9d1d9",
                      lineHeight: 1.7,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      margin: 0,
                    }}>
                      {template.prompt}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: Setup Guide ── */}
      {activeTab === "setup" && (
        <div style={{ maxWidth: "700px" }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", marginBottom: "32px", lineHeight: 1.6 }}>
            Follow these steps to deploy the brand voice system prompt to your Claude for Work Enterprise workspace. Once set up, every team member who opens the project will automatically have the full brand guidelines loaded — no prompting required.
          </div>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0" }}>
            {SETUP_STEPS.map((step, idx) => (
              <div key={step.step} style={{ display: "flex", gap: "20px", position: "relative" }}>
                {idx < SETUP_STEPS.length - 1 && (
                  <div style={{
                    position: "absolute",
                    left: "19px",
                    top: "40px",
                    width: "2px",
                    height: "calc(100% - 16px)",
                    background: "rgba(59,130,246,0.2)",
                  }} />
                )}
                <div style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(59,130,246,0.15)",
                  border: "1px solid rgba(59,130,246,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#3b82f6",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                }}>
                  {step.step}
                </div>
                <div style={{ paddingBottom: "28px", flex: 1 }}>
                  <div style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "#e8e8e8",
                    letterSpacing: "0.03em",
                    marginBottom: "6px",
                    marginTop: "8px",
                  }}>
                    {step.title}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#a0a5ad", lineHeight: 1.6 }}>
                    {step.description}
                  </div>
                  {step.step === 3 && (
                    <button
                      onClick={() => { setActiveTab("prompt"); }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "10px",
                        padding: "7px 14px",
                        background: "rgba(59,130,246,0.1)",
                        border: "1px solid rgba(59,130,246,0.3)",
                        color: "#3b82f6",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <BookOpen size={12} />
                      View System Prompts →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Best practices box */}
          <div style={{
            background: "#1a1d21",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "20px",
            marginTop: "8px",
          }}>
            <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "13px", color: "#3b82f6", letterSpacing: "0.08em", marginBottom: "12px" }}>
              BEST PRACTICES FOR CLAUDE 4.6
            </div>
            {[
              "For Opus 4.6 brand reviews, prepend your request with 'Think through this carefully before responding' to engage extended thinking — this activates deeper brand reasoning.",
              "Set Opus 4.6 effort to 'medium' for routine content tasks to reduce latency. Reserve 'high' effort for complex strategy work and multi-document brand reviews.",
              "Create two separate Claude Projects — one with the Opus 4.6 XML prompt for strategy/review, one with the Sonnet 4.6 Markdown prompt for daily content. Name them clearly.",
              "Update the system prompt version number and date whenever brand guidelines change — this automatically triggers re-certification in the Brand Onboarding Quiz.",
              "Add 3-5 real approved content examples to the Project knowledge base. Claude 4.6 models use these as style references with significantly higher accuracy than rules alone.",
              "Use the Brand Compliance Review template to audit Claude output before publishing. Target 8/10 or above. Run it in Opus 4.6 for the most thorough analysis.",
            ].map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
                <div style={{ color: "#3b82f6", fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "12px", flexShrink: 0, marginTop: "1px" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#a0a5ad", lineHeight: 1.6 }}>
                  {tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
