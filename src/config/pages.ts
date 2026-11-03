import { BYTE_BRAND, BYTE_OFFICIAL_SERVICES } from '../styles/tokens';
import type { DetailedServiceItem } from './homepage';

/**
 * BYTE TECHNOLOGY — STRUCTURED PAGE SPECIFICATIONS & CONSULTATION INTAKE LOGIC
 * Strictly aligned with docs/WEBSITE_STRUCTURE.md and docs/WEBSITE_CONTENT.md.
 * Uses only verified company facts and explicit [CONTENT PLACEHOLDER: ...] markers.
 */

export interface FullServiceSpecification {
  index: string;
  id: string;
  name: string;
  pillarId: 'digital-products' | 'enterprise-systems' | 'intelligence' | 'strategy-cloud';
  pillarTitle: string;
  heading: string;
  overview: string;
  deliverables: readonly string[];
  businessImpact: string;
  schematicType: DetailedServiceItem['schematicType'];
  placeholderNote?: string;
}

export const FULL_SERVICES_SPECIFICATIONS: readonly FullServiceSpecification[] = [
  {
    index: '01',
    id: 'web-development',
    name: 'Web development',
    pillarId: 'digital-products',
    pillarTitle: 'Pillar I · Digital Products & User Experiences',
    heading: 'Web Development for High-Performance Organizations',
    overview:
      'Your web presence is often the primary operational and commercial gateway to your organization. Byte Technology engineers fast, secure, and scalable web applications, enterprise portals, and digital platforms designed to perform reliably under real-world conditions. We move beyond static templates to build custom web systems that integrate directly with your business operations.',
    deliverables: [
      'Custom web applications and internal operational portals',
      'Modern, high-conversion corporate and institutional websites',
      'Customer self-service dashboards and booking/service platforms',
      'API development and third-party system integrations',
      'Performance optimization, accessibility compliance, and responsive engineering',
    ],
    businessImpact:
      'Faster load times, stronger institutional credibility, and seamless digital self-service for your customers and staff.',
    schematicType: 'web',
  },
  {
    index: '02',
    id: 'mobile-application-development',
    name: 'Mobile application development',
    pillarId: 'digital-products',
    pillarTitle: 'Pillar I · Digital Products & User Experiences',
    heading: 'Mobile Application Development for Connected Customers and Field Teams',
    overview:
      'In a mobile-first market, organizations need applications that are intuitive, responsive, and dependable across devices. Byte Technology designs and builds native and cross-platform mobile applications that extend your services to customers everywhere and empower on-the-ground teams with real-time operational tools.',
    deliverables: [
      'iOS and Android cross-platform and native mobile applications',
      'Customer-facing service, commerce, and engagement apps',
      'Enterprise field-operations, logistics, and workforce mobile tools',
      'Secure API synchronization with core ERP and cloud backends',
      'App lifecycle maintenance, performance tuning, and usability updates',
    ],
    businessImpact:
      'Direct mobile reach to your users and real-time data capture from the field to headquarters.',
    schematicType: 'mobile',
  },
  {
    index: '06',
    id: 'ui-ux-design',
    name: 'UI/UX design',
    pillarId: 'digital-products',
    pillarTitle: 'Pillar I · Digital Products & User Experiences',
    heading: 'UI/UX Design Grounded in Operational Clarity',
    overview:
      'Even the most powerful software fails if employees find it confusing or customers abandon it mid-task. Byte Technology treats UI/UX design as an essential engineering discipline—combining user research, information architecture, interactive prototyping, and clean visual design systems to make complex digital products effortless to use.',
    deliverables: [
      'User workflow research, information architecture, and user journey mapping',
      'High-craft wireframes and interactive, clickable prototypes for validation',
      'Enterprise dashboard and ERP interface design focused on clarity and speed',
      'Customer-facing web and mobile interface design',
      'Scalable component libraries and unified brand design systems',
    ],
    businessImpact:
      'Higher user adoption, reduced employee training time, and digital interfaces that reflect a modern, trustworthy brand.',
    schematicType: 'uiux',
  },
  {
    index: '03',
    id: 'custom-software-and-erp-systems',
    name: 'Custom software and ERP systems',
    pillarId: 'enterprise-systems',
    pillarTitle: 'Pillar II · Enterprise Systems & Core Operations',
    heading: 'Custom Software and ERP Systems Tailored to Your Workflows',
    overview:
      'Off-the-shelf software often forces Ethiopian businesses to bend their operations around rigid, foreign assumptions—or leaves departments trapped in disconnected spreadsheets. Byte Technology architects custom software and Enterprise Resource Planning (ERP) systems built specifically around your organizational structure, approval chains, and reporting requirements.',
    deliverables: [
      'Tailored ERP platforms unifying core operational departments',
      'Inventory, procurement, supply chain, and asset management modules',
      'Finance, billing, operational reporting, and executive analytics dashboards',
      'Human resource, team workflow, and internal administration systems',
      'Legacy software modernization and data migration into unified platforms',
    ],
    businessImpact:
      'Single-source-of-truth visibility across your entire organization, reduced manual reconciliation errors, and faster executive decision-making.',
    schematicType: 'erp',
    placeholderNote:
      '[CONTENT PLACEHOLDER: Specific ERP Modules or Industry Specializations if designated by leadership]',
  },
  {
    index: '07',
    id: 'ai-and-business-automation',
    name: 'AI and business automation',
    pillarId: 'intelligence',
    pillarTitle: 'Pillar III · Intelligence & Operational Speed',
    heading: 'AI and Business Automation for Practical Efficiency',
    overview:
      'Artificial intelligence and automation deliver the greatest value when applied to concrete operational bottlenecks. Byte Technology helps organizations move beyond AI hype by designing practical, secure AI integrations and automated business workflows that reduce repetitive manual work, accelerate document and data processing, and surface actionable insights.',
    deliverables: [
      'End-to-end business process and cross-system workflow automation',
      'Intelligent document processing, data extraction, and classification pipelines',
      'Custom AI assistants and knowledge retrieval tools grounded in internal company data',
      'Automated reporting, anomaly alerts, and operational decision support',
      'Seamless integration of AI capabilities into existing ERP, web, and mobile systems',
    ],
    businessImpact:
      'Dramatic reduction in manual administrative overhead, faster turnaround times, and teams freed to focus on high-value strategic work.',
    schematicType: 'ai',
  },
  {
    index: '04',
    id: 'it-consulting',
    name: 'IT consulting',
    pillarId: 'strategy-cloud',
    pillarTitle: 'Pillar IV · Technical Strategy & Cloud Infrastructure',
    heading: 'IT Consulting and Digital Architecture Advisory',
    overview:
      'Choosing the right technology investments can determine how smoothly an organization scales over the next decade. Byte Technology provides objective, senior-level IT consulting to help businesses and institutions evaluate their current systems, eliminate technical debt, plan digital transformation roadmaps, and architect secure, maintainable solutions.',
    deliverables: [
      'Digital transformation strategy and phased modernization roadmaps',
      'Existing system audits, architecture reviews, and bottleneck diagnostics',
      'Build-vs.-buy evaluations and enterprise technology selection',
      'Security, data governance, and operational resilience planning',
      'Technical specification and project scoping for complex initiatives',
    ],
    businessImpact:
      'Clear technology investment decisions, lower implementation risk, and an architecture aligned with measurable business outcomes.',
    schematicType: 'consulting',
  },
  {
    index: '05',
    id: 'cloud-solutions',
    name: 'Cloud solutions',
    pillarId: 'strategy-cloud',
    pillarTitle: 'Pillar IV · Technical Strategy & Cloud Infrastructure',
    heading: 'Cloud Solutions for Resilient, Scalable Operations',
    overview:
      'Modern software requires an infrastructure foundation that is secure, available, and ready to scale on demand. Byte Technology designs, migrates, and manages cloud environments that protect your organizational data, improve system reliability, and eliminate the fragility of unmanaged local servers.',
    deliverables: [
      'Cloud architecture design and infrastructure provisioning',
      'Application and database migration from legacy or on-premise environments',
      'Automated deployment pipelines (CI/CD) and environment standardization',
      'Cloud security hardening, backup recovery strategies, and uptime monitoring',
      'Cost and performance optimization for growing cloud workloads',
    ],
    businessImpact:
      'High availability for critical business systems, stronger data protection, and infrastructure that scales effortlessly alongside your growth.',
    schematicType: 'cloud',
    placeholderNote:
      '[CONTENT PLACEHOLDER: Preferred Cloud Provider Partnerships / Environments if designated]',
  },
] as const;

