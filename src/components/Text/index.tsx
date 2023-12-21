import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { PortableTextBlock } from 'sanity';

import { portableTextComponents } from '@/utils/portable-text-components';

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
