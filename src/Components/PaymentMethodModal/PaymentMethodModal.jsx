import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { generalFontSize, GlobalStyle, isIpad, itemBg, secondColor, windowWidth } from '../../Styles/Theme';
import React, { useEffect, useState } from 'react';

const PaymentMethodModal = ({ modalIsVisible, closeModal }) => {
    const [isModalVisible, setModalVisible] = useState(modalIsVisible);

    useEffect(() => {
        setModalVisible(modalIsVisible); // Update local state when modalIsVisible prop changes
    }, [modalIsVisible]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        closeModal(); // Call the parent's close function
    };

    return (
        <View style={{ flex: 1 }}>
            <Modal
                isVisible={isModalVisible}
                animationOutTiming={500}
                hasBackdrop={true}
                onBackdropPress={toggleModal}
                onSwipeComplete={toggleModal}
                swipeDirection="down"
                style={styles.modal}
                avoidKeyboard={true}
            >
                <View style={styles.modalContent}>
                    <View style={[styles.container]}>
                        <Text style={[GlobalStyle.mainTitle, { fontSize: generalFontSize + 4 }]}>Add New Payment Method</Text>
                        <View style={GlobalStyle.inputCont}>
                            <Text style={GlobalStyle.inputLabel}>
                                Account Holder Name
                            </Text>
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
                        <View style={GlobalStyle.inputCont}>
                            <Text style={GlobalStyle.inputLabel}>
                                Account Number
                            </Text>
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
                        <View style={GlobalStyle.inputCont}>
                            <Text style={GlobalStyle.inputLabel}>
                                Bank Name
                            </Text>
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
                        <View style={GlobalStyle.inputCont}>
                            <Text style={GlobalStyle.inputLabel}>
                                IFSC Code
                            </Text>
                            <View style={GlobalStyle.inputContainer}>
                                <TextInput
                                    style={GlobalStyle.input}
                                    placeholder='IFSC Code'
                                    placeholderTextColor={'#707070'}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={[GlobalStyle.themeBtn, { marginTop: 20 }]}>
                            <Text style={[GlobalStyle.themeBtnText]}>Add Payment Method</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default PaymentMethodModal

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        ...Platform.select({
            ios: {
                paddingBottom: 30,
            },
            android: {
                paddingBottom: 60,
            },
        }),
    },
    modal: {
        margin: 0
    },
    modalContent: {
        backgroundColor: itemBg,
        paddingHorizontal: 0,
        width: windowWidth - 40,
        minHeight: windowWidth / 2,
        paddingVertical: 20,
        borderRadius: isIpad ? 20 : 10,
        marginHorizontal: 'auto',
        maxWidth: isIpad ? windowWidth / 2 : ''
    },
});