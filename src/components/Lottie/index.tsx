import Lottie, { Options } from 'react-lottie';

import email from '@/lotties/email.json';
import folder from '@/lotties/folder.json';
import heart from '@/lotties/heart.json';
import home from '@/lotties/home.json';
import open from '@/lotties/open.json';
import repository from '@/lotties/repository.json';

const icons = {
  open,
  email,
  folder,
  repository,
  home,
  heart,
};

export type Icon = keyof typeof icons;

interface ILottieIcon {
  icon: Icon;
  options?: Options;
  width?: string | number;
  height?: string | number;
  autoplay?: boolean;
  animate: boolean;
}

const LottieIcon: React.FC<ILottieIcon> = ({
  icon,
  options,
  width = '28px',
  height = '28px',
  animate = false,
  autoplay = false,
  ...rest
}) => {
  return (
    <div className="lottie">
      <Lottie
        isPaused={!animate}
        options={{
          loop: true,
          autoplay,
          animationData: icons[icon],
          ...options,
        }}
        speed={1.5}
        height={width}
        width={height}
        {...rest}
      />
    </div>
  );
};

export default LottieIcon;
