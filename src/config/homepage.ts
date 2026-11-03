import { BYTE_BRAND } from '../styles/tokens';

/**
 * BYTE TECHNOLOGY — HOMEPAGE STRUCTURED CONTENT & ARCHITECTURAL DATA
 * Strictly aligned with approved documentation (BRAND_BRIEF.md, WEBSITE_CONTENT.md,
 * DESIGN_SYSTEM.md) and zero-fabrication rules.
 */

export const HOMEPAGE_HERO = {
  kicker: 'Byte Technology · Ethiopia',
  headline: 'Software that replaces your manual workflows.',
  mission: BYTE_BRAND.mission,
  lead: 'We build web platforms, mobile apps, ERP systems and cloud infrastructure for Ethiopian businesses, so your team stops chasing paper and spreadsheets.',
  primaryCta: {
    label: 'Book a free consultation',
    path: '/contact',
  },
  secondaryCta: {
    label: 'See what we build',
    href: '#capabilities-overview',
  },
} as const;

export interface HeroValueProposition {
  id: string;
  text: string;
  verified: boolean;
  reviewFlag?: string;
}

/**
 * Compact two-column value propositions below the hero CTA buttons.
 * Per project truthfulness rules, only confirmed Byte Technology capabilities
 * are presented as verified facts; unverified claims from the brief are
 * explicitly flagged for review rather than published as facts.
 */
export const HERO_VALUE_PROPOSITIONS: readonly HeroValueProposition[] = [
  {
    id: 'built-in-ethiopia',
    text: 'Built and supported in Ethiopia.',
    verified: true,
  },
  {
    id: 'seven-services',
    text: '7 technology services, one team.',
    verified: true,
  },
  {
    id: 'end-to-end-delivery',
    text: 'Custom software tailored to your operations.',
    verified: true,
  },
  {
    id: 'language-localization',
    text: 'Interfaces in Amharic, Afan Oromo and English.',
    verified: false,
    reviewFlag: 'Flagged for review — unverified capability pending confirmation',
  },
] as const;

export type WorkflowComparisonTabId = 'today' | 'with-byte';

export interface WorkflowComparisonRow {
  area: string;
  value: string;
  isMonospace?: boolean;
}

export interface WorkflowComparisonState {
  id: WorkflowComparisonTabId;
  tabLabel: string;
  columnLeftHeader: string;
  columnRightHeader: string;
  rows: readonly WorkflowComparisonRow[];
  summaryMessage: string;
}

export const HERO_WORKFLOW_COMPARISON: {
  readonly disclaimer: string;
  readonly states: Record<WorkflowComparisonTabId, WorkflowComparisonState>;
} = {
  disclaimer: 'Illustrative workflow comparison — not a verified client result.',
  states: {
    today: {
      id: 'today',
      tabLabel: 'Today',
      columnLeftHeader: 'Business area',
      columnRightHeader: 'Current problem',
      rows: [
        { area: 'Orders', value: 'Written in a notebook' },
        { area: 'Stock', value: 'stock_final_v3.xlsx', isMonospace: true },
        { area: 'Customers', value: 'Lost in WhatsApp chats' },
        { area: 'Invoices', value: 'Paper, filed by hand' },
      ],
      summaryMessage: 'Month-end report: 3 days of manual work.',
    },
    'with-byte': {
      id: 'with-byte',
      tabLabel: 'With Byte',
      columnLeftHeader: 'Business area',
      columnRightHeader: 'Digital workflow',
      rows: [
        { area: 'Orders', value: 'Organized digital workflow.' },
        { area: 'Stock', value: 'Centralized inventory management.' },
        { area: 'Customers', value: 'Structured customer records.' },
        { area: 'Invoices', value: 'Digital document management.' },
      ],
      summaryMessage: 'Less manual work. More control. Better business decisions.',
    },
  },
} as const;

export interface SystemLayerNode {
  id: 'experience' | 'core' | 'foundation';
  index: string;
  layerName: string;
  subtitle: string;
  description: string;
  services: readonly {
    index: string;
    name: string;
    role: string;
  }[];
}

