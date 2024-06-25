import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Modal from "react-native-modal";
import { generalFontSize, GlobalStyle, isIpad, itemBg, secondColor, windowWidth } from '../../Styles/Theme';
import React, { useEffect, useState } from 'react';

const NotiModal = ({ modalIsVisible, title, canHide }) => {
    const [isModalVisible, setModalVisible] = useState(modalIsVisible);

    useEffect(() => {
        setModalVisible(modalIsVisible); // Update local state when modalIsVisible prop changes
    }, [modalIsVisible]);

    const toggleModal = () => {
        if (!canHide) {
            setModalVisible(!isModalVisible);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Modal
                isVisible={isModalVisible}
                animationOutTiming={500}
                hasBackdrop={true}
                onBackdropPress={null} // Enable or disable based on canHide
                onSwipeComplete={null} // Enable or disable based on canHide
                swipeDirection="down"
                style={styles.modal}
                avoidKeyboard={true}
            >
                <View style={styles.modalContent}>
                    <Text style={[GlobalStyle.mainTitle, { fontSize: generalFontSize + 4 }]}>{title}</Text>
                </View>
            </Modal>
        </View>
    );
};

export default NotiModal;

const styles = StyleSheet.create({
    modal: {
        margin: 0
    },
    modalContent: {
        backgroundColor: itemBg,
        paddingHorizontal: 0,
        width: windowWidth - 40,
        paddingVertical: 20,
        borderRadius: isIpad ? 20 : 10,
        marginHorizontal: 'auto',
        maxWidth: isIpad ? windowWidth / 2 : ''
    },
});
