import React from 'react';
import styleClasses from './Toolbar.module.css';

const toolbar = (props) => {
    return (
        <header className={styleClasses.Toolbar}>
            <div>MENU</div>
            <div>LOGO</div>
            <nav>
                ...
            </nav>
        </header>
    );
};

export default toolbar;