export interface EngineeringStandard {
  index: string;
  title: string;
  focus: string;
  description: string;
  practices: readonly string[];
}

export const ENGINEERING_STANDARDS: readonly EngineeringStandard[] = [
  {
    index: '01',
    title: 'Security-First Architecture',
    focus: 'Access Control & Data Protection',
    description:
      'We treat security as a foundational architectural requirement—never an afterthought. Every system enforces strict server-side input validation, least-privilege role authorization, and protected credentials.',
    practices: [
      'Role-based access control (RBAC) for enterprise & ERP modules',
      'Strict server-side validation & sanitized API boundaries',
      'Encrypted data in transit and secure cloud secret management',
    ],
  },
  {
    index: '02',
    title: 'Modular & Maintainable Codebases',
    focus: 'Long-Term Engineering Health',
    description:
      'Organizational software must evolve alongside your business. We architect clean, strongly typed, well-documented modules that prevent technical debt and vendor lock-in.',
    practices: [
      'Decoupled domain logic and clean API contracts',
      'Consistent TypeScript type safety and automated testing',
      'Clear architectural documentation for internal IT teams',
    ],
  },
  {
    index: '03',
    title: 'Human-Centered Operational Clarity',
    focus: 'Adoption & Accessibility',
    description:
      'We design interfaces for the real conditions in which your staff and customers work—prioritizing high-contrast legibility, responsive mobile readiness, and intuitive workflows.',
    practices: [
      'WCAG AA/AAA contrast compliance across light and dark surfaces',
      'Responsive layouts from mobile field devices to widescreen monitors',
      'Zero-clutter dashboards focused on actionable operational tasks',
    ],
  },
  {
    index: '04',
    title: 'Resilient Cloud & Performance Engineering',
    focus: 'Uptime & Scalability',
    description:
      'Critical organizational platforms must stay responsive under load. We design cloud topologies and database schemas optimized for speed, reliability, and recoverability.',
    practices: [
      'Automated backup, recovery, and environment standardization',
      'Optimized database queries and low-latency asset delivery',
      'Phased rollout governance to prevent operational disruption',
    ],
  },
] as const;

