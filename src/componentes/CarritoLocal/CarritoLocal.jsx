const CarritoLocal = (cantidad, id_producto) => {
    // Obtiene la lista actual de productos del localStorage
    const existingProducts = JSON.parse(localStorage.getItem('carrito')) || [];
  
    // Busca si ya existe un producto con el mismo ID en la lista
    const existingProduct = existingProducts.find((product) => product.id === id_producto);
  
    if (existingProduct) {
      // Si el producto ya existe, actualiza la cantidad
      existingProduct.cantidad += cantidad;
    } else {
      // Si el producto no existe, agrega uno nuevo
      existingProducts.push({ id: id_producto, cantidad });
    }
  
    // Almacena la lista actualizada en el localStorage
    localStorage.setItem('carrito', JSON.stringify(existingProducts));
    
  };
  
  export default CarritoLocal;
  