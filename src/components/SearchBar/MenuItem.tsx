import { useState } from 'react';

import LottieIcon from '../Lottie';
import { IMenuItem } from './';

interface MenuItemProps {
  item: IMenuItem;
}

const MenuItem = ({
  item: { name, action, icon, shortcut },
}: MenuItemProps) => {
  const [active, setActive] = useState(false);

  const onHoverMenu = (state: boolean) => {
    setActive(state);
  };

  return (
    <li
      key={name}
      className="flex w-full cursor-pointer items-center justify-between px-4 py-2"
      onMouseEnter={() => onHoverMenu(true)}
      onMouseLeave={() => onHoverMenu(false)}
      onClick={typeof action === 'function' ? action : undefined}
    >
      <div className="flex w-full items-center gap-2">
        <div className="m-w-[40px]">
          <LottieIcon animate={active} icon={icon} />
        </div>
        <span className="text-xs font-light uppercase tracking-wider">
          {name}
        </span>
        {shortcut && (
          <div className="pointer-events-none ml-auto rounded-md bg-gray-700/70 px-2 py-[2px] font-mono text-sm text-gray-400">
            {shortcut}
          </div>
        )}
      </div>
    </li>
  );
};

export default MenuItem;
