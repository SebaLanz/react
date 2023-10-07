/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import { useParams, useLocation } from 'react-router-dom';
import sweetInfo from '../../sweetAlert/sweetInfo';
import infoTraduccion from '../categoria_traduccion/infoTraduccion';
import './ProductList.css';
import ItemCount from '../../ItemCount/ItemCount';
import SweetCarrito from '../../sweetAlert/SweetCarrito';
import CarritoLocal from '../../CarritoLocal/CarritoLocal';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import StockLocalStore from '../StockLocalStore/StockLocakStore';


const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const totalProducts = products.length;
  const [productsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const { pathname } = useLocation(); // Obtiene la ubicación actual

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  // Obtener la cantidad vendida desde StockLocalStore
  const cantidadVendida = StockLocalStore();

  useEffect(() => {
    const productList = async () => {
      try {
        const productosRef = collection(db, "productos");
        const snapshot = await getDocs(productosRef);
        const firebaseProducts = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        const filteredProducts = category
          ? firebaseProducts.filter((product) => product.category === category)
          : firebaseProducts;

        // Restar las cantidades vendidas del stock en la base de datos
        const productsWithStock = filteredProducts.map((product) => {
          const productStock = product.stock - (cantidadVendida[product.id] || 0);
          return { ...product, productStock };
        });

        setProducts(productsWithStock);
        // Reiniciar a la página 1 cuando cambie la categoría
        setCurrentPage(1);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    // Llama a productList cada vez que cambia la categoría
    productList();
  }, [category, pathname, cantidadVendida]);

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
                    sweetInfo(translatedCategory, product.description, product.rate);
                  }}
                >
                  <p className='ver-mas_p'>
                  Ver más <br /> 
                  Stock: {product.productStock} {/* Muestra el stock actualizado del producto */}
                  </p>
                </a>
                <p className="price">$ {product.price} </p>
                <ItemCount initial={1} stock={product.productStock} onAdd={(quantity) =>
                  SweetCarrito(quantity, product.title) +
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
