'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Zap, Palette, Code, Rocket, Volume2, VolumeX } from 'lucide-react';
import { useWindowSize } from 'react-use';
import { Link } from 'react-router-dom';

// Simple cn utility
const cn = (...inputs) => inputs.filter(Boolean).join(' ');

// Sound effect (optional - base64 encoded short pop)
const playSound = () => {
  if (typeof window !== 'undefined' && !document.hidden) {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjV');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  }
};

const approachSteps = [
  {
    step: "1",
    title: "Discovery",
    description: "We listen deeply to your vision and map out a strategic roadmap.",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    details: "Stakeholder interviews • Market analysis • Goal alignment",
  },
  {
    step: "2",
    title: "Design",
    description: "Crafting intuitive, beautiful UI/UX that delights users.",
    icon: Palette,
    color: "from-cyan-500 to-blue-500",
    details: "Wireframes • Prototypes • User testing • Brand integration",
  },
  {
    step: "3",
    title: "Develop",
    description: "Building scalable, clean code with rigorous testing.",
    icon: Code,
    color: "from-emerald-500 to-teal-500",
    details: "Frontend + Backend • CI/CD • Performance optimization",
  },
  {
    step: "4",
    title: "Deploy & Grow",
    description: "Seamless launch with ongoing support and optimization.",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    details: "Cloud deployment • Monitoring • A/B testing • Iteration",
  },
];

const Approach = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hoveredStep, setHoveredStep] = useState(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progress = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 30 });

  const { width } = useWindowSize();
  const isMobile = width < 768;

  // Auto-activate steps on scroll
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const stepIndex = Math.floor(latest * approachSteps.length);
      setActiveStep(Math.min(stepIndex, approachSteps.length - 1));
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const scrollToStep = (index) => {
    const stepElement = document.getElementById(`step-${index}`);
    stepElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

 
  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-cyan-600/20 blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="font-poppins font-bold text-5xl md:text-7xl text-white tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">
              Our Journey
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            Scroll, hover, click — <span className="text-cyan-400 font-semibold">explore every step</span> of how we bring your vision to life.
          </p>
        </motion.div>

        {/* Sound Toggle */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gray-800/80 backdrop-blur-xl rounded-full border border-gray-700 shadow-xl hover:shadow-purple-500/50 transition-all"
          onClick={() => setSoundEnabled(!soundEnabled)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5 text-cyan-400" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
        </motion.button>

        {/* Interactive Timeline */}
        <div className="relative">
          {/* SVG Path */}
          <motion.svg
            className="absolute left-0 right-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 700"
            style={{ opacity: smoothProgress }}
          >
            <motion.path
              d="M 100,350 Q 350,200 600,350 T 1100,350"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              style={{ pathLength: smoothProgress }}
            />
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8">
                  <animate attributeName="stopOpacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8">
                  <animate attributeName="stopOpacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 items-start">
            {approachSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              const isHovered = hoveredStep === index;

              return (
                <motion.div
                  id={`step-${index}`}
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => scrollToStep(index)}
                  onMouseEnter={() => {
                    setHoveredStep(index);
                    if (soundEnabled) playSound();
                  }}
                  onMouseLeave={() => setHoveredStep(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Glowing Orb */}
                  <motion.div
                    className={cn(
                      "absolute -inset-6 rounded-full blur-3xl transition-all duration-700",
                      (isActive || isHovered) ? "opacity-70" : "opacity-0",
                      step.color
                    )}
                    animate={{
                      scale: (isActive || isHovered) ? [1, 1.4, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Parallax Tilt */}
                  <motion.div
                    className="relative"
                    style={{
                      rotateX: isMobile ? 0 : (index % 2 === 0 ? -8 : 8),
                      rotateY: isMobile ? 0 : (isHovered ? (index % 2 === 0 ? -15 : 15) : 0),
                      transformStyle: "preserve-3d",
                      transition: "all 0.4s ease-out",
                    }}
                  >
                    {/* Card */}
                    <div
                      className={cn(
                        "relative bg-gray-800/90 backdrop-blur-2xl p-8 rounded-3xl border-2 transition-all duration-500",
                        isActive
                          ? "border-purple-500/70 shadow-2xl shadow-purple-500/40"
                          : "border-gray-700 hover:border-purple-500/40"
                      )}
                    >
                      {/* Step Circle */}
                      <motion.div
                        className={cn(
                          "w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold shadow-xl",
                          isActive
                            ? "bg-gradient-to-r text-white"
                            : "bg-gray-700 text-gray-400",
                          step.color
                        )}
                        animate={{
                          scale: isActive ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {step.step}
                      </motion.div>

                      <Icon className={cn("w-10 h-10 mx-auto mt-4 transition-all duration-500", isActive ? "text-white" : "text-gray-500")} />

                      <h3 className="mt-4 font-poppins font-bold text-xl md:text-2xl text-white text-center">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm md:text-base text-gray-400 text-center leading-relaxed font-light">
                        {step.description}
                      </p>

                      {/* Active Pulse */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-3xl border-2 border-purple-500/50"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Hover Tooltip */}
                  {isHovered && !isMobile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-xl px-6 py-3 rounded-2xl border border-purple-500/50 shadow-2xl whitespace-nowrap z-50"
                    >
                      <p className="text-sm text-cyan-300 font-medium">{step.details}</p>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-purple-500/50" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-32"
        >
          <p className="text-gray-400 text-lg mb-6">Ready to begin?</p>
         <Link to="/contact">
          <motion.button
           
            className="px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Let’s Build Together
          </motion.button>
         </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Approach;