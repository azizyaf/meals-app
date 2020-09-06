import React from "react";
import { Platform, Text } from "react-native";

import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScren from "../screens/FiltersScreen";

import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor
};

// createStackNavigator take 2 arguments the second is applied to all screens
const MealNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealScreen
    },
    MealDetail: {
      screen: MealDetailScreen
    }
  },
  { defaultNavigationOptions: defaultStackNavOptions, mode: "modal" }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
  },
  { defaultNavigationOptions: defaultStackNavOptions, mode: "modal" }
);

const tabScreenConfige = {
  // first tab is the stack
  Meals: {
    screen: MealNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name="ios-restaurant"
            size={25}
            // now the color = tabBarOptions
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ) : (
          "Meals"
        )
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name="ios-star"
            size={25}
            // now the color = tabBarOptions
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
        ) : (
          "Favorites"
        )
    }
  }
};

// Tabs
const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfige, {
        activeColor: "white",
        shifting: true
      })
    : createBottomTabNavigator(tabScreenConfige, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans"
          },
          activeTintColor: Colors.accentColor
        }
      });

// Filters
const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScren
  },
  { defaultNavigationOptions: defaultStackNavOptions, mode: "modal" }
);

// Drawer (Main)
const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals"
      }
    },
    Filters: FiltersNavigator
  },
  {
    drawerBackgroundColor:
      Platform.OS === "android" ? Colors.primaryColor : "white",
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold"
      }
    }
  }
);

// export MainNavigator since other stacks are nested inside it
export default createAppContainer(MainNavigator);
