"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowUpRight,
  BellRing,
  Camera,
  ChevronRight,
  Compass,
  Dribbble,
  FileText,
  History,
  Layers3,
  Link2,
  LockKeyhole,
  Mail,
  Map,
  MonitorCheck,
  Route,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Tent,
  Wrench,
} from "lucide-react";

import { MaxHeightImageViewport } from "@/components/max-height-image-viewport";

type SnapshotItem = {
  label: string;
  value: string;
};

type DetailItem = {
  title: string;
  detail: string;
  icon?: LucideIcon;
};

type PersonaItem = {
  audience: string;
  job: string;
  needed: string;
};

type PersonaSectionContent = {
  title: string;
  body: string;
  jobLabel: string;
  items: PersonaItem[];
};

type JourneyItem = {
  phase: string;
  title: string;
  detail: string;
  evidence: string;
};

type StoryItem = {
  phase: string;
  label: string;
  title: string;
  image: string;
  alt: string;
  story: string;
  evidence: string;
};

type CaseStudyContribution = {
  owned: string[];
  partnered: string[];
  proof: string[];
};

type CaseStudyTimelineItem = {
  date: string;
  detail: string;
};

export type CaseStudy = {
  id: string;
  shortLabel: string;
  product: string;
  platform: string;
  headline: string;
  summary: string;
  cardSummary?: string;
  role: string;
  status: string;
  contribution?: CaseStudyContribution;
  heroImage: string;
  heroAlt: string;
  thumbnailImage?: string;
  thumbnailAlt?: string;
  thumbnailBackground?: string;
  accent: string;
  activeClass: string;
  icon: LucideIcon;
  snapshot: SnapshotItem[];
  impact: DetailItem[];
  journey: JourneyItem[];
  surfaces: DetailItem[];
  systemBuild: string[];
  decisions: DetailItem[];
  story: StoryItem[];
  outcomesTitle: string;
  outcomes: string[];
  outcomeTimeline?: {
    title: string;
    items: CaseStudyTimelineItem[];
  };
  takeaway: string;
};

const fourPartJourneyCues: Array<{ label: string }> = [
  { label: "Signal" },
  { label: "Frame" },
  { label: "System" },
  { label: "Outcome" },
];

const fivePartJourneyCues: Array<{ label: string }> = [
  { label: "Signal" },
  { label: "Frame" },
  { label: "System" },
  { label: "Expand" },
  { label: "Outcome" },
];

function getJourneyCue(index: number, total: number) {
  const cues = total >= 5 ? fivePartJourneyCues : fourPartJourneyCues;
  return cues[index] ?? { label: "Thread" };
}

