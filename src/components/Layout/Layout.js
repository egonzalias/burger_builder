import React, { Component } from "react"

import Aux from '../../hoc/Auxiliar'
import Toolbar from '../../components/Navigation/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import './Layout.css'

 
class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerOpenedHandler = () => {
        this.setState((prevState) =>{
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render (){
        return(
            <Aux>
                <Toolbar opened={this.sideDrawerOpenedHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className='Content'>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
} 

export default Layout;