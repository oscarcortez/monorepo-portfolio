import { useWindowSize, useWindowScroll } from '@uidotdev/usehooks';

import './HeroSection.css';

export default function HeroSection() {
  const size = useWindowSize();
  const scroll = useWindowScroll();

  return (
    <section
      className="w-full min-h-screen relative bg-black"
      style={size?.height ? { height: `${size.height}px` } : undefined}
    >
      hola mundo
    </section>
  );
}
