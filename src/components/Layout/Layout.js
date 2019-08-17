import React from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styleClasses from './Layout.module.css';

const layout = props => (
    <Aux>
        <Toolbar />
        <main className={styleClasses.Content}>
            {props.children}
        </main>
    </Aux>
)

export default layout;