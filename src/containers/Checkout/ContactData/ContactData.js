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
        event.preventDefault();
        console.log('Ingredients:', this.props.ingredients);
        console.log('price :', this.props.price);

        this.setState({ isLoading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState({ isLoading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ isLoading: false });
            });
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
            <form>
                {
                    formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                        />
                    ))
                }
                <Button buttonType="Success" onClick={this.orderHandler}>ORDER</Button>
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