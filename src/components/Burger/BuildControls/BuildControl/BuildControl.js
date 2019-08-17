import React from 'react';
import styleClasses from './BuildControl.module.css';

const buildControl = (props) => {
    return (
        <div className={styleClasses.BuildControl}>
            <div className={styleClasses.Label}>{props.label}</div>
            <button className={styleClasses.Less}>Less</button>
            <button className={styleClasses.More} onClick={props.added}>More</button>
            {/* <button className={styleClasses.More} onClick={() => props.added(props.type)}>More</button> */}
        </div>
    );
};

export default buildControl;