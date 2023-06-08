import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Toggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const lightIcon = "/moon-shape.png";
  const darkIcon = "/whiteSun.png";

  return (
    <button
      onClick={() => {
        if (theme === "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }}
      type="button"
      className="opacity-75 p-6 text-xl text-black dark:text-white"
    >
      {theme === "light" ? (
        <Image src={lightIcon} alt="Moon Icon" width={24} height={24} />
      ) : (
        <Image src={darkIcon} alt="Sun Icon" width={24} height={24}/>
      )}
    </button>
  );
}
