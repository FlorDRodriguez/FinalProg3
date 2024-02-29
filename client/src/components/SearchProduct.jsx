import React, { useState } from 'react';
import { searchProductRequest } from "../api/products.js";
import HeaderTable from './HeaderTable.jsx';
import ProductTable from './ProductTable.jsx';

const SearchProduct = ( {products} ) => {
    const [searchName, setSearchName] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => { 
        try {
            if (searchName) {
                //solicitud de búsqueda, pasando el término de búsqueda(searchName) como parámetro
                const res = await searchProductRequest(searchName);
                //Actualiza el estado searchResults con los datos de los productos devueltos
                //Es decir, ctualiza la interfaz de usuario con los resultados de búsqueda obtenidos.
                setSearchResults(res.data);
                console.log(res); 
            }
        } catch (error) {
            console.error('>>>>Error al buscar productos');
            console.log(error.response.data); 
        }
    };
  
    return (
      <div className="divSearch bg-red-200 p-10 rounded-md">
        <input
          className='search'
          type="text"
          placeholder="Buscar producto..."
          value={searchName} //el valor ingresado será actualizado según el estado searchName
          onChange={(e) => {
            console.log('Nuevo valor de búsqueda:', e.target.value);
            setSearchName(e.target.value);
          }}
          //onChange es un evento que se dispara cada vez que el valor del campo de entrada cambia, 
          //y actualiza el estado searchName con el nuevo valor ingresado
        />
        <button className='button' onClick={handleSearch}>Buscar</button>

        {searchResults && searchResults.map((product) => (
          <ProductTable product={product} key={product._id}/>
        ))}
      </div>
    );
  };
  
  export default SearchProduct;