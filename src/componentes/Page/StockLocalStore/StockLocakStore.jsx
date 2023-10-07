import React, { useEffect, useState } from 'react';

const StockLocalStore = () => {
  const [cantidadVendida, setCantidadVendida] = useState({});

  useEffect(() => {
    // Obtener las claves del localStorage que no contienen "carrito"
    const keys = Object.keys(localStorage).filter((key) => !key.includes('carrito'));

    // Inicializar un objeto para almacenar la cantidad vendida por producto
    const cantidadVendidaPorProducto = {};

    // Recorrer las claves y obtener la cantidad vendida de cada una
    keys.forEach((key) => {
      const ordenCompra = JSON.parse(localStorage.getItem(key));
      if (Array.isArray(ordenCompra)) {
        ordenCompra.forEach((item) => {
          const productId = item.id;
          const quantity = item.cantidad;
          if (cantidadVendidaPorProducto[productId]) {
            cantidadVendidaPorProducto[productId] += quantity;
          } else {
            cantidadVendidaPorProducto[productId] = quantity;
          }
        });
      }
    });

    setCantidadVendida(cantidadVendidaPorProducto);
  }, []); // Asegúrate de que esto esté vacío para que se ejecute una vez al montar el componente

  // Retornar la cantidadVendida como un valor para que se pueda usar en otros componentes
  return cantidadVendida;
};

export default StockLocalStore;
