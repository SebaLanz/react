import React, { useState } from 'react';
import SweetCompra from '../../sweetAlert/SweetCompra';
import "./ComprarCarrito.css";

const ComprarCarrito = ({ cartItems }) => {
  const [showSweetCompra, setShowSweetCompra] = useState(false);
  const [compraId, setCompraId] = useState(""); // Agrega el estado para compraId

  const handleComprar = () => {
    // Comprobar si la compra ya se realizó
    if (showSweetCompra) {
      return;
    }
    const nuevaCompraId = `compra_${Date.now()}`;
    localStorage.setItem(nuevaCompraId, JSON.stringify(cartItems));
    setCompraId(nuevaCompraId); // Actualiza el valor de compraId en el estado
    setShowSweetCompra(true);
    
  };

  const handleCloseSweetCompra = () => {
    setShowSweetCompra(false);
    localStorage.removeItem('carrito');
    window.location.reload();
  };

  return (
    <div>
      <button className='buy-button' onClick={handleComprar} disabled={showSweetCompra}>
        {showSweetCompra ? 'Compra Realizada' : 'CheckOut'}
      </button>
      {showSweetCompra && (
        <SweetCompra compraId={compraId} onClose={handleCloseSweetCompra} />
      )}
    </div>
  );
};

export default ComprarCarrito;