export const HERO_SYSTEM_LAYERS: readonly SystemLayerNode[] = [
  {
    id: 'experience',
    index: '01',
    layerName: 'Experience & Interface Layer',
    subtitle: 'Customer & Workforce Touchpoints',
    description:
      'Intuitive, high-performance interfaces designed for rapid user adoption across desktop and mobile channels.',
    services: [
      { index: '06', name: 'UI/UX design', role: 'Design systems & user workflows' },
      { index: '01', name: 'Web development', role: 'Portals & web applications' },
      { index: '02', name: 'Mobile application development', role: 'iOS & Android field/customer apps' },
    ],
  },
  {
    id: 'core',
    index: '02',
    layerName: 'Operational & Intelligence Core',
    subtitle: 'Enterprise Workflows & Automation',
    description:
      'Centralized business logic, resource planning, and automated processing built around how your organization operates.',
    services: [
      { index: '03', name: 'Custom software and ERP systems', role: 'Unified finance, inventory & operations' },
      { index: '07', name: 'AI and business automation', role: 'Intelligent process & document pipelines' },
    ],
  },
  {
    id: 'foundation',
    index: '03',
    layerName: 'Strategy & Cloud Foundation',
    subtitle: 'Resilient Infrastructure & Advisory',
    description:
      'Secure cloud architecture and senior technical governance that keep critical organizational systems scalable and reliable.',
    services: [
      { index: '05', name: 'Cloud solutions', role: 'Scalable deployment & data security' },
      { index: '04', name: 'IT consulting', role: 'Architecture audits & digital roadmaps' },
    ],
  },
] as const;

export interface TargetAudienceSegment {
  index: string;
  title: string;
  who: string;
  challengeSolved: string;
  primaryCapabilities: readonly string[];
}

export const TARGET_AUDIENCE_SEGMENTS: readonly TargetAudienceSegment[] = [
  {
    index: '01',
    title: 'Growing & Mid-Market Enterprises',
    who: 'Managing Directors, Operations Heads & Finance Leaders',
    challengeSolved:
      'Transitioning from disconnected spreadsheets and manual branch reporting to unified ERP visibility and automated workflows.',
    primaryCapabilities: ['Custom software and ERP systems', 'Cloud solutions', 'AI and business automation'],
  },
  {
    index: '02',
    title: 'Established Corporations & Institutions',
    who: 'CIOs, CTOs, IT Directors & Transformation Committees',
    challengeSolved:
      'Modernizing legacy systems, hardening cloud infrastructure, and executing structured digital transformation roadmaps.',
    primaryCapabilities: ['IT consulting', 'Custom software and ERP systems', 'Cloud solutions'],
  },
  {
    index: '03',
    title: 'Customer-Facing Businesses & Service Providers',
    who: 'CEOs, Commercial Directors & Product Teams',
    challengeSolved:
      'Launching modern web portals and mobile applications that remove customer friction and expand service accessibility.',
    primaryCapabilities: ['UI/UX design', 'Web development', 'Mobile application development'],
  },
  {
    index: '04',
    title: 'Digital-First Ventures & Innovation Teams',
    who: 'Founders, Product Managers & Technical Leads',
    challengeSolved:
      'Bringing new digital products to market with cohesive design systems, scalable cloud foundations, and practical AI integration.',
    primaryCapabilities: ['UI/UX design', 'Web development', 'AI and business automation'],
  },
] as const;

export interface DetailedServiceItem {
  index: string;
  id: string;
  name: string;
  pillar: string;
  headline: string;
  summary: string;
  deliverables: readonly string[];
  gridSpan: 'wide' | 'half' | 'standard';
  schematicType: 'web' | 'mobile' | 'erp' | 'consulting' | 'cloud' | 'uiux' | 'ai';
}

