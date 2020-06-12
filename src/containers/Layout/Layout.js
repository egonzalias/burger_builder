import React, { useState } from "react"
import { connect} from 'react-redux'

import Aux from '../../hoc/Auxiliar'
import Toolbar from '../../components/Navigation/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import './Layout.css'

 
const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerOpenedHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return(
        <Aux>
            <Toolbar 
                opened={sideDrawerOpenedHandler}
                isAuth={props.isAuthenticated}/>
            <SideDrawer 
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
                isAuth={props.isAuthenticated}/>
            <main className='Content'>
                {props.children}
            </main>
        </Aux>
    )
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);