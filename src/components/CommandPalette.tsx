import { useEffect, useState } from 'react';

const actions = [
  { title: '🔍 Open Slack Agent', link: '#tools' },
  { title: '📄 Open Notion Agent', link: '#tools' },
  { title: '🧠 About Mosaia', link: '#about' },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#1a1a1a] w-full max-w-md rounded-xl p-6 shadow-2xl border border-gray-700">
        <div className="text-white text-lg font-semibold mb-4">⚡ Command Palette</div>
        <ul className="space-y-3">
          {actions.map((action) => (
            <li key={action.title}>
              <a
                href={action.link}
                className="block w-full bg-gradient-to-r from-white via-red-400 to-red-600 text-black rounded-xl px-4 py-2 font-medium hover:scale-105 transition-transform"
              >
                {action.title}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setOpen(false)}
          className="mt-4 text-sm text-gray-400 hover:text-white"
        >
          ⌫ Close (Esc)
        </button>
      </div>
    </div>
  );
};

export default CommandPalette;

