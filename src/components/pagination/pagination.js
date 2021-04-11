import React from 'react';
import './pagination.css';

const Pagination = ({friendsPerPage, totalFriends, paginate, currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalFriends / friendsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={'page-item' + (currentPage === number ? ' active' : '')}
          >
            <div onClick={() => paginate(number)} className="page-link">
              {number}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
