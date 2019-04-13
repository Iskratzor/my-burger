import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../SideDrawer/Menu/Menu';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <Menu clicked={props.clicked} />
        <Logo style={{height: '80%'}} />
        <NavigationItems isAuthenticated={props.isAuth} />
    </header>
);

export default toolbar;