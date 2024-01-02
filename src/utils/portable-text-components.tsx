import { PortableTextComponents } from '@portabletext/react';

import CodeComponent from '@/components/Code';
import ImageForBodyText from '@/components/Image/ImageForBodyText';

interface ICallToAction {
  value: {
    url: string;
    text: string;
  };
  isInline: boolean;
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="line text-md mb-6 leading-7 text-slate-800 md:text-lg md:leading-8">
        {children}
      </p>
    ),
    h1: ({ children }) => <h1 className="text-2xl">{children}</h1>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-purple-500">{children}</blockquote>
    ),
    customHeading: ({ children }) => (
      <h2 className="text-lg  text-purple-700">{children}</h2>
    ),
    code: ({ children }) => <pre>{children}</pre>,
  },
  types: {
    image: ImageForBodyText,
    callToAction: ({ value, isInline }: ICallToAction) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className="callToAction">{value.text}</div>
      ),
    codeField: CodeComponent,
  },
  marks: {
    em: ({ children }) => (
      <em className="font-semibold text-gray-600">{children}</em>
    ),
    highlight: ({ children }) => (
      <span className="bg-yellow-200">{children}</span>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          className="break-words text-blue-700"
          rel={target === '_blank' ? 'noindex nofollow' : ''}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="mt-xl mb-6 ml-4">{children}</ul>,
    number: ({ children }) => <ul className="mt-lg">{children}</ul>,

    checkmarks: ({ children }) => (
      <ol className="m-auto text-lg">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="list-disc">
        <p className="line text-md leading-7 text-slate-800 md:text-lg md:leading-8">
          {children}
        </p>
      </li>
    ),
    checkmarks: ({ children }) => <li>✅ {children}</li>,
  },
};
