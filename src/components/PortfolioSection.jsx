"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  useTransition,
} from "react";
import {
  X,
  Github,
  ExternalLink,
  Copy,
  Check,
  Code2,
  AlertTriangle,
  Zap,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import collabuilder from "../assets/clients/colla.png";
import ecotwist from "../assets/clients/eco.png";


// Simple cn utility
const cn = (...inputs) => inputs.filter(Boolean).join(" ");

// Reusable Project Card
const ProjectCard = memo(({ project, onOpen }) => {
  const [copied, setCopied] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-gray-800 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
      onClick={() => onOpen(project)}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-30",
          project.color
        )}
      />

      {/* Image with skeleton */}
      <div className="aspect-[16/9] overflow-hidden bg-gray-700">
        {!imageLoaded && (
          <div className="h-full w-full bg-gray-600 animate-pulse" />
        )}
        <img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110",
            !imageLoaded && "opacity-0"
          )}
        />
      </div>

      <div className="relative z-10 p-6">
        <h3 className="mb-2 font-poppins text-2xl font-bold text-white">
          {project.title}
        </h3>
        <p className="mb-4 text-gray-300 line-clamp-2">{project.description}</p>

        {/* Tech Stack */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-700 text-gray-200 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-3 py-1 bg-gray-700 text-gray-200 text-sm rounded-full">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm">
          {project.githubRepo && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(project.githubRepo, "github");
              }}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
            >
              {copied === "github" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Github className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">GitHub</span>
            </button>
          )}
          {project.liveDemo && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(project.liveDemo, "demo");
              }}
              className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
            >
              {copied === "demo" ? (
                <Check className="h-4 w-4" />
              ) : (
                <ExternalLink className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Demo</span>
            </button>
          )}
        </div>

        <button
          className="mt-5 w-full px-4 py-2 bg-white text-gray-900 font-poppins font-medium rounded-full hover:bg-gray-100 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(project);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
});
ProjectCard.displayName = "ProjectCard";

