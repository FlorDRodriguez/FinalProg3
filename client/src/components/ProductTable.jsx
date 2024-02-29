import { useProducts } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import eliminar from '../img/eliminar.png';
import editar from '../img/editar.png';

import React, { useState } from 'react';



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
    </>
  );
}

export default ProductTable;