export interface BrandPrincipleItem {
  index: string;
  principle: string;
  tagline: string;
  description: string;
}

export const ABOUT_BRAND_PRINCIPLES: readonly BrandPrincipleItem[] = [
  {
    index: '01',
    principle: 'Modern',
    tagline: 'Contemporary Architecture & Design',
    description:
      'We build with contemporary architectures, clean design systems, and forward-looking capabilities so your technology investment stays relevant.',
  },
  {
    index: '02',
    principle: 'Professional',
    tagline: 'Structured Governance & Reliability',
    description:
      'We operate with structured communication, disciplined delivery governance, and deep respect for your organizational timelines and operational realities.',
  },
  {
    index: '03',
    principle: 'Innovative',
    tagline: 'Pragmatic Problem-Solving',
    description:
      'We apply cloud computing, custom software engineering, and AI automation pragmatically—solving real business bottlenecks with measurable efficiency.',
  },
  {
    index: '04',
    principle: 'Trustworthy',
    tagline: 'Transparency & Security',
    description:
      'We believe trust is earned through transparency, security-conscious engineering, honest technical advice, and delivering on our commitments.',
  },
  {
    index: '05',
    principle: 'Ambitious',
    tagline: 'Driven to Digitalize Ethiopia',
    description:
      'Guided by our mission to digitalize Ethiopia, we hold ourselves to global engineering and design standards in every project we undertake.',
  },
] as const;

export interface ConsultationResponseStep {
  step: string;
  title: string;
  description: string;
}

