import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar-container">
      <input
        className='searchbar'
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch} className='searchbutton'>검색</button>
    </div>
  );
};

export default SearchBar;