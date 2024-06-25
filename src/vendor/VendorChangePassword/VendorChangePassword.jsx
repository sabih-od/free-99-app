import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { bgColor, GlobalStyle, margin, padding } from '../../Styles/Theme'

const VendorChangePassword = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <View style={[GlobalStyle.container, padding('top', 20)]}>
                <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }]}>
                    <Text style={[GlobalStyle.secMainHeading]}>Change Password</Text>
                </View>
                <View style={[GlobalStyle.card, margin('top', 30)]}>
                    <View style={GlobalStyle.inputCont}>
                        <Text style={GlobalStyle.inputLabel}>Current Password</Text>
                        <View style={GlobalStyle.inputContainer}>
                            <TextInput
                                style={GlobalStyle.input}
                                placeholder='Current Password'
                                placeholderTextColor={'#707070'}
                                keyboardType='default'
                                secureTextEntry={true}
                                autoCapitalize='none'
                                returnKeyType="next"
                            />
                        </View>
                    </View>
                    <View style={[GlobalStyle.inputCont, margin('top', 20)]}>
                        <Text style={GlobalStyle.inputLabel}>New Password</Text>
                        <View style={GlobalStyle.inputContainer}>
                            <TextInput
                                style={GlobalStyle.input}
                                placeholder='New Password'
                                placeholderTextColor={'#707070'}
                                keyboardType='default'
                                secureTextEntry={true}
                                autoCapitalize='none'
                                returnKeyType="next"
                            />
                        </View>
                    </View>
                    <View style={[GlobalStyle.inputCont, margin('top', 20)]}>
                        <Text style={GlobalStyle.inputLabel}>Confirm New Password</Text>
                        <View style={GlobalStyle.inputContainer}>
                            <TextInput
                                style={GlobalStyle.input}
                                placeholder='Confirm New Password'
                                placeholderTextColor={'#707070'}
                                keyboardType='default'
                                secureTextEntry={true}
                                autoCapitalize='none'
                                returnKeyType="next"
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={[GlobalStyle.themeBtn, margin('top', 30)]}>
                    <Text style={GlobalStyle.themeBtnText}>updated password</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default VendorChangePassword

const styles = StyleSheet.create({})