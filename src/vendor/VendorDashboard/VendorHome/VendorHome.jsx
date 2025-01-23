import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { bgColor, generalFontSize, GlobalStyle, padding, textColor, themeColor, whiteColor, windowHeight, windowWidth } from '../../../Styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDollarSign, faLongArrowUp, faFilePen, faBoxesStacked, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
import CustomSelect from '../../../Components/CustomSelect/CustomSelect'
import { OrderMinCard } from '../../../Components/OrderCard/OrderCard'
import { useSelector } from 'react-redux'
import { vendorOrderService } from '../../../Services/vendorOrderService'

const VendorHome = ({ navigation }) => {
    const [order, setOrder] = useState([]);
    const vendorOrderData = useSelector((state) => state.vendorOrder.newOrder);
    const [loading, setLoading] = useState();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            setLoading(true);
            await vendorOrderService.getVendorOrders();
        } catch (error) {
            console.error('Failed to fetch Orders:', error);
        } finally {
            setLoading(false);
        }
        setRefreshing(false);
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                vendorOrderService.getVendorOrders();
            } catch (error) {
                console.error('Failed to fetch Orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData()
    }, [])

    useEffect(() => {
        setOrder(vendorOrderData);
    }, [vendorOrderData])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} tintColor={whiteColor} onRefresh={onRefresh} />
                }
            >
                <View style={[GlobalStyle.container, padding('top', 25)]}>
                    {/* <View style={GlobalStyle.section}>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', marginBottom: 10 }]}>
                            <Text style={[GlobalStyle.secMainHeading]}>This Month</Text>
                            <TouchableOpacity style={[GlobalStyle.themeBtn, { width: 'auto', paddingHorizontal: 16 }]}>
                                <Text style={GlobalStyle.themeBtnText}>All reports</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', flexWrap: 'wrap' }]}>
                            {genericData.map((item, index) => (
                                <View style={GlobalStyle.featureBox} key={index}>
                                    <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', marginBottom: 10 }]}>
                                        <View style={GlobalStyle.featureBoxIcon}>
                                            <FontAwesomeIcon icon={item.sign} color={whiteColor} size={generalFontSize} />
                                        </View>
                                        <Text style={GlobalStyle.featureBoxStatus}>
                                            {item.pnl}
                                            <FontAwesomeIcon icon={faLongArrowUp} color={themeColor} size={generalFontSize - 4} />
                                        </Text>
                                    </View>
                                    <Text style={GlobalStyle.featureBoxTitle}>{item.title}</Text>
                                    <Text style={GlobalStyle.featureBoxDesc}>{item.desc}</Text>
                                </View>
                            ))}
                        </View>
                    </View> */}
                    <View style={[GlobalStyle.section,]}>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', paddingBottom: 10 }]}>
                            <Text style={[GlobalStyle.secMainHeading, { flex: 1 }]}>New Orders</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('vendorOrder')}
                                style={[GlobalStyle.themeBtn, { width: 'auto', paddingHorizontal: 16 }]}>
                                <Text style={GlobalStyle.themeBtnText}>See all orders</Text>
                            </TouchableOpacity>
                        </View>
                        {loading ? (
                            <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: windowHeight - 150 }}>
                                <ActivityIndicator size="large" color={whiteColor} />
                            </View>
                        ) : (
                            <>
                                {order?.length > 0 ? (
                                    <View style={{ gap: 20, paddingBottom: 20 }}>
                                        <FlatList
                                            style={{ height: '100%' }}
                                            contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            data={order}
                                            renderItem={({ item }) => (
                                                <OrderMinCard item={item} />
                                            )}
                                            keyExtractor={(item) => item.id.toString()}
                                        />
                                    </View>
                                ) : (
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30 }}>
                                        <Text style={{ ...GlobalStyle.mainTitle, color: textColor }}>No Orders Found</Text>
                                    </View>
                                )}
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default VendorHome

const styles = StyleSheet.create({})