import { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductsContext.jsx';
import ProductTable from '../components/ProductTable.jsx';
import HeaderTable from '../components/HeaderTable.jsx';
import SearchProduct from '../components/SearchProduct.jsx';


function ProductsPage ( {searchResults} ) {
  const { getProducts, products } = useProducts();

  useEffect(() => {
    getProducts(); //useEffect carga los productos
  }, []);

  if (products.length === 0) {
    return (
      <div className=' bg-red-200 rounded-lg '>
        <b>No hay productos agregados</b>
      </div>
    )
  } else if (searchResults) {
    return (

      <div className='grid sm:grid-cols-2 md:grid-cols-3  gap-2'>
        
        <div className='text-black'>
          <SearchProduct/>
        </div>
  
        <table className='table bg-red-200 rounded-lg'>
        <HeaderTable/>
  
        {searchResults.map(product => (
          <ProductTable searchResults={product} key={product._id}/>
        ))
        }   
        </table>
      </div>
    )    
  } else {
    return (

      <div className='grid sm:grid-cols-2 md:grid-cols-3  gap-2'>
        
        <div className='text-black'>
          <SearchProduct/>
        </div>
  
        <table className='table bg-red-200 rounded-lg'>
        <HeaderTable/>
        
        {products.map(product => (
            <ProductTable product={product} key={product._id}/>
        ))}   
        </table>
      </div>
    )
  
  }


          {/* {searchResults != null && searchResults.map((product) => (
            <ProductTable product={product} key={product._id}/>
          ))}
  
         {searchName && search.map((product) => (
            <ProductTable product={product} key={product._id}/>
          ))}  */}
  


  // async function refreshItems () {
  //   const Items = await axios.get(`url`)
  //   setItems(Items.data.items);
  // };

};
export default ProductsPage;