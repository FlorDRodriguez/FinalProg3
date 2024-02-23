import { createContext, useState, useContext, useEffect } from "react";
import Cookies from 'js-cookie';
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) => {
  
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (errors.length > 0) {
          const timer = setTimeout(() => {
            setErrors([]);
          }, 2000);
          return () => clearTimeout(timer);
        }
    }, [errors]);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            //console.log(res.data);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            //console.log(error.response);
            //setErrors(error.response.data);
            setErrors(error.response.data.message);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);
            setUser(res.data);

        } catch (error) {
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>><")

            console.error(error);
            setErrors(error.response.data.message);
        }
    }

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
    };
    
    useEffect(() => {
      async function checkLogin () {
        const cookies = Cookies.get();

        if (!cookies.token) {//Si no hay un token
          setIsAuthenticated(false);//la autenticacion esta en falso
          setLoading(false);//No esta cargndo
          return setUser(null);//No hay usuario
        }
        
        //De lo contrario...
        try {
          const res = await verifyTokenRequest(cookies.token);//Si hay un token envialo al back
          //console.log(res);
          if (!res.data) {//si el back no me responde nada
            setIsAuthenticated(false);//autenticacion en falso
            setLoading(false);//no esta cargando
            return;
          }

          //Si esta respondiendo un dato, entonces...
          setIsAuthenticated(true);//autenticacion en verdadero
          setUser(res.data);//muestrame el usuario y guardalo en el estado 
          setLoading(false);//termino de cargar 
        } catch (error) {//si dio algun error
          console.log(error);//mostramelo
          setIsAuthenticated(false);//autenticacion en falso
          setUser(null);//no hay usuario
          setLoading(false);//termino de cargar y no hay nada
        }
      }
    checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{signup, signin, loading, logout, user, isAuthenticated, errors}}>
            {children}
        </AuthContext.Provider>
    );
};