function getCaseStudyThumbnail(study: CaseStudy) {
  return {
    src: study.thumbnailImage ?? study.heroImage,
    alt: study.thumbnailAlt ?? study.heroAlt,
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "graphicsnack-web",
    shortLabel: "GraphicSnack Web",
    product: "GraphicSnack",
    platform: "Web app",
    headline: "Designing and building a critique copilot for modern product builders",
    summary:
      "GraphicSnack helps builders improve screens and flows faster with concrete critique. I owned the critique framework, product experience, UI systems, and reliability work that made the output more actionable.",
    role: "Lead product designer and builder",
    status: "Live product system",
    heroImage: "/screenshots/case-study-project-details-current.png",
    heroAlt: "GraphicSnack project details page with critique scores and recommendations",
    thumbnailBackground: "#F1E4DE",
    accent: "bg-[#d84f2a]",
    activeClass: "border-[#d84f2a] bg-[#d84f2a] text-white",
    icon: MonitorCheck,
    snapshot: [
      { label: "Product", value: "GraphicSnack" },
      { label: "Role", value: "Lead product designer and builder" },
      { label: "Timeline", value: "2026 to present" },
      { label: "Scope", value: "UX strategy, interaction design, front-end implementation" },
    ],
    impact: [
      {
        title: "Critique clarity",
        detail:
          "Reframed reports around priority, rationale, and validation paths so teams can act without interpretation overhead.",
      },
      {
        title: "System coherence",
        detail:
          "Unified Quick and Deep critique patterns with shared score modules while preserving each mode's depth.",
      },
      {
        title: "Reliability",
        detail:
          "Reduced misleading report states by improving loading behavior, low-signal handling, and capture fallbacks.",
      },
      {
        title: "Context grounding",
        detail:
          "Integrated goal, audience, and focus context into report generation so output maps to user intent.",
      },
    ],
    journey: [
      {
        phase: "01",
        title: "Live dogfooding sessions",
        detail:
          "Users struggled to map numeric scores to action priority when score models changed across surfaces.",
        evidence: "Shared critique score module and standardized score language.",
      },
      {
        phase: "02",
        title: "Report quality audits",
        detail:
          "Opportunity cards repeated generic phrasing and reduced perceived trust in the output.",
        evidence: "Finding generation now requires stronger evidence anchoring.",
      },
      {
        phase: "03",
        title: "Workflow observation",
        detail:
          "Project operations like rename, delete, select, and versioning felt inconsistent across the app.",
        evidence: "Shared dropdown, modal, checkbox, and action-bar patterns.",
      },
      {
        phase: "04",
        title: "Failure-state review",
        detail:
          "Low-signal URL captures could produce reports that looked more confident than the source allowed.",
        evidence: "Clearer low-confidence messaging and fallback behavior.",
      },
    ],
    surfaces: [
      {
        title: "Scoring architecture",
        detail: "Weighted dimensions replaced noisy score stacks with one understandable score story.",
        icon: Target,
      },
      {
        title: "Critique intake",
        detail: "Required goal, audience, and focus fields made reports more specific to the actual product job.",
        icon: FileText,
      },
      {
        title: "Project memory",
        detail: "Versioning, saved reports, and implementation guidance turned critique into an ongoing loop.",
        icon: History,
      },
      {
        title: "Operational UI",
        detail: "Shared controls cleaned up project actions, menus, modals, and repeated workflow states.",
        icon: Wrench,
      },
    ],
    systemBuild: [
      "Defined critique principles, scoring architecture, and quality rubric for recommendation output.",
      "Designed and implemented product surfaces in Next.js and Tailwind with reusable UI primitives.",
      "Standardized cross-page interaction patterns for menus, modals, checkboxes, and action bars.",
      "Hardened screenshot and URL critique generation under low-signal conditions.",
      "Aligned report modules around summary, scores, opportunities, and validation paths.",
    ],
    decisions: [
      {
        title: "Replace the legacy score stack",
        detail:
          "I moved from a noisy multi-score model to weighted dimensions that balance clarity and depth while keeping tradeoffs visible.",
      },
      {
        title: "Require context at intake",
        detail:
          "Optional context produced generic recommendations, so goal, audience, and focus became part of the quality gate.",
      },
      {
        title: "Unify operational interactions",
        detail:
          "Dropdowns, modals, selection states, and action bars became standardized because workflow friction was undermining trust.",
      },
    ],
    story: [
      {
        phase: "01",
        label: "Report",
        title: "Project details became the working surface",
        image: "/screenshots/case-study-project-details-current.png",
        alt: "GraphicSnack project details page",
        story:
          "The report brings score, summary, opportunity, and implementation guidance into one scanning model instead of scattering critique across separate explanations.",
        evidence: "Score modules, priority findings, next actions, and implementation guidance.",
      },
      {
        phase: "02",
        label: "Workspace",
        title: "Project memory replaced one-off feedback",
        image: "/screenshots/case-study-projects-current.png",
        alt: "GraphicSnack projects workspace",
        story:
          "The project list makes critique history durable. Users can return to a product, compare progress, and keep shipping from the same source of truth.",
        evidence: "Saved projects, filters, project state, and repeated action patterns.",
      },
      {
        phase: "03",
        label: "Intake",
        title: "The request flow asks for the context critique needs",
        image: "/screenshots/case-study-add-critique-current.png",
        alt: "GraphicSnack add critique page",
        story:
          "Intake balances speed with enough structure to avoid generic output. The user chooses source, goal, audience, and focus before the critique runs.",
        evidence: "Screenshot or URL critique with goal, audience, and focus context.",
      },
      {
        phase: "04",
        label: "Operations",
        title: "Supporting surfaces made the product feel whole",
        image: "/screenshots/case-study-dashboard-current.png",
        alt: "GraphicSnack dashboard page",
        story:
          "Dashboard, resources, and settings surfaces turned the critique engine into a usable product environment for repeated work.",
        evidence: "Dashboard health, resource language, account controls, and critique operations.",
      },
    ],
    outcomesTitle: "What changed in the product",
    outcomes: [
      "Critique output now reads as grounded and execution-ready instead of abstract design commentary.",
      "Score comprehension improved through one weighted model and a consistent module hierarchy.",
      "Context appears naturally in report framing, making recommendations feel project-specific.",
      "Operational UX around project management and versioning is cleaner and more predictable.",
      "Failure scenarios now communicate confidence boundaries more clearly.",
    ],
    takeaway:
      "This work demonstrates 0-1 product ownership across strategy, UX, interaction systems, implementation, and quality judgment.",
  },
  {
    id: "campglint",
    shortLabel: "CampGlint",
    product: "CampGlint",
    platform: "Native iOS app",
    headline: "Campsite monitoring from cancellation signal to trip readiness",
    summary:
      "I designed and built CampGlint to help campers monitor cancellations, act when a site opens, and prepare once a booking is secured.",
    cardSummary:
      "Designed and built a native iOS app that helps campers track cancellations, book campsites, and get ready for their trip.",
    role: "Founder, product designer, iOS builder",
    status: "Native iOS build, preparing for launch",
    contribution: {
      owned: [
        "Defined the native iOS product loop across Monitors, Create Monitor, Discover, Trips, and Settings.",
        "Designed and built the SwiftUI app structure, interaction patterns, visual system, and key app states.",
        "Framed launch readiness around auth, session restore, notifications, deep links, App Intents, device QA, and App Store preparation.",
      ],
      partnered: [
        "Translated the campsite-availability problem into a monitor-based product model.",
        "Kept booking handoff transparent by preserving official campground systems as the final reservation endpoint.",
      ],
      proof: [
        "Monitoring and availability workflows",
        "Flexible setup and backup discovery",
        "Booking handoff, trip readiness, and native app foundations",
      ],
    },
    heroImage: "/projects/CampGlint/iOS%20app%20screens/01-monitors-list.png",
    heroAlt: "CampGlint iOS monitors list screen",
    thumbnailImage: "/projects/CampGlint/campglint-ios-current-thumbnail-lg.png",
    thumbnailAlt: "CampGlint iOS app screens showing monitor tracking, discovery, and trip readiness",
    thumbnailBackground: "#E7EFE5",
    accent: "bg-[#176B5D]",
    activeClass: "border-[#176B5D] bg-[#176B5D] text-white",
    icon: Tent,
    snapshot: [
      { label: "Product", value: "CampGlint" },
      { label: "Platform", value: "Native iOS app" },
      { label: "Role", value: "Founder, product designer, iOS builder" },
      { label: "Status", value: "Native iOS build, preparing for launch" },
    ],
    impact: [
      {
        title: "From monitoring to trip readiness",
        detail:
          "Connected saved monitors, backup discovery, booking handoff, and trip preparation in one native iOS experience.",
      },
      {
        title: "Clear status and next steps",
        detail:
          "Each saved monitor shows the campground, dates, provider, latest scan, availability state, and the action a camper can take next.",
      },
      {
        title: "Fast setup",
        detail:
          "Reduced monitor creation to a focused iOS sheet with starting points, campground search, trip window, flexible-date controls, and disabled-state guardrails.",
      },
      {
        title: "Platform depth",
        detail:
          "Extended the design system into native concerns: auth state, session restore, push notification scaffolding, deep links, App Intents, and shared SwiftUI components.",
      },
    ],
    journey: [
      {
        phase: "01",
        title: "Define the monitoring loop",
        detail:
          "Watch availability, surface trustworthy signals, and help campers act before a site disappears.",
        evidence: "Core product job",
      },
      {
        phase: "02",
        title: "Make monitors home",
        detail:
          "Saved monitors became the home for status, confidence, and next actions.",
        evidence: "Monitors tab",
      },
      {
        phase: "03",
        title: "Keep setup lightweight",
        detail:
          "Campground, dates, and flexibility stay separate so monitoring can start before plans are final.",
        evidence: "Create Monitor sheet",
      },
      {
        phase: "04",
        title: "Explore backup options",
        detail:
          "Discovery suggests backup campgrounds without requiring campers to know every option upfront.",
        evidence: "Discover tab",
      },
      {
        phase: "05",
        title: "Continue after booking",
        detail:
          "Trips carries a successful booking into dates, tasks, packing, and site readiness.",
        evidence: "Trips tab",
      },
    ],
    surfaces: [
      {
        title: "Monitors",
        detail:
          "Home-base screen with saved watches, active status, provider context, next scan timing, rescan action, and direct booking handoff.",
        icon: BellRing,
      },
      {
        title: "Create monitor",
        detail:
          "Native setup sheet for starting points, campground selection, date window, stay length, flexible timing, and required-field guardrails.",
        icon: Tent,
      },
      {
        title: "Discover",
        detail:
          "Discovery profile and recommendation surface that help campers shape backup options around terrain, drive range, camp style, and travel intent.",
        icon: Compass,
      },
      {
        title: "Trips",
        detail:
          "Post-booking workspace for confirmed reservations, readiness progress, packing, tasks, site details, and past-trip memory.",
        icon: Map,
      },
      {
        title: "Settings and system services",
        detail:
          "Account state, notification preferences, support surfaces, deep links, and iOS automation hooks that make the app feel native beyond the screens.",
        icon: MonitorCheck,
      },
    ],
    systemBuild: [
      "Defined the product loop from saved monitor to availability signal, official booking handoff, and post-booking trip readiness.",
      "Designed monitoring and setup workflows for campground targets, date windows, stay length, flexible timing, status, and next actions.",
      "Extended the product into backup discovery and lightweight trip readiness without distracting from the core monitoring job.",
      "Built the SwiftUI app foundation around authentication, session restore, native tab navigation, shared components, and reusable visual patterns.",
      "Prepared the native experience for notifications, deep links, App Intents, shortcut-ready actions, device QA, and launch configuration.",
    ],
    decisions: [
      {
        title: "Keep CampGlint native-first",
        detail:
          "The product direction centers on the native iOS experience: mobile information architecture, SwiftUI interaction patterns, and platform-specific launch readiness.",
      },
      {
        title: "Use monitors as the mental model",
        detail:
          "A monitor is easier to understand than a generic alert because it describes an ongoing watch, its target, and the user's next action.",
      },
      {
        title: "Keep booking handoff transparent",
        detail:
          "CampGlint can surface availability signals, but official booking systems remain the final endpoint for reservations and payment.",
      },
      {
        title: "Let Trips stay lightweight",
        detail:
          "Trip readiness supports the camping workflow without turning the app into a full planning suite or distracting from the monitor loop.",
      },
    ],
    story: [
      {
        phase: "01",
        label: "Monitors",
        title: "The iOS home screen starts with the user's active watches",
        image: "/projects/CampGlint/iOS%20app%20screens/01-monitors-list.png",
        alt: "CampGlint iOS monitors list screen",
        story:
          "The signed-in home screen puts saved monitors first, giving campers a quick read on campground targets, scan timing, alert state, and next actions.",
        evidence: "Active Glints, saved monitors, action menus, filters & sorting, rescans.",
      },
      {
        phase: "02",
        label: "Monitor detail",
        title: "Monitor detail turns a saved watch into a clear action surface",
        image: "/projects/CampGlint/iOS%20app%20screens/02-monitor-detail-hal-moon-bay-1.PNG",
        alt: "CampGlint iOS Half Moon Bay monitor detail screen",
        story:
          "The detail screen keeps campground context, trip timing, scan status, and booking handoff close to the saved monitor.",
        evidence: "Campground detail, reservation window, monitor status, active Glints, site fit, camp photos, and nearby campgrounds.",
      },
      {
        phase: "03",
        label: "Create monitor",
        title: "Monitor creation keeps setup focused and manageable",
        image: "/projects/CampGlint/iOS%20app%20screens/03-create-monitor-1.PNG",
        alt: "CampGlint iOS create monitor sheet",
        story:
          "The setup flow keeps campground selection, trip timing, stay length, and flexible-date controls in one native sheet so users can start a watch without committing to every detail upfront.",
        evidence: "Starting points, campground search, trip window, alert rules, site fit, trip window, and notes.",
      },
      {
        phase: "04",
        label: "Discover and discovery profile",
        title: "Discovery uses camper preferences to shape backup options",
        image: "/projects/CampGlint/iOS%20app%20screens/07-discovery-profile.PNG",
        alt: "CampGlint iOS discovery profile preferences screen",
        story:
          "Discover supports the moment before a user has a fixed destination by letting campers tune the kinds of backup campgrounds the product should prioritize.",
        evidence: "Discover page, discovery profile, terrain preferences, drive-range signals, camp-style inputs, and camp bases.",
      },
      {
        phase: "05",
        label: "Trips",
        title: "After a booking, the app shifts into readiness",
        image: "/projects/CampGlint/iOS%20app%20screens/04-trip-details.PNG",
        alt: "CampGlint iOS Fernwood trip detail screen",
        story:
          "Trip detail brings confirmed reservation information, the camping plan, readiness progress, packing, tasks, notes, photos, and post-trip reflections into one place.",
        evidence: "Confirmed trip details, camping plan, readiness progress, packing status, tasks, notes, camp photos, and post-trip notes.",
      },
    ],
    outcomesTitle: "What the product now supports",
    outcomes: [
      "Campers can track multiple campgrounds through saved monitors instead of repeatedly checking booking sites.",
      "Monitor setup, backup discovery, booking handoff, and trip readiness now work as one native iOS flow.",
      "The product preserves official reservation systems as the source of truth while supporting the native services needed for launch.",
    ],
    takeaway:
      "CampGlint turns a stressful, repeated search into one native loop from monitoring to booking handoff and trip readiness.",
  },
  {
    id: "graphicsnack-ios",
    shortLabel: "GraphicSnack iOS",
    product: "GraphicSnack iOS",
    platform: "Native SwiftUI app",
    headline: "Designing a native critique app for builders who need actionable product feedback",
    summary:
      "GraphicSnack iOS turns the critique product into a mobile loop: submit a URL or screenshot, anchor the critique in context, review evidence, ship the top fixes, and validate the next version.",
    role: "Founder, product designer, iOS builder",
    status: "Beta-ready prototype, launch gates active",
    heroImage: "/screenshots/graphicsnack-ios-case-study/projects-seeded-light-hires.png",
    heroAlt: "GraphicSnack iOS seeded projects screen",
    thumbnailBackground: "#E3EAF6",
    accent: "bg-[#2868c7]",
    activeClass: "border-[#2868c7] bg-[#2868c7] text-white",
    icon: Smartphone,
    snapshot: [
      { label: "Product", value: "GraphicSnack iOS" },
      { label: "Platform", value: "Native SwiftUI app" },
      { label: "Role", value: "Founder, product designer, iOS builder" },
      { label: "Status", value: "Beta-ready prototype, launch gates active" },
    ],
    impact: [
      {
        title: "URL-first critique on mobile",
        detail:
          "Moved beyond static screenshots by making URL capture, required product context, and focused analysis available from native iOS intake.",
      },
      {
        title: "Project memory instead of one-off feedback",
        detail:
          "Turned critiques into durable records with versions, scores, next fixes, and implementation evidence.",
      },
      {
        title: "Report as builder loop",
        detail:
          "Reframed the report into Review, Fix, and Validate modes so critique output translates into coding-tool implementation work.",
      },
      {
        title: "Launch readiness surfaced in-product",
        detail:
          "Built a Launch area for operational gates: backend, App Store Connect, privacy, QA, share extension, and release scope.",
      },
    ],
    journey: [
      {
        phase: "01",
        title: "Web critique prototype",
        detail:
          "The early product proved the value of submitting a URL or screenshot with goal and audience context.",
        evidence: "React/Vite prototype",
      },
      {
        phase: "02",
        title: "Mobile intake system",
        detail:
          "The iOS app centered the first job around source selection, critique depth, product context, focus areas, and a request dock.",
        evidence: "Create critique screen",
      },
      {
        phase: "03",
        title: "Project memory",
        detail:
          "Critiques became project history with versioning, score progression, implementation state, and first-fix guidance.",
        evidence: "Projects screen",
      },
      {
        phase: "04",
        title: "Builder loop",
        detail:
          "The report was organized around reviewing evidence, applying the highest-leverage fixes, and validating the next pass.",
        evidence: "Report screen",
      },
      {
        phase: "05",
        title: "Beta launch frame",
        detail:
          "The product separates what is already working from what must be true before TestFlight and App Store review.",
        evidence: "Launch readiness",
      },
    ],
    surfaces: [
      {
        title: "URL and screenshot intake",
        detail:
          "Users can start from a live URL or screenshot, choose critique depth, and add context before the request leaves the device.",
        icon: Link2,
      },
      {
        title: "Required critique context",
        detail:
          "Goal, audience, focus areas, and optional notes make the report more specific than generic visual feedback.",
        icon: FileText,
      },
      {
        title: "Project history",
        detail:
          "Each project carries critique versions, status, current score, first recommendation, and a path into the next critique.",
        icon: History,
      },
      {
        title: "Share extension",
        detail:
          "Screenshots can be imported from the iOS share sheet so mobile design evidence flows into critique.",
        icon: Camera,
      },
    ],
    systemBuild: [
      "SwiftUI shell with auth-gated root navigation across Critique, Projects, and Launch.",
      "Source picker for URL and screenshot critique inputs with focused context capture.",
      "Quick and Deep critique paths mapped to a C Hybrid report structure.",
      "Project memory, version history, implementation evidence, and next-action guidance.",
      "Report modes for Review, Fix, and Validate so critique output becomes a working loop.",
      "Share extension and app-group direction for importing screenshots from Photos.",
    ],
    decisions: [
      {
        title: "Keep creation as the first tab",
        detail:
          "The app opens around submission because GraphicSnack is valuable only when users can get from product question to critique quickly.",
      },
      {
        title: "Use context as the quality gate",
        detail:
          "A URL alone is not enough. Goal, audience, and focus areas help the critique judge the page against product intent.",
      },
      {
        title: "Make the report implementation-aware",
        detail:
          "Top changes, handoff notes, and validation states make the output usable by AI coding tools.",
      },
    ],
    story: [
      {
        phase: "01",
        label: "Intake",
        title: "The builder starts with a real product question",
        image: "/screenshots/graphicsnack-ios-case-study/create-critique-light-hires.png",
        alt: "GraphicSnack iOS create critique screen in light mode",
        story:
          "GraphicSnack slows the user down just enough to make critique useful. Source, depth, product name, and starting point are captured before the request runs.",
        evidence: "URL or screenshot source, Quick or Deep depth, focus state, project name, and a ready-to-run critique dock.",
      },
      {
        phase: "02",
        label: "Project memory",
        title: "Real projects replace empty demo chrome",
        image: "/screenshots/graphicsnack-ios-case-study/projects-seeded-light-hires.png",
        alt: "GraphicSnack iOS projects screen with seeded projects",
        story:
          "After critique runs, the answer becomes a durable project record with current state, score, first recommended fix, and past work.",
        evidence: "Seeded project names, completed state, score, run count, thumbnails, and first-fix preview.",
      },
      {
        phase: "03",
        label: "Report detail",
        title: "The report becomes the builder loop",
        image: "/screenshots/graphicsnack-ios-case-study/report-seeded-light-hires.png",
        alt: "GraphicSnack iOS report screen",
        story:
          "Opening a project keeps identity, versioning, score, and implementation momentum visible before the user moves deeper into findings.",
        evidence: "Project identity, v1 version state, completed status, critique score, fix progress, and version card.",
      },
      {
        phase: "04",
        label: "Launch readiness",
        title: "Launch readiness keeps the operating truth visible",
        image: "/screenshots/graphicsnack-ios-case-study/launch-light-hires.png",
        alt: "GraphicSnack iOS launch readiness screen",
        story:
          "The final surface acknowledges that the product is not ready just because the UI exists. Backend, store, QA, privacy, and release gates remain visible.",
        evidence: "Required gates, release sequence, build checklist, App Store readiness, and done state.",
      },
    ],
    outcomesTitle: "What the beta needed to support",
    outcomes: [
      "Users could bring critique into the product from a URL, screenshot, or share extension instead of starting from a blank mobile workspace.",
      "Project memory, report status, critique score, and version history made mobile critique feel like an ongoing product loop.",
      "Launch readiness surfaces kept backend state, store requirements, QA, privacy, and release gates visible before TestFlight.",
      "The product model required durable storage, session handling, account lifecycle, critique generation, and backend-down states to behave predictably.",
      "Device QA needed to cover light mode, dark mode, Dynamic Type, VoiceOver, contrast, focus order, and Reduce Motion before beta release.",
    ],
    takeaway:
      "GraphicSnack iOS shows the product moving from critique output into critique operations: source capture, context, project memory, handoff, and validation.",
  },
  {
    id: "sales-navigator-multiseat",
    shortLabel: "Sales Navigator",
    product: "LinkedIn Sales Navigator",
    platform: "Enterprise SaaS",
    headline: "From seller workspace to CRM-connected team system",
    summary:
      "As one of three founding designers, I helped scale Sales Navigator across admin, integrations, onboarding, mobile, and growth.",
    cardSummary:
      "Helped take Sales Navigator from an individual seller workspace to a CRM-connected system that teams could adopt, manage, and measure.",
    role: "One of three founding designers. Primarily owned admin, integrations, onboarding, mobile, and growth",
    status: "LinkedIn Sales Navigator product systems and integrations",
    contribution: {
      owned: [
        "Started as one of three founding designers for LinkedIn Sales Navigator.",
        "Primarily owned admin, usage reporting, team management, onboarding, and new-user value paths.",
        "Led CRM integration design from the first Salesforce widgets into a scalable integration model that could extend beyond Salesforce.",
        "Drove Sales Navigator for Gmail, Social Selling Index for Sales Navigator, mobile discovery and onboarding, team-feature expansion on mobile, and growth-oriented upsell and funnel work.",
      ],
      partnered: [
        "Balanced seller action with admin trust across sync behavior, field mapping, activity capture, reporting, administration, and team adoption.",
        "Extended the product model from individual seller productivity into team, enterprise, and cross-surface workflows.",
      ],
      proof: [
        "Admin, usage reporting, team management, onboarding, and new-user experiences",
        "Salesforce widgets, scalable CRM integration patterns, sync settings, and data controls",
        "Gmail, Social Selling Index, mobile discovery and onboarding, team mobile features, upsell, and funnel optimization",
      ],
    },
    heroImage: "/projects/Sales%20Nav/sn-home.png",
    heroAlt: "Sales Navigator product system mockups",
    thumbnailImage: "/projects/Sales%20Nav/sales-nav-thumbnail.png",
    thumbnailAlt: "LinkedIn Sales Navigator workspace and CRM-connected product surfaces",
    thumbnailBackground: "#E7EEF5",
    accent: "bg-[#0a66c2]",
    activeClass: "border-[#0a66c2] bg-[#0a66c2] text-white",
    icon: Layers3,
    snapshot: [
      { label: "Company", value: "LinkedIn" },
      { label: "Product", value: "LinkedIn Sales Navigator" },
      { label: "Audience", value: "Sales leaders, admins, sellers, operations teams" },
      { label: "Role", value: "One of three founding designers. Primarily owned admin, integrations, onboarding, mobile, and growth" },
    ],
    impact: [
      {
        title: "Adoption and admin foundations",
        detail:
          "Focused early work on admin, usage reporting, team management, onboarding, and new-user experiences so customers could manage seats, see value, and help sellers become productive faster.",
      },
      {
        title: "CRM integration platform",
        detail:
          "Led CRM integration design from the first Salesforce widgets into scalable patterns for embedded intelligence, profile context, TeamLink paths, account actions, recommendations, sync settings, and activity writeback.",
      },
      {
        title: "Seller touchpoints beyond the core app",
        detail:
          "Drove Sales Navigator for Gmail, along with CRM and LinkedIn.com surface work, so relationship intelligence could appear inside the email, CRM, and LinkedIn workflows sellers already used.",
      },
      {
        title: "Team expansion and growth",
        detail:
          "Later work included Social Selling Index for Sales Navigator, mobile discovery and onboarding, team-only value on mobile, and growth efforts across Sales Navigator and LinkedIn, including upsell paths and funnel optimization.",
      },
    ],
    journey: [
      {
        phase: "01",
        title: "Build for team adoption",
        detail:
          "Admin, reporting, onboarding, and team management made the new seller product adoptable by companies.",
        evidence: "Admin workflows, usage reporting, team management, onboarding, new-user experiences, seat visibility",
      },
      {
        phase: "02",
        title: "Bring intelligence into CRM",
        detail:
          "CRM integrations brought relationship intelligence into profiles, account actions, sync, and activity capture.",
        evidence: "Salesforce widgets, CRM integration model, CRM Sync, top-card states, recommended leads, news, best path in",
      },
      {
        phase: "03",
        title: "Meet sellers in their workflow",
        detail:
          "CRM, email, and LinkedIn.com delivered Sales Navigator value inside existing seller workflows.",
        evidence: "CRM surfaces, Sales Navigator for Gmail, LinkedIn.com entry points, embedded relationship intelligence",
      },
      {
        phase: "04",
        title: "Scale into a team system",
        detail:
          "Mobile support for team features, plan clarity, reporting, and growth paths turned individual value into a team system.",
        evidence: "Team mobile features, TeamLink, usage reporting, plan clarity, upsell paths, funnel optimization, multi-seat research",
      },
    ],
    surfaces: [
      {
        title: "Admin, reporting, and onboarding",
        detail:
          "Admin setup, team management, usage reporting, onboarding, new-user education, seat visibility, and value-discovery paths for sellers and managers.",
        icon: Layers3,
      },
      {
        title: "CRM widgets and sync",
        detail:
          "First Salesforce widgets, embedded CRM modules, profile top cards, save account, save lead, get introduced, recommended leads, news, TeamLink paths, CRM Sync, activity writeback, and partner-widget patterns.",
        icon: Link2,
      },
      {
        title: "Gmail, Social Selling Index, and mobile",
        detail:
          "Sales Navigator for Gmail, Social Selling Index for Sales Navigator, mobile discovery, mobile onboarding, and later team-feature expansion on the mobile app.",
        icon: ShieldCheck,
      },
      {
        title: "Team growth and reporting",
        detail:
          "TeamLink, usage reporting, chooser and switcher flows, plan clarity, seat expansion, mobile chooser, simplification studies, upsell paths, and funnel optimization.",
        icon: MonitorCheck,
      },
    ],
    systemBuild: [
      "Primarily owned admin, usage reporting, team management, onboarding, CRM integrations, and growth experiences across web and mobile needed for customer expansion.",
      "Led CRM integration design from the first Salesforce widgets into a scalable model for embedded intelligence, sync behavior, field mapping, activity capture, reporting, governance, and team adoption.",
      "Extended Sales Navigator value across adjacent seller workflows and core product surfaces: Gmail, CRM, and LinkedIn.com touchpoints, Social Selling Index, mobile discovery, mobile onboarding, and later team-feature work on mobile.",
      "Supported growth efforts across Sales Navigator and LinkedIn through upsell paths, funnel optimization, plan clarity, usage visibility, reporting, and multi-seat adoption.",
      "Helped establish Sales Navigator as a standalone SaaS workspace for sellers and sales teams, with accounts, leads, saved work, relationship signals, and seller-specific navigation.",
    ],
    decisions: [
      {
        title: "Make the product manageable before it scaled",
        detail:
          "A team product needed more than useful seller screens. Admins and managers needed setup, usage visibility, team management, onboarding, and reporting before Sales Navigator could become an established part of the sales workflow.",
      },
      {
        title: "Treat CRM as the system of record",
        detail:
          "The design challenge was to make Sales Navigator's relationship intelligence available inside CRM without pretending CRM stopped being the operational home for account, contact, opportunity, and activity management.",
      },
      {
        title: "Design integrations as a platform pattern",
        detail:
          "The first Salesforce widgets had to prove value in one CRM while establishing a reusable integration model for identity, profile context, warm paths, recommendations, news, save actions, and next steps.",
      },
      {
        title: "Meet sellers where they already worked",
        detail:
          "CRM, email, and LinkedIn.com surfaces reduced the burden of asking sellers to start every workflow inside Sales Navigator.",
      },
    ],
    story: [
      {
        phase: "01",
        label: "Team adoption",
        title: "A new sales product needed admin, reporting, and onboarding foundations",
        image: "/projects/Sales%20Nav/sn-home.png",
        alt: "Early Sales Navigator suggested leads workflow with CRM sync and TeamLink signals",
        story:
          "My early work focused on making Sales Navigator adoptable by teams, not just useful to individual sellers. Admin, usage reporting, team management, onboarding, and new-user paths helped customers see how licenses were assigned and used, how sellers were engaging, and where early value was emerging.",
        evidence: "Seat management, usage reporting, CRM Sync, admin onboarding, settings, and email communications.",
      },
      {
        phase: "02",
        label: "CRM widgets",
        title: "Sales Navigator relationship intelligence expanded into CRM records",
        image: "/projects/Sales%20Nav/SN-CRM-Integration.png",
        alt: "Sales Navigator CRM widgets embedded in Salesforce account and contact records",
        story:
          "CRM was where sellers manage accounts, contacts, opportunities, and activity. I led the first Salesforce widget work and then helped extend that into a scalable CRM integration model for profile cards, employee insights, best paths in, recommended leads, news, save actions, message actions, and relationship context across additional key CRMs.",
        evidence: "First Salesforce widgets, scalable CRM integration model, profile top cards, account actions, lead recommendations, news, icebreakers, related leads, and get-introduced flows.",
      },
      {
        phase: "03",
        label: "Sync and settings",
        title: "Integration design also meant admin trust and data controls",
        image: "/projects/Sales%20Nav/Sales%20Navigator%20version%201/First%20version%20of%20Sales%20Navigator%20Settings%20page.png",
        alt: "Early Sales Navigator settings page with sales preferences and CRM sync preferences",
        story:
          "The CRM work had an operations layer. Admins and sales leaders needed to understand connection state, field mapping, opportunity value mapping, auto-sync behavior, update preferences, and when to disconnect CRM data. These controls made the integration easier to manage, not just convenient.",
        evidence: "CRM connection state, pipeline-stage mapping, opportunity mapping, auto-sync, disconnect CRM, sales preferences, and email preferences.",
      },
      {
        phase: "04",
        label: "Expansion",
        title: "Sales Navigator matured through Social Selling Index, mobile, and growth paths",
        image: "/projects/Sales%20Nav/sn-home.png",
        alt: "Sales Navigator home surface with alerts, personas, book of business, and priority accounts",
        story:
          "As Sales Navigator matured, my work expanded into product depth and growth loops: Social Selling Index for Sales Navigator, mobile discovery and onboarding, team-only features on mobile, upsell paths, and funnel optimization across Sales Navigator and LinkedIn.",
        evidence: "Social Selling Index for Sales Navigator, mobile discovery, mobile onboarding, team mobile features, TeamLink, upsell paths, funnel optimization, and multi-seat expansion research.",
      },
    ],
    outcomesTitle: "What the product scaled into",
    outcomes: [
      "Sales Navigator expanded from an individual seller workspace into a team product with admin, onboarding, usage visibility, team management, and new-user value paths.",
      "CRM integrations moved from early Salesforce widgets toward scalable patterns for embedded intelligence, sync, activity writeback, and data controls.",
      "Sales Navigator value extended into adjacent seller surfaces, including Gmail, CRM, LinkedIn.com, Social Selling Index, mobile discovery, and mobile onboarding.",
      "Growth and team expansion workflows gave organizations clearer paths to understand plan value, seat usage, reporting, and multi-seat adoption.",
    ],
    outcomeTimeline: {
      title: "Product growth milestones",
      items: [
        {
          date: "July 2014",
          detail: "Sales Navigator launched as a standalone SaaS product.",
        },
        {
          date: "2018",
          detail: "LinkedIn described Sales Navigator as one of the industry's fastest-growing enterprise-grade SaaS applications.",
        },
        {
          date: "2021",
          detail: "LinkedIn Sales Solutions surpassed $1 billion in annual revenue.",
        },
        {
          date: "2023–2024",
          detail: "Sales Navigator added generative AI and expanded into deeper CRM and LinkedIn.com experiences.",
        },
        {
          date: "2025",
          detail: "Sales Navigator reaches $1.5 billion in annual revenue.",
        },
      ],
    },
    takeaway:
      "Sales Navigator scaled individual seller value into a team product by making it manageable, measurable, and available across everyday sales tools.",
  },
  {
    id: "career-pages",
    shortLabel: "Career Pages",
    product: "LinkedIn Career Pages",
    platform: "Paid recruiting and talent-brand product",
    headline: "Employer storytelling connected to candidate action",
    summary:
      "I designed member, admin, and analytics experiences that connected employer stories with candidate research and job action.",
    cardSummary:
      "Designed tools for companies to tell their story and for candidates to follow jobs and show interest.",
    role: "Primary product designer across member, admin, and analytics experiences",
    status: "Shipped LinkedIn recruiting product",
    contribution: {
      owned: [
        "Owned member-facing Career Pages, the overall admin experience, and analytics experiences as the primary product designer.",
        "Designed authoring, editing, preview, targeting, publishing, Life Page modules, job alerts, and candidate action paths.",
        "Connected paid Career Pages value to the broader free Company Pages ecosystem.",
      ],
      partnered: [
        "Partnered with two PMs, PMM, UXR, and mobile and web engineering teams.",
        "Balanced passive and active job seeker needs with company goals for attracting talent through credible employer storytelling.",
      ],
      proof: [
        "Admin publishing tools, analytics, and Life Pages",
        "Team tabs, employee stories, photos, and testimonials",
        "Jobs tab, saved job alerts, and interest signals",
      ],
    },
    heroImage: "/projects/career-pages/LinkedIn%20Career%20Pages%20-%20case%20study%20thumbnail.png",
    heroAlt: "LinkedIn Career Pages composite showing desktop, mobile, ratings, and employer brand surfaces",
    thumbnailBackground: "#EEF0E7",
    accent: "bg-[#0a66c2]",
    activeClass: "border-[#0a66c2] bg-[#0a66c2] text-white",
    icon: FileText,
    snapshot: [
      { label: "Company", value: "LinkedIn" },
      { label: "Product", value: "Career Pages" },
      { label: "Audience", value: "Talent Brand managers, company admins, job seekers" },
      { label: "Role", value: "Primary designer across member, admin, and analytics experiences" },
    ],
    impact: [
      {
        title: "Admin and analytics for employer storytelling",
        detail:
          "Designed the admin and analytics experiences that helped Talent Brand teams create, target, publish, and understand the performance of employer stories across Life Pages, media, leaders, custom modules, photos, employee perspectives, and testimonials.",
      },
      {
        title: "Employee-experience storytelling",
        detail:
          "Launched Life Page surfaces that gave companies more credible ways to tell employee-experience stories through people, teams, photos, perspectives, and testimonials.",
      },
      {
        title: "Candidate action paths",
        detail:
          "Launched saved job alerts for company pages and helped job seekers move from company research into jobs, alerts, and interest signals.",
      },
      {
        title: "Paid and free ecosystem fit",
        detail:
          "Balanced the paid Career Pages product with related free Company Pages experiences so admins and members had a coherent company presence across LinkedIn.",
      },
    ],
    journey: [
      {
        phase: "01",
        title: "Connect paid and free",
        detail:
          "Paid Career Pages had to fit the Company Pages system that admins and members already understood.",
        evidence: "Career Pages, Company Pages, admin tools, and member-facing company surfaces.",
      },
      {
        phase: "02",
        title: "Make stories publishable",
        detail:
          "Authoring, targeting, preview, and publishing controls made employer stories manageable for Talent Brand teams.",
        evidence: "Admin editor states, page settings, visibility controls, targeting, preview, save, and publish.",
      },
      {
        phase: "03",
        title: "Use employee proof",
        detail:
          "Employee stories, photos, teams, and testimonials made Life Pages more credible than generic recruiting copy.",
        evidence: "Life Page modules, employee perspectives, company photos, team tabs, and testimonials.",
      },
      {
        phase: "04",
        title: "Connect research to action",
        detail:
          "Jobs, alerts, employee connections, and interest signals moved company research toward action.",
        evidence: "Jobs tab, saved job alerts, recommended jobs, employee connection cards, and interest signals.",
      },
    ],
    surfaces: [
      {
        title: "Admin authoring, analytics, and publishing",
        detail:
          "Page editors, analytics experiences, media modules, leader cards, spotlight modules, photos, employee perspectives, testimonials, visibility controls, targeting, preview, save, and publish flows.",
        icon: FileText,
      },
      {
        title: "Member-facing Life Pages",
        detail:
          "Candidate-facing pages for exploring teams, employee stories, company media, culture modules, perspectives, testimonials, and related employer-brand content.",
        icon: MonitorCheck,
      },
      {
        title: "Jobs, alerts, and interest",
        detail:
          "Company job tabs, job alerts, recommended roles, recently posted jobs, employee contact prompts, and paths for job seekers to signal interest.",
        icon: BellRing,
      },
      {
        title: "Web and mobile company experiences",
        detail:
          "Designed across desktop and mobile contexts so job seekers could move between company research, jobs, and candidate actions in familiar LinkedIn patterns.",
        icon: Smartphone,
      },
    ],
    systemBuild: [
      "Owned the member-facing Career Pages experience, overall admin experience, and analytics experiences as the primary product designer.",
      "Also owned related free Company Pages experiences across member and admin surfaces while Career Pages remained the paid product tier.",
      "Partnered with two product managers, one product marketing manager, one user researcher, and mobile and web engineering teams.",
      "Designed shipped Life Page employee-experience features for employer storytelling through people, teams, media, perspectives, and testimonials.",
      "Launched saved job alerts for company pages and job seeker interest signals tied to company research and opportunity discovery.",
      "Grounded the work in shipped Talent Brand workflows, admin controls, member-facing surfaces, and LinkedIn design-system patterns.",
    ],
    decisions: [
      {
        title: "Make admin controls mirror the candidate experience",
        detail:
          "The admin editor needed to make the downstream member experience legible. Modules, visibility, preview, targeting, and publish controls were designed around what candidates would eventually see.",
      },
      {
        title: "Use employee proof instead of generic employer branding",
        detail:
          "Life Pages were stronger when the story came from recognizable employees, teams, photos, perspectives, and testimonials rather than broad company claims.",
      },
      {
        title: "Balance passive research and active job intent",
        detail:
          "Passive job seekers needed credible company context before following or signaling interest, while active candidates needed fast paths to relevant jobs and alerts. The experience had to support both without turning employer storytelling into a detached marketing surface.",
      },
      {
        title: "Preserve coherence across paid and free pages",
        detail:
          "Career Pages had to create paid value for Talent Brand teams without making the free Company Pages experience feel disconnected for admins or job seekers.",
      },
    ],
    story: [
      {
        phase: "01",
        label: "Admin publishing",
        title: "Admins needed a page-building system, not a static profile editor",
        image: "/projects/career-pages/portfolio-crops/career-pages-admin-authoring.jpg",
        alt: "Career Pages admin editor with page settings, media, leaders, modules, and publishing controls",
        story:
          "The admin experience gave Talent Brand managers a structured way to create and maintain Career Pages content. Page settings, media, leader cards, custom modules, visibility controls, targeting, preview, save, and publish actions made the work feel operationally safe instead of one-off content entry.",
        evidence: "Shipped admin editor states for page content, module visibility, targeting, preview, save, and publish.",
      },
      {
        phase: "02",
        label: "Life Pages",
        title: "The member experience made employer stories browseable by team and topic",
        image: "/projects/career-pages/portfolio-crops/career-pages-life-page.jpg",
        alt: "Member-facing Career Pages Life Page with team tabs, video, employee cards, and story modules",
        story:
          "The member-facing Life Page translated admin-authored content into a candidate research experience. Job seekers could browse team-specific stories, watch media, understand who worked there, and build a clearer picture of fit before taking action.",
        evidence: "Team tabs, hero media, employee cards, story modules, company photos, and related Life Page content.",
      },
      {
        phase: "03",
        label: "Jobs and alerts",
        title: "Company research needed a direct path into job action",
        image: "/projects/career-pages/portfolio-crops/career-pages-jobs-alerts.jpg",
        alt: "Career Pages jobs tab with job alert creation, job search, recommended jobs, employee contacts, and recent jobs",
        story:
          "The Jobs experience connected company interest to concrete next steps. Candidates could create job alerts, search openings, review recommended jobs, see recently posted roles, and use employee context to make the opportunity feel less abstract.",
        evidence: "Saved job alerts, company job search, recommended jobs, employee contact cards, recent jobs, and company discovery modules.",
      },
      {
        phase: "04",
        label: "Employee proof",
        title: "Employee perspectives made the employer story more credible",
        image: "/projects/career-pages/portfolio-crops/career-pages-employee-experience.jpg",
        alt: "Career Pages employee experience modules with company photos, employee perspectives, and testimonials",
        story:
          "The employee-experience work gave companies more credible material than a polished brand message alone. Photos, employee perspectives, and testimonials helped candidates evaluate the texture of the workplace through people and artifacts.",
        evidence: "Company photo gallery, employee perspectives, employee testimonials, and Life Page storytelling modules.",
      },
    ],
    outcomesTitle: "What shipped",
    outcomes: [
      "Launched saved job alerts for company pages so job seekers could follow future opportunities from companies they cared about.",
      "Launched ways for job seekers to signal interest in working at a company, connecting company research to recruiting intent.",
      "Launched employee-experience features in Life Pages, including richer storytelling surfaces for teams, people, photos, perspectives, and testimonials.",
      "Gave Talent Brand managers and company admins shipped tools for authoring, previewing, publishing, measuring, and maintaining paid Career Pages content.",
      "Connected paid Career Pages value to the broader free Company Pages ecosystem across member-facing and admin-facing surfaces.",
    ],
    takeaway:
      "Career Pages shows product design across a two-sided recruiting system: admin and analytics tools for companies trying to attract talent, and member experiences that help passive and active job seekers move from company research into jobs, alerts, and interest.",
  },
  {
    id: "company-pages",
    shortLabel: "Employee Experience",
    product: "LinkedIn Employee Experience",
    platform: "Desktop and mobile UGC pilot for Company Pages and Career Pages",
    headline: "Employee perspectives for more credible company research",
    summary:
      "I led an exploration into how LinkedIn could give job seekers credible insight into what it is like to work at a company.",
    cardSummary:
      "Explored how LinkedIn could solve a major job-seeker pain point: understanding what it is like to work at a company.",
    role: "Led design and collaborated with PM and PMM on strategy",
    status: "Pilot validated, patterns informed Career Pages launches",
    contribution: {
      owned: [
        "Led design and research for the employee-generated company review pilot.",
        "Designed the initial desktop and mobile Company Pages collection model, privacy states, question system, skip and completion states, and aggregation patterns.",
        "Explored how ratings, reviews, and employee signals could travel into Company Pages, Jobs, feed, recommendations, and Career Pages.",
      ],
      partnered: [
        "Partnered with PM, PMM, and mobile and web engineers.",
        "Used research to frame employee contribution, privacy, and trust as core product requirements.",
      ],
      proof: [
        "Company Page module and feed give-and-get flow",
        "Standard questions, expanded ratings, and subjective reviews",
        "Company Pages, Jobs, feed, recommendations, and Career Pages integration concepts",
      ],
    },
    heroImage: "/projects/Employee%20experience/Employee-Experience-thumbnail.png",
    heroAlt: "LinkedIn Employee Experience desktop and mobile Company Page pilot mocks",
    thumbnailBackground: "#D8D2E6",
    accent: "bg-[#0a66c2]",
    activeClass: "border-[#0a66c2] bg-[#0a66c2] text-white",
    icon: MonitorCheck,
    snapshot: [
      { label: "Company", value: "LinkedIn" },
      { label: "Business line", value: "LinkedIn Talent Solutions" },
      { label: "Audience", value: "Job seekers, employees, Talent Brand teams" },
      { label: "Role", value: "Led design and collaborated with PM and PMM on strategy" },
    ],
    impact: [
      {
        title: "Validated employee contribution",
        detail:
          "Designed the initial give-and-get pilot to test whether employees would answer sensitive company-experience questions when the value was framed around helping other job seekers.",
      },
      {
        title: "Built trust into the collection model",
        detail:
          "Made privacy, identity, current-employer sensitivity, response aggregation, and audience controls central product requirements instead of afterthoughts.",
      },
      {
        title: "Created a reusable question system",
        detail:
          "Explored a progression from binary questions to ratings, sliders, numeric responses, benefit tags, and subjective reviews across career growth, work-life balance, leadership, compensation, and overall fit.",
      },
      {
        title: "Connected UGC to recruiting surfaces",
        detail:
          "Mapped how employee-generated ratings and reviews could strengthen Company Pages, Jobs, recommendations, feed discovery, and the employee-focused features that later launched in Career Pages.",
      },
    ],
    journey: [
      {
        phase: "01",
        title: "Start with job-seeker need",
        detail:
          "Research with 30K+ professionals identified company-insight gaps as a leading job-seeker pain point.",
        evidence: "Member research",
      },
      {
        phase: "02",
        title: "Choose ratings",
        detail:
          "Ratings offered broader member value than Q&A or interview-question concepts.",
        evidence: "Concept evaluation",
      },
      {
        phase: "03",
        title: "Test contribution first",
        detail:
          "Private, lightweight questions tested willingness to contribute before expanding the content model.",
        evidence: "Give-and-get pilot",
      },
      {
        phase: "04",
        title: "Add employee voice",
        detail:
          "Ratings, attributes, reviews, and discovery patterns added depth to the employee perspective.",
        evidence: "Ratings and reviews",
      },
      {
        phase: "05",
        title: "Connect to recruiting",
        detail:
          "Employee insights became more useful across Company Pages, Jobs, recommendations, and Career Pages.",
        evidence: "Career Pages path",
      },
    ],
    surfaces: [
      {
        title: "Company Page collection module",
        detail:
          "A private Employee Experience card asked active employees simple questions in the context of a company page, close to jobs, company info, and connection signals.",
        icon: MonitorCheck,
      },
      {
        title: "Feed-based give-and-get flow",
        detail:
          "Feed entry points showed aggregate peer signals before inviting employees to add their own rating or review, reducing the feeling of answering into an empty system.",
        icon: BellRing,
      },
      {
        title: "Question and rating framework",
        detail:
          "Standardized company attributes covered career growth, skill development, pride, flexibility, CEO approval, compensation, benefits, and overall rating.",
        icon: Target,
      },
      {
        title: "Review discovery and conversation",
        detail:
          "Subjective reviews explored how employee perspectives could appear in feed, detail views, comments, likes, and follow-on conversations with interested job seekers.",
        icon: FileText,
      },
      {
        title: "Career Pages and jobs integrations",
        detail:
          "Explorations placed employee signals into Company Pages, job cards, recommendations, salary context, and Career Pages-style employer storytelling surfaces.",
        icon: Route,
      },
    ],
    systemBuild: [
      "Partnered with one product manager, one product marketing manager, and mobile and web engineers as the designer and researcher for the initiative.",
      "Synthesized member research showing company transparency as the top job seeker pain point and company culture as a primary research need.",
      "Designed the initial Company Pages pilot for private employee responses, aggregate feedback, skip behavior, completion states, and privacy reassurance.",
      "Explored expanded collection mechanics across binary prompts, star ratings, steppers, sliders, benefit tags, free-form reviews, and coworker invitations.",
      "Mapped integration paths for Company Pages, Jobs, JYMBII-style recommendations, feed discovery, SEO-oriented company research, and Career Pages.",
      "Grounded the pilot in anonymized company examples, concept mocks, structured rating flows, privacy states, and strategic product framing.",
    ],
    decisions: [
      {
        title: "Start with ratings because the value was immediately legible",
        detail:
          "The team explored Q&A and interview-style prompts, but those formats either lacked a strong incentive or served only active interviewers. Ratings gave casual, passive, and active job seekers a simple research signal.",
      },
      {
        title: "Make privacy visible at the exact moment of contribution",
        detail:
          "Employees were being asked to evaluate their current or previous employer. The interface needed to state that private responses would not be shared with the company or shown on the member's profile.",
      },
      {
        title: "Use aggregation before personal expression",
        detail:
          "The initial pilot prioritized structured aggregate signals because they were easier to trust, safer to moderate, and more scalable than starting with open-ended public reviews.",
      },
      {
        title: "Design the content as a system, not a card",
        detail:
          "Ratings and reviews were useful only if they could travel into the places job seekers already made decisions: Company Pages, Jobs, feed discovery, recommendations, and Career Pages.",
      },
    ],
    story: [
      {
        phase: "01",
        label: "Pilot placement",
        title: "The first experience lived inside Company Pages",
        image: "/projects/Employee%20experience/employee-experience-desktop-preview@2x.png",
        alt: "Desktop Company Page with Employee Experience private rating module",
        story:
          "The initial Company Page module was intentionally lightweight. It asked a single private question in a familiar company research context, surrounded by jobs, company info, employee connections, updates, and other signals a job seeker already used to evaluate fit.",
        evidence: "Private response language, career-growth prompt, employee connection context, jobs module, and Company Page placement.",
      },
      {
        phase: "02",
        label: "Standard questions",
        title: "The pilot started with low-friction answers",
        image: "/projects/Employee%20experience/Phase%201%20-%20Standard%20questions@2x.png",
        alt: "Employee Experience standard question flow with private binary prompts",
        story:
          "The first question set used binary prompts because the riskiest assumption was not whether a rich review page could be designed. It was whether employees would contribute at all when the topic was sensitive and employer-related.",
        evidence: "Career growth, skill development, pride in work, flexibility, CEO approval, inspirational leadership, skip, completion, and privacy states.",
      },
      {
        phase: "03",
        label: "Expanded signals",
        title: "The system could grow from yes/no answers into richer attributes",
        image: "/projects/Employee%20experience/Phase%202%20-%20Expanded%20Questions@2x.png",
        alt: "Employee Experience expanded question types with stars, steppers, sliders, and benefit tags",
        story:
          "Once contribution willingness was validated, the model could support more nuanced inputs: star ratings, expected tenure, satisfaction scales, benefits, compensation, and other attributes that gave job seekers a more complete picture of employee experience.",
        evidence: "Overall rating, expected tenure, satisfaction slider, benefits tags, employee-response counts, and attribute-level aggregation.",
      },
      {
        phase: "04",
        label: "Employee voice",
        title: "Subjective reviews tested the next layer of trust",
        image: "/projects/Employee%20experience/Phase%203%20-%20Subjective%20Reviews@2x.png",
        alt: "Employee Experience subjective review flow with feed discovery and review detail",
        story:
          "Open-ended employee reviews were more powerful and more sensitive. The explorations treated them as a later layer: added after structured collection, supported with audience controls, and distributed through feed and review-detail experiences where job seekers could ask follow-up questions.",
        evidence: "Add review entry point, public and connections visibility, feed discovery, review detail, likes, comments, author badge, and conversation entry.",
      },
      {
        phase: "05",
        label: "Integrations",
        title: "The long-term value came from carrying employee signals into job decisions",
        image: "/projects/Employee%20experience/Phase%204%20-%20Potential%20integrations@2x.png",
        alt: "Employee Experience potential integrations across Company Pages, jobs, and recommendations",
        story:
          "The strongest product direction was not a standalone review destination. Employee-generated signals became more useful when they appeared inside the surfaces where job seekers were already comparing companies, browsing roles, saving jobs, and evaluating whether an opportunity fit.",
        evidence: "Company rating modules, job-card attributes, personalized job recommendations, salary context, company discovery, and Career Pages integration paths.",
      },
    ],
    outcomesTitle: "What the pilot unlocked",
    outcomes: [
      "Validated that employees were willing to answer company-experience questions when the product framed the contribution as private, useful, and in service of other job seekers.",
      "Established a standardized set of employee-experience dimensions that could scale beyond one-off testimonials or anonymous free-form review sites.",
      "Created a product model for turning employee-generated ratings into trusted research signals across Company Pages, Jobs, recommendations, and Career Pages.",
      "Helped Career Pages move beyond employer-authored marketing toward employee-focused features that better represented what it was like to work at a company.",
      "Gave companies a path toward actionable employee-experience insights while preserving member trust around sensitive employer feedback.",
    ],
    takeaway:
      "Employee Experience shows product design for sensitive user-generated content: earn contribution trust first, standardize the signal, then integrate the content where job seekers make decisions.",
  },
  {
    id: "sales-insights",
    shortLabel: "Sales Insights",
    product: "LinkedIn Sales Insights",
    platform: "Enterprise GTM planning product",
    headline: "Turning market signals into trusted GTM decisions",
    summary:
      "I designed planning workflows that helped GTM teams size markets, prioritize accounts, and act on LinkedIn data with confidence.",
    cardSummary:
      "Designed planning workflows that helped GTM teams size markets, prioritize accounts, and act on LinkedIn data with confidence.",
    role: "Lead product designer across core experience and integrations",
    status: "LinkedIn enterprise product",
    contribution: {
      owned: [
        "Led design across reports, sources, account lists, exports, CRM sync, and integration states.",
        "Reframed dense LinkedIn data around planning confidence: why an account mattered, where the data came from, and what teams could do next.",
        "Treated matching, field mapping, review, export, and sync states as first-class product moments because they determined whether teams could trust automation.",
      ],
      partnered: [
        "Partnered with PMs across core experience and integrations to connect planning workflows with downstream activation.",
        "Onboarded and supported two temporarily reassigned designers as Sales Insights moved through rapid development.",
        "Aligned Sales Ops, Marketing, CRM, and Sales Navigator needs around shared account definitions and handoff paths.",
      ],
      proof: [
        "Reports, sources, account lists, and market-sizing workflows.",
        "Account matching, field mapping, export, sync, review states, and exception handling.",
        "CRM, Marketing, and Sales Navigator activation paths.",
      ],
    },
    heroImage: "/projects/sales-insights/lsi-report-view-v1.png",
    heroAlt: "LinkedIn Sales Insights report builder showing filters, market segments, trend metrics, and account results",
    thumbnailImage: "/projects/sales-insights/Sales-Insights-thumbnail-md.png",
    thumbnailAlt: "LinkedIn Sales Insights report interface with account filters, personas, market sizing, and account table",
    thumbnailBackground: "#E3EEF1",
    accent: "bg-[#336f8f]",
    activeClass: "border-[#336f8f] bg-[#336f8f] text-white",
    icon: MonitorCheck,
    snapshot: [
      { label: "Company", value: "LinkedIn" },
      { label: "Product", value: "LinkedIn Sales Insights" },
      { label: "Audience", value: "Sales Ops, RevOps, Marketing, GTM leaders, CRM admins" },
      { label: "Role", value: "Core experience and integrations designer with two PM partners" },
    ],
    impact: [
      {
        title: "Planning confidence",
        detail:
          "Reframed Sales Insights around the confidence Sales Ops and RevOps teams needed to make territory, TAM, account-priority, and campaign-planning decisions.",
      },
      {
        title: "Data trust as UX",
        detail:
          "Focused the experience on source clarity, match quality, freshness, account rationale, and review states so users could trust data that affected operational systems.",
      },
      {
        title: "Automation into systems of record",
        detail:
          "Treated CRM import, account matching, field mapping, export, sync, and exception handling as core product moments rather than back-office setup.",
      },
      {
        title: "Sales and Marketing alignment",
        detail:
          "Connected account-prioritization logic to ABM planning, Marketing activation, Sales Navigator execution, and shared definitions of priority accounts.",
      },
    ],
    journey: [
      {
        phase: "01",
        title: "Move beyond data access",
        detail:
          "Sales Insights needed to become trusted inside enterprise planning cycles, not simply expose more data.",
        evidence: "Product maturity, Sales Ops planning, territory and account decisions",
      },
      {
        phase: "02",
        title: "Clarify the product model",
        detail:
          "Sources, reports, personas, account lists, exports, and sync states had to feel like one planning system.",
        evidence: "Sources, reports, personas, account lists, exports, CRM sync",
      },
      {
        phase: "03",
        title: "Explain automation",
        detail:
          "Matching, field mapping, sync status, and exceptions made downstream automation understandable.",
        evidence: "CRM setup, CSV import, account matching, field mapping, sync status",
      },
      {
        phase: "04",
        title: "Bridge planning to action",
        detail:
          "Validated account lists carried planning decisions into CRM, Marketing, and Sales Navigator.",
        evidence: "ABM planning, Campaign Manager concepts, CRM export, Sales Navigator handoff",
      },
    ],
    surfaces: [
      {
        title: "Report and market sizing",
        detail:
          "Report workflows for defining a market, applying filters, comparing personas, sizing TAM, reviewing account rows, and saving planning artifacts.",
        icon: FileText,
      },
      {
        title: "Sources and matching",
        detail:
          "Source onboarding, CRM or CSV import, account matching, match confidence, unresolved records, duplicate handling, and correction flows.",
        icon: Link2,
      },
      {
        title: "Personas and whitespace",
        detail:
          "Persona, function, seniority, title, industry, location, growth, relationship-strength, and exclusion logic for finding and prioritizing the right accounts.",
        icon: Target,
      },
      {
        title: "Exports and activation paths",
        detail:
          "Export, CRM sync, field mapping, Campaign Manager exploration, and Sales Navigator handoffs that moved planning outputs into operational workflows.",
        icon: Route,
      },
    ],
    systemBuild: [
      "Partnered with two product managers: one focused on core experience and one focused on integrations.",
      "Improved the product's usability and coherence during the maturity phase after launch, when Sales Insights needed to move from promise to repeatable planning workflows.",
      "Designed across reports, sources, personas, account lists, exports, CRM-connected workflows, and Marketing/Sales handoffs.",
      "Framed integrations as first-class UX, including setup, permissions, matching, field mapping, progress, exception handling, and completion states.",
    ],
    decisions: [
      {
        title: "Design for planning confidence, not data density",
        detail:
          "Sales and Revenue teams were making decisions that affected territories, campaigns, CRM records, and rep focus. The interface needed to show source, recency, rationale, and match confidence so dense data could become a decision teams trusted.",
      },
      {
        title: "Make the product model clear",
        detail:
          "Sales Insights could easily feel like disconnected dashboards. The experience needed a clear model: sources feed reports, reports create account lists, and account lists move into exports, syncs, campaigns, and seller workflows.",
      },
      {
        title: "Treat integrations as core UX",
        detail:
          "CRM connection, CSV import, field mapping, and unresolved account matches were not setup details. They were trust moments where users decided whether automation could safely write to operational systems.",
      },
      {
        title: "Bridge strategy to execution",
        detail:
          "The value of a report depended on whether Marketing, Sales leaders, CRM admins, and sellers could act on the same account definition without rebuilding the logic in another tool.",
      },
    ],
    story: [
      {
        phase: "01",
        label: "Core report",
        title: "Market sizing needed to become a decision workflow",
        image: "/projects/sales-insights/LSI-Growth-Trends.png",
        alt: "Sales Insights report view showing filters, personas, account counts, employee signals, job postings, and connectivity",
        story:
          "The report surface carried the main planning job: define a market, apply account filters, compare personas, review account-level signals, and decide which segments were worth action. The design challenge was making dense company and member data readable enough for high-stakes planning.",
        evidence: "Reports, sources, filters, personas, segment highlights, geographic data, growth signals, relationship-strength data, and export paths.",
      },
      {
        phase: "02",
        label: "System model",
        title: "Sources, reports, and exports had to feel like one product model",
        image: "/projects/sales-insights/LSI-Buyer-Intent.png",
        alt: "Sales Insights product mockups showing report, source matching, CRM status, and export surfaces",
        story:
          "Sales Insights worked best when its layers felt connected: sources shaped reports and insights, reports produced account lists, and account lists moved into exports or integrations. The architecture mattered because planning outputs needed to become operational assets.",
        evidence: "Reports, Sources, Exports, CRM match rate, account matching, review states, and source-connected report creation.",
      },
      {
        phase: "03",
        label: "Trust and automation",
        title: "CRM automation needed visible review, status, and exception handling",
        image: "/projects/sales-insights/LSI-Review-Matches.png",
        alt: "Sales Insights integration and matching surfaces for CRM-connected planning workflows",
        story:
          "The integration work mattered because it moved insight into systems of record. Matching accounts to LinkedIn companies, mapping fields, exporting, syncing, and handling errors had to be transparent enough for Sales Ops and CRM owners to let automation change operational data.",
        evidence: "CRM and CSV onboarding, match confidence, unresolved records, field mapping, export confirmation, sync progress, and exception handling.",
      },
      {
        phase: "04",
        label: "Activation bridge",
        title: "The account list became a bridge between Sales Ops, Marketing, and sellers",
        image: "/projects/sales-insights/lsi-report-view.png",
        alt: "Sales Insights account list and report view used for GTM planning and activation handoff",
        story:
          "The strongest product value came from connecting insight discovery to operational execution. A target-market hypothesis could become a prioritized account list, then move into CRM, ABM campaign planning, or Sales Navigator execution without every team rebuilding the criteria.",
        evidence: "Strategic prioritization, whitespace, territory planning, ABM planning, and Sales Navigator handoff.",
      },
      {
        phase: "05",
        label: "Experimentation",
        title: "Experiments helped test the next product direction",
        image: "/projects/sales-insights/LSI-redesign.png",
        alt: "Sales Insights exploratory product redesign and activation concept mocks",
        story:
          "Alongside the core experience work, I partnered with engineering and PM to explore experimentation initiatives that could clarify the product's next direction. The main effort was a product redesign: we prioritized the surfaces most likely to affect planning confidence, tested concepts early, and used those learnings while shaping the overall product experience. Other explorations looked at how LinkedIn Campaign Manager could connect Sales Ops account lists to the audience lists Marketing teams used for campaign activation.",
        evidence: "Core product experiences and Campaign Manager integration exploration.",
      },
    ],
    outcomesTitle: "What the product made possible",
    outcomes: [
      "GTM teams could turn LinkedIn data into accountable planning decisions instead of treating signals as standalone dashboard insights.",
      "Sales Ops and RevOps users had clearer ways to evaluate source quality, match confidence, review states, and exceptions before data moved downstream.",
      "Reports, account lists, exports, CRM workflows, Marketing activation, and Sales Navigator handoffs became parts of one connected planning system.",
    ],
    takeaway:
      "Sales Insights connected market strategy to coordinated Sales and Marketing action through a shared account model.",
  },
  {
    id: "seller-agent",
    shortLabel: "Seller Agent",
    product: "LinkedIn Seller Agent",
    platform: "AI agent exploration on LinkedIn.com",
    headline: "An in-context AI agent for seller prospecting",
    summary:
      "I led opportunity definition and concept validation for an agent that helped sellers turn LinkedIn signals, relationship paths, and lead context into clearer prospecting actions.",
    cardSummary:
      "Led design from opportunity definition through concept validation, then helped align Seller Agent with LinkedIn's broader agentic work.",
    role: "Led definition, concept testing, and early stakeholder alignment",
    status: "Foundational LinkedIn AI Agent exploration",
    contribution: {
      owned: [
        "Led early opportunity framing and 0-to-1 concept validation with my PM.",
        "Identified the in-context AI agent direction for seller prospecting on LinkedIn.com.",
        "Mapped the feed-to-lead-to-outreach storyboard and translated seller research signals into guided prompts.",
        "Explored agent UI patterns that balanced free-form questions, structured prompts, source-backed context, and seller control.",
      ],
      partnered: [
        "Worked with product, research, engineering, AI Agent platform partners, and two teams building agentic products across LinkedIn.",
        "Partnered with another designer during the next phase to align Seller Agent with emerging company-wide agentic experience patterns.",
        "Used seller validation feedback to tighten trust, prompt density, relationship-path visibility, and action control.",
      ],
      proof: [
        "Opportunity framing and seller concept validation",
        "In-context guidance, relationship paths, and talking points",
        "Seller-controlled outreach across desktop and mobile",
      ],
    },
    heroImage: "/projects/seller-agent/portfolio-crops/seller-agent-hero.jpg",
    heroAlt: "Seller Agent concept embedded beside a LinkedIn profile with prompts, relationship paths, and seller-controlled actions",
    thumbnailImage: "/projects/seller-agent/Seller-Agent-thumbnail-md.png",
    thumbnailAlt: "LinkedIn Seller Agent wordmark",
    thumbnailBackground: "#D9E1D2",
    accent: "bg-[var(--accent)]",
    activeClass: "border-[var(--accent)] bg-[var(--accent)] text-white",
    icon: Sparkles,
    snapshot: [
      { label: "Company", value: "LinkedIn" },
      { label: "Product", value: "LinkedIn Seller Agent" },
      { label: "Audience", value: "Sellers researching leads and accounts" },
      { label: "Role", value: "Led definition, concept testing, and early stakeholder alignment" },
    ],
    impact: [
      {
        title: "Guidance where sellers already work",
        detail:
          "Placed agent guidance alongside LinkedIn feed and profile context instead of sending sellers to a separate chat experience.",
      },
      {
        title: "Signals into clear next steps",
        detail:
          "Connected account changes, social activity, relationship paths, and lead context to explain who mattered, why now, and what to do next.",
      },
      {
        title: "Validated integration value",
        detail:
          "Seller concept validation showed strong excitement for pulling Sales Navigator value into LinkedIn.com, while clarifying risks around trust, prompt density, and extra work.",
      },
      {
        title: "Foundational agent patterns",
        detail:
          "The work helped demonstrate an early line-of-business use case for LinkedIn AI Agents around context awareness, guidance, source-backed insight, and seller control.",
      },
    ],
    journey: [
      {
        phase: "01",
        title: "Start with seller behavior",
        detail:
          "Sellers already treated LinkedIn activity and profile changes as active prospecting signals.",
        evidence: "Social signals, feed behavior, targeted search, manual research",
      },
      {
        phase: "02",
        title: "Bring value into LinkedIn.com",
        detail:
          "Bringing Sales Navigator into LinkedIn.com reduced switching across research, CRM, and seller tools.",
        evidence: "LinkedIn.com workflow, Sales Navigator data, CRM handoffs",
      },
      {
        phase: "03",
        title: "Connect feed to lead",
        detail:
          "The flow connected feed signals, account changes, lead context, warm paths, and assisted outreach.",
        evidence: "Digest, account updates, lead profile, warm paths, message draft",
      },
      {
        phase: "04",
        title: "Build trust through control",
        detail:
          "Compact prompts, visible rationale, and seller-controlled actions made the agent easier to trust.",
        evidence: "Seller validation, trust cues, prompt iteration, handoff",
      },
    ],
    surfaces: [
      {
        title: "Sales Navigator digest",
        detail:
          "A feed-based entry point that summarized relevant account changes, industry signals, and relationship opportunities without asking sellers to start from a blank prompt.",
        icon: BellRing,
      },
      {
        title: "Lead and profile context",
        detail:
          "Agent entry points on lead/profile surfaces that answered questions like who can introduce me, how should I engage, and what changed since the last visit.",
        icon: MonitorCheck,
      },
      {
        title: "Warm paths and buyer circles",
        detail:
          "Relationship and TeamLink-style patterns that made introductions, shared experiences, and adjacent decision makers easier to see and act on.",
        icon: Link2,
      },
      {
        title: "Seller-controlled outreach",
        detail:
          "Drafting patterns that used account and lead context while preserving review, personalization, copy/paste, and final control for the seller.",
        icon: FileText,
      },
    ],
    systemBuild: [
      "Defined the opportunity by mapping fragmented seller research across LinkedIn.com, Sales Navigator, CRM, account intelligence, and outreach preparation.",
      "Created the feed-to-lead-to-outreach concept that connected account signals, lead context, relationship paths, and guided next actions.",
      "Explored agent interactions that balanced free-form questions, structured prompts, source-backed answers, and seller-controlled actions.",
      "Used seller concept testing to refine trust cues, prompt density, relationship-path visibility, and the effort required to reach a useful answer.",
      "Partnered with product, research, engineering, another designer, and LinkedIn agent teams to align Seller Agent with broader company patterns.",
    ],
    decisions: [
      {
        title: "Meet sellers where they already work",
        detail:
          "Sellers already relied on LinkedIn.com for feed activity, search, messaging, and relationship context. The concept extended Sales Navigator value into that behavior instead of requiring a new workflow first.",
      },
      {
        title: "Use AI to narrow the next action",
        detail:
          "The agent was most useful when it converted scattered signals into a next decision: which account changed, who matters now, who can introduce me, and how should I engage.",
      },
      {
        title: "Avoid prompt theater",
        detail:
          "Feedback showed sellers could miss value when prompts were too descriptive or felt like extra work. The design moved toward compact, scannable prompts and answers surfaced directly in context.",
      },
      {
        title: "Keep outreach personal and controllable",
        detail:
          "AI-assisted messages needed to sound specific to the seller, the buyer, and the outreach moment. The seller still needed to review, edit, copy, save, or send.",
      },
    ],
    story: [
      {
        phase: "01",
        label: "Workflow map",
        title: "The work began with the fragmented prospecting journey",
        image: "/projects/seller-agent/portfolio-crops/seller-agent-prospecting-map.jpg",
        alt: "Prospecting workflow map showing account intelligence, lead qualification, Sales Navigator, LinkedIn, CRM, and outreach steps",
        story:
          "The opportunity was not simply to add AI. Sellers were already assembling account intelligence, qualifying leads, searching across LinkedIn and Sales Navigator, finding contact paths, and pushing information into CRM. The map made the repeated research burden visible.",
        evidence: "Account intelligence, lead qualification, Sales Navigator search, LinkedIn research, CRM import, and outreach preparation.",
      },
      {
        phase: "02",
        label: "Digest",
        title: "A feed digest turned scattered signals into a seller starting point",
        image: "/projects/seller-agent/portfolio-crops/seller-agent-digest-prompts.jpg",
        alt: "Seller Agent digest and prompt explorations showing account changes, prompt chips, best paths, and lead recommendations",
        story:
          "The digest concept met sellers in the LinkedIn feed with relevant account and lead changes. From there, prompts like who can introduce me, how do I best engage, and draft outreach helped the seller move from information scanning into a concrete next step.",
        evidence: "Sales Navigator digest, account changes, prompt chips, relationship prompts, business priorities, and lead recommendations.",
      },
      {
        phase: "03",
        label: "Lead context",
        title: "The profile surface became a place to ask seller-specific questions",
        image: "/projects/seller-agent/portfolio-crops/seller-agent-profile-agent.jpg",
        alt: "LinkedIn profile with Seller Agent panel showing suggested questions, talking points, warm paths, and action controls",
        story:
          "On the lead profile, the agent could answer the questions sellers normally assemble manually: why this person, why now, what do we have in common, and what should I do next. Structured prompts kept the agent anchored to the page context.",
        evidence: "Profile context, suggested prompts, key talking points, relationship paths, draft message, and find similar leads actions.",
      },
      {
        phase: "04",
        label: "Action flow",
        title: "Mobile explorations tested how guidance could carry through to outreach",
        image: "/projects/seller-agent/portfolio-crops/seller-agent-mobile-flow.jpg",
        alt: "Mobile Seller Agent exploration showing company context, lead profile highlights, and an AI guidance panel for outreach",
        story:
          "The mobile explorations reinforced the same pattern at a smaller scale: keep the seller's context visible, explain why a lead matters, and offer next actions without hiding the underlying LinkedIn surface.",
        evidence: "Company page, lead profile, Sales Navigator guidance panel, decision-maker signal, draft message, save lead, and find more decision makers actions.",
      },
    ],
    outcomesTitle: "What the product direction clarified",
    outcomes: [
      "Seller Agent demonstrated how Sales Navigator context could support prospecting directly inside LinkedIn.com instead of requiring sellers to switch products.",
      "Concept testing clarified the need for compact, source-backed guidance, stronger relationship visibility, and seller control over each next action.",
      "Cross-team alignment connected the seller use case to broader LinkedIn agent patterns without losing the workflow-specific value.",
    ],
    takeaway:
      "Seller Agent brought AI into the seller's existing workflow by connecting timely signals to clear, seller-controlled action.",
  },
];

