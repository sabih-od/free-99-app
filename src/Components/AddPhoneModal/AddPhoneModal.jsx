import React, { useEffect, useState, useRef } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Modal from "react-native-modal";
import { useForm } from 'react-hook-form';
import { generalFontSize, GlobalStyle, isIpad, itemBg, secondColor, themeColor, windowWidth } from '../../Styles/Theme';
import { useSelector } from 'react-redux';
import { authService } from '../../Services/authService';

const AddPhoneModal = ({ modalIsVisible, closeModal }) => {
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();
    const [isModalVisible, setModalVisible] = useState(modalIsVisible);
    const authData = useSelector((state) => state.auth.data);
    const loading = useSelector((state) => state.auth.loading)
    const phoneRef = useRef();

    useEffect(() => {
        setModalVisible(modalIsVisible); // Update local state when modalIsVisible prop changes
    }, [modalIsVisible]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        closeModal(); // Call the parent's close function
    };

    const onSubmit = async (data) => {
        const formData = new FormData()

        formData.append('_method', 'PUT');
        formData.append('name', authData?.name);
        formData.append('email', authData?.email);
        formData.append('phone', data.phone);

        try {
            const response = await authService.updateProfile(formData);
            toggleModal(); // Close modal after successful submission
        } catch (error) {
            console.error('Phone Number update failed:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <Modal
                            isVisible={isModalVisible}
                            hasBackdrop={true}
                            onBackdropPress={toggleModal}
                            onSwipeComplete={toggleModal}
                            swipeDirection="down"
                            style={styles.modal}
                            avoidKeyboard={true}
                            animationIn={'fadeIn'}
                            animationOut={"fadeOut"}
                        >
                            <View style={styles.modalContent}>
                                {loading ? (
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <ActivityIndicator
                                            color={themeColor}
                                            size={'large'}
                                        />
                                    </View>
                                ) :
                                    (
                                        <ScrollView style={styles.container}>
                                            <Text style={[GlobalStyle.mainTitle, { fontSize: generalFontSize + 4 }]}>Add Phone Number</Text>
                                            <View style={GlobalStyle.inputCont}>
                                                <Text style={GlobalStyle.inputLabel}>
                                                    Phone Number
                                                </Text>
                                                <View style={GlobalStyle.inputContainer}>
                                                    <TextInput
                                                        style={GlobalStyle.input}
                                                        placeholder='Phone Number'
                                                        placeholderTextColor={'#707070'}
                                                        keyboardType='number-pad'
                                                        autoCapitalize='none'
                                                        returnKeyType="done"
                                                        defaultValue={authData?.phone ?? ''}
                                                        {...register("phone", { required: 'Phone Number is required', value: authData?.phone ?? '' })}
                                                        ref={phoneRef}
                                                        onChangeText={(value) => setValue('phone', value)}
                                                    />
                                                </View>
                                                {errors.phone && <Text style={{ color: 'red' }}>{errors.phone.message}</Text>}
                                            </View>
                                            <TouchableOpacity style={[GlobalStyle.themeBtn, { marginTop: 20 }]} onPress={handleSubmit(onSubmit)}>
                                                <Text style={GlobalStyle.themeBtnText}>Add Phone Number</Text>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    )
                                }
                            </View>
                        </Modal>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default AddPhoneModal;

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
        width: '100%',
        minHeight: windowWidth / 2,
        paddingVertical: 20,
        borderRadius: isIpad ? 20 : 10,
        marginHorizontal: 'auto',
        maxWidth: isIpad ? windowWidth / 2 : ''
    },
});
