import {Image, StyleSheet, Text, View, Platform} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import {
  fontFamily,
  generalFontSize,
  GlobalStyle,
  isDarkMode,
  itemBg,
  margin,
  minTextColor,
  textColor,
  themeColor,
  whiteColor,
  windowWidth,
} from '../../Styles/Theme';
import {productService} from '../../Services/productService';
import {useNavigation} from '@react-navigation/native';

const VendorProductCard = ({item, toggleDeleteModal, toggleUpdateModal}) => {
  const nav = useNavigation();
  const [salesEnabled, setSalesEnabled] = useState(item?.status);

  const updateStatus = async id => {
    try {
      const res = await productService.productStatus(id, !salesEnabled);
    } catch (error) {}
  };

  return (
    <View style={styles.card}>
      <View style={[GlobalStyle.row, {gap: 20}]}>
        <View style={{justifyContent: 'space-between'}}>
          <Image source={{uri: item.image}} style={styles.image} />
          <View style={{marginTop: 20}}>
            <ToggleSwitch
              isOn={salesEnabled}
              onColor={themeColor}
              offColor={'grey'}
              size="small"
              value={salesEnabled}
              onToggle={async () => {
                await updateStatus(item.id).then(() => {
                  productService.getProducts();
                });
              }}
            />
            <Text style={styles.orderMinText}>Published</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            nav.navigate('productDetail', {id: item?.id, data: item})
          }>
          <Text numberOfLines={1} style={styles.title}>
            {item.name}
          </Text>
          <Text style={[GlobalStyle.orderMinText]}>{item?.category?.name}</Text>
          <View style={[GlobalStyle.row, GlobalStyle.aic, {gap: 20}]}>
            <View>
              <Text style={styles.orderMinText}>Price</Text>
              <Text style={styles.orderMainText}>${item.price}</Text>
            </View>
            <View>
              <Text style={styles.orderMinText}>Quantity</Text>
              <Text style={styles.orderMainText}>{item.stock_quantity}</Text>
            </View>
          </View>
          <View style={margin('top', 10)}>
            <Text style={styles.orderMinText}>Created At</Text>
            <Text style={styles.orderMainText}>{item.created_at}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.btnCont}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => {
            toggleUpdateModal(item);
          }}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            size={generalFontSize - 5}
            color={whiteColor}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.actionBtn} onPress={() => { toggleDeleteModal(item?.id) }}>
                    <FontAwesomeIcon icon={faTrash} size={generalFontSize - 2} color={whiteColor} />
                </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default VendorProductCard;

const styles = StyleSheet.create({
  orderMinText: {
    ...fontFamily('regular'),
    fontWeight: '400',
    fontSize: generalFontSize - 4,
    color: minTextColor,
    marginBottom: 5,
  },
  orderMainText: {
    color: textColor,
    fontSize: generalFontSize,
    ...fontFamily('regular'),
  },
  image: {
    width: 75,
    height: 75,
    objectFit: 'cover',
    borderRadius: 5,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: itemBg,
    ...Platform.select({
      ios: {
        shadowColor: '#fff5',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontSize: generalFontSize + 2,
    color: textColor,
    lineHeight: 22,
    fontFamily: 'FreightBigPro-Bold',
    // marginBottom: 10,
    width: windowWidth - 180,
  },
  btnCont: {
    position: 'absolute',
    top: 10,
    right: 10,
    gap: 5,
  },
  actionBtn: {
    backgroundColor: themeColor,
    borderRadius: 100,
    padding: 10,
  },
});
