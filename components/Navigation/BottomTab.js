import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../../screens/home';
import Route from '../../screens/route';

const Tab = createBottomTabNavigator();

export default function BottomTab () {

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name = 'Home' component={Home} /> 
        </Tab.Navigator>
    );

}