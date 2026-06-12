"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Code2,
  Smartphone,
  TrendingUp,
  Palette,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  SearchCheck,
  Globe,
  MonitorPlay,
} from "lucide-react";
import { Link } from "react-router-dom";

// --- Data ---
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
    borderColor: "border-cyan-500/30",
    icon: <Code2 className="w-10 h-10" />,
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
    borderColor: "border-purple-500/30",
    icon: <Smartphone className="w-10 h-10" />,
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
    borderColor: "border-emerald-500/30",
    icon: <TrendingUp className="w-10 h-10" />,
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
    borderColor: "border-rose-500/30",
    icon: <Palette className="w-10 h-10" />,
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
    borderColor: "border-orange-500/30",
    icon: <SearchCheck className="w-10 h-10" />,
  },
];

// --- Components ---

const TechBadge = ({ children }) => (
  <span className="px-3 py-1.5 text-xs font-mono font-medium bg-white/5 border border-white/10 rounded-full text-gray-300 backdrop-blur-md">
    {children}
  </span>
);

const BrowserMockup = ({ gradient, borderColor }) => (
  <div
    className={`w-full h-full bg-[#0a0a0a] rounded-xl border ${borderColor} overflow-hidden flex flex-col relative group-hover:scale-[1.02] transition-transform duration-500`}
  >
    {/* Browser Header */}
    <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      </div>
      <div className="flex-1 text-center">
        <div className="inline-block px-3 py-0.5 bg-black/30 rounded text-[10px] text-gray-500 font-mono">
          https://your-site.com
        </div>
      </div>
    </div>

    {/* Screen Content */}
    <div className="flex-1 p-6 relative overflow-hidden">
      {/* Abstract UI Elements */}
      <div className="w-full h-1/3 bg-gradient-to-r from-white/10 to-transparent rounded mb-4" />
      <div className="flex gap-4 mb-4">
        <div className="w-1/3 h-24 bg-white/5 rounded-lg" />
        <div className="w-2/3 h-24 bg-white/5 rounded-lg" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-16 bg-white/5 rounded" />
        ))}
      </div>

      {/* Scanline Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-10 animate-[scan_4s_linear_infinite]`}
      />
    </div>
  </div>
);

const ServiceRow = ({ service, index, isReversed }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Spotlight Effect Logic
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
      {/* 3. Visual / Mockup Side */}
      <motion.div
        className="relative order-2 lg:order-1 h-[400px] lg:h-[500px]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
      >
        {/* Glowing Backdrop */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl blur-[100px] opacity-20`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <BrowserMockup
          gradient={service.gradient}
          borderColor={service.borderColor}
        />
      </motion.div>

      {/* 4. Text Content Side */}
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

        {/* Link Button */}
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

  // Parallax Text
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

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

      {/* Hero Header */}
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

      {/* Services Grid */}
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

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-32 text-center px-6"
      >
        <div className="max-w-3xl mx-auto p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm relative overflow-hidden">
          {/* Glow effect */}
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
