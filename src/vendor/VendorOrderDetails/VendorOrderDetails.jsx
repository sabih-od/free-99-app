import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { bgColor, generalFontSize, GlobalStyle, textColor, whiteColor } from '../../Styles/Theme'
import CustomSelect from '../../Components/CustomSelect/CustomSelect';
import { OrderCard } from '../../Components/OrderCard/OrderCard';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

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

const VendorOrderDetails = ({ route }) => {
    const item = route.params.item;
    const user = item.user
    console.log("user=> ", user)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <ScrollView>
                <View style={[GlobalStyle.container]}>
                    <View style={[GlobalStyle.section, { marginTop: 36 }]}>
                        <View style={[GlobalStyle.orderBox, { flexDirection: 'column', justifyContent: 'flex-start' }]}>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%' }]}>
                                <Text style={[GlobalStyle.secMainHeading]}>Order Status</Text>
                                <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3, flex: 1, textAlign: 'right', paddingLeft: 10, maxWidth: '75%', color: whiteColor, marginBottom: 0 }]}>{item?.status}</Text>
                            </View>
                        </View>
                        {/* <Text style={GlobalStyle.secMainHeading}>
                            Order Status
                        </Text>
                        <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize, textAlign: 'center' }]}>{item?.status}</Text>
                        <TouchableOpacity style={[GlobalStyle.themeBtn, { marginTop: 10 }]}>
                            <Text style={GlobalStyle.themeBtnText}>track order</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={[GlobalStyle.section, { marginTop: 36 }]}>
                        <Text style={GlobalStyle.secMainHeading}>
                            Order Summary
                        </Text>
                        <View style={[GlobalStyle.orderBox, { flexDirection: 'column', justifyContent: 'flex-start', marginTop: 10 }]}>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%' }]}>
                                <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Order Code:</Text>
                                <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3, flex: 1, textAlign: 'right', paddingLeft: 10, maxWidth: '75%' }]}>{item?.id}</Text>
                            </View>
                            {/* <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%', marginTop: 10 }]}>
                                <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Customer Name:</Text>
                                <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3, flex:1, textAlign: 'right' }]}>{item?.customerName}</Text>
                            </View>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%', marginTop: 10 }]}>
                                <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Email:</Text>
                                <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3, flex:1, textAlign: 'right' }]}>matildabrown@gmail.com</Text>
                            </View> */}
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%', marginTop: 10 }]}>
                                <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Shipping Address:</Text>
                                <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3, flex: 1, textAlign: 'right', paddingLeft: 10, maxWidth: '75%' }]}>{item?.shipping_address}</Text>
                            </View>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%', marginTop: 10 }]}>
                                <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Order date:</Text>
                                <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3, flex: 1, textAlign: 'right', paddingLeft: 10, maxWidth: '75%' }]}>{formatDate(item?.created_at)}</Text>
                            </View>
                            {/* <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%', marginTop: 10 }]}>
                                <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Order Status:</Text>
                                <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3, flex: 1, textAlign: 'right', paddingLeft:10, maxWidth:'75%' }]}>{item?.status}</Text>
                            </View> */}
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%', marginTop: 10 }]}>
                                <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Total Earning:</Text>
                                <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3, flex: 1, textAlign: 'right', paddingLeft: 10, maxWidth: '75%' }]}>${item?.total_price}</Text>
                            </View>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%', marginTop: 10 }]}>
                                <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Total Items:</Text>
                                <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3, flex: 1, textAlign: 'right', paddingLeft: 10, maxWidth: '75%' }]}>{item?.total_items}</Text>
                            </View>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%', marginTop: 10 }]}>
                                <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Payment Method:</Text>
                                <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3, flex: 1, textAlign: 'right', paddingLeft: 10, maxWidth: '75%' }]}>{item?.payment_method}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[GlobalStyle.section, { marginTop: 20 }]}>
                        <Text style={GlobalStyle.secMainHeading}>
                            User Details
                        </Text>
                        <View style={[GlobalStyle.orderBox, { flexDirection: 'column', justifyContent: 'flex-start', marginTop: 10 }]}>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%' }]}>
                                <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Name:</Text>
                                <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3, flex: 1, textAlign: 'right', paddingLeft: 10, maxWidth: '75%' }]}>{user?.name}</Text>
                            </View>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%', marginTop: 10 }]}>
                                <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Phone Number:</Text>
                                <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3, flex: 1, textAlign: 'right', paddingLeft: 10, maxWidth: '75%' }]}>{user?.phone}</Text>
                            </View>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%', marginTop: 10 }]}>
                                <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Email:</Text>
                                <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3, flex: 1, textAlign: 'right', paddingLeft: 10, maxWidth: '75%' }]}>{user?.email}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[GlobalStyle.section, { marginTop: 20 }]}>
                        <Text style={GlobalStyle.secMainHeading}>
                            Order Details
                        </Text>
                        {/* <OrderCard /> */}
                        {item?.details?.map((item, index) => (
                            <OrderCard key={item.id} item={item} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default VendorOrderDetails

const styles = StyleSheet.create({})