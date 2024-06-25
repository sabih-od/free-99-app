import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { gap, generalFontSize, GlobalStyle, isIpad, itemBg, secondColor, windowWidth } from '../../Styles/Theme';
import React, { useEffect, useState } from 'react';
import { faCamera, faFile, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const ReviewModal = ({ modalIsVisible, closeModal }) => {
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
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', marginBottom: 10 }]}>
                            <Text style={[GlobalStyle.mainTitle, { fontSize: generalFontSize + 4, textAlign: 'left' }]}>Review</Text>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, gap(2)]}>
                                <FontAwesomeIcon icon={faStar} color={"#FFA161"} size={generalFontSize - 4} />
                                <FontAwesomeIcon icon={faStar} color={"#FFA161"} size={generalFontSize - 4} />
                                <FontAwesomeIcon icon={faStar} color={"#FFA161"} size={generalFontSize - 4} />
                                <FontAwesomeIcon icon={faStar} color={"#FFA161"} size={generalFontSize - 4} />
                                <FontAwesomeIcon icon={faStar} color={"#FFA161"} size={generalFontSize - 4} />
                            </View>
                        </View>
                        <Text style={[GlobalStyle.orderMinText]}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>
                        <TouchableOpacity onPress={() => toggleModal()} style={[GlobalStyle.themeBtn]}>
                            <Text style={[GlobalStyle.themeBtnText]}>Close Modal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const AddReviewModal = ({ modalIsVisible, closeModal }) => {
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
                        <Text style={[GlobalStyle.mainTitle, { fontSize: generalFontSize + 4 }]}>Add Review</Text>
                        <View style={GlobalStyle.inputCont}>
                            <Text style={GlobalStyle.inputLabel}>
                                Name
                            </Text>
                            <View style={GlobalStyle.inputContainer}>
                                <TextInput
                                    style={GlobalStyle.input}
                                    placeholder='Name'
                                    placeholderTextColor={'#707070'}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                />
                            </View>
                        </View>
                        <View style={GlobalStyle.inputCont}>
                            <Text style={GlobalStyle.inputLabel}>
                                Review
                            </Text>
                            <View style={GlobalStyle.inputContainer}>
                                <TextInput
                                    style={[GlobalStyle.input, { minHeight: 150 }]}
                                    placeholder='Address'
                                    placeholderTextColor={'#707070'}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                    multiline={true}
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => toggleModal()} style={[GlobalStyle.themeBtn, { marginTop: 20 }]}>
                            <Text style={[GlobalStyle.themeBtnText]}>Add Review</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export { ReviewModal, AddReviewModal }

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
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

})