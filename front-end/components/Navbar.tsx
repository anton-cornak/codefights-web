import Link from 'next/link'
import { buttonVariants } from './Button'
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Toggle from '../components/Toggle';

const Navbar = () => {
  const { data: session } = useSession();

  const user = session?.user;

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

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
                <div className='hidden md:flex gap-4 uppercase'>
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
                    <Toggle/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;