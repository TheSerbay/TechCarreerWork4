import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersPage from './src/orders';
import OrderDetailPage from './src/ordersdetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OrdersPage">
        <Stack.Screen name="OrdersPage" component={OrdersPage} />
        <Stack.Screen name="OrderDetailPage" component={OrderDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
