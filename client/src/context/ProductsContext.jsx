import { createContext, useContext, useState } from "react";

import { createProductRequest, getProductsRequest, deleteProductRequest, 
  getProductRequest, updateProductRequest } from "../api/products.js";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data);
    } catch (error) {
        console.error(error)
    }

  }

  const createProduct = async (product) => {
    try {
      const res = await createProductRequest(product);
      console.log(res.data);
    } catch (error) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      //console.log(error);
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        console.log('Código de estado:', error.response.status);
        console.log('Datos de respuesta:', error.response.data);
      } else if (error.request) {
        // La solicitud fue realizada, pero no se recibió respuesta
        console.log('No se recibió respuesta del servidor');
      } else {
        // Ocurrió un error durante la configuración de la solicitud
        console.log('Error al configurar la solicitud', error.message);
      }
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      if (res.status === 204) setProducts(products.filter(product => product._id !== id));
      // Si responde 204, de las tareas filtrá cada una de las tareas
      // Si por cada tarea su id es distinto al id que acaba de recibir entonces conservalo
      // Esto crea un arreglo nuevo pero sin la tarea que acabo de borrar
    } catch (error) {
      console.log(error);
    }
    };
  
  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data; //devuelve el producto
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const updateProduct = async (id, product) => { 
  //el 1er parametro es el id del producto que quiero actualizar, el 2do son los nuevos valores
    try {
      await updateProductRequest(id, product);
    } catch (error) {
      console.error(error);
    }  
  }

  // const searchProduct = async (name) => { 
  //     try {
  //       const res = await searchProductRequest(name);
  //       console.log("11111111111111")
  //       console.log(res);
  //     } catch (error) {
  //       console.log("22222222222222");
  //       console.error(error);
  //     }  
  // },

  return (
    <ProductContext.Provider value={{ products, createProduct, getProducts, deleteProduct,
     getProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}


