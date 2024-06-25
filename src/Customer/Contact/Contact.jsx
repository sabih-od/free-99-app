import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { bgColor, generalFontSize, GlobalStyle, margin, padding, textColor } from '../../Styles/Theme'

const Contact = () => {
    return (
        <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
            <View style={[GlobalStyle.container, padding('top', 30)]}>
                <Text style={styles.mainHeading}>Contact Us For Any Questions</Text>
                <TextInput
                    style={GlobalStyle.input}
                    placeholder={'Your Name'}
                    placeholderTextColor={'#828282'}
                    keyboardType='default'
                />
                <TextInput
                    style={[GlobalStyle.input, margin('top', 20)]}
                    placeholder={'Your Email'}
                    placeholderTextColor={'#828282'}
                    keyboardType='email-address'
                />
                <TextInput
                    style={[GlobalStyle.input, margin('top', 20)]}
                    placeholder={'Phone Number'}
                    placeholderTextColor={'#828282'}
                    keyboardType='number-pad'
                />
                <TextInput
                    style={[GlobalStyle.input, margin('top', 20)]}
                    placeholder={'Company'}
                    placeholderTextColor={'#828282'}
                    keyboardType='default'
                />
                <TextInput
                    style={[GlobalStyle.input, margin('top', 20), { minHeight: 120 }]}
                    placeholder={'Message'}
                    placeholderTextColor={'#828282'}
                    keyboardType='default'
                    multiline={true}
                />
                <TouchableOpacity style={[GlobalStyle.themeBtn, margin("top", 20)]}>
                    <Text style={GlobalStyle.themeBtnText}>ask a question</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Contact

const styles = StyleSheet.create({
    mainHeading: {
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 8,
        fontWeight: '900',
        marginBottom: 20,
        color: textColor
    },
})