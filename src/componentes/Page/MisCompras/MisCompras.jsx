import React, { useEffect, useState } from 'react';
import './MisCompras.css';
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
          const productDocRef = doc(db, "productos", product.id.toString());
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
    <div className="test">
      {purchaseItems.length > 0 ? (
  <table className="table_compra">
    <thead class="thead-dark">
      <tr >
      <th className='tabla_th'>Código</th>
      <th className='tabla_th'>Producto</th>
      <th className='tabla_th'>Cantidad</th>
      <th className='tabla_th'>Precio</th>
      <th className='tabla_th'>Total de la Compra</th>
      </tr>
    </thead>
    <tbody>
      {purchaseItems.map((purchase) => {
        let purchaseTotal = 0; // Inicializa el total de compra

        return (
          <tr key={purchase.key}>
            <td className='td_test_id'> {purchase.key}</td>
            <td className='td_test_img'>
              <ul>
                {purchase.data.map((product) => {
                  const totalProducto = product.price * product.cantidad;
                  purchaseTotal += totalProducto; // Actualiza el total de compra
                  return (
                    <li className='liCompras' key={product.id}>
                        <img src={product.image} alt={`Imagen de ${product.name}`} />
                    </li>
                  );
                })}
              </ul>
            </td>
            <td>
              <ul>
                {purchase.data.map((product) => (
                  <li className='liCompras' key={product.id}>{product.cantidad}</li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {purchase.data.map((product) => (
                  <li className='liCompras' key={product.id}>${product.price}</li>
                ))}
              </ul>
            </td>
            <td style={{textAlign:'center', color:'green'}}>${purchaseTotal}</td>
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
    