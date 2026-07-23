"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Trophy,
  Zap,
  Globe,
  Star,
} from "lucide-react";
import BookConsultationForm from "./Getquote";

export default function Hero() {
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    rating: 0,
    uptime: 99,
  });

  // Animated Counter Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        projects: 50,
        clients: 35,
        rating: 5,
        uptime: 99.9,
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background Video */}
        <video
          src="/logo2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />

        {/* Enhanced Glow Orbs */}
        <motion.div
          animate={floatingAnimation}
          className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 2 },
          }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 4 },
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -10,
            }}
            animate={{
              y: window.innerHeight + 10,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}

        {/* Main Content */}
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 flex flex-wrap justify-center items-center gap-4 text-sm"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-white font-medium">US-Based Company</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2 text-white font-medium">5.0 Rating</span>
            </div>
          </motion.div>

          {/* Dynamic Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Top-Rated
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400">
              USA Digital Agency
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light"
          >
            We build{" "}
            <span className="text-cyan-400 font-bold">
              high-performance websites
            </span>
            , mobile apps, and growth-driven marketing campaigns for ambitious
            brands.
          </motion.p>

          {/* Live Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                label: "Projects Delivered",
                value: stats.projects,
                suffix: "+",
                icon: Trophy,
              },
              {
                label: "Happy Clients",
                value: stats.clients,
                suffix: "+",
                icon: Users,
              },
              {
                label: "Client Rating",
                value: stats.rating,
                suffix: "/5",
                icon: Star,
              },
              { label: "Uptime", value: stats.uptime, suffix: "%", icon: Zap },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-4xl font-bold text-white">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Magnetic CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xl font-bold rounded-full shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Get Your Free Consultation
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
              <Sparkles className="absolute -top-4 -right-4 w-16 h-16 text-white/20" />
            </motion.button>

            <p className="mt-6 text-gray-400">
              No obligation • Takes 2 minutes • Limited spots available
            </p>
          </motion.div>
        </div>

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl"
              >
                <BookConsultationForm onClose={() => setShowForm(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
