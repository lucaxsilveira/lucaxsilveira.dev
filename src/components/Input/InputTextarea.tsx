import { forwardRef } from 'react';

interface ITextarea extends React.ComponentProps<'textarea'> {}

const TextArea = forwardRef(
  ({ ...rest }: ITextarea, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <textarea
        ref={ref}
        {...rest}
        className="min-h-[40px] w-full bg-transparent p-2 outline-none"
        rows={7}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
