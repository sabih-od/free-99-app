import { Alert, Dimensions, Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { bgColor, GlobalStyle, margin, padding } from '../Styles/Theme';
import { useForm } from 'react-hook-form';
import { authService } from '../Services/authService';
import NotiModal from '../Components/NotiModal/NotiModal';
import { useSelector } from 'react-redux';

const ForgetPassword = ({ navigation, route }) => {
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();
    const loading = useSelector((state) => state.auth.loading);
    // const title = route.params.title

    const onSubmit = async (data) => {
        try {
            const response = await authService.forgetPassword(data);
            Alert.alert("Email Sent!", `Email Sent to ${data.email} successfully.`,
                [
                    {
                        text: "Ok",
                        onPress: () => navigation.navigate('changePass', { email: data?.email })
                    }
                ],
                {
                    cancelable: false,
                    onDismiss: () => navigation.navigate('changePass')
                },
            );
        } catch (error) {
            console.error('Email failed:', error);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: bgColor, height: '100%' }}>
            <NotiModal
                canHide
                modalIsVisible={loading}
                title={"Sending Email"}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[GlobalStyle.container, GlobalStyle.row, { flexDirection: 'column' }, padding('top', 40)]}>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }]}>
                            <Text style={[GlobalStyle.secMainHeading]}>{'Forget Password'}</Text>
                        </View>
                        <View style={[GlobalStyle.card, margin('top', 30)]}>
                            <View style={[GlobalStyle.inputCont, { width: Dimensions.get('window').width - 60 }]}>
                                <Text style={GlobalStyle.inputLabel}>Email</Text>
                                <View style={GlobalStyle.inputContainer}>
                                    <TextInput
                                        style={GlobalStyle.input}
                                        placeholder='Enter Email Address'
                                        placeholderTextColor={'#707070'}
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                        {...register("email", {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Enter a valid email address'
                                            }
                                        })}
                                        onChangeText={(value) => setValue('email', value)}
                                        returnKeyType="next"
                                    />
                                </View>
                                {errors.email && <Text style={{ color: 'red', marginTop: 5 }}>{errors.email.message}</Text>}
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            style={[GlobalStyle.themeBtn, margin('top', 'auto')]}
                        >
                            <Text style={GlobalStyle.themeBtnText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ForgetPassword;

const styles = StyleSheet.create({});
