import useCart from '@/hooks/useCart';
import { ProductIProps } from '@/models/Product';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const ProductCard = ({ product }: {product: ProductIProps}) => {
  const {addToCart, isItemInCart, updateQuantity, getQuantity} = useCart()
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
       <Link href={`/products/${product.id}`} className="relative block h-[192px]">
            <Image
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain rounded-t"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder='empty'
                priority
            />
       </Link>

       {/* <div className='flex flex-col justify-between min-h-[240px]'>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 line-clamp-2">{product.title}</div>
          <p className="text-gray-700 text-base line-clamp-3">{product.description}</p>
        </div>
        <div className="px-6 py-4 flex items-center justify-between">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            ${product.price}
          </span>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
       </div> */}
        
      <div className="px-6 py-4">
        <Link href={`/products/${product.id}`} className="font-bold text-xl mb-2 line-clamp-2">{product.title}</Link>
        <p className="text-gray-700 text-base line-clamp-3">{product.description}</p>
      </div>
      <div className="px-6 py-4 flex items-center justify-between">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          ${product.price}
        </span>
        {
          !isItemInCart(product) ? 
          <button onClick={()=> addToCart(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button> : 
          <div className="flex items-center">
            <button className="text-gray-500 mr-2" onClick={() => updateQuantity(product, getQuantity(product) - 1)} >
                <FaMinus />
            </button>
            <input type="number" className="w-12 text-center border border-gray-300 rounded" value={getQuantity(product)}
                onChange={() => {}} />
            <button className="text-gray-500 ml-2" onClick={() => updateQuantity(product, getQuantity(product) + 1)} >
                <FaPlus />
            </button>
          </div> 
        }
      </div>
    </div>
  );
};

export default ProductCard;


