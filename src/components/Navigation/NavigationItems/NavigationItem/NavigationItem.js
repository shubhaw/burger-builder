import React from 'react';
import styleClasses from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
    return (
        <li className={styleClasses.NavigationItem}>
            <NavLink to={props.link} activeClassName={styleClasses.active} exact={props.exact}>
                {props.children}
            </NavLink>
        </li>
    );
};

export default NavigationItem;