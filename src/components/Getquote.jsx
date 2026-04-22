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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox" && name === "agree") {
      setFormData((prev) => ({ ...prev, agree: checked }));
    } else if (type === "checkbox" && name === "services") {
      const updatedServices = checked
        ? [...formData.services, value]
        : formData.services.filter((s) => s !== value);
      setFormData((prev) => ({ ...prev, services: updatedServices }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, file: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email address";

    // Validate phone using libphonenumber-js
    const phoneNumber = parsePhoneNumberFromString(formData.phoneWithDialCode);
    if (!phoneNumber || !phoneNumber.isValid()) {
      newErrors.phone = "Invalid phone number for selected country";
    }

    if (!formData.company) newErrors.company = "Company name is required";
    if (!formData.services.length)
      newErrors.services = "Select at least one service";
    if (formData.services.includes("Other") && !formData.otherService)
      newErrors.otherService = "Specify the other service";
    if (!formData.agree)
      newErrors.agree = "You must agree to the privacy policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    e.preventDefault();
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

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white text-black px-4 py-2 rounded w-full"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name}</p>
                )}
                {errors.name && (
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
                  className="bg-white text-black px-4 py-2 rounded w-full"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Replace your old country selector + phone input with this PhoneInput */}
            <div>
              {/* <label className="block mb-2 font-semibold">Phone Number *</label> */}
              <PhoneInput
                country={selectedCountry.toLowerCase()}
                value={formData.phone.replace('+', '')}
               onChange={(phone, country) => {
                 setFormData((prev) => ({
                   ...prev,
                   phoneWithDialCode: `+${phone}`,
                  }));
                  setSelectedCountry(country.countryCode.toUpperCase());
                }}
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
                 border: '1px solid #d1d5db',
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

              {errors.phone && (
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
                className="bg-white text-black px-4 py-2 rounded w-full"
              />
              {errors.company && (
                <p className="text-red-400 text-sm">{errors.company}</p>
              )}
            </div>

            {/* Website */}
            <input
              type="url"
              name="website"
              placeholder="Website URL"
              value={formData.website}
              onChange={handleChange}
              className="bg-white text-black px-4 py-2 rounded w-full"
            />

            {/* Services */}
            <div>
              <label className="block mb-2 font-semibold">
                Services you're interested in: *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {servicesList.map((service) => (
                  <label key={service} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="services"
                      value={service}
                      checked={formData.services.includes(service)}
                      onChange={handleChange}
                    />
                    {service}
                  </label>
                ))}
              </div>
              {errors.services && (
                <p className="text-red-400 text-sm">{errors.services}</p>
              )}
                            {formData.services.includes("Other") && (
                <input
                  type="text"
                  name="otherService"
                  placeholder="Please specify other service *"
                  value={formData.otherService}
                  onChange={handleChange}
                  className="bg-white text-black px-4 py-2 rounded w-full mt-2"
                />
              )}
              {errors.otherService && (
                <p className="text-red-400 text-sm">{errors.otherService}</p>
              )}
            </div>

            {/* Project Details */}
            <textarea
              name="projectDetails"
              placeholder="Project details"
              rows={4}
              value={formData.projectDetails}
              onChange={handleChange}
              className="bg-white text-black px-4 py-2 rounded w-full"
            />

            {/* Budget */}
            <input
              type="text"
              name="budget"
              placeholder="Budget"
              value={formData.budget}
              onChange={handleChange}
              className="bg-white text-black px-4 py-2 rounded w-full"
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
              />
              I agree to the privacy policy *
            </label>
            {errors.agree && (
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

