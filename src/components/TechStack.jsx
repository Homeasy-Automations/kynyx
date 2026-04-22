'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Server,
  Smartphone,
  Cpu,
  Cloud,
  Code2,
  Palette,
  Zap,
  Database,
  Blocks,
} from 'lucide-react';

const techStack = [
  { name: 'React', icon: Blocks, color: 'from-cyan-400 to-blue-600' },
  { name: 'Next.js', icon: Globe, color: 'from-gray-300 to-gray-600' },
  { name: 'Node.js', icon: Server, color: 'from-green-400 to-emerald-600' },
  { name: 'Python', icon: Code2, color: 'from-blue-400 to-indigo-600' },
  { name: 'Shopify', icon: Palette, color: 'from-lime-400 to-green-600' },
  { name: 'AWS', icon: Cloud, color: 'from-orange-400 to-yellow-600' },
  { name: 'Java', icon: Cpu, color: 'from-red-500 to-pink-600' },
  { name: 'Swift', icon: Smartphone, color: 'from-purple-400 to-pink-500' },
  { name: 'Kotlin', icon: Database, color: 'from-green-400 to-teal-600' },
  { name: 'TypeScript', icon: Zap, color: 'from-blue-500 to-cyan-400' },
];

const TechCard = ({ tech, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
      style={{ perspective: 1000 }}
    >
      {/* Glowing Background */}
      <motion.div
        className={`absolute -inset-6 rounded-3xl blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 bg-gradient-to-br ${tech.color}`}
        animate={{ scale: isHovered ? 1.3 : 1 }}
      />

      {/* Card */}
      <motion.div
        className="relative p-10 bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-gray-800 shadow-2xl"
        whileHover={{ 
          y: -20,
          rotateY: index % 2 === 0 ? 10 : -10,
          rotateX: 10,
        }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tech.color}`} />

        <motion.div
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 360 : 0 
          }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <Icon className="w-20 h-20 text-white drop-shadow-2xl" strokeWidth={1.5} />
        </motion.div>

        <h3 className="text-center text-2xl font-bold text-white tracking-wider">
          {tech.name}
        </h3>

        {/* Pulse Ring */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-3xl border-4 border-white/20"
            initial={{ scale: 0.9, opacity: 1 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const TechStack = () => {
  return (
    <section id="tech" className="relative py-32 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-cyan-950/10 to-black" />
      <div className="absolute inset-0 bg-grid-white/5" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Tools We Master
            </span>
          </h2>
          <p className="mt-6 text-xl text-gray-400 font-light max-w-4xl mx-auto">
            Cutting-edge technologies we use to build world-class digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 justify-center">
          {techStack.map((tech, i) => (
            <TechCard key={i} tech={tech} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="mt-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        />
      </div>
    </section>
  );
};

export default TechStack;