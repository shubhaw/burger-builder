import React, { Component } from "react";
import { connect } from 'react-redux';
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {

    state = {
        orders: [],
        isLoading: true
    }

    componentDidMount() {
        this.props.fetchOrders();
    }
    // componentDidMount() {
    //     axios.get('/orders.json')
    //         .then(res => {
    //             console.log(res);
    //             const fetchedOrders = [];
    //             for (let key in res.data) {
    //                 fetchedOrders.push({
    //                     ...res.data[key],
    //                     id: key
    //                 });
    //             }
    //             this.setState({
    //                 isLoading: false,
    //                 orders: fetchedOrders
    //             });
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 isLoading: false
    //             });
    //         });
    // }

    render() {
        const spinner = this.props.isLoading ? <Spinner /> : null;
        return (
            <div>
                {spinner}
                {this.props.orders.map(order => {
                    return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                })}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        isLoading: state.order.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));