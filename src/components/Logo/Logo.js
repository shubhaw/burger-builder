import React from 'react';
import styleClasses from './Logo.module.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const Logo = (props) => (
    <div className={styleClasses.Logo}>
        <img src={burgerLogo} alt='BurgerBuilder' />
    </div>
);

export default Logo;