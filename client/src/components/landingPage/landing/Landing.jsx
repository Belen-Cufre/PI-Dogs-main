import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.css";

const Landing= () => {
    return (
        <div className={styles.Landing}>
            <div>Wellcome to Dog's World</div>
            <Link to="/home">
                <button>Enter</button>
            </Link>
        </div>
    );
}

export default Landing;