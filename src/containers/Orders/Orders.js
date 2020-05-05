import React, { Component } from 'react'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../net/axio-orders'
import withErrorHandler from '../../hoc/withErrorHandler'

class Orders extends Component {

    state = {
        orders: [],
        loading: false
    }

    componentDidMount(){
        
        this.setState({loading: true});

        axios.get('createOrder.json')
        .then(response => {
            const fetchedOrders = [];
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }

            this.setState({loading: false, orders: fetchedOrders});
        })
        .catch(error => {
            console.log('Error:'+error);
            this.setState({loading: false});
        })
    }

    render() {

        let orders = (
            this.state.orders.map(order =>(
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}/>
            ))
        );

        if(this.state.loading){
            orders = <Spinner />
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);