import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { generalFontSize, GlobalStyle, textColor, fontFamily, gap, isDarkMode, whiteColor, isIpad } from '../../Styles/Theme'

const ProfileHorizontalView = ({ user }) => {
    const [imgLoading, setImgLoading] = useState(false)
    return (
        <View style={[styles.profileCont, GlobalStyle.row, GlobalStyle.aic, gap(20)]}>
            {/* <Image
                style={styles.profileImg}
                source={user?.profile_picture ? { uri: user?.profile_picture, cache: 'only-if-cached' } : { uri: 'https://free99us.com/images/no-profile-img.jpg', cache: 'only-if-cached' }}
            /> */}
            <View style={styles.imgBackground}>
                <Image
                    source={
                        user?.profile_picture !== '' ?
                            { uri: user?.profile_picture, cache: 'force-cache' } :
                            { uri: 'https://free99us.com/images/no-profile-img.jpg', cache: 'force-cache' }
                    }
                    onLoad={() => { setImgLoading(!imgLoading) }}
                    onLoadEnd={() => { setImgLoading(!imgLoading) }}
                    style={styles.profileImg}
                />
                {imgLoading ? (<ActivityIndicator color={whiteColor} size={'small'} />) : ''}
            </View>
            <View>
                <Text style={styles.profileName}>{user?.name}</Text>
                <Text style={styles.profileEmail}>{user?.email}</Text>
            </View>
        </View>
    )
}

export default ProfileHorizontalView

const styles = StyleSheet.create({
    profileImg: {
        width: "100%",
        height: "100%",
    },
    profileName: {
        color: textColor,
        fontSize: generalFontSize + 4,
        fontWeight: '900',
        fontFamily: 'FreightBigPro-Bold',
    },
    profileEmail: {
        color: textColor,
        fontSize: generalFontSize - 4,
        fontWeight: '400',
        ...fontFamily('regular'),
        marginTop: 2
    },
    imgBackground: {
        width: isIpad ? 130 : 64,
        height: isIpad ? 130 : 64,
        borderRadius: 100,
        backgroundColor: '#333',
        ...Platform.select({
            ios: {
                shadowColor: "#fff5",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
        overflow: 'hidden'
    }
})