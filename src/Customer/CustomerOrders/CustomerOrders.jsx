import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Dimensions, Animated } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { bgColor, blackColor, generalFontSize, GlobalStyle, padding, textColor, themeColor } from '../../Styles/Theme';
import { useSelector } from 'react-redux';
import { orderService } from '../../Services/orderService';
import { OrderCard } from '../../Components/OrderCard/OrderCard';

const LoadingSkeleton = () => {
    const numSkeletonItems = 3; // Number of skeleton items to show
    const [opacity] = useState(new Animated.Value(0.3));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);

    return (
        <View style={{ marginTop: 20 }}>
            {[...Array(numSkeletonItems).keys()].map((index) => (
                <View key={index} style={[styles.showAccordionButton]}>
                    <View style={styles.section}>
                        <View style={[GlobalStyle.card, { gap: 10 }]}>
                            <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                                <Animated.View style={[styles.skeletonText, { width: 100, height: 20, opacity }]} />
                                <Animated.View style={[styles.skeletonText, { width: 150, height: 20, opacity }]} />
                            </View>
                            <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                                <Animated.View style={[styles.skeletonText, { width: 100, height: 20, opacity }]} />
                                <Animated.View style={[styles.skeletonText, { width: 200, height: 20, opacity }]} />
                            </View>
                            <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                                <Animated.View style={[styles.skeletonText, { width: 100, height: 20, opacity }]} />
                                <Animated.View style={[styles.skeletonText, { width: 100, height: 20, opacity }]} />
                            </View>
                            <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                                <Animated.View style={[styles.skeletonText, { width: 100, height: 20, opacity }]} />
                                <Animated.View style={[styles.skeletonText, { width: 150, height: 20, opacity }]} />
                            </View>
                            <Animated.View style={[styles.skeletonButton, { width: Dimensions.get('window').width - 60, opacity }]} />
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};


const CustomerOrders = ({ navigation }) => {
    const [isActive, setIsActive] = useState(false);
    const [expandedOrderIds, setExpandedOrderIds] = useState([]);
    const recentOrders = useSelector(state => state.order.recentOrders?.data?.orders?.data);
    const loading = useSelector(state => state.order.loading);

    useEffect(() => {
        setIsActive(loading);
    }, [loading]);

    const fetchOrders = useCallback(async () => {
        await orderService.getRecentOrders();
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const toggleAccordion = (orderId) => {
        setExpandedOrderIds((prevExpandedOrderIds) =>
            prevExpandedOrderIds.includes(orderId)
                ? prevExpandedOrderIds.filter(id => id !== orderId)
                : [...prevExpandedOrderIds, orderId]
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <View style={[GlobalStyle.container, padding('top', 20)]}>
                {isActive ? (
                   <LoadingSkeleton />
                ) : recentOrders?.length > 0 ? (
                    <FlatList
                        style={{ height: '100%' }}
                        contentContainerStyle={{ gap: 20 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={recentOrders}
                        renderItem={({ item }) => (
                            <View style={[styles.showAccordionButton]}>
                                <View style={styles.section}>
                                    <View style={[GlobalStyle.card, { gap: 10 }]}>
                                        <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                                            <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>Order ID: </Text>
                                            <Text style={[GlobalStyle.orderMainText, { fontSize: generalFontSize - 2 }]}>
                                                {item.order_number}
                                            </Text>
                                        </View>
                                        <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                                            <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>Address: </Text>
                                            <Text style={[GlobalStyle.orderMainText, { fontSize: generalFontSize - 2, flex: 1, textAlign: 'right' }]}>
                                                {item.shipping_address}
                                            </Text>
                                        </View>
                                        <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                                            <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>Total Price: </Text>
                                            <Text style={[GlobalStyle.orderMainText, { fontSize: generalFontSize - 2 }]}>
                                                ${item.total_price}
                                            </Text>
                                        </View>
                                        <View style={[GlobalStyle.row, { gap: 20, justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                                            <Text style={[GlobalStyle.orderMinText, { marginBottom: 0 }]}>Payment Method: </Text>
                                            <Text style={[GlobalStyle.orderMainText, { fontSize: generalFontSize - 2 }]}>
                                                {item.payment_method}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            style={[GlobalStyle.themeBtn, { backgroundColor: blackColor, width: Dimensions.get('window').width - 80 }]}
                                            onPress={() => toggleAccordion(item.id)}
                                        >
                                            <Text style={[GlobalStyle.themeBtnText, { fontSize: generalFontSize - 2, textAlign: 'center' }]}>Order Details</Text>
                                        </TouchableOpacity>
                                        {expandedOrderIds.includes(item.id) && (
                                            <>
                                                {item.details && item.details.map(detail => (
                                                    <OrderCard addReview key={detail.id} item={detail} />
                                                ))}
                                            </>
                                        )}
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30 }}>
                        <Text style={{ ...GlobalStyle.mainTitle, color: textColor }}>No Orders Found</Text>
                        <TouchableOpacity
                            style={[GlobalStyle.themeBtn]}
                            onPress={() => navigation.navigate('dashboard', { screen: 'home' })}
                        >
                            <Text style={[GlobalStyle.themeBtnText]}>Go to shopping</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default CustomerOrders;

const styles = StyleSheet.create({
    showAccordionButton: {
        // Define your styles for the accordion button here
    },
    section: {
        // Define your styles for the section here
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skeletonText: {
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginBottom: 10,
    },
    skeletonButton: {
        height: 40,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginTop: 10,
    },
    showAccordionButton: {
        marginBottom: 20,
    },
    section: {
        // Define your styles for the section here
    },
});