const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isPending, startTransition] = useTransition();
  const modalRef = useRef(null);

  const tabs = ["overview", "challenge", "solution", "tech stack", "results"];

  const handleTabChange = (tab) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  const projects = [
    {
      title: "Homeasy Automation",
      description:
        "Smart home platform unifying all IoT devices with real-time control and automation.",
      image: "/app.png",
      alt: "Homeasy Smart Home App",
      color: "from-cyan-500 to-teal-400",
      techStack: [
        "React Native",
        "Node.js",
        "MQTT",
        "AWS IoT",
        "Zigbee",
        "Redis",
      ],
      githubRepo: "https://github.com/example/homeasy",
      liveDemo: "https://homeasy.example.com",
      overview:
        "HOMEASY integrates lighting, climate, security, and appliances into a single secure mobile app with voice control and AI automation.",
      challenge:
        "Device fragmentation, real-time sync across 50+ protocols, and enterprise-grade security.",
      solution:
        "Built a protocol-agnostic gateway using MQTT + AWS IoT Core. React Native frontend with offline-first architecture.",
      results:
        "99.9% uptime • 50% faster device pairing • 300% increase in user retention • Featured in CES 2025",
    },
    {
      title: "Ecotwist Innovations",
      description:
        "Sustainable e-commerce platform with lightning-fast checkout and AI recommendations.",
      image: ecotwist,
      alt: "EcoTwist E-commerce",
      color: "from-purple-600 to-indigo-500",
      techStack: [
        "Next.js",
        "TypeScript",
        "Stripe",
        "MongoDB",
        "Redis",
        "Tailwind",
      ],
      githubRepo: "https://github.com/example/ecotwist",
      liveDemo: "https://ecotwist.example.com",
      overview:
        "EcoTwist sells eco-friendly products with carbon-neutral shipping, dynamic pricing, and personalized storefronts.",
      challenge:
        "Sub-second page loads with 100k+ SKUs and handling flash sales with 15k concurrent users.",
      solution:
        "Next.js App Router + Edge Functions, ISR for product pages, Redis caching, Stripe Elements with webhooks.",
      results:
        "0.8s avg load time • 43% conversion uplift • $2.1M GMV in first quarter • 99.99% payment success",
    },
    {
      title: "Collabuilder Collaboration Platform",
      description:
        "Smart construction collaboration platform designed to streamline project management, communication, and team workflows.",
      image: collabuilder,
      alt: "Collabuilder Project Management Dashboard",
      color: "from-blue-500 to-cyan-500",
      techStack: [
        "Next.js",
        "TypeScript",
        "Stripe",
        "MongoDB",
        "Redis",
        "Tailwind",
      ],
      githubRepo: "https://github.com/example/collabuilder",
      liveDemo: "https://collabuilder.com/",
      overview:
        "Collabuilder enables construction teams and enterprises to manage projects efficiently through centralized communication, real-time updates, and workflow tracking.",
      challenge:
        "Simplifying complex construction workflows while maintaining clarity across multiple stakeholders like contractors, engineers, and managers.",
      solution:
        "Built a clean, intuitive platform with centralized dashboards, real-time collaboration tools, and structured workflow pipelines for seamless project execution.",
      results:
        "Improved team coordination • Reduced project delays • Better transparency • Scalable workflow system for large construction projects",
    },

  ];

  const openModal = useCallback((project) => {
    setSelectedProject(project);
    setActiveTab("overview");
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  }, []);

  // Keyboard & click outside
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKey);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, closeModal]);

  return (
    <section
      id="portfolio"
      className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 py-24 scroll-mt-24"
    >
      <div className="container mx-auto px-6">
        {/* Hero Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Our Work
            </span>
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-gray-400 font-light max-w-4xl mx-auto">
            We don’t just code — we <span className="text-cyan-400 font-bold">transform businesses</span>.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} onOpen={openModal} />
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="w-full max-w-4xl bg-gray-900 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            {/* Hero Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-6 left-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white font-poppins">
                  {selectedProject.title}
                </h1>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Premium Tabs */}
              <div className="relative mb-10">
                {/* Tab Container */}
                <div className="flex bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    const Icon = {
                      overview: Code2,
                      challenge: AlertTriangle,
                      solution: Zap,
                      "tech stack": null,
                      results: Trophy,
                    }[tab];

                    return (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={cn(
                          "relative z-10 flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm md:text-base font-semibold capitalize transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-xl",
                          isActive
                            ? "text-white"
                            : "text-gray-400 hover:text-gray-200"
                        )}
                        style={{ minWidth: 0 }} // Allows flex-1 to shrink
                      >
                        {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                        <span className="truncate">
                          {tab === "tech stack" ? "Tech Stack" : tab}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Animated Sliding Background (Blur Layer) */}
                <div
                  className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 opacity-70 blur-xl transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(${tabs.indexOf(activeTab) * 100}%)`,
                    width: `${100 / tabs.length}%`,
                  }}
                />

                {/* Animated Sliding Background (Solid Layer) */}
                <div
                  className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-400 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(${tabs.indexOf(activeTab) * 100}%)`,
                    width: `${100 / tabs.length}%`,
                  }}
                />
              </div>

              {/* Content */}
              <div
                key={activeTab}
                className={cn(
                  "transition-opacity duration-300",
                  isPending ? "opacity-70" : "opacity-100"
                )}
              >
                {/* OVERVIEW */}
                {activeTab === "overview" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 p-6 rounded-2xl border border-teal-500/20">
                      <p className="text-lg md:text-xl leading-relaxed text-gray-100 font-light">
                        {selectedProject.overview}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {selectedProject.githubRepo && (
                        <a
                          href={selectedProject.githubRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                          <div className="p-2 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                            <Github className="w-5 h-5 text-teal-400" />
                          </div>
                          <span className="font-semibold text-white">
                            View Source Code
                          </span>
                        </a>
                      )}
                      {selectedProject.liveDemo && (
                        <a
                          href={selectedProject.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                          <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                            <ExternalLink className="w-5 h-5" />
                          </div>
                          <span>Launch Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* CHALLENGE */}
                {activeTab === "challenge" && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="flex items-start gap-4 p-5 bg-red-500/10 rounded-2xl border border-red-500/30">
                      <div className="p-3 bg-red-500/20 rounded-xl">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                      </div>
                      <p className="text-lg leading-relaxed text-gray-100">
                        {selectedProject.challenge}
                      </p>
                    </div>
                  </div>
                )}

                {/* SOLUTION */}
                {activeTab === "solution" && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="flex items-start gap-4 p-5 bg-green-500/10 rounded-2xl border border-green-500/30">
                      <div className="p-3 bg-green-500/20 rounded-xl">
                        <Zap className="w-6 h-6 text-green-400" />
                      </div>
                      <p className="text-lg leading-relaxed text-gray-100">
                        {selectedProject.solution}
                      </p>
                    </div>
                  </div>
                )}

                {/* TECH STACK */}
                {activeTab === "tech stack" && (
                  <div className="animate-fadeIn">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                      Built With
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {selectedProject.techStack.map((tech, i) => (
                        <div
                          key={i}
                          className="group relative p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                          style={{ transform: "perspective(1000px)" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="relative font-semibold text-white text-center block">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* RESULTS */}
                {activeTab === "results" && (
                  <div className="space-y-6 animate-fadeIn">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent mb-6 flex items-center gap-3">
                      <Trophy className="w-7 h-7 text-yellow-400" />
                      Impact & Results
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {selectedProject.results.split(" • ").map((result, i) => {
                        const [value, ...labelParts] = result.split(" ");
                        const label = labelParts.join(" ");
                        const numeric =
                          parseFloat(value.replace(/[^0-9.]/g, "")) || 100;
                        const percentage = Math.min((numeric / 100) * 100, 100);

                        return (
                          <div
                            key={i}
                            className="group p-5 bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 rounded-2xl border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <p className="text-3xl font-bold text-yellow-400">
                                {value}
                              </p>
                              <div className="p-2 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                                <Trophy className="w-5 h-5 text-yellow-400" />
                              </div>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">
                              {label}
                            </p>
                            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
};

export default PortfolioSection;
