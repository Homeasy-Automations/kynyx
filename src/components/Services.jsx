"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
} from "framer-motion";
import {
  Code2,
  Smartphone,
  TrendingUp,
  Palette,
  ArrowRight,
  CheckCircle2,
  SearchCheck,
  Wifi,
  Signal,
  BatteryFull,
  Bell,
  Search,
  Home,
  Heart,
  User,
  MousePointer2,
  Layers,
} from "lucide-react";
import { Link } from "react-router-dom";

// --- Data ---
// `preview` selects which hand-built illustration renders inside the
// mockup frame for that card — each one is drawn to actually depict the
// service (a code editor, an app UI, a chart, a design canvas, audit
// gauges) instead of a generic stock photo or empty placeholder blocks.
const services = [
  {
    title: "Custom Web Development",
    description:
      "High-performance, secure, and infinitely scalable web platforms — from sleek marketing sites to complex enterprise SaaS.",
    deliverables: [
      "Responsive Websites",
      "E-commerce Platforms",
      "SaaS Applications",
      "API & Microservices",
    ],
    technologies: [
      "Next.js / React",
      "Node.js / Nest",
      "Shopify Plus",
      "AWS / Vercel",
    ],
    gradient: "from-cyan-500 to-blue-600",
    accent: "#22d3ee",
    borderColor: "border-cyan-500/30",
    icon: <Code2 className="w-10 h-10" />,
    frame: "browser",
    preview: "code",
    url: "your-site.com",
  },
  {
    title: "Mobile App Development",
    description:
      "Native iOS & Android apps with flawless UX, offline sync, biometric auth, and App Store domination.",
    deliverables: [
      "iOS Native Apps",
      "Android Native Apps",
      "Cross-Platform",
      "App Store Optimization",
    ],
    technologies: ["SwiftUI", "Kotlin", "React Native", "Firebase"],
    gradient: "from-purple-500 to-pink-600",
    accent: "#c084fc",
    borderColor: "border-purple-500/30",
    icon: <Smartphone className="w-10 h-10" />,
    frame: "phone",
    preview: "app",
    url: "app.your-site.com",
  },
  {
    title: "Digital Marketing Strategy",
    description:
      "Data-obsessed growth systems: SEO that ranks, ads that convert, content that compounds.",
    deliverables: [
      "Technical SEO",
      "PPC & Meta Ads",
      "Content Strategy",
      "Conversion Optimization",
    ],
    technologies: ["Google Ads", "Meta Ads", "Ahrefs / SEMrush", "GA4"],
    gradient: "from-emerald-500 to-teal-600",
    accent: "#34d399",
    borderColor: "border-emerald-500/30",
    icon: <TrendingUp className="w-10 h-10" />,
    frame: "browser",
    preview: "analytics",
    url: "analytics.your-site.com",
  },
  {
    title: "UI/UX Design & Branding",
    description:
      "Pixel-perfect interfaces and unforgettable brands that turn first-time visitors into lifelong customers.",
    deliverables: [
      "User Research",
      "Figma Prototypes",
      "Brand Identity",
      "Design Systems",
    ],
    technologies: ["Figma", "Framer", "Adobe Suite", "Spline"],
    gradient: "from-rose-500 to-pink-600",
    accent: "#fb7185",
    borderColor: "border-rose-500/30",
    icon: <Palette className="w-10 h-10" />,
    frame: "browser",
    preview: "design",
    url: "design.your-site.com",
  },
  {
    title: "Website Audit & Optimization",
    description:
      "Comprehensive technical audits identifying performance bottlenecks, security vulnerabilities, and SEO gaps.",
    deliverables: [
      "Core Web Vitals Analysis",
      "Security & Header Audit",
      "Deep SEO Crawl",
      "Accessibility Compliance",
    ],
    technologies: ["Lighthouse", "Screaming Frog", "AWS Inspector", "WAVE"],
    gradient: "from-orange-500 to-red-600",
    accent: "#fb923c",
    borderColor: "border-orange-500/30",
    icon: <SearchCheck className="w-10 h-10" />,
    frame: "browser",
    preview: "audit",
    url: "audit.your-site.com",
  },
];

