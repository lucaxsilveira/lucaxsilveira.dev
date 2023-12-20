import { isMac } from '@/utils/browser';
import React from 'react';

const Shortcut: React.FC = () => {
  return isMac ? '⌘+K' : 'CTRL + K';
};

export default Shortcut;
