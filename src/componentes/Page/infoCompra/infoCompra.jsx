import React, { useEffect, useState } from 'react';
import './infoCompra.css';
import GetProductById from '../GetProductById/GetProductById';
import trashIcon from '../../CartWidget/assets/trash.svg';

const InfoCompra = () => {
  const cartData = localStorage.getItem('carrito');
  const cartItems = JSON.parse(cartData) || [];
  const [products, setProducts] = useState([]); // Almacenar los datos de productos

  // Obtener los datos de productos para cada elemento del carrito
  useEffect(() => {
    const fetchData = async () => {
      const productPromises = cartItems.map(async (item) => {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${item.id}`);
          if (!response.ok) {
            throw new Error('No se pudo obtener la información del producto');
          }
          const productData = await response.json();
          return { ...productData, cantidad: item.cantidad };
        } catch (error) {
          alert(`Error al obtener el producto con ID ${item.id}:`, error);
          return null;
        }
      });

      const products = await Promise.all(productPromises);
      setProducts(products.filter((product) => product !== null));
    };

    fetchData();
  }, [cartItems]);


  return (
    <div className="info-compra-container">
      <table className="product-table">
        <thead>
          <tr>
            <th id='th_cod'>Código</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td id='td_product'>
                <GetProductById id_producto={product.id} />
              </td>
              <td>${product.price}</td>
              <td>{product.cantidad}</td>
              <td>${product.price * product.cantidad}</td>
              <td>
                <button className="delete-button">
                <img src={trashIcon} alt="Eliminar" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoCompra;


