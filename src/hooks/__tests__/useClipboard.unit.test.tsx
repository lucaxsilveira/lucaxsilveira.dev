import { act, renderHook } from '@testing-library/react';
import useClipboard from '../useClipboard';

const writeText = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe('useClipboard', () => {
  beforeEach(() => {
    navigator.clipboard.writeText.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should copy text to clipboard and set isCopied to true for a short duration', async () => {
    const { result } = renderHook(() => useClipboard());

    const textToCopy = 'Hello, Jest!';

    act(() => {
      result.current.copy(textToCopy);
    });

    expect(writeText).toHaveBeenCalledWith(textToCopy);

    await act(() => Promise.resolve());

    expect(result.current.isCopied).toBe(true);

    await act(() => new Promise((res) => setTimeout(res, 1000)));

    expect(result.current.isCopied).toBe(false);
  });
});
