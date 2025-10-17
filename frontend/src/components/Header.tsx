import { CircleUserRound, Home } from "lucide-react";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#fdb813] to-[#ffcc33] border-b border-yellow-400 shadow-sm px-6 py-4 flex justify-between items-center text-white">
      {/* Left section: logo + title */}
      <div className="flex items-center gap-2">
        <Home className="h-6 w-6" />
        <h1 className="text-2xl font-extrabold tracking-tight">
          Property Guru
        </h1>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex gap-6 items-center">
          <li>
            <Link
              to="/"
              className="font-medium hover:underline transition-all hover:scale-[1.05]"
            >
              Form
            </Link>
          </li>
          <li>
            <Link
              to="/listings"
              className="font-medium hover:underline transition-all hover:scale-[1.05]"
            >
              Listings
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 border border-white rounded-full p-2"
            >
              <CircleUserRound className="h-4 w-4 text-green-400" />
              <span className="text-sm">Login</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
