
import Swal from 'sweetalert2';

const sweetInfo = (category, description) => {
    return(
        Swal.fire(
            'Categoría: ' + category,
            '<h4 " >Información: </h4> <br>' + 
                `<p style= "text-align: justify">${description}<p/>`
        )
    )
}

export default sweetInfo;