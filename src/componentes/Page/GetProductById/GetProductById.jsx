import React, { useEffect, useState } from 'react';
import './GetProductById.css';

const GetProductById = ({ id_producto }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let apiUrl = `https://fakestoreapi.com/products/${id_producto}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('No se pudo obtener la información del producto');
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProduct();
  }, [id_producto]);

  return product ? (
    <div>
      <p>{product.title}</p>
      
      <img className='imgProducto' src={product.image} alt={product.title} />
      
    </div>
  ) : null;
};

export default GetProductById;

