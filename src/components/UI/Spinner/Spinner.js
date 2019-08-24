import React from 'react';
import styleClasses from './Spinner.module.css';

const Spinner = (props) => {
    return (
        <div className={styleClasses.Loader}>
            Loading . . .
        </div>
    );
};

export default Spinner;