import Swal from 'sweetalert2';
import ItemCount from '../ItemCount/ItemCount'

const SweetCarrito = () => {
    return(
      Swal.fire(
          'Ingrese Cantidad a Agregar: ' ,
          '<h4 " >Producto: </h4> <br>' + 
              `<p style= "text-align: justify"><p/>`
      )
  )
}
export default SweetCarrito;