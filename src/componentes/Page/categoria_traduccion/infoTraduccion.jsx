
 
 const infoTraduccion = (category) => {
    switch (category) {
        case 'electronics':
            return 'Electrónicos';
        case 'jewelery':
            return 'Joyería';
        case `men's clothing`:
            return 'Ropa masculina';
        case `women's clothing`:
            return 'Ropa femenina';
        default:
            return 'Articulo no identificado';
    }
}


export default infoTraduccion;