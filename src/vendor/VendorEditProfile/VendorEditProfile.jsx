import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { bgColor, GlobalStyle, margin, padding } from '../../Styles/Theme'
import VendorProfileCard from '../../Components/VendorProfileCard/VendorProfileCard'

const VendorEditProfile = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <ScrollView>
                <View style={[GlobalStyle.container, padding('top', 20)]}>
                    <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', marginBottom: 20 }]}>
                        <Text style={[GlobalStyle.secMainHeading]}>Edit Profile</Text>
                    </View>
                    <VendorProfileCard isEdit />
                    <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', marginTop: 30 }]}>
                        <Text style={[GlobalStyle.secMainHeading]}>Personal Information</Text>
                    </View>
                    <View style={[GlobalStyle.card, margin('top', 20)]}>
                        <View style={GlobalStyle.inputCont}>
                            <Text style={GlobalStyle.inputLabel}>First Name</Text>
                            <View style={[GlobalStyle.inputContainer, margin('top', 5)]}>
                                <TextInput
                                    style={GlobalStyle.input}
                                    placeholder='First Name'
                                    placeholderTextColor={'#707070'}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                />
                            </View>
                        </View>
                        <View style={[GlobalStyle.inputCont, margin('top', 20)]}>
                            <Text style={GlobalStyle.inputLabel}>Last Name</Text>
                            <View style={[GlobalStyle.inputContainer, margin('top', 5)]}>
                                <TextInput
                                    style={GlobalStyle.input}
                                    placeholder='Last Name'
                                    placeholderTextColor={'#707070'}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                />
                            </View>
                        </View>
                        <View style={[GlobalStyle.inputCont, margin('top', 20)]}>
                            <Text style={GlobalStyle.inputLabel}>User Name</Text>
                            <View style={[GlobalStyle.inputContainer, margin('top', 5)]}>
                                <TextInput
                                    style={GlobalStyle.input}
                                    placeholder='User Name'
                                    placeholderTextColor={'#707070'}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                />
                            </View>
                        </View>
                        <View style={[GlobalStyle.inputCont, margin('top', 20)]}>
                            <Text style={GlobalStyle.inputLabel}>Gender</Text>
                            <View style={[GlobalStyle.inputContainer, margin('top', 5)]}>
                                <TextInput
                                    style={GlobalStyle.input}
                                    placeholder='Gender'
                                    placeholderTextColor={'#707070'}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                />
                            </View>
                        </View>
                        <View style={[GlobalStyle.inputCont, margin('top', 20)]}>
                            <Text style={GlobalStyle.inputLabel}>Email Address</Text>
                            <View style={[GlobalStyle.inputContainer, margin('top', 5)]}>
                                <TextInput
                                    style={GlobalStyle.input}
                                    placeholder='Email Address'
                                    placeholderTextColor={'#707070'}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                />
                            </View>
                        </View>
                        <View style={[GlobalStyle.inputCont, margin('top', 20)]}>
                            <Text style={GlobalStyle.inputLabel}>Phone Number</Text>
                            <View style={[GlobalStyle.inputContainer, margin('top', 5)]}>
                                <TextInput
                                    style={GlobalStyle.input}
                                    placeholder='Phone Number'
                                    placeholderTextColor={'#707070'}
                                    keyboardType='number-pad'
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                />
                            </View>
                        </View>
                        <View style={[GlobalStyle.inputCont, margin('top', 20)]}>
                            <Text style={GlobalStyle.inputLabel}>State</Text>
                            <View style={[GlobalStyle.inputContainer, margin('top', 5)]}>
                                <TextInput
                                    style={GlobalStyle.input}
                                    placeholder='State'
                                    placeholderTextColor={'#707070'}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                />
                            </View>
                        </View>
                        <View style={[GlobalStyle.inputCont, margin('top', 20)]}>
                            <Text style={GlobalStyle.inputLabel}>City</Text>
                            <View style={[GlobalStyle.inputContainer, margin('top', 5)]}>
                                <TextInput
                                    style={GlobalStyle.input}
                                    placeholder='City'
                                    placeholderTextColor={'#707070'}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                />
                            </View>
                        </View>
                        <View style={[GlobalStyle.inputCont, margin('top', 20)]}>
                            <Text style={GlobalStyle.inputLabel}>About Me</Text>
                            <View style={[GlobalStyle.inputContainer, margin('top', 5)]}>
                                <TextInput
                                    style={[GlobalStyle.input, { minHeight: 120 }]}
                                    placeholder='About Me'
                                    placeholderTextColor={'#707070'}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                    multiline={true}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={[GlobalStyle.themeBtn, margin('top', 30)]}>
                        <Text style={GlobalStyle.themeBtnText}>updated Profile</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default VendorEditProfile

const styles = StyleSheet.create({})