import React from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styleClasses from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = props => (
    <Aux>
        <Toolbar />
        <SideDrawer />
        <main className={styleClasses.Content}>
            {props.children}
        </main>
    </Aux>
)

export default layout;