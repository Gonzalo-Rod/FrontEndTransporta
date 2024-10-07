import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import BottomTab from './components/Navigation/BottomTab';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Route from './screens/route';

export default function App() {

  const Stack = createNativeStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={BottomTab} />
      <Stack.Screen name="Route" component={Route} />
      </Stack.Navigator>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
