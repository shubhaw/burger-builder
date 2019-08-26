import React from 'react';
import styleClasses from './Input.module.css';

const Input = (props) => {
    let inputElement = null;

    switch (props.inputtype) {
        case ('input'):
            inputElement = <input className={styleClasses.InputElement} {...props} />
            break;
        case ('textarea'):
            inputElement = <textarea className={styleClasses.InputElement} {...props} />
            break;
        default:
            inputElement = <input className={styleClasses.InputElement} {...props} />
            break;
    }
    return (
        <div className={styleClasses.Input}>
            <label className={styleClasses.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;