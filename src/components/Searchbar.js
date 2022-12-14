import React from 'react'
import Searchicon from "../assets/icons/search.svg"

function Searchbar() {
  return (
    <div className='searchBar'>
        <img src={Searchicon} width={16} alt="search_icon" />
        <input placeholder='Search in Admin panel' type="text" />
    </div>
   
  )
}

export default Searchbar