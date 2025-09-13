import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../ui/auth/LoginScreen';
import SignupScreen from '../ui/auth/SignupScreen';
import HomeScreen from '../ui/farms/HomeScreen';
import FarmDetailScreen from '../ui/farms/FarmDetailScreen';
import ProfileScreen from '../ui/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator(){
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:true}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FarmDetail" component={FarmDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
