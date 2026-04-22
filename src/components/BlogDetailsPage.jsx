import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FaCopy } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import MDEditor from "@uiw/react-md-editor";
import { API_URL } from "../../constant";
import { ArrowBigLeft } from "lucide-react";

const normalizeMarkdown = (content) => content?.replace(/\\n/g, "\n") || "";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blog/${slug}`);
        setBlog(response.data);

        if (response.data.categories?.[0]) {
          const rel = await axios.get(
            `${API_URL}/api/blog?category=${response.data.categories[0]}&exclude=${response.data.id}`
          );
          setRelated(rel.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 py-20">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 py-20">
        Blog not found.
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleTwitter = () => {
    const text = encodeURIComponent(`${blog.title}`);
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
    );
  };

  const submitComment = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedComment = commentText.trim();

    if (!trimmedName || !trimmedEmail || !trimmedComment) {
      setCommentError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setCommentError("Please enter a valid email address.");
      return;
    }

    setCommentError("");
    setCommentSubmitting(true);

    try {
      await axios.post(`${API_URL}/api/blog/${blog.id}/comments`, {
        author: trimmedName,
        content: trimmedComment,
      });

      setName("");
      setEmail("");
      setCommentText("");
      alert("✅ Comment submitted successfully!");
    } catch (err) {
      setCommentError(err.response?.data?.message || "Submission failed.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10 px-4 md:px-8 mt-10">
      <Helmet>
        <title>{blog.title}</title>
        <meta
          name="description"
          content={blog.excerpt || blog.content.slice(0, 150)}
        />
        <meta name="keywords" content={blog.metadata?.keywords?.join(", ")} />
      </Helmet>

      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 cursor-pointer mb-6 text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl text-sm font-medium transition"
        >
          <ArrowBigLeft/> Back to blogs
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {blog.title}
          </h1>

          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              title="Copy link"
            >
              <FaCopy className="text-gray-200" />
            </button>
            <button
              onClick={handleTwitter}
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full text-sm font-medium transition"
            >
              <CiShare2  /> Twitter
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-wrap gap-3 mt-4 mb-8">
          <span>
            By <strong>{blog.author || "Kynyx Team"}</strong>
          </span>
          <span>
            •{" "}
            {blog.formattedDate ||
              new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <span>• {blog.readTime} min read</span>
          <span>• {blog.views} views</span>
        </div>

        {/* Main Content and Image Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Content */}
          <article className="md:col-span-2 prose prose-lg dark:prose-invert max-w-none">
            <MDEditor.Markdown
              source={normalizeMarkdown(blog.content)}
              style={{ padding: 0, background: "transparent" }}
            />
          </article>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="md:col-span-1">
              <img
                src={
                  blog.featuredImage.startsWith("http")
                    ? blog.featuredImage
                    : `${API_URL}${blog.featuredImage}`
                }
                alt={blog.title}
                className="w-full h-[400px] object-cover rounded-xl shadow-2xl sticky top-8"
              />
            </div>
          )}
        </div>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {blog.tags.map((t) => (
              <span
                key={t}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-16 border-t pt-12">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Comments ({blog.comments?.length || 0})
              </h3>
              {blog.comments?.length > 0 ? (
                <div className="space-y-6">
                  {blog.comments.map((c) => (
                    <div
                      key={c._id}
                      className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
                    >
                      <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {c.author}
                      </p>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">
                        {c.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">
                  Be the first to comment!
                </p>
              )}
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Leave a Comment
              </h3>
              <form onSubmit={submitComment} className="space-y-5">
                {commentError && (
                  <p className="text-red-500 text-sm font-medium">
                    {commentError}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
                <input
                  type="email"
                  placeholder="Your Email (won't be published)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
                <textarea
                  placeholder="Your thoughts..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={5}
                  className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                />
                <button
                  type="submit"
                  disabled={commentSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition disabled:opacity-60"
                >
                  {commentSubmitting ? "Submitting..." : "Post Comment"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              Related Posts
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rb) => (
                <div
                  key={rb.id}
                  onClick={() => navigate(`/blog/${rb.slug}`)}
                  className="cursor-pointer bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-1"
                >
                  <h4 className="text-xl font-bold text-indigo-700 dark:text-indigo-400">
                    {rb.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {rb.author} • {rb.formattedDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogDetailsPage;