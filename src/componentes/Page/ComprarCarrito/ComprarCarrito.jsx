
import React from 'react';
import SweetCompra from '../../sweetAlert/SweetCompra';
import {useState} from 'react';

const ComprarCarrito = ({ cartItems }) => {
    const [showSweetCompra, setShowSweetCompra] = useState(false);
    const [compraId, setCompraId] = useState(null);
  
    const handleComprar = () => {
        // Generar un ID único para la compra
        const newCompraId = `compra_${Math.random().toString(36).substr(2, 9)}`;
        setCompraId(newCompraId);
        const compraItems = [...cartItems];
        localStorage.setItem(newCompraId, JSON.stringify(compraItems));

        localStorage.removeItem('carrito');
        setShowSweetCompra(true);
    };
  
    const handleCloseSweetCompra = () => {
      // Ocultar el modal SweetCompra y limpiar el ID
      setShowSweetCompra(false);
      setCompraId(null);
    };
  
    return (
      <div>
        <button onClick={handleComprar}>Comprar</button>
        {showSweetCompra && (
          <SweetCompra compraId={compraId} onClose={handleCloseSweetCompra} />
        )}
      </div>
    );
  };
  
  export default ComprarCarrito;
