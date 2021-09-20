import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="home__header">Welcome to Chat Messenger</div>
            <Link to='/login'>
                <button className="home__button">Login</button>
            </Link>
        </div>
    )
}

export default Home;
