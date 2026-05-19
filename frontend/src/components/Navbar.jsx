import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

const links = [
  { label: "Admin", path: "/admin/assets" },
  { label: "Market", path: "/market" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Insights", path: "/insights" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="w-full bg-white border-b sticky top-0 z-30 backdrop-blur-sm">
      
      {/* Desktop */}
      <div className="hidden sm:flex justify-center">
        <div className="max-w-6xl w-full flex items-center justify-between px-8 py-4 text-base font-medium">
          
          {/* Navigation */}
          <div className="flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`hover:text-blue-600 transition ${
                  pathname.startsWith(l.path)
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded border hover:bg-gray-100">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded bg-black text-white">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex justify-between items-center px-4 py-3">
        
        <div className="flex gap-4 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`hover:text-blue-600 transition ${
                pathname.startsWith(l.path)
                  ? "text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm px-3 py-1 border rounded">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}