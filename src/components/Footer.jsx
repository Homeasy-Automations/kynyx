'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter,
  Send,
  Sparkles
} from 'lucide-react';
import logo from "../assets/logo8.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/career" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Return & Refund", href: "/return-refund-policy" },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 
                grid-rows-[1fr] [&>div]:flex [&>div]:flex-col [&>div]:justify-start">          {/* Logo & About */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link to="/" className="inline-block">
              <img 
                src={logo} 
                alt="Kynyx Solutions LLC" 
                className="h-12 bg-white rounded-lg shadow-xl"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              {/* US-based technology partner delivering innovative digital solutions that drive growth and exceed expectations. */}
              We build custom web and mobile applications, cloud-native platforms, and data-driven solutions—partnering with startups and enterprises to accelerate digital transformation and deliver measurable business impact.
            </p>
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Delivering Excellence Since 2023</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold mb-6 text-white">Get in Touch</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Registered Office</p>
                  <p className="text-sm leading-relaxed">
                    Kynyx Solutions LLC<br />
                    8 The Green, Suite A<br />
                    Dover, DE 19901<br />
                    United States
                  </p>
                </div>
              </div>

              <a href="tel:+12394506273" className="flex items-center gap-4 group">
                <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="group-hover:text-emerald-400 transition-colors">
                  +1 (239) 450-6273
                </span>
              </a>

              <a href="mailto:info@kynyx.com" className="flex items-center gap-4 group">
                <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <span className="group-hover:text-purple-400 transition-colors">
                  info@kynyx.com
                </span>
              </a>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold mb-6 text-white">Stay Ahead</h3>
            <p className="text-gray-400">
              Get exclusive insights, updates, and early access to new features.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
              >
                {subscribed ? (
                  <>Subscribed!</>
                ) : (
                  <>
                    Subscribe Now <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {subscribed && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-cyan-400 text-sm text-center"
                >
                  Welcome to the future
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-10 border-t border-gray-800 flex flex-col lg:flex-row justify-between items-center gap-6"
        >
          {/* Social Icons */}
          <div className="flex gap-6">
            {[
              { Icon: Instagram, href: "https://instagram.com/kynyxsolutions", color: "hover:text-pink-500" },
              { Icon: Linkedin, href: "https://linkedin.com/company/kynyxsolutions", color: "hover:text-blue-500" },
              { Icon: Facebook, href: "https://facebook.com/kynyxsolutions", color: "hover:text-blue-600" },
              { Icon: Twitter, href: "https://x.com/kynyxsolutions", color: "hover:text-white" },
            ].map(({ Icon, href, color }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className={`text-gray-500 ${color} transition-all duration-300`}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          <p className="text-gray-500 text-sm">
            © {currentYear} Kynyx Solutions LLC. All rights reserved. • Made in the United States
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;