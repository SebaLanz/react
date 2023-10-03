
import Swal from 'sweetalert2';

const SweetCarrito = (Cantidad, Titulo) => {
    return(
        Swal.fire(
            'Cantidad: ' + Cantidad,
            ' <br>' + 
            `<p style= "text-align: center">${Titulo}<p/>`,
            'success' 
        )
    )
}

export default SweetCarrito;