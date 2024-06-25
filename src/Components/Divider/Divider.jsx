import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { secondColor } from '../../Styles/Theme'

const Divider = () => {
    return (
        <View>
        </View>
    )
}

export default Divider

const styles = StyleSheet.create({
    divider: {
        width: '100%',
        height: 2,
        borderWidth: 1,
        borderColor: "#707070 ",
        borderStyle: 'solid'
    }
})