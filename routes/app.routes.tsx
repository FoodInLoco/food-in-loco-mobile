import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../src/pages/Home';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name='Dashboard' component={Home} />
  </Stack.Navigator>
);

export default AppRoutes;