import AgentCard from './AgentCard';

// Importing icons from local assets folder
import slackIcon from '../assets/slack.svg';
import notionIcon from '../assets/notion.svg';
import discordIcon from '../assets/discord.svg';
import whatsappIcon from '../assets/whatsapp.svg';
import gmeetIcon from '../assets/gmeet.svg';
import genericIcon from '../assets/notion.svg'; // Use Notion icon as a placeholder for coming soon agents
import zoomIcon from '../assets/zoom.svg';
import teamsIcon from '../assets/teams.svg';
import telegramIcon from '../assets/telegram.svg';
import gmailIcon from '../assets/gmail.svg';

const ToolsSection = () => {
  return (
    <section id="tools" data-aos="fade-up" className="w-full py-16 fade-in">
      <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text text-center mb-10 leading-relaxed py-2">Agents</h2>

      <div className="flex flex-wrap justify-center gap-10 px-4 max-w-5xl mx-auto">
        <AgentCard
          name="Slack Agent"
          icon={slackIcon}
          link="/slack-agent"
        />
        <AgentCard
          name="Notion Agent"
          icon={notionIcon}
          link="/notion-agent"
        />
        <AgentCard
          name="Discord Agent"
          icon={discordIcon}
          link="/discord-agent"
        />
        <AgentCard
          name="WhatsApp Agent"
          icon={whatsappIcon}
          link="/whatsapp-agent"
        />
        <AgentCard
          name="GMeet Agent"
          icon={gmeetIcon}
          link="/gmeet-agent"
        />
        <AgentCard
          name="Zoom Agent"
          icon={zoomIcon}
          link="/zoom-agent"
          description="Automate meeting scheduling and summaries in Zoom."
        />
        <AgentCard
          name="Teams Agent"
          icon={teamsIcon}
          link="/teams-agent"
          description="Integrate workflows and notifications with Microsoft Teams."
        />
        <AgentCard
          name="Telegram Agent"
          icon={telegramIcon}
          link="/telegram-agent"
          description="Connect bots and automate chats in Telegram."
        />
        <AgentCard
          name="Email Agent"
          icon={gmailIcon}
          link="/email-agent"
          description="Automate email tasks and notifications with Gmail."
        />
      </div>
    </section>
  );
};

export default ToolsSection;
