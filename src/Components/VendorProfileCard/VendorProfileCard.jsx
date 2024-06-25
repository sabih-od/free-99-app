import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { generalFontSize, GlobalStyle, itemBg, minTextColor, fontFamily, margin } from '../../Styles/Theme'
import { useSelector } from 'react-redux'

const VendorProfileCard = ({ isProfile, isEdit, authData }) => {

    return (
        <View style={[styles.profileCard, , isProfile ? [styles.profileCard2, { paddingHorizontal: 20 }] : null, { gap: 20 }]}>
            <View style={[GlobalStyle.row, { gap: 20 }, GlobalStyle.aic]}>
                <Image
                    source={
                        authData?.profile_picture !== '' ?
                            { uri: authData?.profile_picture, cache: 'force-cache' } :
                            { uri: 'https://free99us.com/images/no-profile-img.jpg', cache: 'force-cache' }
                    }
                    style={[styles.image, isProfile ? styles.profileImg : null]}
                />
                {isEdit && (
                    <View style={styles.btnCont}>
                        <TouchableOpacity style={[GlobalStyle.themeBtn, { paddingHorizontal: 20 }]}>
                            <Text style={[GlobalStyle.themeBtnText, { fontSize: generalFontSize - 4 }]}>upload image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[GlobalStyle.themeBtn, { paddingHorizontal: 20, backgroundColor: "#961109" }]}>
                            <Text style={[GlobalStyle.themeBtnText, { fontSize: generalFontSize - 4 }]}>Delete iamge</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {!isEdit && (
                    <View>
                        <Text style={GlobalStyle.secMainHeading}>
                            {authData?.name}
                        </Text>
                        <Text style={[styles.email, isProfile ? { marginTop: 0 } : null]}>{authData?.email}</Text>
                    </View>
                )}
            </View>
            {/* {isProfile && (
                <View>
                    <Text style={[styles.email, { marginTop: 0 }]}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </Text>
                </View>
            )} */}
        </View>
    )
}

export default VendorProfileCard

const styles = StyleSheet.create({
    profileCard: {
        backgroundColor: itemBg,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    profileCard2: {

    },
    // profileImg: {
    //     marginTop: -45
    // },
    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
        backgroundColor: '#333'
    },
    email: {
        fontSize: generalFontSize - 4,
        ...fontFamily("regular"),
        color: minTextColor,
        marginTop: 10
    },
    btnCont: {
        gap: 10,
        flex: 1
    }
})