export const CONSULTATION_RESPONSE_STEPS: readonly ConsultationResponseStep[] = [
  {
    step: '01',
    title: 'Initial Review',
    description:
      'We review your inquiry, selected capabilities, and organizational context carefully.',
  },
  {
    step: '02',
    title: 'Discovery Conversation',
    description:
      'We schedule a focused consultation to understand your workflows, technical requirements, and priorities.',
  },
  {
    step: '03',
    title: 'Architectural Proposal',
    description:
      'We outline a clear, structured recommendation covering scope, capability pairing, and delivery phases.',
  },
] as const;

/**
 * Resolves a query parameter (by service ID or service name) to the canonical service ID.
 */
export function resolveServiceIdFromParam(param: string | null): string | null {
  if (!param) return null;
  const trimmed = param.trim().toLowerCase();
  if (!trimmed) return null;

  const matched = BYTE_OFFICIAL_SERVICES.find(
    (svc) =>
      svc.id.toLowerCase() === trimmed || svc.name.toLowerCase() === trimmed
  );
  return matched ? matched.id : null;
}

export interface ConsultationFormInput {
  selectedServiceIds: readonly string[];
  senderName: string;
  senderRole: string;
  organizationName: string;
  workEmail: string;
  projectContext: string;
}

export interface ConsultationValidationResult {
  valid: boolean;
  errors: {
    selectedServiceIds?: string;
    senderName?: string;
    organizationName?: string;
    workEmail?: string;
    projectContext?: string;
  };
}

/**
 * Pure validation function for the Contact & Consultation Brief Builder.
 * Never silently substitutes fallback values when required inputs are empty or invalid.
 */
export function validateConsultationForm(
  input: ConsultationFormInput
): ConsultationValidationResult {
  const errors: ConsultationValidationResult['errors'] = {};

  if (!input.selectedServiceIds || input.selectedServiceIds.length === 0) {
    errors.selectedServiceIds =
      'Please select at least one capability relevant to your project.';
  }

  if (!input.senderName || input.senderName.trim().length < 2) {
    errors.senderName = 'Please enter your full name.';
  }

  if (!input.organizationName || input.organizationName.trim().length < 2) {
    errors.organizationName = 'Please enter your company or organization name.';
  }

  const emailTrimmed = (input.workEmail || '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
    errors.workEmail = 'Please enter a valid work email address.';
  }

  if (!input.projectContext || input.projectContext.trim().length < 15) {
    errors.projectContext =
      'Please provide a brief overview of your project objectives (at least 15 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats a structured, human-readable project consultation brief and mailto URI
 * addressed to ayanadamtew@gmail.com.
 */
export function formatConsultationBrief(input: ConsultationFormInput): {
  subject: string;
  body: string;
  mailtoHref: string;
  selectedServiceNames: string[];
} {
  const selectedServiceNames = BYTE_OFFICIAL_SERVICES.filter((svc) =>
    input.selectedServiceIds.includes(svc.id)
  ).map((svc) => `${svc.index}. ${svc.name}`);

  const orgClean = input.organizationName.trim();
  const nameClean = input.senderName.trim();
  const roleClean = input.senderRole.trim();
  const emailClean = input.workEmail.trim();
  const contextClean = input.projectContext.trim();

  const subject = `Project Consultation Brief — ${orgClean} (${selectedServiceNames.length} ${
    selectedServiceNames.length === 1 ? 'Capability' : 'Capabilities'
  })`;

  const bodyLines = [
    'BYTE TECHNOLOGY — PROJECT CONSULTATION BRIEF',
    '==================================================',
    `Organization: ${orgClean}`,
    `Contact Name: ${nameClean}${roleClean ? ` (${roleClean})` : ''}`,
    `Work Email: ${emailClean}`,
    '',
    'Selected Capabilities:',
    ...selectedServiceNames.map((name) => `  - ${name}`),
    '',
    'Project Context & Objectives:',
    contextClean,
    '==================================================',
    `Submitted via ${BYTE_BRAND.name} Digital Platform (${BYTE_BRAND.location})`,
  ];

  const body = bodyLines.join('\n');
  const mailtoHref = `mailto:${BYTE_BRAND.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return {
    subject,
    body,
    mailtoHref,
    selectedServiceNames,
  };
}
