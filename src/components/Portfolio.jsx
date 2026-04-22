"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Trophy,
  Users,
  Star,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import alexpert from "../assets/clients/ai.png";
import bharatxin from "../assets/clients/bxi.png";
import bharatve from "../assets/clients/bxv.png";
import castor from "../assets/clients/cg.png";
import ecotwist from "../assets/clients/eco.png";
import finigen from "../assets/clients/finigen.png";
import getfit from "../assets/clients/getfit.png";
import homeasy from "../assets/clients/homeasy (2).png";
import kynyx from "../assets/clients/kynyx.png";
import sumedha from "../assets/clients/sume.png";
import udyam from "../assets/clients/uda.png";

const projects = [
  {
    id: 1,
    title: "Homeasy – Smart Home IoT Platform",
    description:
      "AI-powered smart home ecosystem connecting 100+ devices with voice control, automation, and military-grade security.",
    tags: ["app-development", "iot"],
    images: ["/app.png", "/he2.png", "/he3.png", "/he4.png"],
    link: "https://homeasy.io/",
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    id: 2,
    title: "EcoTwist – Sustainable E-commerce",
    description:
      "Carbon-neutral e-commerce platform with dynamic pricing, AI recommendations, and 3-second load times.",
    tags: ["web-development", "ecommerce"],
    images: [ecotwist],
    link: "https://ecotwist.in/",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: 3,
    title: "AIExpertsLab – AI Solutions Company",
    description:
      "Advanced AI solutions provider specializing in machine learning models and automation.",
    tags: ["ai", "web-development", "machine-learning", "UI/UX-Design"],
    images: [alexpert],
    link: "https://aixpertslabs.com/",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    id: 4,
    title: "BharatX Ventures – Startup Incubator",
    description:
      "Supporting startups with funding, mentorship, and scalable growth strategies.",
    tags: ["startup", "web-development", "venture"],
    images: [bharatve],
    link: "https://bharatxventures.com/",
    gradient: "from-yellow-500 to-red-500",
  },
  {
    id: 5,
    title: "BharatX Infratech – Infrastructure Solutions",
    description:
      "Focused on smart cities and sustainable infrastructure development.",
    tags: ["web-development", "infrastructure"],
    images: [bharatxin],
    link: "https://bharatxinfratech.com/",
    gradient: "from-gray-600 to-gray-900",
  },
  {
    id: 6,
    title: "CastorsGlobal – Trade & Logistics",
    description:
      "Global logistics platform with real-time tracking and analytics.",
    tags: ["web-development", "logistics"],
    images: [castor],
    link: "https://castersglobal.com/",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 7,
    title: "Sumedha Agro – Smart Agriculture",
    description: "AI + IoT powered agriculture platform for precision farming.",
    tags: ["web-development", "agriculture", "iot"],
    images: [sumedha],
    link: "https://sumedhaagro.com/",
    gradient: "from-lime-500 to-green-700",
  },
  {
    id: 8,
    title: "Udyam Tatva – Founder Ecosystem",
    description:
      "Helping founders from idea to execution with tools and mentorship.",
    tags: ["web-development", "startup"],
    images: [udyam],
    link: "https://udyam-tatva.vercel.app/",
    gradient: "from-orange-500 to-red-600",
  },
 
];

const filters = [
  "all",
  "app-development",
  "web-development",
  "UI/UX-Design",
  "ecommerce",
  "iot",
];

export default function UltimatePortfolio() {
  const [filter, setFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(filter));

  return (
    <section className="relative bg-black overflow-hidden">
      {/* Hero */}
      <div className="relative py-32 text-center">
        <h1 className="font-poppins font-extrabold text-7xl md:text-9xl tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Our Work
          </span>
          <br />
          <span className="text-6xl md:text-8xl text-white/90">
            Speaks Louder
          </span>
        </h1>
        <p className="mt-10 text-2xl md:text-3xl text-gray-400 font-light max-w-5xl mx-auto">
          We don't just build projects — we launch{" "}
          <span className="text-cyan-400 font-bold">digital revolutions</span>
        </p>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span
                className={`relative z-10 transition-all ${
                  filter === f ? "text-white" : "text-gray-500"
                }`}
              >
                {f === "all"
                  ? "All Projects"
                  : f
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
              {filter === f && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isHovered={hoveredCard === project.id}
              onHover={() => setHoveredCard(project.id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>
      </div>

      {/* Trust Stats */}
      <div className="py-32 bg-gradient-to-b from-transparent via-purple-900/20 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-5xl md:text-7xl font-bold mb-20">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
              Trusted by Visionaries
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              {
                icon: Trophy,
                value: 50,
                label: "Projects Launched",
                suffix: "+",
              },
              { icon: Users, value: 35, label: "Happy Clients", suffix: "+" },
              { icon: Star, value: 5.0, label: "Perfect Rating", suffix: "" },
              {
                icon: Zap,
                value: 100,
                label: "On-Time Delivery",
                suffix: "%",
              },
            ].map((stat, i) => (
              <StatCard key={i} stat={stat} delay={i * 0.2} />
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-32 text-center relative overflow-hidden">
        <h2 className="text-6xl md:text-8xl font-black text-white mb-10">
          Your Success Story
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Starts Here
          </span>
        </h2>
        <Link to="/contact">
          <button className="group relative px-16 py-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-2xl font-bold rounded-full shadow-3xl overflow-hidden transition-transform hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-4">
              Launch Your Project{" "}
              <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
}

// Project Card — no 3D tilt, no AnimatePresence, clean hover
const ProjectCard = ({ project, index, isHovered, onHover, onLeave }) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (project.images.length > 1) {
      const interval = setInterval(() => {
        setImgIndex((prev) => (prev + 1) % project.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="relative group cursor-pointer bg-gray-900/80 backdrop-blur-2xl rounded-3xl overflow-hidden border border-gray-800 shadow-2xl transition-transform duration-300 hover:-translate-y-2"
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.images[imgIndex]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h3 className="text-2xl font-bold text-white drop-shadow-2xl">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="p-8">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {project.description}
          </p>
          <div
            className={`flex items-center gap-4 text-cyan-400 font-bold text-xl transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            View Live <ArrowRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </a>
  );
};

// Stat Card — count-up animation on scroll (no framer-motion)
const StatCard = ({ stat, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(stat.value);
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
    }
  }, [inView, stat.value]);

  return (
    <div
      ref={ref}
      className="bg-white/5 backdrop-blur-2xl rounded-3xl p-10 border border-white/10 text-center"
    >
      <stat.icon className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
      <div className="text-6xl font-black text-white">
        {count}
        {stat.suffix}
      </div>
      <div className="text-gray-400 mt-3 text-lg">{stat.label}</div>
    </div>
  );
};