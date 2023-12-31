'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

import { Icon } from '@/components/Lottie';
import { getDictionary } from '@/utils/dictionaries';
import { LocaleNames } from '@/utils/language';
import { normalizeString } from '@/utils/string';

import Menu from './Menu';

export interface IMenuItem {
  name: string;
  action: () => void;
  icon: Icon;
  shortcut?: string;
}

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
      delay: 0.1,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

interface ISearchBar {
  lang: LocaleNames;
}

const SearchBar: React.FC<ISearchBar> = ({ lang }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const router = useRouter();

  const dict = useMemo(() => getDictionary(lang), [lang]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'k':
          if (event.metaKey || event.ctrlKey) {
            setOpen(true);
          }
          break;
        case 'Escape':
          setOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  const commonActions = useCallback(() => {
    setOpen(false);
    setSearch('');
  }, []);

  const menuItems: IMenuItem[] = useMemo(
    () => [
      {
        name: dict.searchBar.copy,
        action: () => {
          navigator.clipboard.writeText(window.location.href);
          commonActions();
        },
        icon: 'open',
        shortcut: 'L',
      },
      {
        name: dict.searchBar.repository,
        action: () => {
          window.open('https://github.com/lucaxsilveira/lucaxsilveira.dev');
          commonActions();
        },
        icon: 'repository',
        shortcut: 'C',
      },
      {
        name: dict.searchBar.home,
        action: () => {
          router.push('/');
          commonActions();
        },
        icon: 'home',
        shortcut: 'I',
      },
      {
        name: dict.searchBar.talk,
        action: () => {
          router.push('/contact');
          commonActions();
        },
        icon: 'email',
        shortcut: 'FC',
      },
      {
        name: dict.searchBar.blog,
        action: () => {
          router.push('/posts');
          commonActions();
        },
        icon: 'folder',
        shortcut: 'B',
      },
    ],
    [router, commonActions, dict],
  );

  const items = useMemo<IMenuItem[]>(() => {
    if (!search) return menuItems;

    return menuItems.filter(({ name, shortcut }) => {
      const matchByName = normalizeString(name).includes(
        normalizeString(search),
      );

      const matchByCommand =
        shortcut && normalizeString(shortcut) == normalizeString(search);

      return matchByCommand || matchByName;
    });
  }, [menuItems, search]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [],
  );

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== 'Enter') return;

      const [item] = items;
      if (item) {
        item.action();
      }
    },
    [items],
  );

  if (!open) return;

  return createPortal(
    <motion.div
      className="absolute top-0 flex h-full w-full items-center justify-center bg-slate-900/90"
      onClick={() => setOpen(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-[600px] overflow-hidden rounded-md border border-slate-900/30 bg-slate-900/30 backdrop-blur-lg backdrop-brightness-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex">
          <input
            autoFocus
            type="text"
            className="h-[40px] w-full bg-transparent pl-4 text-gray-200 outline-none "
            placeholder={dict.searchBar.placeholder}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className="text-gray-300">
          <span className="pl-4 text-2xs font-light uppercase tracking-widest text-white">
            {dict.searchBar.title}
          </span>
          {items.length <= 0 && (
            <div className="p-4">
              <p className="text-2xs font-light uppercase tracking-wider">
                {dict.searchBar.notFound}
              </p>
            </div>
          )}
          <Menu>
            {items.map((item) => (
              <Menu.Item key={item.name} item={item} />
            ))}
          </Menu>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById('search-wrapper') as HTMLElement,
  );
};

export default SearchBar;
