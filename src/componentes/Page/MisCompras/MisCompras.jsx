import React, { useEffect, useState } from 'react';
import './MisCompras.css';
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import GetProductById from '../GetProductById/GetProductById';
import GetPriceById from '../GetPriceById/GetPriceById';

const MisCompras = () => {
  const [purchaseItems, setPurchaseItems] = useState([]);

  const fetchData = async () => {
    
    const purchasesQuery = query(collection(db, "compras"));
    const purchasesSnapshot = await getDocs(purchasesQuery);

    const purchasesData = [];
    purchasesSnapshot.forEach((purchaseDoc) => {
      const purchase = purchaseDoc.data();

      
      const productsWithPrice = purchase.compras.map((product) => {
        return {
          id: product.id,
          cantidad: product.cantidad,
          price: product.price 
        };
      });

      purchasesData.push({ key: purchaseDoc.id, data: productsWithPrice });
    });

    setPurchaseItems(purchasesData);
  };

  useEffect(() => {
    
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
              let purchaseTotal = 0;

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
                        <li className="liCompras" key={product.id}>
                        <GetPriceById id_producto={product.id} />
                      </li>
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
