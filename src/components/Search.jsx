import React, { createContext, useContext, useState } from 'react'
import { useLocation } from 'react-router'
import { useSearchParams } from 'react-router-dom'


const Search = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const updateSearchQuery = (query) => {
        setSearchQuery(query);
    };

    return (
        <Search.Provider value={{ searchQuery, updateSearchQuery}}>
            {children}
        </Search.Provider>
    )

}

export const useSearch = () => {
    return useContext(Search);
}