import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { bgColor, gap, generalFontSize, GlobalStyle, margin, padding, textColor, fontFamily, windowWidth, whiteColor } from '../../Styles/Theme'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { cartService } from '../../Services/cartService';
import StripePayment from '../../Components/Payment/StripePayment';
import AddressModal from '../../Components/AddressModal/AddressModal';
import { errorToast } from '../../Utils/toast';
import AddPhoneModal from '../../Components/AddPhoneModal/AddPhoneModal';
import { orderService } from '../../Services/orderService';
import { successToast } from '../../Utils/toast';

const Checkout = ({ navigation }) => {
  const [loading, setLoading] = useState()
  const [showModal, setShowModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [cartItems, setCartItems] = useState(data);
  const { data, totalPrice, discount, actualPrice } = useSelector((state) => state.cart);
  const authData = useSelector((state) => state.auth.data)
  const stripePaymentRef = useRef()
  const codeRef = useRef();
  const { handleSubmit, formState: { errors }, register, setValue } = useForm();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const togglePhoneModal = () => {
    setShowPhoneModal(!showPhoneModal);
  };

  const onSubmit = async (data) => { 
    const formData = new FormData()

    formData.append('code', data?.code ?? '');
    formData.append('amount', totalPrice);

    try {
      await cartService.applyVoucher(formData);
    } catch (error) {
      console.error('Discount apply failed:', error);
    }
  };

  useEffect(() => {
    cartService.getCart();
  }, [])

  useEffect(() => {
    setCartItems(data);
  }, [data])

  useEffect(() => {
    console.log('totalPrice', totalPrice)
  }, [totalPrice])

  useEffect(() => {
    console.log('discount', discount);
  }, [discount])

  const orderNow = () => {
    if (totalPrice > 0) {
      if (!authData?.phone) {
        errorToast('Please Provide Phone Number')
        togglePhoneModal()
      }
      else if (!authData?.address) {
        errorToast('Please Provide Address')
        toggleModal()
      }
      else {
        stripePaymentRef?.current?.initializePaymentSheet();
      }
    }
  }

  const emptyCart = async () => {
    await cartService.remove();
    successToast('Your Cart has been Empty')
  }

  const callback = async (payload) => {
    setLoading(true)
    await orderService.orderNow(payload);
    successToast('Your order is confirmed!');
    navigation.navigate('thankyou');
    await cartService.remove();
    setLoading(false)
  }

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={whiteColor} />
        </View>)
        : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={[GlobalStyle.container, padding('top', 30), padding('bottom', 100)]}>
                <Text style={styles.mainHeading}>Checkout</Text>
                <View style={styles.section}>
                  <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }]}>
                    <Text style={styles.heading}>My Cart</Text>
                  </View>

                  <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 20 }}
                    data={cartItems}
                    renderItem={({ item, index }) => (
                      <View style={[GlobalStyle.card, GlobalStyle.row, { gap: 20 }]}>
                        <Image style={styles.image} source={{ uri: item?.image }} />
                        <View style={{ flex: 1 }}>
                          <Text style={[GlobalStyle.orderMainText, { fontSize: generalFontSize - 2 }]}>{item?.name}</Text>
                          <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}><Text style={{ color: textColor }}>Quantity:</Text> {item?.quantity}</Text>
                          <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}><Text style={{ color: textColor }}>Price:</Text> ${(item.price * item.quantity).toFixed(2)}</Text>
                          <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}><Text style={{ color: textColor }}>Shipping Price:</Text> ${!item.shippingPrice ? 0 : item?.shippingPrice}</Text>
                          <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}><Text style={{ color: textColor }}>Total:</Text> ${(item.price * item.quantity) + Number(item?.shippingPrice)}</Text>
                          {/* <View style={[GlobalStyle.row, GlobalStyle.aic, gap(10), margin('top', 20)]}>
                      <View style={[GlobalStyle.row, GlobalStyle.aic, gap(10)]}>
                        <TouchableOpacity onPress={() => cartService.subtract(item)} style={[styles.quantityBtn]}>
                          <FontAwesomeIcon icon={faMinus} size={generalFontSize} color={textColor} />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{item?.quantity}</Text>
                        <TouchableOpacity onPress={() => cartService.addToCart(item)} style={styles.quantityBtn}>
                          <FontAwesomeIcon icon={faPlus} size={generalFontSize} color={textColor} />
                        </TouchableOpacity>
                      </View>
                    </View> */}
                        </View>
                      </View>
                    )}
                  />

                </View>
                <View style={styles.section}>
                  <View style={[GlobalStyle.row, GlobalStyle.aic, { gap: 20, marginBottom: 10, justifyContent: 'space-between' }]}>
                    <Text style={[styles.heading, margin('', 0)]}>Shipping Address</Text>
                    <TouchableOpacity onPress={toggleModal} style={[padding('horizontal', 20), padding("vertical", 5)]}>
                      <Text style={GlobalStyle.link}>Change</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[GlobalStyle.card, { gap: 10 }]}>
                    <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                      <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>Name: </Text>
                      <Text style={[GlobalStyle.orderMainText, { fontSize: generalFontSize - 2 }]}>{authData?.name}</Text>
                    </View>
                    <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                      <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>Address: </Text>
                      <Text style={[GlobalStyle.orderMainText, { fontSize: generalFontSize - 2, flex: 1, textAlign: 'right' }]}>
                        {(authData?.address) ? (`${authData?.address}, ${authData?.city}, ${authData?.state?.name}, ${authData?.country?.name}`) : 'No Address Found'}
                      </Text>
                    </View>
                    <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                      <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>Postal Code: </Text>
                      <Text style={[GlobalStyle.orderMainText, { fontSize: generalFontSize - 2 }]}>
                        {authData?.zip ? authData?.zip : "No Postal Code Provided"}
                      </Text>
                    </View>
                    <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                      <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>Number: </Text>
                      <Text style={[GlobalStyle.orderMainText, { fontSize: generalFontSize - 2 }]}>
                        {authData?.phone ? authData?.phone : "No Phone number Provided"}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={[GlobalStyle.row, GlobalStyle.aic, { gap: 20, marginBottom: 10, justifyContent: 'space-between' }]}>
                    <Text style={[styles.heading, margin('', 0)]}>Discount</Text>
                    {
                      ( discount === 0 ) &&
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={[padding('horizontal', 20), padding("vertical", 5)]}>
                          <Text style={GlobalStyle.link}>Apply</Text>
                        </TouchableOpacity>
                    }
                  </View>
                  <View style={[GlobalStyle.card, { gap: 10 }]}>
                    {
                      ( discount > 0 )
                        ?
                          <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>Discount: </Text>
                            <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>{discount}%</Text>
                          </View>
                        :
                          <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>Code: </Text>
                            <TextInput
                              style={GlobalStyle.inputFull}
                              placeholder='Enter Voucher Code'
                              placeholderTextColor={'#707070'}
                              keyboardType='default'
                              autoCapitalize='none'
                              returnKeyType="done"
                              defaultValue={''}
                              {...register("code", { required: 'Voucher code is required', value: discount ?? '' })}
                              ref={codeRef}
                              onChangeText={(value) => setValue('code', value)}
                            />
                          </View>
                    }
                    
                    { errors.code && <Text style={{ color: 'red', marginTop: 5, textAlign: 'right' }}>{errors.code.message}</Text> }
                  </View>
                </View>
                
                {/* <View style={styles.section}>
            <View style={[GlobalStyle.row, GlobalStyle.aic, { gap: 20, marginBottom: 10, justifyContent: 'space-between' }]}>
              <Text style={[styles.heading, margin('', 0)]}>Payment Method</Text>
              <TouchableOpacity onPress={() => navigation.navigate('paymentMethods')} style={[padding('horizontal', 20), padding("vertical", 5)]}>
                <Text style={GlobalStyle.link}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={[GlobalStyle.row, GlobalStyle.card, GlobalStyle.aic, { gap: 20, justifyContent: 'space-between' }]}>
              <Text style={[GlobalStyle.orderMainText, { fontSize: generalFontSize - 2 }]}>**** **** **** 1234</Text>
              <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>01/24</Text>
            </View>
          </View> */}
                {/* <View style={styles.section}>
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.heading, margin('', 0)]}>Discount Code</Text>
            </View>
            <View style={[GlobalStyle.card, { gap: 20 }]}>
              <TextInput
                style={GlobalStyle.input}
                placeholder={'Code'}
                placeholderTextColor={'#828282'}
                keyboardType='default'
              />
              <TouchableOpacity style={[GlobalStyle.themeBtn, margin('top', 0)]}>
                <Text style={[GlobalStyle.themeBtnText]}>
                  Apply Discount
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
                <View style={styles.section}>
                  <View style={{ marginBottom: 10 }}>
                    <Text style={[styles.heading, margin('', 0)]}>Total</Text>
                  </View>
                  <View style={[GlobalStyle.card, { gap: 10 }]}>
                    <View style={[GlobalStyle.row, GlobalStyle.aic, { gap: 20, justifyContent: 'space-between' }]}>
                      <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>Total Items: </Text>
                      <Text style={[GlobalStyle.orderMainText, { fontSize: generalFontSize - 2 }]}>{data.length}</Text>
                    </View>
                    <View style={[GlobalStyle.row, GlobalStyle.aic, { gap: 20, justifyContent: 'space-between' }]}>
                      <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>Actual Price: </Text>
                      <Text style={[GlobalStyle.orderMainText, { fontSize: generalFontSize - 2 }]}>
                        ${actualPrice?.toFixed(2)}
                      </Text>
                    </View>
                    <View style={[GlobalStyle.row, GlobalStyle.aic, { gap: 20, justifyContent: 'space-between' }]}>
                      <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>Total Price: </Text>
                      <Text style={[GlobalStyle.orderMainText, { fontSize: generalFontSize - 2 }]}>
                        ${totalPrice?.toFixed(2)}
                        {/* {calculateTotalPrice()} */}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <AddressModal modalIsVisible={showModal} closeModal={toggleModal} />
            <AddPhoneModal modalIsVisible={showPhoneModal} closeModal={togglePhoneModal} />
            <View style={{ position: 'absolute', bottom: 30, width: windowWidth - 40, left: 20 }}>
              <TouchableOpacity
                onPress={() => orderNow()} style={[GlobalStyle.themeBtn, margin('top', 10)]}
              >
                <Text style={[GlobalStyle.themeBtnText]}>
                  Order Now
                </Text>
              </TouchableOpacity>
              <StripePayment amount={totalPrice} ref={stripePaymentRef} callback={callback} />
            </View>
          </>
        )}
    </SafeAreaView>
  )
}

export default Checkout

const styles = StyleSheet.create({
  mainHeading: {
    fontFamily: 'FreightBigPro-Bold',
    fontSize: generalFontSize + 8,
    fontWeight: '900',
    marginBottom: 20,
    color: textColor
  },
  heading: {
    ...fontFamily('medium'),
    fontSize: generalFontSize,
    fontWeight: '900',
    marginBottom: 5,
    color: textColor
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    borderColor: textColor,
    borderWidth: 1
  },
  quantityBtn: {
    borderWidth: 1,
    borderColor: textColor,
    padding: 5,
    borderRadius: 5
  },
  quantity: {
    fontSize: generalFontSize - 4,
    color: textColor,
    ...fontFamily("medium"),
    lineHeight: 25
  },
  section: {
    borderTopColor: textColor,
    borderTopWidth: 1,
    marginTop: 10,
    paddingVertical: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})