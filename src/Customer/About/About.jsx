import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { generalFontSize, GlobalStyle, textColor, fontFamily, padding, margin, bgColor } from '../../Styles/Theme'

const About = () => {
    return (
        <SafeAreaView style={{ backgroundColor: bgColor, height: '100%' }}>
            <View style={[GlobalStyle.container, padding("top", 30)]}>
                <Text style={styles.mainHeading}>About Us</Text>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
                <Text style={[styles.description, margin('top', 20)]}>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default About

const styles = StyleSheet.create({
    mainHeading: {
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 8,
        fontWeight: '900',
        marginBottom: 20,
        color: textColor
    },
    description: {
        color: textColor,
        ...fontFamily("regular"),
        fontSize: generalFontSize - 4,
        lineHeight: 25
    }
})