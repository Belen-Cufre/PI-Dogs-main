import React from "react";
import style from "./pagination.module.css"

const Pagination = ({dogsPerPage, dogs, pagination}) => {

    const pages = [];

    for (let i=0; i <= Math.floor(dogs/dogsPerPage); i++){
        pages.push(i+1)
    }

  return (
    <nav>
        <ul className={style.pagination}>
            {
            pages && pages.map(num => (
                <button className={style.number} key={num}>
                    <a onClick={() => pagination(num)}>{num}</a>

                </button>
            ))}
        </ul>
    </nav>
  );
}

export default Pagination;