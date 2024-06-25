import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { bgColor, generalFontSize, GlobalStyle, itemBg, fontFamily, textColor, secondColor } from '../../Styles/Theme'
import { OrderCard } from '../../Components/OrderCard/OrderCard'
import CustomSelect from '../../Components/CustomSelect/CustomSelect'

const selectData = [
    { label: 'Placed', value: '1' },
    { label: 'On Route', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const CustomerOrderDetail = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <View style={styles.card}>
                <Text style={styles.cardId}>Order ID: #7612837621783612786</Text>
            </View>
            <ScrollView>
                <View style={[GlobalStyle.container]}>
                    <View style={[GlobalStyle.section, { marginTop: 36 }]}>
                        <Text style={GlobalStyle.secMainHeading}>
                            Order Status
                        </Text>
                        <CustomSelect data={selectData} currentStatus={'Placed'} />
                        <TouchableOpacity style={[GlobalStyle.themeBtn, { marginTop: 10 }]}>
                            <Text style={GlobalStyle.themeBtnText}>track order</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[GlobalStyle.section, { marginTop: 36 }]}>
                        <Text style={GlobalStyle.secMainHeading}>
                            Order Details
                        </Text>
                        <OrderCard />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CustomerOrderDetail

const styles = StyleSheet.create({
    cardId: {
        fontSize: generalFontSize - 2,
        ...fontFamily('regular'),
        color: textColor,
        textAlign: "center"
    },
    card: {
        backgroundColor: secondColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: "center"
    }
})