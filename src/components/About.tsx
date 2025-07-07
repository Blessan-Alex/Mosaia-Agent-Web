import React from 'react';
import blessanImg from '../assets/blessan.png';
import aryaImg from '../assets/arya.jpg';
import pranaliImg from '../assets/pranali.jpg';

const features = [
  {
    title: 'Blessan Alex',
    description: 'Each agent is independent and composable.',
    image: blessanImg,
  },
  {
    title: 'Arya Manjardekar',
    description: 'Agents work without manual triggers.',
    image: aryaImg,
  },
  {
    title: 'Pranali Unavane',
    description: 'Built to be decentralized and verifiable.',
    image: pranaliImg,
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="my-20 text-white text-center px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-red-500 via-gray-100 to-white text-transparent bg-clip-text mb-12 leading-relaxed py-2">About</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            data-aos="fade-up"
            className="bg-[#18181b] border border-white/10 p-6 rounded-full w-60 h-60 flex flex-col items-center justify-center text-white shadow-xl hover:scale-105 transition-transform"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg mb-2"
            />
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-gray-300 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;