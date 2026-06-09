import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on devices with precise pointer (mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setEnabled(mediaQuery.matches);
    const handler = (e) => setEnabled(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const updatePos = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleEnter = () => setHovering(true);
    const handleLeave = () => setHovering(false);

    document.addEventListener('mousemove', updatePos);

    // Listen for hover on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    // Re-attach to dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', updatePos);
      observer.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={`wm-cursor ${hovering ? 'hover' : ''}`}
      style={{
        transform: `translate(${pos.x - 5}px, ${pos.y - 5}px) scale(${hovering ? 2.5 : 1})`,
      }}
      aria-hidden="true"
    />
  );
}
