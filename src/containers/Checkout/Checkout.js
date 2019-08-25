import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        }
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-details')
    }

    // componentDidMount() {
    //     console.log(this.props);
    //     const query = new URLSearchParams(this.props.location.search);
    //     console.log('query.get("ingredients") :', query.get('ingredients').toString());
        
    // }
    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancel = {this.checkoutCancelHandler}
                    onCheckoutContinue={this.checkoutContinueHandler}
                    />
            </div>
        );
    }
}

export default Checkout;