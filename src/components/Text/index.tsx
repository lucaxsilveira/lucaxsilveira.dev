import { portableTextComponents } from '@/utils/portable-text-components';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { PortableTextBlock } from 'sanity';

interface IText {
  components?: Partial<PortableTextReactComponents> | undefined;
  useComponents?: boolean;
  value: PortableTextBlock[];
}

const Text = ({ value, useComponents = true, ...rest }: IText) => {
  return (
    <PortableText
      value={value}
      onMissingComponent={(message, options) => {
        console.log('message', message);
        console.log('options', options);
      }}
      components={useComponents ? portableTextComponents : undefined}
      {...rest}
    />
  );
};

export default Text;
