import { View, Text } from 'react-native'
import React from 'react'
import Login from '../Auth/Login';
import Welcome from '../Auth/Welcome';
import Register from '../Auth/Register';
import Dashboard from '../Customer/Dashboard/Dashboard';
import Customer from '../Customer/Customer';
import { createStackNavigator } from '@react-navigation/stack';
import Vendor from '../vendor/Vendor';
import ChangePassword from '../Auth/ChangePassword';
import ForgetPassword from '../Auth/ForgetPassword';

const AuthNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName='welcome'
    >
      <Stack.Screen name="welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="customer" component={Customer} options={{ headerShown: false }} />
      <Stack.Screen name="vendor" component={Vendor} options={{ headerShown: false }} />
      <Stack.Screen name="forgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
      <Stack.Screen name='changePass' component={ChangePassword} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default AuthNavigation