"use client";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
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
} from "lucide-react";

// --- Utility ---
const cn = (...inputs) => inputs.filter(Boolean).join(" ");

// --- Data --- (6 services, all equally sized, each with its own background photo)
const services = [
  {
    id: "web",
    title: "Custom Web Development",
    description: "High-performance, scalable SaaS and marketing platforms.",
    icon: Code2,
    gradient: "from-cyan-500 to-blue-600",
    href: "/Services/WebDev",
    badge: "Available for Q4 2023",
    bgImage:
      "https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "Native iOS & Android with flawless UX.",
    icon: Smartphone,
    gradient: "from-purple-500 to-pink-600",
    href: "/Services#mobile-development",
    badge: "iOS & Android ready",
    bgImage:
      "https://images.pexels.com/photos/409581/pexels-photo-409581.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
  },
  {
    id: "audit",
    title: "Website Audit",
    description: "Deep technical audits for SEO, security, and performance.",
    icon: SearchCheck,
    gradient: "from-orange-500 to-red-600",
    href: "/Services/AuditLanding",
    details: [
      "Core Web Vitals",
      "Security Headers",
      "SEO Crawl",
      "Accessibility",
    ],
    bgImage:
      "https://images.pexels.com/photos/207580/pexels-photo-207580.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description: "Data-driven growth strategies and content.",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-600",
    href: "/Services#digital-marketing",
    badge: "Data-driven results",
    bgImage:
      "https://images.pexels.com/photos/7567236/pexels-photo-7567236.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
  },
  {
    id: "uiux",
    title: "UI/UX Design & Branding",
    description: "Pixel-perfect interfaces and unforgettable UX.",
    icon: Palette,
    gradient: "from-rose-500 to-pink-600",
    href: "/Services#uiux-design",
    badge: "Figma-first workflow",
    bgImage:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
  },
  {
    id: "devops",
    title: "Cloud & DevOps",
    description: "Scalable infrastructure, CI/CD, and 24/7 reliability.",
    icon: Cloud,
    gradient: "from-sky-500 to-indigo-600",
    href: "/Services#cloud-devops",
    badge: "AWS · Vercel · Docker",
    bgImage:
      "https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
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
      className={cn("group relative h-full", className)}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-20"
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
    <CardWrapper>
      <Link to={service.href} className="block h-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.08 }}
          className="relative h-full min-h-[220px] bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors duration-300"
        >
          {/* Background Image — subtle, text-safe */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.32] group-hover:opacity-[0.45] group-hover:scale-105 transition-all duration-500"
            style={{ backgroundImage: `url(${service.bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-gray-950/65 to-gray-950/90" />

          {/* Gradient Top Bar */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} z-10`}
          />

          <div className="p-5 h-full flex flex-col relative z-10">
            {/* Header */}
            <div className="mb-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className={`w-9 h-9 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg mb-3`}
              >
                <service.icon size={18} />
              </motion.div>
              <h3 className="text-base font-bold text-white mb-1.5">
                {service.title}
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Main Content Area — equal height across all 6 cards */}
            <div className="flex-1 flex flex-col justify-end">
              {service.details ? (
                // Special View for Audit Card (Reveal Details)
                <div className="space-y-1.5">
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Key Checks
                  </div>
                  {service.details.map((detail, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ x: 0 }}
                      key={i}
                      className="flex items-center gap-2 text-xs text-gray-200"
                    >
                      <Zap size={12} className="text-orange-400" />
                      {detail}
                    </motion.div>
                  ))}
                </div>
              ) : (
                // Standard View for others
                <div className="hidden group-hover:flex flex-col gap-1.5 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                  <CheckCircle2 size={16} className="text-cyan-400" />
                  <span className="text-xs font-medium text-cyan-400">
                    {service.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Arrow CTA */}
            <motion.div className="mt-3 flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
              <span className="text-xs font-medium">Explore</span>
              <ArrowRight
                size={14}
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
      className="relative py-16 overflow-hidden"
    >
      {/* Background Grid & Gradient */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div style={{ y, opacity }} className="text-center mb-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            Expertise
          </span>
          <h2 className="font-bold text-3xl md:text-5xl text-white mb-3 tracking-tight">
            Solutions that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              scale.
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto font-light">
            From rapid prototyping to enterprise architecture, we cover the full
            spectrum of digital product engineering.
          </p>
        </motion.div>

        {/* Equal 3-column grid — all 6 cards identical size, perfectly balanced 2x3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA Text */}
        <div className="mt-10 text-center">
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