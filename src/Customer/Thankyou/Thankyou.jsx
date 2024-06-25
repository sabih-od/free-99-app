import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { bgColor, GlobalStyle, padding } from '../../Styles/Theme'
import ThankyouImage from '../../Components/ThankyouImage/ThankyouImage'
import { useNavigation } from '@react-navigation/native'

const Thankyou = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
      <View style={[GlobalStyle.container, GlobalStyle.aic, GlobalStyle.jc, padding('top', 30)]}>
        <ThankyouImage />
        <Text style={GlobalStyle.mainTitle}>
          Thank you for your order
        </Text>
        {/* <View style={[GlobalStyle.row, GlobalStyle.aic, GlobalStyle.jc, { gap: 5, marginTop: 10 }]}>
          <Text style={GlobalStyle.minTitle}>
            Order Number:
          </Text>
          <Text style={GlobalStyle.minTitle}>#1234567890</Text>
        </View> */}
        <View style={[GlobalStyle.row, GlobalStyle.aic, GlobalStyle.jc, { gap: 5, marginTop: 'auto' }]}>
          <TouchableOpacity onPress={() => navigation.navigate('dashboard')} style={[GlobalStyle.themeBtn]}>
            <Text style={[GlobalStyle.themeBtnText]}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Thankyou

const styles = StyleSheet.create({})