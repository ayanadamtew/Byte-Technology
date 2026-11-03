import { motion, useReducedMotion } from 'motion/react';
import type { DetailedServiceItem } from '../../config/homepage';
import { BYTE_EASE } from '../../lib/motion';

/**
 * Custom Architectural SVG Micro-Schematics for each of the 7 Byte Technology services.
 * Includes purposeful Motion for React path-draw and node-highlight transitions
 * on viewport entry and card hover, while respecting prefers-reduced-motion.
 */
export function ServiceSchematic({
  type,
}: {
  type: DetailedServiceItem['schematicType'];
}) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  const frameClass =
    'w-full rounded-md border border-[#DFDFD9] bg-[#F2F2EE]/75 p-2 transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:border-[#FA8112]/45 group-hover/card:bg-[#FFFFFF] group-hover/card:scale-[1.01]';

  switch (type) {
    case 'web':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 280 96"
          className={`h-24 ${frameClass}`}
          fill="none"
        >
          {/* Browser Frame Header */}
          <rect x="8" y="8" width="264" height="80" rx="4" stroke="#1A2130" strokeOpacity="0.2" />
          <line x1="8" y1="22" x2="272" y2="22" stroke="#1A2130" strokeOpacity="0.15" />
          <rect x="14" y="13" width="4" height="4" fill="#1A2130" fillOpacity="0.4" />
          <rect x="21" y="13" width="4" height="4" fill="#FA8112" />
          <rect x="28" y="13" width="4" height="4" fill="#FDA63A" />
          <rect x="44" y="12" width="96" height="6" rx="1" fill="#1A2130" fillOpacity="0.08" />
          {/* Modular Grid Columns */}
          <rect x="16" y="30" width="145" height="50" rx="2" fill="#FFFFFF" stroke="#DFDFD9" />
          <rect x="24" y="38" width="42" height="5" fill="#FA8112" />
          <rect x="24" y="48" width="110" height="7" fill="#1A2130" />
          <rect x="24" y="60" width="84" height="5" fill="#1A2130" fillOpacity="0.35" />
          <rect x="24" y="70" width="36" height="5" rx="1" fill="#FA8112" />
          {/* Right Bento Module */}
          <rect x="169" y="30" width="95" height="23" rx="2" fill="#1A2130" />
          <rect x="177" y="37" width="48" height="4" fill="#F2F2EE" />
          <rect x="177" y="44" width="30" height="4" fill="#FDA63A" />
          <rect x="169" y="57" width="95" height="23" rx="2" fill="#FFFFFF" stroke="#FA8112" strokeOpacity="0.5" />
          <motion.path
            d="M177 73L195 65L215 69L238 61L254 63"
            stroke="#FA8112"
            strokeWidth="1.5"
            initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0.4 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: BYTE_EASE }}
          />
        </svg>
      );

    case 'mobile':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 280 96"
          className={`h-24 ${frameClass}`}
          fill="none"
        >
          {/* Left Mobile Device Frame */}
          <rect x="28" y="8" width="86" height="80" rx="6" fill="#FFFFFF" stroke="#1A2130" strokeOpacity="0.25" />
          <rect x="58" y="13" width="26" height="3" rx="1.5" fill="#1A2130" fillOpacity="0.2" />
          <rect x="36" y="22" width="70" height="22" rx="2" fill="#1A2130" />
          <rect x="42" y="27" width="34" height="4" fill="#FDA63A" />
          <rect x="42" y="34" width="48" height="4" fill="#F2F2EE" fillOpacity="0.8" />
          <rect x="36" y="49" width="33" height="20" rx="2" fill="#FAF9F6" stroke="#DFDFD9" />
          <rect x="73" y="49" width="33" height="20" rx="2" fill="#FA8112" fillOpacity="0.15" stroke="#FA8112" />
          <rect x="36" y="74" width="70" height="8" rx="2" fill="#FA8112" />
          {/* Sync Connection Bridge */}
          <motion.line
            x1="114"
            y1="48"
            x2="166"
            y2="48"
            stroke="#FA8112"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: BYTE_EASE }}
          />
          <rect x="132" y="40" width="16" height="16" rx="3" fill="#1A2130" />
          <path d="M137 48H143M140 45V51" stroke="#FDA63A" strokeWidth="1.5" />
          {/* Right Field/Sync State Module */}
          <rect x="166" y="16" width="86" height="64" rx="4" fill="#FFFFFF" stroke="#DFDFD9" />
          <rect x="176" y="26" width="42" height="5" fill="#1A2130" />
          <rect x="176" y="36" width="66" height="4" fill="#1A2130" fillOpacity="0.3" />
          <rect x="176" y="46" width="52" height="4" fill="#FA8112" />
          <rect x="176" y="58" width="66" height="12" rx="2" fill="#F2F2EE" />
          <rect x="182" y="62" width="28" height="4" fill="#1A2130" fillOpacity="0.6" />
        </svg>
      );

    case 'erp':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 560 110"
          className={`h-28 ${frameClass}`}
          fill="none"
        >
          {/* Department Nodes (Left) */}
          <rect x="16" y="12" width="124" height="24" rx="3" fill="#FFFFFF" stroke="#DFDFD9" />
          <rect x="24" y="21" width="6" height="6" fill="#FA8112" />
          <text x="36" y="27" fill="#1A2130" fontSize="10" fontFamily="monospace" fontWeight="600">FINANCE &amp; LEDGER</text>

          <rect x="16" y="43" width="124" height="24" rx="3" fill="#FFFFFF" stroke="#DFDFD9" />
          <rect x="24" y="52" width="6" height="6" fill="#FDA63A" />
          <text x="36" y="58" fill="#1A2130" fontSize="10" fontFamily="monospace" fontWeight="600">INVENTORY &amp; OPS</text>

          <rect x="16" y="74" width="124" height="24" rx="3" fill="#FFFFFF" stroke="#DFDFD9" />
          <rect x="24" y="83" width="6" height="6" fill="#1A2130" />
          <text x="36" y="89" fill="#1A2130" fontSize="10" fontFamily="monospace" fontWeight="600">HR &amp; PROCUREMENT</text>

          {/* Connector Lines to Central ERP Core */}
          <motion.path
            d="M140 24H180L200 55"
            stroke="#1A2130"
            strokeOpacity="0.3"
            strokeWidth="1.2"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: BYTE_EASE }}
          />
          <motion.path
            d="M140 55H200"
            stroke="#FA8112"
            strokeWidth="1.5"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08, ease: BYTE_EASE }}
          />
          <motion.path
            d="M140 86H180L200 55"
            stroke="#1A2130"
            strokeOpacity="0.3"
            strokeWidth="1.2"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14, ease: BYTE_EASE }}
          />

          {/* Central Byte ERP Core Kernel */}
          <rect x="200" y="18" width="160" height="74" rx="5" fill="#1A2130" />
          <rect x="212" y="28" width="6" height="54" fill="#FA8112" />
          <rect x="222" y="28" width="10" height="14" fill="#FDA63A" />
          <rect x="222" y="48" width="10" height="14" fill="#FA8112" />
          <rect x="222" y="68" width="10" height="14" fill="#FDA63A" />
          <text x="242" y="45" fill="#F2F2EE" fontSize="11" fontFamily="sans-serif" fontWeight="700">UNIFIED ERP CORE</text>
          <text x="242" y="60" fill="#B0B8C8" fontSize="9.5" fontFamily="monospace">Single Source of Truth</text>
          <text x="242" y="75" fill="#FDA63A" fontSize="9" fontFamily="monospace">Role-Based Governance</text>

          {/* Connector Lines to Executive Output */}
          <motion.path
            d="M360 55H410"
            stroke="#FA8112"
            strokeWidth="1.5"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.22, ease: BYTE_EASE }}
          />

          {/* Right Executive Analytics & Control Module */}
          <rect x="410" y="16" width="134" height="78" rx="4" fill="#FFFFFF" stroke="#FA8112" strokeOpacity="0.6" />
          <text x="422" y="33" fill="#1A2130" fontSize="9.5" fontFamily="monospace" fontWeight="600">REAL-TIME VISIBILITY</text>
          <rect x="422" y="42" width="22" height="36" rx="1" fill="#E7E6E0" />
          <rect x="422" y="56" width="22" height="22" rx="1" fill="#1A2130" />
          <rect x="452" y="42" width="22" height="36" rx="1" fill="#E7E6E0" />
          <rect x="452" y="48" width="22" height="30" rx="1" fill="#FA8112" />
          <rect x="482" y="42" width="22" height="36" rx="1" fill="#E7E6E0" />
          <rect x="482" y="42" width="22" height="36" rx="1" fill="#FDA63A" />
          <rect x="512" y="42" width="20" height="36" rx="1" fill="#1A2130" />
        </svg>
      );

    case 'consulting':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 280 96"
          className={`h-24 ${frameClass}`}
          fill="none"
        >
          {/* Architectural Roadmap Steps */}
          <motion.line
            x1="24"
            y1="48"
            x2="256"
            y2="48"
            stroke="#1A2130"
            strokeOpacity="0.2"
            strokeWidth="1.5"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: BYTE_EASE }}
          />
          <rect x="20" y="24" width="68" height="48" rx="3" fill="#FFFFFF" stroke="#DFDFD9" />
          <text x="28" y="41" fill="#FA8112" fontSize="9" fontFamily="monospace" fontWeight="600">01. AUDIT</text>
          <rect x="28" y="49" width="48" height="4" fill="#1A2130" fillOpacity="0.7" />
          <rect x="28" y="57" width="36" height="4" fill="#1A2130" fillOpacity="0.3" />

          <rect x="106" y="24" width="68" height="48" rx="3" fill="#FFFFFF" stroke="#FA8112" />
          <text x="114" y="41" fill="#1A2130" fontSize="9" fontFamily="monospace" fontWeight="600">02. DESIGN</text>
          <rect x="114" y="49" width="48" height="4" fill="#FA8112" />
          <rect x="114" y="57" width="40" height="4" fill="#1A2130" fillOpacity="0.3" />

          <rect x="192" y="24" width="68" height="48" rx="3" fill="#1A2130" />
          <text x="200" y="41" fill="#FDA63A" fontSize="9" fontFamily="monospace" fontWeight="600">03. SCALE</text>
          <rect x="200" y="49" width="48" height="4" fill="#F2F2EE" />
          <rect x="200" y="57" width="38" height="4" fill="#B0B8C8" />
        </svg>
      );

    case 'cloud':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 280 96"
          className={`h-24 ${frameClass}`}
          fill="none"
        >
          {/* Multi-Node Cloud Topology */}
          <rect x="16" y="16" width="248" height="64" rx="4" fill="#FFFFFF" stroke="#DFDFD9" />
          <rect x="28" y="28" width="64" height="40" rx="3" fill="#1A2130" />
          <text x="36" y="45" fill="#F2F2EE" fontSize="9" fontFamily="monospace" fontWeight="600">CLOUD VPC</text>
          <rect x="36" y="52" width="44" height="5" rx="1" fill="#FA8112" />

          <motion.line
            x1="92"
            y1="38"
            x2="124"
            y2="38"
            stroke="#FA8112"
            strokeWidth="1.5"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: BYTE_EASE }}
          />
          <motion.line
            x1="92"
            y1="58"
            x2="124"
            y2="58"
            stroke="#1A2130"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: BYTE_EASE }}
          />

          <rect x="124" y="26" width="60" height="18" rx="2" fill="#FAF9F6" stroke="#FA8112" />
          <text x="132" y="38" fill="#1A2130" fontSize="8.5" fontFamily="monospace">AUTO-SCALE</text>

          <rect x="124" y="52" width="60" height="18" rx="2" fill="#FAF9F6" stroke="#DFDFD9" />
          <text x="132" y="64" fill="#1A2130" fontSize="8.5" fontFamily="monospace">DB REPLICA</text>

          <motion.line
            x1="184"
            y1="48"
            x2="204"
            y2="48"
            stroke="#1A2130"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: BYTE_EASE }}
          />
          <rect x="204" y="28" width="48" height="40" rx="3" fill="#FA8112" fillOpacity="0.12" stroke="#FA8112" />
          <text x="211" y="46" fill="#1A2130" fontSize="8.5" fontFamily="monospace" fontWeight="600">BACKUP</text>
          <text x="211" y="58" fill="#FA8112" fontSize="8.5" fontFamily="monospace" fontWeight="600">SECURE</text>
        </svg>
      );

    case 'uiux':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 280 96"
          className={`h-24 ${frameClass}`}
          fill="none"
        >
          {/* Design Token & Component Anatomy */}
          <rect x="16" y="16" width="76" height="64" rx="3" fill="#FFFFFF" stroke="#DFDFD9" />
          <rect x="24" y="24" width="14" height="48" fill="#1A2130" />
          <rect x="42" y="24" width="12" height="12" fill="#FA8112" />
          <rect x="42" y="42" width="12" height="12" fill="#FA8112" />
          <rect x="42" y="60" width="12" height="12" fill="#FA8112" />
          <path d="M58 24C69 24 78 33 78 44H58V24Z" fill="#FDA63A" />
          <path d="M58 72C69 72 78 63 78 52H58V72Z" fill="#FDA63A" />

          <rect x="104" y="16" width="160" height="64" rx="3" fill="#FFFFFF" stroke="#DFDFD9" />
          <text x="114" y="31" fill="#687285" fontSize="8.5" fontFamily="monospace">DESIGN SYSTEM TOKENS</text>
          <rect x="114" y="38" width="84" height="8" rx="1.5" fill="#1A2130" />
          <rect x="114" y="50" width="120" height="5" rx="1" fill="#1A2130" fillOpacity="0.3" />
          <rect x="114" y="61" width="54" height="11" rx="2" fill="#FA8112" />
          <rect x="174" y="61" width="54" height="11" rx="2" stroke="#1A2130" strokeOpacity="0.3" />
        </svg>
      );

    case 'ai':
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 560 110"
          className={`h-28 ${frameClass}`}
          fill="none"
        >
          {/* Step 1: Unstructured Business Inputs */}
          <rect x="16" y="20" width="136" height="70" rx="4" fill="#FFFFFF" stroke="#DFDFD9" />
          <text x="28" y="38" fill="#687285" fontSize="9" fontFamily="monospace">01. MANUAL INPUTS</text>
          <rect x="28" y="46" width="96" height="6" rx="1" fill="#1A2130" fillOpacity="0.7" />
          <rect x="28" y="57" width="80" height="6" rx="1" fill="#1A2130" fillOpacity="0.35" />
          <rect x="28" y="68" width="108" height="6" rx="1" fill="#1A2130" fillOpacity="0.2" />

          {/* Flow Arrow 1 */}
          <motion.line
            x1="152"
            y1="55"
            x2="196"
            y2="55"
            stroke="#FA8112"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: BYTE_EASE }}
          />
          <path d="M192 51L198 55L192 59" stroke="#FA8112" strokeWidth="1.5" />

          {/* Step 2: AI & Rules Automation Engine */}
          <rect x="200" y="16" width="164" height="78" rx="5" fill="#1A2130" />
          <text x="214" y="36" fill="#FDA63A" fontSize="9.5" fontFamily="monospace" fontWeight="600">02. AI &amp; WORKFLOW ENGINE</text>
          <rect x="214" y="45" width="136" height="14" rx="2" fill="#232C3F" stroke="#FA8112" strokeOpacity="0.6" />
          <text x="222" y="55" fill="#F2F2EE" fontSize="8.5" fontFamily="monospace">Classify · Extract · Route</text>
          <rect x="214" y="65" width="88" height="14" rx="2" fill="#FA8112" />
          <text x="222" y="75" fill="#111622" fontSize="8.5" fontFamily="monospace" fontWeight="700">Zero Manual Friction</text>

          {/* Flow Arrow 2 */}
          <motion.line
            x1="364"
            y1="55"
            x2="408"
            y2="55"
            stroke="#FA8112"
            strokeWidth="1.5"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16, ease: BYTE_EASE }}
          />
          <path d="M404 51L410 55L404 59" stroke="#FA8112" strokeWidth="1.5" />

          {/* Step 3: Automated Action & Sync */}
          <rect x="412" y="20" width="132" height="70" rx="4" fill="#FFFFFF" stroke="#FA8112" />
          <text x="424" y="38" fill="#1A2130" fontSize="9" fontFamily="monospace" fontWeight="600">03. AUTOMATED ACTION</text>
          <rect x="424" y="47" width="108" height="14" rx="2" fill="#FAF9F6" stroke="#DFDFD9" />
          <text x="430" y="57" fill="#1A2130" fontSize="8.5" fontFamily="monospace">ERP &amp; Database Updated</text>
          <rect x="424" y="66" width="108" height="14" rx="2" fill="#FA8112" fillOpacity="0.15" />
          <text x="430" y="76" fill="#1A2130" fontSize="8.5" fontFamily="monospace" fontWeight="600">Instant Audit Trail</text>
        </svg>
      );
  }
}
