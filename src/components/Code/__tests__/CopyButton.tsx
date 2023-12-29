import { fireEvent, render } from '@testing-library/react';

import * as useClipboard from '@/hooks/useClipboard';

import CopyButton from '../CopyButton';

describe('CopyButton', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<CopyButton code="test" />);
    expect(getByTestId('copy-button')).toBeInTheDocument();
    expect(getByTestId('copy-icon')).toBeInTheDocument();
  });

  it('should be able to trigger copy hook function', async () => {
    const copyFn = jest.fn();
    jest.spyOn(useClipboard, 'default').mockImplementation(() => ({
      isCopied: false,
      copy: copyFn,
    }));

    const code = 'Test code';

    const { getByTestId } = render(<CopyButton code={code} />);
    const copyButton = getByTestId('copy-button');

    fireEvent.click(copyButton);

    expect(copyFn).toHaveBeenCalledWith(code);
  });

  it('should render button as green when isCopied', async () => {
    jest.spyOn(useClipboard, 'default').mockImplementation(() => ({
      isCopied: true,
      copy: () => {},
    }));

    const { getByTestId } = render(<CopyButton code={'test'} />);
    const copyButton = getByTestId('copy-button');

    expect(copyButton).toHaveClass('text-green-700');
  });
});
