import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';


function LoginPage() {

  const { register, handleSubmit, formState: {errors} } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) navigate("/tasks");
  }, [isAuthenticated])

  const onSubmit = handleSubmit(data => {
    signin(data);
  })

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        
        { 
          signinErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white my-2" key={i}>
              {error}
            </div>
          ))
        }

        <h1 className='text-2xl font-bold text-center'> Inicio de Sesión </h1>

        <form  onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("email", {required: true})}
          className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          placeholder="Email"/>
          {errors.email && <p className="text-red-500">El email es obligatorio.</p>}


          <input type="text" {...register("password", {required: true})}
          className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          placeholder="Contraseña"/>
          {errors.password && <p className="text-red-500">La contraseña es obligatoria.</p>}

                
          <button type="submit"> Ingresar </button>
        </form>

        <p className='flex gap-x-2 justify-between'>
          ¿No tienes una cuenta aún? <Link to='/register' 
          className='text-sky-500'> Registrarse </Link>
        </p>

      </div>
    </div>
  )
}

export default LoginPage