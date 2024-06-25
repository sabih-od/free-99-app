import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { bgColor, GlobalStyle, padding, textColor, themeColor } from '../../Styles/Theme'
import { OrderCard, OrderMinCard } from '../../Components/OrderCard/OrderCard'

const orderData = [
    {
        "id": "#20230518-09123456",
        "date": "May 18 2023",
        "time": "09:30 AM",
        "customerName": "Emily White",
        "status": "Placed",
        "price": "25.99",
        "priceStatus": "paid",
        "priceId": 2,
        "review": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    },
    {
        "id": "#20230519-11223344",
        "date": "May 19 2023",
        "time": "10:45 AM",
        "customerName": "David Johnson",
        "status": "Delivered",
        "price": "42.75",
        "priceStatus": "paid",
        "priceId": 2,
        "review": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    },
    {
        "id": "#20230520-13456789",
        "date": "May 20 2023",
        "time": "01:20 PM",
        "customerName": "Sophie Miller",
        "status": "Processing",
        "price": "37.50",
        "priceStatus": "pending",
        "priceId": 3
    },
    {
        "id": "#20230521-98765432",
        "date": "May 21 2023",
        "time": "02:10 PM",
        "customerName": "Ethan Brown",
        "status": "Shipped",
        "price": "30.80",
        "priceStatus": "paid",
        "priceId": 2,
        "review": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    },
    {
        "id": "#20230522-56789012",
        "date": "May 22 2023",
        "time": "11:55 AM",
        "customerName": "Olivia Taylor",
        "status": "Placed",
        "price": "55.25",
        "priceStatus": "paid",
        "priceId": 2,
        "review": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    },
    {
        "id": "#20230523-34567890",
        "date": "May 23 2023",
        "time": "09:00 AM",
        "customerName": "Liam Wilson",
        "status": "Cancelled",
        "price": "18.40",
        "priceStatus": "refunded",
        "priceId": 4
    },
    {
        "id": "#20230524-78901234",
        "date": "May 24 2023",
        "time": "02:05 PM",
        "customerName": "Ava Martinez",
        "status": "Cancelled",
        "price": "22.60",
        "priceStatus": "refunded",
        "priceId": 4
    },
    {
        "id": "#20230525-01234567",
        "date": "May 25 2023",
        "time": "07:20 AM",
        "customerName": "Noah Anderson",
        "status": "Cancelled",
        "price": "17.90",
        "priceStatus": "refunded",
        "priceId": 4
    },
    {
        "id": "#20230526-07104354",
        "date": "May 26 2023",
        "time": "04:15 PM",
        "customerName": "Matilda Brown",
        "status": "Placed",
        "price": "45.99",
        "priceStatus": "pending",
        "priceId": 3
    },
    {
        "id": "#20230527-11293075",
        "date": "May 27 2023",
        "time": "10:00 AM",
        "customerName": "John Smith",
        "status": "Delivered",
        "price": "35.75",
        "priceStatus": "pending",
        "priceId": 3
    },
    {
        "id": "#20230528-15372086",
        "date": "May 28 2023",
        "time": "06:45 PM",
        "customerName": "Emma Johnson",
        "status": "Shipped",
        "price": "55.20",
        "priceStatus": "paid",
        "priceId": 2,
        "review": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    }
];

const CustomerReviews = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <View style={[GlobalStyle.container, padding('top', 20)]}>
                <FlatList
                    style={{ height: '100%' }}
                    contentContainerStyle={{ gap: 20 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={orderData}
                    renderItem={({ item }) => (
                        // (item.review) ?
                        //     <OrderCard isReview review={item.review} />
                        //     :
                        //     <OrderCard isReview addReview />
                        <></>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

export default CustomerReviews

const styles = StyleSheet.create({})