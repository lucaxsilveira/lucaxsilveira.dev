'use client';

import { useMousePosition } from '@/hooks/useMouseMove';

const MovingGradient: React.FC = () => {
  const [ref, mousePosition] = useMousePosition();

  return (
    <div
      ref={ref}
      className="xpointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
      style={{
        background: `radial-gradient(600px at ${mousePosition.left}px ${mousePosition.top}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    ></div>
  );
};

export default MovingGradient;
