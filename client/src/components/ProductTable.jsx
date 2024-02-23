import { useProducts } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import eliminar from '../img/eliminar.png';
import editar from '../img/editar.png';



function ProductTable({product}) {
  
  const { deleteProduct} = useProducts();

  return (
    <>
        <tbody>
          <tr>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>${product.price}</td>
            <td>{product.quantity}</td>
            <td>    
              {/* <div className="flex gap-x-2 items-center"> */}
                <button
                onClick={() => {
                  deleteProduct(product._id);
                }}>
                  <img src={eliminar} className="imgEL"/>
                </button>
            </td>
            <td>
              <Link to={`/products/${product._id}`}>
                <img src={editar} className="imgED"/> 
              </Link>
            </td>
          </tr>
        </tbody>
                    {/* </div> */}
    </>
  );
}

export default ProductTable;