import React, { useEffect, useState } from 'react';
import './MisCompras.css';
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import GetProductById from '../GetProductById/GetProductById';

const MisCompras = () => {
  const [purchaseItems, setPurchaseItems] = useState([]);

  const fetchData = async () => {
    // Realiza una consulta a Firebase para obtener todas las compras
    const purchasesQuery = query(collection(db, "compras"));
    const purchasesSnapshot = await getDocs(purchasesQuery);

    const purchasesData = [];
    purchasesSnapshot.forEach((purchaseDoc) => {
      const purchase = purchaseDoc.data();

      // Obtén la información de precio de cada producto
      const productsWithPrice = purchase.compras.map((product) => {
        return {
          id: product.id,
          cantidad: product.cantidad,
          price: product.price // Añade el precio desde la base de datos
        };
      });

      purchasesData.push({ key: purchaseDoc.id, data: productsWithPrice });
    });

    setPurchaseItems(purchasesData);
  };

  useEffect(() => {
    // Cargar los datos una vez al montar el componente
    fetchData();
  }, []);

  return (
    <div className="test">
      {purchaseItems.length > 0 ? (
        <table className="table_compra">
          <thead className="thead-dark">
            <tr>
              <th className="tabla_th">Código</th>
              <th className="tabla_th">Producto</th>
              <th className="tabla_th">Cantidad</th>
              <th className="tabla_th">Precio</th>
              <th className="tabla_th">Total de la Compra</th>
            </tr>
          </thead>
          <tbody>
            {purchaseItems.map((purchase) => {
              let purchaseTotal = 0; // Inicializa el total de compra

              return (
                <tr key={purchase.key}>
                  <td className="td_test_id"> {purchase.key}</td>
                  <td className="td_test_img">
                    <ul>
                      {purchase.data.map((product) => (
                        <li className="liCompras" key={product.id}>
                          <GetProductById id_producto={product.id} />
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {purchase.data.map((product) => (
                        <li className="liCompras" key={product.id}>{product.cantidad}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {purchase.data.map((product) => (
                        <li className="liCompras" key={product.id}>${product.price}</li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ textAlign: 'center', color: 'green' }}>${purchaseTotal}</td>
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
