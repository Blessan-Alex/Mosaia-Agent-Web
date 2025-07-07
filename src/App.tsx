import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import ToolsSection from './components/ToolsSection';
import CommandPalette from './components/CommandPalette';
import AboutSection from './components/About';
import ConnectSection from './components/Connect';
import AOS from 'aos';
import 'aos/dist/aos.css';
import slackIcon from './assets/slack.svg';
import notionIcon from './assets/notion.svg';

function App() {
  useEffect(() => {
    AOS.init({
    duration: 800,
    once: true,
   });
    // const parallax = document.getElementById('parallax');
    // let animationFrameId: number | null = null;

    // const handleMouseMove = (e: MouseEvent) => {
    //   if (parallax) {
    //     if (animationFrameId) {
    //       cancelAnimationFrame(animationFrameId);
    //     }
    //     animationFrameId = requestAnimationFrame(() => {
    //       const x = (e.clientX / window.innerWidth - 0.5) * 30;
    //       const y = (e.clientY / window.innerHeight - 0.5) * 30;
    //       parallax.style.transform = `translate(${x}px, ${y}px)`;
    //     });
    //   }
    // };

    // window.addEventListener('mousemove', handleMouseMove);
    // return () => {
    //   window.removeEventListener('mousemove', handleMouseMove);
    //   if (animationFrameId) {
    //     cancelAnimationFrame(animationFrameId);
    //   }
    // };
  }, []);

  return (
    <div className="relative min-h-screen text-white font-['Inter'] z-0">

      {/* 🌌 Spline Parallax Background */}
      <div
        id="parallax"
        className="absolute inset-0 z-0 transition-transform duration-100 ease-out"
        style={{ opacity: 0.1 }}
        dangerouslySetInnerHTML={{
          __html: `<spline-viewer url="https://prod.spline.design/ong8NJtDOFY5Ym8t/scene.splinecode" style="width: 100%; height: 100%; pointer-events: none;"></spline-viewer>`,
        }}
      />

      {/* 🖤 Overlay Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/90 via-black/80 to-[#0e0e0e]" />

      {/* ✨ Main Content */}
      <div className="relative z-10 px-6 py-16 max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
        <Navbar />
        <CommandPalette />

        {/* 🏠 Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center pb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text mt-12 leading-relaxed py-6">
            Let Agents Handle the Boring Stuff
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl mt-4 max-w-3xl text-gray-300 font-medium leading-relaxed">
            <span className="block font-semibold text-white">
              Supercharge your workflow with <span className="text-white font-bold">Slack</span> & <span className="text-white font-bold">Notion</span> agents.
            </span>
            <span className="block mt-2 text-white/90 text-xl font-semibold">
              Let AI handle the busywork—so you can focus on what matters most.
            </span>
            <span className="block mt-2 text-gray-400 italic">
              Powered by <span className="text-white font-semibold not-italic">Mosaia</span>. No fluff. Just flow.
            </span>
          </h2>

          {/* 🚀 CTA Buttons */}
          <div className="mt-10 text-sm text-gray-400 flex flex-col items-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#tools"
                className="bg-white text-black font-semibold px-6 py-3 rounded-2xl hover:scale-105 transition-transform shadow-md"
              >
                → Try It in Action
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="border border-white text-white px-6 py-3 rounded-2xl hover:bg-white hover:text-black transition-colors"
              >
                → Watch 30s Demo
              </a>
            </div>
            <p>Decentralized, autonomous, and always in sync.</p>
          </div>
        </section>

        {/* 📖 About Section */}
        <AboutSection />

        {/* 🛠️ Tools Section */}
        <ToolsSection />

        {/* 🔗 Connect Section */}
        <ConnectSection />
      </div>
    </div>
  );
}

export default App;