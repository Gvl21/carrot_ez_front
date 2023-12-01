import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');


  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /*추가된 코드*/
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  }


  const handleSearch = () => {
    onSearch(selectedArea, selectedCategory, searchTerm);
  };

  /* 엔터 키 누르면 검색되는 로직 */ 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="search-bar-container">
      <div className='dropdown'>
        <label>지역 선택</label>
        <select
          id='area'
          onChange={handleAreaChange}
          value={selectedArea}
        >
         <option value=''>선택하세요</option>
                        <option value='seoul'>서울특별시</option>
                        <option value='incheon'>인천광역시</option>
                        <option value='gyeongi'>경기도</option>
                        <option value='gangwon'>강원도</option>
                        <option value='chungcheong'>충청도</option>
                        <option value='sejong'>세종특별시</option>
                        <option value='daejeon'>대전광역시</option>
                        <option value='jeonra'>전라도</option>
                        <option value='gwangju'>광주광역시</option>
                        <option value='daegu'>대구광역시</option>
                        <option value='ulsan'>울산광역시</option>
                        <option value='gyeongsang'>경상도</option>
                        <option value='busan'>부산광역시</option>
                        <option value='jeju'>제주특별시</option>
        </select>
        <label>카테고리 선택</label>
        <select
          id='category'
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option value=''>선택하세요</option>
          <option value='sports'>운동</option>
          <option value='culture'>문화생활</option>
          <option value='fstvl'>축제/공연</option>
          <option value='game'>게임</option>
          <option value='etc'>자유주제</option>
        </select>
      </div>
      <div className='search-input'>
        <input
          className='searchbar'
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch} className='searchbutton'>검색</button>
      </div>
    </div>
  );
};

export default SearchBar;