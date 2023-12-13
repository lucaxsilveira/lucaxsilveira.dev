import Image, { ImageProps } from './Image';
import Legend from './Legend';

const ImageComponent = ({ ...props }: ImageProps) => {
  return <Image {...props} />;
};

ImageComponent.Legend = Legend;

export default ImageComponent;
