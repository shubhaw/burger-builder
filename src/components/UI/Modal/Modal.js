import React from 'react';
import styleClasses from "./Modal.module.css";

const modal = (props) => {
    return (
        <div
            className={styleClasses.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'traslateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    )
};

export default modal;