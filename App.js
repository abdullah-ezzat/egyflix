import "./ignoreWarnings";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./app/screens/login";
import RegiserScreen from "./app/screens/register";
import WelcomeScreen from "./app/screens/welcome";
import HomeScreen from "./app/screens/home";
import DetailsScreen from "./app/screens/details";
import VideoPlayScreen from "./app/screens/watch";
import colors from "./app/config/colors";
import SearchScreen from "./app/screens/search";
import ViewMoreScreen from "./app/screens/view";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: colors.dark },
      headerTintColor: "white",
      headerTitle: "Back",
    }}
  >
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={({ route }) => ({
        headerShown: true,
        headerTitle: route.params.title,
      })}
    />
    <Stack.Screen
      name="ViewMore"
      component={ViewMoreScreen}
      options={({ route }) => ({
        headerShown: true,
        headerTitle: route.params.title,
      })}
    />
    <Stack.Screen
      name="Play"
      component={VideoPlayScreen}
      options={({ route }) => ({
        headerShown: true,
        headerTitle: route.params.title,
      })}
    />
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{ headerShown: true, headerTitle: "Home" }}
    />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegiserScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
}
