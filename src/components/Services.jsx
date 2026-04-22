"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Code2,
  Smartphone,
  TrendingUp,
  Palette,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

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
    glow: "shadow-cyan-500/60",
    icon: <Code2 className="w-10 h-10" />,
    image: "webdev.png",
  },
  {
    title: "Mobile App Development",
    description:
      "Native iOS & Android apps with flawless UX, offline sync, biometric auth, and App Store domination.",
    deliverables: [
      "iOS Native Apps",
      "Android Native Apps",
      "Cross-Platform (React Native)",
      "App Store Optimization",
    ],
    technologies: [
      "SwiftUI",
      "Kotlin Multiplatform",
      "React Native",
      "Firebase / Supabase",
    ],
    gradient: "from-purple-500 to-pink-600",
    glow: "shadow-purple-500/60",
    icon: <Smartphone className="w-10 h-10" />,
    image: "app.png",
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
    technologies: [
      "Google Ads",
      "Meta Ads Manager",
      "Ahrefs / SEMrush",
      "GA4 / Looker Studio",
    ],
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/60",
    icon: <TrendingUp className="w-10 h-10" />,
    image: "digital.png",
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
    technologies: ["Figma", "Framer", "Adobe Suite", "Spline 3D"],
    gradient: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/60",
    icon: <Palette className="w-10 h-10" />,
    image: "designui.png",
  },
];

export default function UltimateServices() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Inside your component

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);

  return (
    <>
      {/* Floating Background Orbs */}
      <motion.div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 right-32 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl"
        />
      </motion.div>

      <section
        ref={sectionRef}
        className="relative bg-black overflow-hidden py-32"
      >
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32 relative z-10"
          style={{ opacity }}
        >
          <motion.h1 className="font-poppins font-extrabold text-7xl md:text-9xl tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
              Our Services
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-2xl md:text-3xl text-gray-300 font-light max-w-5xl mx-auto leading-relaxed px-6"
          >
            We don’t just deliver projects — we architect{" "}
            <span className="text-cyan-400 font-bold">digital empires</span>
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {services.map((service, index) => (
            <ServiceRow
              key={index}
              service={service}
              index={index}
              isReversed={index % 2 === 1}
              isHovered={hoveredIndex === index}
              onHover={setHoveredIndex}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-40 relative z-10"
        >
          <motion.h2 className="font-poppins font-bold text-5xl md:text-7xl text-white mb-8">
            Ready to <span className="text-cyan-400">Dominate</span> Your
            Industry?
          </motion.h2>

          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-16 py-8 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-2xl font-bold rounded-full shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                Start Your Project{" "}
                <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5 }}
              />
              <Sparkles className="absolute -top-6 -right-6 w-24 h-24 text-white/20" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}

// Individual Service Row with 3D Tilt & Glassmorphism
const ServiceRow = ({
  service,
  index,
  isReversed,
  isHovered,
  onHover,
  onLeave,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.2 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      {/* Text Side */}
      <motion.div
        className="relative"
        whileHover={{ x: isHovered ? (isReversed ? 20 : -20) : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Glow Orb */}
        <motion.div
          className={`absolute -inset-10 rounded-3xl blur-3xl opacity-0 ${service.gradient}`}
          animate={{ opacity: isHovered ? 0.7 : 0 }}
        />

        <div className="relative bg-gray-900/70 backdrop-blur-3xl rounded-3xl p-12 border border-gray-800/50 shadow-2xl">
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mb-8"
          >
            <div className="inline-block p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-inner">
              <div className={`text-cyan-400`}>{service.icon}</div>
            </div>
          </motion.div>

          <h3 className="font-poppins font-bold text-5xl md:text-6xl text-white mb-6">
            {service.title}
          </h3>
          <p className="text-xl text-gray-300 font-light leading-relaxed mb-10">
            {service.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6" /> Deliverables
              </h4>
              <ul className="space-y-3">
                {service.deliverables.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-gray-300 flex items-center gap-3"
                  >
                    <Zap className="w-4 h-4 text-cyan-400" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-purple-400 font-bold text-lg mb-4 flex items-center gap-3">
                <Sparkles className="w-6 h-6" /> Tech Stack
              </h4>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-4 py-2 bg-gray-800/70 backdrop-blur rounded-full text-sm text-gray-300 border border-gray-700"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Image Side */}
      <motion.div
        className="relative group"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <motion.div
            className={`absolute inset-0 ${service.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-1000`}
          />
          <div className="absolute bottom-8 left-8 right-8 z-20">
            <motion.h4
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold text-white drop-shadow-2xl"
            >
              {service.title.split(" ")[0]} Excellence
            </motion.h4>
          </div>
        </div>

        {/* Hover Sparkles */}
        {isHovered && (
          <>
            <Sparkles className="absolute top-10 right-10 w-16 h-16 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute bottom-10 left-10 w-12 h-12 text-purple-400 animate-spin" />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
