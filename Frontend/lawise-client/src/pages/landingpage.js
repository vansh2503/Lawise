import React, { useState } from 'react';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsArticles = [
    {
      title: "New Legal Reforms 2023",
      description: "Discover the latest changes in legal regulations and how they impact businesses and individuals.",
      link: "/news/legal-reforms-2023",
    },
    {
      title: "Understanding Your Rights",
      description: "A guide to understanding your legal rights in everyday situations.",
      link: "/news/understanding-your-rights",
    },
    {
      title: "Top Legal Cases of the Year",
      description: "An overview of the most influential cases and verdicts this year.",
      link: "/news/top-legal-cases",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsArticles.length) % newsArticles.length);
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-900 bg-opacity-80 fixed w-full z-20 top-0 left-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-white">
                Lawise
              </a>
              <div className="hidden md:block ml-10 space-x-8">
                <a href="#services" className="text-gray-300 hover:text-white">
                  Services
                </a>
                <a href="#about" className="text-gray-300 hover:text-white">
                  About Us
                </a>
                <a href="#testimonials" className="text-gray-300 hover:text-white">
                  Testimonials
                </a>
                <a href="#news" className="text-gray-300 hover:text-white">
                  News
                </a>
                <a href="#contact" className="text-gray-300 hover:text-white">
                  Contact
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <a
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Sign Up
              </a>
              <a
                href="/login"
                className="border border-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/path/to/hero-image.jpg")', marginTop: '64px' }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">Your Trusted Legal Partner</h1>
          <p className="text-lg mb-8">Expert legal advice and representation at your fingertips.</p>
          <a href="#services" className="text-blue-500 hover:underline">
            Learn More
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-semibold">Our Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Corporate Law</h3>
            <p>Expert legal assistance for your corporate needs.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Family Law</h3>
            <p>Reliable and compassionate family legal services.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Criminal Defense</h3>
            <p>Experienced defense to protect your rights.</p>
          </div>
        </div>
      </section>

      {/* News Bulletin Section with Carousel */}
      <section id="news" className="py-16 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-semibold">Latest News</h2>
          <p className="text-lg text-gray-600">Stay updated with the latest news and insights in the legal world.</p>
        </div>
        
        <div className="relative max-w-5xl mx-auto overflow-hidden">
          <div className="flex space-x-6 overflow-x-auto scroll-smooth">
            {newsArticles.map((article, index) => (
              <div
                key={index}
                className={`min-w-full sm:min-w-[calc(50%-0.5rem)] p-6 bg-gray-100 rounded-lg shadow transform transition-all ${
                  currentSlide === index ? "scale-105" : ""
                }`}
              >
                <h3 className="text-2xl font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-700">{article.description}</p>
                <a
                  href={article.link}
                  className="text-blue-600 hover:underline mt-4 block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>

          {/* Carousel Navigation */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={prevSlide}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Prev
            </button>
            <button
              onClick={nextSlide}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-8 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 Lawise. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
