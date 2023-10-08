import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./ComprarCarrito.css";

const ComprarCarrito = () => {
  const navigate = useNavigate(); 

  const handleComprar = () => {
    navigate('/Contacto');
  };

  return (  
    <div>
      <button className='buy-button' onClick={handleComprar}>
        CheckOut
      </button>
    </div>
  );
};

export default ComprarCarrito;

