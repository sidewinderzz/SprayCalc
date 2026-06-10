import React, { useRef } from 'react';
import { colors } from '../types';

interface ScanButtonProps {
  onImageSelected: (base64: string, mimeType: string) => void;
}

// Resize + compress an image file using a canvas so the base64 payload stays
// well under Netlify's 6 MB function body limit. Phone photos can be 4–8 MB
// raw; we cap the longest edge at 1920 px and re-encode as JPEG at 0.85.
async function compressImage(file: File): Promise<{ base64: string; mimeType: string }> {
  const MAX_PX = 1920;
  const QUALITY = 0.85;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > MAX_PX || height > MAX_PX) {
        if (width >= height) {
          height = Math.round((height / width) * MAX_PX);
          width = MAX_PX;
        } else {
          width = Math.round((width / height) * MAX_PX);
          height = MAX_PX;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('No canvas context')); return; }
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', QUALITY);
      const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
      resolve({ base64, mimeType: 'image/jpeg' });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
    img.src = url;
  });
}

export function ScanButton({ onImageSelected }: ScanButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      // PDFs: read as-is, ScanReviewModal handles page rendering via pdfjs
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.slice(result.indexOf(',') + 1);
        onImageSelected(base64, 'application/pdf');
      };
      reader.readAsDataURL(file);
    } else {
      // Images: compress first to keep the payload small
      try {
        const { base64, mimeType } = await compressImage(file);
        onImageSelected(base64, mimeType);
      } catch {
        // Fallback: send uncompressed if canvas fails
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.slice(result.indexOf(',') + 1);
          onImageSelected(base64, file.type || 'image/jpeg');
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
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
        title="Scan a spray recommendation (photo or PDF) to auto-fill products"
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
