import React from 'react'
import WriteList from './WriteList'
import { SearchProvider } from '../components/Search'
import SearchBar from '../components/SearchBar'

function FindFriend() {
  return (
    <div>
           <SearchProvider>
        <div>
          <SearchBar/>
        </div>
      </SearchProvider>
        <WriteList />
    </div>
  )
}

export default FindFriend