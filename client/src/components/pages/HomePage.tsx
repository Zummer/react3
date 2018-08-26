import * as React from 'react';
import { Link } from 'react-router-dom';

/**
 * Домашняя страница
 */
const HomePage = () => (
    <div>
        <h1>Home page</h1>
        <button>Logout</button>
        <div>
            <Link to="/login">Login</Link>
        </div>
    </div>
);

export {HomePage};
