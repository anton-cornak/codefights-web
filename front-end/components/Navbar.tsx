import Link from 'next/link'
import { buttonVariants } from '@/ui/Button'
import SignInButton from '@/components/SignInButton'

import ThemeToggle from '@/components/ThemeToggle'


const Navbar = () => {
    

    return (
        <div className='sticky w-full backdrop-blur-sm bg-white/75 dark:bg-black z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-600 shadow-sm flex items-center justify-center '>
            <div className='container max-width-7xl mx-auto w-full flex justify-center items-center'>
                <Link href='/' className={buttonVariants({ variant: 'link' })}>
                    HOME
                </Link>

                <Link href='/events' className={buttonVariants({ variant: 'link' })}>
                    EVENTS
                </Link>

                <Link href='/leaderboard' className={buttonVariants({ variant: 'link' })}>
                    LEADERBOARD
                </Link>

            </div>


            

            <div className='container max-width-7xl mx-auto w-full flex justify-center items-center'>

 
                <div className='hidden md:flex gap-4'>
                            <Link className={buttonVariants({ variant: 'default' })}
                                href='/register'>
                                REGISTER
                            </Link>
                       
                    <SignInButton />
                    
                    <ThemeToggle />

                </div>
            </div>
        </div>
    )
}

export default Navbar