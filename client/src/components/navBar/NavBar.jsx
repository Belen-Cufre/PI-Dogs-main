import SearchBar from "../home/searchBar/Search";
import { Link } from "react-router-dom";

const Nav= ()=>{
    return(
        <nav>
            <button>
                <Link to="/home">Home</Link>
            </button>
            <hr />
            <button>
                <Link to="/createDogs">Create dogs</Link>
            </button>
            <hr />
            <button>
                <Link to="/funnyDogs">Just watch them and have fun</Link>
            </button>
            <hr />
        </nav>
    )
}

export default Nav;