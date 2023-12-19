import React from 'react';

interface IMenuWrapper {
  children: React.ReactNode;
}

const MenuWrapper = ({ children }: IMenuWrapper) => {
  return <ul className="divide divide-y divide-gray-700/80">{children}</ul>;
};

export default MenuWrapper;
