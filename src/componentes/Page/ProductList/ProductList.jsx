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

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const totalProducts = products.length;
  const [productsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const { pathname } = useLocation(); // Obtiene la ubicación actual

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

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

        setProducts(filteredProducts);
        //Reiniciar a la página 1 cuando cambie la categoría
        setCurrentPage(1);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    //Llama a productList cada vez que cambia la categoría
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
                <ItemCount initial={1} stock={10} onAdd={(quantity) =>
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
