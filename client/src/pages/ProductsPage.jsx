import { useEffect } from 'react';
import { useProducts } from '../context/ProductsContext.jsx';
import ProductTable from '../components/ProductTable.jsx';
import HeaderTable from '../components/HeaderTable.jsx';
import SearchProduct from '../components/SearchProduct.jsx';



function ProductsPage () {
  const { getProducts, products } = useProducts();

  useEffect(() => {
    getProducts(); //useEffect carga los productos
  }, []);

  if (products.length === 0) return (<h1>No hay productos.</h1>)

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3  gap-2'>
      
      <div className='text-black'>
        <SearchProduct/>
      </div>

      <table className='table bg-red-200 rounded-lg'>
      <HeaderTable/>
      {
        products.map(product => (
          <ProductTable product={product} key={product._id}/>
        ))
      }
      </table>
    </div>
  )
};
export default ProductsPage;
