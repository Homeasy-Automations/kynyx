"use client";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Smartphone,
  TrendingUp,
  Palette,
  Cloud,
  ArrowRight,
  SearchCheck,
  CheckCircle2,
  Zap,
  Sparkles,
} from "lucide-react";

// --- Utility ---
const cn = (...inputs) => inputs.filter(Boolean).join(" ");

// --- Data --- (6 services, all equally sized, glowing-card style)
const services = [
  {
    id: "web",
    title: "Custom Web Development",
    description: "High-performance, scalable SaaS and marketing platforms.",
    icon: Code2,
    gradient: "from-cyan-400 to-blue-500",
    href: "/Services/WebDev",
    badge: "Available for Q4 2023",
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "Native iOS & Android with flawless UX.",
    icon: Smartphone,
    gradient: "from-purple-400 to-pink-500",
    href: "/Services#mobile-development",
    badge: "iOS & Android ready",
  },
  {
    id: "audit",
    title: "Website Audit",
    description: "Deep technical audits for SEO, security, and performance.",
    icon: SearchCheck,
    gradient: "from-orange-400 to-red-500",
    href: "/Services/AuditLanding",
    details: [
      "Core Web Vitals",
      "Security Headers",
      "SEO Crawl",
      "Accessibility",
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description: "Data-driven growth strategies and content.",
    icon: TrendingUp,
    gradient: "from-emerald-400 to-teal-500",
    href: "/Services#digital-marketing",
    badge: "Data-driven results",
  },
  {
    id: "uiux",
    title: "UI/UX Design & Branding",
    description: "Pixel-perfect interfaces and unforgettable UX.",
    icon: Palette,
    gradient: "from-rose-400 to-pink-500",
    href: "/Services#uiux-design",
    badge: "Figma-first workflow",
  },
  {
    id: "devops",
    title: "Cloud & DevOps",
    description: "Scalable infrastructure, CI/CD, and 24/7 reliability.",
    icon: Cloud,
    gradient: "from-sky-400 to-indigo-500",
    href: "/Services#cloud-devops",
    badge: "AWS · Vercel · Docker",
  },
];

// --- Component: Service Card ---
const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className="group relative h-full"
      style={{ perspective: 1000 }}
    >
      <Link to={service.href} className="block h-full">
        {/* Glowing Orb Background */}
        <motion.div
          className={cn(
            "absolute -inset-8 rounded-3xl blur-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 bg-gradient-to-br",
            service.gradient
          )}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Glass Card */}
        <div className="relative h-full min-h-[340px] flex flex-col bg-gray-900/70 backdrop-blur-2xl rounded-3xl p-8 border border-gray-800/50 shadow-2xl overflow-hidden">
          {/* Gradient Top Bar */}
          <div
            className={cn(
              "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
              service.gradient
            )}
          />

          {/* Icon with Animation */}
          <motion.div
            className="mb-6 inline-block w-fit"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              className={cn(
                "p-4 rounded-2xl bg-gradient-to-br bg-opacity-20",
                service.gradient
              )}
            >
              <service.icon className="w-9 h-9 text-white" strokeWidth={2} />
            </div>
          </motion.div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-white mb-3 font-poppins tracking-tight">
            {service.title}
          </h3>
          <p className="text-gray-300 leading-relaxed font-light text-base">
            {service.description}
          </p>

          {/* Main Content Area — equal height across all 6 cards */}
          <div className="flex-1 flex flex-col justify-end mt-4">
            {service.details ? (
              <div className="space-y-2.5">
                <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Key Checks
                </div>
                {service.details.map((detail, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-base text-gray-200"
                  >
                    <Zap size={16} className="text-orange-400 shrink-0" />
                    {detail}
                  </div>
                ))}
              </div>
            ) : (
              <div className="hidden group-hover:flex flex-col gap-2 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                <CheckCircle2 size={20} className="text-cyan-400" />
                <span className="text-base font-medium text-cyan-400">
                  {service.badge}
                </span>
              </div>
            )}
          </div>

          {/* Arrow CTA */}
          <div className="mt-6 flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
            <span className="text-base font-medium">Explore</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>

          {/* Hover Sparkles */}
          <Sparkles className="absolute top-6 right-6 w-6 h-6 text-white opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  );
};

// --- Main Section ---
const ServiceSection = () => {
  return (
    <section id="services" className="relative py-32 overflow-hidden bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-purple-900/10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            Expertise
          </span>
          <h2 className="font-bold text-5xl md:text-7xl text-white mb-6 tracking-tight">
            Solutions that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              scale.
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            From rapid prototyping to enterprise architecture, we cover the full
            spectrum of digital product engineering.
          </p>
        </motion.div>

        {/* 3-column, 2-row grid — matches reference size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA Text */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm">
            Don't see what you need?{" "}
            <a href="#contact" className="text-cyan-400 hover:underline">
              Let's build it custom.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
