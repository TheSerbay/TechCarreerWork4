import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const OrdersPage = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://northwind.vercel.app/api/orders');
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data: ' + error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const navigateToOrderDetail = (orderId) => {
    navigation.navigate('OrderDetailPage', { orderId });
  };

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <View>
          {orders.slice(0, 5).map(order => (
            <TouchableOpacity
              key={order.id}
              onPress={() => navigateToOrderDetail(order.id)}
            >
              <Text>Order ID: {order.id}</Text>
              <Text>Order Date: {new Date(order.orderDate).toLocaleString()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default OrdersPage;
