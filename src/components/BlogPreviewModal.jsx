import { FiX } from "react-icons/fi"; // Assuming you're using react-icons
import MDEditor from "@uiw/react-md-editor"; // Ensure the correct markdown editor is imported

export default function BlogPreviewModal({ isOpen, onClose, form }) {
  if (!isOpen) return null;

  // Default values to handle edge cases
  const title = form.title || "Untitled Blog";
  const content = form.content || "*No content yet...*";
  const featuredImage = form.featuredImage || null;
  const status = form.status || "draft";
  const categories = form.categories
    ? form.categories
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    : [];
  const tags = form.tags
    ? form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  const metaTitle = form.metaTitle || "—";
  const metaDescription = form.metaDescription || "—";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      aria-labelledby="blog-preview-modal"
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3
            id="blog-preview-modal"
            className="text-xl font-semibold text-gray-800"
          >
            Blog Preview
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close Preview"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

          {/* Featured Image */}
          {featuredImage && (
            <img
              src={featuredImage}
              alt="Featured"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              {status}
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
              >
                {cat}
              </span>
            ))}
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Rendered Markdown Content */}
          <div className="prose prose-lg max-w-none">
            <MDEditor.Markdown
              source={content}
              style={{ padding: 20, background: "#f9f9f9", borderRadius: 8 }}
            />
          </div>

          {/* Meta SEO (optional) */}
          {(metaTitle || metaDescription) && (
            <div className="border-t pt-4 mt-6 text-sm text-gray-600">
              <p>
                <strong>Meta Title:</strong> {metaTitle}
              </p>
              <p className="mt-1">
                <strong>Meta Description:</strong> {metaDescription}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
