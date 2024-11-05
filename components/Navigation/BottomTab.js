import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../../screens/home';
import ContactScreen from '../../screens/contact';
import UserProfile from '../../screens/profile';
import Reservations from '../../screens/reservation';


const Tab = createBottomTabNavigator();

export default function BottomTab () {

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name = 'Home' component={Home} /> 
            <Tab.Screen name = 'Reservations' component={Reservations} />
            <Tab.Screen name = 'Contact' component={ContactScreen} /> 
            <Tab.Screen name = 'UserProfile' component={UserProfile} />
        </Tab.Navigator>
    );

}