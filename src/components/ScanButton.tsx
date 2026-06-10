import React, { useRef } from 'react';
import { colors } from '../types';

interface ScanButtonProps {
  onImageSelected: (base64: string, mimeType: string) => void;
}

export function ScanButton({ onImageSelected }: ScanButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const commaIdx = result.indexOf(',');
      const meta = result.slice(0, commaIdx);
      const data = result.slice(commaIdx + 1);
      const mimeType = meta.split(':')[1]?.split(';')[0] ?? 'image/jpeg';
      onImageSelected(data, mimeType);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={handleFileChange}
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-black/5"
        style={{
          color: colors.primaryDark,
          border: `1px solid ${colors.primary}40`,
          backgroundColor: `${colors.primary}08`,
        }}
        title="Scan a spray recommendation to auto-fill products"
        aria-label="Scan spray recommendation"
      >
        <svg
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        Scan rec
      </button>
    </>
  );
}
