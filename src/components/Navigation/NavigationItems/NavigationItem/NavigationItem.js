import React from 'react';
import styleClasses from './NavigationItem.module.css';

const NavigationItem = (props) => {
    return (
        <li className={styleClasses.NavigationItem}>
            <a
                href={props.link}
                className={props.active ? styleClasses.active : null}>{props.children}</a>
        </li>
    );
};

export default NavigationItem;