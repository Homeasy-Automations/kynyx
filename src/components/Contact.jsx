"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Send,
  Building2,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/contact/send-message`, formData);
      setSubmitted(true);
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SEO + Schema */}
      <Helmet>
        <title>
          Contact Us | Kynyx - Start Your Digital Transformation Today
        </title>
        <meta
          name="description"
          content="Get in touch with Kynyx, a top-rated US-based digital agency. Contact us for custom web development, mobile apps, and marketing solutions. Let’s build something amazing together!"
        />
        <meta
          name="keywords"
          content="contact digital agency, web development consultation, mobile app development contact, US digital agency contact, Kynyx contact"
        />
        <link rel="canonical" href="https://kynyx.com/contact" />

        <meta
          property="og:title"
          content="Contact Us | Kynyx - Start Your Digital Transformation Today"
        />
        <meta
          property="og:description"
          content="Get in touch with Kynyx, a top-rated US-based digital agency. Contact us for custom web development, mobile apps, and marketing solutions."
        />
        <meta property="og:url" content="https://kynyx.com/contact" />
        <meta property="og:image" content="https://kynyx.com/og-contact.jpg" />

        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Kynyx Solutions LLC",
            image: "https://kynyx.com/logo.png",
            url: "https://kynyx.com",
            telephone: "+1 (239) 450-6273",
            email: "info@kynyx.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "8 The Green, Suite A",
              addressLocality: "Dover",
              addressRegion: "DE",
              postalCode: "19901",
              addressCountry: "US",
            },
            openingHours: "Mo-Fr 09:00-18:00",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1 (239) 450-6273",
              contactType: "Customer Service",
              email: "info@kynyx.com",
            },
          })}
        </script>
      </Helmet>

      <main className="bg-black text-white min-h-screen">
        {/* Hero */}
        <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-950 via-black to-gray-950">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 mb-8"
            >
              <Globe className="w-5 h-5 text-cyan-400" />
              <span className="font-bold">US-Based • Dover, Delaware</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black leading-tight"
            >
              Contact Kynyx:
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Let’s Build Something Amazing Together
              </span>
            </motion.h1>

            <p className="mt-8 text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto">
              We reply within{" "}
              <span className="text-cyan-400 font-bold">24 hours</span> —
              usually much faster.
            </p>
          </div>
        </section>

        {/* Contact Form + Map */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
            {/* Map + Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-4xl font-black mb-8">
                  Our Office: US-Based, Always Accessible
                </h2>

                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800">
                  <img
                    src="../USAMAPS.png"
                    alt="Kynyx Solutions LLC Office Location - Dover, Delaware, USA"
                    className="w-full opacity-90"
                  />
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-24 left-32 w-8 h-8 bg-cyan-400 rounded-full shadow-2xl shadow-cyan-400/80"
                  >
                    <Sparkles className="w-full h-full text-black p-1" />
                  </motion.div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-cyan-400" />
                    Registered Office
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Kynyx Solutions LLC
                    <br />
                    8 The Green, Suite A<br />
                    Dover, DE 19901
                    <br />
                    United States
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <a
                    href="tel:+12394506273"
                    className="flex items-center gap-4 bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-cyan-500 transition-all"
                  >
                    <Phone className="w-10 h-10 text-cyan-400" />
                    <div>
                      <p className="text-sm text-gray-400">Call Us</p>
                      <p className="font-bold">+91 (239) 450-6273</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@kynyx.com"
                    className="flex items-center gap-4 bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-purple-500 transition-all"
                  >
                    <Mail className="w-10 h-10 text-purple-400" />
                    <div>
                      <p className="text-sm text-gray-400">Email Us</p>
                      <p className="font-bold">info@kynyx.com</p>
                    </div>
                  </a>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-2xl p-8 border border-cyan-500/30">
                  <div className="flex items-center gap-3 text-cyan-400">
                    <Clock className="w-6 h-6" />
                    <p className="font-bold">Response Time: Within 24 Hours</p>
                  </div>
                  <p className="text-gray-400 mt-2">
                    Most replies come in under 4 hours
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black mb-8">
                Request a Free Consultation Today
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {["name", "email", "phone", "company"].map((field) => (
                    <motion.div
                      key={field}
                      whileHover={{ y: -4 }}
                      className="relative group"
                    >
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        placeholder={`Your ${
                          field === "company"
                            ? "Company"
                            : field.charAt(0).toUpperCase() + field.slice(1)
                        }`}
                        className="w-full px-6 py-5 bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500 text-white"
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.div whileHover={{ y: -4 }}>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-5 bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white"
                  >
                    <option value="">Select a Service</option>
                    <option value="web">Custom Web Development</option>
                    <option value="app">Mobile App Development</option>
                    <option value="ui">UI/UX Design & Branding</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="all">All Services</option>
                  </select>
                </motion.div>

                <motion.div whileHover={{ y: -4 }}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your project..."
                    className="w-full px-6 py-5 bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500 text-white resize-none"
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-black text-xl rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {loading ? (
                    "Sending..."
                  ) : submitted ? (
                    <>Submitted!</>
                  ) : (
                    <>
                      Send Message <Send className="w-6 h-6" />
                    </>
                  )}
                </motion.button>

                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-cyan-400 text-center font-semibold flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                    Thank you! We’ll be in touch within 24 hours.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
              Start Your Project Today
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/20 backdrop-blur-xl text-white font-bold rounded-full hover:bg-white/30 transition-all"
              >
                Explore Services <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black rounded-full hover:scale-105 transition-all"
              >
                View Our Work <Sparkles className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