// --- Preview Illustrations ---
// Each of these is a self-contained, on-topic mockup — no external image
// requests, so nothing can fail to load or show up unrelated to the card.

const CodeEditorPreview = ({ accent }) => {
  const lines = [
    { indent: 0, w: "35%", color: "#c084fc" },
    { indent: 0, w: "55%", color: "#c084fc" },
    { indent: 0, w: "0%", color: "transparent" },
    { indent: 0, w: "70%", color: "#60a5fa" },
    { indent: 1, w: "60%", color: "#94a3b8" },
    { indent: 1, w: "80%", color: "#34d399" },
    { indent: 2, w: "50%", color: "#fbbf24" },
    { indent: 1, w: "45%", color: "#94a3b8" },
    { indent: 0, w: "20%", color: "#60a5fa" },
    { indent: 0, w: "0%", color: "transparent" },
    { indent: 0, w: "65%", color: "#60a5fa" },
    { indent: 1, w: "75%", color: "#94a3b8" },
    { indent: 1, w: "40%", color: "#f472b6" },
    { indent: 0, w: "20%", color: "#60a5fa" },
  ];
  return (
    <div className="flex h-full w-full font-mono text-[11px] relative">
      <div className="flex flex-col items-end gap-[7px] px-3 py-4 text-white/20 select-none border-r border-white/5">
        {lines.map((_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-[7px] px-4 py-4">
        {lines.map((l, i) => (
          <div
            key={i}
            className="h-[10px] rounded-sm"
            style={{
              marginLeft: `${l.indent * 16}px`,
              width: l.w,
              background: l.color,
              opacity: l.color === "transparent" ? 0 : 0.55,
            }}
          />
        ))}
      </div>
      <motion.div
        className="absolute left-[120px] w-[2px] h-4"
        style={{ background: accent, top: 70 }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.1, repeat: Infinity }}
      />
    </div>
  );
};

const AppUIPreview = () => (
  <div className="h-full w-full flex flex-col bg-[#0d0d12] px-3 py-3">
    <div className="flex items-center justify-between mb-4">
      <span className="text-white text-sm font-semibold">Good morning 👋</span>
      <Bell className="w-4 h-4 text-white/50" />
    </div>
    <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-2 mb-4 border border-white/10">
      <Search className="w-3.5 h-3.5 text-white/40" />
      <div className="h-2 w-20 bg-white/15 rounded-full" />
    </div>
    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="h-20 rounded-2xl bg-gradient-to-br from-purple-500/40 to-pink-500/30 border border-white/10 p-3 flex flex-col justify-end">
        <div className="h-2 w-10 bg-white/40 rounded-full mb-1" />
        <div className="h-2 w-14 bg-white/20 rounded-full" />
      </div>
      <div className="h-20 rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col justify-end">
        <div className="h-2 w-10 bg-white/30 rounded-full mb-1" />
        <div className="h-2 w-8 bg-white/15 rounded-full" />
      </div>
    </div>
    <div className="space-y-2 flex-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400/50 to-pink-400/30" />
          <div className="flex-1 space-y-1.5">
            <div className="h-1.5 w-3/4 bg-white/25 rounded-full" />
            <div className="h-1.5 w-1/2 bg-white/10 rounded-full" />
          </div>
          <Heart className="w-3.5 h-3.5 text-white/30" />
        </div>
      ))}
    </div>
    <div className="flex items-center justify-around pt-3 mt-2 border-t border-white/10">
      <Home className="w-4 h-4 text-purple-300" />
      <Search className="w-4 h-4 text-white/30" />
      <Heart className="w-4 h-4 text-white/30" />
      <User className="w-4 h-4 text-white/30" />
    </div>
  </div>
);

