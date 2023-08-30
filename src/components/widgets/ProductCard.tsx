import React from 'react';
import { Product } from '@types';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="w-full bg-gray-200 border border-gray-300 p-4">
      <h1 className="truncate font-semibold mb-4">{product.title}</h1>
      <div className="flex">
        <div className="w-3/5">
          <img
            className="w-full h-40 object-contain bg-white"
            src={product.image}
            alt={`${product.id}_${product.title}`}
          />
        </div>
        <div className="pl-4 flex flex-col justify-center">
          <div className="text-xl font-bold">${product.price}</div>
          <div className="pt-1">
            <p className="text-xs">Quantity</p>
            <p className="font-semibold mb-2">{product.rating.count}</p>
            <p className="text-xs">Rate</p>
            <p className="font-semibold">{product.rating.rate}</p>
          </div>
        </div>
      </div>
      <div className="line-clamp-4 pt-4 text-sm">{product.description}</div>
    </div>
  );
};

export default ProductCard;
