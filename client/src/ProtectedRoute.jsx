import { Navigate, Outlet } from "react-router-dom"; //Oulet es el componente que esta dentro
import { useAuth } from "./context/AuthContext.jsx";

export const ProtectedRoute = () => {
    const { loading, isAuthenticated } = useAuth();
    console.log(loading, isAuthenticated);

    if(loading) return <h1> Cargando... </h1>

    if (!loading && !isAuthenticated) return <Navigate to='/login' replace/>
    return <Outlet/> //Continua con el componente que esta dentro
    
}