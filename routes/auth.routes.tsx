import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../src/pages/SignIn';
import SignUp from '../src/pages/SignUp';

const Stack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Stack.Navigator initialRouteName='SignIn'>
    <Stack.Screen name='SignIn' component={SignIn} />
    <Stack.Screen name='SignUp' component={SignUp} />
  </Stack.Navigator>
);

export default AuthRoutes;