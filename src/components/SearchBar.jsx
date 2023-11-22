import React from 'react'
import { useSearch } from './Search'

const SearchBar = () => {
    const { searchQuery, updateSearchQuery } = useSearch();

    const handleInputChange = (e) => {
        updateSearchQuery(e.target.value);
    }

    return (
        <div>
            <input
            type = "text"
            placeholder='검색어를 입력하세요'
            value={searchQuery}
            onChange={handleInputChange}
            />
        </div>
    )
}
export default SearchBar