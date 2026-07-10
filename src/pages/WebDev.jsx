import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Layout,
  Code,
  Cpu,
  Infinity as InfinityIcon,
  Quote,
  Star,
  Menu,
  X,
  Mail,
  MapPin,
  CheckCircle2,
} from "lucide-react";

// --- Animations ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- Custom cursor (desktop only) ---
// Replaces the old `cursor-none` which removed the cursor with nothing in its place.
const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target;
      setIsPointer(
        Boolean(target.closest('a, button, input, [role="button"]')),
      );
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[100] hidden md:block pointer-events-none rounded-full border border-indigo-300/70 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: isPointer ? 44 : 22,
        height: isPointer ? 44 : 22,
        transition: "width 0.2s ease, height 0.2s ease",
      }}
    />
  );
};

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const WebDev = () => {
  // eslint-disable-next-line no-unused-vars
  const [navOpen, setNavOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    // Simulated submission — wire this up to your real endpoint.
    setTimeout(() => setStatus("success"), 700);
  };

  const features = [
    {
      icon: Zap,
      title: "Sub-second Latency",
      desc: "We engineer for Core Web Vitals. Your users never wait.",
      span: "col-span-1 md:col-span-2",
    },
    {
      icon: Shield,
      title: "Fort Knox Security",
      desc: "Enterprise-grade compliance (SOC2, HIPAA) baked in from day one.",
      span: "col-span-1",
    },
    {
      icon: InfinityIcon,
      title: "Infinite Scalability",
      desc: "Architectures built on AWS and Vercel that grow with your revenue.",
      span: "col-span-1 md:col-span-2 row-span-2 bg-gradient-to-br from-indigo-900/20 to-purple-900/20",
      featured: true,
    },
    {
      icon: BarChart3,
      title: "Data-Driven Growth",
      desc: "Analytics that tell you what to do next, not just what happened.",
      span: "col-span-1",
    },
    {
      icon: Cpu,
      title: "Headless Architecture",
      desc: "Decoupled frontend for maximum flexibility and performance.",
      span: "col-span-1",
    },
  ];

  const services = [
    {
      icon: Code,
      title: "Frontend Engineering",
      tools: "React • Next.js • TypeScript",
    },
    {
      icon: Layout,
      title: "Product Design",
      tools: "Figma • Prototyping • Systems",
    },
    {
      icon: Globe,
      title: "E-Commerce",
      tools: "Shopify • Stripe • Headless",
    },
  ];

  const testimonials = [
    {
      name: "Elena R.",
      role: "CTO, Nova",
      text: "The cleanest code I've ever seen from an agency. They set a new standard.",
    },
    {
      name: "Marcus T.",
      role: "Founder, Orbit",
      text: "We increased our conversion rate by 340% after the redesign.",
    },
    {
      name: "Sarah L.",
      role: "VP Product, Pulse",
      text: "Fast, responsive, and incredibly talented. A true partner in growth.",
    },
    {
      name: "David K.",
      role: "Director, Apex",
      text: "They don't just build sites; they build businesses. Exceptional work.",
    },
  ];

  const logos = [
    "Acme Corp",
    "Global Bank",
    "Nebula AI",
    "Stripe",
    "Vercel",
    "Linear",
  ];

  // Each marquee is duplicated exactly once so a -50% transform loops seamlessly.
  const loopedTestimonials = [...testimonials, ...testimonials];
  const loopedLogos = [...logos, ...logos];

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      text: "We audit your current stack and define clear success metrics.",
    },
    {
      step: "02",
      title: "Design System",
      text: "Building a scalable component library in Figma.",
    },
    {
      step: "03",
      title: "Engineering",
      text: "Weekly sprints with transparent progress tracking.",
    },
    {
      step: "04",
      title: "Optimization",
      text: "Performance tuning and SEO indexing.",
    },
  ];

  return (
    <main className="bg-[#030303] text-zinc-300 font-sans antialiased selection:bg-indigo-500 selection:text-white overflow-x-hidden relative md:cursor-none scroll-smooth">
      {/* Local styles: marquees + reduced-motion support */}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll linear infinite;
        }
        .marquee-track.marquee-slow { animation-duration: 50s; }
        .marquee-track.marquee-fast { animation-duration: 32s; }
        .marquee-group:hover .marquee-track {
          animation-play-state: paused;
        }
        section[id] { scroll-margin-top: 5.5rem; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
          * { scroll-behavior: auto !important; }
        }
      `}</style>

      <CustomCursor />

      {/* --- GLOBAL FX --- */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 right-0 w-[800px] h-[500px] bg-cyan-600/5 rounded-full blur-[100px] -z-10" />

      {/* --- HEADER / NAV --- */}
      {/* <header className="fixed top-0 inset-x-0 z-40 border-b border-white/5 bg-[#030303]/70 backdrop-blur-md">
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between h-20">
          <a href="#" className="text-xl font-bold tracking-tight text-white">
            KYNX<span className="text-indigo-400">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors"
          >
            Start a project
          </a>

          <button
            type="button"
            onClick={() => setNavOpen((open) => !open)}
            className="md:hidden p-2 text-white"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
          >
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {navOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-white/5 bg-[#030303]"
              aria-label="Primary"
            >
              <div className="flex flex-col px-6 py-4 gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setNavOpen(false)}
                    className="text-base font-medium text-zinc-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setNavOpen(false)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-black text-sm font-semibold"
                >
                  Start a project
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header> */}

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-indigo-300 mb-8 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              Now booking new partnerships
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.95]"
            >
              Digital products <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-cyan-300">
                without limits.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              We partner with ambitious founders to design and engineer the
              technology infrastructure that defines their category.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#contact"
                className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-200 to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Begin Partnership
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </a>
              <a
                href="#work"
                className="px-8 py-4 text-white font-medium hover:text-indigo-300 transition-colors flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded-full"
              >
                View Case Studies <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>

          <motion.a
            href="#services"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            aria-label="Scroll to services"
          >
            <ChevronDown className="text-zinc-600" />
          </motion.a>
        </div>
      </section>

      {/* --- MARQUEE - SOCIAL PROOF --- */}
      <div className="py-10 border-y border-white/5 bg-[#050505]/50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10" />

        <div className="marquee-group overflow-hidden">
          <div className="marquee-track marquee-slow flex gap-16 whitespace-nowrap w-max opacity-30 grayscale hover:grayscale-0 transition-[filter] duration-500">
            {loopedLogos.map((logo, i) => (
              <span
                key={i}
                className="text-2xl font-bold text-white flex items-center gap-2"
              >
                <span className="w-4 h-4 bg-white rounded-full" /> {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- BENTO GRID VALUE PROP --- */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Why industry leaders choose us.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg max-w-2xl"
            >
              We don't just write code. We solve business problems with elegant
              technical solutions.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
            {features.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl p-8 border border-white/5 bg-white/[0.02] overflow-hidden group hover:border-indigo-500/20 transition-colors duration-500 ${item.span}`}
              >
                {/* Hover glow, scoped to this card only */}
                <div className="absolute inset-0 bg-indigo-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 mb-4 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-bold text-white mb-2 ${item.featured ? "text-2xl" : ""}`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-zinc-400 leading-relaxed ${item.featured ? "text-lg max-w-md" : "text-sm"}`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-20 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-indigo-400 font-mono text-sm tracking-wider mb-2 block">
                CAPABILITIES
              </span>
              <h2 className="text-4xl font-bold text-white">
                Full-Stack Expertise
              </h2>
            </div>
            <div className="md:text-right">
              <div className="text-sm text-zinc-500">STACK</div>
              <div className="font-mono text-zinc-300">
                React / Node / AWS / Figma
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-2xl border border-white/5 bg-[#0A0A0A] hover:border-indigo-500/30 hover:bg-[#0F0F0F] hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.1)] transition-all relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="p-3 bg-white/5 rounded-lg text-indigo-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <service.icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-zinc-500 text-sm mt-1">
                        End-to-end implementation.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-mono text-zinc-600 border border-zinc-800 px-2 py-1 rounded">
                      {service.tools}
                    </span>
                    <ArrowRight
                      className="text-zinc-700 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"
                      size={20}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WORK --- */}
      <section
        id="work"
        className="py-32 relative bg-black text-white min-h-screen"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start auto-rows-min">
            {/* Left Sticky Column */}
            <div className="lg:sticky lg:top-32">
              <div className="h-[80vh] flex flex-col justify-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight tracking-tighter">
                    Crafted for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                      impact.
                    </span>
                  </h2>
                  <p className="text-zinc-400 text-lg sm:text-xl max-w-md leading-relaxed mb-6">
                    We don’t just ship websites. We create digital assets that
                    generate revenue, build trust, and define brands.
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-white font-medium hover:text-indigo-300 transition-colors group"
                  >
                    Start a project{" "}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Right Scrolling Projects */}
            <div className="space-y-32 pt-12 lg:pt-0">
              {[
                { name: "Nebula", category: "E-Commerce", year: 2024 },
                { name: "Vertex", category: "SaaS Platform", year: 2024 },
                { name: "Flux", category: "E-Commerce", year: 2024 },
                { name: "Zenith", category: "SaaS Platform", year: 2024 },
              ].map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group relative"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-3xl aspect-[4/3] mb-6 border border-white/5 bg-[#050505]">
                    <img
                      src={`https://picsum.photos/seed/kynyx${i}/800/600`}
                      alt={`${project.category} project ${project.name}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>

                  {/* Project Info */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold">{project.name}</h3>
                      <p className="text-zinc-500 text-sm mt-1">
                        {project.category} • {project.year}
                      </p>
                    </div>
                    <div
                      className="flex gap-1"
                      aria-label="Rated 5 out of 5 stars"
                    >
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={14}
                          aria-hidden="true"
                          className="fill-indigo-500/20 text-indigo-500/20 group-hover:fill-indigo-500 group-hover:text-indigo-500 transition-all duration-300"
                          style={{ transitionDelay: `${s * 50}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS MARQUEE --- */}
      <section className="py-20 bg-[#0A0A0A] border-y border-white/5 overflow-hidden relative">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10 pointer-events-none w-32 md:w-64" /> */}

        <div className="mb-12 text-center relative z-20">
          <span className="text-indigo-400 font-mono text-sm tracking-wider">
            FEEDBACK LOOP
          </span>
        </div>

        <div className="marquee-group overflow-hidden">
          <div className="marquee-track marquee-fast flex gap-6 w-max">
            {loopedTestimonials.map((t, i) => (
              <figure
                key={`${t.name}-${i}`}
                className="w-[320px] sm:w-[400px] p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <Quote
                  className="text-indigo-500 mb-4"
                  size={32}
                  aria-hidden="true"
                />
                <blockquote className="text-zinc-300 text-lg mb-6 leading-relaxed">
                  {t.text}
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <span
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-white font-semibold">
                      {t.name}
                    </span>
                    <span className="block text-zinc-500 text-sm">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS --- */}
      <section id="process" className="py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white text-center mb-20"
          >
            The Methodology
          </motion.h2>

          <ol className="relative space-y-20 md:space-y-32">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-zinc-800 to-transparent -translate-x-1/2"
              aria-hidden="true"
            />

            {processSteps.map((item, i) => (
              <motion.li
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-1/2 text-center md:text-left group">
                  <div className="text-indigo-500 font-mono text-sm mb-2">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400">{item.text}</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#030303] border-2 border-indigo-500 rounded-full z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all hidden md:block"
                  aria-hidden="true"
                />
                <div className="hidden md:block w-1/2" />
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* --- CTA --- */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/10" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-12 tracking-tighter"
          >
            Ready to <br /> <span className="text-indigo-400">scale?</span>
          </motion.h2>

          <form
            onSubmit={handleSubscribe}
            className="max-w-lg mx-auto relative"
          >
            <label htmlFor="contact-email" className="sr-only">
              Email address
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={status !== "idle"}
              className="w-full px-8 py-6 bg-black/50 border border-white/10 rounded-full text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 backdrop-blur-md text-lg transition-all text-center disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status !== "idle"}
              aria-label="Submit email"
              className="absolute right-2 top-2 p-4 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-105 transition-all disabled:opacity-60 disabled:hover:scale-100"
            >
              {status === "submitting" ? (
                <span className="block w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ArrowRight size={24} />
              )}
            </button>
          </form>

          <div className="mt-6 text-sm h-5" aria-live="polite">
            {status === "success" ? (
              <p className="text-indigo-300 flex items-center justify-center gap-2">
                <CheckCircle2 size={14} /> You're on the list — we'll be in
                touch shortly.
              </p>
            ) : (
              <p className="text-zinc-500 flex items-center justify-center gap-2">
                <CheckCircle2 size={14} className="text-indigo-500" /> No spam.
                Unsubscribe anytime.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default WebDev;
