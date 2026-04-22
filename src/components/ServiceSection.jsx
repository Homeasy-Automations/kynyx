'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  Code2, 
  Smartphone, 
  TrendingUp,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// Animated SVG Icons with stroke drawing
const AnimatedIcon = ({ children, isHovered }) => {
  return (
    <motion.div
      animate={{ rotate: isHovered ? 360 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      <motion.svg
        className="w-8 h-8 text-cyan-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isHovered ? 1 : 0.3 }}
        transition={{ duration: 1.2 }}
      >
        {children}
      </motion.svg>
      {isHovered && (
        <motion.div
          className="absolute inset-0 -m-2 bg-cyan-500/20 rounded-full blur-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{ duration: 0.8 }}
        />
      )}
    </motion.div>
  );
};

const services = [
  {
    title: "Custom Web Development",
    description: "Fast, secure, scalable web apps built with modern frameworks and best practices.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    ),
    gradient: "from-cyan-500 to-blue-500",
    delay: 0.1,
  },
  {
    title: "Mobile App Development",
    description: "Native iOS & Android apps with buttery-smooth UX and offline support.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    ),
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2,
  },
  {
    title: "Digital Marketing Strategy",
    description: "Data-driven SEO, content, and paid ads to skyrocket your growth.",
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </>
    ),
    gradient: "from-emerald-500 to-teal-500",
    delay: 0.3,
  },
];

const ServiceCard = ({ service, index, isHovered, onHover, onLeave }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: service.delay }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      className="relative group"
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Glow Background */}
      <motion.div
        className={cn(
          "absolute -inset-4 rounded-3xl blur-3xl transition-all duration-700",
          isHovered ? "opacity-70" : "opacity-0",
          service.gradient
        )}
        animate={{ scale: isHovered ? 1.3 : 1 }}
      />

      {/* Card */}
      <motion.div
        className={cn(
          "relative bg-gray-800/90 backdrop-blur-2xl p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer",
          isHovered
            ? "border-cyan-500/70 shadow-2xl shadow-cyan-500/40 scale-105"
            : "border-gray-700 hover:border-cyan-500/40"
        )}
        whileHover={{ y: -12 }}
        style={{
          rotateY: isHovered ? (index === 1 ? 8 : -8) : 0,
          rotateX: isHovered ? -5 : 0,
        }}
      >
        {/* Icon Container */}
        <div className="mb-6 relative">
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-2xl w-16 h-16 flex items-center justify-center shadow-inner">
            <AnimatedIcon isHovered={isHovered}>
              {service.icon}
            </AnimatedIcon>
          </div>
          {isHovered && (
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
          )}
        </div>

        {/* Title */}
        <h3 className="font-poppins font-bold text-2xl text-white mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-base leading-relaxed font-light">
          {service.description}
        </p>

        {/* CTA Arrow */}
        <motion.div
          className="mt-6 flex items-center gap-2 text-cyan-400 font-medium"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: isHovered ? 0 : -20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span>Learn more</span>
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ServiceSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-gradient-to-b from-gray-900 via-cyan-900/10 to-gray-900 py-32 overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/30 via-purple-600/20 to-pink-600/30 blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
          style={{ opacity }}
        >
          <h2 className="font-poppins font-bold text-5xl md:text-7xl text-white tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Our Services
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            End-to-end digital solutions that <span className="text-cyan-400 font-semibold">build</span>, <span className="text-purple-400 font-semibold">launch</span>, and <span className="text-pink-400 font-semibold">grow</span> your business.
          </p>
        </motion.div>

        {/* Services Grid - Asymmetrical */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Card */}
          <div className="lg:col-span-1">
            <ServiceCard
              service={services[0]}
              index={0}
              isHovered={hoveredIndex === 0}
              onHover={setHoveredIndex}
              onLeave={() => setHoveredIndex(null)}
            />
          </div>

          {/* Center Card - Larger */}
          <div className="lg:col-span-1 lg:row-span-2 lg:translate-y-8">
            <ServiceCard
              service={services[1]}
              index={1}
              isHovered={hoveredIndex === 1}
              onHover={setHoveredIndex}
              onLeave={() => setHoveredIndex(null)}
            />
          </div>

          {/* Right Card */}
          <div className="lg:col-span-1">
            <ServiceCard
              service={services[2]}
              index={2}
              isHovered={hoveredIndex === 2}
              onHover={setHoveredIndex}
              onLeave={() => setHoveredIndex(null)}
            />
          </div>
        </div>

        {/* Floating CTA */}
        {/* <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <motion.button
            className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5" />
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
};

// Simple cn utility
const cn = (...inputs) => inputs.filter(Boolean).join(' ');

export default ServiceSection;