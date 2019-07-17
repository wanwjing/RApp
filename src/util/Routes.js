import { RecipeListScreen } from "../screen/RecipeListScreen";
import { RecipeAddScreen } from "../screen/RecipeAddScreen";
import { RecipeDetailScreen } from "../screen/RecipeDetailSceen";
import { createStackNavigator,createAppContainer } from "react-navigation";


export const RootStack = createStackNavigator(
    {
        RecipeListScreen: { screen: RecipeListScreen},
        RecipeAddScreen: { screen: RecipeAddScreen },
        RecipeDetailScreen: { screen: RecipeDetailScreen },
    },
    {
        initialRouteName: 'RecipeListScreen',
        navigationOptions: {
            gesturesEnabled: false
        }
    }
);

//make this component available to the app
  export const Routes =  createAppContainer(RootStack);;
