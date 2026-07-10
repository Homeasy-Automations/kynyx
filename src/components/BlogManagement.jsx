import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MDEditor from "@uiw/react-md-editor";

import {
  FiMenu,
  FiX,
  FiEdit,
  FiTrash2,
  FiEye,
  FiUpload,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import debounce from "lodash/debounce";
import { API_URL } from "../../constant";
import BlogDetailsModal from "./BlogDetailsModal";
import  BlogPreviewModal  from "./BlogPreviewModal";

const STATUS_COLOR = {
  published: "bg-green-100 text-green-700",
  draft: "bg-amber-100 text-amber-700",
  archived: "bg-red-100 text-red-700",
};

const FloatingLabel = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => {
  const inputRef = React.useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        id={name}
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required || label.includes("*")}
        className="peer w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700 bg-white"
        placeholder=" "
      />
      <label
        htmlFor={name}
        onClick={focusInput}
        className="absolute left-3 -top-2 bg-white px-1 text-sm font-medium text-gray-500 transition-all cursor-pointer peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 "
      >
        {label}
      </label>
      {placeholder && (
        <span className="absolute right-3 top-2.5 text-xs text-gray-400 pointer-events-none">
          {placeholder}
        </span>
      )}
    </div>
  );
};

const BlogManagement = () => {
  // State
  // eslint-disable-next-line no-unused-vars
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [form, setForm] = useState({
    title: "",
    content: "",
    categories: "",
    tags: "",
    status: "draft",
    featuredImage: "",
    file: null,
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    tag: "",
    status: "",
  });
  const [page, setPage] = useState(1);
  const limit = 9;
  const [loading, setLoading] = useState(false);
  const [modalBlog, setModalBlog] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Auth
  // NOTE: read once on mount rather than on every render so a token removed
  // mid-session (e.g. logout in another tab) doesn't change what this render
  // computes and desync the component from ProtectedRoute's own check.
  const [token] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );
  const auth = { headers: { Authorization: `Bearer ${token}` } };

  const errMsg = (e) =>
    e.response?.data?.message || e.message || "Unexpected error";

  // Fetch Blogs
  const fetchBlogs = useCallback(
    debounce(async (params) => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/api/blog`, { params });
        const validBlogs = (data.data || []).filter(
          (blog) => blog && blog._id && blog.title
        );
        setBlogs(validBlogs);
        setPagination(data.pagination || { totalPages: 1, currentPage: 1 });
      } catch (e) {
        toast.error(errMsg(e));
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  // All hooks above this line must always run, regardless of auth state —
  // conditionally calling hooks (or returning before they run) breaks
  // React's rules of hooks and crashes the app if `token` is ever missing.
  useEffect(() => {
    if (!token) {
      toast.error("Please log in to access blog management");
      return;
    }
    fetchBlogs({ page, limit, ...filters });
  }, [page, filters, fetchBlogs, token]);

  // Form Handlers
  const setField = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const setFile = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((p) => ({ ...p, file }));
  };

  const validate = () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required");
      return false;
    }
    if (form.content.trim().length < 10) {
      toast.error("Content must be at least 10 characters long");
      return false;
    }
    if (!form.categories.trim() || !form.tags.trim()) {
      toast.error("Categories and tags are required");
      return false;
    }
    return true;
  };

  const uploadImage = async () => {
    try {
      if (!form?.file) {
        return form.featuredImage || null;
      }
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024;
      if (!allowedTypes.includes(form.file.type)) {
        throw new Error(
          "Invalid file type. Only JPEG, PNG, and GIF are allowed."
        );
      }
      if (form.file.size > maxSize) {
        throw new Error("File size exceeds 5MB limit.");
      }
      const formData = new FormData();
      formData.append("image", form.file);
      const response = await axios.post(
        `${API_URL}/api/blog/upload-image`,
        formData,
        {
          ...auth,
          headers: { ...auth.headers, "Content-Type": "multipart/form-data" },
          timeout: 30000,
        }
      );
      if (!response?.data?.imageUrl) {
        throw new Error("No image URL returned from server");
      }
      return response.data.imageUrl;
    } catch (error) {
      toast.error(error.message || "Failed to upload image");
      throw error;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const imageUrl = await uploadImage();
      const payload = {
        title: form.title,
        content: form.content,
        categories: form.categories
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        status: form.status,
        featuredImage: imageUrl,
        metadata: {
          metaTitle: form.metaTitle.trim(),
          metaDescription: form.metaDescription.trim(),
          keywords: form.keywords
            ? form.keywords
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean)
            : [],
        },
      };
      if (editingId) {
        const { data } = await axios.put(
          `${API_URL}/api/blog/${editingId}`,
          payload,
          auth
        );
        setBlogs((b) => b.map((x) => (x._id === editingId ? data.blog : x)));
        toast.success("Blog updated");
        setEditingId(null);
      } else {
        const { data } = await axios.post(`${API_URL}/api/blog`, payload, auth);
        setBlogs((b) => [data.blog, ...b]);
        toast.success("Blog created");
      }
      resetForm();
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      categories: "",
      tags: "",
      status: "draft",
      featuredImage: "",
      file: null,
      metaTitle: "",
      metaDescription: "",
      keywords: "",
    });
    setEditingId(null);
  };

  const editBlog = (blog) => {
    setForm({
      title: blog.title,
      content: blog.content,
      categories: blog.categories?.join(", ") ?? "",
      tags: blog.tags?.join(", ") ?? "",
      status: blog.status,
      featuredImage: blog.featuredImage ?? "",
      file: null,
      metaTitle: blog.metadata?.metaTitle ?? "",
      metaDescription: blog.metadata?.metaDescription ?? "",
      keywords: blog.metadata?.keywords?.join(", ") ?? "",
    });
    setEditingId(blog._id);
    setSidebarOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog permanently?")) return;
    try {
      await axios.delete(`${API_URL}/api/blog/${id}`, auth);
      setBlogs((b) => b.filter((x) => x._id !== id));
      toast.success("Deleted");
    } catch (e) {
      toast.error(errMsg(e));
    }
  };

  // Filters
  const changeFilter = (e) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ search: "", category: "", tag: "", status: "" });
    setPage(1);
  };

  // Pagination
  const pageNumbers = useMemo(() => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(pagination.totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }
    if (page - delta > 2) range.unshift("...");
    if (page + delta < pagination.totalPages - 1) range.push("...");
    range.unshift(1);
    if (pagination.totalPages > 1) range.push(pagination.totalPages);
    return range;
  }, [page, pagination.totalPages]);

  if (!token) {
    return (
      <>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-gray-600">Please log in to access blog management.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen bg-gray-100 sm:flex mt-10 pt-2 px-10">
        {/* Sidebar Form */}
        <div>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              {editingId ? "Edit Blog" : "New Blog"}
            </h2>
          </div>
          <form
            onSubmit={submit}
            className="p-4 space-y-3 overflow-y-auto h-[calc(100vh-4rem)]"
          >
            <FloatingLabel
              label="Title *"
              name="title"
              value={form.title}
              onChange={setField}
            />
            {/* <div className="relative">
              <textarea
                name="content"
                rows={6}
                value={form.content}
                onChange={setField}
                className="peer w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700 bg-white"
                placeholder=" "
                required
              />

              <label className="absolute left-3 -top-2 bg-white px-1 text-sm font-medium text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500">
                Content *
              </label>
            </div> */}

            {/* Content Editor with Floating Label */}
            <div className="relative">
              {/* <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm font-medium text-gray-500 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 z-10">
                Content *
              </label> */}

              {/* Content Editor with Floating Label */}
              <div className="relative">
                <div className="peer w-full border border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white">
                  <MDEditor
                    value={form.content}
                    onChange={(value) =>
                      setField({ target: { name: "content", value } })
                    }
                    preview="edit"
                    height={320}
                    data-color-mode="light"
                    className="border-0 rounded-lg overflow-hidden"
                    textareaProps={{
                      placeholder: "Write your blog content in Markdown...",
                      className:
                        "min-h-[280px] p-4 text-gray-700 placeholder-gray-400 focus:outline-none resize-none",
                    }}
                  />
                </div>

                {/* Character count + Preview Button */}
                <div className="flex justify-between items-center mt-2">
                  {/* <div className="text-xs text-gray-400">
                    {form.content.length} characters
                  </div> */}
                  <button
                    type="button"
                    onClick={() => setPreviewOpen(true)}
                    className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-1.5"
                  >
                    <FiEye size={14} />
                    Preview
                  </button>
                </div>
              </div>

              {/* Optional: Character count or helper */}
              <div className="absolute right-3 bottom-2 text-xs text-gray-400">
                {form.content.length} characters
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FloatingLabel
                label="Categories *"
                name="categories"
                value={form.categories}
                onChange={setField}
              />
              <FloatingLabel
                label="Tags *"
                name="tags"
                value={form.tags}
                onChange={setField}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={setField}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="flex justify-between">
              <FloatingLabel
                label="Meta Title"
                name="metaTitle"
                value={form.metaTitle}
                onChange={setField}
              />
              <FloatingLabel
                label="Meta Description"
                name="metaDescription"
                value={form.metaDescription}
                onChange={setField}
              />
            </div>
            <FloatingLabel
              label="Keywords (comma)"
              name="keywords"
              value={form.keywords}
              onChange={setField}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={setFile}
                  className="hidden"
                  id="img-upload"
                />
                <label htmlFor="img-upload" className="cursor-pointer">
                  <FiUpload className="mx-auto text-xl text-gray-400 mb-1" />
                  <span className="text-sm text-gray-600">
                    {form.file?.name ?? "Click to upload"}
                  </span>
                </label>
                {form.featuredImage && !form.file && (
                  <img
                    src={form.featuredImage}
                    alt="preview"
                    className="mt-3 mx-auto h-24 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Saving…" : editingId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Blog Dashboard
            </h1>
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-blue-600 hover:text-blue-800"
              aria-label="Open sidebar"
            >
              <FiMenu size={24} />
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder="Search blogs…"
                value={filters.search}
                onChange={changeFilter}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
              />
            </div>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={filters.category}
              onChange={changeFilter}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
            />
            <input
              type="text"
              name="tag"
              placeholder="Tag"
              value={filters.tag}
              onChange={changeFilter}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
            />
            <select
              name="status"
              value={filters.status}
              onChange={changeFilter}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
            >
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Clear
            </button>
          </div>

          {/* Blog Table */}
          {loading ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Categories
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Tags
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 9 }).map((_, i) => (
                    <tr key={i} className="border-t border-gray-200">
                      <td colSpan={6} className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : blogs.length === 0 ? (
            <p className="text-center text-gray-500 py-12 text-sm">
              No blogs found.
            </p>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Categories
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Tags
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((b) =>
                    b ? (
                      <tr
                        key={b._id}
                        className="border-t border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3 text-sm text-gray-700 truncate max-w-xs">
                          {b.title || "Untitled"}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              STATUS_COLOR[b.status] ||
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {b.status || "Unknown"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {b.categories?.join(", ") || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {b.tags?.slice(0, 2).join(", ") +
                            (b.tags?.length > 2
                              ? ` +${b.tags.length - 2}`
                              : "") || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {b.createdAt
                            ? new Date(b.createdAt).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-sm flex gap-2">
                          <button
                            onClick={() => {
                              setModalBlog(b);
                              setModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            aria-label="View blog"
                          >
                            <FiEye size={16} />
                          </button>
                          <button
                            onClick={() => editBlog(b)}
                            className="text-blue-600 hover:text-blue-800"
                            aria-label="Edit blog"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() => deleteBlog(b._id)}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Delete blog"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <nav className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Previous page"
              >
                <FiChevronLeft size={16} />
              </button>
              {pageNumbers.map((n, i) =>
                n === "..." ? (
                  <span key={i} className="px-3 py-1 text-gray-500">
                    …
                  </span>
                ) : (
                  <button
                    key={i}
                    onClick={() => setPage(n)}
                    className={`px-3 py-1 rounded-lg transition ${
                      page === n
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                    aria-label={`Page ${n}`}
                  >
                    {n}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setPage((p) => Math.min(p + 1, pagination.totalPages))
                }
                disabled={page === pagination.totalPages}
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Next page"
              >
                <FiChevronRight size={16} />
              </button>
            </nav>
          )}
        </main>
      </div>

      <BlogPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        form={form}
      />
      <BlogDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        blog={modalBlog}
      />
    </>
  );
};

export default BlogManagement;
