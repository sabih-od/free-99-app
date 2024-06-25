import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { bgColor, gap, generalFontSize, GlobalStyle, isDarkMode, isIpad, margin, padding, textColor, whiteColor, windowHeight } from '../../Styles/Theme';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';
import ChangeProfilePic from '../../Components/ChangeProfilePic/ChangeProfilePic';
import { useForm } from 'react-hook-form';
import CustomSelect from '../../Components/CustomSelect/CustomSelect';
import { authService } from '../../Services/authService';
import NotiModal from '../../Components/NotiModal/NotiModal';

const UserInfo = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(false);
    const loading = useSelector((state) => state.auth.loading);
    const [isLoading, setisLoading] = useState(false);
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();
    const nameref = useRef();
    const emailref = useRef();
    const phoneref = useRef();
    const addressRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const zipCodeRef = useRef();
    const countryData = useSelector((state) => state.countryState.countries);
    const statesData = useSelector((state) => state.countryState.states);

    const authData = useSelector((state) => state.auth.data);
    const [profilePicture, setProfilePicture] = useState();
    const [profileImgPath, setProfileImgPath] = useState(authData?.profile_picture != '' ? authData?.profile_picture : '');


    const closeModal = () => {
        setIsVisible(!isVisible);
    };

    const updateProfilePicture = (newProfilePicture) => {
        setProfilePicture(newProfilePicture);
        setProfileImgPath(newProfilePicture.path);
    };

    useEffect(() => {
        // Initialize form values
        setValue('name', authData?.name ?? '');
        setValue('email', authData?.email ?? '');
        setValue('phone', authData?.phone ?? '');
        setValue('address', authData?.address ?? '');
        setValue('city', authData?.city ?? '');
        setValue('state_id', authData?.state_id ?? '');
        setValue('zipCode', authData?.zip ?? '');
        setValue('country', authData?.country?.id ?? '');
    }, [authData, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append('_method', 'PUT');
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('city', data.city);
        formData.append('state_id', data.state_id ?? authData?.state_id);
        formData.append('zip', data.zipCode);
        formData.append('country', data.country ?? authData?.country?.id);

        if (profilePicture) {
            formData.append('image', {
                uri: Platform.OS === 'ios' ? profilePicture.path.replace('file://', '') : profilePicture.path,
                type: profilePicture.mime,
                name: profilePicture.filename || `photo.${profilePicture.mime.split('/')[1]}`,
            });
        }


        try {
            const response = await authService.updateProfile(formData);
            navigation.navigate('home');
        } catch (error) {
            console.error('Profile update failed:', error);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
            <NotiModal title={"Loading"} modalIsVisible={loading} />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <ScrollView>
                    <View style={[GlobalStyle.container, { minHeight: windowHeight, paddingTop: 30 }]}>
                        <Text style={styles.mainHeading}>Personal Information</Text>
                        <View style={[GlobalStyle.inputCont]}>
                            <Text style={GlobalStyle.inputLabel}>Profile Picture</Text>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { gap: 10 }]}>
                                <Image
                                    source={
                                        profileImgPath !== '' ?
                                            { uri: profileImgPath } :
                                            { uri: 'https://free99us.com/images/no-profile-img.jpg', cache: 'force-cache' }
                                    }
                                    style={styles.profileImg}
                                />
                                <TouchableOpacity style={[GlobalStyle.input, { flex: 1 }]} onPress={() => setIsVisible(true)}>
                                    <Text style={GlobalStyle.inputText}>Click to change Profile Picture</Text>
                                </TouchableOpacity>
                            </View>
                            <ChangeProfilePic
                                closeModal={closeModal}
                                modalIsVisible={isVisible}
                                onImagePicked={updateProfilePicture}
                            />
                        </View>
                        <View style={
                            [
                                GlobalStyle.row,
                                {
                                    flexDirection: isIpad ? 'row' : 'column',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap'
                                },
                                isIpad ? gap(20) : null,
                                margin('bottom', '100')
                            ]
                        }>
                            <View style={[GlobalStyle.inputCont]}>
                                <Text style={GlobalStyle.inputLabel}>Full Name</Text>
                                <View style={GlobalStyle.inputContainer}>
                                    <TextInput
                                        style={GlobalStyle.input}
                                        placeholder='Full Name'
                                        placeholderTextColor={'#707070'}
                                        keyboardType='default'
                                        autoCapitalize='none'
                                        returnKeyType="next"
                                        defaultValue={authData?.name ?? ''}
                                        {...register("name", { required: 'Name is required', value: authData?.name ?? '' })}
                                        ref={nameref}
                                        onChangeText={(value) => setValue('name', value)}
                                        onSubmitEditing={() => emailref.current.focus()}
                                    />
                                </View>
                                {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
                            </View>
                            <View style={[GlobalStyle.inputCont]}>
                                <Text style={GlobalStyle.inputLabel}>Email Address</Text>
                                <View style={GlobalStyle.inputContainer}>
                                    <TextInput
                                        editable={false}
                                        style={GlobalStyle.input}
                                        placeholder='Email Address'
                                        placeholderTextColor={'#707070'}
                                        keyboardType='default'
                                        autoCapitalize='none'
                                        returnKeyType="next"
                                        defaultValue={authData?.email ?? ''}
                                        {...register("email", { required: 'Email is required', value: authData?.email ?? '' })}
                                        ref={emailref}
                                        onChangeText={(value) => setValue('email', value)}
                                        onSubmitEditing={() => phoneref.current.focus()}
                                    />
                                </View>
                                {errors.email && <Text style={{ color: 'red', marginTop: 5 }}>{errors.email.message}</Text>}
                            </View>
                            <View style={[GlobalStyle.inputCont]}>
                                <Text style={GlobalStyle.inputLabel}>Phone Number</Text>
                                <View style={GlobalStyle.inputContainer}>
                                    <TextInput
                                        style={GlobalStyle.input}
                                        placeholder='Phone Number'
                                        placeholderTextColor={'#707070'}
                                        keyboardType='number-pad'
                                        autoCapitalize='none'
                                        returnKeyType="next"
                                        defaultValue={authData?.phone ?? ''}
                                        {...register("phone", { value: authData?.phone ?? '' })}
                                        ref={phoneref}
                                        onChangeText={(value) => setValue('phone', value)}
                                    />
                                </View>
                                {errors.phone && <Text style={{ color: 'red' }}>{errors.phone.message}</Text>}
                            </View>
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
                                        {...register("address", { value: authData?.address ?? '' })}
                                        ref={addressRef}
                                        onChangeText={(value) => setValue('address', value)}
                                        onSubmitEditing={() => cityRef.current.focus()}
                                    />
                                </View>
                                {errors.address && <Text style={{ color: 'red' }}>{errors.address.message}</Text>}
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
                                        {...register("city", { value: authData?.city ?? '' })}
                                        ref={cityRef}
                                        onChangeText={(value) => setValue('city', value)}
                                        onSubmitEditing={() => zipCodeRef.current.focus()}
                                    />
                                </View>
                                {errors.city && <Text style={{ color: 'red' }}>{errors.city.message}</Text>}
                            </View>
                            <View style={GlobalStyle.inputCont}>
                                <Text style={GlobalStyle.inputLabel}>State</Text>
                                <CustomSelect
                                    data={statesData.data}
                                    currentStatus={authData?.state?.name ?? "Please Select From Below"}
                                    onValueChange={(value) => setValue('state_id', value)}
                                />
                                {errors.state && <Text style={{ color: 'red' }}>{errors.state.message}</Text>}
                            </View>
                            <View style={GlobalStyle.inputCont}>
                                <Text style={GlobalStyle.inputLabel}>Country</Text>
                                <CustomSelect
                                    data={countryData}
                                    currentStatus={authData?.country?.name ?? "Please Select From Below"}
                                    onValueChange={(value) => setValue('country', value)}
                                />
                                {errors.country && <Text style={{ color: 'red' }}>{errors.country.message}</Text>}
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
                                            // required: 'Zip Code is required',
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
                                {errors.zipCode && <Text style={{ color: 'red' }}>{errors.zipCode.message}</Text>}
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={[GlobalStyle.themeBtn, margin('top', 30)]} onPress={handleSubmit(onSubmit)}>
                                <Text style={GlobalStyle.themeBtnText}>Update Information</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default UserInfo;

const styles = StyleSheet.create({
    mainHeading: {
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 8,
        fontWeight: '900',
        marginBottom: 20,
        color: textColor
    },
    profileImg: {
        width: 90,
        height: 90,
        borderRadius: 100,
        backgroundColor: '#333',
        ...Platform.select({
            ios: {
                shadowColor: "#fff5",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    }
});
