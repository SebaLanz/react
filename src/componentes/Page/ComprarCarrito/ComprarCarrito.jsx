import React, { useState } from 'react';
import SweetCompra from '../../sweetAlert/SweetCompra';

const ComprarCarrito = ({ cartItems }) => {
  const [showSweetCompra, setShowSweetCompra] = useState(false);

  const handleComprar = () => {
    // Comprobar si la compra ya se realizó
    if (showSweetCompra) {
      return;
    }

    // Generar un identificador único para la compra (por ejemplo, un timestamp)
    const compraId = `compra_${Date.now()}`;

    // Guardar la compra en el localStorage con el identificador único
    localStorage.setItem(compraId, JSON.stringify(cartItems));

    // Mostrar SweetCompra al hacer clic en el botón de "Comprar"
    setShowSweetCompra(true);
  };

  const handleCloseSweetCompra = () => {
    setShowSweetCompra(false);
    localStorage.removeItem('carrito');
    window.location.reload();
  };

  return (
    <div>
      <button onClick={handleComprar} disabled={showSweetCompra}>
        {showSweetCompra ? 'Compra Realizada' : 'Comprar'}
      </button>
      {showSweetCompra && (
        <SweetCompra onClose={handleCloseSweetCompra} />
      )}
    </div>
  );
};

export default ComprarCarrito;
