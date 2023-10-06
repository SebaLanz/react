import React, { useEffect, useState } from 'react';
import './infoCompra.css';
import GetProductById from '../GetProductById/GetProductById';
import SweetConfirmar from '../../sweetAlert/SweetConfirmar';
import { db } from "../../../firebase/config";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

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
  }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar el componente

  const handleDeleteProduct = async (productId) => {
    try {
      const existingProducts = JSON.parse(localStorage.getItem('carrito')) || [];
      const updatedProducts = existingProducts.filter((product) => product.id !== productId);
      localStorage.setItem('carrito', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);

      const productDocRef = doc(db, "productos", productId);
      await deleteDoc(productDocRef);

      // Una vez eliminado el producto, vuelva a cargar los datos
      fetchData();
    } catch (error) {
      alert(`Error al eliminar el producto: ${error.message}`);
    }
  };


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
                <SweetConfirmar
                  onConfirm={() => handleDeleteProduct(product.id)}
                  onCancel={() => {}}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoCompra;
