import React from 'react';
import styleClasses from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
        <header className={styleClasses.Toolbar}>
            <DrawerToggle onDrawerToggleClick={props.onDrawerToggleClick} />
            <div className={styleClasses.Logo}>
                <Logo />
            </div>
            <nav className={styleClasses.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default toolbar;