import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import VendorTabNavigation from '../../Navigation/VendorNavigation/VendorTabNavigation'

const VendorDashboard = ({ navigation }) => {
    return (
        <VendorTabNavigation navigation={navigation} />
    )
}

export default VendorDashboard

const styles = StyleSheet.create({})