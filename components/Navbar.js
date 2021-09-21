import Link from "next/link";

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: "#0381b5" }} className="w-full h-14">
      <div className="container flex items-center justify-between px-2 pt-1 mx-auto font-semibold text-white">
        <Link href="/">
          <a className="text-2xl cursor-pointer">Note App</a>
        </Link>
        <Link href="/create">
          <a className="py-2 text-xl transition-all delay-100 border-2 rounded-md cursor-pointer px-7 hover:bg-blue-600">
            Create
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
