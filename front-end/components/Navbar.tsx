import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <div className="navbar h-20 bg-black text-color1 text-2xl">
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
          
            <li><a>LEADERBOARD</a></li>
            <li><a>LATEST EVENTS</a></li>
            <li><a>UPCOMING EVENTS</a></li>
            <li><a>REGISTER</a></li>
            <li><a>LOGIN</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}
