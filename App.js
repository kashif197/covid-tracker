import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SimpleLineIcons } from '@expo/vector-icons'; 

import StartScreen from "./screens/StartScreen";
import CountryScreen from "./screens/CountryScreen";
import GlobalScreen from "./screens/GlobalScreen";
import ContinentScreen from "./screens/ContinentScreen";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Asia" component={ContinentScreen} initialParams={{ name: "asia" }} />
      <Tab.Screen name="Europe" component={ContinentScreen} initialParams={{ name: "europe" }} />
      <Tab.Screen name="Africa" component={ContinentScreen} initialParams={{ name: "africa" }} />
      <Tab.Screen name="Australia" component={ContinentScreen} initialParams={{ name: "australia" }} />
      <Tab.Screen name="Americas" component={ContinentScreen} initialParams={{ name: "america" }} />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={({navigation}) => ({
      headerLeft: () => <SimpleLineIcons name="menu" size={24} style={{paddingLeft: 7, marginTop: 5}} color="black" onPress={() => navigation.toggleDrawer()} />
    })}>
      <Stack.Screen name="COVID19 Tracker" component={StartScreen} options={{ headerTitleAlign: 'center'}} />
      <Stack.Screen name="Global Data" component={GlobalScreen} />
      <Stack.Screen name="Country Data" component={CountryScreen} />
      <Stack.Screen name="Continent Data" component={ContinentScreen} />
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Global" component={GlobalScreen} />
      <Drawer.Screen name="Continent" component={MyTabs} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

export default App;