import '../styles/Header.css';
import React from 'react';

const Header = () => {
    return (
        <header>
            <nav className="nav-bar">
                <img src="/src/images/logo.png" alt="RappiTours-Logo"/>
                <a href="/">RappiTours</a>
                <a href="/">Home</a>
            </nav>
        </header>
    )
}

export default Header;