import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from './Header'
import Footer from './Footer'
import { setCategoryList } from '@/store/categories'
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 
const RootLayout = ({ children, categoryList}: { children: React.ReactNode, categoryList: string[] })=> {
  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(setCategoryList(categoryList || [])) 
  }, [categoryList])

  return (
    <div className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
    </div>
  )
}

export default RootLayout