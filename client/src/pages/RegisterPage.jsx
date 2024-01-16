import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


function RegisterPage() {
  
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    
    const {register, handleSubmit, formState: {errors}} = useForm();
    
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) navigate("/tasks");
    }, [isAuthenticated])

    const onSubmit = async (value) => {
        await signup(value);
    };

  return (
    <div className='flex h-screen items-center justify-center'>
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            {
                registerErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white my-2" key={i}>
                        {error}
                    </div>
                ))
            }
            
            <h1 className='text-2xl font-bold text-center'> Registro </h1>

            <form  onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("username", {required: true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
                placeholder="Nombre de Usuario"/>
                {errors.username && <p className="text-red-500">El nombre de usuario es obligatorio.</p>}

                <input type="text" {...register("email", {required: true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
                placeholder="Email"/>
                {errors.email && <p className="text-red-500">El email es obligatorio.</p>}


                <input type="text" {...register("password", {required: true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
                placeholder="Contraseña"/>
                {errors.password && <p className="text-red-500">La contraseña es obligatoria.</p>}

                
                <button type="submit"> Registrarme </button>
            </form>

            <p className='flex gap-x-2 justify-between'>
            ¿Ya tienes una cuenta? <Link to='/login' 
            className='text-sky-500'> Ingresar </Link>
            </p>
        </div>
    </div>
  )
}

export default RegisterPage