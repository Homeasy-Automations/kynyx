"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import { API_URL } from "../../constant";
import MDEditor from "@uiw/react-md-editor";
import { FaSearch, FaClock, FaUser } from "react-icons/fa";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Mail,
  Send,
  Compass,
  MessageSquarePlus,
} from "lucide-react";

const normalizeMarkdown = (content) => content?.replace(/\\n/g, "\n") || "";

export default function UltimateBlog() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", category: "", tag: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const blogsPerPage = 9;

  const navigate = useNavigate();

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/blog`);
        const published = (res.data.data || []).filter((b) => b.status === "published");
        setAllBlogs(published);
        setFilteredBlogs(published);
      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filtering
  const applyFilters = useCallback(() => {
    let filtered = allBlogs;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.content?.replace(/<[^>]+>/g, "").toLowerCase().includes(q)
      );
    }
    if (filters.category) {
      filtered = filtered.filter(
        (b) => b.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }
    if (filters.tag) {
      filtered = filtered.filter((b) =>
        b.tags?.some((t) => t.toLowerCase().includes(filters.tag.toLowerCase()))
      );
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [allBlogs, filters]);

  const debouncedApplyFilters = useCallback(debounce(applyFilters, 300), [applyFilters]);

  useEffect(() => {
    debouncedApplyFilters();
    return () => debouncedApplyFilters.cancel();
  }, [filters, debouncedApplyFilters]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  // How many trailing grid cells are empty on the LAST page, per breakpoint
  // (md = 2 cols, xl = 3 cols). Used to decide which filler cards to show
  // and at which breakpoints, so the grid never trails off into blank space.
  const isLastPage = currentPage === totalPages;
  const n = currentBlogs.length;
  const remainderMd = isLastPage ? (2 - (n % 2)) % 2 : 0;
  const remainderXl = isLastPage ? (3 - (n % 3)) % 3 : 0;

  const fillerVisibility = (position) => {
    const showAtMd = remainderMd >= position;
    const showAtXl = remainderXl >= position;
    return [
      "hidden",
      showAtMd ? "md:flex" : "md:hidden",
      showAtXl ? "xl:flex" : "xl:hidden",
    ].join(" ");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-8 border-t-cyan-500 border-r-purple-600 border-b-pink-600 border-l-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      {/* Floating Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -200, 0],
              x: [0, i % 2 === 0 ? 150 : -150, 0],
            }}
            transition={{ duration: 30 + i * 6, repeat: Infinity, ease: "linear" }}
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, #06b6d4, transparent)"
                  : "radial-gradient(circle, #a855f7, transparent)",
              top: `${15 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>

      <section className="relative bg-black text-white min-h-screen py-32 overflow-hidden">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center mb-32"
        >
          <h1 className="font-extrabold text-7xl md:text-9xl tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
              The Kynyx Blog
            </span>
          </h1>
          <p className="mt-10 text-2xl md:text-4xl text-gray-300 font-light max-w-5xl mx-auto px-6">
            Where <span className="text-cyan-400 font-bold">ideas ignite</span> and{" "}
            <span className="text-purple-400 font-bold">innovation thrives</span>
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-8 items-end">
              <div className="relative">
                <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-16 pr-6 py-5 bg-gray-900/60 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all"
                />
              </div>

              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="px-8 py-5 bg-gray-900/60 border border-gray-700 rounded-2xl text-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/30"
              >
                <option value="">All Categories</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Tutorials">Tutorials</option>
              </select>
            </div>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto px-6">
          {currentBlogs.length === 0 ? (
            <div className="text-center py-40">
              <p className="text-5xl font-bold text-gray-600">No articles found</p>
              <p className="text-2xl text-gray-500 mt-6">Try different filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-12">
              <AnimatePresence mode="popLayout">
                {currentBlogs.map((blog, i) => (
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                    index={i}
                    isHovered={hoveredCard === blog._id}
                    onHover={() => setHoveredCard(blog._id)}
                    onLeave={() => setHoveredCard(null)}
                    onClick={() => navigate(`/blog/${blog.slug}`)}
                  />
                ))}
              </AnimatePresence>

              {/* Filler cards — only appear on the last page, and only at
                  the breakpoints where the row would otherwise trail off
                  into empty space. */}
              <NewsletterFillerCard
                className={fillerVisibility(1)}
                email={newsletterEmail}
                onEmailChange={setNewsletterEmail}
              />
              <ExploreFillerCard className={fillerVisibility(2)} />
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-24">
              {[...Array(totalPages)].map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-14 h-14 rounded-full font-bold text-lg transition-all ${
                    currentPage === i + 1
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-2xl"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {i + 1}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Filler card 1: newsletter capture — fills a single leftover grid slot
const NewsletterFillerCard = ({ className, email, onEmailChange }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${className} flex-col justify-center relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-gray-900/80 to-purple-500/10 backdrop-blur-3xl p-10 h-full`}
  >
    <motion.div
      className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-cyan-500/20 blur-3xl"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="relative">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
        <Mail className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">
        Don't miss the next drop
      </h3>
      <p className="text-gray-400 mb-8">
        New articles on dev, design & growth — straight to your inbox, no spam.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2 bg-gray-900/70 border border-gray-700 rounded-2xl p-2 focus-within:border-cyan-500 transition-colors"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="you@email.com"
          className="flex-1 bg-transparent px-4 py-2 text-white placeholder-gray-500 focus:outline-none text-sm"
        />
        <button
          type="submit"
          className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:scale-105 transition-transform"
          aria-label="Subscribe"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  </motion.div>
);

// Filler card 2: explore / suggest — fills a second leftover grid slot
const ExploreFillerCard = ({ className }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.1 }}
    className={`${className} flex-col justify-center relative rounded-3xl overflow-hidden border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-gray-900/80 to-pink-500/10 backdrop-blur-3xl p-10 h-full`}
  >
    <motion.div
      className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl"
      animate={{ scale: [1.2, 1, 1.2] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="relative">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
        <Compass className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">
        Want something specific?
      </h3>
      <p className="text-gray-400 mb-8">
        Browse everything we build, or tell us what you'd like us to cover
        next.
      </p>

      <div className="flex flex-wrap gap-3">
        <a
          href="/services"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-colors"
        >
          Explore Services <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-sm font-semibold hover:bg-purple-500/30 transition-colors"
        >
          <MessageSquarePlus className="w-4 h-4" /> Suggest a Topic
        </a>
      </div>
    </div>
  </motion.div>
);

// 3D Tilt Card – Pure JSX, No Errors
const BlogCard = ({ blog, index, isHovered, onHover, onLeave, onClick }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="relative cursor-pointer"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        style={{
          rotateX: isHovered ? mousePos.y : 0,
          rotateY: isHovered ? -mousePos.x : 0,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ z: 100 }}
        className="relative bg-gray-900/80 backdrop-blur-3xl rounded-3xl overflow-hidden border border-gray-800 shadow-2xl h-full"
      >
        {/* Glow */}
        <motion.div
          className="absolute -inset-6 bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ scale: isHovered ? 1.5 : 1 }}
        />

        {/* Image */}
        {blog.featuredImage ? (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-cyan-900/40 to-purple-900/40 flex items-center justify-center">
            <Sparkles className="w-24 h-24 text-cyan-400/30" />
          </div>
        )}

        <div className="p-8">
          <div className="flex gap-6 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-2">
              <FaUser className="text-cyan-400" />
              {blog.author?.name || "Kynyx"}
            </span>
            <span className="flex items-center gap-2">
              <FaClock className="text-purple-400" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-4 line-clamp-2">
            {blog.title}
          </h3>

          <div className="text-gray-300 text-base line-clamp-3 mb-8">
            <MDEditor.Markdown
              source={normalizeMarkdown(blog.content?.replace(/<[^>]+>/g, "").substring(0, 140) + "...")}
              style={{ background: "transparent" }}
            />
          </div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: isHovered ? 0 : -50, opacity: isHovered ? 1 : 0 }}
            className="flex items-center gap-4 text-cyan-400 font-bold text-lg"
          >
            Read Article
            <ArrowRight className="w-7 h-7 group-hover:translate-x-4 transition-transform" />
            {isHovered && <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />}
          </motion.div>
        </div>

        {isHovered && (
          <>
            <Sparkles className="absolute top-8 right-8 w-16 h-16 text-yellow-400 animate-spin" />
            <Sparkles className="absolute bottom-8 left-8 w-12 h-12 text-purple-400 animate-pulse" />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
