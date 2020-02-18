import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [new Ingredient("Cardamom", 1), new Ingredient("Tea", 2)]
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActionTypes
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT: {
      const index = action.payload.index;
      const update = action.payload.ingredient;

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[index] = update;

      return { ...state, ingredients: updatedIngredients };
    }
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (el, index) => index !== action.payload
        )
      };
    default:
      return state;
  }
}
