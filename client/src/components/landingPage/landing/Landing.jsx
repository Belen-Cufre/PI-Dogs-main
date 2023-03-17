import React from "react";
import { Link } from "react-router-dom";

const Landing= () => {
    return (
        <div>
            <div>Wellcome to this Dog's World</div>
            <Link to="/home">
                <button>Enter</button>
            </Link>
        </div>
    );
}

export default Landing;