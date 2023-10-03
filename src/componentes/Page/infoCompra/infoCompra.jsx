import GetProductById from "../GetProductById/GetProductById";
import './infoCompra.css'; 

const InfoCompra = () => {
    const cartData = localStorage.getItem('carrito');
    const cartItems = JSON.parse(cartData) || [];
  
    return (
    <div className="info-compra-container">
        <h3>Tu Carrito de Compras</h3>
        <div className="product-list">
          {cartItems.map((item) => (
            <div key={item.id} className="product-card">
              <GetProductById id_producto={item.id} /> {/* Usa GetProductById para obtener detalles */}
              <p>Cantidad: {item.cantidad}</p>
            </div>
          ))}
        </div>
    </div>
    );
  };
  
  export default InfoCompra;
  