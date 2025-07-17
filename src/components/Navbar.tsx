import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navLinks = [
    { label: 'Home', hash: '#home' },
    { label: 'Agents', hash: '#tools' },
    { label: 'About', hash: '#about' },
    { label: 'Connect', hash: '#connect' },
  ];
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (hash: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation, then scroll
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 absolute top-0 left-0 z-20">
      {/* Left: AgentFlow logo with its own white background */}
      <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow">
        <div className="flex items-center justify-center bg-white rounded-full h-10 w-10 mr-2">
          <img src="/assets/wind.png" alt="AgentFlow Logo" className="h-7 w-7 object-contain" />
        </div>
        <span className="text-black font-['Inter'] text-xl lowercase" style={{ textTransform: 'lowercase', fontWeight: 400 }}>
          agentflow
        </span>
      </div>
      {/* Right: Nav Links as white pill buttons */}
      <ul className="flex gap-4">
        {navLinks.map((link) => (
          <li key={link.label}>
            <button
              onClick={() => handleNavClick(link.hash)}
              className="px-4 py-1.5 rounded-xl bg-white text-black font-['Inter'] shadow hover:scale-105 transition-transform text-sm lowercase"
              style={{ textTransform: 'lowercase' }}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
