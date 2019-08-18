import React from 'react';
import styleClasses from './DrawerToggle.module.css';

const DrawerToggle = (props) => {
    return (
        <div className={styleClasses.DrawerToggle} onClick={props.onDrawerToggleClick}>
            MENU
        </div>
    );
};

export default DrawerToggle;