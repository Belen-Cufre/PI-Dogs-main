import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const Nav= ()=>{
    return(
        <nav className={style.mainContainer}>
            <Link to="/home">
                <button className={style.home}>Home</button>
            </Link>

            <Link to="/createDogs">
                <button className={style.createDogs}>Create dogs</button>
            </Link>

{/* 
            <Link to="/funnyDogs">
                <button className={style.jwthf}>Enjoy them!</button>
            </Link> */}

        </nav>
    )
}

export default Nav;