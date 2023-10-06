import React, { useEffect, useState } from 'react';
import './infoCompra.css';
import GetProductById from '../GetProductById/GetProductById';
import SweetConfirmar from '../../sweetAlert/SweetConfirmar';
import { db } from "../../../firebase/config";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import ComprarCarrito from '../ComprarCarrito/ComprarCarrito';

const InfoCompra = () => {
  const cartData = localStorage.getItem('carrito');
  const cartItems = JSON.parse(cartData) || [];
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const productPromises = cartItems.map(async (item) => {
      try {
        const productDocRef = doc(db, "productos", item.id);
        const productDocSnapshot = await getDoc(productDocRef);

        if (!productDocSnapshot.exists()) {
          throw new Error('El producto no existe en la base de datos');
        }

        // Extraer el ID del documento del docRef
        const productId = productDocSnapshot.id;

        const productData = productDocSnapshot.data();
        return { ...productData, cantidad: item.cantidad, id: productId };
      } catch (error) {
        alert(`Error al obtener el producto con ID ${item.id}: ${error.message}`);
        return null;
      }
    });

    const products = await Promise.all(productPromises);
    setProducts(products.filter((product) => product !== null));
  };

  useEffect(() => {
    // Cargar los datos una vez al montar el componente
    fetchData();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const existingProducts = JSON.parse(localStorage.getItem('carrito')) || [];
      const updatedProducts = existingProducts.filter((product) => product.id !== productId);
      localStorage.setItem('carrito', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);

      const productDocRef = doc(db, "productos", productId);
      await deleteDoc(productDocRef);

      // Leer el carrito del localStorage nuevamente para verificar si está vacío
      const updatedCartData = localStorage.getItem('carrito');
      const updatedCartItems = JSON.parse(updatedCartData) || [];

      // Si el carrito está vacío, ocultar la tabla y el botón de comprarCarrito
      if (updatedCartItems.length === 0) {
        setShowTable(false);
      }
    } catch (error) {
      alert(`Error al eliminar el producto: ${error.message}`);
    }
  };

  // Estado para mostrar u ocultar la tabla y el botón de comprarCarrito
  const [showTable, setShowTable] = useState(cartItems.length > 0);

  return (
    <div className="info-compra-container">
      {showTable ? (
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
                  <SweetConfirmar
                    onConfirm={() => handleDeleteProduct(product.id)}
                    onCancel={() => {}}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay productos agregados al carrito.</p>
      )}

      {/* Mostrar el botón de comprarCarrito solo si showTable es true */}
      {showTable && <ComprarCarrito cartItems={cartItems} />}
    </div>
  );
};

export default InfoCompra;
