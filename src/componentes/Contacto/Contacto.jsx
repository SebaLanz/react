import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SweetCompra from '../sweetAlert/SweetCompra';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './Contacto.css';

const Contacto = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showSweetCompra, setShowSweetCompra] = useState(false);
  const [compraId, setCompraId] = useState('');

  const enviar = async (data) => {
    const carritoData = localStorage.getItem('carrito');

    // Válido que los campos de nombre, email y teléfono no estén vacíos
    if (!data.nombre || !data.email || !data.telefono) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos antes de finalizar la compra.'
      });
      return; // No realizo la compra
    }

    // Verificar si no existe la clave 'carrito' en el localStorage o si está vacía
    if (!carritoData || carritoData === '[]') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay productos en el carrito para realizar la compra.'
      });
      return; // No realizo la compra
    }

    // Creo un array para almacenar los objetos de compra
    const compras = [];

    const carritoItems = JSON.parse(carritoData);

    carritoItems.forEach((item) => {
      const productId = item.id;
      const cantidad = item.cantidad;
      

      // Creo un objeto que represente la compra del producto
      const compraProducto = {
        id: productId,
        cantidad: cantidad,
        
      };

      // Agrego la compra del producto al array de compras
      compras.push(compraProducto);
    });

    // Guardar la compra en Firebase
    try {
      const docRef = await addDoc(collection(db, 'compras'), {
        compras: compras,
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono
      });

      setCompraId(docRef.id);
      setShowSweetCompra(true);

      // Elimino la clave 'carrito' del localStorage
      localStorage.removeItem('carrito');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar la compra en Firebase',
        text: error.message
      });
    }
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
