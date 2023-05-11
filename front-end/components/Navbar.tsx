import Link from 'next/link'
import { buttonVariants } from './Button'
import SignInButton from './SignInButton'
import BoxShadowImage from "./BoxShadowImage";


const Navbar = () => {
    

    return (
        <div className='fixed backdrop-blur-sm bg-white/75 dark:bg-black z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-600 shadow-sm flex items-center justify-center '>
            <div className='container max-width-7xl mx-auto w-full flex justify-center items-center'>
                <Link href='/home' className={buttonVariants({ variant: 'link' })}>
                    HOME
                </Link>

                <Link href='/' className={buttonVariants({ variant: 'link' })}>
                    EVENTS
                </Link>

                <Link href='/leaderboard' className={buttonVariants({ variant: 'link' })}>
                    LEADERBOARD
                </Link>

            </div>


            {/* <div className='md:hidden'>
                    <ThemeToggle />
                </div> */}

            <div className='container max-width-7xl mx-auto w-full flex justify-center items-center'>


                <div className='hidden md:flex gap-4'>
                            <Link className={buttonVariants({ variant: 'default' })}
                                href='/register'>
                                REGISTER
                            </Link>
                       
                    <SignInButton />

                </div>
            </div>
        </div>
    )
}

export default Navbar;