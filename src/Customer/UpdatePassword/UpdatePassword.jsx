import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { bgColor, GlobalStyle, margin, padding } from '../../Styles/Theme'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import NotiModal from '../../Components/NotiModal/NotiModal'
import { userService } from '../../Services/userService'
import { errorToast } from '../../Utils/toast'
import { Path, Svg } from 'react-native-svg'

const UpdatePassword = ({ navigation, route }) => {
    const loading = useSelector((state) => state.user.loading);
    const [isLoading, setIsLoading] = useState(false)
    const { handleSubmit, formState: { errors }, register, setValue } = useForm()
    const [passwordVisible, setPasswordVisible] = useState(true);
    const authData = useSelector((state) => state.auth.data)

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSubmit = async (data) => {
        if (data?.password != data?.password_confirmation) {
            return errorToast(`Password doesn't match`)
        }
        try {
            const response = await userService.updatePassword(data);
            navigation.goBack()
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <NotiModal
                canHide
                modalIsVisible={loading}
                title={"Changing Password"}
            />
            <View style={[GlobalStyle.container, padding('top', 20)]}>

                <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }]}>
                    <Text style={[GlobalStyle.secMainHeading]}>Change Password</Text>
                </View>
                {/* <View style={GlobalStyle.inputCont}>
                    <Text style={GlobalStyle.inputLabel}>Confirmation Code</Text>
                    <View style={GlobalStyle.inputContainer}>
                        <TextInput
                            style={GlobalStyle.input}
                            placeholder='Confirmation Code'
                            placeholderTextColor={'#707070'}
                            keyboardType='default'
                            autoCapitalize='none'
                            {...register("code", { required: 'Code is required' })}
                            onChangeText={(value) => setValue('code', value)}
                        />
                    </View>
                    {errors.email && <Text style={{ color: 'red', marginTop: 5 }}>{errors.email.message}</Text>}
                </View> */}
                <View style={[GlobalStyle.card, margin('top', 30)]}>
                    <View style={[GlobalStyle.inputCont, , { width: Dimensions.get('window').width - 60 }]}>
                        <Text style={GlobalStyle.inputLabel}>Current Password</Text>
                        <View style={GlobalStyle.inputContainer}>
                            <TextInput
                                style={GlobalStyle.input}
                                placeholder='Current Password'
                                placeholderTextColor={'#707070'}
                                keyboardType='default'
                                secureTextEntry={passwordVisible}
                                autoCapitalize='none'
                                {...register("current_password", {
                                    required: 'Current Password is required',
                                })}
                                onChangeText={(value) => setValue('current_password', value)}
                            />
                            <TouchableOpacity
                                onPress={togglePasswordVisibility}
                                style={[GlobalStyle.showPassword, GlobalStyle.icon]}
                            >
                                <Svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M0.972166 4.625V4.628C0.955325 4.69151 0.926129 4.75109 0.886249 4.80331C0.846369 4.85553 0.796587 4.89938 0.739748 4.93235C0.68291 4.96532 0.62013 4.98676 0.554998 4.99546C0.489867 5.00415 0.423661 4.99991 0.360166 4.983C-0.0708339 4.869 0.00516611 4.372 0.00516611 4.372L0.0231662 4.31C0.0231662 4.31 0.0491662 4.226 0.0701662 4.165C0.326787 3.44549 0.704565 2.77516 1.18717 2.183C2.08417 1.089 3.59317 0 5.98817 0C8.38317 0 9.89217 1.089 10.7902 2.183C11.2728 2.77516 11.6505 3.44549 11.9072 4.165C11.9287 4.22684 11.9487 4.28919 11.9672 4.352L11.9702 4.365V4.369L11.9712 4.371C12.0029 4.49827 11.9833 4.6329 11.9167 4.74588C11.8501 4.85886 11.7417 4.94114 11.615 4.97498C11.4883 5.00883 11.3534 4.99153 11.2393 4.92681C11.1252 4.86209 11.0411 4.75513 11.0052 4.629L11.0042 4.625L10.9962 4.6C10.9395 4.42299 10.8727 4.24938 10.7962 4.08C10.5924 3.62678 10.3301 3.20217 10.0162 2.817C9.27417 1.912 8.03217 1 5.98817 1C3.94417 1 2.70317 1.912 1.96017 2.817C1.55267 3.31748 1.23312 3.88352 1.01517 4.491C1.00281 4.52711 0.991143 4.56345 0.980166 4.6L0.972166 4.625ZM3.48817 5.5C3.48817 4.83696 3.75156 4.20107 4.2204 3.73223C4.68924 3.26339 5.32513 3 5.98817 3C6.65121 3 7.28709 3.26339 7.75593 3.73223C8.22477 4.20107 8.48817 4.83696 8.48817 5.5C8.48817 6.16304 8.22477 6.79893 7.75593 7.26777C7.28709 7.73661 6.65121 8 5.98817 8C5.32513 8 4.68924 7.73661 4.2204 7.26777C3.75156 6.79893 3.48817 6.16304 3.48817 5.5Z" fill="#929292" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        {errors.current_password && <Text style={{ color: 'red' }}>{errors.current_password.message}</Text>}
                    </View>
                    <View style={[GlobalStyle.inputCont, margin('top', 20), { width: Dimensions.get('window').width - 60 }]}>
                        <Text style={GlobalStyle.inputLabel}>New Password</Text>
                        <View style={GlobalStyle.inputContainer}>
                            <TextInput
                                style={GlobalStyle.input}
                                placeholder='New Password'
                                placeholderTextColor={'#707070'}
                                keyboardType='default'
                                secureTextEntry={passwordVisible}
                                autoCapitalize='none'
                                {...register("password", {
                                    required: 'New Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    }
                                })}
                                onChangeText={(value) => setValue('password', value)}
                            />
                            <TouchableOpacity
                                onPress={togglePasswordVisibility}
                                style={[GlobalStyle.showPassword, GlobalStyle.icon]}
                            >
                                <Svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M0.972166 4.625V4.628C0.955325 4.69151 0.926129 4.75109 0.886249 4.80331C0.846369 4.85553 0.796587 4.89938 0.739748 4.93235C0.68291 4.96532 0.62013 4.98676 0.554998 4.99546C0.489867 5.00415 0.423661 4.99991 0.360166 4.983C-0.0708339 4.869 0.00516611 4.372 0.00516611 4.372L0.0231662 4.31C0.0231662 4.31 0.0491662 4.226 0.0701662 4.165C0.326787 3.44549 0.704565 2.77516 1.18717 2.183C2.08417 1.089 3.59317 0 5.98817 0C8.38317 0 9.89217 1.089 10.7902 2.183C11.2728 2.77516 11.6505 3.44549 11.9072 4.165C11.9287 4.22684 11.9487 4.28919 11.9672 4.352L11.9702 4.365V4.369L11.9712 4.371C12.0029 4.49827 11.9833 4.6329 11.9167 4.74588C11.8501 4.85886 11.7417 4.94114 11.615 4.97498C11.4883 5.00883 11.3534 4.99153 11.2393 4.92681C11.1252 4.86209 11.0411 4.75513 11.0052 4.629L11.0042 4.625L10.9962 4.6C10.9395 4.42299 10.8727 4.24938 10.7962 4.08C10.5924 3.62678 10.3301 3.20217 10.0162 2.817C9.27417 1.912 8.03217 1 5.98817 1C3.94417 1 2.70317 1.912 1.96017 2.817C1.55267 3.31748 1.23312 3.88352 1.01517 4.491C1.00281 4.52711 0.991143 4.56345 0.980166 4.6L0.972166 4.625ZM3.48817 5.5C3.48817 4.83696 3.75156 4.20107 4.2204 3.73223C4.68924 3.26339 5.32513 3 5.98817 3C6.65121 3 7.28709 3.26339 7.75593 3.73223C8.22477 4.20107 8.48817 4.83696 8.48817 5.5C8.48817 6.16304 8.22477 6.79893 7.75593 7.26777C7.28709 7.73661 6.65121 8 5.98817 8C5.32513 8 4.68924 7.73661 4.2204 7.26777C3.75156 6.79893 3.48817 6.16304 3.48817 5.5Z" fill="#929292" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
                    </View>
                    <View style={[GlobalStyle.inputCont, margin('top', 20), { width: Dimensions.get('window').width - 60 }]}>
                        <Text style={GlobalStyle.inputLabel}>Confirm New Password</Text>
                        <View style={GlobalStyle.inputContainer}>
                            <TextInput
                                style={GlobalStyle.input}
                                placeholder='Confirm Password'
                                placeholderTextColor={'#707070'}
                                keyboardType='default'
                                secureTextEntry={passwordVisible}
                                autoCapitalize='none'
                                {...register("password_confirmation", {
                                    required: 'Password confirmation is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    }
                                })}
                                onChangeText={(value) => setValue('password_confirmation', value)}
                            />
                            <TouchableOpacity
                                onPress={togglePasswordVisibility}
                                style={[GlobalStyle.showPassword, GlobalStyle.icon]}
                            >
                                <Svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M0.972166 4.625V4.628C0.955325 4.69151 0.926129 4.75109 0.886249 4.80331C0.846369 4.85553 0.796587 4.89938 0.739748 4.93235C0.68291 4.96532 0.62013 4.98676 0.554998 4.99546C0.489867 5.00415 0.423661 4.99991 0.360166 4.983C-0.0708339 4.869 0.00516611 4.372 0.00516611 4.372L0.0231662 4.31C0.0231662 4.31 0.0491662 4.226 0.0701662 4.165C0.326787 3.44549 0.704565 2.77516 1.18717 2.183C2.08417 1.089 3.59317 0 5.98817 0C8.38317 0 9.89217 1.089 10.7902 2.183C11.2728 2.77516 11.6505 3.44549 11.9072 4.165C11.9287 4.22684 11.9487 4.28919 11.9672 4.352L11.9702 4.365V4.369L11.9712 4.371C12.0029 4.49827 11.9833 4.6329 11.9167 4.74588C11.8501 4.85886 11.7417 4.94114 11.615 4.97498C11.4883 5.00883 11.3534 4.99153 11.2393 4.92681C11.1252 4.86209 11.0411 4.75513 11.0052 4.629L11.0042 4.625L10.9962 4.6C10.9395 4.42299 10.8727 4.24938 10.7962 4.08C10.5924 3.62678 10.3301 3.20217 10.0162 2.817C9.27417 1.912 8.03217 1 5.98817 1C3.94417 1 2.70317 1.912 1.96017 2.817C1.55267 3.31748 1.23312 3.88352 1.01517 4.491C1.00281 4.52711 0.991143 4.56345 0.980166 4.6L0.972166 4.625ZM3.48817 5.5C3.48817 4.83696 3.75156 4.20107 4.2204 3.73223C4.68924 3.26339 5.32513 3 5.98817 3C6.65121 3 7.28709 3.26339 7.75593 3.73223C8.22477 4.20107 8.48817 4.83696 8.48817 5.5C8.48817 6.16304 8.22477 6.79893 7.75593 7.26777C7.28709 7.73661 6.65121 8 5.98817 8C5.32513 8 4.68924 7.73661 4.2204 7.26777C3.75156 6.79893 3.48817 6.16304 3.48817 5.5Z" fill="#929292" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        {errors.password_confirmation && <Text style={{ color: 'red' }}>{errors.password_confirmation.message}</Text>}
                    </View>
                </View>
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={[GlobalStyle.themeBtn, margin('top', 30)]}
                >
                    <Text style={GlobalStyle.themeBtnText}>Change password</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default UpdatePassword

const styles = StyleSheet.create({})