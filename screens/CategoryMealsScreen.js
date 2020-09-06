import React from "react";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaulText";
import { View, StyleSheet } from "react-native";

const CategoryMealScreen = props => {
  // we passed the id of the category
  const catId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector(state => state.meals.filteredMeals);

  // if catId is not available indexOf => -1
  // filter method return an Array therefore a FlatList is needed
  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length == 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No Meals Found</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

// navigationOptions as a function when the data is changing not static (CategoriesScreen)
CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam("categoryId");

  // matching the id we got with categories to find the selectedCategory
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: selectedCategory.title
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CategoryMealScreen;
