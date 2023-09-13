import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import { useParams } from 'react-router-dom';
import sweetInfo from '../../sweetAlert/sweetInfo';
import infoTraduccion from '../categoria_traduccion/infoTraduccion';
import './ProductList.css';


const ProductList = () => {

  const { category } = useParams(); // Obtiene la categoría de la URL
  const [products, setProducts] = useState([]);
  const totalProducts = products.length;
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const productList = async () => {
    try {
      let apiUrl = 'https://fakestoreapi.com/products';
      // Verifica si la URL contiene una categoría y ajusta la URL de la API en consecuencia
      if (category) {
        apiUrl += `/category/${category}`;
        
      }

      const data = await fetch(apiUrl);
      if (!data.ok) {
        throw new Error('No se pudo obtener la información de la API');
      }
      const products = await data.json();

      setProducts(products);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };
  

  useEffect(() => {
    productList();
  }, []);

  
  return (
    <>
      <div className="container-products">
        {products
          .slice(firstIndex, lastIndex)
          .map((product) => (
            <div className="card-product" key={product.id}>
              <figure className="container-img">
                <img src={product.image} alt={product.title} />
              </figure>
              <div className="info-product">
                <a
                  className="ver-mas"
                  onClick={() => {
                    const translatedCategory = infoTraduccion(product.category);
                    sweetInfo(translatedCategory, product.description);
                  }}
                >
                  Ver más
                </a>
                <p className="price">$ {product.price}</p>
                <button>Añadir al carrito</button>
              </div>
            </div>
          ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={totalProducts}
        
      />
    </>
  );
};

export default ProductList;
