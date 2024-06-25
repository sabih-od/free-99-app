import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { bgColor, generalFontSize, GlobalStyle, padding, themeColor, textColor, isIpad, windowWidth, fontFamily } from '../../Styles/Theme'
import { packageService } from '../../Services/packageService';
import { useSelector } from 'react-redux';
import { userService } from '../../Services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import StripePayment from '../../Components/Payment/StripePayment';
import { useNavigation } from '@react-navigation/native';

const Packages = () => {
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState({});
    const authData = useSelector((state) => state.auth.data);
    const packages = useSelector((state) => state.package.packages)
    const stripePaymentRef = useRef()
    const navigation = useNavigation();

    const subscribe = async (data) => {
        console.log('subscribe data', data)
        await setItem(data);
        if (data.total_price === 0) {
            callback(data);
        } else {
            stripePaymentRef?.current?.initializePaymentSheet(data);
        }
    }

    const callback = async (payload = null) => {
        setLoading(!loading)
        
        let packageId = null;
        if(payload?.id) packageId = payload?.id;
        if(payload?.data?.id) packageId = payload?.data?.id;
        
        await packageService.purchasePackage( packageId )
            .then(async (resp) => {
                await userService.getProfile();
                setLoading(!loading)
                navigation.reset({ index: 0, routes: [{ name: 'vendor' }]})
                Alert.alert("Succesfully Registered", "You're successfully registered as a vendor")
            });
    }

    const fetchPackages = useCallback(async () => {
        const res = await packageService.getPackages()
    }, []);

    useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);

    return (
        <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
            <View style={[GlobalStyle.container, padding('top', 15)]}>
                <View style={{ marginTop: 20, marginBottom: 30 }}>
                    <Text style={[GlobalStyle.mainTitle, { fontSize: generalFontSize + 40 }]}>
                        Vendor Package
                    </Text>
                    <Text style={[GlobalStyle.minTitle]}>
                        Select a Package
                    </Text>
                </View>
                {loading
                    ?
                    (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={themeColor} />
                        </View>
                    )
                    :
                    (
                        <>
                            <FlatList
                                //data={packages.slice(1)} // Filter out the item at index 0
                                data={packages}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 20 }}
                                columnWrapperStyle={isIpad ? { justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', gap: 20 } : null}
                                keyExtractor={item => item.id.toString()} // KeyExtractor expects a string
                                horizontal={false}
                                numColumns={isIpad ? 2 : null}
                                renderItem={({ item, index }) => (
                                    (authData?.user_subscription) ?
                                        ((authData?.user_subscription?.subscription?.limitation !== item?.limitation) &&
                                            <View style={[GlobalStyle.card, { width: isIpad ? (windowWidth / 2) - 40 : '100%', }]}>
                                                <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }]}>
                                                    <Text style={[GlobalStyle.secMainHeading, { fontWeight: '700' }]}>{item?.title}</Text>
                                                    <Text style={[GlobalStyle.secMainHeading, { fontWeight: '700', ...fontFamily("medium") }]}>${item?.total_price}</Text>
                                                </View>
                                                <View style={styles.line}></View>
                                                <View style={[GlobalStyle.row, { justifyContent: 'space-between' }]}>
                                                    <Text style={[GlobalStyle.orderMainText, { fontWeight: '700' }]}>Limitations:</Text>
                                                    <Text style={[GlobalStyle.orderMainText]}>{item?.limitation}</Text>
                                                </View>
                                                <View style={[GlobalStyle.row, { justifyContent: 'space-between', marginTop: 10 }]}>
                                                    <Text style={[GlobalStyle.orderMainText, { fontWeight: '700' }]}>Expiry:</Text>
                                                    <Text style={[GlobalStyle.orderMainText]}>Lifetime</Text>
                                                </View>
                                                <View style={[GlobalStyle.row, { justifyContent: 'space-between', marginTop: 10, height: 80 }]}>
                                                    <Text style={[GlobalStyle.orderMainText, { fontWeight: '700' }]}>Details:</Text>
                                                    <Text style={[GlobalStyle.orderMinText, { flex: 1, textAlign: 'right' }]}>
                                                        {/* {item?.id === 4 ? 'List 1 product for just .99 cents' : 'One time fee $99.99 per year (Upload unlimited products)'} */}
                                                        {item?.details}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity onPress={() => subscribe(item)} style={[GlobalStyle.themeBtn, { marginTop: 20, flex: 1, width: '100%' }]}>
                                                    <Text style={[GlobalStyle.themeBtnText]}>Updgrade Now</Text>
                                                </TouchableOpacity>
                                            </View>)
                                        :
                                            <>
                                                <View style={[GlobalStyle.card, { width: isIpad ? (windowWidth / 2) - 40 : '100%', }]}>
                                                    <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }]}>
                                                        <Text style={[GlobalStyle.secMainHeading, { fontWeight: '700' }]}>{item?.title}</Text>
                                                        <Text style={[GlobalStyle.secMainHeading, { fontWeight: '700', ...fontFamily("medium") }]}>${item?.total_price}</Text>
                                                    </View>
                                                    <View style={styles.line}></View>
                                                    <View style={[GlobalStyle.row, { justifyContent: 'space-between' }]}>
                                                        <Text style={[GlobalStyle.orderMainText, { fontWeight: '700' }]}>Limitations:</Text>
                                                        <Text style={[GlobalStyle.orderMainText]}>{item?.limitation}</Text>
                                                    </View>
                                                    <View style={[GlobalStyle.row, { justifyContent: 'space-between', marginTop: 10 }]}>
                                                        <Text style={[GlobalStyle.orderMainText, { fontWeight: '700' }]}>Expiry:</Text>
                                                        <Text style={[GlobalStyle.orderMainText]}>Lifetime</Text>
                                                    </View>
                                                    <View style={[GlobalStyle.row, { justifyContent: 'space-between', marginTop: 10, height: 80 }]}>
                                                        <Text style={[GlobalStyle.orderMainText, { fontWeight: '700' }]}>Details:</Text>
                                                        <Text style={[GlobalStyle.orderMinText, { flex: 1, textAlign: 'right' }]}>
                                                            {/* {item?.id === 4 ? 'List 1 product for just .99 cents' : 'One time fee $99.99 per year (Upload unlimited products)'} */}
                                                            {item?.details}
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => subscribe(item)} style={[GlobalStyle.themeBtn, { marginTop: 20, flex: 1, width: '100%' }]}>
                                                        <Text style={[GlobalStyle.themeBtnText]}>Subscribe Now</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </>
                                )}
                            />
                            <StripePayment
                                amount={item?.total_price}
                                ref={stripePaymentRef}
                                callback={callback}
                            />
                        </>
                    )
                }
            </View>
        </SafeAreaView>
    )
}

export default Packages

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        borderTopColor: textColor,
        borderTopWidth: 1,
        marginVertical: 20
    }
})