import { useEffect, useState } from 'react';
import { colors } from '../types';

interface SettingsToastProps {
  message: string;
}

export function SettingsToast({ message }: SettingsToastProps) {
  const [renderedMessage, setRenderedMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setRenderedMessage(message);
      setVisible(true);
      return;
    }
    setVisible(false);
    const t = setTimeout(() => setRenderedMessage(''), 220);
    return () => clearTimeout(t);
  }, [message]);

  if (!renderedMessage) return null;

  return (
    <div
      className="fixed left-1/2 z-40 px-4 pointer-events-none"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
        transform: 'translateX(-50%)',
      }}
      role="status"
      aria-live="polite"
    >
      <div
        className="px-4 py-2.5 text-sm rounded-full font-medium shadow-lg whitespace-nowrap"
        style={{
          backgroundColor: colors.primaryDark,
          color: 'white',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 200ms ease, transform 200ms ease',
        }}
      >
        {renderedMessage}
      </div>
    </div>
  );
}
