import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const SLACK_BOT_INVITE_URL = 'https://slack.com/oauth/v2/authorize?client_id=YOUR_CLIENT_ID&scope=bot'; // Replace with your real URL
const MOSAIA_MODEL_ID = '686b0d9faa87d15459024604';
const MOSAIA_API_URL = 'https://api.mosaia.ai/v1/agent/chat/completions';
const CHAT_HISTORY_KEY = 'mosaia-slack-agent-chat-history';

const ONBOARDING_MSG = `👋 **Welcome to the Mosaia Slack Agent!**

1. **Make sure you have [added the bot to your Slack server](${SLACK_BOT_INVITE_URL})**.
2. I'll need your **Channel ID**, **User ID**, and **Google Sheet ID** (where you want tasks updated).
3. After updating, I'll give you a link to the Google Sheet.

_You can paste your IDs here and start chatting!_
`;

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3RpdmVfaWQiOiJjOTJkMjMzNTk3MWE5NjJiYTI0YWNkNjE4ZjE3M2YzNiIsImNsaWVudCI6IjY4NmI3MWIxODE4YmZkZTE0MDFjNjc5MCIsInVzZXIiOiI2ODYzZTllZTQyMDM4OTk0NThiNzZlNTciLCJhcHAiOiI2NzRiNjkxZTEwZGM3MzAyMmU5OGVkYzEiLCJib3QiOiI2ODZiNzFiMTgxOGJmZGUxNDAxYzY3OGUiLCJpYXQiOjE3NTE4NzE5MjF9.rsfSSe9Z8_KOEojLZJ7eWvgleN8dRkICjbCxOkXqaYU';

const SlackAgentPage = () => {
  type Message = { sender: 'user' | 'agent'; text: string };
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(CHAT_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [
      { sender: 'agent', text: ONBOARDING_MSG }
    ];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  async function sendMessageToMosaia(message: string) {
    setLoading(true);
    try {
      const response = await fetch(MOSAIA_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: MOSAIA_MODEL_ID,
          messages: [
            { role: 'user', content: message }
          ]
        })
      });
      const data = await response.json();
      setLoading(false);
      return data.choices?.[0]?.message?.content || 'No response from agent.';
    } catch (err) {
      setLoading(false);
      return 'Error contacting agent.';
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    const reply = await sendMessageToMosaia(input);
    setMessages((msgs: Message[]) => [...msgs, { sender: 'agent', text: reply }]);
  };

  const handleClearHistory = () => {
    setMessages([{ sender: 'agent', text: ONBOARDING_MSG }]);
    localStorage.removeItem(CHAT_HISTORY_KEY);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl flex flex-col h-[75vh] md:h-[80vh]">
      <div className="flex flex-row items-center justify-between px-8 pt-6 pb-2 border-b border-white/10">
        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight mb-1">Slack Agent</h1>
        <button onClick={handleClearHistory} className="text-xs md:text-sm text-red-400 hover:text-red-600 font-semibold bg-white/5 px-4 py-2 rounded-xl transition-colors">Clear Chat</button>
      </div>
      <div className="flex-1 overflow-y-auto px-2 md:px-8 py-4 bg-transparent flex flex-col gap-4 text-base md:text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
        {messages.map((msg: Message, i: number) => (
          <div key={i} className={msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <div className={
              msg.sender === 'user'
                ? 'max-w-2xl bg-gradient-to-br from-blue-700/80 to-blue-900/80 text-white rounded-2xl px-5 py-3 mb-1 text-right text-base md:text-lg shadow-lg font-medium'
                : 'max-w-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 text-white rounded-2xl px-5 py-3 mb-1 text-left text-base md:text-lg shadow-lg font-medium'
            }>
              {msg.sender === 'agent' ? (
                <ReactMarkdown
                  components={{
                    a: ({node, ...props}) => <a {...props} className="underline text-blue-300 hover:text-blue-100 break-all" target="_blank" rel="noopener noreferrer" />
                  }}
                >{msg.text}</ReactMarkdown>
              ) : (
                <span>{msg.text}</span>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 text-white rounded-2xl px-5 py-3 mb-1 text-left text-base md:text-lg shadow-lg font-medium opacity-70">
              <span className="italic text-gray-300">Agent is typing...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSend} className="px-8 py-4 border-t border-white/10 bg-transparent flex gap-2 items-end">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 px-5 py-3 rounded-2xl bg-black/40 border border-gray-700 text-white text-base md:text-lg font-medium shadow-md"
          placeholder="Type your message..."
          disabled={loading}
          style={{ minWidth: 0 }}
          autoFocus
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-gray-700 text-white rounded-2xl font-bold text-base md:text-lg hover:scale-105 transition-transform disabled:opacity-60 shadow-md"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SlackAgentPage; 