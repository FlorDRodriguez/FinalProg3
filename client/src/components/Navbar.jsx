import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import fuego from '../img/fuego.png';

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)

  return (
    <nav className="bg-red-200 my-3 flex justify-between py-5 px-10 rounded-lg">
      <a href="/">
        <img src={fuego}  width="30" height="50" />
      </a> 
      <ul className="flex gap-x-2 py-5 px-15">
        {isAuthenticated ? (
            <>
            <li>
              <Link to="/add-product" className="bg-red-500 px-4 py-1 rounded-sm">Agregar producto</Link>
            </li>
            <li>
              <Link to="/products" className="bg-red-500 px-4 py-1 rounded-sm">Ver productos</Link>
            </li>
            <li>
                <Link to="/" onClick={() => logout()} className="bg-red-500 px-4 py-1 rounded-sm">
                {/* Envia al inicia pero tb al hacer click ejecuta la fc logout */}
                    Cerrar sesión
                </Link>
            </li>


          </>
        ):(//si no...
            <>
                <li text-aling-center>
                    <Link to="/login"
                    className="bg-red-500 px-4 py-1 rounded-sm" >Ingresar</Link>
                </li>
                <li>
                    <Link to="/register"
                    className="bg-red-500 px-4 py-1 rounded-sm">Registrarse</Link>
                </li>
            </>          
        )}
      </ul>
    </nav>
  );
}