import { Github, Instagram, Linkedin } from 'lucide-react';
import React from 'react';

const Social: React.FC = () => {
  return (
    <>
      <a
        className="transition-colors duration-300 hover:text-gray-200"
        href="https://www.instagram.com/lucaxsilveira/"
        target="_blank"
      >
        <Instagram />
      </a>
      <a
        className="transition-colors duration-300 hover:text-gray-200"
        href="https://github.com/lucaxsilveira"
        target="_blank"
      >
        <Github />
      </a>
      <a
        className="transition-colors duration-300 hover:text-gray-200"
        href="https://www.linkedin.com/in/lucax-silveira/"
        target="_blank"
      >
        <Linkedin />
      </a>
    </>
  );
};

export default Social;
