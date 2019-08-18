import React, { Component } from 'react';
import Aux from '../Aux/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import styleClasses from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        isSideDrawerVisible: false
    }

    sideDrawerClosedHandler = () => this.setState({ isSideDrawerVisible: false });
    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return {isSideDrawerVisible: !prevState.isSideDrawerVisible}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar onDrawerToggleClick={this.sideDrawerToggleHandler} />
                <SideDrawer
                    show={this.state.isSideDrawerVisible}
                    onClosed={this.sideDrawerClosedHandler} />
                <main className={styleClasses.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;