import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";

function productFormPage() {
  const { register, handleSubmit, setValue } = useForm(); 
  //setValue permite establecer valor en los estados que react hook crea
  const navigate = useNavigate();
  const params = useParams();

  const { createProduct, getProduct, updateProduct } = useProducts();

  useEffect(() => {
    async function LoadProduct () {
      if (params.id) {
        const product = await getProduct(params.id);
        console.log(product);
        setValue('name', product.name);
        setValue('description', product.description);
        setValue('price', product.price);
        setValue('quantity', product.quantity);

        //el 1ro es donde queremos colocar el valor, el 2do es de donde viene        
      }
    }
    LoadProduct();
  }, [])
  

  const onSubmit = handleSubmit( async (data) => {
    
    const dataValid = {
      ... data,
    };

    if (params.id) { //si params.id existe quiere decir que esta creando
      updateProduct(params.id, {
        ...data,
      });
    } else { //si no, esta creando
      createProduct({
        ...data,//copia todo los datos que estas enviando al create
      });
    }
    navigate('/products');
  });

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className="bg-red-200 max-w-md w-full p-10 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            {...register("name")}
            //el register devuelve 3 propiedades: onChange, value y name
            className="w-full bg-red-100 text-black px-4 py-2 rounden-md my-2"
            autoFocus
          />
          <label htmlFor="description">Descripción</label>
          <textarea
            name="description"
            id="description"
            rows="3"
            placeholder="Descripción"
            {...register("description")}
            className="w-full bg-red-100 text-black px-4 py-2 rounden-md my-2"
          />
          <label htmlFor="price">Precio</label>
          <input
            name="price"
            id="price"
            rows="3"
            placeholder="Precio"
            {...register("price")}
            className="w-full bg-red-100 text-black px-4 py-2 rounden-md my-2"
          />

                <label htmlFor="quantity">Cantidad</label>
                <select 
                name="quantity" 
                id="quantity" 
                rows="3"
                {...register("quantity")}
                className="w-full bg-red-100 text-black px-4 py-2 rounden-md my-2"
                >
                  <option selected>Seleccionar</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>

          {/* <label htmlFor="quantity">Cantidad</label>
          <input
            name="quantity"
            id="quantity"
            rows="3"
            placeholder="Cantidad"
            {...register("quantity")}
            className="w-full bg-red-100 text-black px-4 py-2 rounden-md my-2"
          /> */}

          <button className="bg-indigo-500 px-3 py-2 rounded-md">Guardar</button>
        </form>
      </div>
    </div>
  );
}

export default productFormPage;
