import './globals.css'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@/context/authContext'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Newflix',
  description: 'NewFlix - Watch Latest Movies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <AuthContextProvider>
      <body className={inter.className}>
      <script src="https://www.youtube.com/iframe_api" /> 
        {children}
      </body>
    </AuthContextProvider>

    </html>
  )
}