export const HOMEPAGE_SERVICES_BENTO: readonly DetailedServiceItem[] = [
  {
    index: '01',
    id: 'web-development',
    name: 'Web development',
    pillar: 'Digital Products & Experiences',
    headline: 'High-performance web applications, portals, and corporate platforms.',
    summary:
      'We engineer fast, secure, and responsive web systems that serve as both your institutional digital flagship and an operational gateway for customers and staff.',
    deliverables: [
      'Custom web applications & portals',
      'Modern corporate & institutional platforms',
      'API & third-party system integrations',
    ],
    gridSpan: 'standard',
    schematicType: 'web',
  },
  {
    index: '02',
    id: 'mobile-application-development',
    name: 'Mobile application development',
    pillar: 'Digital Products & Experiences',
    headline: 'Connected mobile experiences for customers and on-the-ground teams.',
    summary:
      'Native and cross-platform iOS and Android applications built for reliability, intuitive touch workflows, and real-time synchronization with your core systems.',
    deliverables: [
      'iOS & Android mobile applications',
      'Customer self-service & commerce apps',
      'Field-operations & workforce tools',
    ],
    gridSpan: 'standard',
    schematicType: 'mobile',
  },
  {
    index: '06',
    id: 'ui-ux-design',
    name: 'UI/UX design',
    pillar: 'Digital Products & Experiences',
    headline: 'Human-centered interface architecture and scalable design systems.',
    summary:
      'Complex software succeeds only when people can use it effortlessly. We combine workflow research, interactive prototyping, and cohesive design systems.',
    deliverables: [
      'User workflow research & wireframing',
      'Interactive clickable prototypes',
      'Enterprise dashboard & component systems',
    ],
    gridSpan: 'standard',
    schematicType: 'uiux',
  },
  {
    index: '03',
    id: 'custom-software-and-erp-systems',
    name: 'Custom software and ERP systems',
    pillar: 'Enterprise Systems & Operations',
    headline: 'Tailored ERP platforms and bespoke software engineered around your operations.',
    summary:
      'Off-the-shelf software often forces organizations into rigid compromises. We architect unified custom software and Enterprise Resource Planning (ERP) systems that connect finance, inventory, procurement, HR, and executive reporting in one source of truth.',
    deliverables: [
      'Unified multi-department ERP modules',
      'Inventory, procurement & financial workflows',
      'Real-time executive reporting dashboards',
      'Legacy system data migration & integration',
    ],
    gridSpan: 'wide',
    schematicType: 'erp',
  },
  {
    index: '04',
    id: 'it-consulting',
    name: 'IT consulting',
    pillar: 'Strategy & Cloud Infrastructure',
    headline: 'Senior technology advisory and structured transformation roadmaps.',
    summary:
      'We help leadership evaluate technical architecture, resolve operational bottlenecks, and make confident software and infrastructure investment decisions.',
    deliverables: [
      'Digital transformation roadmaps',
      'System architecture & security audits',
      'Technical scoping & build-vs-buy advisory',
    ],
    gridSpan: 'standard',
    schematicType: 'consulting',
  },
  {
    index: '05',
    id: 'cloud-solutions',
    name: 'Cloud solutions',
    pillar: 'Strategy & Cloud Infrastructure',
    headline: 'Resilient cloud infrastructure built for security, uptime, and scale.',
    summary:
      'Modernize away from fragile local servers with well-architected cloud environments, automated deployment pipelines, and disciplined backup and security governance.',
    deliverables: [
      'Cloud architecture & workload migration',
      'Automated CI/CD deployment pipelines',
      'Uptime monitoring & backup resilience',
    ],
    gridSpan: 'half',
    schematicType: 'cloud',
  },
  {
    index: '07',
    id: 'ai-and-business-automation',
    name: 'AI and business automation',
    pillar: 'Intelligence & Automation',
    headline: 'Practical AI integrations and automated pipelines that eliminate manual friction.',
    summary:
      'We turn repetitive data entry, document routing, and routine operational checks into intelligent, auditable automated workflows integrated directly with your business software.',
    deliverables: [
      'Cross-system workflow automation',
      'Intelligent document & data processing',
      'Custom internal AI assistants & search',
      'Automated operational reporting triggers',
    ],
    gridSpan: 'half',
    schematicType: 'ai',
  },
] as const;

export interface FeaturedSolutionBlueprint {
  id: 'erp-blueprint' | 'digital-portal-blueprint' | 'ai-automation-blueprint' | 'cloud-modernization-blueprint';
  index: string;
  tabLabel: string;
  title: string;
  targetOrganization: string;
  legacyBottleneck: string;
  byteArchitecture: string;
  servicesCombined: readonly {
    index: string;
    id: string;
    name: string;
  }[];
  systemNodes: readonly {
    step: string;
    label: string;
    detail: string;
  }[];
  operationalOutcome: string;
}

/**
 * Featured Work / Reference Solution Blueprints.
 * Demonstrates concrete architectural problem-solving across Byte Technology's 7 services
 * without inventing fabricated client names, fake logos, or unverified project history.
 */
