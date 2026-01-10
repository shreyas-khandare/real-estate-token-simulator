import { Link, useLocation } from "react-router-dom";

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
        <div className="max-w-6xl flex items-center gap-8 px-8 py-4 text-base font-medium">
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
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex justify-center">
        <div className="flex gap-4 px-4 py-3 text-sm font-medium">
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
      </div>
    </nav>
  );
}
