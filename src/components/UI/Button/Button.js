import React from 'react';
import styleClasses from './Button.module.css';

const button = (props) => {
    return (
        <div 
            className={[styleClasses.Button, styleClasses[props.buttonType]].join(' ')}
            onClick={props.onClick}>
            {props.children}
        </div>
    );
};

export default button;