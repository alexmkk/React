import React from 'react';
import './app-header.css';

const AppHeader = ({ allPosts, liked }) => {
    return (
        <div className="app-header d-flex">
            <h1>Alex Mikolyuk</h1>
            <h2>{allPosts} записей, из низ понравилось {liked}</h2>
        </div>
    )
}

export default AppHeader;