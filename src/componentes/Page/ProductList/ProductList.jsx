/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
 // Importa useLocation para obtener la url actual, lo voy a utilizar para navegar entre los btns del NAV
 // Para que se actualice la vista (métodos get llamados a la api)
import { useParams, useLocation } from 'react-router-dom';
import sweetInfo from '../../sweetAlert/sweetInfo';
import infoTraduccion from '../categoria_traduccion/infoTraduccion';
import './ProductList.css';
import ItemCount from '../../ItemCount/ItemCount';
import SweetCarrito from '../../sweetAlert/SweetCarrito';
import CarritoLocal from '../../CarritoLocal/CarritoLocal';

const ProductList = () => {
  const { category } = useParams(); // Obtiene la categoría de la URL
  const [products, setProducts] = useState([]);
  const totalProducts = products.length;
  const [productsPerPage, /*setProductsPerPage*/] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const { pathname } = useLocation(); // Obtiene la ubicación actual

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  useEffect(() => {
    const productList = async () => {
      try {
        let apiUrl = 'https://fakestoreapi.com/products';

        // Verifico si categoría no está vacía y concateno su contenido al resto de la URL.
        if (category) {
          apiUrl += `/category/${category}`;
        }

        const data = await fetch(apiUrl);
        //Si data tiene un problema, muestro error.
        if (!data.ok) {
          throw new Error('No se pudo obtener la información de la API');
        }
        const products = await data.json();

        setProducts(products);
        //Error con los productos obtenidos una vez tenida la url.
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    // Llama a productList cada vez que cambia la categoría o la ubicación (URL)
    productList();
  }, [category, pathname]);

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
                  
                    <ItemCount initial={1} stock={10} onAdd={(quantity)=> 
                      SweetCarrito(quantity,product.title) + 
                      CarritoLocal(quantity, product.id)}>
                    </ItemCount>     

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
