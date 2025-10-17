import { CircleUserRound, FormInput, Home, List, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#fdb813] to-[#ffcc33] border-b border-yellow-400 shadow-sm px-6 py-4 flex justify-between items-center text-white">
      {/* Left section: logo + title */}
      <div className="flex items-center gap-2">
        <Home className="h-6 w-6" />
        <h1 className="text-lg lg:text-2xl font-extrabold tracking-tight">
          Property Guru
        </h1>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="hidden lg:flex gap-6 items-center">
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
              <CircleUserRound className="h-4 w-4 text-white" />
              <span className="text-sm">Login</span>
            </button>
          </li>
        </ul>
        <div className="lg:hidden">
          <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <PopoverTrigger>
              <Menu className="h-6 w-6" />
            </PopoverTrigger>
            <PopoverContent className="lg:hidden">
              <ul className=" flex flex-col gap-4">
                <li>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-2 border border-yellow-400 w-full justify-center rounded-full p-2"
                  >
                    <CircleUserRound className=" text-yellow-400" />
                    <span className="text-base">Login</span>
                  </button>
                </li>
                <li className="flex gap-2">
                  <FormInput className="text-yellow-400" />
                  <Link
                    to="/"
                    className="font-medium hover:underline transition-all hover:scale-[1.05]"
                  >
                    Form
                  </Link>
                </li>
                <li className="flex gap-2">
                  <List className=" text-yellow-400" />
                  <Link
                    to="/listings"
                    className="font-medium hover:underline transition-all hover:scale-[1.05]"
                  >
                    Listings
                  </Link>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </header>
  );
}
