'use client';

import { useCallback, useMemo, useState } from 'react';

import Link from 'next/link';

import { getDictionary } from '@/app/[lang]/dictionaries';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import { LocaleNames } from '@/utils/language';

interface IMenuItem {
  name: string;
  href: string;
  active?: boolean;
}

interface IHeader {
  isMac?: boolean;
  lang: LocaleNames;
}

const Header: React.FC<IHeader> = ({ isMac = false, lang }) => {
  const [left, setLeft] = useState(0);

  const handleItemHover = useCallback((index: number) => {
    setLeft(index * 100);
  }, []);

  const dict = useMemo(() => getDictionary(lang), [lang]);

  const menuItems: IMenuItem[] = useMemo(() => {
    return [
      {
        name: dict.header.about,
        href: '/',
      },
      {
        name: dict.header.contact,
        href: '/contact',
      },
      // {
      //   name: 'blog',
      //   href: '/posts',
      // },
    ];
  }, [dict]);

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
        <div>
          <Logo />
        </div>
        <nav className="group relative">
          <div className="contents gap-2">
            {menuItems.map((item, index) => (
              <Link
                href={item.href}
                key={item.name}
                className="text-sm uppercase text-gray-200"
                tabIndex={index}
                title={item.name}
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
            <SearchBar lang={lang} />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
