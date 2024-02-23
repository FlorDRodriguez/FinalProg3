import { useProducts } from "../context/ProductsContext";
import { Link } from "react-router-dom";

function ProductCard ({ product }) {
  
    const { deleteProduct} = useProducts();
  
    return (
        <div className="bg-red-200 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="flex gap-x-2 items-center">
                    <button 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"    
                        onClick={() => {
                        deleteProduct(product._id);
                    }}>Eliminar</button>
                    {/* Cuando haga click en eliminar, ejecuta la fc */}
                    <Link to={`/products/${product._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >Editar</Link>
                    {/* concatena /tasks con task._id */}
                </div>
            </header>
            <p className="text-slate-300">{product.description}</p>
        </div>
    )
}

export default ProductCard;