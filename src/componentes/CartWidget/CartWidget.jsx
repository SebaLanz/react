import React, { useEffect, useState } from 'react';
import cart from './assets/cart.svg';
import { Link } from 'react-router-dom';
import './CartWidget.css';

const CartWidget = () => {
  const [uniqueItemCount, setUniqueItemCount] = useState(0);

  useEffect(() => {
    // Obtener datos del localStorage
    const cartData = localStorage.getItem('carrito');

    // Si hay datos en el carrito, contar la cantidad de IDs únicas
    if (cartData) {
      const cartItems = JSON.parse(cartData);
      const uniqueIds = new Set(cartItems.map((item) => item.id));
      setUniqueItemCount(uniqueIds.size);
    } else {
      setUniqueItemCount(0);
    }
  }, []);

  return (
    <div>
      <Link to="/infoCompra">
        <img src={cart} alt="cart-widget" />
      </Link>
      {uniqueItemCount}
    </div>
  );
};

export default CartWidget;
