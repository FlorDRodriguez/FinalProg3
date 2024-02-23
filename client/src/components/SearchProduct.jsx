import React, { useState } from 'react';
import { searchProductRequest } from "../api/products.js";

const SearchProduct = () => {
    const [searchName, setSearchName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearch = async () => { //esta funcion trae TODOS los productos
        try {
            if (searchName) {
                //solicitud de búsqueda, pasando el término de búsqueda(searchName) como parámetro
                const res = await searchProductRequest(searchName);
                //Actualiza el estado searchResults con los datos de los productos devueltos
                //Es decir, ctualiza la interfaz de usuario con los resultados de búsqueda obtenidos.
                setSearchResults(res.data);
                console.log(res.data); // Mostrar los datos de la respuesta en la consola
            }
        } catch (error) {
            console.error('>>>>Error al buscar productos');
            console.log(error.response.data); 
        }
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Buscar producto"
          value={searchName} //el valor ingresado será actualizado según el estado searchName
          onChange={(e) => {
            // console.log('Nuevo valor de búsqueda:', e.target.value);
            setSearchName(e.target.value);
          }}
          //onChange es un evento que se dispara cada vez que el valor del campo de entrada cambia, 
          //y actualiza el estado searchName con el nuevo valor ingresado
        />
        <button onClick={handleSearch}>Buscar</button>
        {/*cuando los usuarios hagan clic en el botón, se ejecutará la función handleSearch*/}
        <ul>
          {searchResults && searchResults.map((product) => (
            <li key={product.name}>{product.name}</li>
            //searchResults.map itera sobre la matriz de searchResults (los resultados de búsqueda) 
            //El atributo key={product.id} se utiliza para identificar de manera única 
            //cada elemento de la lista
          ))}
        </ul>
      </div>
    );
  };
  
  export default SearchProduct;