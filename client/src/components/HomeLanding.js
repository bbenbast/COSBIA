import { features } from '../data/features';
import React from "react";

export const HomeLanding = ({ onGetStarted }) => {
  // features imported from ../data/features
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative bg-[#101037] overflow-hidden min-h-[640px] flex items-center justify-center w-full">
        {/* Hero Background Image: place your hero image at `public/images/hero-hex-bg.png` */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/hero-hex-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 1,
          }}
        />
        {/* Gradient Overlay for text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#101037] via-[#101037]/80 to-transparent"></div> */}

        {/* Floating Shapes */}
        {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
           <div className="absolute top-20 right-[10%] w-24 h-24 border-4 border-orange-500/20 rotate-45 rounded-lg animate-pulse"></div>
           <div className="absolute bottom-20 left-[5%] w-32 h-32 bg-purple-600/20 rounded-full blur-2xl"></div>
        </div> */}

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl px-4 md:px-6 mt-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg tracking-tight">
            Transform Learning Into an <br />
            <span className="text-transparent bg-clip-text bg-cosbia-accent">
              Epic Adventure!
            </span>
          </h1>
          <p className="text-blue-100/80 text-base md:text-lg mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Master cybersecurity through gamified challenges, interactive
            lessons, and real-world scenarios designed for the modern web.
          </p>
          <div className="mt-6 flex flex-row items-center justify-center gap-3">
            <button
              onClick={onGetStarted}
              className="bg-cosbia-accent hover:bg-orange-600 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-md transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() =>
                window.scrollTo({
                  top: document.getElementById("features")?.offsetTop || 700,
                  behavior: "smooth",
                })
              }
              className="text-white/90 text-sm underline underline-offset-2"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-[#fdfbf6] py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2e344d] mb-4">
              Why Choose COSBIA?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines educational best practices with engaging
              game mechanics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`bg-[#3b4363] rounded-xl p-8 text-center shadow-xl transform transition hover:-translate-y-2 border-b-4 ${feature.borderColor}`}
              >
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-full bg-[#2a304a] shadow-inner ${feature.iconColor}`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-white text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section - Redesigned */}
      <div
        id="about"
        className="bg-[#1a1b2e] py-24 px-6 border-t border-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#24273f] rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50 flex flex-col lg:flex-row">
            {/* Image Side (Placeholder) */}
            <div className="lg:w-1/2 relative min-h-[400px] bg-gray-900">
              <img
                src="/images/aboutImage.jpg"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                alt="Team working"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-purple-900/40"
                style={{ display: "flex" }}
              >
                
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
              <span className="text-cosbia-accent font-bold tracking-widest text-sm uppercase mb-4">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Democratizing Cyber Safety for Everyone
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                At COSBIA, we believe that cybersecurity isn't just for IT
                professionals—it's a fundamental life skill. Traditional
                training is boring and ineffective. We're changing that.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                By leveraging the power of gamification and AI-driven
                assessments, we create a learning environment that adapts to
                your pace and style.
              </p>

              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">10k+</span>
                  <span className="text-sm text-gray-500 uppercase">Users</span>
                </div>
                <div className="w-px bg-gray-700 mx-4"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">500+</span>
                  <span className="text-sm text-gray-500 uppercase">
                    Modules
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Banner - Redesigned */}
      <div className="bg-[#1a1b2e] py-20 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-cosbia-accent to-[#f43f5e] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative background circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto font-medium">
              Don't wait for a data breach to learn the basics. Join COSBIA
              today and become a cyber defender.
            </p>
            <button
              onClick={onGetStarted}
              className="bg-white text-orange-600 font-bold py-4 px-12 rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 hover:bg-gray-50"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
