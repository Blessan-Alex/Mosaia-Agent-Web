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
      {/* Left: Logo with rounded background */}
      <div className="flex items-center gap-2 bg-white text-black font-bold px-4 py-2 rounded-xl shadow">
        <img src="/assets/MosaiaLogo.svg" alt="Mosaia" className="h-6 w-auto" />
      </div>

      {/* Right: Nav Links as gradient buttons */}
      <ul className="flex gap-4">
        {navLinks.map((link) => (
          <li key={link.label}>
            <button
              onClick={() => handleNavClick(link.hash)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-white via-red-400 to-red-600 text-black font-medium shadow hover:scale-105 transition-transform"
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
