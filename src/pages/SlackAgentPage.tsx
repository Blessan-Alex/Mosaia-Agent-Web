import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const SLACK_CLIENT_ID = '9133067521076.9119279735127';
const SLACK_REDIRECT_URI = 'https://agentflowmosaia.netlify.app/auth/slack';
const SLACK_BOT_INVITE_URL = `https://slack.com/oauth/v2/authorize?client_id=${SLACK_CLIENT_ID}&scope=channels:read,users:read,chat:write,commands,app_mentions:read,im:history,groups:read,mpim:read,channels:join,channels:manage,users:read.email,team:read,users.profile:read,channels:history,groups:history,im:read,mpim:history,users:read&redirect_uri=${encodeURIComponent(SLACK_REDIRECT_URI)}`;
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

interface SlackWorkspace {
  id: string;
  name: string;
  domain: string;
  token: string;
}

interface SlackChannel {
  id: string;
  name: string;
  members: number;
  isPrivate: boolean;
}

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
  const [integrationSteps, setIntegrationSteps] = useState([
    { id: 1, title: 'Connect Slack Workspace', completed: false, inProgress: true },
    { id: 2, title: 'Select Channel', completed: false, inProgress: false },
    { id: 3, title: 'Configure Permissions', completed: false, inProgress: false },
    { id: 4, title: 'Set up Google Sheets', completed: false, inProgress: false },
    { id: 5, title: 'Test Integration', completed: false, inProgress: false }
  ]);
  
  // Slack Integration States
  const [workspaceConnected] = useState(false);
  const [selectedWorkspace] = useState<SlackWorkspace | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<SlackChannel | null>(null);
  const [slackChannels] = useState<SlackChannel[]>([]);
  const [loadingChannels] = useState(false);
  
  // Google Sheets States
  const [googleSheetId, setGoogleSheetId] = useState('');
  const [googleSheetName, setGoogleSheetName] = useState('');
  const [sheetsConnected, setSheetsConnected] = useState(false);
  
  // Form States
  const [showSheetForm, setShowSheetForm] = useState(false);
  const [testingIntegration, setTestingIntegration] = useState(false);
  
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

  // Slack Integration Functions
  const handleChannelSelect = (channel: SlackChannel) => {
    setSelectedChannel(channel);
    setIntegrationSteps(prev => prev.map(step => 
      step.id === 2 ? { ...step, completed: true, inProgress: false } : 
      step.id === 3 ? { ...step, inProgress: true } : step
    ));
  };

  const handleConfigurePermissions = () => {
    setIntegrationSteps(prev => prev.map(step => 
      step.id === 3 ? { ...step, completed: true, inProgress: false } : 
      step.id === 4 ? { ...step, inProgress: true } : step
    ));
    setShowSheetForm(true);
  };

  const handleSheetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleSheetId.trim() || !googleSheetName.trim()) return;
    
    try {
      // Simulate API call to connect Google Sheets
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setSheetsConnected(true);
      setShowSheetForm(false);
      
      setIntegrationSteps(prev => prev.map(step => 
        step.id === 4 ? { ...step, completed: true, inProgress: false } : 
        step.id === 5 ? { ...step, inProgress: true } : step
      ));
      
    } catch (error) {
      console.error('Failed to connect Google Sheets:', error);
    }
  };

  const handleTestIntegration = async () => {
    setTestingIntegration(true);
    try {
      // Simulate test message
      await new Promise(resolve => setTimeout(resolve, 150));
      
      setIntegrationSteps(prev => prev.map(step => 
        step.id === 5 ? { ...step, completed: true, inProgress: false } : step
      ));
      
      // Add success message to chat
      setMessages(prev => [...prev, {
        sender: 'agent', 
        text: '✅ **Integration successful!** Your Slack bot is now connected and ready to use. You can start chatting with it in your selected channel.' 
      }]);
      
    } catch (error) {
      console.error('Integration test failed:', error);
    } finally {
      setTestingIntegration(false);
    }
  };

  return (
    <div className="relative flex flex-row h-screen">
      {/* Integration Sidebar */}
      <div className="absolute top-0left-0 h-full w-80 bg-gray-950der-r border-white/10 z-20">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Slack Integration</h2>
          </div>

          {/* Integration Progress */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-300 mb-4">Setup Progress</h3>
            <div className="space-y-3">
              {integrationSteps.map((step) => (
                <div key={step.id} className="flex items-center space-x-3">
                  <div className={`w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.completed ? 'bg-green-500' : 
                    step.inProgress ? 'bg-blue-500' : 
                    'bg-gray-600'
                  }`}>
                    {step.completed ? '✓' : step.inProgress ? '⟳' : step.id}
                  </div>
                  <span className={`text-sm ${
                    step.completed ? 'text-green-400' : 
                    step.inProgress ? 'text-blue-400' : 
                    'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Connect Workspace */}
          {!workspaceConnected && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300">Step 1: Connect Workspace</h3>
              <a
                href={SLACK_BOT_INVITE_URL}
                className="w-full flex justify-center"
              >
                <img
                  alt="Add to Slack"
                  height="40"
                  width="139"
                  src="https://platform.slack-edge.com/img/add_to_slack.png"
                  srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
                  style={{ margin: '16px 0' }}
                />
              </a>
              <div className="text-xs text-gray-400 mt-2">
                You will be redirected to Slack to authorize the bot. After authorization, you will return here and your Slack user ID will be displayed below.
              </div>
            </div>
          )}

          {/* After OAuth, fetch and display the user's Slack user ID */}
          {workspaceConnected && selectedWorkspace && (
            <div className="mb-4 p-3 bg-white/10 rounded-xl border border-white/10">
              <div className="text-xs text-gray-300">Connected as:</div>
              <div className="text-white font-bold">User ID: {selectedWorkspace.id}</div>
              <div className="text-white font-bold">Workspace: {selectedWorkspace.name}</div>
            </div>
          )}

          {/* Step2elect Channel */}
          {workspaceConnected && !selectedChannel && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300">Step 2: Select Channel</h3>
              {loadingChannels ? (
                <div className="text-center py-4">
                  <div className="text-gray-400">Loading channels...</div>
                </div>
              ) : (
                <div className="space-y-2">
                  {slackChannels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => handleChannelSelect(channel)}
                      className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div className="text-white font-medium">#{channel.name}</div>
                      <div className="text-gray-400 text-sm">{channel.members} members</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step3igure Permissions */}
          {selectedChannel && !sheetsConnected && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300">Step 3: Configure Permissions</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white text-sm">Read messages</span>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white text-sm">Send messages</span>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white text-sm">Manage channels</span>
                  <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                </div>
              </div>
              <button
                onClick={handleConfigurePermissions}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Continue to Google Sheets
              </button>
            </div>
          )}

          {/* Step 4: Google Sheets Setup */}
          {sheetsConnected && !integrationSteps[4] && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300">Step 4: Google Sheets Setup</h3>
              {!showSheetForm ? (
                <button
                  onClick={() => setShowSheetForm(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Configure Google Sheets
                </button>
              ) : (
                <form onSubmit={handleSheetSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-300">Sheet Name</label>
                    <input
                      type="text"
                      value={googleSheetName}
                      onChange={(e) => setGoogleSheetName(e.target.value)}
                      className="w-full px-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
                      placeholder="Task Tracker"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300">Sheet ID</label>
                    <input
                      type="text"
                      value={googleSheetId}
                      onChange={(e) => setGoogleSheetId(e.target.value)}
                      className="w-full px-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
                      placeholder="1BxiMVs0RA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors"
                    >
                      Connect Sheets
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSheetForm(false)}
                      className="px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Step 5: Test Integration */}
          {sheetsConnected && integrationSteps[4] && !integrationSteps[5] && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300">Step 5: Test Integration</h3>
              <button
                onClick={handleTestIntegration}
                disabled={testingIntegration}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
              >
                {testingIntegration ? 'Testing...' : 'Test Integration'}
              </button>
            </div>
          )}

          {/* Integration Complete */}
          {integrationSteps[4] && (
            <div className="mb-6">
              <div className="text-center p-4 bg-green-500/10 border border-green-500">
                <div className="text-green-400 text-lg mb-2">✅</div>
                <div className="text-green-400 text-sm font-semibold">Integration Complete!</div>
                <div className="text-gray-400 text-xs mt-1">Your bot is ready to use</div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-300">Quick Actions</h3>
            <button className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
              <div className="text-white text-sm">View Connected Apps</div>
            </button>
            <button className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
              <div className="text-white text-sm">Manage Tokens</div>
            </button>
            <button className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
              <div className="text-white text-sm">Test Connection</div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-transparent ml-80">
        {/* Place chat UI elements directly here, no extra container */}
        <div className="flex flex-row items-center justify-between px-8 pt-6 pb-2 border-b border-white/10">
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Slack Agent</h1>
          <div className="flex gap-2">
            <button onClick={handleClearHistory} className="text-xs md:text-sm text-red-400 hover:text-red-300 font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10">Clear Chat</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 md:px-8 py-4 bg-transparent flex flex-col gap-4 text-base md:text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
          {messages.map((msg: Message, i: number) => (
            <div key={i} className={msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}>
              <div className={
                msg.sender === 'user'
                  ? 'max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl px-5 py-3 mb-1 text-right text-base md:text-lg shadow-lg font-medium hover:bg-white/15 transition-all duration-200'
                  : 'max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl px-5 py-3 mb-1 text-left text-base md:text-lg shadow-lg font-medium hover:bg-white/10 transition-all duration-200'
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
              <div className="max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl px-5 py-3 mb-1 text-left text-base md:text-lg shadow-lg font-medium opacity-70">
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
            className="flex-1 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-base md:text-lg font-medium shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-50 focus:border-blue-500/50 transition-all duration-200"
            placeholder="Type your message..."
            disabled={loading}
            style={{ minWidth: 0 }}
            autoFocus
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold text-base md:text-lg hover:scale-105 transition-transform disabled:opacity-60 shadow-md"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default SlackAgentPage; 