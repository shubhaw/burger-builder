import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    // state = {
    //     ingredients: {
    //         salad: 0,
    //         bacon: 0,
    //         cheese: 0,
    //         meat: 0
    //     },
    //     totalPrice: 0
    // }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    // componentDidMount() {
    //     console.log(this.props);
    //     const query = new URLSearchParams(this.props.location.search);

    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = +param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }

    //     //console.log('ingredients :', ingredients);
    //     // this.setState({ ingredients: ingredients, totalPrice: price });

    // }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            const currentPurchaseState = this.props.isPurchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {currentPurchaseState}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        onCheckoutCancel={this.checkoutCancelHandler}
                        onCheckoutContinue={this.checkoutContinueHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    // render={() => (
                    //     <ContactData ingredients={this.props.ingredients} price={this.props.totalPrice} {...this.props} />
                    // )}
                    />
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        isPurchased: state.order.isPurchased
    };
}


export default connect(mapStateToProps)(Checkout);