import { useEffect } from 'react';
import Navbar from './components/Navbar';
import ToolsSection from './components/ToolsSection';
import CommandPalette from './components/CommandPalette';
import AboutSection from './components/About';
import ConnectSection from './components/Connect';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Routes, Route } from 'react-router-dom';
import SlackAgentPage from './pages/SlackAgentPage';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="relative min-h-screen text-white font-['Inter'] z-0">
      {/* 🖤 Overlay Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/90 via-black/80 to-[#0e0e0e]" />
      <Navbar />
      <CommandPalette />
      <Routes>
        <Route path="/" element={
          <>
            {/* 🏠 Hero Section */}
            <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center pb-8">
              {/* Powered by Mosaia logo above the hero heading */}
              <div className="flex flex-col items-center mb-0 mt-0">
                <div className="flex items-center bg-white rounded-full shadow px-5 py-2">
                  <span className="text-xs text-gray-700 mr-1 font-['Inter']">powered by</span>
                  <img src="/assets/MosaiaLogo.svg" alt="Mosaia Logo" className="h-5 w-auto opacity-80" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text mt-12 leading-relaxed py-6">
                Let Agents Handle the Boring Stuff
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl mt-4 max-w-3xl text-gray-300 font-medium leading-relaxed">
                <span className="block font-semibold text-white">
                  Supercharge your workflow with <span className="text-white font-bold">Slack</span> & <span className="text-white font-bold">Notion</span> agents.
                </span>
                <span className="block mt-2 text-white/90 text-xl font-semibold">
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
                    href="https://youtu.be/uBPvUVoWk0k?si=YRL1iTSP7ZM3rLHQ"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-white text-white px-6 py-3 rounded-2xl hover:bg-white hover:text-black transition-colors"
                  >
                    → Watch 30s Demo
                  </a>
                </div>
                <p>Seamless, autonomous, and always in sync.</p>
              </div>
            </section>
            {/* 🤖 Agents Section */}
            <ToolsSection />
            {/* 📖 About Section */}
            <AboutSection />
            {/* 🔗 Connect Section */}
            <ConnectSection />
          </>
        } />
        <Route path="/slack-agent" element={<SlackAgentPage />} />
        <Route path="/notion-agent" element={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text">Notion Agent</h1>
            <p className="text-lg md:text-2xl text-gray-300 font-semibold">Coming soon!</p>
          </div>
        } />
        <Route path="/discord-agent" element={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text">Discord Agent</h1>
            <p className="text-lg md:text-2xl text-gray-300 font-semibold">Coming soon!</p>
          </div>
        } />
        <Route path="/whatsapp-agent" element={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text">WhatsApp Agent</h1>
            <p className="text-lg md:text-2xl text-gray-300 font-semibold">Coming soon!</p>
          </div>
        } />
        <Route path="/gmeet-agent" element={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text">GMeet Agent</h1>
            <p className="text-lg md:text-2xl text-gray-300 font-semibold">Coming soon!</p>
          </div>
        } />
        <Route path="/zoom-agent" element={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text">Zoom Agent</h1>
            <p className="text-lg md:text-2xl text-gray-300 font-semibold">Coming soon!</p>
          </div>
        } />
        <Route path="/teams-agent" element={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text">Teams Agent</h1>
            <p className="text-lg md:text-2xl text-gray-300 font-semibold">Coming soon!</p>
          </div>
        } />
        <Route path="/telegram-agent" element={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text">Telegram Agent</h1>
            <p className="text-lg md:text-2xl text-gray-300 font-semibold">Coming soon!</p>
          </div>
        } />
        <Route path="/email-agent" element={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text">Email Agent</h1>
            <p className="text-lg md:text-2xl text-gray-300 font-semibold">Coming soon!</p>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;