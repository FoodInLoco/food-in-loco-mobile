import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../src/pages/Home';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Dashboard" component={Home} />
  </AppStack.Navigator>
);

export default AppRoutes;