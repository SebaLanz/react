import React from 'react'

const Pagination = ({productsPerPage, totalProducts, currentPage, setCurrentPage}) => {
  const pageNumber = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    
  }



  return (
    <nav aria-label="Page navigation example mb.6">
    <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#">Anterior</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">Siguiente</a></li>
  </ul>
</nav>
  )
}
export default Pagination;