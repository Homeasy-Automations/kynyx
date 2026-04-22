'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Kynyx has been instrumental in bringing our smart home app vision to life. Their team’s expertise and dedication made the development process seamless and reliable.",
    author: "Ranjana Sinha",
    role: "CEO of Homeasy Automation",
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    quote: "Kynyx delivered a powerful e-commerce platform for EcoTwist. Their web development expertise and attention to detail helped us achieve a smooth, sales-focused website.",
    author: "Richa Sinha",
    role: "Founder of Ecotwist Innovation",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    quote: "Kynyx has transformed our digital presence with strategic marketing and social media management. Their campaigns boosted our brand visibility and audience engagement.",
    author: "Amit K",
    role: "CMO of Homeasy",
    gradient: "from-amber-400 to-orange-500",
  },
];

const Testimonials = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative py-32 overflow-hidden bg-black">
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-purple-900/10" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Loved by Founders
            </span>
          </h2>
          <p className="mt-6 text-xl text-gray-400 font-light max-w-3xl mx-auto">
            Real words from real people who trusted us to build their future.
          </p>
        </motion.div>

        {/* Beautiful Testimonial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative"
            >
              {/* Floating Card */}
              <div className="relative p-10 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-2xl rounded-3xl border border-gray-800/50 shadow-2xl transition-all duration-500 hover:shadow-cyan-500/20 hover:border-cyan-500/30 hover:-translate-y-4">
                {/* Gradient Glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${t.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
                
                {/* Quote Mark */}
                <Quote className="absolute top-8 right-8 w-16 h-16 text-gray-700 opacity-30" />

                {/* Quote */}
                <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-8 relative z-10">
                  {t.quote}
                </p>

                {/* Avatar + Name */}
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.gradient} p-0.5`}>
                    <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center text-xl font-bold text-white">
                      {t.author[0]}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{t.author}</h3>
                    <p className="text-gray-400 text-sm">{t.role}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-20 text-gray-500 text-sm tracking-wider"
        >
          OVER 50+ PROJECTS DELIVERED • 100% CLIENT SATISFACTION
        </motion.p>
      </div>
    </section>
  );
};

export default Testimonials;