import React from 'react';
import { Product, colors } from '../types';
import { ProductCard } from './ProductCard';

interface ProductsSectionProps {
  products: Product[];
  onProductChange: (id: number, field: string, value: string | number) => void;
  onToggleFormatMenu: (productId: number) => void;
  onSelectFormat: (productId: number, format: string) => void;
  openFormatMenuId: number | null;
  onAddProduct: () => void;
  onRemoveProduct: (id: number) => void;
}

export function ProductsSection({
  products,
  onProductChange,
  onToggleFormatMenu,
  onSelectFormat,
  openFormatMenuId,
  onAddProduct,
  onRemoveProduct
}: ProductsSectionProps) {
  return (
    <div
      className="p-4 rounded-lg mb-6"
      style={{backgroundColor: colors.secondaryLight + '30'}}
    >
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
            product={product}
            onProductChange={onProductChange}
            onToggleFormatMenu={onToggleFormatMenu}
            onSelectFormat={onSelectFormat}
            onRemoveProduct={onRemoveProduct}
            openFormatMenuId={openFormatMenuId}
          />
        ))}
      </div>
    </div>
  );
}
