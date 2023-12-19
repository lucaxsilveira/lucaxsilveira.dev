import Lottie, { Options } from 'react-lottie';

import email from '@/lotties/email.json';
import folder from '@/lotties/folder.json';
import home from '@/lotties/home.json';
import open from '@/lotties/open.json';
import repository from '@/lotties/repository.json';

const icons = {
  open,
  email,
  folder,
  repository,
  home,
};

export type Icon = keyof typeof icons;

interface ILottieIcon {
  icon: Icon;
  options?: Options;
  width?: string | number;
  height?: string | number;
  animate: Boolean;
}

const LottieIcon = ({
  icon,
  options,
  width = '44px',
  height = '44px',
  animate = false,
  ...rest
}: ILottieIcon) => {
  return (
    <div className="lottie">
      <Lottie
        isPaused={!animate}
        options={{
          loop: true,
          autoplay: false,
          animationData: icons[icon],
          ...options,
        }}
        height={width}
        width={height}
        {...rest}
      />
    </div>
  );
};

export default LottieIcon;
