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

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    // Check if the token and other necessary data exist
    if (token && username && role) {
      return true; // User is authenticated
    } else {
      return false; // User is not authenticated
    }
  };

  useEffect(() => {
    // Call the checkAuthentication function
    const authenticated = checkAuthentication();
    setIsAuthenticated(authenticated);
  }, []);

  return (
    <div className="sticky w-full backdrop-blur-sm bg-white/75 dark:bg-black z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-600 shadow-sm flex items-center justify-center">
      <div className="container max-width-7xl mx-auto w-full flex justify-center items-center">
          <Link href="/" passHref>
          <button className={buttonVariants({ variant: 'link' })}>
            HOME
          </button>
        </Link>

        <Link href="/events" passHref>
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
