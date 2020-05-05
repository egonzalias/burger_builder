import React from 'react'

import './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliar'

const sideDrawer = (props) => {

    let styleSide = 'Close';

    if (props.open){
        styleSide = 'Open';
    }

    return (
        <Aux>
            <Backdrop 
                show={props.open}
                clicked={props.closed}/>
            <div className={['SideDrawer',styleSide].join(' ')}>
                <Logo height='11%'/>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
        
    )
}

export default sideDrawer;