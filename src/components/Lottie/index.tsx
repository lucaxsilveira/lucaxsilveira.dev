import Lottie, { LottieProps } from 'react-lottie';

import email from '@/lotties/email.json';
import folder from '@/lotties/folder.json';
import glasses from '@/lotties/glasses.json';
import heart from '@/lotties/heart.json';
import home from '@/lotties/home.json';
import open from '@/lotties/open.json';
import repository from '@/lotties/repository.json';

const icons = {
  open,
  home,
  heart,
  email,
  folder,
  glasses,
  repository,
};

export type Icon = keyof typeof icons;

interface ILottieIcon extends Omit<LottieProps, 'options'> {
  icon: Icon;
  autoplay?: boolean;
  animate: boolean;
}

const LottieIcon: React.FC<ILottieIcon> = ({
  icon,
  width = '28px',
  height = '28px',
  animate = false,
  autoplay = false,
  ...props
}) => {
  return (
    <div className="lottie">
      <Lottie
        isPaused={!animate}
        options={{
          loop: true,
          autoplay,
          animationData: icons[icon],
        }}
        speed={1.5}
        height={width}
        width={height}
        {...props}
      />
    </div>
  );
};

export default LottieIcon;
