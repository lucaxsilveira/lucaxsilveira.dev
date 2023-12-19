import MenuItem from './MenuItem';
import MenuWrapper from './MenuWrapper';

interface IMenu {
  children: React.ReactNode;
}

const Menu = ({ children }: IMenu) => {
  return <MenuWrapper>{children}</MenuWrapper>;
};

Menu.Item = MenuItem;

export default Menu;
