import React, { useState } from 'react'
import ListItem from '../ListItem'
import Link from 'next/link';
import Image from 'next/image';

import { AiOutlineShoppingCart } from "react-icons/ai";

import BrandLogo from '../../assets/React.png'

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className='w-full overflow-hidden'>
      <div className="2xl:container md:container container">
          <div className="relative flex items-center justify-between -mx-4 px-4 sm:px-0">
            {/* Brand Logo */}
            <Link href="/" className="block py-5">
                <Image
                  src={BrandLogo}
                  alt="Brand Logo"
                  className="w-[116px] h-[32px]"
                  width={116}
                  height={32}
                />
              </Link>

            {/* Main Nav */}
            <div className="flex items-center justify-between">
              <div>
                <nav
                  id="navbarCollapse"
                  className={`fixed left-o right-0 top-20 w-full rounded-lg bg-white py-5 px-4 shadow sm:static sm:block sm:w-full sm:max-w-full sm:shadow-none ${
                    !open && "hidden"
                  } `}
                >
                  <ul className="block sm:flex">
                    <ListItem
                      navItemStyles="text-dark hover:text-primary"
                      NavLink="/"
                    >
                      Products
                    </ListItem>
                    <ListItem
                      navItemStyles="text-dark hover:text-primary"
                      NavLink="/cart"
                    >
                      Cart
                    </ListItem>
                   
                  </ul>
                </nav>
              </div>
            </div>

            {/* Navbar Toggler */}
            <div className='flex items-center justify-center gap-4 py-5'>
              <button
                      onClick={() => setOpen(!open)}
                      id="navbarToggler"
                      className={` ${
                        open && "navbarTogglerActive"
                      } rounded-lg p-3 ring-primary focus:ring-2 flex flex-col items-center justify-center gap-2 lg:gap-1.5 sm:hidden`}
                    >
                      <span className="h-[2px] w-[30px] bg-blue-violet rounded-full"></span>
                      <span className="h-[2px] w-[30px] bg-blue-violet rounded-full"></span>
                      <span className="h-[2px] w-[30px] bg-blue-violet rounded-full"></span>
              </button>

              <button className='relative'>
                <span className='absolute -top-4 left-[calc(50%-4px)]'>{0}</span>
                <AiOutlineShoppingCart className='text-[30px]'/>
              </button>
            </div>
          </div>
        </div>
    </header>
  )
}

export default Header