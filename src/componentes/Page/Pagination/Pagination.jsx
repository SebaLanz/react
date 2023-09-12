import React from 'react';
import './Pagination.css';

const Pagination = ({ productsPerPage, totalProducts, currentPage, setCurrentPage }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumber.push(i);
  }

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSpecificPage = (param) => {
    setCurrentPage(param);
  };

  return (
    <nav aria-label="Page navigation" id='navig'>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" onClick={onPreviousPage} href="#">
            Anterior
          </a>
        </li>
        {pageNumber.map((noPage) => (
          <li
            key={noPage}
            className={`page-item ${noPage === currentPage ? 'active' : ''}`}
          >
            <a
              className="page-link"
              onClick={() => onSpecificPage(noPage)}
              href="#"
            >
              {noPage}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === Math.ceil(totalProducts / productsPerPage)
              ? 'disabled'
              : ''
          }`}
        >
          <a className="page-link" onClick={onNextPage} href="#">
            Siguiente
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
