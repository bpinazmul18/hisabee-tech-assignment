import { Inter } from 'next/font/google'
import Header from './Header'
import Footer from './Footer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCategoryList } from '@/store/categories'
 
// If loading a variable font, you don't need to specify the font weight
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