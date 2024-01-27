// OrderDetailPage.js

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const OrderDetailPage = ({ route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`https://northwind.vercel.app/api/orders/${orderId}`);
        setOrderDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data: ' + error.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <View>
          <Text>Order ID: {orderDetails.id}</Text>
          <Text>Customer ID: {orderDetails.customerID}</Text>
          <Text>Order Date: {new Date(orderDetails.orderDate).toLocaleString()}</Text>
          <Text>Required Date: {new Date(orderDetails.requiredDate).toLocaleString()}</Text>
          <Text>Shipped Date: {orderDetails.shippedDate ? new Date(orderDetails.shippedDate).toLocaleString() : 'Not Shipped'}</Text>
          <Text>Ship Via: {orderDetails.shipVia}</Text>
          <Text>Ship Name: {orderDetails.shipName}</Text>
          
        </View>
      )}
    </View>
  );
};

export default OrderDetailPage;
