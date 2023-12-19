'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface IMenuItem {
  name: string;
  href: string;
  active?: boolean;
}

const Header = () => {
  const [left, setLeft] = useState(0);

  const handleItemHover = (index: number) => {
    setLeft(index * 100);
  };

  const menuItems: IMenuItem[] = useMemo(() => {
    return [
      {
        name: 'sobre',
        href: '/',
        active: window.location.pathname === '/',
      },
      {
        name: 'contato',
        href: '/contact',
        active: window.location.pathname === '/contact',
      },
      {
        name: 'blog',
        href: '/posts',
        active: window.location.pathname === '/posts',
      },
    ];
  }, []);

  const openSearchBar = () => {
    const simulatedEvent = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
    });
    window.dispatchEvent(simulatedEvent);
  };

  const isMac = useMemo(() => {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  }, []);

  return (
    <header className="navbar absolute left-0 z-10 flex w-full items-center justify-center py-2">
      <div className="flex w-full max-w-screen-xl items-center justify-between px-4 py-2 text-white md:p-0">
        <div>header</div>
        <nav className="group relative">
          <ul className="contents gap-2">
            {menuItems.map((item, index) => (
              <li
                key={item.name}
                onMouseEnter={() => handleItemHover(index)}
                data-active={item.active}
                className="relative z-10 inline-block w-[100px] cursor-pointer py-2 text-center"
              >
                <Link
                  href={item.href}
                  className="text-sm uppercase text-gray-200 "
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li
              style={{ left }}
              className="animation start-home absolute top-0 h-full w-[100px] rounded-md transition-all duration-500 hover:bg-gray-500 group-hover:bg-gray-700"
            ></li>
          </ul>
        </nav>
        <div>
          <span
            onClick={openSearchBar}
            className="cursor-pointer text-lg font-light"
          >
            {isMac ? '⌘+K' : 'CTRL + K'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
