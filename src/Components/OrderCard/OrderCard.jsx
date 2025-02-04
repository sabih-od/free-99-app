// Required Imports
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faDollarSign,
  faFileInvoiceDollar,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import {
  generalFontSize,
  GlobalStyle,
  itemBg,
  minTextColor,
  textColor,
  fontFamily,
  whiteColor,
  gap,
} from '../../Styles/Theme';
import CustomSelect from '../CustomSelect/CustomSelect';
import {useNavigation} from '@react-navigation/native';
import {AddReviewModal, ReviewModal} from '../ReviewModal/ReviewModal';
import moment from 'moment';
import AddReview from '../AddReview/AddReview';

// Order Card Component
const OrderCard = ({isReview, review, addReview, item}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [addIsVisible, setAddIsVisible] = useState(false);
  const [product, setProduct] = useState(item?.product);
  const [modalVisible, setModalVisible] = useState();
  const closeModal = () => {
    setIsVisible(!isVisible);
  };
  const closeAddModal = () => {
    setAddIsVisible(!addIsVisible);
  };

  const toggleReviewModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <View
        style={[
          styles.orderCard,
          addReview && {
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        ]}>
        <Image
          style={styles.image}
          source={{
            uri:
              item?.product?.image ??
              'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg',
            cache: 'force-cache',
          }}
        />
        <View style={{flex: 1}}>
          <Text style={styles.heading}>{product.name}</Text>
          {isReview && (
            <View
              style={[
                GlobalStyle.row,
                GlobalStyle.aic,
                gap(2),
                {position: 'absolute', right: 0, top: 5},
              ]}>
              <FontAwesomeIcon
                icon={faStar}
                color={'#FFA161'}
                size={generalFontSize - 4}
              />
              <FontAwesomeIcon
                icon={faStar}
                color={'#FFA161'}
                size={generalFontSize - 4}
              />
              <FontAwesomeIcon
                icon={faStar}
                color={'#FFA161'}
                size={generalFontSize - 4}
              />
              <FontAwesomeIcon
                icon={faStar}
                color={'#FFA161'}
                size={generalFontSize - 4}
              />
              <FontAwesomeIcon
                icon={faStar}
                color={'#FFA161'}
                size={generalFontSize - 4}
              />
            </View>
          )}
          <View
            style={[
              GlobalStyle.row,
              {
                gap: 20,
                justifyContent: 'flex-start',
                flex: 1,
                flexWrap: 'wrap',
              },
            ]}>
            <View>
              <Text style={styles.minText}>Vendor</Text>
              <Text style={styles.text}>{product?.user?.name}</Text>
            </View>
            <View style={styles.border}>
              <Text style={styles.minText}>Price</Text>
              <Text style={styles.text}>${product.price}</Text>
            </View>
            <View style={styles.border}>
              <Text style={styles.minText}>Quantity</Text>
              <Text style={styles.text}>{item.quantity}</Text>
            </View>
          </View>
        </View>
      </View>
      {review && (
        <>
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            style={styles.reviewBtn}>
            <Text style={styles.reviewBtnText}>Show Review</Text>
          </TouchableOpacity>
          <ReviewModal modalIsVisible={isVisible} closeModal={closeModal} />
        </>
      )}
      {addReview && (
        <>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={[GlobalStyle.themeBtn, {width: '100%'}]}>
            <Text style={GlobalStyle.themeBtn2Text}>Add a Review</Text>
          </TouchableOpacity>
          <AddReview
            modalIsVisible={modalVisible}
            closeModal={toggleReviewModal}
            itemId={product?.id}
          />
        </>
      )}
    </>
  );
};

// Order Min Card Component
const OrderMinCard = ({item, selectData}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={GlobalStyle.orderBox}>
        <View style={GlobalStyle.orderContent}>
          <Text style={GlobalStyle.orderMainText}>{item.order_number}</Text>
          <Text style={GlobalStyle.orderMinText}>
            {moment(item.created_at).format('DD-MM-YYYY | LT')}
          </Text>
          <View style={GlobalStyle.spacer} />
          {/* <Text style={GlobalStyle.orderMinText}>Customer Name</Text>
                <Text style={GlobalStyle.orderMainText}>{item.customerName}</Text> */}
          {/* <View style={GlobalStyle.spacer} /> */}
          <Text style={GlobalStyle.orderMinText}>Status</Text>
          <Text style={GlobalStyle.orderMainText}>{item.status}</Text>
          {/* <CustomSelect data={selectData} currentStatus={item.status} /> */}
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flex: 1,
            gap: 10,
          }}>
          <View style={[GlobalStyle.row, GlobalStyle.ac]}>
            <Text style={GlobalStyle.orderPrice}>
              <FontAwesomeIcon
                icon={faDollarSign}
                color={textColor}
                size={generalFontSize - 4}
              />
              {Math.floor(item?.total_price)}
            </Text>
            {/* <Text style={GlobalStyle.orderPriceStatus}>{item.payment_method}</Text> */}
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('vendorOrderDetails', {item})}
            style={[GlobalStyle.themeBtn, GlobalStyle.invoiceBtn]}>
            <FontAwesomeIcon
              icon={faFileInvoiceDollar}
              color={whiteColor}
              size={60}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={GlobalStyle.orderMinText}>Products</Text>
      {item?.details?.map(val => (
        <View
          key={val?.id}
          style={[
            GlobalStyle.row,
            {justifyContent: 'space-between', padding: 10},
          ]}>
          <Text style={GlobalStyle.orderMainText}>{val?.product.name}</Text>
          <Image source={{uri: val?.product?.image}} style={styles.image} />
        </View>
      ))}
    </View>
  );
};

export {OrderCard, OrderMinCard};

// Styles for OrderCard component
const styles = StyleSheet.create({
  main: {
    backgroundColor: itemBg,
    borderRadius: 10,
  },
  image: {
    width: 74,
    height: 74,
    borderRadius: 10,
    objectFit: 'cover',
  },
  orderCard: {
    backgroundColor: itemBg,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  heading: {
    fontSize: generalFontSize + 2,
    color: textColor,
    fontFamily: 'FreightBigPro-Bold',
    marginBottom: 10,
  },
  minText: {
    fontSize: generalFontSize - 4,
    color: minTextColor,
    ...fontFamily('regular'),
  },
  text: {
    fontSize: generalFontSize - 2,
    color: textColor,
    ...fontFamily('regular'),
  },
  border: {
    borderLeftColor: textColor,
    borderLeftWidth: 1,
    paddingLeft: 20,
  },
  reviewBtn: {
    backgroundColor: itemBg,
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 1,
    borderTopColor: textColor,
  },
  reviewBtnText: {
    textAlign: 'center',
    color: textColor,
    fontSize: generalFontSize - 4,
    ...fontFamily('regular'),
  },
});
