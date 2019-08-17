import React from 'react';
import styleClasses from "./Modal.module.css";

const modal = (props) => {
    return (
        <div className={styleClasses.Modal}>
            {props.children}
        </div>
    )
};

export default modal;