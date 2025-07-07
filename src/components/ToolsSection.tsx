import React from 'react';
import AgentCard from './AgentCard';

// Importing icons from local assets folder
import slackIcon from '../assets/slack.svg';
import notionIcon from '../assets/notion.svg';

const ToolsSection = () => {
  return (
    <section id="tools" data-aos="fade-up" className="w-full py-16 fade-in">
      <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text text-center mb-10 leading-relaxed py-2">Tools</h2>

      <div className="flex flex-wrap justify-center gap-10 px-4 max-w-5xl mx-auto">
        <AgentCard
          name="Slack Agent"
          icon={slackIcon}
          link="https://slack.com"
        />
        <AgentCard
          name="Notion Agent"
          icon={notionIcon}
          link="https://notion.so"
        />
      </div>
    </section>
  );
};

export default ToolsSection;
