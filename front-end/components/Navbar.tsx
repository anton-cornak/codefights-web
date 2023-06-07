import Link from 'next/link';
import { buttonVariants } from './Button';
import { useState, useEffect } from 'react';
import Toggle from '../components/Toggle';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleClick = () => {
		setActive(!active);
	};

	return (
		<div className="sticky left-0 right-0 top-0 z-50 flex h-20 w-full border-b-[0.1rem] border-slate-300 bg-white/75 shadow-sm backdrop-blur-sm dark:border-slate-600 dark:bg-black ">
			<div className="container flex items-center justify-start gap-5">
				<Link href="/">
					<Image
						className=" left-0 h-[2.5remw] w-[2.5rem]"
						src="/gulicka.png"
						alt="Logo"
						width={50}
						height={50}
					/>
				</Link>

				<Link
					href="/upcomingEvents"
					className={buttonVariants({ variant: "link" })}
				>
					UPCOMING_EVENTS
				</Link>

        <Link href="/eventsNEW" passHref>
          <button className={buttonVariants({ variant: 'link' })}>
            EVENTS
          </button>
        </Link>

        <Link href="/leaderboard" passHref>
          <button className={buttonVariants({ variant: 'link' })}>
            LEADERBOARD
          </button>
        </Link>
      </div>

      <div className="container max-width-7xl mx-auto w-full flex justify-center items-center">
        <div className="hidden md:flex gap-4 uppercase">
          <Link href="/registration" passHref>
            <button className={buttonVariants({ variant: 'default' })}>
              register
            </button>
          </Link>
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <Link href="/login" passHref>
              <button className={buttonVariants({ variant: 'default' })}>
                login
              </button>
            </Link>
          )}
          <Toggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
