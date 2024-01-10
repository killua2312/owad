import Link from "next/link";
import { usePathname } from "next/navigation";
import Wallet from "./wallet";
import AccountMenu from "./profile";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="text-center fixed bottom-0 left-0 w-1/3 h-93 p-4 z-50 shadow-3d flex flex-col lg:hidden">
      <div className="block py-2">
        <AccountMenu />
      </div>
      <div className="block py-2">
        <Wallet />
      </div>
      <Link
        href="/"
        className={`${pathname === "/" ? "font-bold" : ""} block py-2`}
      >
        Home
      </Link>
      <Link
        href="/myList"
        className={`${pathname === "/movies" ? "font-bold" : ""} block py-2`}
      >
        My List
      </Link>
      <Link
        href="/anime"
        className={`${pathname === "/movies" ? "font-bold" : ""} block py-2`}
      >
        Anime
      </Link>
      <Link
        href="/movies"
        className={`${pathname === "/movies" ? "font-bold" : ""} block py-2`}
      >
        Movies
      </Link>
    </div>
  );
};

export default Sidebar;
