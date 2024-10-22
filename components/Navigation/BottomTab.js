import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../../screens/home';
import ContactScreen from '../../screens/contact';


const Tab = createBottomTabNavigator();

export default function BottomTab () {

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name = 'Home' component={Home} /> 
            <Tab.Screen name = 'Contact' component={ContactScreen} /> 
        </Tab.Navigator>
    );

}