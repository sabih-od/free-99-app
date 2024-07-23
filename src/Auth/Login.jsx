import React, { useEffect, useRef, useState } from 'react';
import {
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
import { useForm } from 'react-hook-form';
import { bgColor, GlobalStyle, gap, margin, padding, textColor, secondColor, generalFontSize, isIpad, windowHeight } from '../Styles/Theme';
import Logo from '../Components/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import NotiModal from '../Components/NotiModal/NotiModal';
import { Svg, Path } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../Services/authService';

const Login = ({ navigation }) => {
    const loading = useSelector((state) => state.auth.loading);
    const [passwordVisible, setPasswordVisible] = useState(true);
    const email = useRef();
    const password = useRef();
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSubmit = async (data) => {
        try {
            const response = await authService.login(data);
            navigation.reset({ index: 0, routes: [{ name: 'dashboard' }] })
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <NotiModal
                        canHide
                        modalIsVisible={loading}
                        title={"Logging You In"}
                    />
                    <View style={[GlobalStyle.container, GlobalStyle.jc, { minHeight: windowHeight }]}>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, GlobalStyle.jc, margin("bottom", 50)]}>
                            <Logo />
                        </View>
                        <View>
                            <Text style={[GlobalStyle.mainTitle]}>
                                Login
                            </Text>
                            <Text style={[GlobalStyle.minTitle, margin('top', 10)]}>
                                Login to your account
                            </Text>
                        </View>
                        <View style={
                            [
                                GlobalStyle.row,
                                GlobalStyle.aic,
                                {
                                    flexDirection: isIpad ? 'row' : 'column',
                                    justifyContent: 'space-between',
                                },
                                isIpad ? gap(20) : null,
                                margin('bottom', '10')
                            ]
                        }>
                            <View style={GlobalStyle.inputCont}>
                                <Text style={GlobalStyle.inputLabel}>
                                    Email
                                </Text>
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
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        ref={email}
                                        onChangeText={(value) => setValue('email', value)}
                                        returnKeyType="next"
                                        onSubmitEditing={() => password.current.focus()}
                                    />
                                </View>
                                {errors.email && <Text style={{ color: 'red', marginTop: 5 }}>{errors.email.message}</Text>}
                            </View>
                            <View style={GlobalStyle.inputCont}>
                                <Text style={GlobalStyle.inputLabel}>
                                    Password
                                </Text>
                                <View style={GlobalStyle.inputContainer}>
                                    <TextInput
                                        style={GlobalStyle.input}
                                        placeholder='Enter Password'
                                        placeholderTextColor={'#707070'}
                                        keyboardType='default'
                                        secureTextEntry={passwordVisible}
                                        autoCapitalize='none'
                                        {...register("password", {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters'
                                            }
                                        })}
                                        ref={password}
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
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('forgetPassword')}
                                    style={GlobalStyle.linkCont}
                                >
                                    <Text style={GlobalStyle.link}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={GlobalStyle.inputCont}>
                                <TouchableOpacity
                                    onPress={handleSubmit(onSubmit)}
                                    style={[GlobalStyle.themeBtn]}
                                >
                                    <Text style={GlobalStyle.themeBtnText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={styles.lineCont}>
                            <View style={styles.lines}></View>
                            <Text style={[GlobalStyle.themeBtnText, GlobalStyle.altrThemeBtnText, { fontSize: generalFontSize - 3, textTransform: 'none' }]}>Or Login with</Text>
                            <View style={styles.lines}></View>
                        </View> */}
                            {/* <View style={[GlobalStyle.row, GlobalStyle.aic, GlobalStyle.jc, gap(20), margin('top', 20)]}>
                            <TouchableOpacity style={styles.iconBtn}>
                                <FontAwesomeIcon icon={faFacebookF} color={textColor} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconBtn}>
                                <FontAwesomeIcon icon={faGoogle} color={textColor} />
                            </TouchableOpacity>
                        </View> */}
                            <TouchableOpacity
                                onPress={() => navigation.replace('register')}
                                style={[GlobalStyle.row, GlobalStyle.jc, GlobalStyle.aic, { width: '100%', marginTop: 50, marginBottom: 80 }]}
                            >
                                <Text style={[
                                    GlobalStyle.themeBtnText,
                                    {
                                        fontSize: generalFontSize - 3,
                                        textTransform: 'none',
                                        color: textColor
                                    },
                                ]}>Don’t have an account?</Text>
                                <Text style={[GlobalStyle.link, { fontSize: generalFontSize - 3 }]}> Register Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    lineCont: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
        marginTop: 25
    },
    lines: {
        flex: 1,
        height: 2,
        width: '100%',
        backgroundColor: secondColor,
    },
    iconBtn: {
        borderColor: secondColor,
        borderStyle: 'solid',
        borderWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10
    }
});
