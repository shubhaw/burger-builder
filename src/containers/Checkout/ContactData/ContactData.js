import React, { Component } from 'react';
import styleClasses from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postalCode" placeholder="Postal Code" />
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