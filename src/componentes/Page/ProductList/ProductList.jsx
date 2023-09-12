import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination';
import sweetInfo from '../../sweetAlert/sweetInfo'
import infoTraduccion from '../../categoria_traduccion/infoTraduccion';
import './ProductList.css';


const ProductList = () => {

    const [products, setProducts] = useState([]);

    const totalProducts = products.length;
    const [productsPerPage, setProductsPerPage] = useState([6]);
    const [currentPage, setCurrentPage] = useState([1]);

     
    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex -  productsPerPage; 

    const productList = async() => { 
      const data = await fetch('https://fakestoreapi.com/products?limit=50');
      const products = await data.json();

      setProducts(products);
    }

    useEffect(() => {
        productList();
    }, [])




  return (
    <>
      <div className="container-products">
        {products.map(product => (
          
            <div className="card-product" key={product.id}>
              <figure className="container-img">
                
                <img src={product.image} alt={product.title} />
              </figure>
              <div className="info-product">
                <a className='ver-mas' onClick={ () => {
                  const translatedCategory = infoTraduccion(product.category);
                  sweetInfo(translatedCategory, product.description);
                  }}>Ver más</a>
                <p className="price">$ {product.price}</p>
                <button>Añadir al carrito</button>
              </div>
            </div>
        )).slice(firstIndex, lastIndex)
        }
      </div>
      <Pagination productsPerPage={productsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalProducts={totalProducts}
        ></Pagination>
    </>
  )
}
export default ProductList;
