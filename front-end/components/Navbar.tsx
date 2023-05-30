import Link from 'next/link'
import { buttonVariants } from './Button'
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
    const { data: session } = useSession();

    const user = session?.user;

    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };



    return (
        <div className='sticky w-full backdrop-blur-sm bg-white/75 dark:bg-black z-50 top-0 left-0 right-0 h-20 border-b-[0.1rem] border-slate-300 dark:border-slate-600 shadow-sm flex '>

            <div className='container flex gap-1 justify-center items-center'>
                <a href="/">
                    <img className=' left-0 w-[2.5rem] h-[2.5remw]' src="/gulicka.png" alt="Logo" />
                </a>

                <Link href='/events' className={buttonVariants({ variant: 'link' })}>
                    EVENTS
                </Link>

                <Link href='/upcomingEvents' className={buttonVariants({ variant: 'link' })}>
                    UPCOMING_EVENTS
                </Link>

                <Link href='/latestevents' className={buttonVariants({ variant: 'link' })}>
                    LATEST_EVENTS
                </Link>

                <Link href='/leaderboard' className={buttonVariants({ variant: 'link' })}>
                    LEADERBOARD
                </Link>
            </div>

            <div className='container w-64 flex justify-center items-center'>
                <div className='hidden md:flex  gap-4 uppercase'>
                    <Link className={buttonVariants({ variant: 'default' })}
                        href='/registration'>
                        register
                    </Link>
                    {user ? (
                        <>
                            <button className={buttonVariants({ variant: 'default' })} onClick={() => signOut()}>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link className={buttonVariants({ variant: 'default' })}
                            href='/signin'>
                            login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;