const phoneCaseIds = new Set(["campglint", "graphicsnack-ios"]);
const lightPreviewCaseStudyIds = new Set(["sales-insights", "campglint", "seller-agent", "sales-navigator-multiseat", "company-pages", "career-pages"]);
const publicCaseStudyIds = new Set(["sales-insights", "sales-navigator-multiseat"]);
const campGlintPasscode = "!mondragon1";
const protectedCaseStudyPasscode = "!mondragon937";
const legacyCaseStudyUnlockStorageKey = "jm-case-studies-unlocked";
const caseStudyThumbnailImageClass = "case-study-thumbnail-image";
const caseStudyThumbnailImageStyle: CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
  minHeight: 0,
  objectFit: "contain",
  objectPosition: "center",
};

function getCaseStudyThumbnailFrameStyle(study: CaseStudy): CSSProperties {
  return {
    backgroundColor: study.thumbnailBackground ?? "var(--accent)",
  };
}

const featuredCaseStudyIds = ["sales-insights", "sales-navigator-multiseat", "campglint", "seller-agent", "career-pages", "company-pages"];
const compactCaseStudyIds: string[] = [];
const routedCaseStudyIds = ["sales-insights", "sales-navigator-multiseat", "campglint", "seller-agent", "company-pages", "career-pages"];

