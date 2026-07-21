import React, { useState, useEffect } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const BookConsultationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneWithDialCode: "", // full phone number with country code
    countryCode: "+1", // default dialing code US
    phone: "", // phone number without country code
    company: "",
    website: "",
    services: [],
    otherService: "",
    projectDetails: "",
    budget: "",
    file: null,
    agree: false,
  });

  const [selectedCountry, setSelectedCountry] = useState("US"); // default country ISO code
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const servicesList = [
    "SEO",
    "Content Marketing",
    "Digital Marketing",
    "Custom Web Development",
    "Mobile App Development",
    "UI/UX Design & Branding",
    "Other",
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Returns an error message for a single field, or "" if valid
  const validateField = (name, data) => {
    switch (name) {
      case "name":
        return data.name.trim() ? "" : "Full Name is required";
      case "email":
        return data.email.includes("@") && /\S+@\S+\.\S+/.test(data.email)
          ? ""
          : "Invalid email address";
      case "phone": {
        const phoneNumber = parsePhoneNumberFromString(data.phoneWithDialCode || "");
        return phoneNumber && phoneNumber.isValid()
          ? ""
          : "Invalid phone number for selected country";
      }
      case "company":
        return data.company.trim() ? "" : "Company name is required";
      case "website":
        if (!data.website) return ""; // optional field
        try {
          new URL(data.website);
          return "";
        } catch {
          return "Enter a valid URL (e.g. https://example.com)";
        }
      case "services":
        return data.services.length ? "" : "Select at least one service";
      case "otherService":
        return data.services.includes("Other") && !data.otherService.trim()
          ? "Specify the other service"
          : "";
      case "agree":
        return data.agree ? "" : "You must agree to the privacy policy";
      default:
        return "";
    }
  };

  const validate = () => {
    const fields = [
      "name",
      "email",
      "phone",
      "company",
      "website",
      "services",
      "otherService",
      "agree",
    ];
    const newErrors = {};
    fields.forEach((field) => {
      const msg = validateField(field, formData);
      if (msg) newErrors[field] = msg;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    let updated;
    if (type === "checkbox" && name === "agree") {
      updated = { ...formData, agree: checked };
    } else if (type === "checkbox" && name === "services") {
      const updatedServices = checked
        ? [...formData.services, value]
        : formData.services.filter((s) => s !== value);
      updated = { ...formData, services: updatedServices };
    } else if (type === "file") {
      updated = { ...formData, file: files?.[0] || null };
    } else {
      updated = { ...formData, [name]: value };
    }

    setFormData(updated);

    // Live-revalidate any field the user has already interacted with
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, updated) }));
    }
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, formData) }));
  };

  // "" = untouched, "valid", or "invalid" — drives the red/green border
  const fieldStatus = (name) => {
    if (!touched[name]) return "";
    return errors[name] ? "invalid" : "valid";
  };

  const borderClass = (name) => {
    const status = fieldStatus(name);
    if (status === "valid") return "border-2 border-green-500";
    if (status === "invalid") return "border-2 border-red-500";
    return "border border-gray-300";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true,
      website: true,
      services: true,
      otherService: true,
      agree: true,
    });
    if (!validate()) return;

    // Format phone to E.164 before sending
    const phoneNumber = parsePhoneNumberFromString(formData.phoneWithDialCode);
    const formattedPhone = phoneNumber.format("E.164");

    const payload = {
      ...formData,
      phone: formattedPhone,
    };
    // Remove these as they are now redundant
    delete payload.phoneWithDialCode;
    delete payload.countryCode;

    const formDataToSend = new FormData();

    for (const key in payload) {
      if (key === "services") {
        formDataToSend.append("services", payload.services.join(", "));
      } else if (key === "file" && payload.file) {
        formDataToSend.append("file", payload.file);
      } else {
        formDataToSend.append(key, payload[key]);
      }
    }

    try {
      const response = await axios.post(
        "https://api.kynyx.com/api/get-quote",
        formDataToSend
      );

      if (response.status === 200) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex justify-center items-center px-4 py-6">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#1e293b] text-white p-6 rounded-xl shadow-2xl border border-gray-700 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-pink-400"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-4 text-center">
            Book Free Consultation
          </h2>

          {submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4 text-green-400 text-center font-medium"
            >
              Thank you! We’ll get in touch soon.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  className={`bg-white text-black px-4 py-2 rounded w-full ${borderClass(
                    "name"
                  )}`}
                />
                {fieldStatus("name") === "invalid" && (
                  <p className="text-red-400 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  className={`bg-white text-black px-4 py-2 rounded w-full ${borderClass(
                    "email"
                  )}`}
                />
                {fieldStatus("email") === "invalid" && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <PhoneInput
                country={selectedCountry.toLowerCase()}
                value={formData.phone.replace('+', '')}
                onChange={(phone, country) => {
                  const updated = {
                    ...formData,
                    phoneWithDialCode: `+${phone}`,
                  };
                  setFormData(updated);
                  setSelectedCountry(country.countryCode.toUpperCase());
                  if (touched.phone) {
                    setErrors((prev) => ({
                      ...prev,
                      phone: validateField("phone", updated),
                    }));
                  }
                }}
                onBlur={() => handleBlur("phone")}
                enableSearch
                placeholder="Enter phone number*"
                inputStyle={{
                  width: '100%',
                  height: '42px',
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '0.375rem',
                  padding: '0.1rem 2.5rem',
                  border:
                    fieldStatus("phone") === "invalid"
                      ? '2px solid #ef4444'
                      : fieldStatus("phone") === "valid"
                      ? '2px solid #22c55e'
                      : '1px solid #d1d5db',
                  boxSizing: 'border-box',
                }}
                buttonStyle={{
                  border: 'none',
                  backgroundColor: 'white',
                }}
                containerStyle={{
                  width: '100%',
                }}
                dropdownStyle={{
                  color: 'black',
                  backgroundColor: 'white',
                }}
              />

              {fieldStatus("phone") === "invalid" && (
                <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <input
                type="text"
                name="company"
                placeholder="Company Name *"
                value={formData.company}
                onChange={handleChange}
                onBlur={() => handleBlur("company")}
                className={`bg-white text-black px-4 py-2 rounded w-full ${borderClass(
                  "company"
                )}`}
              />
              {fieldStatus("company") === "invalid" && (
                <p className="text-red-400 text-sm">{errors.company}</p>
              )}
            </div>

            {/* Website */}
            <div>
              <input
                type="url"
                name="website"
                placeholder="Website URL"
                value={formData.website}
                onChange={handleChange}
                onBlur={() => handleBlur("website")}
                className={`bg-white text-black px-4 py-2 rounded w-full ${borderClass(
                  "website"
                )}`}
              />
              {fieldStatus("website") === "invalid" && (
                <p className="text-red-400 text-sm">{errors.website}</p>
              )}
            </div>

            {/* Services */}
            <div>
              <label className="block mb-2 font-semibold">
                Services you're interested in: *
              </label>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-2 p-2 rounded ${
                  fieldStatus("services") === "invalid"
                    ? "border-2 border-red-500"
                    : fieldStatus("services") === "valid"
                    ? "border-2 border-green-500"
                    : ""
                }`}
              >
                {servicesList.map((service) => (
                  <label key={service} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="services"
                      value={service}
                      checked={formData.services.includes(service)}
                      onChange={handleChange}
                      onBlur={() => handleBlur("services")}
                    />
                    {service}
                  </label>
                ))}
              </div>
              {fieldStatus("services") === "invalid" && (
                <p className="text-red-400 text-sm">{errors.services}</p>
              )}
              {formData.services.includes("Other") && (
                <>
                  <input
                    type="text"
                    name="otherService"
                    placeholder="Please specify other service *"
                    value={formData.otherService}
                    onChange={handleChange}
                    onBlur={() => handleBlur("otherService")}
                    className={`bg-white text-black px-4 py-2 rounded w-full mt-2 ${borderClass(
                      "otherService"
                    )}`}
                  />
                  {fieldStatus("otherService") === "invalid" && (
                    <p className="text-red-400 text-sm">{errors.otherService}</p>
                  )}
                </>
              )}
            </div>

            {/* Project Details */}
            <textarea
              name="projectDetails"
              placeholder="Project details"
              rows={4}
              value={formData.projectDetails}
              onChange={handleChange}
              className="bg-white text-black px-4 py-2 rounded w-full border border-gray-300"
            />

            {/* Budget */}
            <input
              type="text"
              name="budget"
              placeholder="Budget"
              value={formData.budget}
              onChange={handleChange}
              className="bg-white text-black px-4 py-2 rounded w-full border border-gray-300"
            />

            {/* File Upload */}
            <div>
              <label className="block mb-2 font-semibold">Upload file (optional):</label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="text-white"
              />
            </div>
            {/* Agree Privacy */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                onBlur={() => handleBlur("agree")}
              />
              <span
                className={
                  fieldStatus("agree") === "invalid"
                    ? "text-red-400"
                    : fieldStatus("agree") === "valid"
                    ? "text-green-400"
                    : ""
                }
              >
                I agree to the privacy policy *
              </span>
            </label>
            {fieldStatus("agree") === "invalid" && (
              <p className="text-red-400 text-sm">{errors.agree}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 transition rounded py-3 font-semibold"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BookConsultationForm;
