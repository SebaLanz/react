
import Swal from 'sweetalert2';

const CarritoLocal = (Cantidad, Titulo) => {
    return(
        Swal.fire(
            'Cantidad: ' + Cantidad,
            '<h4 " >Información: </h4> <br>' + 
                `<p style= "text-align: justify">${Titulo}<p/>`
        )
    )
}

export default CarritoLocal;