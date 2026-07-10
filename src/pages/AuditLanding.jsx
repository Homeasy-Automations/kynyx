import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Search,
  Zap,
  Accessibility,
  ShieldCheck,
  Layout,
  Smartphone,
  ChevronDown,
  Menu,
  X,
  CheckCircle2,
  FileText,
  PenLine,
  PhoneCall,
  AlertTriangle,
  Monitor,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Content                                                              */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "What's included", href: "#included" },
  { label: "Sample report", href: "#sample" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const CATEGORIES = [
  {
    icon: Search,
    name: "SEO",
    desc: "Titles, meta descriptions, canonical tags, and Open Graph data.",
    issue: "Most sites we audit are missing a meta description entirely.",
  },
  {
    icon: Zap,
    name: "Performance",
    desc: "Load times, server response, and how fast the page actually feels.",
    issue: "A 2-second First Contentful Paint is the most common red flag.",
  },
  {
    icon: Accessibility,
    name: "Accessibility",
    desc: "Alt text, ARIA roles, heading order, and language tags.",
    issue: "Images without alt text show up in nearly every audit.",
  },
  {
    icon: ShieldCheck,
    name: "Security",
    desc: "HTTPS, HSTS, CSP, and the headers that protect your visitors.",
    issue: "HSTS and CSP headers are missing on the majority of sites we check.",
  },
  {
    icon: Layout,
    name: "UX & Design",
    desc: "Heading structure, content hierarchy, and overall clarity.",
    issue: "Pages with no H1 tag confuse both visitors and search engines.",
  },
  {
    icon: Smartphone,
    name: "Mobile",
    desc: "Viewport setup and how the site behaves on a phone.",
    issue: "Usually the strongest category — but worth confirming, not assuming.",
  },
];

const SAMPLE_ROWS = [
  { name: "SEO", grade: "C-", note: "Title and meta description need rewriting." },
  { name: "Performance", grade: "B", note: "Solid, with one slow-loading image." },
  { name: "Accessibility", grade: "B+", note: "Good structure, a few alt tags missing." },
  { name: "Security", grade: "D", note: "Missing HSTS and CSP headers." },
  { name: "UX & Design", grade: "C+", note: "No H1, heading order is inconsistent." },
  { name: "Mobile", grade: "A-", note: "Responsive and well-configured." },
];

const PROCESS_STEPS = [
  {
    step: "01",
    icon: FileText,
    title: "Send us your URL",
    text: "Tell us which site, or which pages, you'd like audited. Takes two minutes.",
  },
  {
    step: "02",
    icon: Search,
    title: "We run the full audit",
    text: "Our team and tooling check 50+ signals across all six categories.",
  },
  {
    step: "03",
    icon: PenLine,
    title: "We mark it up",
    text: "Every issue is documented in plain English, with a grade and a fix.",
  },
  {
    step: "04",
    icon: PhoneCall,
    title: "You get the report + a call",
    text: "A full written report, plus a walkthrough of what matters most.",
  },
];

const WHY_IT_MATTERS = [
  {
    title: "Get found.",
    text: "Search engines can't rank pages with missing titles, broken structure, or no meta description — no matter how good the content is.",
  },
  {
    title: "Keep visitors.",
    text: "A slow first load is often the only thing a visitor notices before they leave for a competitor.",
  },
  {
    title: "Stay trusted.",
    text: "Missing security headers are quiet until a scanner, a browser warning, or a customer finds them first.",
  },
];

const PRICING = [
  {
    name: "Snapshot Audit",
    price: "$99",
    note: "one-time",
    desc: "A focused audit of your homepage across all six categories — a fast gut-check.",
    features: [
      "Homepage audit across 6 categories",
      "Overall grade + category grades",
      "Priority fixes report (PDF)",
      "Delivered within 48 hours",
    ],
    highlight: false,
  },
  {
    name: "Full Site Audit",
    price: "$349",
    note: "one-time",
    desc: "A complete audit of your key pages, with a written report and a walkthrough call.",
    features: [
      "Up to 10 pages audited",
      "Full written report with annotations",
      "Priority fixes + quick wins for every category",
      "30-minute walkthrough call",
      "Delivered in 3–5 business days",
    ],
    highlight: true,
  },
  {
    name: "Audit + Action Sprint",
    price: "Custom",
    note: "scoped to you",
    desc: "For teams who want the highest-impact issues fixed, not just found.",
    features: [
      "Everything in Full Site Audit",
      "Implementation of top quick wins",
      "Dedicated point of contact",
      "Follow-up re-audit included",
    ],
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "They found a missing HSTS header and a broken canonical tag our last agency missed entirely. The report alone was worth it.",
    name: "Dana R.",
    role: "Operations Lead, retail brand",
  },
  {
    quote:
      "The walkthrough call turned a long report into a three-item to-do list. We shipped all three within a week.",
    name: "Theo B.",
    role: "Founder, early-stage startup",
  },
  {
    quote: "We run this before every client handoff now. It's become part of our QA process.",
    name: "Lina S.",
    role: "Agency owner",
  },
];

const FAQS = [
  {
    q: "What exactly do I get?",
    a: "A full written report covering all six categories, with a letter grade, prioritized fixes, and quick wins for each. Full Site Audit and above also include a 30-minute walkthrough call.",
  },
  {
    q: "How long does it take?",
    a: "Snapshot audits are delivered within 48 hours. Full Site Audits typically take 3–5 business days depending on scope.",
  },
  {
    q: "Do you fix the issues for us?",
    a: "On the Audit + Action Sprint package, yes — we implement the highest-impact quick wins ourselves. On other packages, you'll get a clear, prioritized plan your team or developer can act on.",
  },
  {
    q: "Can you audit any website?",
    a: "Yes, including sites behind a staging password — just share access details when you submit your request.",
  },
  {
    q: "Do you work with agencies?",
    a: "Regularly. Many of our audits are white-labeled for agencies auditing their own clients' sites.",
  },
];

const GRADE_COLORS = {
  A: "#10B981", // Emerald 500
  B: "#34D399", // Emerald 400
  C: "#F59E0B", // Amber 500
  D: "#EF4444", // Red 500
  F: "#EF4444", // Red 500
};

const gradeColor = (grade) => GRADE_COLORS[grade[0]] || "#F59E0B";

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

const GradeStamp = ({ grade, size = 72, rotate = -6 }) => {
  const color = gradeColor(grade);
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex items-center justify-center rounded-full border-[3px] shrink-0 shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)]"
      style={{
        width: size,
        height: size,
        borderColor: color,
        color,
        transform: `rotate(${rotate}deg)`,
        background: "#0F172A", // Slate 900
      }}
    >
      <div
        className="flex items-center justify-center rounded-full border"
        style={{ width: size - 12, height: size - 12, borderColor: color, background: "#1E293B" }}
      >
        <span className="font-display font-bold" style={{ fontSize: size * 0.32 }}>
          {grade}
        </span>
      </div>
    </motion.div>
  );
};

