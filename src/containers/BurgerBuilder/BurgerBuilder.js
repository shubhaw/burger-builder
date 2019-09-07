import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addIngredient, removeIngredient, initIngredients } from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import Modal from "../../components/UI/Modal/Modal";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// };

class BurgerBuilder extends Component {

    state = {
        // ingredients: null,
        // totalPrice: 4,
        // isPurchasable: false,
        isPurchasing: false
    }

    componentDidMount() {
        this.props.initIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => (sum + el), 0);

        console.log(sum);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const updatedCount = this.state.ingredients[type] + 1;
    //     const updatedIngredients = { ...this.state.ingredients };

    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const newPrice = this.state.totalPrice + priceAddition;

    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });

    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const updatedCount = this.state.ingredients[type] - 1;
    //     if (updatedCount < 0) {
    //         return;
    //     }
    //     const updatedIngredients = { ...this.state.ingredients };
    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const updatedPrice = this.state.totalPrice - priceDeduction;

    //     this.setState({
    //         totalPrice: updatedPrice,
    //         ingredients: updatedIngredients
    //     });

    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => this.setState({ isPurchasing: true });

    purchaseCancelHandler = () => this.setState({ isPurchasing: false });

    purchaseContinuedHandler = () => {
        this.setState({ isLoading: true });

        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }

        // queryParams.push('price=' + this.state.totalPrice);

        // const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout' //,
            // search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = { ...this.props.ingredients };

        for (const ingredient in disabledInfo) {
            disabledInfo[ingredient] = this.props.ingredients[ingredient] <= 0;
            console.log('ingredient:', ingredient, '| disabledInfo[ingredient] :', disabledInfo[ingredient]);

        }

        let orderSummary = null;
        let burger = this.props.isError ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        isPurchasable={this.updatePurchaseState(this.props.ingredients)}
                        purchasing={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.price}
                purchaseContinued={this.purchaseContinuedHandler}
                purchaseCancelled={this.purchaseCancelHandler} />;
        }

        return (
            <Aux>
                <Modal show={this.state.isPurchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice,
        isError: state.isError
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
        initIngredients: () => dispatch(initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));