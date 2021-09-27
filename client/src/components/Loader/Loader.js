import React from 'react';

import './Loader.css';
import Logo from '../../assets/images/logo192.png';

const Loader = () => {
    return (
        <div className="loader">
            <img className="loader__image" alt="Loading Icon" src={Logo} />
            <span className="loader__text">Loading</span>
        </div>
    );
};

export default Loader;
