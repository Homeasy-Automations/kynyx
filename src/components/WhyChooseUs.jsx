'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Zap, 
  Trophy, 
  HeartHandshake,
  Sparkles
} from 'lucide-react';

const advantages = [
  {
    title: 'US-Based Team',
    description: 'Work with a team in your timezone. Clear communication, cultural alignment, and deep understanding of the US market.',
    icon: MapPin,
    gradient: 'from-cyan-400 to-teal-500',
    delay: 0.1
  },
  {
    title: 'Agile & Transparent',
    description: 'Our agile process means you see progress early and often. Complete transparency — no surprises, no hidden fees.',
    icon: Zap,
    gradient: 'from-purple-400 to-indigo-500',
    delay: 0.2
  },
  {
    title: 'Focus on Quality & ROI',
    description: 'We’re obsessed with quality. Every project is built to deliver measurable results and real return on investment.',
    icon: Trophy,
    gradient: 'from-amber-400 to-orange-500',
    delay: 0.3
  },
  {
    title: 'Long-Term Partnership',
    description: 'Our relationship doesn’t end at launch. We provide ongoing support and maintenance to ensure your success.',
    icon: HeartHandshake,
    gradient: 'from-pink-400 to-rose-500',
    delay: 0.4
  }
];

const AdvantageCard = ({ advantage, index }) => {
  const Icon = advantage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: advantage.delay, ease: "easeOut" }}
      whileHover={{ y: -12 }}
      className="group relative"
      style={{ perspective: 1000 }}
    >
      {/* Glowing Orb Background */}
      <motion.div
        className={`absolute -inset-8 rounded-3xl blur-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 bg-gradient-to-br ${advantage.gradient}`}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Glass Card */}
      <div className="relative bg-gray-900/70 backdrop-blur-2xl rounded-3xl p-8 border border-gray-800/50 shadow-2xl overflow-hidden">
        {/* Gradient Top Bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${advantage.gradient}`} />

        {/* Icon with Animation */}
        <motion.div
          className="mb-6 inline-block"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${advantage.gradient} bg-opacity-20`}>
            <Icon 
              className="w-12 h-12 text-white" 
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: index * 0.2 }}
            />
          </div>
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-3 font-poppins tracking-tight">
          {advantage.title}
        </h3>
        <p className="text-gray-300 leading-relaxed font-light text-base">
          {advantage.description}
        </p>

        {/* Hover Sparkles */}
        <Sparkles className="absolute top-6 right-6 w-6 h-6 text-white opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="relative py-32 overflow-hidden bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-purple-900/10" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              The Kynyx Advantage
            </span>
          </h2>
          <p className="mt-8 text-xl md:text-2xl text-gray-400 font-light max-w-4xl mx-auto leading-relaxed">
            We’re not just another agency. We’re your <span className="text-cyan-400 font-semibold">growth partner</span> built for the long term.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => (
            <AdvantageCard key={index} advantage={advantage} index={index} />
          ))}
        </div>

        {/* Trust Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-gray-500 text-sm tracking-wider flex items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            100% CLIENT RETENTION • US-BASED • DEDICATED SUPPORT
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;