import React from "react";
import { Link } from "react-router-dom";
import styles from "./landing.css";

const Landing= () => {
    return (
        <div className={styles.Landing}>
            <div className="letters">
            <h1>Wellcome to Dog's World</h1>
            </div>
            <div id="button">
             <Link to="/home">
                <button>Enter</button>
             </Link>
            </div>
        </div>
    );
}

export default Landing;