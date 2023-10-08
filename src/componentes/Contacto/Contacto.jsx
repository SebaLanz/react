import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SweetCompra from '../sweetAlert/SweetCompra';
import './Contacto.css';

const Contacto = () => {
  const { register, handleSubmit } = useForm();
  const [showSweetCompra, setShowSweetCompra] = useState(false);
  const [compraId, setCompraId] = useState('');

  const enviar = (data) => {
    const nuevaCompraId = `compra_${Date.now()}`;
    const carritoData = localStorage.getItem('carrito');
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
              {...register('nombre')}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Ingresá tu e-mail"
              {...register('email')}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="phone"
              placeholder="Ingresá tu teléfono"
              {...register('telefono')}
              className="form-input"
            />
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


