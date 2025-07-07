import React from 'react';

interface AgentCardProps {
  name: string;
  icon: string;
  link: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ name, icon, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="glass-card w-64 p-6 text-center rounded-xl transition-transform hover:scale-105"
    >
      <img src={icon} alt={`${name} icon`} className="w-12 h-12 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="text-sm text-gray-300 mt-2">
        {name === 'Slack Agent'
          ? 'Extracts tasks, decisions & updates from Slack threads using LLM.'
          : 'Pushes structured knowledge to Notion databases with rich context.'}
      </p>
    </a>
  );
};

export default AgentCard;
