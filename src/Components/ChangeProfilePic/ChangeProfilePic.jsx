// Add these imports at the beginning of your file
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import Modal from 'react-native-modal';
import { faCamera, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ImagePicker from 'react-native-image-crop-picker';
import { PERMISSIONS, request } from 'react-native-permissions';
import { generalFontSize, itemBg, textColor, fontFamily, windowWidth, windowHeight, isIpad, GlobalStyle, secondColor } from '../../Styles/Theme';

const ChangeProfilePic = ({ modalIsVisible, closeModal, onImagePicked }) => {
    const [isModalVisible, setModalVisible] = useState(modalIsVisible);

    useEffect(() => {
        setModalVisible(modalIsVisible); // Update local state when modalIsVisible prop changes
    }, [modalIsVisible]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        closeModal(); // Call the parent's close function
    };

    const requestCameraPermission = async () => {
        try {
            if (Platform.OS === 'ios') {
                const granted = await request(PERMISSIONS.IOS.CAMERA);
                if (granted !== 'granted') {
                    return;
                }
            } else if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'This app needs access to your camera to take photos.',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    return;
                }
            }

            takePhoto();
        } catch (error) {
            console.error('Error requesting camera permission:', error);
        }
    };

    const takePhoto = async () => {
        try {
            const image = await ImagePicker.openCamera({
                mediaType: 'photo',
                forceJpg: true,
                width: 400,
                height: 400,
                compressImageMaxWidth: 400,
                compressImageMaxHeight: 400,
            });
            onImagePicked(image);
            toggleModal();
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    };

    const requestGalleryPermission = async () => {
        try {
            if (Platform.OS === 'ios') {
                let granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
                while (granted !== 'granted') {
                    granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
                    if (granted !== 'granted') {
                        Alert.alert(
                            'Permission Needed',
                            'This app needs access to your photo library to pick images. Please enable it from Settings.',
                        );
                        return;
                    }
                }
            } else if (Platform.OS === 'android') {
                let granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'Access Storage',
                        message: 'This app needs access to your storage to pick images.',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );

                while (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                        Alert.alert(
                            'Permission Needed',
                            'Storage access is required to pick images. Please enable it from settings.'
                        );
                        return;
                    } else {
                        granted = await PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                            {
                                title: 'Access Storage',
                                message: 'This app needs access to your storage to pick images.',
                                buttonNegative: 'Cancel',
                                buttonPositive: 'OK',
                            }
                        );
                    }
                }
            }

            pickImage();
        } catch (error) {
            console.error('Error requesting gallery permission:', error);
        }
    };

    const pickImage = async () => {
        try {
            const image = await ImagePicker.openPicker({
                mediaType: 'photo',
                forceJpg: true,
                width: 400,
                height: 400,
                compressImageMaxWidth: 400,
                compressImageMaxHeight: 400,
                includeBase64: true,
                compressImageQuality: 0.2,
            });
            onImagePicked(image);
            toggleModal();
        } catch (error) {
            console.error('Error picking image:', error);
        }
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
                    <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', gap: 20 }]}>
                        <TouchableOpacity onPress={requestCameraPermission} style={styles.btn}>
                            <FontAwesomeIcon icon={faCamera} color={textColor} size={generalFontSize + 30} />
                            <Text style={styles.optionText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={requestGalleryPermission} style={styles.btn}>
                            <FontAwesomeIcon icon={faFile} color={textColor} size={generalFontSize + 30} />
                            <Text style={styles.optionText}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ChangeProfilePic;

const styles = StyleSheet.create({
    modal: {
        height: windowHeight,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        margin: 0,
        ...Platform.select({
            ios: {
                shadowColor: "#fff3",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.7,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    modalContent: {
        paddingBottom: 50,
        zIndex: 1,
        backgroundColor: itemBg,
        width: windowWidth,
        padding: 20,
        borderRadius: isIpad ? 20 : 10,
        marginHorizontal: 'auto',
        maxWidth: isIpad ? windowWidth / 2 : '',
    },
    optionText: {
        color: textColor,
        ...fontFamily('regular'),
        fontSize: generalFontSize + 6,
        textTransform: 'uppercase',
        fontWeight: '700'
    },
    btn: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: itemBg,
        flex: 1,
        ...Platform.select({
            ios: {
                shadowColor: "#fff5",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
        borderRadius: 30,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
