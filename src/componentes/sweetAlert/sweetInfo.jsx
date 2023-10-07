
import Swal from 'sweetalert2';

const sweetInfo = (category, description, rate) => {
    
    const ratingStars = '<div class="swal2-rating">' +
        '<i class="fas fa-star" style="color: #ecf00a;"></i>'.repeat(rate) +
        '<i class="far fa-star" style="color: #ecf00a;"></i>'.repeat(6 - rate) +
        '</div>';
    Swal.fire({
        title: 'Categoría: ' + category,
        html: '<h4>Información:</h4><br>' +
            `<p style="text-align: justify">${description}</p>` +
            '<br>' + ratingStars
    });
}

export default sweetInfo;