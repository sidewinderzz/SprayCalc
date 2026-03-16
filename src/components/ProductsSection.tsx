import React, { useRef, useEffect, useState } from 'react';
import { Product, colors } from '../types';
import { ProductCard, ProductCardHandle } from './ProductCard';

const HINT_KEY = 'agSprayCalcEnterHintDismissed';

function EnterHint() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(HINT_KEY));

  const dismiss = () => {
    localStorage.setItem(HINT_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg mb-3 text-xs"
      style={{ backgroundColor: colors.primary + '18', color: colors.primaryDark }}
    >
      <span>
        <strong>Tip:</strong> Press <kbd className="px-1 py-0.5 rounded text-xs font-mono" style={{ backgroundColor: colors.primary + '25' }}>Enter</kbd> to move between fields — on the last field it adds a new product automatically.
      </span>
      <button
        onClick={dismiss}
        className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity text-base leading-none"
        aria-label="Dismiss tip"
      >
        <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
        </svg>
      </button>
    </div>
  );
}

interface ProductsSectionProps {
  products: Product[];
  onProductChange: (id: number, field: string, value: string | number) => void;
  onToggleFormatMenu: (productId: number) => void;
  onSelectFormat: (productId: number, format: string) => void;
  openFormatMenuId: number | null;
  onAddProduct: () => void;
  onRemoveProduct: (id: number) => void;
  pendingFocusId: number | null;
  onClearPendingFocusId: () => void;
}

export function ProductsSection({
  products,
  onProductChange,
  onToggleFormatMenu,
  onSelectFormat,
  openFormatMenuId,
  onAddProduct,
  onRemoveProduct,
  pendingFocusId,
  onClearPendingFocusId
}: ProductsSectionProps) {
  const cardRefs = useRef<Map<number, ProductCardHandle>>(new Map());

  // When Enter is pressed on the last field of a card, advance to next card
  // or create a new one if this is the last card.
  const handleEnterFromCard = (id: number) => {
    const ids = products.map(p => p.id);
    const idx = ids.indexOf(id);
    if (idx < ids.length - 1) {
      cardRefs.current.get(ids[idx + 1])?.focusName();
    } else {
      onAddProduct();
    }
  };

  // After a new card is added, focus it
  useEffect(() => {
    if (pendingFocusId != null) {
      cardRefs.current.get(pendingFocusId)?.focusName();
      onClearPendingFocusId();
    }
  }, [pendingFocusId]);

  return (
    <div
      className="p-4 rounded-lg mb-6"
      style={{backgroundColor: colors.secondaryLight + '30'}}
    >
      <EnterHint />

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold" style={{color: colors.primaryDark}}>Products</h2>
        <button
          onClick={onAddProduct}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{backgroundColor: colors.primary}}
        >
          + Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            ref={(el) => {
              if (el) cardRefs.current.set(product.id, el);
              else cardRefs.current.delete(product.id);
            }}
            product={product}
            onProductChange={onProductChange}
            onToggleFormatMenu={onToggleFormatMenu}
            onSelectFormat={onSelectFormat}
            onRemoveProduct={onRemoveProduct}
            openFormatMenuId={openFormatMenuId}
            onEnterFromLastField={() => handleEnterFromCard(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
