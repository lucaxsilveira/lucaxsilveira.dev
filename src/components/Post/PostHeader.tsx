import { useMemo } from 'react';

import { format, formatDistance, intervalToDuration, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Image from '@/components/Image';
import { IAuthor } from '@/types/author';
import { estimateReadingTime } from '@/utils/string';
import { toPlainText } from '@portabletext/react';

interface PostHeaderProps {
  author: IAuthor;
  publishedAt?: string;
  body: any;
}

const PostHeader = ({ body, author, publishedAt }: PostHeaderProps) => {
  const date = useMemo(() => {
    if (!publishedAt) return null;

    const today = new Date();
    const formatedPublishedAt = parseISO(publishedAt);
    const { months = 0 } = intervalToDuration({
      start: formatedPublishedAt,
      end: today,
    });

    if (months >= 1) {
      const formattedDateToStr = format(formatedPublishedAt, 'MMMM d, yyyy');
      return `em ${formattedDateToStr}`;
    }

    return formatDistance(parseISO(publishedAt), new Date(), {
      addSuffix: true,
      locale: ptBR,
    });
  }, [publishedAt]);

  const readingTime = useMemo(() => {
    const text = toPlainText(body);
    const time = estimateReadingTime(text);
    console.log('time', time);
    return `${time} min de leitura`;
  }, [body]);

  return (
    <div className="post__author flex items-center gap-4">
      <div className="image h-[50px] w-[50px] overflow-hidden rounded-[50%]">
        <Image value={author.photo} isInline={false} />
      </div>
      <div className="leading-4">
        <h3 className="mb-1 font-light">{author.name}</h3>
        <div className="text-light flex gap-2 text-xs text-gray-400">
          {date && (
            <span className="after:top-0.3 after:relative after:ml-2 after:text-gray-500 after:content-['·'] ">
              Publicado {date}
            </span>
          )}
          <span>{readingTime}</span>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