const resumeSignals = [
  "11+ years at LinkedIn across Sales, Talent, Company Pages, content platforms, and AI agent workflows.",
  "Product designer focused on product strategy, end-to-end UX, interaction design, and enterprise workflows.",
  "Builder of AI-powered web and iOS products from concept to production-ready prototype.",
];

const heroFocusItems = [
  {
    title: "Founder-led product",
    body: "Native iOS product strategy, interaction design, and launch readiness carried end to end.",
  },
  {
    title: "Enterprise systems",
    body: "Admin, data trust, GTM planning, integrations, and adoption loops across LinkedIn products.",
  },
  {
    title: "AI workflows",
    body: "Source-backed assistance, seller control, structured outputs, and useful next actions.",
  },
];

const featuredProofPoints = heroFocusItems.map((item, index) => ({
  value: String(index + 1).padStart(2, "0"),
  label: item.title,
  detail: item.body,
}));

const experienceHighlights = [
  {
    period: "2022-2025",
    title: "Senior Product Designer, Sales Solutions",
    body:
      "Led end-to-end design across LinkedIn Sales Navigator and Sales Insights, creating scalable workflows for sellers and sales operations teams. Co-defined early Seller Agent concepts that informed LinkedIn's AI-agent direction, and designed Sales Insights planning experiences that helped sales leaders assess markets, prioritize accounts, and forecast with greater confidence.",
  },
  {
    period: "2020-2022",
    title: "Product Design Lead, Productivity Solutions",
    body:
      "Managed a 3-person design team building content creation, publishing, and localization workflows across LinkedIn that reduced manual Help Center operations and enabled faster multi-market content launches.",
  },
  {
    period: "2018-2020",
    title: "Senior Product Designer, Talent Solutions",
    body:
      "Led design of Pipeline Builder to enable organizations to build targeted pipelines of interested candidates for high priority, high volume, or hard-to-fill roles. Enabled Talent Brand Managers to attract and measure ROI, and helped Admins customize their presence on LinkedIn with Career Pages.",
  },
  {
    period: "2016-2018",
    title: "Product Designer, LinkedIn Company Pages",
    body:
      "Shaped Company Pages admin and member experiences across free and paid tiers. Launched LinkedIn's first company review experience to help job seekers assess fit.",
  },
  {
    period: "2014-2016",
    title: "Product Designer, Sales Solutions",
    body:
      "Designed Admin and Integration experiences that enabled CRM and Gmail integrations, scalable team management, and enterprise adoption. Launched Social Selling Index and growth initiatives, shaping core product direction through research, prototyping, and cross-functional collaboration.",
  },
  {
    period: "2013",
    title: "UX Design Intern, Monetization",
    body:
      "Designed a product directory for LinkedIn monetization products to improve discoverability and navigation.",
  },
  {
    period: "2012",
    title: "UX Design Intern, thredUP",
    body:
      "Designed Android shopping flows and print collateral to support thredUP's mobile app launch.",
  },
];

const currentBuilderExperience = {
  title: "Product Designer & Builder",
  company: "Independent",
  period: "2026-Present",
  body:
    "Designing and building AI-powered web and iOS products from concept to production-ready prototype, combining product strategy, UX, visual design, prompt design, and front-end implementation.",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase text-black/55">{children}</p>;
}

