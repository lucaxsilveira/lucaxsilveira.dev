'use client';
import { useMousePosition } from '@/hooks/useMouseMove';

interface FlashlightBackgroundProps {
  children: React.ReactNode;
}

const FlashlightBackground: React.FC<FlashlightBackgroundProps> = ({
  children,
}) => {
  const [ref, mousePosition] = useMousePosition();

  return (
    <div className="relative">
      <div
        className="pointer-events-none fixed inset-0 z-30 h-full w-full transition duration-300 lg:absolute"
        style={{
          background: `radial-gradient(600px at ${mousePosition.left}px ${mousePosition.top}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      ></div>

      <main ref={ref}>
        <div className="start- mx-auto min-h-screen max-w-screen-lg px-6 pb-12 font-sans md:px-12 lg:px-24">
          {children}
        </div>
      </main>
    </div>
  );
};

export default FlashlightBackground;
