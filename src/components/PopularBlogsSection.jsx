'use client';

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constant";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowRight, Sparkles } from "lucide-react";

// Skeleton Loader Component
const BlogSkeleton = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 animate-pulse">
    <div className="h-56 bg-gray-700/50" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-700/50 rounded w-3/4" />
      <div className="h-4 bg-gray-700/50 rounded w-1/2" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-700/50 rounded" />
        <div className="h-4 bg-gray-700/50 rounded w-5/6" />
      </div>
    </div>
  </div>
);

// Reading time estimator
const estimateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

const BlogCard = ({ blog, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const cleanContent = blog.content?.replace(/<[^>]+>/g, "") || "";
  const readingTime = estimateReadingTime(cleanContent);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      whileHover={{ y: -12 }}
      className="group relative"
    >
      {/* Glowing Background */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Main Card */}
      <Link to={`/blog/${blog.slug || blog._id}`} className="block">
        <div className="relative bg-gray-800/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl transition-all duration-500 hover:border-indigo-500/50 hover:shadow-indigo-500/20">
          {/* Featured Image */}
          {blog.featuredImage ? (
            <div className="relative overflow-hidden">
              <motion.img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 right-4">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="h-56 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-indigo-400 opacity-50" />
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-4">
            <h3 className="font-poppins font-bold text-xl md:text-2xl text-white line-clamp-2 group-hover:text-indigo-400 transition-colors">
              {blog.title}
            </h3>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="font-medium text-indigo-400">
                {blog.author || "Kynyx Team"}
              </span>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            <p className="text-gray-300 line-clamp-3 leading-relaxed">
              {cleanContent.slice(0, 140)}...
            </p>

            {/* Read More */}
            <motion.div
              className="flex items-center gap-2 text-indigo-400 font-semibold text-sm pt-2 group-hover:gap-4 transition-all"
            >
              <span>Read More</span>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const PopularBlogsSection = () => {
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularBlogs = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/blog/popular/list?limit=3`
        );
        setPopularBlogs(response.data.blogs || []);
      } catch (error) {
        console.error("Failed to fetch popular blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularBlogs();
  }, []);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-12 overflow-hidden bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-indigo-950/20 to-black" />
      <div className="absolute inset-0 bg-grid-white/5" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6"
        >
          <div>
            <h2 className="font-poppins font-bold text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Popular Reads
              </span>
            </h2>
            <p className="mt-4 text-xl text-gray-400 font-light">
              Insights, trends, and stories from the forefront of tech
            </p>
          </div>
          <Link
            to="/blog-page"
            className="group flex items-center gap-3 text-indigo-400 hover:text-indigo-300 font-semibold text-lg transition-all hover:gap-5"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        ) : popularBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularBlogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg py-20">
            No popular blogs available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default PopularBlogsSection;