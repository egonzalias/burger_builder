import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../net/axio-orders'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as actions from '../../store/actions/index'

const Orders = props => {

    const {onFetchOrders, userId, token} = props;
    useEffect(() => {
        onFetchOrders(userId, token);
    }, [onFetchOrders,userId,token])

    /*componentDidMount() {
        this.props.onFetchOrders(this.props.userId, this.props.token);
    }*/

    let orders = <Spinner />;
    if (!props.loading) {
        orders = props.orders.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price} />
        ))
    }

    return (
        <div>
            {orders}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        userId: state.auth.userId,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (userId, token) => dispatch(actions.fetchOrders(userId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));