import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../../Styles/Theme'

const ThankyouImage = () => {
    return (
        <Image
            style={{ width: windowWidth - 40, objectFit: 'contain' }}
            source={require('../../../assets/images/thankyou.png')}
        />
    )
}

export default ThankyouImage

const styles = StyleSheet.create({})