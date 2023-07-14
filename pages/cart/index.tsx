import useCart from '@/hooks/useCart';
import { selectCartItems } from '@/store/cart';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';  
import { useSelector } from 'react-redux';
import { BsCartX } from "react-icons/bs";

const CartPage: React.FC = () => {
    const products = useSelector(selectCartItems)
    const {removeCart, clearCart, updateQuantity, getQuantity} = useCart()

  return (
    <>
        <section className='py-4'>
            <div className="2xl:container lg:container container">
                <div className='flex items-center justify-between max-w-96'>
                    <h2 className="text-2xl font-bold">Cart</h2>
                    {
                        !!products.length && 
                            <button className="text-red-500 flex items-center gap-2.5" onClick={() => clearCart()} >
                                <BsCartX /> Clear Cart
                            </button>
                    }
                    
                </div>
            </div>
        </section>

        <section className='py-4'>
            <div className="2xl:container lg:container container">
                <div className="flex flex-col gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 shadow rounded flex gap-4 items-center w-96">
                            <Link href={`/products/${product.id}`} className="relative block max-w-[80px] w-full h-[80px]">
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

                            <div>
                                <Link href={`/products/${product.id}`} className='text-lg font-medium mb-2 block'>
                                    {product.title}
                                </Link>
                                <div>
                                    <div className="flex items-center">
                                        <button className="text-gray-500 mr-2" onClick={() => updateQuantity(product, getQuantity(product) - 1)} >
                                            <FaMinus />
                                        </button>
                                        <input type="number" className="w-12 text-center border border-gray-300 rounded" value={product.quantity}
                                            onChange={() => {}} />
                                        <button className="text-gray-500 ml-2" onClick={() => updateQuantity(product, getQuantity(product) + 1)} >
                                            <FaPlus />
                                        </button>
                                    </div>
                                        
                                    <button className="text-red-500 mt-4 flex items-center gap-2.5" onClick={() => removeCart(product.id)} >
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </>
  );
};

export default CartPage;