function PhoneShot({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-[14.5rem] rounded-[1.75rem] border border-black/20 bg-[#202321] p-1.5 shadow-[0_20px_54px_-36px_rgb(0_0_0/0.72)]">
      <div className="overflow-hidden rounded-[1.35rem] bg-white">
        <img src={src} alt={alt} className="block h-auto w-full" loading={priority ? "eager" : "lazy"} />
      </div>
    </div>
  );
}

function StorySectionLabel({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/42">{eyebrow}</p> : null}
      <h2 className={`${eyebrow ? "mt-3 " : ""}max-w-2xl text-2xl font-semibold leading-tight text-balance text-black/88 sm:text-3xl`}>{title}</h2>
      {body ? <p className="mt-3 max-w-2xl text-sm leading-6 text-black/64">{body}</p> : null}
    </div>
  );
}

const storyMetaLogos: Record<string, { src: string; alt: string }> = {
  LinkedIn: {
    src: "/brand/LinkedIn_logo.png",
    alt: "LinkedIn",
  },
  CampGlint: {
    src: "/screenshots/campglint-case-study/CampGlint-Icon-Light.png",
    alt: "CampGlint",
  },
  GraphicSnack: {
    src: "/screenshots/graphicsnack-ios-case-study/app-icon.png",
    alt: "GraphicSnack",
  },
  "GraphicSnack iOS": {
    src: "/screenshots/graphicsnack-ios-case-study/app-icon.png",
    alt: "GraphicSnack iOS",
  },
};

function getStoryMetaLogo(item: SnapshotItem) {
  if (item.label === "Company" || item.label === "Product") {
    return storyMetaLogos[item.value];
  }

  return undefined;
}

function StoryMetaList({ items, compact = false }: { items: SnapshotItem[]; compact?: boolean }) {
  return (
    <dl
      className={[
        "transition-[padding,gap] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        compact
          ? "flex gap-2 overflow-x-auto py-2 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:gap-x-7 sm:gap-y-3 sm:overflow-visible sm:py-3 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
          : "grid gap-x-7 gap-y-5 py-5 sm:grid-cols-2 lg:grid-cols-4",
      ].join(" ")}
    >
      {items.map((item) => {
        const logo = getStoryMetaLogo(item);

        return (
          <div
            key={item.label}
            className={
              compact
                ? "min-w-max rounded-md border border-black/10 bg-white/72 px-3 py-2 shadow-[0_10px_24px_-22px_rgb(0_0_0/0.45)] sm:min-w-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none"
                : undefined
            }
          >
            <dt className={["font-semibold uppercase tracking-[0.12em] text-black/42 transition-[font-size,line-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", compact ? "text-[0.58rem] leading-4" : "text-[0.68rem] leading-5"].join(" ")}>
              {item.label}
            </dt>
            <dd
              className={[
                "font-medium text-black/76 transition-[margin,font-size,line-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                logo ? "flex items-center gap-2.5" : "",
                compact ? "whitespace-nowrap sm:whitespace-normal" : "",
                compact ? "mt-1 text-xs leading-5" : logo ? "mt-2 text-sm leading-6" : "mt-1.5 text-sm leading-6",
              ].join(" ")}
            >
              {logo ? (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={[
                    "shrink-0 object-cover shadow-[0_10px_22px_-16px_rgb(var(--accent-rgb)/0.8)] transition-[width,height,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    compact ? "h-5 w-5 rounded-[0.2rem]" : "h-6 w-6 rounded-[0.26rem]",
                  ].join(" ")}
                  loading="lazy"
                />
              ) : null}
              <span>{item.value}</span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

function StoryProductMedia({
  src,
  alt,
  priority = false,
  phone = false,
  maxHeightClass,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  phone?: boolean;
  maxHeightClass?: string;
}) {
  if (phone) {
    return (
      <div className="mx-auto w-full max-w-[15.25rem]">
        <PhoneShot src={src} alt={alt} priority={priority} />
      </div>
    );
  }

  const productStoryMedia = !maxHeightClass;

  return (
    <MaxHeightImageViewport
      src={src}
      alt={alt}
      priority={priority}
      maxHeightClass={maxHeightClass ?? "max-h-none"}
      className={productStoryMedia ? "aspect-[16/10] w-full" : undefined}
      imageClassName={productStoryMedia ? "h-full object-cover" : undefined}
    />
  );
}

const caseStudyScopeTitles: Partial<Record<string, string[]>> = {
  "sales-navigator-multiseat": ["Admin workflows", "CRM integrations", "Seller workflow integrations", "Growth", "Support"],
  "sales-insights": ["Product partnership", "Product maturity", "Experience scope", "Integration workflows"],
  campglint: ["Product direction", "Monitoring workflow", "Discovery and trip readiness", "Native app foundation", "iOS system design"],
  "seller-agent": ["Opportunity definition", "Experience concept", "Agent interaction model", "Concept testing", "Cross-team alignment"],
};

function CaseStudyRoleAndScope({ study }: { study: CaseStudy }) {
  const scopeTitles = caseStudyScopeTitles[study.id];

  if (scopeTitles) {
    return (
      <section id="scope" className="grid scroll-mt-32 gap-7 border-b border-black/12 pb-12 lg:grid-cols-[minmax(13rem,0.34fr)_minmax(0,1fr)]">
        <StorySectionLabel eyebrow="Role and scope" title="My role and scope" />
        <ul className="grid gap-4">
          {study.systemBuild.map((item, index) => (
            <li key={item} className="border-l border-black/18 pl-4">
              <h3 className="text-sm font-semibold leading-5 text-black/82">{scopeTitles[index]}</h3>
              <p className="mt-1.5 text-sm leading-6 text-black/66">{item}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const ownership = study.contribution?.owned.slice(0, 2) ?? study.impact.slice(0, 2).map((item) => item.detail);
  const collaboration = study.contribution?.partnered.slice(0, 2) ?? [];
  const groups = [
    { title: "Primary ownership", items: ownership },
    { title: "Product scope", items: study.surfaces.slice(0, 4).map((item) => item.title) },
    ...(collaboration.length > 0 ? [{ title: "Collaboration", items: collaboration }] : []),
  ];

  return (
    <section id="scope" className="grid scroll-mt-32 gap-7 border-b border-black/12 pb-12 lg:grid-cols-[minmax(13rem,0.34fr)_minmax(0,1fr)]">
      <div>
        <StorySectionLabel eyebrow="Role and scope" title="My role and scope" />
        <p className="mt-3 max-w-sm text-base font-semibold leading-7 text-black/78">{study.role}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title} className="border-l border-black/16 pl-4">
            <h3 className="text-sm font-semibold leading-5 text-black/78">{group.title}</h3>
            <ul className="mt-3 grid gap-2.5">
              {group.items.map((item) => (
                <li key={item} className="text-sm leading-6 text-black/62">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

const campGlintAiTools = [
  {
    title: "Codex",
    detail:
      "AI-assisted implementation, codebase navigation, SwiftUI refactoring, and design-system documentation across the app.",
  },
  {
    title: "XcodeBuildMCP",
    detail:
      "Xcode builds, simulator checks, diagnostics, and verification that keep AI-assisted changes grounded in the native iOS toolchain.",
  },
];

function CampGlintAiBuildWorkflow() {
  return (
    <section id="ai-build-workflow" className="grid scroll-mt-32 gap-7 border-b border-black/12 pb-12 lg:grid-cols-[minmax(13rem,0.34fr)_minmax(0,1fr)]">
      <StorySectionLabel
        eyebrow="Build workflow"
        title="How AI supports the build"
        body="I use AI to accelerate implementation and verification while keeping product direction, interaction decisions, and final quality judgment in my hands."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {campGlintAiTools.map((tool) => (
          <div key={tool.title} className="border-l border-black/18 pl-4">
            <h3 className="text-base font-semibold leading-6 text-black/84">{tool.title}</h3>
            <p className="mt-2 text-sm leading-6 text-black/64">{tool.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CaseStudyImagePlaceholder({ accent }: { accent: string }) {
  return (
    <section id="problem-frame-visual" aria-label="Project visual preview" className="scroll-mt-32 border-b border-black/12 pb-12">
      <div className="relative min-h-[13rem] overflow-hidden rounded-lg border border-black/12 bg-[#f3f0e8] sm:aspect-[16/7]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute inset-x-6 bottom-6 top-6 rounded-md border border-dashed border-black/18 bg-[#fffefb]/36 sm:inset-x-8 sm:bottom-8 sm:top-8" />
        <div className={`absolute left-6 top-6 h-2 w-24 rounded-full ${accent} sm:left-8 sm:top-8`} />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-12 w-12 place-items-center rounded-md border border-black/12 bg-[#fffefb]/76 text-black/36">
            <Camera className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudyProblemFrameVisual({ study }: { study: CaseStudy }) {
  if (study.id === "seller-agent") {
    return (
      <section id="problem-frame-visual" aria-label="Seller Agent prospecting workflow" className="scroll-mt-32 border-b border-black/12 pb-12">
        <div className="grid aspect-[16/9] place-items-center overflow-hidden rounded-lg border border-black/12 bg-[#f8ede5]">
          <img
            src="/projects/seller-agent/seller-agent-test.png"
            alt="Seller Agent concept explorations showing guided prompts, relationship paths, source-backed rationale, and outreach actions"
            className="block h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      </section>
    );
  }

  if (study.id === "campglint") {
    return (
      <section id="problem-frame-visual" aria-label="CampGlint product preview" className="scroll-mt-32 border-b border-black/12 pb-12">
        <div className="grid aspect-[16/9] place-items-center overflow-hidden rounded-lg border border-black/12 bg-[var(--accent)]" style={getCaseStudyThumbnailFrameStyle(study)}>
          <img
            src="/projects/CampGlint/campglint-ios-current-thumbnail-lg.png"
            alt="CampGlint monitoring, monitor detail, and setup screens"
            className="block h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      </section>
    );
  }

  if (study.id === "sales-navigator-multiseat") {
    return (
      <section id="problem-frame-visual" aria-label="Sales Navigator product preview" className="scroll-mt-32 border-b border-black/12 pb-12">
        <div className="grid aspect-[16/9] place-items-center overflow-hidden rounded-lg border border-black/12 bg-[var(--accent)]" style={getCaseStudyThumbnailFrameStyle(study)}>
          <img
            src="/projects/Sales%20Nav/sales-nav-thumbnail.png"
            alt="LinkedIn Sales Navigator workspace and CRM-connected product surfaces"
            className="block h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      </section>
    );
  }

  if (study.id !== "sales-insights") {
    return <CaseStudyImagePlaceholder accent={study.accent} />;
  }

  return (
    <section id="problem-frame-visual" aria-label="Sales Insights product preview" className="scroll-mt-32 border-b border-black/12 pb-12">
      <div className="grid aspect-[16/9] place-items-center overflow-hidden rounded-lg border border-black/12 bg-[var(--accent)]" style={getCaseStudyThumbnailFrameStyle(study)}>
        <img
          src="/projects/sales-insights/Sales-Insights-thumbnail-md.png"
          alt="LinkedIn Sales Insights report interface with account filters, personas, market sizing, and account table"
          className="block h-full w-full object-contain"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function CaseStudyPersonasSection({ section }: { section: PersonaSectionContent }) {
  return (
    <section id="personas" className="grid scroll-mt-32 gap-7 border-b border-black/12 pb-12 lg:grid-cols-[minmax(13rem,0.34fr)_minmax(0,1fr)]">
      <StorySectionLabel
        eyebrow="Personas"
        title={section.title}
        body={section.body}
      />
      <div>
        {section.items.map((persona) => (
          <article key={persona.audience} className="grid gap-4 border-b border-black/14 py-5 last:border-b-0 sm:grid-cols-[minmax(9rem,0.42fr)_minmax(0,1fr)] sm:gap-x-6 xl:grid-cols-[minmax(9rem,0.42fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <h3 className="text-lg font-semibold leading-6 text-black/86">{persona.audience}</h3>
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-black/42">{section.jobLabel}</p>
              <p className="mt-1.5 text-sm leading-6 text-black/64">{persona.job}</p>
            </div>
            <div className="sm:col-start-2 xl:col-start-auto">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-black/42">What they needed</p>
              <p className="mt-1.5 text-sm leading-6 text-black/64">{persona.needed}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CaseStudyStoryView({ study }: { study: CaseStudy }) {
  const isPhoneCase = phoneCaseIds.has(study.id);
  const usesOpportunityPullQuote = study.id === "sales-navigator-multiseat" || study.id === "sales-insights" || study.id === "campglint" || study.id === "seller-agent";
  const metaRef = useRef<HTMLDivElement>(null);
  const [isMetaStuck, setIsMetaStuck] = useState(false);
  const [metaHeight, setMetaHeight] = useState(0);
  const brief = caseStudyBriefs[study.id] ?? {
    family: study.platform,
    question: study.headline,
  };
  const whySection = caseStudyWhySections[study.id];
  const personasSection = caseStudyPersonaSections[study.id];

  useEffect(() => {
    function updateMetaStickyState() {
      const meta = metaRef.current;
      if (!meta) return;

      const rect = meta.getBoundingClientRect();
      setIsMetaStuck(rect.top <= 0);
      setMetaHeight(Math.ceil(rect.height));
    }

    updateMetaStickyState();
    window.addEventListener("scroll", updateMetaStickyState, { passive: true });
    window.addEventListener("resize", updateMetaStickyState);

    return () => {
      window.removeEventListener("scroll", updateMetaStickyState);
      window.removeEventListener("resize", updateMetaStickyState);
    };
  }, []);

  return (
    <section id="case-study-view" className="border-t border-black/12 bg-[#fbfaf7]">
      <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 sm:py-10 lg:px-10">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(20rem,0.58fr)] lg:items-center">
          <div>
            <h1 className="max-w-4xl text-3xl font-semibold leading-[1.08] text-balance text-black/90 sm:text-5xl sm:leading-[1.06] lg:text-[3.45rem]">
              {study.headline}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-black/68 sm:mt-5 sm:text-lg sm:leading-8">{study.summary}</p>
          </div>

          <div className="justify-self-center lg:justify-self-end">
            <StoryProductMedia
              src={study.heroImage}
              alt={study.heroAlt}
              priority
              phone={isPhoneCase}
              maxHeightClass="max-h-[19.5rem] sm:max-h-[22.5rem]"
            />
          </div>
        </div>

        <div
          ref={metaRef}
          className={[
            "sticky top-0 z-30 -mx-5 mt-8 bg-[#fbfaf7]/92 px-5 backdrop-blur-sm transition-[background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-black/12 after:content-[''] sm:-mx-8 sm:mt-10 sm:px-8 lg:-mx-10 lg:px-10",
            isMetaStuck ? "bg-[#fbfaf7]/98 shadow-[0_18px_42px_-40px_rgb(var(--accent-rgb)/0.62)]" : "",
          ].join(" ")}
        >
          <div className={["transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", isMetaStuck ? "-translate-y-px opacity-95" : "translate-y-0 opacity-100"].join(" ")}>
            <StoryMetaList items={study.snapshot} compact={isMetaStuck} />
          </div>
        </div>

        <div
          className="mt-14 grid gap-14 transition-[padding-top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pt-[var(--case-meta-offset)]"
          style={{ "--case-meta-offset": isMetaStuck ? `${metaHeight + 24}px` : "0px" } as CSSProperties}
        >
          <div className="grid gap-14">
            {whySection ? (
              <section className="grid gap-7 border-b border-black/12 pb-12">
                <StorySectionLabel
                  eyebrow="Why"
                  title={whySection.title}
                  body={usesOpportunityPullQuote ? undefined : whySection.body}
                />
                {usesOpportunityPullQuote ? (
                  <blockquote className="max-w-4xl border-l-2 border-[#182070]/45 py-0.5 pl-5 sm:pl-6">
                    <p className="text-lg font-normal leading-7 text-pretty text-black/72 sm:text-xl sm:leading-8">
                      {whySection.body}
                    </p>
                  </blockquote>
                ) : null}
                <div className="grid gap-5 sm:grid-cols-3">
                  {whySection.points.map((point) => (
                    <div key={point.title} className="border-l border-black/18 pl-4">
                      <h3 className="text-base font-semibold leading-6 text-black/84">{point.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-black/64">{point.detail}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="grid gap-7 border-b border-black/12 pb-12">
              <StorySectionLabel
                eyebrow="Problem frame"
                title={brief.question}
              />
            </section>

            {personasSection ? <CaseStudyPersonasSection section={personasSection} /> : null}

            <CaseStudyProblemFrameVisual study={study} />

            <CaseStudyRoleAndScope study={study} />

            {study.id === "campglint" ? <CampGlintAiBuildWorkflow /> : null}

            <section id="how-it-unfolded" className="grid scroll-mt-32 gap-7 border-b border-black/12 pb-12">
              <StorySectionLabel
                eyebrow="How it unfolded"
                title="From ambiguity to product direction"
              />
              <ol className={`grid gap-4 sm:grid-cols-2 ${study.journey.length >= 5 ? "xl:grid-cols-5" : "xl:grid-cols-4"}`}>
                {study.journey.map((item, index) => {
                  const cue = getJourneyCue(index, study.journey.length);
                  const showCue = study.id !== "sales-navigator-multiseat" && study.id !== "sales-insights" && study.id !== "campglint" && study.id !== "seller-agent";

                  return (
                    <li key={item.phase} className="group relative flex min-h-[9.5rem] flex-col overflow-hidden rounded-lg border border-black/12 bg-[#fffefb]/72 p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_58px_-50px_rgb(0_0_0/0.55)]">
                      {showCue ? <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-black/42">{cue.label}</p> : null}
                      <h3 className={`${showCue ? "mt-3" : ""} text-base font-semibold leading-6 text-balance text-black/86`}>{item.title}</h3>
                      <p className="mt-2 text-sm leading-5 text-black/62">{item.detail}</p>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section className="grid gap-10">
              <StorySectionLabel
                eyebrow="Product story"
                title="Selected product moments"
              />
              {study.story.map((chapter, index) => (
                <article key={chapter.phase} className="grid gap-6 border-t border-black/12 pt-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-start lg:gap-9">
                  <div className="lg:pt-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/42">{chapter.label}</p>
                    <h3 className="mt-4 max-w-xl text-2xl font-semibold leading-tight text-balance text-black/88">{chapter.title}</h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-black/68">{chapter.story}</p>
                    <div className="mt-5 border-l border-black/24 pl-4">
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-black/38">Key surfaces</p>
                      <p className="mt-1.5 text-sm leading-6 text-black/58">{chapter.evidence}</p>
                    </div>
                  </div>
                  <StoryProductMedia src={chapter.image} alt={chapter.alt} priority={index < 2} phone={isPhoneCase} />
                </article>
              ))}
            </section>

            <section className="grid gap-7 border-t border-black/12 pt-10">
              <StorySectionLabel
                eyebrow="Decisions"
                title="The tradeoffs that made the work stronger"
              />
              <ol className="grid gap-0 border-t border-black/12">
                {study.decisions.map((item, index) => (
                  <li key={item.title} className="grid gap-3 border-b border-black/12 py-5 last:border-b-0 sm:grid-cols-[4rem_minmax(0,1fr)]">
                    <p className="text-sm font-semibold text-black/36">{String(index + 1).padStart(2, "0")}</p>
                    <div>
                      <h3 className="text-lg font-semibold leading-7 text-black/86">{item.title}</h3>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-black/66">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="grid gap-7 border-t border-black/12 pt-10">
              <StorySectionLabel eyebrow="Outcome" title={study.outcomesTitle} />
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.54fr)]">
                <ul className="grid gap-3">
                  {study.outcomes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-black/68">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-black/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-l border-black/18 pl-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/42">Takeaway</p>
                  <p className="mt-3 text-base font-semibold leading-7 text-black/82">{study.takeaway}</p>
                </div>
              </div>
              {study.outcomeTimeline ? (
                <div className="pt-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/42">{study.outcomeTimeline.title}</p>
                  <ol className="relative mt-5 grid gap-0 pl-7 before:absolute before:bottom-0 before:left-[3px] before:top-0 before:w-0.5 before:bg-[#182070]/25 before:content-[''] md:grid-cols-5 md:pl-0 md:before:bottom-auto md:before:left-0 md:before:right-0 md:before:top-0 md:before:h-0.5 md:before:w-auto">
                    {study.outcomeTimeline.items.map((item) => (
                      <li key={item.date} className="relative pb-6 pr-6 before:absolute before:left-[-1.75rem] before:top-1 before:h-2 before:w-2 before:rounded-full before:bg-[#182070] before:content-[''] md:pb-5 md:pt-5 md:before:-top-[3px] md:before:left-0">
                        <p className="text-sm font-semibold leading-5 text-[#182070]">{item.date}</p>
                        <p className="mt-2 text-sm leading-6 text-black/66">{item.detail}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}


function PortfolioHeader({ caseStudy = false, sticky = !caseStudy }: { caseStudy?: boolean; sticky?: boolean }) {
  const pathname = usePathname();
  const isCaseStudiesActive = pathname === "/" || pathname.startsWith("/case-studies");
  const isResumeActive = pathname === "/resume";
  const navLinkBase =
    "inline-flex min-h-10 items-center rounded-md px-3 py-2 text-[0.82rem] font-medium hover:text-[var(--accent)]";

  return (
    <header className={`${sticky ? "sticky top-0" : "relative"} z-40 border-b border-black/15 bg-[#fbfaf7]/94 backdrop-blur`}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-5 py-2.5 sm:px-8 md:flex-nowrap lg:px-12">
        <Link href={caseStudy ? "/#top" : "#top"} className="flex min-w-0 items-center gap-2.5">
          <img
            src="/brand/JM_logo_icon_transparent.png"
            alt="Juan Mondragon"
            className="h-8 w-8 shrink-0 rounded-md object-contain"
          />
          <span className="min-w-0">
            <span className="block truncate text-[0.82rem] font-semibold leading-5">Juan Mondragon</span>
            <span className="block truncate text-[0.7rem] leading-4 text-black/56">Product design portfolio</span>
          </span>
        </Link>
        <nav className="order-3 -mx-5 flex w-[calc(100%+2.5rem)] flex-wrap items-center gap-1 border-t border-black/10 px-5 pt-2 sm:-mx-8 sm:w-[calc(100%+4rem)] sm:px-8 md:order-none md:mx-0 md:w-auto md:border-0 md:px-0 md:pt-0" aria-label="Portfolio navigation">
          <Link
            href="/"
            aria-current={isCaseStudiesActive ? "page" : undefined}
            className={`${navLinkBase} ${isCaseStudiesActive ? "text-[var(--accent)]" : "text-black/64"}`}
          >
            Case studies
          </Link>
          <Link
            href="/resume"
            aria-current={isResumeActive ? "page" : undefined}
            className={`${navLinkBase} ${isResumeActive ? "text-[var(--accent)]" : "text-black/64"}`}
          >
            Resume
          </Link>
        </nav>
        <a
          href="mailto:juansjsu@gmail.com"
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-3 py-1.5 text-[0.82rem] font-semibold text-white hover:bg-[var(--accent-strong)]"
        >
          Contact me
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}


function LinkedInBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

function BehanceBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M22 7h-7V5h7v2ZM6.47 8.4c2.45 0 3.78.71 3.78 2.75 0 1.08-.5 1.82-1.32 2.18 1.13.33 1.69 1.19 1.69 2.47 0 1.98-1.6 3.05-3.78 3.05H0V8.4h6.47Zm-3.8 4.14h3.41c.98 0 1.52-.37 1.52-1.18 0-.91-.7-1.1-1.63-1.1h-3.3v2.28Zm0 4.46h3.59c1.1 0 1.74-.4 1.74-1.36 0-1.07-.87-1.33-1.8-1.33H2.67V17Zm21.06 0c-.44 1.3-2.03 3-5.1 3-3.08 0-5.57-1.73-5.57-5.68 0-3.91 2.33-5.92 5.47-5.92 3.08 0 4.96 1.78 5.38 4.43.08.51.1 1.19.09 2.14h-7.94c.13 3.21 3.48 3.31 4.59 2.03h3.08Zm-7.69-4h4.97c-.11-1.55-1.14-2.22-2.48-2.22-1.47 0-2.28.77-2.49 2.22Z" />
    </svg>
  );
}

function PortfolioFooter() {
  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/juanmondragon",
      external: true,
      icon: LinkedInBrandIcon,
    },
    {
      label: "Dribbble",
      href: "https://dribbble.com/1mondragon",
      external: true,
      icon: Dribbble,
    },
    {
      label: "Behance",
      href: "https://www.behance.net/graphicsnack",
      external: true,
      icon: BehanceBrandIcon,
    },
    {
      label: "Contact me",
      href: "mailto:juansjsu@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="relative isolate overflow-hidden border-t border-[rgb(var(--accent-rgb)/0.28)] bg-[var(--accent)] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <img
        src="/brand/background.JPG"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[center_18%] opacity-82 saturate-[0.82] contrast-110"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgb(24_32_112/0.78)_0%,rgb(24_32_112/0.64)_42%,rgb(24_32_112/0.34)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_top,rgb(24_32_112/0.76)_0%,rgb(24_32_112/0.30)_52%,rgb(24_32_112/0.62)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:56px_56px] opacity-45 [mask-image:linear-gradient(to_right,rgb(24_32_112),transparent_78%)]" />
      <div className="absolute right-[-9rem] top-[-7rem] -z-10 h-80 w-80 rounded-full border border-white/18" />
      <div className="absolute bottom-12 right-8 -z-10 hidden h-px w-72 rotate-[-16deg] bg-white/24 sm:block" />

      <div className="mx-auto grid min-h-[16rem] max-w-7xl content-between gap-12">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,0.8fr)_auto] lg:items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-md bg-white/92 shadow-[0_16px_45px_-28px_rgb(24_32_112/0.9)]">
                <img src="/brand/JM_logo_icon_transparent.png" alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Juan Mondragon</p>
                <p className="mt-0.5 text-sm text-white/66">Product Designer and Builder</p>
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3 lg:justify-end" aria-label="Social links">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  aria-label={item.label}
                  title={item.label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white backdrop-blur hover:border-white/34 hover:bg-white/16 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/16 pt-5 text-sm text-white/64 sm:flex-row sm:items-center sm:justify-between">
          <p>Product design portfolio, 2026.</p>
          <Link href="#top" className="inline-flex w-fit items-center gap-2 rounded-md border border-white/20 px-3 py-2 font-semibold text-white hover:bg-white/10">
            Back to top
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

const caseStudyBriefs: Record<string, { family: string; question: string }> = {
  campglint: {
    family: "Campsite monitoring system",
    question:
      "How can campground availability shift from stressful manual checking into a calmer trip-planning flow?",
  },
  "sales-navigator-multiseat": {
    family: "CRM-connected seller system",
    question: "How do you turn LinkedIn relationship data into a CRM-connected seller workflow?",
  },
  "career-pages": {
    family: "Employer storytelling system",
    question: "How do employer stories move candidates from company research into job action?",
  },
  "company-pages": {
    family: "Employee insight system",
    question: "How can employee-generated ratings help job seekers trust what it is really like to work at a company?",
  },
  "sales-insights": {
    family: "GTM planning system",
    question: "How can GTM teams identify the right accounts and move that decision into action?",
  },
  "seller-agent": {
    family: "AI-assisted seller workflow",
    question: "How can AI help sellers turn scattered LinkedIn signals into a clear prospecting action without leaving their workflow?",
  },
};

const salesInsightsPersonas: PersonaItem[] = [
  {
    audience: "Sales Ops and RevOps",
    job: "Define territories, whitespace, account priority, and forecasts from market and account signals.",
    needed:
      "Source quality, freshness, account rationale, match status, and criteria they could defend.",
  },
  {
    audience: "Marketing and ABM teams",
    job: "Turn account strategy into campaign audiences without rebuilding the same list logic in another tool.",
    needed:
      "Shared definitions, clean export paths, and confidence that Sales and Marketing were acting from the same target-account model.",
  },
  {
    audience: "CRM admins and operations owners",
    job: "Protect systems of record while using LinkedIn data to improve matching, field mapping, and sync quality.",
    needed:
      "Visible review states, exception handling, permissions, match confidence, and proof of what would change downstream.",
  },
  {
    audience: "GTM and Sales leaders",
    job: "Align teams around which accounts mattered, why they mattered, and where sellers should focus.",
    needed:
      "Readable summaries, comparable segments, decision rationale, and handoff paths into seller workflows.",
  },
];

const salesNavigatorPersonas: PersonaItem[] = [
  {
    audience: "Sellers and account executives",
    job: "Find the right accounts and people, understand relationship paths, and move from research to action across LinkedIn, CRM, email, and mobile.",
    needed:
      "Relevant lead and account signals, warm paths, recommendations, saved work, and lightweight actions inside the workflows they already used.",
  },
  {
    audience: "Sales managers and leaders",
    job: "Roll out Sales Navigator as a team habit, understand whether sellers were achieving value, and coach teams toward stronger selling behaviors.",
    needed:
      "Onboarding paths, usage visibility, team reporting, plan clarity, and proof that the product was creating value beyond individual prospecting.",
  },
  {
    audience: "Admins and Sales Ops",
    job: "Configure teams, manage seats, support onboarding, and keep the product manageable as adoption expanded across a sales organization.",
    needed:
      "Clear admin controls, seat and team management, settings, usage reporting, permissions, and recovery paths for setup or account changes.",
  },
  {
    audience: "CRM",
    job: "Connect Sales Navigator relationship intelligence to systems of record without disrupting CRM ownership, data quality, or sales operations workflows.",
    needed:
      "Connection state, sync controls, field mapping, activity writeback, data controls, partner-platform patterns, and visible integration status.",
  },
];

const sellerAgentPersonas: PersonaItem[] = [
  {
    audience: "Account-based sellers",
    job: "Track changes across priority accounts, understand what mattered, and identify the right people to engage.",
    needed: "Relevant account signals, lead recommendations, relationship context, and a clear reason to act now.",
  },
  {
    audience: "Lead-focused sellers",
    job: "Research a specific person, qualify fit, and prepare an informed next step.",
    needed: "Profile context, talking points, source-backed rationale, and actions tied to the lead in view.",
  },
  {
    audience: "Relationship-led sellers",
    job: "Find a credible path into an account through shared connections and relevant context.",
    needed: "Warm paths, introduction context, mutual relationships, and seller control over outreach.",
  },
];

const campGlintPersonas: PersonaItem[] = [
  {
    audience: "Campers targeting high-demand sites",
    job: "Watch a specific campground and date window without repeatedly checking booking sites.",
    needed: "Clear monitor status, trustworthy availability signals, and a direct handoff to the official booking source.",
  },
  {
    audience: "Flexible campers",
    job: "Keep options open across dates, stay length, and backup campgrounds when the first choice is unavailable.",
    needed: "Lightweight setup, flexible-date controls, and discovery that helps shape realistic alternatives.",
  },
  {
    audience: "Family trip planners",
    job: "Move from a successful booking into the practical details needed to get ready for the trip.",
    needed: "Reservation details, packing and task visibility, site context, and a simple readiness view.",
  },
];

const caseStudyPersonaSections: Record<string, PersonaSectionContent> = {
  "seller-agent": {
    title: "Who Seller Agent had to work for",
    body: "The concept had to support sellers moving between account monitoring, lead research, relationship discovery, and outreach without asking them to start from a blank prompt.",
    jobLabel: "Workflow",
    items: sellerAgentPersonas,
  },
  campglint: {
    title: "Who CampGlint is designed for",
    body: "The same monitoring loop has to support campers with a fixed destination, people still exploring alternatives, and families carrying a confirmed site into trip preparation.",
    jobLabel: "Workflow",
    items: campGlintPersonas,
  },
  "sales-insights": {
    title: "The same account model had to support multiple GTM teams",
    body: "Each team entered through a different job, but they all needed to trust the same account logic before moving into planning, CRM, Marketing, or seller execution.",
    jobLabel: "Planning job",
    items: salesInsightsPersonas,
  },
  "sales-navigator-multiseat": {
    title: "Who Sales Navigator had to work for",
    body: "Sales Navigator had to serve sellers directly while giving the people who bought, rolled out, measured, and managed it enough confidence to make it a team system.",
    jobLabel: "Workflow",
    items: salesNavigatorPersonas,
  },
};

const caseStudyWhySections: Record<string, { title: string; body: string; points: DetailItem[] }> = {
  campglint: {
    title: "The opportunity",
    body:
      "Popular campground sites often reopen without warning, leaving campers to repeatedly check fragmented booking sites. CampGlint turns that work into a native monitoring loop: save a campground and date window, act on a cancellation signal, complete the reservation with the official provider, and prepare for the trip once a site is secured.",
    points: [
      {
        title: "Repeated checking was workflow",
        detail:
          "Campers already revisit booking sites, compare dates, and watch for cancellations. The product opportunity was to make that behavior explicit and easier to trust.",
      },
      {
        title: "Booking belongs to official provider",
        detail:
          "CampGlint can surface signals and urgency, but the official provider remains the source of truth for booking, payment, and reservation details.",
      },
      {
        title: "Finding a site is not the end",
        detail:
          "Once a camper finds and books a site, the same product can shift into lightweight readiness: dates, site details, packing, tasks, and trip memory.",
      },
    ],
  },
  "sales-insights": {
    title: "The opportunity",
    body:
      "Sales and Revenue teams had access to more market, company, and relationship data than they could reliably operationalize. Sales Insights could turn that data into a trusted planning workflow across reports, sources, account lists, matching, CRM automation, and downstream Sales and Marketing workflows.",
    points: [
      {
        title: "Planning needed confidence",
        detail:
          "Sales Ops and RevOps teams were making decisions that affected territories, campaigns, CRM records, and rep focus. The product had to show why a recommendation was worth trusting.",
      },
      {
        title: "Data trust was the product experience",
        detail:
          "Source clarity, account matching, freshness, unresolved records, and field mapping were not setup details. They were the moments where users decided whether the system could touch operational data.",
      },
      {
        title: "Insight had to move into action",
        detail:
          "A report became more valuable when its account logic could extend into exports, CRM workflows, Marketing activation, and Sales Navigator execution without every team rebuilding the criteria.",
      },
    ],
  },
  "seller-agent": {
    title: "The opportunity",
    body:
      "Sellers were already piecing together LinkedIn activity, profile changes, relationship paths, Sales Navigator, and CRM context to decide who to contact and why. Seller Agent could turn that fragmented research into in-context AI guidance without forcing sellers into a separate destination. After concept validation, the work expanded to align with LinkedIn's broader agent experience.",
    points: [
      {
        title: "Seller research was fragmented",
        detail:
          "Account updates, social signals, lead profiles, warm paths, and CRM follow-up lived across surfaces. The agent opportunity was to connect those signals inside the workflow sellers already used.",
      },
      {
        title: "AI needed a visible rationale",
        detail:
          "The concept had to show why a lead mattered, what changed, who could help, and which source backed the recommendation so sellers could trust the next action.",
      },
      {
        title: "Outreach still needed seller control",
        detail:
          "Drafting support was useful only if sellers could review, personalize, copy, save, or discard the output instead of handing the relationship moment to automation.",
      },
    ],
  },
  "company-pages": {
    title: "The opportunity",
    body:
      "Job seekers needed a more credible way to understand what it was like to work at a company, while employees needed trust before answering sensitive employer-related questions. The exploration covered desktop and mobile contribution flows, visible privacy states, a reusable question system, review concepts, and ways to carry employee signals into Company Pages, Jobs, recommendations, and Career Pages.",
    points: [
      {
        title: "Company research lacked employee proof",
        detail:
          "Employer-authored content could not fully answer fit questions around growth, leadership, flexibility, pride, compensation, and day-to-day experience.",
      },
      {
        title: "Contribution required visible privacy",
        detail:
          "Employees were being asked to evaluate current or previous employers. Private response language, aggregation, skip states, and audience controls had to be part of the core experience.",
      },
      {
        title: "Signals were most valuable in context",
        detail:
          "Ratings and reviews were strongest when they appeared inside Company Pages, Jobs, recommendations, feed discovery, and Career Pages rather than as an isolated review destination.",
      },
    ],
  },
  "career-pages": {
    title: "The opportunity",
    body:
      "Companies needed better ways to tell credible employer stories, and candidates needed clearer paths from company research to job action. Career Pages could connect admin authoring, publishing, and analytics with employee proof, Life Pages, jobs, alerts, and interest signals across LinkedIn's paid and free company presence.",
    points: [
      {
        title: "Employer branding needed proof",
        detail:
          "Life Pages were stronger when company stories came through teams, employees, photos, perspectives, and testimonials instead of broad recruiting claims.",
      },
      {
        title: "Admins needed publishing confidence",
        detail:
          "Talent Brand managers needed controls for authoring, previewing, targeting, saving, and publishing content that would shape how candidates evaluated the company.",
      },
      {
        title: "Company interest needed a next step",
        detail:
          "Company research became more useful when candidates could browse jobs, create alerts, find employees, and signal interest without leaving the company context.",
      },
    ],
  },
  "sales-navigator-multiseat": {
    title: "The opportunity",
    body:
      "Sales Navigator had to become more than a place to find leads. The opportunity was to make LinkedIn relationship intelligence adoptable by sales teams: easy for sellers to understand, manageable for admins, measurable for leaders, and available inside CRM, email, and LinkedIn.com. That required onboarding, administration, reporting, and growth paths to work as one connected system.",
    points: [
      {
        title: "Adoption had to be managed",
        detail:
          "Team customers needed onboarding, team management, usage reporting, and admin controls that made seat value visible and helped sellers get to useful behavior sooner.",
      },
      {
        title: "Bring sales intelligence into seller workflows",
        detail:
          "Relationship context was strongest when it appeared inside the systems sellers already used, from Salesforce widgets and scalable CRM integrations to Gmail and LinkedIn.com entry points.",
      },
      {
        title: "Team value needed proof",
        detail:
          "Social Selling Index, reporting, upsell paths, and funnel optimization helped connect individual seller behavior to broader team adoption and expansion.",
      },
    ],
  },
};

const campGlintPreviewScreens = [
  {
    label: "Discover",
    src: "/projects/CampGlint/iOS%20app%20screens/07-discovery-profile.PNG",
    alt: "CampGlint iOS discovery profile preferences screen",
  },
  {
    label: "Monitors",
    src: "/projects/CampGlint/iOS%20app%20screens/01-monitors-list.png",
    alt: "CampGlint iOS monitors list screen",
  },
  {
    label: "Trips",
    src: "/projects/CampGlint/iOS%20app%20screens/04-trip-details.PNG",
    alt: "CampGlint iOS trip detail screen",
  },
];

function DeviceMockup({
  screen,
  className = "",
  size = "md",
}: {
  screen: (typeof campGlintPreviewScreens)[number];
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "w-[6.8rem] sm:w-[7.5rem] lg:w-[8rem]",
    md: "w-[7.4rem] sm:w-[8.6rem] lg:w-[9.5rem]",
    lg: "w-[8rem] sm:w-[9.8rem] lg:w-[10.8rem]",
  }[size];

  return (
    <figure className={`relative shrink-0 ${sizeClass} ${className}`}>
      <div className="relative rounded-[1.8rem] bg-[#171a17] p-1.5 shadow-[0_28px_70px_-44px_rgb(0_0_0/0.86)] ring-1 ring-black/25">
        <div className="relative overflow-hidden rounded-[1.35rem] bg-white">
          <span className="absolute left-1/2 top-2 z-10 h-3 w-12 -translate-x-1/2 rounded-full bg-black/88" />
          <img src={screen.src} alt={screen.alt} className="block h-auto w-full" loading="lazy" />
        </div>
      </div>
      <figcaption className="mt-2 text-center text-[0.66rem] font-semibold uppercase text-black/42">{screen.label}</figcaption>
    </figure>
  );
}

function CampGlintDeviceScene({
  variant,
}: {
  variant: "row" | "shelf";
}) {
  const variantConfig = {
    row: {
      frame: "relative min-h-[15.5rem] items-center justify-center overflow-hidden border-b border-black/12 bg-[#F0F4F7] px-5 py-5 sm:min-h-[17rem] lg:min-h-[18.5rem]",
      list: "relative z-10 flex items-end justify-center gap-6 sm:gap-10 lg:gap-16",
      size: "sm" as const,
      item: ["z-10 translate-y-3 -rotate-[4deg]", "z-20 -translate-y-2", "z-10 translate-y-3 rotate-[4deg]"],
    },
    shelf: {
      frame: "items-end justify-center overflow-hidden border-b border-black/12 bg-[#F0F4F7] px-5 pt-5",
      list: "grid grid-cols-3 items-end justify-items-center gap-4 sm:gap-6",
      size: "sm" as const,
      item: ["translate-y-3", "-translate-y-1", "translate-y-3"],
    },
  }[variant];

  return (
    <div className={"flex " + variantConfig.frame}>
      <div className={variantConfig.list}>
        {campGlintPreviewScreens.map((screen, index) => (
          <DeviceMockup key={screen.label} screen={screen} size={variantConfig.size} className={variantConfig.item[index]} />
        ))}
      </div>
    </div>
  );
}

function CaseStudyThumbnail({ study }: { study: CaseStudy }) {
  const thumbnail = getCaseStudyThumbnail(study);

  return (
    <div className="relative grid h-[10.9375rem] place-items-center overflow-hidden bg-[var(--accent)] lg:h-[15.4375rem]" style={getCaseStudyThumbnailFrameStyle(study)}>
      <img src={thumbnail.src} alt={thumbnail.alt} className={caseStudyThumbnailImageClass} style={caseStudyThumbnailImageStyle} loading="lazy" />
    </div>
  );
}

function CaseStudyPreviewImpactList({ study, compact = false }: { study: CaseStudy; compact?: boolean }) {
  const points = study.impact.slice(0, 2);

  return (
    <div className={(compact ? "mt-5 grid gap-3 xl:grid-cols-2" : "mt-6 grid gap-4 sm:grid-cols-2")}>
      {points.map((point) => (
        <div key={point.title} className="border-l-2 border-black/18 pl-3">
          <p className="text-xs font-semibold leading-5 text-black/82">{point.title}</p>
          <p className={(compact ? "text-clamp-2 text-xs leading-5" : "text-sm leading-6") + " mt-1 text-black/62"}>{point.detail}</p>
        </div>
      ))}
    </div>
  );
}

function CaseStudyPreviewMeta({ study, compact = false }: { study: CaseStudy; compact?: boolean }) {
  const meta = [
    ["Role", study.role],
    ["Platform", study.platform],
  ];

  return (
    <div className={(compact ? "mt-5 grid gap-3 xl:grid-cols-2" : "mt-6 grid gap-4 sm:grid-cols-2") + " border-t border-black/12 pt-4"}>
      {meta.map(([label, value]) => (
        <div key={label}>
          <p className="text-[0.68rem] font-semibold uppercase text-black/42">{label}</p>
          <p className="mt-1 text-xs font-semibold leading-5 text-black/68">{value}</p>
        </div>
      ))}
    </div>
  );
}

function CaseStudyCardAction({ locked = true, compact = false }: { locked?: boolean; compact?: boolean }) {
  const actionClassName = [
    "inline-flex items-center font-semibold text-[var(--accent)] group-hover:text-[var(--accent-strong)]",
    compact ? "mt-auto w-full gap-1.5 border-t border-black/10 pt-3 text-xs" : "mt-auto gap-2 pt-5 text-sm",
  ].join(" ");

  if (!locked) {
    return (
      <span className={actionClassName}>
        {compact ? "View" : "View case study"}
        <ArrowUpRight className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </span>
    );
  }

  return (
    <span className={actionClassName}>
      {compact ? "Passcode" : "Passcode required"}
      <LockKeyhole className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
    </span>
  );
}

function CaseStudyGridCard({ study, light = false }: { study: CaseStudy; light?: boolean }) {
  const brief = caseStudyBriefs[study.id];
  const locked = !publicCaseStudyIds.has(study.id);

  return (
    <Link
      href={"/case-studies/" + study.id}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-black/15 bg-[#fffefb]/94 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_-58px_rgb(0_0_0/0.62)]"
    >
      <CaseStudyThumbnail study={study} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h4 className={light ? "text-xl font-semibold leading-tight text-balance" : "text-2xl font-semibold leading-tight text-balance"}>{study.product}</h4>

        {light ? (
          <p className="mt-3 text-sm leading-6 text-black/58">{study.cardSummary ?? study.summary}</p>
        ) : brief ? (
          <div className="mt-5 border-t border-black/12 pt-4">
            <p className="text-[0.68rem] font-semibold uppercase text-black/42">Product question</p>
            <p className="mt-1 text-sm font-medium leading-6 text-black/72">{brief.question}</p>
          </div>
        ) : (
          <p className="text-clamp-3 mt-3 text-sm leading-6 text-black/64">{study.summary}</p>
        )}

        {light ? null : (
          <>
            <CaseStudyPreviewImpactList study={study} compact />
            <CaseStudyPreviewMeta study={study} compact />
          </>
        )}

        <CaseStudyCardAction locked={locked} />
      </div>
    </Link>
  );
}

function FeaturedCaseStudyGrid({ studies }: { studies: CaseStudy[] }) {
  if (studies.length === 0) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
      {studies.map((study) => (
        <CaseStudyGridCard key={study.id} study={study} light={lightPreviewCaseStudyIds.has(study.id)} />
      ))}
    </div>
  );
}

function CompactCaseStudyThumbnail({ study }: { study: CaseStudy }) {
  const thumbnail = getCaseStudyThumbnail(study);

  return (
    <div className="grid h-32 place-items-center overflow-hidden bg-[var(--accent)]" style={getCaseStudyThumbnailFrameStyle(study)}>
      <img src={thumbnail.src} alt={thumbnail.alt} className={caseStudyThumbnailImageClass} style={caseStudyThumbnailImageStyle} loading="lazy" />
    </div>
  );
}

function CompactCaseStudyCard({ study }: { study: CaseStudy }) {
  const locked = !publicCaseStudyIds.has(study.id);

  return (
    <Link
      href={"/case-studies/" + study.id}
      className="group flex min-h-[24rem] flex-col overflow-hidden rounded-lg border border-black/15 bg-[#fffefb]/94 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_54px_-48px_rgb(0_0_0/0.58)]"
    >
      <CompactCaseStudyThumbnail study={study} />
      <div className="flex flex-1 flex-col p-4">
        <h4 className="text-lg font-semibold leading-tight text-black/88">{study.product}</h4>
        <CaseStudyCardAction locked={locked} />
      </div>
    </Link>
  );
}

function CompactCaseStudyRow() {
  const compactStudies = compactCaseStudyIds
    .map((id) => caseStudies.find((study) => study.id === id))
    .filter((study): study is CaseStudy => Boolean(study));

  if (compactStudies.length === 0) return null;

  return (
    <div className="mt-10 lg:mt-12">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between lg:mb-8">
        <h3 className="text-xl font-semibold leading-tight text-black/86">Notable projects</h3>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
        {compactStudies.map((study) => (
          <CompactCaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </div>
  );
}

function RelatedCaseStudyCard({ study }: { study: CaseStudy }) {
  const thumbnail = getCaseStudyThumbnail(study);
  const locked = !publicCaseStudyIds.has(study.id);
  const brief = caseStudyBriefs[study.id];

  return (
    <Link
      href={"/case-studies/" + study.id}
      className="group flex h-[16.25rem] min-w-0 flex-col overflow-hidden rounded-lg border border-black/12 bg-[#fffefb]/96 transition duration-300 hover:-translate-y-0.5 hover:border-black/18 hover:shadow-[0_20px_54px_-48px_rgb(0_0_0/0.58)]"
    >
      <div className="grid h-[7.25rem] shrink-0 place-items-center overflow-hidden bg-[var(--accent)]" style={getCaseStudyThumbnailFrameStyle(study)}>
        <img src={thumbnail.src} alt={thumbnail.alt} className={caseStudyThumbnailImageClass} style={caseStudyThumbnailImageStyle} loading="lazy" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col p-4">
        <p className="text-clamp-2 text-[0.64rem] font-semibold uppercase leading-[1.35] tracking-[0.08em] text-black/42">{brief?.family ?? study.platform}</p>
        <h3 className="text-clamp-2 mt-2 text-base font-semibold leading-5 text-black/88">{study.product}</h3>
        <CaseStudyCardAction locked={locked} compact />
      </div>
    </Link>
  );
}

function OtherCaseStudiesSection({ currentStudyId }: { currentStudyId: string }) {
  const otherStudies = routedCaseStudyIds
    .filter((id) => id !== currentStudyId)
    .map((id) => caseStudies.find((study) => study.id === id))
    .filter((study): study is CaseStudy => Boolean(study));

  if (otherStudies.length === 0) return null;

  return (
    <section aria-labelledby="more-case-studies-heading" className="border-t border-black/12 bg-[#fbfaf7] px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5">
          <h2 id="more-case-studies-heading" className="text-2xl font-semibold leading-tight text-black/88">More case studies</h2>
        </div>
        <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-visible lg:px-0">
          <div className="grid w-max grid-flow-col auto-cols-[13.25rem] gap-4 lg:w-full lg:grid-flow-row lg:grid-cols-5 lg:auto-cols-auto lg:gap-4 xl:gap-5">
            {otherStudies.map((study) => (
              <RelatedCaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProofPointRow() {
  return (
    <section className="bg-[#fbfaf7] px-5 pt-12 sm:px-8 lg:px-10" aria-labelledby="portfolio-focus-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="portfolio-focus-heading" className="mb-7 max-w-2xl text-2xl font-semibold leading-tight text-black/88 sm:text-3xl">
          What I bring to complex product work
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {featuredProofPoints.map((point) => (
            <div key={point.label} className="border-l border-black/15 pl-4">
              <p className="text-xs font-semibold text-black/38">{point.value}</p>
              <p className="mt-3 text-sm font-semibold text-black/82">{point.label}</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-black/62">{point.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCaseStudies() {
  const featuredStudies = featuredCaseStudyIds
    .map((id) => caseStudies.find((study) => study.id === id))
    .filter((study): study is CaseStudy => Boolean(study));

  if (featuredStudies.length === 0) {
    return null;
  }

  return (
    <>
      <FeaturedProofPointRow />
      <section id="case-studies" className="bg-[#fbfaf7] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="py-7">
            <h2 className="max-w-2xl text-2xl font-semibold leading-tight text-black/88 sm:text-3xl">Featured case studies</h2>
          </div>

          <div className="mt-8">
            <FeaturedCaseStudyGrid studies={featuredStudies} />
          </div>

          <CompactCaseStudyRow />
        </div>
      </section>
    </>
  );
}

function HomepageStoryHero() {
  return (
    <section id="top" className="portfolio-grid-pattern px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold leading-6 text-black/58">Juan Mondragon / Product Designer and Builder</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-[1.06] text-balance text-black/90 sm:text-5xl lg:text-[3.65rem]">
          Product systems that turn ambiguity into trusted workflows and working products.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-black/68">
          10+ years at LinkedIn shaped a practice around enterprise systems, GTM data workflows, AI-assisted selling, and founder-led native iOS product work.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="#case-studies" className="inline-flex items-center gap-2 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]">
            Read featured work
            <ArrowDown className="h-4 w-4" />
          </Link>
          <Link href="/resume" className="inline-flex items-center gap-2 rounded-md border border-black/15 bg-white/72 px-4 py-3 text-sm font-semibold text-black/68 hover:bg-white hover:text-[var(--accent-strong)]">
            Resume
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomepageStoryProofPoints() {
  return (
    <section className="px-5 pb-8 sm:px-8 lg:px-10" aria-label="Portfolio focus areas">
      <div className="mx-auto grid max-w-6xl gap-7 border-y border-black/12 py-7 sm:grid-cols-3">
        {featuredProofPoints.map((point) => (
          <div key={point.label} className="grid gap-3">
            <p className="text-xs font-semibold text-black/38">{point.value}</p>
            <h2 className="text-lg font-semibold leading-7 text-black/86">{point.label}</h2>
            <p className="max-w-sm text-sm leading-6 text-black/62">{point.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomepageStoryMedia({ study }: { study: CaseStudy }) {
  const thumbnail = getCaseStudyThumbnail(study);

  if (study.id === "campglint") {
    return (
      <div className="overflow-hidden rounded-lg bg-[#F0F4F7]" style={getCaseStudyThumbnailFrameStyle(study)}>
        <CampGlintDeviceScene variant="shelf" />
      </div>
    );
  }

  return (
    <div className="grid aspect-[16/9] place-items-center overflow-hidden rounded-lg bg-[var(--accent)]" style={getCaseStudyThumbnailFrameStyle(study)}>
      <img src={thumbnail.src} alt={thumbnail.alt} className={caseStudyThumbnailImageClass} style={caseStudyThumbnailImageStyle} loading="lazy" />
    </div>
  );
}

function HomepageStoryLeadStudy({ study }: { study: CaseStudy }) {
  const brief = caseStudyBriefs[study.id];

  return (
    <Link href={"/case-studies/" + study.id} className="group grid gap-7 border-b border-black/12 py-9 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,0.58fr)] lg:items-center">
      <div>
        <h3 className="max-w-3xl text-3xl font-semibold leading-tight text-balance text-black/88 sm:text-4xl">{study.headline}</h3>
        <p className="mt-4 max-w-2xl text-base leading-7 text-black/66">{study.summary}</p>
        {brief ? (
          <p className="mt-5 border-l border-black/22 pl-4 text-sm font-semibold leading-6 text-black/72">{brief.question}</p>
        ) : null}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {study.impact.slice(0, 2).map((item) => (
            <div key={item.title} className="border-l border-black/16 pl-4">
              <p className="text-sm font-semibold leading-6 text-black/82">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-black/62">{item.detail}</p>
            </div>
          ))}
        </div>
        <CaseStudyCardAction />
      </div>
      <HomepageStoryMedia study={study} />
    </Link>
  );
}

function HomepageStorySupportingStudy({ study }: { study: CaseStudy }) {
  const brief = caseStudyBriefs[study.id];

  return (
    <Link href={"/case-studies/" + study.id} className="group grid gap-6 border-b border-black/12 py-8 lg:grid-cols-[minmax(17rem,0.44fr)_minmax(0,1fr)] lg:items-center">
      <HomepageStoryMedia study={study} />
      <div>
        <h3 className="text-2xl font-semibold leading-tight text-balance text-black/88">{study.product}</h3>
        <p className="mt-3 max-w-3xl text-base leading-7 text-black/66">{study.headline}</p>
        {brief ? <p className="mt-4 text-sm font-medium leading-6 text-black/62">{brief.question}</p> : null}
        <div className="mt-5 flex flex-wrap gap-2">
          {[study.role, study.platform].map((item) => (
            <span key={item} className="border-l border-black/18 pl-3 text-xs font-semibold leading-5 text-black/52">
              {item}
            </span>
          ))}
        </div>
        <CaseStudyCardAction />
      </div>
    </Link>
  );
}

function HomepageStoryNotableWork() {
  const compactStudies = compactCaseStudyIds
    .map((id) => caseStudies.find((study) => study.id === id))
    .filter((study): study is CaseStudy => Boolean(study));

  if (compactStudies.length === 0) return null;

  return (
    <div className="mt-14">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] sm:items-end">
        <h3 className="text-2xl font-semibold leading-tight text-black/88">More product systems</h3>
        <p className="text-sm leading-6 text-black/62">Concise previews that show the same pattern across enterprise systems, talent products, and admin workflows.</p>
      </div>
      <div className="mt-6 border-t border-black/12">
        {compactStudies.map((study) => {
          const thumbnail = getCaseStudyThumbnail(study);

          return (
            <Link key={study.id} href={"/case-studies/" + study.id} className="group grid gap-4 border-b border-black/12 py-5 md:grid-cols-[14rem_minmax(0,1fr)_auto] md:items-center">
              <div className="grid aspect-[2.82/1] w-full place-items-center overflow-hidden rounded-md bg-[var(--accent)]" style={getCaseStudyThumbnailFrameStyle(study)}>
                <img src={thumbnail.src} alt={thumbnail.alt} className={caseStudyThumbnailImageClass} style={caseStudyThumbnailImageStyle} loading="lazy" />
              </div>
              <div>
                <h4 className="text-lg font-semibold leading-7 text-black/86">{study.product}</h4>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-black/62">{study.headline}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] group-hover:text-[var(--accent-strong)]">
                Passcode required
                <LockKeyhole className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function HomepageStoryFeaturedWork() {
  const featuredStudies = featuredCaseStudyIds
    .map((id) => caseStudies.find((study) => study.id === id))
    .filter((study): study is CaseStudy => Boolean(study));
  const [leadStudy, ...supportingStudies] = featuredStudies;

  if (!leadStudy) return null;

  return (
    <section id="case-studies" className="px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <StorySectionLabel
          eyebrow="Featured case studies"
          title="Three stories that show how the work moves from strategy into product reality."
        />
        <div className="mt-8 border-t border-black/12">
          <HomepageStoryLeadStudy study={leadStudy} />
          {supportingStudies.map((study) => (
            <HomepageStorySupportingStudy key={study.id} study={study} />
          ))}
        </div>
        <HomepageStoryNotableWork />
      </div>
    </section>
  );
}

function HomepageStoryExperience() {
  return (
    <section className="bg-[#f2efe7] px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <StorySectionLabel
          eyebrow="Experience"
          title="The portfolio is grounded in long-running product ownership, not isolated visual exercises."
          body="A condensed career spine gives context before asking a reviewer to open deeper case studies or the resume page."
        />
        <div className="mt-8 border-t border-black/12">
          {experienceHighlights.slice(0, 4).map((item) => (
            <article key={item.title} className="grid gap-4 border-b border-black/12 py-5 sm:grid-cols-[8rem_minmax(0,1fr)]">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/42">{item.period}</p>
              <div>
                <h3 className="text-base font-semibold leading-6 text-black/84">{item.title}</h3>
                <p className="mt-2 max-w-4xl text-sm leading-6 text-black/64">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/resume" className="inline-flex items-center gap-2 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]">
            View resume
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a href="mailto:juansjsu@gmail.com" className="inline-flex items-center gap-2 rounded-md border border-black/15 bg-white/70 px-4 py-3 text-sm font-semibold text-black/68 hover:bg-white hover:text-[var(--accent-strong)]">
            Contact me
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ResumeDocumentHeader() {
  return (
    <section className="overflow-hidden rounded-lg border border-black/12 bg-[#fffefb]/86" aria-label="Resume contact summary">
      <div className="grid sm:min-h-[18rem] sm:grid-cols-[14rem_minmax(0,1fr)]">
        <div className="hidden bg-[#e9e4d8] sm:block sm:border-r sm:border-black/12">
          <img
            src="/avatars/juan.png"
            alt="Juan Mondragon"
            className="h-full w-full object-cover object-[50%_42%]"
          />
        </div>
        <div className="p-4 sm:p-5">
          <div className="border-b border-black/12 pb-4">
            <div className="flex items-start gap-3 sm:block">
              <img
                src="/avatars/juan.png"
                alt="Juan Mondragon"
                className="h-24 w-24 shrink-0 rounded-md bg-[#e9e4d8] object-cover object-[50%_36%] sm:hidden"
              />
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold leading-7 text-black/88 sm:text-4xl sm:leading-tight">
                  Juan Mondragon
                </h2>
                <p className="mt-1 text-sm font-semibold leading-5 text-black/70">Product Designer & Builder</p>
                <p className="mt-0.5 text-sm leading-5 text-black/66">San Francisco Bay Area</p>
              </div>
            </div>
          </div>
          <p className="pt-4 text-sm leading-6 text-black/66">
            Product Designer with 11+ years at LinkedIn, leading design across sales, talent, and content platforms. I've shaped
            systems that empower teams to publish faster, plan smarter, and connect through AI-driven tools like Seller Agent. I bring a
            user-centered, data-informed mindset to solving complex product challenges at scale.
          </p>
        </div>
      </div>
    </section>
  );
}

function LinkedInTimelineLogo() {
  return (
    <img
      src="/brand/LinkedIn_logo.png"
      alt="LinkedIn"
      className="h-9 w-9 rounded-[0.38rem] object-cover shadow-[0_12px_30px_-18px_rgb(var(--accent-rgb)/0.85)]"
      loading="lazy"
    />
  );
}

function BuilderExperienceLogo() {
  return (
    <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[0.38rem] shadow-[0_12px_30px_-18px_rgb(var(--accent-rgb)/0.85)]">
      <img
        src="/brand/JM_logo_icon_transparent.png"
        alt="Juan Mondragon"
        className="h-full w-full translate-y-[1px] scale-[1.16] object-contain"
        loading="lazy"
      />
    </span>
  );
}

function ResumeCurrentBuilderExperience() {
  return (
    <article className="grid grid-cols-[6.75rem_minmax(0,1fr)] rounded-lg border border-black/12 bg-[#fffefb]/86 sm:grid-cols-[14rem_minmax(0,1fr)]">
      <div className="flex justify-center px-3 py-5 sm:px-5">
        <BuilderExperienceLogo />
      </div>
      <div className="px-3 py-5 sm:px-5">
        <div className="mb-2">
          <p className="text-xs font-semibold uppercase leading-5 text-black/48">{currentBuilderExperience.period}</p>
          <p className="mt-0.5 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{currentBuilderExperience.company}</p>
        </div>
        <h3 className="text-sm font-semibold leading-6">{currentBuilderExperience.title}</h3>
        <p className="mt-1 text-sm leading-6 text-black/66">{currentBuilderExperience.body}</p>
      </div>
    </article>
  );
}

function ResumeExperienceList() {
  return (
    <div className="overflow-hidden rounded-lg border border-black/12 bg-[#fffefb]/86" aria-label="LinkedIn experience timeline">
      {experienceHighlights.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === experienceHighlights.length - 1;

        return (
          <article key={item.title} className="grid grid-cols-[6.75rem_minmax(0,1fr)] sm:grid-cols-[14rem_minmax(0,1fr)]">
            <div className="relative flex justify-center px-3 py-5 sm:px-5">
              <span
                aria-hidden="true"
                className={[
                  "absolute left-1/2 w-px -translate-x-1/2 bg-[#182070]/35",
                  isFirst ? "top-16" : "top-0",
                  isLast ? "h-[2.375rem]" : "bottom-0",
                ].join(" ")}
              />
              <span className="relative z-10 flex h-9 w-9 items-center justify-center">
                {isFirst ? (
                  <LinkedInTimelineLogo />
                ) : (
                  <span className="h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_0_5px_#fffefb]" />
                )}
              </span>
            </div>
            <div className="px-3 pt-5 sm:px-5">
              <div className={["pb-5", isLast ? "" : "border-b border-black/12"].join(" ")}>
                <div className="mb-2">
                  <p className="text-xs font-semibold uppercase leading-5 text-black/48">{item.period}</p>
                  {isFirst ? (
                    <p className="mt-0.5 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">LinkedIn</p>
                  ) : null}
                </div>
                <h3 className="text-sm font-semibold leading-6">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-black/66">{item.body}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ResumeSnapshot({ standalone = false }: { standalone?: boolean }) {
  if (standalone) {
    return (
      <section id="resume" className="portfolio-grid-pattern resume-grid-pattern px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-5">
          <ResumeDocumentHeader />
          <ResumeCurrentBuilderExperience />
          <ResumeExperienceList />
        </div>
      </section>
    );
  }

  return (
    <section id="resume" className="border-t border-black/15 bg-[#f2efe7] px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
        <div>
          <Eyebrow>Resume</Eyebrow>
          <p className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-balance text-black/88 sm:text-4xl">
            Across LinkedIn and CampGlint, I turn complex problems into clear strategy, interaction systems, and working products.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/resume"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]"
            >
              View resume
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:juansjsu@gmail.com"
              className="inline-flex items-center gap-2 rounded-md border border-black/15 bg-white/70 px-4 py-3 text-sm font-semibold text-black/68 hover:bg-white hover:text-[var(--accent-strong)]"
            >
              juansjsu@gmail.com
            </a>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="grid gap-3 md:grid-cols-3">
            {resumeSignals.map((signal) => (
              <article key={signal} className="rounded-lg border border-black/12 bg-[#fffefb]/78 p-4">
                <p className="text-sm leading-6 text-black/68">{signal}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function HomeClosingSection() {
  return (
    <section className="bg-[#fbfaf7] px-5 pb-12 pt-2 sm:px-8 lg:px-10" aria-labelledby="work-with-me-heading">
      <div className="mx-auto max-w-6xl py-9 sm:py-11">
        <div className="grid gap-7 xl:grid-cols-[minmax(0,0.82fr)_auto] xl:items-end">
          <div>
            <h2 id="work-with-me-heading" className="max-w-3xl text-2xl font-medium leading-snug text-balance text-black/82 sm:text-3xl lg:text-[2rem]">
              Open to startup and AI product design roles with teams that value close collaboration and practical customer outcomes.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 xl:justify-end">
            <a
              href="https://www.linkedin.com/in/juanmondragon"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]"
            >
              LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:juansjsu@gmail.com"
              className="inline-flex items-center gap-2 rounded-md border border-black/15 bg-white/72 px-4 py-3 text-sm font-semibold text-black/68 hover:bg-white hover:text-[var(--accent-strong)]"
            >
              Contact me
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudyUnlockedPage({ study }: { study: CaseStudy }) {
  return (
    <main id="top" className="min-h-screen text-[#1f2220]">
      <PortfolioHeader caseStudy />
      <div className="mx-auto max-w-6xl px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/#case-studies" className="inline-flex items-center gap-2 rounded-md border border-black/15 bg-white/70 px-3 py-2 text-sm font-semibold text-black/68 hover:bg-white hover:text-[var(--accent-strong)]">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to featured work
        </Link>
      </div>
      <CaseStudyStoryView study={study} />
      <OtherCaseStudiesSection currentStudyId={study.id} />
      <PortfolioFooter />
    </main>
  );
}

function LockedCaseStudyPreview({ study }: { study: CaseStudy }) {
  const thumbnail = getCaseStudyThumbnail(study);
  const brief = caseStudyBriefs[study.id];
  const previewImpact = study.impact.slice(0, 2);

  return (
    <div className="min-w-0">
      <div>
        <p className="text-lg font-semibold leading-7 text-[var(--accent)]">{study.product}</p>
        <h1 id="case-study-lock-title" className="mt-3 max-w-4xl text-4xl font-semibold leading-[1.05] text-balance text-black/90 sm:text-5xl lg:text-[3.25rem]">
          {study.headline}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-black/66 sm:text-lg sm:leading-8">{study.summary}</p>
      </div>

      <div className="mt-5 border-y border-black/12">
        <StoryMetaList items={study.snapshot} />
      </div>

      <div className="mt-7 grid aspect-[16/9] place-items-center overflow-hidden rounded-lg border border-black/10 bg-[var(--accent)] md:aspect-[2.1/1] lg:aspect-[16/9]" style={getCaseStudyThumbnailFrameStyle(study)}>
        <img src={thumbnail.src} alt={thumbnail.alt} className={caseStudyThumbnailImageClass} style={caseStudyThumbnailImageStyle} loading="eager" />
      </div>

      {brief ? (
        <div className="mt-7 border-l-2 border-[rgb(var(--accent-rgb)/0.42)] pl-5">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-black/40">The opportunity</p>
          <p className="mt-2 max-w-3xl text-lg font-medium leading-8 text-black/76">{brief.question}</p>
        </div>
      ) : null}

      <div className="mt-7 grid gap-5 border-t border-black/12 pt-6 sm:grid-cols-2">
        {previewImpact.map((item) => (
          <div key={item.title} className="border-l border-black/18 pl-4">
            <p className="text-sm font-semibold leading-6 text-black/82">{item.title}</p>
            <p className="mt-1.5 text-sm leading-6 text-black/60">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getFullCaseSignals(study: CaseStudy) {
  return study.contribution?.proof.slice(0, 3) ?? study.surfaces.slice(0, 3).map((item) => item.title);
}

function FullCaseStudyCovers({ study }: { study: CaseStudy }) {
  const fullCaseSignals = getFullCaseSignals(study);

  if (fullCaseSignals.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-black/12 pt-5">
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-black/40">Inside the case study</p>
      <div className="mt-4 grid gap-3">
        {fullCaseSignals.map((item) => (
          <div key={item} className="border-l border-black/18 pl-3 text-sm leading-6 text-black/64">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function LockedCaseStudyPage({ study }: { study: CaseStudy }) {
  const isCampGlint = study.id === "campglint";
  const caseStudyPasscode = isCampGlint ? campGlintPasscode : protectedCaseStudyPasscode;
  const caseStudyPasscodeLength = caseStudyPasscode.length;
  const caseStudyUnlockStorageKey = `jm-case-studies-unlocked:${isCampGlint ? "campglint" : "protected"}:${caseStudyPasscode}`;
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const normalizedPasscode = passcode.trim();
  const canSubmit = normalizedPasscode.length === caseStudyPasscodeLength;
  const requestAccessHref =
    "mailto:juansjsu@gmail.com?subject=" +
    encodeURIComponent(`Request access to ${study.product} case study`) +
    "&body=" +
    encodeURIComponent(`Hi Juan,\n\nI'd like to request access to the ${study.product} case study.\n\nThanks.`);

  useEffect(() => {
    try {
      window.sessionStorage.removeItem(legacyCaseStudyUnlockStorageKey);
      setUnlocked(window.sessionStorage.getItem(caseStudyUnlockStorageKey) === "true");
    } catch {
      setUnlocked(false);
    }
  }, [caseStudyUnlockStorageKey]);

  if (unlocked) {
    return <CaseStudyUnlockedPage study={study} />;
  }

  return (
    <main id="top" className="min-h-screen bg-[#fbfaf7] text-[#1f2220]">
      <PortfolioHeader caseStudy sticky />
      <section className="px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-10 lg:pb-24 lg:pt-12">
        <div aria-labelledby="case-study-lock-title" className="mx-auto w-full max-w-6xl">
          <Link href="/#case-studies" className="inline-flex items-center gap-2 rounded-md border border-black/15 bg-white/70 px-3 py-2 text-sm font-semibold text-black/68 hover:bg-white hover:text-[var(--accent-strong)]">
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back to featured work
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.42fr)] lg:items-start">
            <LockedCaseStudyPreview study={study} />

            <div className="lg:sticky lg:top-[calc(var(--portfolio-header-height)+1rem)]">
              <div className="overflow-hidden rounded-lg border border-black/12 bg-[#fffefb] shadow-[0_24px_60px_-54px_rgb(0_0_0/0.62)]">
                <div className="border-b border-black/10 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[rgb(var(--accent-rgb)/0.09)] text-[var(--accent)]">
                      <LockKeyhole className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold leading-7 text-black/86">
                        Read the full case study
                      </h2>
                    </div>
                  </div>
                </div>

                <form
                  className="p-5"
                  onSubmit={(event) => {
                    event.preventDefault();

                    if (normalizedPasscode === caseStudyPasscode) {
                      try {
                        window.sessionStorage.setItem(caseStudyUnlockStorageKey, "true");
                      } catch {}

                      setUnlocked(true);
                      return;
                    }

                    setPasscodeError("That passcode does not match. Try again or request access.");
                  }}
                >
                  <div>
                    <input
                      id="case-study-passcode"
                      type="password"
                      aria-label="Case study passcode"
                      value={passcode}
                      onChange={(event) => {
                        setPasscode(event.target.value.slice(0, caseStudyPasscodeLength));
                        setPasscodeError("");
                      }}
                      maxLength={caseStudyPasscodeLength}
                      autoComplete="one-time-code"
                      autoCapitalize="characters"
                      placeholder="Enter passcode"
                      aria-invalid={Boolean(passcodeError)}
                      aria-describedby={passcodeError ? "case-study-passcode-error" : undefined}
                      className="h-12 w-full rounded-md border border-black/15 bg-[#fbfaf7] px-3 text-base font-semibold tracking-[0.08em] text-black/82 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[rgb(var(--accent-rgb)/0.12)] aria-invalid:border-red-700 aria-invalid:ring-4 aria-invalid:ring-red-700/10"
                    />
                  </div>
                  {passcodeError ? (
                    <p id="case-study-passcode-error" className="mt-2 text-sm font-semibold leading-6 text-red-800">
                      {passcodeError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:border-black/12 disabled:bg-black/10 disabled:text-black/38"
                  >
                    Unlock case study
                  </button>

                  <p className="mt-4 text-center text-sm leading-6 text-black/48">
                    Need access?{" "}
                    <a href={requestAccessHref} className="font-semibold text-black/62 hover:text-[var(--accent)]">
                      Request the passcode
                    </a>
                  </p>
                </form>
              </div>

              <div className="mt-4">
                <FullCaseStudyCovers study={study} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <PortfolioFooter />
    </main>
  );
}

export function FullCaseStudyPage({ studyId }: { studyId: string }) {
  const study = caseStudies.find((item) => item.id === studyId);

  if (!study) {
    return (
      <main id="top" className="min-h-screen text-[#1f2220]">
        <PortfolioHeader caseStudy />
        <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
          <h1 className="text-4xl font-semibold">Case study not found</h1>
          <p className="mt-4 text-base leading-7 text-black/68">The requested case study does not exist.</p>
          <Link href="/#case-studies" className="mt-8 inline-flex items-center gap-2 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]">
            Back to case studies
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    );
  }

  if (publicCaseStudyIds.has(study.id)) {
    return <CaseStudyUnlockedPage study={study} />;
  }

  return <LockedCaseStudyPage study={study} />;
}

export function ResumePage() {
  return (
    <main id="top" className="min-h-screen bg-[#fbfaf7] text-[#1f2220]">
      <PortfolioHeader />
      <ResumeSnapshot standalone />
      <HomeClosingSection />
      <PortfolioFooter />
    </main>
  );
}

function HomeHeroGraphic() {
  return (
    <figure
      aria-hidden="true"
      className="portfolio-hero-graphic relative isolate h-[18rem] overflow-hidden border border-black/12 bg-[var(--accent)] shadow-[0_30px_86px_-66px_rgb(0_0_0/0.74)] [clip-path:polygon(8%_0,100%_0,94%_82%,68%_100%,0_92%,0_16%)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out sm:h-[22rem] lg:h-[26rem]"
      style={{ transform: "translate3d(var(--hero-plate-x, 0px), var(--hero-plate-y, 0px), 0)" }}
    >
      <img
        src="/brand/background.JPG"
        alt=""
        loading="eager"
        decoding="async"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[54%_9%] opacity-92 saturate-[0.82] contrast-110 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out"
        style={{ transform: "translate3d(var(--hero-bg-x, 0px), calc(var(--hero-bg-y, 0px) - 18px), 0) scale(1.14)" }}
      />
      <div className="portfolio-hero-overlay absolute inset-0 -z-20 bg-[linear-gradient(118deg,rgb(24_32_112/0.90)_0%,rgb(24_32_112/0.58)_44%,rgb(4_116_179/0.16)_100%)]" />
      <div
        className="portfolio-hero-grid absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:56px_56px] opacity-45 [mask-image:linear-gradient(to_right,rgb(24_32_112),transparent_78%)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out"
        style={{ transform: "translate3d(var(--hero-grid-x, 0px), var(--hero-grid-y, 0px), 0)" }}
      />

      <div className="portfolio-hero-decoration absolute -left-12 bottom-10 h-32 w-56 rotate-[-11deg] border border-white/24 sm:h-40 sm:w-72" />
      <div className="portfolio-hero-decoration absolute right-14 top-7 h-36 w-px bg-white/28" />
      <div className="portfolio-hero-decoration absolute left-8 top-14 h-px w-[82%] rotate-[20deg] bg-white/26" />
      <div className="portfolio-hero-decoration absolute bottom-0 left-0 right-0 h-28 bg-[linear-gradient(to_top,rgb(24_32_112/0.74),transparent)]" />
      <div className="portfolio-hero-decoration absolute bottom-9 right-9 grid w-44 grid-cols-6 gap-2">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <span key={item} className="h-1 bg-white/34" />
        ))}
      </div>
      <img
        src="/brand/JM_logo_mark_white.png"
        alt=""
        className="absolute bottom-8 left-8 h-10 w-10 object-contain opacity-90 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out sm:h-12 sm:w-12"
        style={{ transform: "translate3d(var(--hero-logo-x, 0px), var(--hero-logo-y, 0px), 0)" }}
      />
    </figure>
  );
}

function HomeHeroVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function resetParallax() {
      setParallaxVars(0);
    }

    function syncMotionPreference() {
      reduceMotionRef.current = mediaQuery.matches;

      if (mediaQuery.matches) {
        resetParallax();
        return;
      }

      updateScrollParallax();
    }

    function updateScrollParallax() {
      if (reduceMotionRef.current) return;

      const visual = visualRef.current;

      if (!visual) return;

      const rect = visual.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const visualCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const progress = Math.max(-1, Math.min(1, (viewportCenter - visualCenter) / viewportHeight));

      setParallaxVars(progress);
    }

    function handleScroll() {
      updateScrollParallax();
    }

    syncMotionPreference();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    mediaQuery.addEventListener("change", syncMotionPreference);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      mediaQuery.removeEventListener("change", syncMotionPreference);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  function setParallaxVars(progress: number) {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      const visual = visualRef.current;

      if (!visual) return;

      visual.style.setProperty("--hero-plate-x", `${progress * -5}px`);
      visual.style.setProperty("--hero-plate-y", `${progress * -16}px`);
      visual.style.setProperty("--hero-bg-x", `${progress * 8}px`);
      visual.style.setProperty("--hero-bg-y", `${progress * 54}px`);
      visual.style.setProperty("--hero-grid-x", `${progress * -12}px`);
      visual.style.setProperty("--hero-grid-y", `${progress * -30}px`);
      visual.style.setProperty("--hero-photo-x", `${progress * 16}px`);
      visual.style.setProperty("--hero-photo-y", `${progress * -44}px`);
      visual.style.setProperty("--hero-logo-x", `${progress * -9}px`);
      visual.style.setProperty("--hero-logo-y", `${progress * -24}px`);
      visual.style.setProperty("--hero-line-x", `${progress * -16}px`);
      visual.style.setProperty("--hero-line-y", `${progress * -34}px`);
    });
  }

  return (
    <div
      ref={visualRef}
      aria-hidden="true"
      className="relative isolate mx-auto w-full max-w-[34rem] pb-10 pr-6 pt-5 sm:pb-12 sm:pr-8 lg:mx-0 lg:max-w-none lg:pb-8 lg:pr-9"
    >
      <HomeHeroGraphic />
      <div
        className="portfolio-hero-photo pointer-events-none absolute right-0 top-0 z-20 h-44 w-32 bg-[#fbfaf7]/92 p-1.5 drop-shadow-[0_24px_44px_rgb(0_0_0/0.26)] [clip-path:polygon(16%_0,100%_8%,90%_92%,28%_100%,0_76%,0_12%)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out sm:h-56 sm:w-40 lg:-right-2 lg:h-60 lg:w-44"
        style={{ transform: "translate3d(var(--hero-photo-x, 0px), var(--hero-photo-y, 0px), 0) rotate(4deg)" }}
      >
        <img
          src="/avatars/juan.png"
          alt=""
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-[center_24%] [clip-path:inherit]"
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-16 left-16 z-10 h-px w-56 bg-[rgb(var(--accent-rgb)/0.38)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out sm:left-24 sm:w-72 lg:left-20"
        style={{ transform: "translate3d(var(--hero-line-x, 0px), var(--hero-line-y, 0px), 0) rotate(-17deg)" }}
      />
    </div>
  );
}

function getFeaturedPortfolioStudies() {
  return featuredCaseStudyIds
    .map((id) => caseStudies.find((study) => study.id === id))
    .filter((study): study is CaseStudy => Boolean(study));
}


export function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#1f2220]">
      <PortfolioHeader />
      <section id="top" className="portfolio-grid-pattern px-5 py-9 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.72fr)] lg:items-center">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.06] text-balance sm:text-5xl lg:text-[3.35rem]">
              I design complex products that help people understand what matters, take the next step, and build confidence.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-black/70">
              Senior product designer with 10+ years at LinkedIn, focused on enterprise systems, AI-assisted selling, GTM workflows, and founder-led product building.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#case-studies" className="inline-flex items-center gap-2 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]">
                Read featured work
                <ArrowDown className="h-4 w-4" />
              </Link>
              <a href="mailto:juansjsu@gmail.com" className="inline-flex items-center gap-2 rounded-md border border-black/15 bg-white/72 px-4 py-3 text-sm font-semibold text-black/68 hover:bg-white hover:text-[var(--accent-strong)]">
                Contact me
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <HomeHeroVisual />
        </div>
      </section>

      <FeaturedCaseStudies />
      <HomeClosingSection />

      <PortfolioFooter />
    </main>
  );
}