export const FEATURED_SOLUTION_BLUEPRINTS: readonly FeaturedSolutionBlueprint[] = [
  {
    id: 'erp-blueprint',
    index: '01',
    tabLabel: 'Enterprise ERP Core',
    title: 'Unified Multi-Department ERP & Resource Architecture',
    targetOrganization: 'Multi-branch enterprises, distributors, and operational organizations',
    legacyBottleneck:
      'Departments rely on isolated spreadsheets and paper approvals, creating delays between procurement, warehouse inventory, finance, and executive reporting.',
    byteArchitecture:
      'A centralized custom ERP platform with role-based access, real-time inventory and financial ledgers, and cloud-hosted branch synchronization.',
    servicesCombined: [
      { index: '03', id: 'custom-software-and-erp-systems', name: 'Custom software and ERP systems' },
      { index: '05', id: 'cloud-solutions', name: 'Cloud solutions' },
      { index: '04', id: 'it-consulting', name: 'IT consulting' },
    ],
    systemNodes: [
      { step: 'Input Layer', label: 'Branch & Department Operations', detail: 'Procurement, sales, warehouse, and HR data entry via role-based interfaces.' },
      { step: 'Core Engine', label: 'Centralized Byte ERP Kernel', detail: 'Unified relational database with automated approval rules and audit logs.' },
      { step: 'Output Layer', label: 'Live Executive Intelligence', detail: 'Real-time financial reconciliation, stock visibility, and operational reporting.' },
    ],
    operationalOutcome:
      'Replaces fragmented manual reconciliation with a single source of truth across every department and branch.',
  },
  {
    id: 'digital-portal-blueprint',
    index: '02',
    tabLabel: 'Web & Mobile Platform',
    title: 'Omnichannel Customer Portal & Mobile Service Ecosystem',
    targetOrganization: 'Service providers, commercial institutions, and customer-centric businesses',
    legacyBottleneck:
      'Customers must visit physical offices or navigate outdated, non-responsive websites to request services, track status, or interact with the organization.',
    byteArchitecture:
      'A cohesive UI/UX design system powering both a high-speed web portal and a companion iOS/Android mobile application synchronized via secure cloud APIs.',
    servicesCombined: [
      { index: '06', id: 'ui-ux-design', name: 'UI/UX design' },
      { index: '01', id: 'web-development', name: 'Web development' },
      { index: '02', id: 'mobile-application-development', name: 'Mobile application development' },
    ],
    systemNodes: [
      { step: 'Design System', label: 'Unified UI/UX Component Architecture', detail: 'Accessible user flows prototyped and validated for desktop and mobile.' },
      { step: 'Channel Layer', label: 'Web Portal + Native/Cross-Platform Mobile App', detail: 'Responsive self-service onboarding, account management, and notifications.' },
      { step: 'Integration', label: 'Secure API Gateway & Backend Sync', detail: 'Real-time synchronization between customer actions and internal staff dashboards.' },
    ],
    operationalOutcome:
      'Delivers a frictionless 24/7 digital channel for customers while reducing manual front-desk processing load.',
  },
  {
    id: 'ai-automation-blueprint',
    index: '03',
    tabLabel: 'AI & Workflow Automation',
    title: 'Intelligent Document Processing & Operational Automation Pipeline',
    targetOrganization: 'Organizations handling high-volume documents, requests, and repetitive approvals',
    legacyBottleneck:
      'Skilled staff spend hours manually reading forms, copying data between systems, routing approvals, and compiling routine status summaries.',
    byteArchitecture:
      'An AI-assisted automation pipeline that ingests structured and unstructured inputs, validates business rules, updates internal software automatically, and flags exceptions for human review.',
    servicesCombined: [
      { index: '07', id: 'ai-and-business-automation', name: 'AI and business automation' },
      { index: '03', id: 'custom-software-and-erp-systems', name: 'Custom software and ERP systems' },
      { index: '01', id: 'web-development', name: 'Web development' },
    ],
    systemNodes: [
      { step: 'Ingestion', label: 'Incoming Forms, Documents & Requests', detail: 'Digital intake from web portals, emails, and internal operational records.' },
      { step: 'AI & Rules', label: 'Automated Extraction & Workflow Routing', detail: 'Intelligent classification, validation checks, and conditional routing.' },
      { step: 'Execution', label: 'System Sync & Exception Alerts', detail: 'Automatic ERP/database updates with human-in-the-loop review for edge cases.' },
    ],
    operationalOutcome:
      'Eliminates repetitive administrative bottlenecks and accelerates operational turnaround times.',
  },
  {
    id: 'cloud-modernization-blueprint',
    index: '04',
    tabLabel: 'Cloud & IT Modernization',
    title: 'Resilient Cloud Infrastructure & Legacy Modernization Architecture',
    targetOrganization: 'Growing enterprises and institutions upgrading from fragile on-premise setups',
    legacyBottleneck:
      'Critical business applications run on vulnerable local servers with manual deployments, downtime risks, and inconsistent data backups.',
    byteArchitecture:
      'A structured IT consulting audit followed by phased migration to a hardened cloud environment with automated CI/CD deployment, encrypted backups, and availability monitoring.',
    servicesCombined: [
      { index: '04', id: 'it-consulting', name: 'IT consulting' },
      { index: '05', id: 'cloud-solutions', name: 'Cloud solutions' },
      { index: '03', id: 'custom-software-and-erp-systems', name: 'Custom software and ERP systems' },
    ],
    systemNodes: [
      { step: 'Advisory', label: 'Architecture Audit & Risk Assessment', detail: 'Mapping dependencies, security gaps, and phased migration milestones.' },
      { step: 'Cloud Core', label: 'Hardened Cloud Environment & CI/CD', detail: 'Containerized or managed cloud infrastructure with automated deployment.' },
      { step: 'Governance', label: 'Automated Backups & Uptime Telemetry', detail: 'Continuous health checks, access control, and disaster recovery readiness.' },
    ],
    operationalOutcome:
      'Establishes a secure, scalable technical foundation ready to support long-term organizational growth.',
  },
] as const;

