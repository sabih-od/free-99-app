import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../Constants';
import { orderService } from '../../../Services/orderService';
import { cartService } from '../../../Services/cartService';
import NotiModal from '../../NotiModal/NotiModal';
import { useNavigation } from '@react-navigation/native';
import { successToast } from '../../../Utils/toast';

const StripePayment = forwardRef(({ amount, callback }, ref) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  amount = amount?.toFixed()
  // Fetch payment sheet parameters from the server
  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(`${BASE_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch payment sheet params');
      }

      const responseJson = await response.json();
      const { paymentIntentId, paymentIntent, ephemeralKey, customer } = responseJson?.data;

      return { paymentIntentId, paymentIntent, ephemeralKey, customer };
    } catch (error) {
      console.error('Fetch payment sheet params error', error);
      throw error;
    }
  };

  // Initialize the payment sheet
  const initializePaymentSheet = async (data = null) => {
    setLoading(true);
    try {
      const { paymentIntentId, paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Free99US',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: { name: 'Jane Doe' },
      });

      if (!error) {
        await openPaymentSheet({ paymentIntentId, data });
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // Open the payment sheet
  const openPaymentSheet = async (payload) => {
    try {
      const { error } = await presentPaymentSheet();
      if (error) {
        console.error(`Error code: ${error.code}`, error.message);
      } else {
        callback(payload);
        // await orderService.orderNow(payload);
        // await cartService.remove();
        // successToast('Your order is confirmed!');
        // navigation.navigate('thankyou');
      }
    } catch (error) {
      console.error('Error presenting payment sheet', error);
    } finally {
      setLoading(false);
    }
  };

  // Expose the initializePaymentSheet method to parent components
  useImperativeHandle(ref, () => ({
    initializePaymentSheet,
  }));

  return <NotiModal title={'Loading'} modalIsVisible={loading} />;
});

export default StripePayment;
