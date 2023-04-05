/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
    LogBox,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { enableScreens } from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from "./pages/HomeScreen"
import LoginScreen from "./pages/LoginScreen"
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

enableScreens();
AppRegistry.registerComponent(appName, () => App);
LogBox.ignoreLogs(['']);


const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                  iconName = focused ? "home" : "home";
              } else if (route.name === "User") {
                  iconName = focused ? "user" : "user";
              }
              return <FontAwesome name={iconName as any} size={26} />
          },
      })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="User" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



export default App;
