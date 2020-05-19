import React from 'react'

import './Toolbar.css'
import Logo from '../Logo/Logo'
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import DrawerToggle from '../Navigation/SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className='Toolbar'>
        <DrawerToggle clicked={props.opened}/>
        <Logo height='80%'/>
        <nav className='DesktopOnly'>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
    </header>

)

export default toolbar;