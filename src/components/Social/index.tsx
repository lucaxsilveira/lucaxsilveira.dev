import { Github, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Social: React.FC = () => {
  return (
    <>
      <Link
        className="transition-colors duration-300 hover:text-gray-200"
        href="https://www.instagram.com/lucaxsilveira/"
        target="_blank"
        title="Instagram Link"
      >
        <Instagram />
      </Link>
      <Link
        className="transition-colors duration-300 hover:text-gray-200"
        href="https://github.com/lucaxsilveira"
        target="_blank"
        title="Github Link"
      >
        <Github />
      </Link>
      <Link
        className="transition-colors duration-300 hover:text-gray-200"
        href="https://www.linkedin.com/in/lucax-silveira/"
        target="_blank"
        title="Linkedin Link"
      >
        <Linkedin />
      </Link>
    </>
  );
};

export default Social;
