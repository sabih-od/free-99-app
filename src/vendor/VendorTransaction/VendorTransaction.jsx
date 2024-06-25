import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { bgColor, GlobalStyle, padding, fontFamily, generalFontSize, textColor, minTextColor, margin } from '../../Styles/Theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

const VendorTransaction = () => {
    const { transactions } = useSelector((state) => state.user);
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        setTransaction(transactions?.data);
    }, [transactions])

    return (
        <SafeAreaView style={{ backgroundColor: bgColor }}>
            <ScrollView style={{ backgroundColor: bgColor, height: '100%' }}>
                <View style={[GlobalStyle.container, padding('top', 30)]}>
                    <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'flex-start' }]}>
                        <Text style={[GlobalStyle.secMainHeading]}>Transaction History</Text>
                    </View>

                    {
                        transaction?.map((item) => (
                            <View style={[GlobalStyle.card, padding("vertical", 20), margin('top', 20)]}>
                                <View style={[GlobalStyle.row, GlobalStyle.aic,{justifyContent:'space-between', marginTop: 10 }]}>
                                    <Text style={[styles.minText,{ flex:1}]}>Invoice No</Text>
                                    <Text style={[styles.mainText, {flex:1, textAlign:"right"}]}>{item?.details?.invoice_number}</Text>
                                </View>
                                <View>
                                    <View style={[GlobalStyle.row, GlobalStyle.aic,{justifyContent:'space-between', marginTop: 10 }]}>
                                        <Text style={[styles.minText,{ flex:1}]}>Paid</Text>
                                        <Text style={styles.mainText}>${item?.amount_paid}</Text>
                                    </View>
                                    <View style={[GlobalStyle.row, GlobalStyle.aic,{justifyContent:'space-between', marginTop: 10 }]}>
                                        <Text style={[styles.minText,{ flex:1}]}>Remaining</Text>
                                        <Text style={[styles.mainText, {flex:1, textAlign:"right"}]}>${item?.amount_remaining}</Text>
                                    </View>
                                    <View style={[GlobalStyle.row, GlobalStyle.aic,{justifyContent:'space-between', marginTop: 10 }]}>
                                        <Text style={[styles.minText,{ flex:1}]}>Admin Commission</Text>
                                        <Text style={[styles.mainText, {flex:1, textAlign:"right"}]}>${item?.admin_commision}</Text>
                                    </View>
                                    <View style={[GlobalStyle.row, GlobalStyle.aic,{justifyContent:'space-between', marginTop: 10 }]}>
                                        <Text style={[styles.minText,{ flex:1}]}>Total Amount</Text>
                                        <Text style={[styles.mainText, {flex:1, textAlign:"right"}]}>${item?.total_amount}</Text>
                                    </View>
                                    <View style={[GlobalStyle.row, GlobalStyle.aic,{justifyContent:'space-between', marginTop: 10 }]}>
                                        <Text style={[styles.minText,{ flex:1}]}>Status</Text>
                                        <Text style={[styles.mainText, {flex:1, textAlign:"right"}]}>{item?.status}</Text>
                                    </View>
                                    <View style={[GlobalStyle.row, GlobalStyle.aic,{justifyContent:'space-between', marginTop: 10 }]}>
                                        <Text style={[styles.minText,{ flex:1}]}>Date</Text>
                                        <Text style={[styles.mainText, {flex:1, textAlign:"right"}]}>{item?.created_at}</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    }

                    {/* <TouchableOpacity style={[GlobalStyle.themeBtn, margin('top', 30)]}>
                        <Text style={GlobalStyle.themeBtnText}>Add an Account</Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default VendorTransaction

const styles = StyleSheet.create({
    minText: {
        ...fontFamily('regular'),
        fontWeight: '400',
        fontSize: generalFontSize - 4,
        color: minTextColor,
        marginBottom: 5
    },
    mainText: {
        color: textColor,
        fontSize: generalFontSize,
        ...fontFamily('regular')
    },
    price: {
        fontSize: generalFontSize + 4,
        ...fontFamily("medium"),
        color: textColor,
        fontWeight: '600'
    }
})