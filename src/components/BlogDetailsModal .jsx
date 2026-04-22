import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

const BlogDetailsModal = ({ isOpen, onClose, blog }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !blog) return null;

  const statusStyles = {
    published: "bg-green-100 text-green-700",
    draft: "bg-yellow-100 text-yellow-700",
    archived: "bg-red-100 text-red-700",
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        className={`bg-white w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[90vh] rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } overflow-y-auto relative`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 transition-colors duration-200"
          aria-label="Close modal"
        >
          <FiX size={24} />
        </button>

        {/* Blog Title */}
        <h2
          id="modal-title"
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6"
        >
          {blog.title || "Untitled Blog"}
        </h2>

        {/* Featured Image */}
        {blog.featuredImage ? (
          <div
            className="relative w-full h-40 sm:h-48 md:h-64 flex items-center justify-center rounded-lg mb-4 sm:mb-6 shadow-sm overflow-hidden"
            aria-label="Featured image container"
          >
            <img
              src={blog.featuredImage}
              alt={blog.title || "Blog featured image"}
              className="max-h-full w-auto object-contain rounded-lg"
              loading="lazy"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                e.target.alt = "Failed to load image";
              }}
            />
          </div>
        ) : (
          <div
            className="w-full h-40 sm:h-48 md:h-64 flex items-center justify-center bg-gray-100 rounded-lg mb-4 sm:mb-6 shadow-sm text-gray-500 text-sm sm:text-base"
            aria-label="No featured image"
          >
            No image available
          </div>
        )}
        {/* Blog Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-4 sm:mb-6 bg-gray-50 p-4 rounded-lg">
          <div>
            <p>
              <strong className="font-semibold">Author:</strong>{" "}
              {blog.author || "Unknown"}
            </p>
            <p>
              <strong className="font-semibold">Status:</strong>{" "}
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  statusStyles[blog.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {blog.status ? blog.status.charAt(0).toUpperCase() + blog.status.slice(1) : "Unknown"}
              </span>
            </p>
            <p>
              <strong className="font-semibold">Created:</strong>{" "}
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "-"}
            </p>
          </div>
          <div>
            <p>
              <strong className="font-semibold">Views:</strong>{" "}
              {blog.views || 0}
            </p>
            {blog.categories?.length > 0 && (
              <p>
                <strong className="font-semibold">Categories:</strong>{" "}
                {blog.categories.join(", ")}
              </p>
            )}
            {blog.tags?.length > 0 && (
              <p>
                <strong className="font-semibold">Tags:</strong>{" "}
                {blog.tags.join(", ")}
              </p>
            )}
          </div>
        </div>

        {/* Blog Content */}
        <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 mb-6">
          {blog.content ? (
            // Basic rich text rendering; replace with a library like react-markdown or DOMPurify for production
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <p className="text-gray-500 italic">No content available.</p>
          )}
        </div>

        {/* SEO Metadata */}
        {blog.metadata && (
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              SEO Details
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              {blog.metadata.metaTitle && (
                <p>
                  <strong className="font-semibold">Meta Title:</strong>{" "}
                  {blog.metadata.metaTitle}
                </p>
              )}
              {blog.metadata.metaDescription && (
                <p>
                  <strong className="font-semibold">Meta Description:</strong>{" "}
                  {blog.metadata.metaDescription}
                </p>
              )}
              {blog.metadata.keywords?.length > 0 && (
                <p>
                  <strong className="font-semibold">Keywords:</strong>{" "}
                  {blog.metadata.keywords.join(", ")}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsModal;