'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

import SearchBar from '@/components/SearchBar';

interface IMenuItem {
  name: string;
  href: string;
  active?: boolean;
}

interface IHeader {
  isMac?: boolean;
}

const Header: React.FC<IHeader> = ({ isMac = false }) => {
  const [left, setLeft] = useState(0);

  const handleItemHover = useCallback((index: number) => {
    setLeft(index * 100);
  }, []);

  const menuItems: IMenuItem[] = useMemo(() => {
    return [
      {
        name: 'sobre',
        href: '/',
      },
      {
        name: 'contato',
        href: '/contact',
      },
      // {
      //   name: 'blog',
      //   href: '/posts',
      // },
    ];
  }, []);

  const openSearchBar = useCallback(() => {
    const simulatedEvent = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
    });
    window.dispatchEvent(simulatedEvent);
  }, []);

  return (
    <header className="navbar absolute left-0 z-10 flex w-full items-center justify-center py-2">
      <div className="flex w-full max-w-screen-xl items-center justify-between px-4 py-2 text-white md:p-0">
        <div>logo</div>
        <nav className="group relative">
          <div className="contents gap-2">
            {menuItems.map((item, index) => (
              <Link
                href={item.href}
                key={item.name}
                className="text-sm uppercase text-gray-200 "
              >
                <div
                  onMouseEnter={() => handleItemHover(index)}
                  className="relative z-10 inline-block w-[100px] cursor-pointer py-2 text-center"
                >
                  {item.name}
                </div>
              </Link>
            ))}
            <div
              style={{ left }}
              className="animation start-home absolute top-0 h-full w-[100px] rounded-md transition-all duration-500 hover:bg-gray-500 group-hover:bg-gray-700"
            ></div>
          </div>
        </nav>
        <div>
          <span
            onClick={openSearchBar}
            className="hidden cursor-pointer text-lg font-light md:inline-block"
          >
            {isMac ? '⌘+K' : 'CTRL + K'}
            <SearchBar />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
