import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Modal from "react-native-modal";
import { useForm } from 'react-hook-form';
import { generalFontSize, GlobalStyle, isIpad, itemBg, secondColor, themeColor, windowWidth } from '../../Styles/Theme';
import { useSelector } from 'react-redux';
import CustomSelect from '../CustomSelect/CustomSelect';
import { authService } from '../../Services/authService';
import NotiModal from '../NotiModal/NotiModal';

const AddressModal = ({ modalIsVisible, closeModal }) => {
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();
    const [isModalVisible, setModalVisible] = useState(modalIsVisible);
    const authData = useSelector((state) => state.auth.data);
    const countryData = useSelector((state) => state.countryState.countries);
    const statesData = useSelector((state) => state.countryState.states);
    const loading = useSelector((state) => state.auth.loading)
    const [showLoading, setShowLoading] = useState(loading)

    const addressRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const countryRef = useRef();
    const zipCodeRef = useRef();

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
        formData.append('address', data.address);
        formData.append('city', data.city);
        formData.append('state_id', data.state_id ?? authData?.state_id);
        formData.append('zip', data.zipCode);
        formData.append('country', data.country ?? authData?.country?.id);

        try {
            const response = await authService.updateProfile(formData);
            toggleModal(); // Close modal after successful submission
        } catch (error) {
            console.error('Profile update failed:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
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
                            {/* {loading ? (
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator
                                        color={themeColor}
                                        size={'large'}
                                    />
                                </View>
                            )
                                : */}
                                (
                                    <ScrollView style={styles.container}>
                                        <Text style={[GlobalStyle.mainTitle, { fontSize: generalFontSize + 4 }]}>Add New Address</Text>

                                        <View style={GlobalStyle.inputCont}>
                                            <Text style={GlobalStyle.inputLabel}>Address</Text>
                                            <View style={GlobalStyle.inputContainer}>
                                                <TextInput
                                                    style={GlobalStyle.input}
                                                    placeholder='Address'
                                                    placeholderTextColor={'#707070'}
                                                    keyboardType='default'
                                                    autoCapitalize='none'
                                                    returnKeyType="next"
                                                    defaultValue={authData?.address ?? ''}
                                                    {...register("address", { required: 'Address is required', value: authData?.address ?? '' })}
                                                    ref={addressRef}
                                                    onChangeText={(value) => setValue('address', value)}
                                                    onSubmitEditing={() => cityRef.current.focus()}
                                                />
                                            </View>
                                            {errors.address && <Text style={{ color: 'red', marginTop: 5 }}>{errors.address.message}</Text>}
                                        </View>
                                        <View style={GlobalStyle.inputCont}>
                                            <Text style={GlobalStyle.inputLabel}>City</Text>
                                            <View style={GlobalStyle.inputContainer}>
                                                <TextInput
                                                    style={GlobalStyle.input}
                                                    placeholder='City'
                                                    placeholderTextColor={'#707070'}
                                                    keyboardType='default'
                                                    autoCapitalize='none'
                                                    returnKeyType="next"
                                                    defaultValue={authData?.city ?? ''}
                                                    {...register("city", { required: 'City is required', value: authData?.city ?? '' })}
                                                    ref={cityRef}
                                                    onChangeText={(value) => setValue('city', value)}
                                                    onSubmitEditing={() => zipCodeRef.current.focus()}
                                                />
                                            </View>
                                            {errors.city && <Text style={{ color: 'red', marginTop: 5 }}>{errors.city.message}</Text>}
                                        </View>
                                        <View style={GlobalStyle.inputCont}>
                                            <Text style={GlobalStyle.inputLabel}>State</Text>
                                            <CustomSelect
                                                data={statesData.data}
                                                currentStatus={authData?.state?.name ?? "Please Select From Below"}
                                                onValueChange={(value) => setValue('state_id', value)}
                                            />
                                            {errors.state && <Text style={{ color: 'red', marginTop: 5 }}>{errors.state.message}</Text>}
                                        </View>
                                        <View style={GlobalStyle.inputCont}>
                                            <Text style={GlobalStyle.inputLabel}>Country</Text>
                                            <CustomSelect
                                                data={countryData}
                                                currentStatus={authData?.country?.name ?? "Please Select From Below"}
                                                onValueChange={(value) => setValue('country', value)}
                                            />
                                            {errors.country && <Text style={{ color: 'red', marginTop: 5 }}>{errors.country.message}</Text>}
                                        </View>
                                        <View style={GlobalStyle.inputCont}>
                                            <Text style={GlobalStyle.inputLabel}>Zip Code</Text>
                                            <View style={GlobalStyle.inputContainer}>
                                                <TextInput
                                                    style={GlobalStyle.input}
                                                    placeholder='Zip Code'
                                                    placeholderTextColor={'#707070'}
                                                    keyboardType='number-pad'
                                                    autoCapitalize='none'
                                                    returnKeyType="done"
                                                    defaultValue={authData?.zip ?? ''}
                                                    {...register("zipCode", {
                                                        required: 'Zip Code is required',
                                                        value: authData?.zip ?? '',
                                                        validate: value => {
                                                            if (!/^\d{5}$/.test(value)) {
                                                                return 'Zip Code must be 5 digits';
                                                            }
                                                            return true;
                                                        }
                                                    })}
                                                    ref={zipCodeRef}
                                                    onChangeText={(value) => setValue('zipCode', value)}
                                                />
                                            </View>
                                            {errors.zipCode && <Text style={{ color: 'red', marginTop: 5 }}>{errors.zipCode.message}</Text>}
                                        </View>
                                        <TouchableOpacity style={[GlobalStyle.themeBtn, { marginTop: 20 }]} onPress={handleSubmit(onSubmit)}>
                                            <Text style={[GlobalStyle.themeBtnText]}>Add Address</Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                )
                            {/* } */}
                        </View>
                    </Modal>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AddressModal;

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
        width: windowWidth,
        minHeight: windowWidth / 2,
        paddingVertical: 20,
        borderRadius: isIpad ? 20 : 10,
        marginHorizontal: 'auto',
        maxWidth: isIpad ? windowWidth / 2 : ''
    },
});
