import React from 'react';

const ConnectSection = () => {
  return (
    <section id="connect" data-aos="zoom-in"  className="w-full mt-20 px-6 py-12 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text mb-8 leading-relaxed py-2">Connect</h2>

      <div className="max-w-4xl mx-auto bg-white text-black rounded-2xl shadow-lg p-8 grid gap-6 sm:grid-cols-2">
        {/* Left Info */}
        <div className="flex flex-col justify-center text-left gap-4">
          <h3 className="text-xl font-bold text-red-500">Contact Info</h3>
          <p>Email: <span className="text-gray-700">blazeblessan123@gmail.com</span></p>
          <p>Phone: <span className="text-gray-700">+91 9188563150</span></p>
          <p>Location: <span className="text-gray-700">India (Remote)</span></p>
        </div>

        {/* Right Form */}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <textarea
            placeholder="Message"
            rows={4}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-red-500 to-gray-700 text-white font-semibold py-2 rounded-xl hover:scale-105 transition-transform"
          >
            Send Message →
          </button>
        </form>
      </div>
    </section>
  );
};

export default ConnectSection;