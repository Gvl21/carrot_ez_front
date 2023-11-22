import React from 'react'
import { useSearch } from './Search'

const SearchBar = () => {
    const { searchQuery, updateSearchQuery } = useSearch();

    const handleInputChange = (e) => {
        updateSearchQuery(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('검색어: ${searchQuery}');
    }

    return (
        <div>
            <input
            type = "text"
            placeholder='검색어를 입력하세요'
            value={searchQuery}
            onChange={handleInputChange}
            />
            <button type="submit">검색</button>
        </div>
    )
}
export default SearchBar