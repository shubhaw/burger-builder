import React from 'react';
import styleClasses from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const SideDrawer = (props) => {
    return (
        <div className={styleClasses.SideDrawer}>
            <div className={styleClasses.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default SideDrawer;