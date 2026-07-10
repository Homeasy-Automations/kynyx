"use client";

import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  Code2,
  Smartphone,
  TrendingUp,
  ArrowRight,
  SearchCheck,
  CheckCircle2,
  Zap,
} from "lucide-react";

// --- Utility ---
const cn = (...inputs) => inputs.filter(Boolean).join(" ");

// --- Data ---
const services = [
  {
    id: "web",
    title: "Custom Web Development",
    description: "High-performance, scalable SaaS and marketing platforms.",
    icon: Code2,
    gradient: "from-cyan-500 to-blue-600",
    layout: "md:col-span-2", // Wide Card
    href: "/Services/WebDev", // Link to Services section
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "Native iOS & Android with flawless UX.",
    icon: Smartphone,
    gradient: "from-purple-500 to-pink-600",
    layout: "md:col-span-1", // Standard Card
    href: "/Services#mobile-development", // Link to Services section
  },
  {
    id: "audit",
    title: "Website Audit",
    description: "Deep technical audits for SEO, security, and performance.",
    icon: SearchCheck,
    gradient: "from-orange-500 to-red-600",
    layout: "md:row-span-2 md:col-span-1",
    href: "/Services/AuditLanding", // Link to Services section
    // Tall Card (Hero)
    // Extra data for Audit
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
    gradient: "from-emerald-500 to-teal-600",
    layout: "md:col-span-2", // Wide Card
    href: "/Services#digital-marketing", // Link to Services section
  },
];

// --- Component: Spotlight Card Wrapper ---
function CardWrapper({ className, children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn("group relative", className)}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}

// --- Component: Service Card ---
const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <CardWrapper className={cn(service.layout, "h-full")}>
      <Link to={service.href} className="block h-full">
      
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative h-full bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors duration-300"
      >
        {/* Gradient Top Bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`}
        />

        <div className="p-8 h-full flex flex-col relative z-10">
          {/* Header */}
          <div className="mb-6">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg mb-4`}
            >
              <service.icon size={24} />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col justify-end">
            {service.details ? (
              // Special View for Audit Card (Reveal Details)
              <div className="space-y-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Key Checks
                </div>
                {service.details.map((detail, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ x: 0 }}
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <Zap size={14} className="text-orange-400" />
                    {detail}
                  </motion.div>
                ))}
              </div>
            ) : (
              // Standard View for others
              <div className="hidden group-hover:flex flex-col gap-2 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                <CheckCircle2 size={20} className="text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">
                  Available for Q4 2023
                </span>
              </div>
            )}
          </div>

          {/* Arrow CTA */}
          <motion.div className="mt-6 flex items-center gap-2 text-white/50 group-hover:text-white transition-colors">
            <span className="text-sm font-medium">Explore</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.div>
        </div>
      </motion.div>
      </Link>
    </CardWrapper>
  );
};

// --- Main Section ---
const ServiceSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 overflow-hidden"
    >
      {/* Background Grid & Gradient */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div style={{ y, opacity }} className="text-center mb-20">
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

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(280px,auto)]">
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
