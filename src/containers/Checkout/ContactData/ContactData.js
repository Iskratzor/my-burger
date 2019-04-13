import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity, elementSettings } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: elementSettings('input', {type: 'text', placeholder: 'Your name'}, '', {required: true}),
      street: elementSettings('input', {type: 'text', placeholder: 'Your street'}, '', {required: true}),
      zipCode: elementSettings('input', {type: 'text', placeholder: 'ZIP Code'}, '', {required: true, minLength: 5, maxLength: 5, isNumeric: true}),
      email: elementSettings('input', {type: 'email', placeholder: 'Your email'}, '', {required: true, isEmail: true}),
      deliveryMethod: elementSettings('select', {options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'cheapest', displayValue: 'Cheapest'}]}, 'fastest'),
    },
    formIsValid: false
  }

  orderHandler = e => {
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token);
    e.preventDefault();
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      valid: this.state.orderForm[inputIdentifier].validation ? checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation) : true,
      touched: true
    });
    const updatedOrderForm = updateObject(this.state.orderForm, {[inputIdentifier]: updatedFormElement});
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid}
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios)));