"use client"

import { useState } from "react"

const SearchInput = () => {
    const [ searchText, setsearchText] = useState("");

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            console.log('Enter key pressed!');
            setsearchText('')
          }
    }

    
  return (
    <input 
    onChange={(e) => setsearchText(e.target.value)}
    onKeyDown={handleKeyDown}
    value={searchText}
    className=' bg-[#435A6D] text-yellow-500 rounded-xl px-5 py-2 mt-2 w-[80%] focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1' type="text" name='search' placeholder='Search for প্রতারক' /> 
  )
}

export default SearchInput