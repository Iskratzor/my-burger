import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const addIngredient = (state, action) => {
  const updatedAddIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
  const updatedAddIngredients = updateObject(state.ingredients, updatedAddIngredient);
  const updatedAddState = {
    ingredients: updatedAddIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedAddState);
}

const removeIngredient = (state, action) => {
  const updatedRemIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
  const updatedRemIngredients = updateObject(state.ingredients, updatedRemIngredient);
  const updatedRemState = {
    ingredients: updatedRemIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedRemState);
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false,
    building: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT : return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT : return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED : return updateObject(state, {error: true});
    default : return state;
  }
}

export default reducer;