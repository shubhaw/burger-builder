import React from 'react';
import styleClasses from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

const toolbar = (props) => {
    return (
        <header className={styleClasses.Toolbar}>
            <div>MENU</div>
            <Logo />
            <nav>
                ...
            </nav>
        </header>
    );
};

export default toolbar;