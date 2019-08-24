import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Modal from "../../components/UI/Modal/Modal";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        isPurchasable: false,
        isPurchasing: false,
        isLoading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => (sum + el), 0);

        console.log('sum :', sum);
        this.setState({
            isPurchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] - 1;
        if (updatedCount < 0) {
            return;
        }
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice - priceDeduction;

        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => this.setState({ isPurchasing: true });

    purchaseCancelHandler = () => this.setState({ isPurchasing: false });

    purchaseContinuedHandler = () => {
        // alert('Purchase will be continued in next section of the course!');
        this.setState({ isLoading: true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Shubhaw',
                address: {
                    houseNo: 'G6',
                    buildingName: 'Pearl Celestial',
                    area: 'Kokapet',
                    city: 'Hyderabad',
                    pincode: '500075'
                },
                email: 'shubhawkumar@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ isLoading: false, isPurchasing: false });
            })
            .catch(error => {
                this.setState({ isLoading: false, isPurchasing: false });
            });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };

        for (const ingredient in disabledInfo) {
            disabledInfo[ingredient] = this.state.ingredients[ingredient] <= 0;
            console.log('ingredient:', ingredient, '| disabledInfo[ingredient] :', disabledInfo[ingredient]);

        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        isPurchasable={this.state.isPurchasable}
                        purchasing={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseContinued={this.purchaseContinuedHandler}
                purchaseCancelled={this.purchaseCancelHandler} />;
        }

        if (this.state.isLoading) {
            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);