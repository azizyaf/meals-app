import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
};

// reducer is a function
const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    // when clicking Favorite icon
    case TOGGLE_FAVORITE /* 1- find the index of meal inside filterdMeals */:
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId
      );
      // if the meal is in favoriteMeals => delete it
      if (existingIndex >= 0) {
        /* 2- if it's 0 or bigger then delete it with splice() */
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals }; // state remain the same and favoriteMeals changes
      } else {
        // if the meal is not in favoriteMeals => find it in meal then add it
        const meal = state.meals.find(meal => meal.id === action.mealId);
        /* 3- if it's less than 0 then add meal with concat() */
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) }; // state remain the same and favoriteMeals changes
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter(meal => {
        // if gluten free switch is on and the meal do not contain glutenFree then this meal will be dropped
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactosFree) {
          return false;
        }
        if (appliedFilters.vegan && !meal.vegan) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: updatedFilteredMeals };
    default:
      return state;
  }
};

export default mealReducer;
