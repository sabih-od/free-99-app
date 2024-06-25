import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { bgColor, generalFontSize, GlobalStyle, padding, textColor } from '../../../Styles/Theme'
import VendorProfileCard from '../../../Components/VendorProfileCard/VendorProfileCard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { authService } from '../../../Services/authService'
import NotiModal from '../../../Components/NotiModal/NotiModal'

const VendorProfile = ({ navigation }) => {

    const authData = useSelector((state) => state.auth.data)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (data) => {
        setIsLoading(!isLoading)
        try {
            await authService.logout(data);
            setIsLoading(!isLoading)
            navigation.reset({ index: 0, routes: [{ name: 'dashboard' }] })
        } catch (error) {
            console.error('Logout failed:', error);
            setIsLoading(!isLoading)
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <ScrollView>
                <View style={[GlobalStyle.container, padding('top', 20)]}>
                    {/* <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'flex-end' }]}>
                        <TouchableOpacity onPress={()=> navigation.navigate('vendorEditProfile')} style={[GlobalStyle.themeBtn, { width: 'auto', paddingHorizontal: 16 }]}>
                            <Text style={[GlobalStyle.themeBtnText, { fontSize: generalFontSize - 6 }]}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ marginTop: 20 }}>
                        <VendorProfileCard isProfile authData={authData} />
                    </View>
                    <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'flex-start', marginTop: 30 }]}>
                        <Text style={[GlobalStyle.secMainHeading]}>Communication Address</Text>
                    </View>
                    <View style={[GlobalStyle.orderBox, { flexDirection: 'column', justifyContent: 'flex-start', marginTop: 10 }]}>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%' }]}>
                            <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Address:</Text>
                            <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3 }]}>{authData?.address ?? 'No Address Provided'}</Text>
                        </View>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%' }]}>
                            <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>City:</Text>
                            <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3 }]}>{authData?.city ?? 'No City Provided'}</Text>
                        </View>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%' }]}>
                            <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>State:</Text>
                            <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3 }]}>{authData?.state?.name ?? 'No State Provided'}</Text>
                        </View>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%' }]}>
                            <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Country:</Text>
                            <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3 }]}>{authData?.country?.name ?? 'No Country Provided'}</Text>
                        </View>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%' }]}>
                            <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Postal Code:</Text>
                            <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3 }]}>{authData?.zip ?? 'No Postal Code Provided'}</Text>
                        </View>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', width: '100%' }]}>
                            <Text style={[GlobalStyle.orderMinText, { color: textColor, fontSize: generalFontSize - 3 }]}>Phone:</Text>
                            <Text style={[GlobalStyle.orderMinText, { fontSize: generalFontSize - 3 }]}>{authData?.phone ?? 'No Phone Number Provided'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={onSubmit}
                        style={[GlobalStyle.themeBtn, { marginTop: 30 }]}
                    >
                        <Text style={GlobalStyle.themeBtnText}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <NotiModal
                modalIsVisible={isLoading}
                title={'Loading'}
            />
        </SafeAreaView>
    )
}

export default VendorProfile

const styles = StyleSheet.create({})