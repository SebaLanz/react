import React, { useState } from 'react';
import SweetCompra from '../../sweetAlert/SweetCompra';
import "./ComprarCarrito.css";

const ComprarCarrito = ({ cartItems }) => {
  const [showSweetCompra, setShowSweetCompra] = useState(false);

  const handleComprar = () => {
    // Comprobar si la compra ya se realizó
    if (showSweetCompra) {
      return;
    }
    const compraId = `compra_${Date.now()}`;
    localStorage.setItem(compraId, JSON.stringify(cartItems));
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
        {showSweetCompra ? 'Compra Realizada' : 'Comprar'}
      </button>
      {showSweetCompra && (
        <SweetCompra onClose={handleCloseSweetCompra} />
      )}
    </div>
  );
};

export default ComprarCarrito;
