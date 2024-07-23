import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { textColor, generalFontSize, GlobalStyle, fontFamily, gap, margin, themeColor, whiteColor } from '../../Styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const Product = ({ width, height, item }) => {
  const navigation = useNavigation()
  const [disableBtn, setDisableBtn] = useState(false)
  const id = item?.id
  const data = item
  console.log('itemitem', item)
  useEffect(() => { item?.stock_quantity <= 0 ? setDisableBtn(true) : '' }, [])
  return (
    <>
      {item && (
        <TouchableOpacity
          // disabled={disableBtn}
          onPress={() => navigation.navigate('productDetail', { id, data })}
          style={[styles.productBox, width && { width: width }]}>
          <View style={{ position: 'relative' }}>
            <Image
              source={item?.image ? { uri: item?.image } : require("../../../assets/images/noimg.jpg")}
              style={[styles.image, height && { height: height }]}
            />
            {disableBtn && (
              <View style={{ position: 'absolute', top: 0, bottom: 0, width: width, backgroundColor: '#3337', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.outofstocktext}>Out of Stock</Text>
              </View>
            )}
          </View>
          <Text style={styles.itemTitle} numberOfLines={1}>{item.name}</Text>
          <Text numberOfLines={1} style={styles.description}>{item.description}</Text>
          <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }, margin("top", 5)]}>
            <Text style={styles.price}>${item.price}</Text>
            {item.rating && (
              <View style={[GlobalStyle.row, GlobalStyle.aic, gap(2)]}>
                <FontAwesomeIcon icon={faStar} color={"#FFA161"} size={generalFontSize - 8} />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
    </>
  )
}

export default Product

const styles = StyleSheet.create({
  itemTitle: {
    color: textColor,
    fontFamily: 'FreightBigPro-Bold',
    fontSize: generalFontSize,
    textAlign: 'left',
    marginTop: 7
  },
  image: {
    borderRadius: 10,
    height: 180,
    width: "100%",
    borderColor: textColor,
    borderWidth: 1,
    backgroundColor: 'grey'
  },
  productBox: {
    width: 140,
    overflow: "hidden"
  },
  description: {
    ...fontFamily("regular"),
    fontSize: generalFontSize - 6,
    color: textColor,
  },
  price: {
    color: textColor,
    ...fontFamily("bold"),
    fontSize: generalFontSize - 4
  },
  rating: {
    color: textColor,
    ...fontFamily("regular"),
    fontSize: generalFontSize - 6
  },
  outofstocktext: {
    color: textColor,
    fontSize: generalFontSize + 4,
    ...fontFamily("regular"),
    textTransform: 'uppercase',
    fontWeight: '600'
  }
})