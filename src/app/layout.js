import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/authContext'
import { ReportProvider } from '@/context/reportContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className=' flex flex-col justify-between items-center min-h-screen'>

      <AuthProvider>
      <ReportProvider>
        {children}
      </ReportProvider>
      </AuthProvider>

        <footer className=' pb-3 w-full'>
              <p className='text-center'>
                PotarokChecker &copy; 2023 | All rights reserved
              </p>
        </footer>
      </div>
      
      </body>
    </html>
  )
}
