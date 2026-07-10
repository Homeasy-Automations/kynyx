import React, { useState } from "react";
import axios from "axios";

const API_URL = ""; // Add your backend URL

const Career = () => {
  const [position, setPosition] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    github: "",
    linkedIn: "",
    portfolio: "",
    referral: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isDeveloperRole = position.toLowerCase().includes("developer");
  const isMarketingRole = position.toLowerCase().includes("marketing");
  const isDesignerRole = position.toLowerCase().includes("designer");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setErrorMsg("Please upload your resume.");
      return;
    }

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      data.append("position", position);
      data.append("resume", resumeFile);

      const response = await axios.post(`${API_URL}/api/career`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setSuccessMsg("Application submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          github: "",
          linkedIn: "",
          portfolio: "",
          referral: "",
        });
        setPosition("");
        setResumeFile(null);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center px-4 py-8 sm:px-6 md:px-10">
      <div className="bg-[#1a1a2e] rounded-2xl shadow-lg w-full max-w-5xl mx-auto p-6 sm:p-8 md:p-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
          Join Our Team
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm md:text-base font-medium text-gray-300 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 bg-[#2a2a3d] border border-gray-600 rounded-lg text-sm md:text-base"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm md:text-base font-medium text-gray-300 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-[#2a2a3d] border border-gray-600 rounded-lg text-sm md:text-base"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm md:text-base font-medium text-gray-300 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 625 123 4567"
              className="w-full px-4 py-2 bg-[#2a2a3d] border border-gray-600 rounded-lg text-sm md:text-base"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm md:text-base font-medium text-gray-300 mb-1">
              Position Applied For <span className="text-red-500">*</span>
            </label>
            <select
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#2a2a3d] border border-gray-600 rounded-lg text-sm md:text-base"
            >
              <option value="">-- Select Position --</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
              <option>UI/UX Designer</option>
              <option>Digital Marketing Executive</option>
              <option>Project Manager</option>
              <option>Other</option>
            </select>
          </div>

          {/* GitHub */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm md:text-base font-medium text-gray-300 mb-1">
              GitHub Profile {isDeveloperRole && <span className="text-red-500">*</span>}
            </label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              required={isDeveloperRole}
              placeholder="https://github.com/your-profile"
              className="w-full px-4 py-2 bg-[#2a2a3d] border border-gray-600 rounded-lg text-sm md:text-base"
            />
          </div>

          {/* LinkedIn */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm md:text-base font-medium text-gray-300 mb-1">
              LinkedIn Profile {isMarketingRole && <span className="text-red-500">*</span>}
            </label>
            <input
              type="url"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
              required={isMarketingRole}
              placeholder="https://linkedin.com/in/your-profile"
              className="w-full px-4 py-2 bg-[#2a2a3d] border border-gray-600 rounded-lg text-sm md:text-base"
            />
          </div>

          {/* Portfolio */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm md:text-base font-medium text-gray-300 mb-1">
              Portfolio Website {isDesignerRole && <span className="text-red-500">*</span>}
            </label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              required={isDesignerRole}
              placeholder="https://yourportfolio.com"
              className="w-full px-4 py-2 bg-[#2a2a3d] border border-gray-600 rounded-lg text-sm md:text-base"
            />
          </div>

          {/* Referral */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm md:text-base font-medium text-gray-300 mb-1">
              How did you hear about us? <span className="text-red-500">*</span>
            </label>
            <select
              name="referral"
              value={formData.referral}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#2a2a3d] border border-gray-600 rounded-lg text-sm md:text-base"
            >
              <option value="">-- Select an Option --</option>
              <option>LinkedIn</option>
              <option>Instagram</option>
              <option>Friend/Colleague</option>
              <option>Job Portal</option>
              <option>Company Website</option>
              <option>Other</option>
            </select>
          </div>

          {/* Resume */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm md:text-base font-medium text-gray-300 mb-1">
              Upload Resume <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleFileChange}
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white bg-[#2a2a3d] border border-gray-600 rounded-lg text-white"
            />
          </div>

          {/* Submit */}
          <div className="col-span-1 sm:col-span-2 space-y-2">
            {successMsg && <p className="text-green-400">{successMsg}</p>}
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all text-white py-3 rounded-lg font-semibold text-base sm:text-lg disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Career;
