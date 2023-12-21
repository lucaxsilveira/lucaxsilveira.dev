import { IAuthor } from '@/types/author';

import Image from '../Image';

interface PostHeaderProps {
  author: IAuthor;
  date?: string;
  readingTime: string;
}

const PostHeader = ({ author, date, readingTime }: PostHeaderProps) => {
  return (
    <div className="post__author flex items-center gap-4">
      <div className="image h-[50px] w-[50px] overflow-hidden rounded-[50%]">
        <Image value={author.image} isInline={false} />
      </div>
      <div className="leading-4">
        <h3 className="mb-1 font-light">{author.name}</h3>
        <div className="text-light flex gap-2 text-xs text-gray-400">
          {date && (
            <span className="after:top-0.3 after:relative after:ml-2 after:text-gray-500 after:content-['·'] ">
              Publicado {date}
            </span>
          )}
          <span>{readingTime && readingTime}</span>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