export interface WhyBytePillar {
  index: string;
  title: string;
  attribute: string;
  description: string;
}

export const WHY_BYTE_PILLARS: readonly WhyBytePillar[] = [
  {
    index: '01',
    title: 'Full-Spectrum Execution Under One Roof',
    attribute: 'Integrated',
    description:
      'Digital initiatives stall when strategy, UI/UX design, software engineering, cloud, and automation are split across disconnected vendors. We unify all seven disciplines into one accountable engineering partner.',
  },
  {
    index: '02',
    title: 'Engineered Around Real Organizational Workflows',
    attribute: 'Pragmatic',
    description:
      'We never force Ethiopian businesses into rigid, ill-fitting templates. Whether building a custom ERP or a customer mobile app, we architect systems around how your teams and customers actually work.',
  },
  {
    index: '03',
    title: 'Design Clarity That Drives Adoption',
    attribute: 'Human-Centered',
    description:
      'Enterprise software is only as effective as its usability. We pair backend architectural rigor with clean, intuitive UI/UX design so employees and customers adopt new systems with confidence.',
  },
  {
    index: '04',
    title: 'Built for Long-Term Security & Scale',
    attribute: 'Trustworthy',
    description:
      'From clean, modular codebases and server-side validation to resilient cloud infrastructure, we build maintainable systems your organization can depend on for years.',
  },
] as const;

export interface ProcessPhase {
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  keyOutputs: readonly string[];
}

export const DEVELOPMENT_PROCESS_PHASES: readonly ProcessPhase[] = [
  {
    phase: '01',
    title: 'Discovery & Operational Alignment',
    subtitle: 'Understanding Your Business First',
    description:
      'We begin by mapping your organizational objectives, department workflows, existing technical bottlenecks, and user requirements before writing code.',
    keyOutputs: [
      'Operational workflow & bottleneck audit',
      'Technical requirements specification',
      'Phased delivery roadmap & scope alignment',
    ],
  },
  {
    phase: '02',
    title: 'UI/UX & System Architecture',
    subtitle: 'Blueprinting Interface & Infrastructure',
    description:
      'We design interactive UI/UX wireframes and prototypes alongside database schemas, ERP module boundaries, API contracts, and cloud architecture.',
    keyOutputs: [
      'Interactive UI/UX prototypes & design system',
      'Data model, ERP & API architecture blueprint',
      'Security & cloud infrastructure plan',
    ],
  },
  {
    phase: '03',
    title: 'Modular Engineering & Quality Assurance',
    subtitle: 'Disciplined Iterative Build',
    description:
      'Our engineers build clean, modular increments across web, mobile, custom software, and AI automation pipelines—validating security, performance, and edge cases at every milestone.',
    keyOutputs: [
      'Production-grade frontend & backend code',
      'Automated workflow & system integrations',
      'End-to-end functional & security testing',
    ],
  },
  {
    phase: '04',
    title: 'Cloud Deployment, Onboarding & Scale',
    subtitle: 'Smooth Launch & Continuous Evolution',
    description:
      'We orchestrate production cloud deployment, guide your staff through system onboarding, and provide ongoing architectural support as your organization expands.',
    keyOutputs: [
      'Zero-friction production cloud release',
      'Team training & operational documentation',
      'Long-term scalability & enhancement support',
    ],
  },
] as const;

export function getBlueprintById(id: string): FeaturedSolutionBlueprint {
  return (
    FEATURED_SOLUTION_BLUEPRINTS.find((bp) => bp.id === id) ??
    FEATURED_SOLUTION_BLUEPRINTS[0]
  );
}
