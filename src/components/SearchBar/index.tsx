'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import LottieIcon, { Icon } from '@/components/Lottie';
import { normalizeString } from '@/utils/string';
import { useRouter } from 'next/navigation';

interface IMenuItem {
  name: string;
  action: () => void;
  icon: Icon;
  active: Boolean;
}

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const defaultMenuItems: IMenuItem[] = [
    {
      name: 'Copiar link',
      action: () => {
        navigator.clipboard.writeText(window.location.href);
      },
      icon: 'open',
      active: false,
    },
    {
      name: 'Ver código fonte',
      action: () => {
        window.open('https://github.com/lucaxsilveira/lucaxsilveira.dev');
      },
      icon: 'repository',
      active: false,
    },
    {
      name: 'Fale comigo',
      action: () => {
        router.push('/contact');
      },
      icon: 'email',
      active: false,
    },
    {
      name: 'Ver posts do blog',
      action: () => {
        router.push('/posts');
      },
      icon: 'folder',
      active: false,
    },
  ];

  const [menuItems, setMenuItems] = useState<IMenuItem[]>(defaultMenuItems);

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
    setTimeout(() => {
      setOpen(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [],
  );

  const items = useMemo<IMenuItem[]>(() => {
    if (!search) return menuItems;

    return menuItems.filter(({ name }) =>
      normalizeString(name).includes(normalizeString(search)),
    );
  }, [menuItems, search]);

  const onHoverMenu = useCallback(
    (name: string) => {
      const normalizedItems = menuItems.map((item) => {
        return {
          ...item,
          active: item.name === name,
        };
      });
      setMenuItems(normalizedItems);
    },
    [menuItems],
  );

  if (!open) return;

  return createPortal(
    <div
      className="absolute top-0 flex h-full w-full items-center justify-center bg-slate-900/90"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-[600px] overflow-hidden rounded-md border border-slate-900/30 bg-slate-900/30 backdrop-blur-lg backdrop-brightness-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex">
          <input
            type="text"
            className="h-[40px] w-full bg-transparent pl-4 text-gray-200 outline-none "
            placeholder="Buscar por um comando..."
            onChange={handleSearchChange}
          />
        </div>

        <div className="text-gray-300">
          <span className="pl-4 text-2xs font-light uppercase tracking-widest text-white">
            Atalhos
          </span>
          {items.length <= 0 && (
            <div className="p-4">
              <p className="text-2xs font-light uppercase tracking-wider">
                Nenhum item encontrado pra sua busca
              </p>
            </div>
          )}
          <ul className="divide divide-y divide-gray-600">
            {items.map(({ name, action, icon, active }) => (
              <li
                key={name}
                className="flex cursor-pointer items-center justify-between px-4 py-2"
                onMouseEnter={() => onHoverMenu(name)}
                onClick={typeof action === 'function' ? action : undefined}
              >
                <div className="flex items-center gap-2">
                  <div className="m-w-[40px]">
                    <LottieIcon
                      animate={active}
                      icon={icon}
                      width={28}
                      height={28}
                    />
                  </div>
                  <span className="text-xs font-light uppercase tracking-wider">
                    {name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.getElementById('search-wrapper') as HTMLElement,
  );
};

export default SearchBar;
