import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { bgColor, GlobalStyle, margin, padding } from '../../Styles/Theme'

const VendorPayment = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <View style={[GlobalStyle.container, padding('top', 20)]}>
                <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'flex-start' }]}>
                    <Text style={[GlobalStyle.secMainHeading]}>Change Password</Text>
                </View>
                <View style={[GlobalStyle.card, margin('top', 30)]}>
                    <View style={GlobalStyle.inputCont}>
                        <Text style={GlobalStyle.inputLabel}>Account Number</Text>
                        <View style={GlobalStyle.inputContainer}>
                            <TextInput
                                style={GlobalStyle.input}
                                placeholder='Account Number'
                                placeholderTextColor={'#707070'}
                                keyboardType='default'
                                autoCapitalize='none'
                                returnKeyType="next"
                            />
                        </View>
                    </View>
                    <View style={[GlobalStyle.inputCont, margin('top', 20)]}>
                        <Text style={GlobalStyle.inputLabel}>Bank Name</Text>
                        <View style={GlobalStyle.inputContainer}>
                            <TextInput
                                style={GlobalStyle.input}
                                placeholder='Bank Name'
                                placeholderTextColor={'#707070'}
                                keyboardType='default'
                                autoCapitalize='none'
                                returnKeyType="next"
                            />
                        </View>
                    </View>
                    <View style={[GlobalStyle.inputCont, margin('top', 20)]}>
                        <Text style={GlobalStyle.inputLabel}>IFCS Code</Text>
                        <View style={GlobalStyle.inputContainer}>
                            <TextInput
                                style={GlobalStyle.input}
                                placeholder='IFCS Code'
                                placeholderTextColor={'#707070'}
                                keyboardType='default'
                                autoCapitalize='none'
                                returnKeyType="next"
                            />
                        </View>
                    </View>
                    <View style={[GlobalStyle.inputCont, margin('top', 20)]}>
                        <Text style={GlobalStyle.inputLabel}>Account Holder Name</Text>
                        <View style={GlobalStyle.inputContainer}>
                            <TextInput
                                style={GlobalStyle.input}
                                placeholder='Account Holder Name'
                                placeholderTextColor={'#707070'}
                                keyboardType='default'
                                autoCapitalize='none'
                                returnKeyType="next"
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={[GlobalStyle.themeBtn, margin('top', 30)]}>
                    <Text style={GlobalStyle.themeBtnText}>updated Payment</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default VendorPayment

const styles = StyleSheet.create({})