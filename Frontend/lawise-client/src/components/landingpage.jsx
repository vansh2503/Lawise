import React, { useEffect, useState } from 'react';
import { FaUsers, FaBalanceScale, FaSmile, FaCommentDots } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LandingPage = () => {
  // ✅ Enhanced Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // ✅ Apply dark class and persist
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const testimonials = [
    {
      quote: "Lawise helped me find a family lawyer in 10 minutes. So smooth and professional!",
      name: "— Priya Sharma"
    },
    {
      quote: "I got 3 clients in my first week using Lawise. Great platform for lawyers!",
      name: "— Advocate Anil Mehra"
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white scroll-smooth">
      {/* Navbar */}
      <nav className="bg-gray-100 dark:bg-gray-800 fixed w-full z-20 top-0 left-0 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-2xl font-bold text-blue-600 dark:text-white hover:text-blue-700">Lawise</a>
              <div className="hidden md:flex space-x-6">
                <a href="#services" className="hover:text-blue-600">Services</a>
                <a href="#about" className="hover:text-blue-600">About</a>
                <a href="#testimonials" className="hover:text-blue-600">Testimonials</a>
                <a href="#contact" className="hover:text-blue-600">Contact</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? '🌞' : '🌙'}
              </button>
              <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</a>
              <a href="/login" className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white">Login</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:flex items-center justify-between">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-left"
          >
            <h1 className="text-5xl font-extrabold leading-tight text-gray-900 dark:text-white mb-6">
              Legal Help, Just a Click Away.
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Get matched with verified lawyers, submit your case in minutes, and track progress — all in one place.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                Find My Lawyer
              </a>
              <a href="/team" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Meet Our Team
              </a>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>⭐ 4.9/5 Rated by 1200+ users</span>
              <span className="hidden sm:inline-block">•</span>
              <span className="hidden sm:inline-block">24x7 Support</span>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="mt-10 lg:mt-0"
          >
            <img
              src="https://images.unsplash.com/photo-1588776814546-ecb64ab3466d?auto=format&fit=crop&w=700&q=80"
              alt=""
              className="rounded-lg shadow-lg w-full max-w-md mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12" data-aos="fade-up">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <FaUsers className="text-4xl mx-auto text-blue-600 mb-2" />
            <h3 className="text-4xl font-bold">1,200+</h3>
            <p>Clients Served</p>
          </div>
          <div>
            <FaBalanceScale className="text-4xl mx-auto text-blue-600 mb-2" />
            <h3 className="text-4xl font-bold">300+</h3>
            <p>Verified Lawyers</p>
          </div>
          <div>
            <FaSmile className="text-4xl mx-auto text-blue-600 mb-2" />
            <h3 className="text-4xl font-bold">98%</h3>
            <p>Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white text-center" id="services" data-aos="fade-up">
        <h2 className="text-4xl font-bold mb-10">How It Works</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-left px-4">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">1. Sign Up</h3>
            <p>Choose your role – client or lawyer – and create your account.</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">2. Submit Info</h3>
            <p>Clients submit case details. Lawyers upload profiles and expertise.</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">3. Get Matched</h3>
            <p>We connect you to the right legal expert for your case.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white dark:bg-gray-900 py-16 text-center text-gray-800 dark:text-white" id="testimonials" data-aos="fade-up">
        <h2 className="text-4xl font-bold mb-10">What Our Users Say</h2>
        <div className="max-w-3xl mx-auto">
          <Slider {...sliderSettings}>
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow">
                <p className="mb-4 italic">“{t.quote}”</p>
                <h4 className="font-bold text-blue-600">{t.name}</h4>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white py-16 text-center" data-aos="zoom-in">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Legal Help?</h2>
        <p className="mb-6">Join Lawise today and get matched with a verified lawyer in minutes.</p>
        <a href="/signup" className="bg-white text-blue-700 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">Sign Up Now</a>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 dark:bg-gray-900 text-center text-gray-800 dark:text-white" id="contact">
        <p>&copy; {new Date().getFullYear()} Lawise. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4 text-sm">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </footer>

      {/* Chatbot */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition animate-bounce z-50"
        onClick={() => window.open("https://se-chatbot.onrender.com/", "_blank")}
      >
        <FaCommentDots size={24} />
      </button>
    </div>
  );
};

export default LandingPage;
