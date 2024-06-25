import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { generalFontSize, textColor, fontFamily, isIpad, windowWidth } from '../../Styles/Theme'
import { useNavigation } from '@react-navigation/native'

const FeatureBanner = ({ img, title }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate("shop")} style={styles.bannerCont}>
            <Image style={styles.bannerImg} source={img} />
            <View style={styles.content}>
                <Text style={styles.bannerHeading}>{title}</Text>
                <TouchableOpacity>
                    <Text style={styles.buttonText}>Shop now</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default FeatureBanner

const styles = StyleSheet.create({
    bannerCont: {
        width: '100%',
        height: isIpad ? windowWidth / 2.5 : windowWidth / 2,
        borderRadius: 10,
        overflow: 'hidden'
    },
    bannerImg: {
        height: "100%",
        width: '100%',
        objectFit: 'cover',
    },
    bannerHeading: {
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 4,
        color: '#fff',
        fontWeight: '900'
    },
    buttonText: {
        color: '#fff',
        ...fontFamily('regular'),
        fontSize: generalFontSize - 3,
        textDecorationLine: 'underline'
    },
    content: {
        position: 'absolute',
        bottom: 10,
        left: 20
    }
})