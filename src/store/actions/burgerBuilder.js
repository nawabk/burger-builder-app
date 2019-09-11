import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    };
};

export const removeIngredient = (name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    };
};
export const setIngredient = (ingredients) =>{
      return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
      }
}

export const fetchIngredientsFailed =()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredient =() =>{
    return dispatch => {
        axios.get('https://react-my-burger-f7b2e.firebaseio.com/ingredients.json')
          .then(response =>{
               dispatch(setIngredient(response.data));
          }).catch(error=>{
              dispatch(fetchIngredientsFailed());
          })
    };
};