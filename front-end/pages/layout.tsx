import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/Toast'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(
      'bg-white text-slate-900 antialiased', inter.className
    )}>
      <body className='min-h-screen bg-slate-50 dark:bg-slate-950 antialiased'>
        <Providers>{children}

        <Toaster position='bottom-right'/>
        
        
        </Providers>


        {/* Allow height on mobile*/}
        <div className='h-40 md:hidden'/>
        </body>
    </html>
  )
}

