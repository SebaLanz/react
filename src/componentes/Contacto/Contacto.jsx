import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'; // Importa SweetAlert
import SweetCompra from '../sweetAlert/SweetCompra';
import './Contacto.css';

const Contacto = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showSweetCompra, setShowSweetCompra] = useState(false);
  const [compraId, setCompraId] = useState('');

  const enviar = (data) => {
    const carritoData = localStorage.getItem('carrito');
    
    // Validar que los campos de nombre, email y teléfono no estén vacíos
    if (!data.nombre || !data.email || !data.telefono) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos antes de finalizar la compra.'
      });
      return; // No se realiza la compra
    }

    // Verificar si no existe la clave 'carrito' en el localStorage o si está vacía
    if (!carritoData || carritoData === '[]') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay productos en el carrito para realizar la compra.'
      });
      return; // No se realiza la compra
    }

    const nuevaCompraId = `compra_${Date.now()}`;
    const carritoItems = JSON.parse(carritoData) || [];

    // Crear un array para almacenar los objetos de compra
    const compras = [];

    carritoItems.forEach((item) => {
      const productId = item.id;
      const cantidad = item.cantidad;

      // Crear un objeto que represente la compra del producto
      const compraProducto = {
        id: productId,
        cantidad: cantidad,
      };

      // Agregar la compra del producto al array de compras
      compras.push(compraProducto);
    });

    // Guardar el array de compras en el localStorage usando nuevaCompraId como clave
    localStorage.setItem(nuevaCompraId, JSON.stringify(compras));

    setCompraId(nuevaCompraId);
    setShowSweetCompra(true);

    // Eliminar la clave 'carrito' del localStorage
    localStorage.removeItem('carrito');
  };

  const handleCloseSweetCompra = () => {
    setShowSweetCompra(false);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="form-title">Contacto</h1>
        <form className="formulario" onSubmit={handleSubmit(enviar)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Ingresá tu nombre"
              {...register('nombre', { required: true })}
              className="form-input"
            />
            {errors.nombre && <span className="error-message">Campo obligatorio</span>}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Ingresá tu e-mail"
              {...register('email', { required: true })}
              className="form-input"
            />
            {errors.email && <span className="error-message">Campo obligatorio</span>}
          </div>
          <div className="form-group">
            <input
              type="phone"
              placeholder="Ingresá tu teléfono"
              {...register('telefono', { required: true })}
              className="form-input"
            />
            {errors.telefono && <span className="error-message">Campo obligatorio</span>}
          </div>
          <button className="form-button" type="submit">
            Finalizar Compra
          </button>
        </form>
      </div>

      {showSweetCompra && (
        <SweetCompra compraId={compraId} onClose={handleCloseSweetCompra} />
      )}
    </div>
  );
};

export default Contacto;


