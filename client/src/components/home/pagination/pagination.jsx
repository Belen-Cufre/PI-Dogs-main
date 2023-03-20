import React from "react";

const Pagination = ({dogsPerPage, dogs, pagination}) => {

    const pages = [];

    for (let i=0; i <= Math.floor(dogs/dogsPerPage); i++){
        pages.push(i+1)
    }

  return (
    <nav>
        <ul>
            {
            pages && pages.map(num => (
                <li key={num}>
                    <a onClick={() => pagination(num)}>{num}</a>

                </li>
            ))
            }
        </ul>
    </nav>
  )
}

export default Pagination;