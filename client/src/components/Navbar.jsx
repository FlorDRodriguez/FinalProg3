import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
// import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Administrador de Tareas</Link>
      </h1> 
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
            <>
            <li>Bienvenid@</li>
            <li>
              <Link to="/add-task">Agregar tarea</Link>
            </li>
            <li>
                <Link to="/" onClick={() => logout()}>
                {/* Envia al inicia pero tb al hacer click ejecuta la fc logout */}
                    Cerrar sesión
                </Link>
            </li>


          </>
        ):(//si no...
            <>
                <li>
                    <Link to="/login"
                    className="bg-indigo-500 px-4 py-1 rounded-sm">Ingresar</Link>
                </li>
                <li>
                    <Link to="/register"
                    className="bg-indigo-500 px-4 py-1 rounded-sm">Registrarse</Link>
                </li>
            </>

            // <li>
            //   Welcome {user.username}
            // </li>
            //  <li>
            //   <ButtonLink to="/add-task">Add Task</ButtonLink>
            // </li>

          
        )}
      </ul>
    </nav>
  );
}