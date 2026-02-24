import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-gray-800 text-white py-3 px-6 flex items-center justify-between">
      
      {/* Logo */}
      <NavLink
        to="/"
        className="font-bold text-xl tracking-tight"
      >
        Gastos y Servicios Mensuales
      </NavLink>

      <div className="flex items-center gap-6">

        {/* Inicio */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm px-4 py-2 rounded-full transition ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Inicio
        </NavLink>

        {/* Servicios Dropdown */}
        <div className="relative group">
          
          <button className="text-sm px-4 py-2 rounded-full hover:bg-gray-700 transition flex items-center gap-1">
            Servicios
            <span className="text-xs">▼</span>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute left-0 top-full mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">

            <NavLink
              to="/servicios"
              className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
            >
              Ver Servicios
            </NavLink>

            <NavLink
              to="/servicios/create"
              className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg"
            >
              Agregar Servicio
            </NavLink>

          </div>
        </div>

        {/* Gastos */}
        <NavLink
          to="/servicios/gastos"
          className="text-sm px-4 py-2 rounded-full hover:bg-gray-700 transition"
        >
          Gastos
        </NavLink>

      </div>
    </nav>
  );
}

export default NavBar;