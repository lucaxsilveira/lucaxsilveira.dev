import { IAuthor } from '@/types/author';

import { getDictionary } from '@/utils/dictionaries';
import { LocaleNames } from '@/utils/language';
import Image from '../Image';

interface PostHeaderProps {
  author: IAuthor;
  date?: string;
  readingTime: string;
  lang: LocaleNames;
}

const PostHeader = ({ lang, author, date, readingTime }: PostHeaderProps) => {
  const dict = getDictionary(lang);
  return (
    <div className="post__author flex items-center gap-4">
      <div className="image h-[50px] w-[50px] overflow-hidden rounded-[50%]">
        <Image value={author.image} isInline={false} />
      </div>
      <div className="leading-4">
        <h3 className="mb-1 font-light">{author.name}</h3>
        <div className="text-light flex gap-2 text-xs text-gray-400">
          {date && (
            <span className="after:top-0.3 capitalize after:relative after:ml-2 after:text-gray-500 after:content-['·'] ">
              {dict.postPage.published} {date}
            </span>
          )}
          <span>{readingTime && readingTime}</span>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
