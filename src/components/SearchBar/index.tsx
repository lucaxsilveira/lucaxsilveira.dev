'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'k':
          if (event.metaKey || event.ctrlKey) {
            setIsModalOpen(true);
          }
          break;
        case 'Escape':
          setIsModalOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (!isModalOpen) return;

  return createPortal(
    <div className="absolute top-0 flex h-full w-full items-center justify-center bg-slate-900/70">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi quis
        animi eum recusandae sed consectetur, deleniti incidunt odit temporibus
        repudiandae, modi, a officiis reprehenderit sunt. Optio voluptates
        quisquam consectetur sequi.
      </p>
    </div>,
    document.getElementById('search-wrapper') as HTMLElement,
  );
};

export default SearchBar;
