'use client';

import { useCallback, useMemo, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import flagEnUS from '@/assets/flag/en-US.svg';
import flagPtBR from '@/assets/flag/pt-BR.svg';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import { getDictionary } from '@/utils/dictionaries';
import { LocaleNames } from '@/utils/language';

interface IMenuItem {
  name: string;
  href: string;
  active?: boolean;
}

interface IHeader {
  isMac?: boolean;
  lang: LocaleNames;
  light?: boolean;
}

const Header: React.FC<IHeader> = ({ light = false, isMac = false, lang }) => {
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
      {
        name: 'blog',
        href: '/posts',
      },
    ];
  }, [dict]);

  const openSearchBar = useCallback(() => {
    const simulatedEvent = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
    });

    const simulatedEventWindows = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
    });

    window.dispatchEvent(simulatedEventWindows);
    window.dispatchEvent(simulatedEvent);
  }, []);

  const flags = useMemo(() => {
    const options = [
      { name: 'English', flag: flagEnUS, lang: 'en-US' },
      { name: 'Português', flag: flagPtBR, lang: 'pt-BR' },
    ];

    return options.filter((option) => option.lang !== lang);
  }, [lang]);

  const pathname = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const { pathname } = window.location;
    return pathname.replace(/(pt-BR|en-US)/g, '').replace(/\/\/+/g, '/');
  }, []);

  return (
    <header className="navbar absolute left-0 z-10 flex w-full items-center justify-center py-2">
      <div
        data-light={light}
        className="flex w-full max-w-screen-xl items-center justify-between px-4 py-2 data-[light=false]:text-gray-200 data-[light=true]:text-gray-800  md:p-0"
      >
        <Link href={`/${lang}`} title="home" tabIndex={0}>
          <Logo />
        </Link>
        <nav className="group relative">
          <div className="contents gap-2">
            {menuItems.map((item, index) => (
              <Link
                href={`/${lang}${item.href}`}
                key={item.name}
                data-light={light}
                className="text-sm uppercase"
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
              data-light={light}
              className="animation start-home absolute top-0 h-full w-[100px] rounded-md transition-all duration-500 group-hover:data-[light=false]:bg-gray-700 group-hover:data-[light=true]:bg-gray-300"
            ></div>
          </div>
        </nav>
        <div className="flex items-center gap-4">
          <span
            onClick={openSearchBar}
            className="hidden cursor-pointer text-lg font-light md:inline-block"
          >
            {isMac ? '⌘+K' : 'CTRL + K'}
            <SearchBar lang={lang} />
          </span>
          <div>
            {flags.map((flag) => (
              <Link href={`/${flag.lang}${pathname}`} key={flag.lang}>
                <Image
                  src={flag.flag}
                  alt={flag.name}
                  className="h-6 w-6 cursor-pointer"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
