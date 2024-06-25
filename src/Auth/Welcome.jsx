import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { bgColor, GlobalStyle, gap, margin, padding, isIpad } from '../Styles/Theme'
import Logo from '../Components/Logo'
import { authService } from '../Services/authService'
import { store } from '../Redux/Store/index';
import { setLoading } from '../Redux/Store/Slices/Auth';

const Welcome = ({ navigation }) => {
    const guestAccess = async () => {
        navigation.reset({ index: 0, routes: [{ name: 'dashboard' }] })
    }

    useEffect(() => {
        store.dispatch(setLoading(false));
    }, [])
    return (
        <SafeAreaView style={{ backgroundColor: bgColor, height: "100%", flex: 1 }}>
            <View style={
                [
                    GlobalStyle.container,
                    GlobalStyle.row,
                    {
                        justifyContent: 'center',
                        flexDirection: 'column'
                    },
                    padding('top', 55)
                ]
            }>
                <View style={
                    [
                        GlobalStyle.row,
                        GlobalStyle.aic,
                        GlobalStyle.jc,
                        {
                            flexDirection: 'column',
                            margin: 'auto'
                        },
                        gap(20)
                    ]
                }>
                    <Image source={require("../../assets/images/welcome.png")} />
                    <Logo />
                </View>
                <View style={
                    [
                        GlobalStyle.row,
                        GlobalStyle.aic,
                        GlobalStyle.jc,
                        {
                            flexDirection: isIpad ? 'row' : 'column',
                            marginTop: 'auto',
                        },
                        gap(20),
                        margin('bottom', '10')
                    ]
                }>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('login')
                        }
                        style={GlobalStyle.themeBtn}
                    >
                        <Text style={GlobalStyle.themeBtnText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('register')
                        }
                        style={GlobalStyle.altrThemeBtn}
                    >
                        <Text style={[GlobalStyle.themeBtnText, GlobalStyle.altrThemeBtnText,]}>register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            guestAccess()
                        }
                        style={GlobalStyle.themeBtn}
                    >
                        <Text style={GlobalStyle.themeBtnText}>Continue as a Guest</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({})