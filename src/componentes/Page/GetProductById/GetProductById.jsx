import React, { useEffect, useState } from 'react';
import './GetProductById.css';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const GetProductById = ({ id_producto }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id_producto) {
          return; // Salir si id_producto es undefined
        }

        const productRef = doc(db, "productos", id_producto);
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
          const productData = productDoc.data();
          setProduct(productData);
        } else {
          throw new Error('No se pudo encontrar el producto con el ID proporcionado');
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProduct();
  }, [id_producto]);

  return product ? (
    <div className='p_contenedor'>
      
      <img className='imgProducto' src={product.image} alt={product.title} />
      <p>{product.title}</p>
    </div>
  ) : null;
};

export default GetProductById;


