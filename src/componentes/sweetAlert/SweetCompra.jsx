import   { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const SweetCompra = ({ compraId, onClose }) => {
  useEffect(() => {
    // Mostrar el modal de SweetAlert
    Swal.fire({
      title: 'Compra generada',
      text: `Su Código es: ${compraId}`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      // Una vez que se cierra el modal, ejecutar la función onClose
      if (result.isConfirmed) {
        onClose();
      }
    });
  }, [compraId,onClose]);

  return null;
};

export default SweetCompra;
