import React, { useEffect, useState } from 'react';
import './GetProductById.css';
import { db } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const GetProductById = ({ id_producto }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDocRef = doc(db, "productos", id_producto);
        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
          const productData = productDocSnapshot.data();
          setProduct(productData);
        } else {
          console.warn('El producto no existe en la base de datos');
          // En lugar de lanzar un error, puedes establecer product en null o un valor predeterminado.
          // setProduct(null);
        }
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
  ) : (
    <div>
      <p>Producto no encontrado</p>
      {/* Puedes mostrar un mensaje o un componente alternativo cuando el producto no se encuentra */}
    </div>
  );
};

export default GetProductById;
