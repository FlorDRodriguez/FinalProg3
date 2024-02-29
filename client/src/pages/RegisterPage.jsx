import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function RegisterPage() {
  
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    
    const {register, handleSubmit, formState: {errors}} = useForm();
    
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) navigate("/products");
    }, [isAuthenticated]);

    const onSubmit = async (value) => {
        await signup(value);
    };

  return (
    <div className='flex h-screen items-center justify-center'>
        <div className='bg-red-200 max-w-md w-full p-10 rounded-md'>
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
                className="w-full bg-red-100 text-black px-4 py-2 my-2 rounded-md"
                placeholder="Nombre de Usuario"/>
                {errors.username && <p className="text-red-500">El nombre de usuario es obligatorio.</p>}

                <input type="text" {...register("email", {required: true})}
                className="w-full bg-red-100 text-black px-4 py-2 my-2 rounded-md"
                placeholder="Email"/>
                {errors.email && <p className="text-red-500">El email es obligatorio.</p>}


                <input type="password" {...register("password", {required: true})}
                className="w-full bg-red-100 text-black px-4 py-2 my-2 rounded-md"
                placeholder="Contraseña"/>
                {/* <input type="checkbox" onclick="myFunction()"/>Mostrar Contraseña */}
                {errors.password && <p className="text-red-500">La contraseña es obligatoria.</p>}

                <button 
                type="submit"
                className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"> 
                    Registrarse 
                </button>
            </form>

            <p className='flex gap-x-2 justify-between'>
            ¿Ya tienes una cuenta? <Link to='/login' 
            className='text-sky-500'> Ingresar </Link>
            </p>
        </div>
    </div>
  )
}


{/* <script>
  function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text"
    } else {
      x.type = "password"
  }
}
</script> */}

export default RegisterPage