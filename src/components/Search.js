import React from "react"

const Search = ({searchText, handleChange, handleClick}) => {
    return (
       <div className="search">
        <input type="text" name="search" value={searchText}
        onChange={handleChange}
        />
        <button onClick={handleClick}>Clear</button>
      </div>
    )
}

export default Search;