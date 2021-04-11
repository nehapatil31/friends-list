import React from 'react';
import './searchbar.css';

const SearchBar = ({ searchedText, setSearchedText, sortFav }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-10">
          <input
            className="form-control"
            placeholder="Search friend..."
            onChange={(e) => {
              setSearchedText(e.target.value);
            }}
            value={searchedText}
          ></input>
        </div>
        <div className="col-2">
          <button className="btn" onClick={sortFav}>
            <i className="fab fa-gratipay"></i> Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
