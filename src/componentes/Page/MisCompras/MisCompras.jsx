import React, { useEffect, useState } from 'react';
import './MisCompras.css';
import GetProductById from '../GetProductById/GetProductById';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const MisCompras = () => {
  const purchaseKeys = Object.keys(localStorage).filter(key => key !== 'carrito');
  const [purchaseItems, setPurchaseItems] = useState([]);

  const fetchData = async () => {
    const purchasePromises = purchaseKeys.map(async (key) => {
      const purchaseData = JSON.parse(localStorage.getItem(key));

      if (!purchaseData) {
        return null;
      }

      const productsWithPrices = await Promise.all(
        purchaseData.map(async (product) => {
          const productDocRef = doc(db, "productos", product.id);
          const productDocSnapshot = await getDoc(productDocRef);

          if (productDocSnapshot.exists()) {
            const productData = productDocSnapshot.data();
            return {
              ...product,
              price: productData.price, 
              image: productData.image // Agrego el precio e imagen de cada producto
            };
          } else {
            return product;
          }
        })
      );

      return { key, data: productsWithPrices };
    });

    const purchases = await Promise.all(purchasePromises);
    setPurchaseItems(purchases.filter((purchase) => purchase !== null));
  };

  useEffect(() => {
    // Cargar los datos una vez al montar el componente
    fetchData();
  }, []);

  return (
    <div className="info-compra-container">
      {purchaseItems.length > 0 ? (
  <table className="product-table">
    <thead className='trCol'>
      <tr >
        <th >Código</th>
        <th>Producto</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {purchaseItems.map((purchase) => {
        let purchaseTotal = 0; // Inicializa el total de compra

        return (
          <tr key={purchase.key}>
            <td>{purchase.key}</td>
            <td>
              <ul>
                {purchase.data.map((product) => {
                  const totalProducto = product.price * product.cantidad;
                  purchaseTotal += totalProducto; // Actualiza el total de compra
                  return (
                    <li className='liCompras' key={product.id}>
<                   img src={product.image} alt={`Imagen de ${product.name}`} />
                    </li>
                  );
                })}
              </ul>
            </td>
            <td>
              <ul>
                {purchase.data.map((product) => (
                  <li className='liCompras' key={product.id}>${product.price}</li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {purchase.data.map((product) => (
                  <li className='liCompras' key={product.id}>{product.cantidad}</li>
                ))}
              </ul>
            </td>
            <td>${purchaseTotal}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
) : (
  <p>No hay compras realizadas.</p>
)}
    </div>
  );
};

export default MisCompras;
    