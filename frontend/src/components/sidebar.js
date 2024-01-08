import Link from "next/link";
import { usePathname } from "next/navigation";
import Wallet from "./wallet";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-secondaryBackground text-center fixed top-16 left-0 w-1/3 h-full p-4 z-50 flex flex-col lg:hidden">
      <Link href="/profile" className="block py-2">
        Profile
      </Link>
      <div className="block py-2">
        <Wallet />
      </div>
      <Link
        href="/"
        className={`${pathname === "/" ? "text-highlight" : ""} block py-2`}
      >
        Home
      </Link>
      <Link
        href="/myList"
        className={`${
          pathname === "/movies" ? "text-highlight" : ""
        } block py-2`}
      >
        My List
      </Link>
      <Link
        href="/anime"
        className={`${
          pathname === "/movies" ? "text-highlight" : ""
        } block py-2`}
      >
        Anime
      </Link>
      <Link
        href="/movies"
        className={`${
          pathname === "/movies" ? "text-highlight" : ""
        } block py-2`}
      >
        Movies
      </Link>
    </div>
  );
};

export default Sidebar;
