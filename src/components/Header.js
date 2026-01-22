import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-black text-white px-6 py-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">🐄 Milking Tracker</h1>

        <ul className="flex gap-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "text-green-400 font-semibold" : ""
            }
          >
            Home
          </NavLink>

          {/* <NavLink
            to="/music"
            className={({ isActive }) =>
              isActive ? "text-green-400 font-semibold" : ""
            }
          >
            Music
          </NavLink> */}

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? "text-green-400 font-semibold" : ""
            }
          >
            History
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
