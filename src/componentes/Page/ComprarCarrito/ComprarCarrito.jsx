import React, { useState } from 'react';
import SweetCompra from '../../sweetAlert/SweetCompra';

const ComprarCarrito = ({ cartItems }) => {
    const [showSweetCompra, setShowSweetCompra] = useState(false);
    const handleComprar = () => {
        if (showSweetCompra) {
        return;
        }
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
