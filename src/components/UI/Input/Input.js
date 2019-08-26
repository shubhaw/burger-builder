import React from 'react';
import styleClasses from './Input.module.css';

const Input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={styleClasses.InputElement} {...props.elementConfig} defaultValue={props.value} onChange={props.onChange} />
            break;
        case ('textarea'):
            inputElement = <textarea className={styleClasses.InputElement} {...props.elementConfig} defaultValue={props.value} onChange={props.onChange} />
            break;
        case ('select'):
            inputElement = (
                <select className={styleClasses.InputElement} onChange={props.onChange}>
                    {
                        props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                        ))
                    }
                </select>
            );
            break;
        default:
            inputElement = <input className={styleClasses.InputElement} {...props.elementConfig} defaultValue={props.value} onChange={props.onChange} />
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