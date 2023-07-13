import { Inter } from 'next/font/google'
import Header from './Header'
import Footer from './Footer'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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