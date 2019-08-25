import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders: [],
        isLoading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                console.log(res);
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState( {
                    isLoading: false,
                    orders: fetchedOrders
                });
            })
            .catch(error => {
                this.setState( {
                    isLoading: false
                });
            });
    }

    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }

}

export default withErrorHandler(Orders, axios);