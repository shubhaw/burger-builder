import React, { Component } from 'react';
import styleClasses from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: 'Kokapet'
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        isLoading: false
    }

    orderHandler = (event) => {
        console.log('OrderHandler Called!!!');
        
        event.preventDefault();
        
        this.setState({ isLoading: true });
        let orderDetails = {};
        for(let formElementName in this.state.orderForm) {
            orderDetails[formElementName] = this.state.orderForm[formElementName].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderDetails: orderDetails
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ isLoading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ isLoading: false });
            });
    }

    inputChangeHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        const updatedForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;

        updatedForm[inputIdentifier] = updatedFormElement;

        this.setState( {
            orderForm: updatedForm
        })

    }

    render() {

        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            onChange={(event) => this.inputChangeHandler(event, formElement.id)}
                        />
                    ))
                }
                <Button buttonType="Success">ORDER</Button>
            </form>);
        if (this.state.isLoading) {
            form = <Spinner />
        }
        return (
            <div className={styleClasses.ContactData}>
                <h4>Enter you contact details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;