import { Link } from "react-router-dom";

const logo =
  "https://www.holcim.com.ar/themes/custom/corporate_country/components/header/images/holcim_logo_color.svg";

const Navbar = () => {
  return (
    <nav className="bg-slate-100 p-1">
      <div className="container mx-auto h-full px-4 flex flex-wrap items-center justify-between">
        {/* Left section: Logo + Country */}
        <div className="flex items-end">
          <Link to="/" className="font-bold">
            <img alt="Logo Holcim" src={logo} className="mr-4 h-11" />
          </Link>
          <span
            className="relative text-sm font-bold text-slate-400"
            style={{ transform: "translateY(-5px)" }}
          >
            ARGENTINA
          </span>
        </div>
        {/* Right section: Title */}
        <div className="text-center hidden sm:flex">
          <span className="text-xl font-bold text-slate-600">
            Stock de Piezas en el Almacén
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
