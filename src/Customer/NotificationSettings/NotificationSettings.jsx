import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { bgColor, GlobalStyle, itemBg, margin, padding, themeColor, whiteColor, fontFamily, generalFontSize, textColor } from '../../Styles/Theme';

const NotificationSettings = () => {
  const [salesEnabled, setSalesEnabled] = useState(false);
  const [arrivalsEnabled, setArrivalsEnabled] = useState(false);
  const [deliveryStatusEnabled, setDeliveryStatusEnabled] = useState(false);
  return (
    <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
      <View style={[GlobalStyle.container, padding('top', 30)]}>
        <Text style={styles.mainHeading}>Notification Settings</Text>
        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }]}>
          <Text style={styles.switchText}>Sales</Text>
          <Switch
            trackColor={{ false: '#ddd', true: '#ddd' }}
            thumbColor={salesEnabled ? themeColor : whiteColor}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setSalesEnabled(previousState => !previousState)}
            value={salesEnabled}
          />
        </View>
        {/* New Arrivals Switch */}
        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }, margin('top', 15)]}>
          <Text style={styles.switchText}>New Arrivals</Text>
          <Switch
            trackColor={{ false: '#ddd', true: '#ddd' }}
            thumbColor={arrivalsEnabled ? themeColor : whiteColor}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setArrivalsEnabled(previousState => !previousState)}
            value={arrivalsEnabled}
          />
        </View>
        {/* Delivery status changes Switch */}
        {/* <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }, margin('top', 15)]}>
          <Text style={styles.switchText}>Delivery status changes</Text>
          <Switch
            trackColor={{ false: '#ddd', true: '#ddd' }}
            thumbColor={deliveryStatusEnabled ? themeColor : whiteColor}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setDeliveryStatusEnabled(previousState => !previousState)}
            value={deliveryStatusEnabled}
          />
        </View> */}
      </View>
    </SafeAreaView>
  )
}

export default NotificationSettings

const styles = StyleSheet.create({
  switchText: {
    ...fontFamily('regular'),
    fontSize: generalFontSize - 2,
    lineHeight: 18,
    color: textColor
  },
  mainHeading: {
      fontFamily: 'FreightBigPro-Bold',
      fontSize: generalFontSize + 8,
      fontWeight: '900',
      marginBottom: 20,
      color: textColor
  },
})