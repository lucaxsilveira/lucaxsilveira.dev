import { Suspense } from 'react';

import Refractor from 'react-refractor';
import javascript from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import tsx from 'refractor/lang/tsx';

import CopyButton from './CopyButton';
import './theme.css';

Refractor.registerLanguage(javascript);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(tsx);

type CodeType = {
  code: string;
  language: string;
  highlightedLines?: number[];
};

interface ICode {
  value: CodeType;
}

const Code = ({ value }: ICode) => {
  return (
    <div className="code-wrapper relative mb-6 overflow-hidden rounded-lg text-xs md:text-lg">
      <Suspense fallback={<p>loading...</p>}>
        <CopyButton code={value.code} />
      </Suspense>

      <Refractor
        language={value.language}
        value={value.code}
        markers={value.highlightedLines}
      />
    </div>
  );
};

export default Code;
