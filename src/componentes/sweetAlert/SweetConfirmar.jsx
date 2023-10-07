import React from 'react';
import Swal from 'sweetalert2';
import trashIcon from '../CartWidget/assets/trash.svg';
import './SweetDelete.css';

//Me permite eliminar el producto / cancelar la eliminación.
const SweetConfirmar = ({ onConfirm, onCancel }) => {
  const handleConfirm = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else {
        onCancel();
      }
    });
  };

  return (
    <button className="delete-button" onClick={handleConfirm}>
      {/* Agregar el ícono de eliminación aquí */}
      <img src={trashIcon} alt="Eliminar" />
    </button>
  );
};

export default SweetConfirmar;
