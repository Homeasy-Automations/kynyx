import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo12.png";
import BookConsultationForm from "./Getquote";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [hideIcons, setHideIcons] = useState(false);

  // scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide floating icons when footer is visible
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHideIcons(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header>
        {/* Navbar */}
        <nav
          className="bg-black/30 backdrop-blur text-white px-6 lg:px-10 py-1 fixed w-full z-50 rounded-bl-2xl rounded-br-2xl"
        >
          <div className="flex justify-between items-center relative">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 z-10" title="Home Page">
              <img
                src={logo}
                alt="Kynyx Logo"
                title="kynyx Logo"
                className="h-8 sm:h-10 lg:h-12 w-auto object-contain transition-all duration-300 ease-in-out"
              />
            </Link>

            {/* Centered Nav (Desktop) */}
            <nav className="hidden lg:flex flex-1 justify-center gap-8 items-center font-sans">
  <Link
    to="/"
    title="Kynyx Home page"
    className="relative text-gray-300 font-medium text-xl transition transform duration-200 hover:scale-110 hover:text-cyan-300 active:scale-95 active:text-pink-400"
  >
    Home
  </Link>

  <Link
    to="/services"
    title="Explore Kynyx Solutions Services"
    className="relative text-gray-300 font-medium text-xl transition transform duration-200 hover:scale-110 hover:text-cyan-300 active:scale-95 active:text-pink-400"
  >
    Services
  </Link>

  <Link
    to="/portfolio"
    title="View our Portfolio of Projects"
    className="relative text-gray-300 font-medium text-xl transition transform duration-200 hover:scale-110 hover:text-cyan-300 active:scale-95 active:text-pink-400"
  >
    Portfolio
  </Link>

  <Link
    to="/about"
    title="Learn more About Kynyx Solutions"
    className="relative text-gray-300 font-medium text-xl transition transform duration-200 hover:scale-110 hover:text-cyan-300 active:scale-95 active:text-pink-400"
  >
    About
  </Link>

  <Link
    to="/contact"
    title="Contact Kynyx Solutions – Get in touch"
    className="relative text-gray-300 font-medium text-xl transition transform duration-200 hover:scale-110 hover:text-cyan-300 active:scale-95 active:text-pink-400"
  >
    Contact
  </Link>

  <Link
    to="/blog-page"
    title="Read insights and updates on the Kynyx Blog"
    className="relative text-gray-300 font-medium text-xl transition transform duration-200 hover:scale-110 hover:text-cyan-300 active:scale-95 active:text-pink-400"
  >
    Blog
  </Link>
</nav>


            {/* Right Button (Desktop) */}
            <div className="hidden lg:block z-10">
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold font-sans transition transform duration-200 hover:scale-110 active:scale-95"
              >
                Get a Quote
              </button>
            </div>

            {/* Hamburger menu button (Mobile) */}
            <button
              className="lg:hidden text-gray-300 focus:outline-none z-20"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Nav */}
          {isOpen && (
            <div className="lg:hidden h-svh flex flex-col items-center bg-black/ backdrop-blur-md">
              <div className="flex flex-col justify-center items-center space-y-6 mt-20">
                <Link to="/" className="text-gray-300 font-medium text-lg" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/services" className="text-gray-300 font-medium text-lg" onClick={() => setIsOpen(false)}>Services</Link>
                <Link to="/portfolio" className="text-gray-300 font-medium text-lg" onClick={() => setIsOpen(false)}>Portfolio</Link>
                <Link to="/about" className="text-gray-300 font-medium text-lg" onClick={() => setIsOpen(false)}>Why Us</Link>
                <Link to="/contact" className="text-gray-300 font-medium text-lg" onClick={() => setIsOpen(false)}>Contact</Link>
                <Link to="/blog-page" className="text-gray-300 font-medium text-lg" onClick={() => setIsOpen(false)}>Blog</Link>
              </div>
              <div className="mt-10">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowForm(true);
                  }}
                  className="text-center py-2 px-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Floating Social Icons */}
{/* Floating Social Icons */}
{!hideIcons && (
  <>
    {/* Desktop/Tablet → Vertical Right Side */}
    <div className="hidden sm:flex fixed right-6 top-2/4 -translate-y-1/2 z-50 flex-col items-center gap-6">
  <a
    href="https://www.facebook.com/kynyxsolutions"
    target="_blank"
    rel="noopener noreferrer"
    title="Follow us on Facebook"
    className="text-gray-400 hover:text-blue-700 transition-transform hover:scale-110"
  >
    <FaFacebook size={26} />
  </a>

  <a
    href="https://www.instagram.com/kynyxsolutions"
    target="_blank"
    rel="noopener noreferrer"
    title="Follow us on Instagram"
    className="text-gray-400 hover:text-pink-500 transition-transform hover:scale-110"
  >
    <FaInstagram size={26} />
  </a>

  <a
    href="https://x.com/kynyxsolutions"
    target="_blank"
    rel="noopener noreferrer"
    title="Follow us on X (Twitter)"
    className="text-gray-400 hover:text-white transition-transform hover:scale-110"
  >
    <FaXTwitter size={26} />
  </a>

  <a
    href="https://www.linkedin.com/company/kynyxsolutions"
    target="_blank"
    rel="noopener noreferrer"
    title="Connect with us on LinkedIn"
    className="text-gray-400 hover:text-blue-500 transition-transform hover:scale-110"
  >
    <FaLinkedin size={26} />
  </a>

  <a
    href="https://wa.me/+12394506273"
    target="_blank"
    rel="noopener noreferrer"
    title="Chat with us on WhatsApp"
    className="text-gray-400 hover:text-green-500 transition-transform hover:scale-110"
  >
    <FaWhatsapp size={26} />
  </a>
      {/* Divider line */}
      <div className="w-[2px] h-20 bg-gray-500 mt-4"></div>
    </div>

    {/* Mobile → Horizontal Bottom */}
    <div className="flex sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 items-center justify-center gap-8 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full">
      <a href="https://www.facebook.com/kynyxsolutions" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-transform hover:scale-110">
        <FaFacebook size={22} />
      </a>
      <a href="https://www.instagram.com/kynyxsolutions" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-transform hover:scale-110">
        <FaInstagram size={22} />
      </a>
      <a href="https://x.com/kynyxsolutions" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform hover:scale-110">
        <FaXTwitter size={22} />
      </a>
      <a href="https://www.linkedin.com/company/kynyxsolutions" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-transform hover:scale-110">
        <FaLinkedin size={22} />
      </a>
       <a href="https://wa.me/+12394506273" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-transform hover:scale-110">
        <FaWhatsapp size={22} />
      </a> 
    </div>
  </>
)}

      {/* Floating Consultation Form */}
      {showForm && <BookConsultationForm onClose={() => setShowForm(false)} />}
    </>
  );
};

export default Navbar;
