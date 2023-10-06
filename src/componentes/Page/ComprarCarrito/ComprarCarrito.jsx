import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ComprarCarrito = ({ cartItems }) => {
  const [compraRealizada, setCompraRealizada] = useState(false);

  const handleComprar = () => {
    // Comprobar si la compra ya se realizó
    if (compraRealizada) {
      return;
    }

    // Generar un ID único para la compra
    const newCompraId = `compra_${Math.random().toString(36).substr(2, 9)}`;

    // Realizar otras acciones relacionadas con la compra aquí si es necesario

    // Limpiar el carrito actual (opcional)
    localStorage.removeItem('carrito');

    // Actualizar el estado para deshabilitar el botón
    setCompraRealizada(true);

    // Mostrar SweetAlert
    Swal.fire({
      title: 'Compra generada',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      // Recargar la página después de cerrar SweetAlert
      window.location.reload();
    });
  };

  return (
    <div>
      <button onClick={handleComprar} disabled={compraRealizada}>
        {compraRealizada ? 'Compra Realizada' : 'Comprar'}
      </button>
    </div>
  );
};

export default ComprarCarrito;
