import React from 'react';
import { Link } from 'react-router-dom';

interface AgentCardProps {
  name: string;
  icon: string;
  link: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ name, icon, link }) => {
  if (name === 'Slack Agent') {
    return (
      <Link
        to="/slack-agent"
        className="glass-card w-64 p-6 text-center rounded-xl transition-transform hover:scale-105"
      >
        <img src={icon} alt={`${name} icon`} className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-sm text-gray-300 mt-2">
          Extracts tasks, decisions & updates from Slack threads using LLM.
        </p>
      </Link>
    );
  }
  if (name === 'Notion Agent') {
    return (
      <Link
        to="/notion-agent"
        className="glass-card w-64 p-6 text-center rounded-xl transition-transform hover:scale-105"
      >
        <img src={icon} alt={`${name} icon`} className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-sm text-gray-300 mt-2">
          Pushes structured knowledge to Notion databases with rich context.
        </p>
      </Link>
    );
  }
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
        Pushes structured knowledge to Notion databases with rich context.
      </p>
    </a>
  );
};

export default AgentCard;
