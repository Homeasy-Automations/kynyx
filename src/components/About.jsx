"use client";

import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Globe,
  Users,
  ArrowRight,
  Building2,
  HeartHandshake,
  ShieldCheck,
  Eye,
  Star,
  Zap,
} from "lucide-react";

const teamMembers = [
  {
    name: "Vike",
    title: "Founder & CEO",
    image: "../vike.png",
    alt: "Vike - Founder & CEO of Kynyx Solutions",
  },
  {
    name: "Kundan Kumar",
    title: "Social Media Manager",
    image: "../kundan.png",
    alt: "Aditya Kumar - Media Manager at Kynyx",
  },
  {
    name: "Amit Kumar",
    title: "Full-Stack Developer",
    image: "../Amit1.png",
    alt: "Amit Kumar - Full-Stack Developer at Kynyx",
  },
  {
    name: "Hrithik Kumar",
    title: "Frontend Developer",
    image: "../hritik.png",
    alt: "Hrithik Kumar - Frontend Developer at Kynyx",
  },
];

const values = [
  {
    title: "Partnership",
    desc: "We’re not vendors — we’re your long-term growth partner.",
    icon: HeartHandshake,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    title: "Quality",
    desc: "Pixel-perfect code. Flawless design. Zero compromises.",
    icon: ShieldCheck,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Transparency",
    desc: "Clear pricing. Honest timelines. No surprises — ever.",
    icon: Eye,
    gradient: "from-emerald-500 to-teal-600",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* SEO + Organization Schema */}
      <Helmet>
        <title>About Us | Kynyx - Your Trusted Digital Growth Partner</title>
        <meta
          name="description"
          content="Learn about Kynyx, a top-rated US-based digital agency specializing in web development, mobile apps, and marketing. Discover our mission, values, and commitment to delivering exceptional results for ambitious brands."
        />
        <meta
          name="keywords"
          content="about digital agency, US-based web development company, digital growth partner, top-rated digital agency, Kynyx about"
        />
        <link rel="canonical" href="https://kynyx.com/about" />

        <meta
          property="og:title"
          content="About Us | Kynyx - Your Trusted Digital Growth Partner"
        />
        <meta
          property="og:description"
          content="Discover the team, values, and mission behind Kynyx — a US-based digital agency obsessed with your success."
        />
        <meta property="og:url" content="https://kynyx.com/about" />
        <meta property="og:image" content="https://kynyx.com/og-about.jpg" />

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Kynyx Solutions LLC",
            url: "https://kynyx.com",
            logo: "https://kynyx.com/logo.png",
            description:
              "Top-rated US-based digital agency specializing in web development, mobile apps, and growth marketing.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "8 The Green, Suite A",
              addressLocality: "Dover",
              addressRegion: "DE",
              postalCode: "19901",
              addressCountry: "US",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1 (239) 450-6273",
              contactType: "Customer Service",
              email: "info@kynyx.com",
            },
            sameAs: [
              "https://linkedin.com/company/kynyx",
              "https://twitter.com/kynyx",
            ],
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
              About Kynyx:
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Your Digital Growth Partner
              </span>
            </motion.h1>

            <p className="mt-8 text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto">
              We don’t just build websites and apps.
              <br />
              <span className="text-cyan-400 font-bold">
                We build revenue engines for ambitious brands.
              </span>
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8">
                Our Journey: From Vision to Execution
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Founded in Delaware, USA — Kynyx was born from a simple belief:
                <span className="text-cyan-400 font-bold">
                  {" "}
                  most agencies care about profit. We care about your success.
                </span>
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Tired of seeing businesses overpay for underperforming digital
                solutions, we built a company that combines enterprise-grade
                quality with startup agility. Today, we serve clients worldwide
                — from Silicon Valley startups to established brands — helping
                them dominate their markets through strategy, design, and
                technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Kynyx Team Collaboration - Building the future of digital experiences"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-3xl" />
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                Our Core Values: Quality, Transparency, and Partnership
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-gray-900/50 backdrop-blur-xl rounded-3xl p-10 border border-gray-800 hover:border-cyan-500/50 transition-all"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity`}
                  />
                  <value.icon className="w-16 h-16 text-cyan-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-300">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Meet the Team Behind Kynyx
            </h2>
            <p className="text-xl text-gray-400 mb-16">
              Passionate experts obsessed with your success
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -20 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity" />
                  <img
                    src={member.image}
                    alt={member.alt}
                    className="w-full h-72 rounded-2xl shadow-2xl object-cover border-4 border-gray-800 group-hover:border-cyan-500 transition-all"
                  />
                  <div className="mt-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-cyan-400">{member.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 ">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
              What Sets Us Apart: The Kynyx Advantage
            </h2>
            <p className="text-2xl text-white/90 mb-12">
              US-based leadership • Global talent • Obsessed with results
            </p>
            <div className="grid grid-cols-3 gap-8 mb-12">
              {[
                { icon: Star, label: "5.0 Rating" },
                { icon: Zap, label: "24hr Response" },
                { icon: Building2, label: "US Company" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <item.icon className="w-16 h-16 mx-auto mb-4 text-white" />
                  <p className="text-xl font-bold text-white">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-3 px-10 py-6 bg-white text-black font-black text-xl rounded-full hover:scale-105 transition-all"
              >
                Explore Services <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-6 bg-white/20 backdrop-blur-xl text-white font-bold rounded-full hover:bg-white/30 transition-all"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="py-24 bg-black border-t border-gray-800">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-5xl font-black mb-6">Join the Movement</h2>
            <p className="text-xl text-gray-400 mb-10">
              We’re always looking for brilliant minds to help shape the future
              of digital.
            </p>
            <Link to="/career">
              <button className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-black text-xl rounded-full shadow-2xl hover:scale-105 transition-all">
                <Users className="w-8 h-8" />
                View Open Positions
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
