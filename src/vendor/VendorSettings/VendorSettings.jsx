import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLock, faUser, faUserMinus, faUserTimes, faWallet } from '@fortawesome/free-solid-svg-icons'
import { bgColor, generalFontSize, GlobalStyle, itemBg, fontFamily, textColor, padding, windowWidth, themeColor, isDarkMode, whiteColor, minTextColor } from '../../Styles/Theme'
import VendorProfileCard from '../../Components/VendorProfileCard/VendorProfileCard'
import { useSelector } from 'react-redux'
import { authService } from '../../Services/authService'

const VendorSettings = ({ navigation }) => {
    const authData = useSelector((state) => state.auth.data)
    const userID = useSelector((state) => state.auth?.data?.id)

    const deleteAcc = () => {
        Alert.alert("Are you sure?", "Are you sure you want to delete your account?", [
            {
                text: 'Cancel'
            },
            {
                text: "Yes",
                onPress: async () => {
                    try {
                        const res = await authService.deleteAccount(userID)
                        navigation.reset({ index: 0, routes: [{ name: 'dashboard' }] })
                    }
                    catch (error) {
                    }
                }
            }
        ])
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <View style={[GlobalStyle.container, padding('top', 20)]}>
                <VendorProfileCard authData={authData} isProfile />
                <View style={[GlobalStyle.row, GlobalStyle.aic, { flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 30, gap: 20 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('vendorProfile')} style={styles.actionCard}>
                        <FontAwesomeIcon icon={faUser} color={themeColor} size={generalFontSize * 2} />
                        <Text style={styles.heading}>My Profile</Text>
                        <Text style={styles.email}>Edit your account details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('vendorWallet')} style={styles.actionCard}>
                        <FontAwesomeIcon icon={faWallet} color={themeColor} size={generalFontSize * 2} />
                        <Text style={styles.heading}>Vendor Wallet</Text>
                        <Text style={styles.email}>View your all earnings & transactions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteAcc()} style={[styles.actionCardFull]}>
                        <FontAwesomeIcon icon={faUserTimes} color={whiteColor} size={generalFontSize * 2} />
                        <Text style={[styles.heading, { marginTop: 0 }]}>Delete Account</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate('vendorChangePassword')}
                        style={styles.actionCard}
                    >
                        <FontAwesomeIcon icon={faLock} color={themeColor} size={generalFontSize * 2} />
                        <Text style={styles.heading}>Change Password</Text>
                        <Text style={styles.email}>Change your password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionCard}>
                        <FontAwesomeIcon icon={faUserMinus} color={themeColor} size={generalFontSize * 2} />
                        <Text style={styles.heading}>Delete Account</Text>
                        <Text style={styles.email}>Delete your account</Text>
                    </TouchableOpacity > */}
                </View >
            </View >
        </SafeAreaView >
    )
}

export default VendorSettings

const styles = StyleSheet.create({
    actionCard: {
        backgroundColor: itemBg,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: windowWidth / 3,
        width: (windowWidth - 60) / 2
    },
    actionCardFull: {
        backgroundColor: "#9b0000",
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        gap: 20
    },
    heading: {
        ...fontFamily('medium'),
        color: textColor,
        marginTop: 10,
        marginBottom: 3,
        fontSize: generalFontSize
    },
    email: {
        ...fontFamily("regular"),
        color: minTextColor,
        textAlign: 'center',
        marginTop: 0,
        fontSize: generalFontSize - 6
    },
})