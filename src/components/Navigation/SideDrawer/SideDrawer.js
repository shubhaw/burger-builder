import React from 'react';
import styleClasses from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} click={props.onClosed} />
            <div className={[styleClasses.SideDrawer, props.show? styleClasses.Open: styleClasses.Close].join(' ')}>
                <div className={styleClasses.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;