const AnnotationTag = ({ className = "", rotate = -2, children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 }}
    className={`absolute bg-[#0F172A] border border-red-500/50 text-red-400 text-[10px] font-mono-alt px-2 py-1 rounded shadow-[0_0_10px_rgba(239,68,68,0.3)] leading-tight max-w-[140px] backdrop-blur-md ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    {children}
  </motion.div>
);

// Modern Dark-Mode "Dashboard" Mockup
const MarkedUpPage = () => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-visible"
  >
    {/* glowing effect behind */}
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 blur-xl -z-10" />

    {/* browser top bar */}
    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700 bg-slate-900/80">
      <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
      <div className="flex-1 ml-2 px-3 py-1 rounded-full bg-slate-800 text-[10px] font-mono-alt text-slate-400 text-center border border-slate-700">
        yoursite.com
      </div>
    </div>

    {/* page skeleton */}
    <div className="p-8 sm:p-10 space-y-5 relative">
      {/* Scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-4 w-full animate-[scan_3s_linear_infinite] pointer-events-none" />
      
      <div className="relative inline-block">
        <div className="h-6 w-48 rounded bg-slate-800 border border-slate-700/50 shadow-inner" />
        <div className="absolute -inset-2 rounded-lg border-2 border-dashed border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]" />
      </div>
      <div className="h-3 w-full rounded bg-slate-800/50" />
      <div className="h-3 w-5/6 rounded bg-slate-800/50" />
      <div className="relative">
        <div className="h-28 w-full rounded bg-slate-800 border border-slate-700/50 shadow-inner" />
        <div className="absolute -inset-2 rounded-lg border-2 border-dashed border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]" />
      </div>
      <div className="h-3 w-2/3 rounded bg-slate-800/50" />
      <div className="h-3 w-4/6 rounded bg-slate-800/50" />
    </div>

    {/* annotations */}
    <AnnotationTag className="-top-3 -left-3 sm:left-6 rotate-[-3deg]">
      <AlertTriangle size={10} className="inline mr-1"/> No H1 tag
    </AnnotationTag>
    <AnnotationTag className="top-[58%] -right-3 sm:right-6" rotate={2}>
      <AlertTriangle size={10} className="inline mr-1"/> Image missing alt
    </AnnotationTag>
    <AnnotationTag className="bottom-6 -left-3 sm:left-10" rotate={-2}>
      <Zap size={10} className="inline mr-1"/> Paint: 2.4s
    </AnnotationTag>

    {/* grade stamp */}
    <div className="absolute -top-6 -right-6 sm:-right-8">
      <GradeStamp grade="D+" size={84} rotate={10} />
    </div>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* Main component                                                       */
/* ------------------------------------------------------------------ */

const AuditServiceLanding = () => {
  // eslint-disable-next-line no-unused-vars
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", website: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, 150]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.website.trim()) return;
    setSubmitted(true);
  };

  return (
    <main
      className="bg-[#020617] text-slate-300 antialiased overflow-x-hidden selection:bg-indigo-500 selection:text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Inter', sans-serif; }
        .font-mono-alt { font-family: 'JetBrains Mono', monospace; }
        section[id] { scroll-margin-top: 5.5rem; }
        @keyframes scan {
          0% { transform: translateY(-10%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* --- BACKGROUND FX --- */}
      <motion.div style={{ y: y1 }} className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <motion.div style={{ y: y2 }} className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      

      {/* --- HERO --- */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono-alt uppercase tracking-wider text-indigo-400 mb-6 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Website Audit Service
              </div>

              <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] mb-6">
                Your website has a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  report card.
                </span>
                <br />
                Most owners ignore it.
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed max-w-xl mb-8">
                We audit your site across SEO, performance, security, accessibility, UX, and
                mobile — then mark up exactly what's costing you visitors, rankings, and sales,
                and what to fix first.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)] transition-all"
                >
                  Request your audit <ArrowRight size={18} />
                </motion.a>
                <a href="#sample" className="inline-flex items-center gap-2 px-2 py-4 font-medium text-slate-400 hover:text-white transition-colors group">
                  See a sample report <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </a>
              </div>
            </motion.div>

            <div className="pt-6 lg:pt-0 relative">
              <MarkedUpPage />
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="font-mono-alt text-xs text-slate-500 text-center mt-10 lg:mt-6"
              >
                <span className="text-red-500 font-bold">D+</span> is the average first-audit grade across the sites we review.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* --- STAT STRIP --- */}
      <section className="border-y border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "200+", label: "Audits delivered" },
            { value: "6", label: "Categories covered" },
            { value: "48hrs", label: "Snapshot turnaround" },
            { value: "1", label: "Walkthrough call included" },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="font-display font-semibold text-3xl md:text-4xl text-white mb-1">{stat.value}</div>
              <div className="text-xs font-mono-alt uppercase tracking-wider text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- WHAT'S INCLUDED --- */}
      <section id="included" className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-2xl mb-14">
            <span className="font-mono-alt text-xs uppercase tracking-wider text-indigo-400 mb-3 block">What's included</span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-4">
              Six categories. Every audit, every time.
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Every audit covers the same six categories, each scored with a letter grade, so you
              can see at a glance where your site stands — and where to focus first.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 hover:shadow-xl hover:shadow-black/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                  <cat.icon size={22} />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">{cat.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{cat.desc}</p>
                <p className="text-xs font-mono-alt text-red-400 leading-relaxed border-t border-slate-800 pt-3 flex items-start gap-2">
                  <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                  {cat.issue}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SAMPLE REPORT --- */}
      <section id="sample" className="py-24 px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono-alt text-xs uppercase tracking-wider text-indigo-400 mb-3 block">Sample report</span>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-4">
                Here's what lands in your inbox.
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                A written report you can read in minutes or hand straight to your developer.
                Every category gets a grade, a plain-English explanation, and a clear next step —
                no jargon, no dashboards to log into.
              </p>
              <ul className="space-y-4 text-sm text-slate-300">
                {[
                  "An overall grade for your site",
                  "A grade and summary for each of the six categories",
                  "A ranked list of priority fixes and quick wins",
                  "Raw data appendix for your developer or agency",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group cursor-default">
                    <div className="p-1.5 rounded-full bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors mt-0.5">
                      <CheckCircle2 size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-700 bg-[#0F172A] p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Dashboard Header */}
              <div className="absolute top-0 right-0 p-4 opacity-20">
                 <Monitor size={48} />
              </div>
              
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800 relative z-10">
                <div>
                  <div className="font-mono-alt text-xs uppercase tracking-wider text-slate-500 mb-1">Audit Report</div>
                  <div className="font-display font-semibold text-xl text-white">yoursite.com</div>
                </div>
                <GradeStamp grade="C-" size={64} rotate={6} />
              </div>

              <div className="space-y-4 relative z-10">
                {SAMPLE_ROWS.map((row, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    key={row.name} 
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors"
                  >
                    <div
                      className="font-display font-bold text-sm w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                      style={{ borderColor: gradeColor(row.grade), color: gradeColor(row.grade) }}
                    >
                      {row.grade}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{row.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{row.note}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PROCESS --- */}
      <section id="process" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-2xl mb-16">
            <span className="font-mono-alt text-xs uppercase tracking-wider text-indigo-400 mb-3 block">How it works</span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white">
              From your URL to a clear plan, in four steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-4 left-[12.5%] right-[12.5%] h-0.5 bg-slate-800 -z-10" />
            
            {PROCESS_STEPS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-16 h-16 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-indigo-400 mb-4 relative z-10 shadow-xl">
                    <item.icon size={20} />
                  </div>
                  <span className="font-mono-alt text-xs text-indigo-500 mb-2">{item.step}</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2 text-center">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed text-center">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY IT MATTERS --- */}
      <section className="py-24 px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-2xl mb-14">
            <span className="font-mono-alt text-xs uppercase tracking-wider text-indigo-400 mb-3 block">Why it matters</span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white">
              Small issues, big consequences.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {WHY_IT_MATTERS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="font-display font-semibold text-xl text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-2xl mb-14 text-center">
            <span className="font-mono-alt text-xs uppercase tracking-wider text-indigo-400 mb-3 block">Pricing</span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-4">
              Pick the depth that matches your needs.
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Every package includes a written report with grades, priority fixes, and quick wins.
              Pricing shown is a starting point — final scope is confirmed before we begin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-2xl border p-7 flex flex-col relative ${
                  plan.highlight 
                    ? "border-indigo-500/50 bg-slate-900/80 shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)] scale-105 z-10" 
                    : "border-slate-800 bg-slate-900/30 hover:border-slate-700"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold shadow-lg">
                    Most popular
                  </span>
                )}
                <h3 className="font-display font-semibold text-xl text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display font-semibold text-3xl text-white">{plan.price}</span>
                  <span className="text-xs font-mono-alt text-slate-500">{plan.note}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{plan.desc}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={15} className="text-indigo-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all ${
                    plan.highlight
                      ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
                      : "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700"
                  }`}
                >
                  Request this audit
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-2xl mb-14">
            <span className="font-mono-alt text-xs uppercase tracking-wider text-indigo-400 mb-3 block">From our clients</span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white">
              Real audits, real follow-through.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-colors"
              >
                <blockquote className="text-slate-300 leading-relaxed mb-4 italic">"{t.quote}"</blockquote>
                <figcaption className="text-sm">
                  <span className="text-white font-semibold">{t.name}</span>
                  <span className="text-slate-500"> — {t.role}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <span className="font-mono-alt text-xs uppercase tracking-wider text-indigo-400 mb-3 block">FAQ</span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white">Questions, answered.</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div 
                  key={item.q} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl border overflow-hidden transition-colors ${isOpen ? "border-indigo-500/50 bg-slate-900/80" : "border-slate-800 bg-slate-900/30"}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={`font-semibold ${isOpen ? "text-white" : "text-slate-300"}`}>{item.q}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                      <ChevronDown size={18} className="text-indigo-500 shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800 pt-4">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CONTACT / FINAL CTA --- */}
      <section id="contact" className="py-24 px-6 bg-slate-950 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-3xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-4xl sm:text-5xl text-white mb-4">
              Ready to see your grade?
            </h2>
            <p className="text-slate-400">Tell us about your site and we'll get back to you within one business day.</p>
          </div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-emerald-500/50 bg-slate-900 p-10 text-center"
            >
              <CheckCircle2 size={28} className="text-emerald-500 mx-auto mb-3" />
              <h3 className="font-display font-semibold text-xl text-white mb-2">Request received</h3>
              <p className="text-slate-400">
                Thanks — we'll review your site and follow up at the email you provided within one
                business day.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5 shadow-2xl backdrop-blur-sm">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-slate-300">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={handleChange("name")}
                  className="px-4 py-3 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange("email")}
                  className="px-4 py-3 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="website" className="text-sm font-medium text-slate-300">
                  Website URL
                </label>
                <input
                  id="website"
                  required
                  placeholder="yoursite.com"
                  value={form.website}
                  onChange={handleChange("website")}
                  className="px-4 py-3 rounded-lg border border-slate-700 bg-slate-950 font-mono-alt text-sm text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-300">
                  Anything specific you'd like us to look at? (optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange("message")}
                  className="px-4 py-3 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)] transition-all w-full sm:w-auto"
                >
                  Request my audit <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      
    </main>
  );
};

export default AuditServiceLanding;