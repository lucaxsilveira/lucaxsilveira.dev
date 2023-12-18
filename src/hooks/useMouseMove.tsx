import { useCallback, useRef, useState } from 'react';

interface MousePosition {
  left: number;
  top: number;
}

type CallbackRef = (node: HTMLElement | null) => void;

export const useMousePosition = (): [CallbackRef, MousePosition] => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    left: 0,
    top: 0,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent) =>
      setMousePosition({
        left: e.pageX,
        top: e.pageY,
      }),
    [],
  );

  const ref = useRef<HTMLElement | null>(null);

  const callbackRef = useCallback(
    (node: HTMLElement | null) => {
      if (ref.current) {
        ref.current.removeEventListener('mousemove', handleMouseMove);
      }

      ref.current = node;

      if (ref.current) {
        ref.current.addEventListener('mousemove', handleMouseMove);
      }
    },
    [handleMouseMove],
  );

  return [callbackRef, mousePosition];
};
