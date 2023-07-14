import React from 'react';
import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import Image from 'next/image';
import { FaMinus, FaPlus } from 'react-icons/fa';

import { ProductIProps } from '@/models/Product';
import { getProduct } from '@/services/product';
import useCart from '@/hooks/useCart';

interface ProductPageProps {
  product: ProductIProps;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const { isItemInCart, addToCart, updateQuantity, getQuantity} = useCart()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-center items-center">
            <div className="relative rounded-lg w-96 min-h-[400px]">
                <Image
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain rounded-t"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder='empty'
                    priority
                />
            </div>

          </div>
          <div className='flex flex-col justify-center'>
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-bold mb-4">${product.price}</p>
            
            <div>
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
        </div>
      </div>
    </div>
  )
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({
  params,
  res,
  query,
}) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  const productId = typeof params?.id === 'string' ? params.id : '';

  const productDetail = await getProduct({ id: productId });

  if (!productDetail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: productDetail || {},
    },
  };
};