const AnalyticsPreview = () => {
  const bars = [40, 65, 50, 80, 60, 95, 75];
  return (
    <div className="h-full w-full p-5 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-white/40 text-[10px] uppercase tracking-wider mb-1">
            Organic Traffic
          </div>
          <div className="text-white text-2xl font-bold">128,4K</div>
        </div>
        <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <TrendingUp className="w-3.5 h-3.5" /> +42.8%
        </div>
      </div>

      <svg viewBox="0 0 260 60" className="w-full h-14 mb-5" preserveAspectRatio="none">
        <polyline
          points="0,45 40,38 80,42 120,20 160,28 200,8 240,15"
          fill="none"
          stroke="#34d399"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex items-end gap-2 flex-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-500/70 to-teal-400/40"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[9px] text-white/30 font-mono">
        <span>MON</span>
        <span>WED</span>
        <span>FRI</span>
        <span>SUN</span>
      </div>
    </div>
  );
};

const DesignCanvasPreview = () => (
  <div className="h-full w-full p-5 relative bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:14px_14px]">
    <div className="flex gap-2 mb-4">
      {["#fb7185", "#fbbf24", "#34d399", "#60a5fa", "#c084fc"].map((c) => (
        <div
          key={c}
          className="w-5 h-5 rounded-full border border-white/20"
          style={{ background: c }}
        />
      ))}
    </div>

    <div className="flex gap-4">
      <div className="w-24 rounded-lg border-2 border-rose-400/50 bg-[#0d0d12] p-2 space-y-2">
        <div className="h-3 w-3 rounded-full bg-white/20" />
        <div className="h-2 w-full bg-white/15 rounded-full" />
        <div className="h-2 w-2/3 bg-white/10 rounded-full" />
        <div className="h-8 w-full rounded bg-gradient-to-br from-rose-400/40 to-pink-400/20" />
      </div>
      <div className="flex-1 rounded-lg border border-white/10 bg-[#0d0d12] p-3 space-y-2.5">
        <div className="h-2.5 w-1/2 bg-white/20 rounded-full" />
        <div className="h-16 w-full rounded-md bg-white/5 border border-dashed border-white/15" />
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-rose-400/30 border border-rose-400/40" />
          <div className="h-6 w-12 rounded-full bg-white/5 border border-white/10" />
        </div>
      </div>
    </div>

    <motion.div
      className="absolute"
      style={{ right: 30, bottom: 22 }}
      animate={{ x: [0, 6, 0], y: [0, 4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <MousePointer2 className="w-4 h-4 text-rose-300 fill-rose-300/40" />
    </motion.div>
    <Layers className="w-4 h-4 text-white/20 absolute top-4 right-4" />
  </div>
);

const Gauge = ({ score, label, color }) => {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
        />
        <text x="32" y="37" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">
          {score}
        </text>
      </svg>
      <span className="text-[9px] text-white/40 uppercase tracking-wide text-center leading-tight">
        {label}
      </span>
    </div>
  );
};

const AuditPreview = () => (
  <div className="h-full w-full p-5 flex flex-col justify-center">
    <div className="grid grid-cols-4 gap-2 mb-5">
      <Gauge score={98} label="Performance" color="#4ade80" />
      <Gauge score={100} label="Accessibility" color="#34d399" />
      <Gauge score={95} label="Best Practices" color="#fb923c" />
      <Gauge score={100} label="SEO" color="#4ade80" />
    </div>
    <div className="space-y-2">
      {["First Contentful Paint", "Time to Interactive", "Cumulative Layout Shift"].map(
        (metric, i) => (
          <div key={metric} className="flex items-center justify-between text-[10px]">
            <span className="text-white/40">{metric}</span>
            <span className="text-emerald-400 font-mono font-semibold">
              {["0.8s", "1.2s", "0.01"][i]}
            </span>
          </div>
        )
      )}
    </div>
  </div>
);

const PREVIEWS = {
  code: CodeEditorPreview,
  app: AppUIPreview,
  analytics: AnalyticsPreview,
  design: DesignCanvasPreview,
  audit: AuditPreview,
};

const TechBadge = ({ children }) => (
  <span className="px-3 py-1.5 text-xs font-mono font-medium bg-white/5 border border-white/10 rounded-full text-gray-300 backdrop-blur-md">
    {children}
  </span>
);

// Desktop browser chrome wrapping the topic-specific preview
const BrowserMockup = ({ service }) => {
  const Preview = PREVIEWS[service.preview];
  return (
    <div
      className={`w-full h-full bg-[#0a0a0a] rounded-xl border ${service.borderColor} overflow-hidden flex flex-col relative group-hover:scale-[1.02] transition-transform duration-500`}
    >
      <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2 relative z-10 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center">
          <div className="inline-block px-3 py-0.5 bg-black/30 rounded text-[10px] text-gray-500 font-mono">
            https://{service.url}
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <Preview accent={service.accent} />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${service.gradient} opacity-[0.06] animate-[scan_4s_linear_infinite] pointer-events-none`}
        />
      </div>
    </div>
  );
};

// Phone chrome for the mobile app card
const PhoneMockup = ({ service }) => {
  const Preview = PREVIEWS[service.preview];
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={`w-[230px] h-full max-h-[460px] bg-[#0a0a0a] rounded-[2.5rem] border-4 ${service.borderColor} overflow-hidden relative shadow-2xl group-hover:scale-[1.02] transition-transform duration-500`}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-20" />
        <div className="flex items-center justify-between px-6 pt-2.5 pb-1 text-white/70 relative z-10">
          <span className="text-[10px] font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <BatteryFull className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="h-[calc(100%-28px)] relative overflow-hidden">
          <Preview />
        </div>
      </div>
    </div>
  );
};

const ServiceRow = ({ service, index, isReversed }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center my-24 ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Visual Side */}
      <motion.div
        className="relative order-2 lg:order-1 h-[400px] lg:h-[500px] group"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl blur-[100px] opacity-20`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        {service.frame === "phone" ? (
          <PhoneMockup service={service} />
        ) : (
          <BrowserMockup service={service} />
        )}
      </motion.div>

      {/* Text Content Side */}
      <motion.div
        className="relative order-1 lg:order-2"
        initial={{ x: isReversed ? 50 : -50, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
      >
        <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <div
            className={`p-1.5 rounded bg-gradient-to-br ${service.gradient} text-white shadow-lg`}
          >
            {service.icon}
          </div>
          <span className="text-sm font-medium text-gray-300">
            {service.title}
          </span>
        </div>

        <h3 className="font-bold text-4xl md:text-5xl text-white mb-6 tracking-tight">
          {service.title}
        </h3>

        <p className="text-lg text-gray-400 leading-relaxed mb-8">
          {service.description}
        </p>

        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
              Deliverables
            </h4>
            <ul className="space-y-3">
              {service.deliverables.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, i) => (
                <TechBadge key={i}>{tech}</TechBadge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Link
            to="/contact"
            className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full border ${service.borderColor} bg-transparent text-white font-medium transition-all hover:bg-white hover:text-black`}
          >
            Discuss Project{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Component ---

export default function UltimateServices() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden py-32"
    >
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

      <motion.div
        style={{ y, opacity }}
        className="text-center mb-32 max-w-4xl mx-auto px-6 relative z-10"
      >
        <motion.h2 className="font-bold text-6xl md:text-8xl text-white mb-6 tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Build the Future
          </span>
        </motion.h2>
        <p className="text-xl text-gray-400 font-light">
          Enterprise-grade solutions powered by cutting-edge technology and
          design.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {services.map((service, index) => (
          <ServiceRow
            key={index}
            service={service}
            index={index}
            isReversed={index % 2 === 1}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-32 text-center px-6"
      >
        <div className="max-w-3xl mx-auto p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/20 blur-[100px] -z-10" />

          <h3 className="font-bold text-4xl text-white mb-6">
            Ready to accelerate?
          </h3>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Let's discuss how we can bring your vision to life with precision
            and scale.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
            >
              Get Started <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
