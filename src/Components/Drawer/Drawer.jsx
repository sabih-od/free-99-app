import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { bgColor, GlobalStyle, itemBg, secondColor, textColor, fontFamily, generalFontSize, themeColor, margin, padding } from '../../Styles/Theme'
import { useNavigation } from '@react-navigation/native';
import { authService } from '../../Services/authService';
import { useSelector } from 'react-redux';
import NotiModal from '../NotiModal/NotiModal';
import SocialLinks from '../SocialLinks/SocialLinks';

const navigations = [
    {
        name: 'home',
        url: 'dashboard'
    },
    {
        name: 'about us',
        url: 'about'
    },
    {
        name: 'shop',
        url: 'shop'
    },
    {
        name: 'contact us',
        url: 'contact'
    },
    // {
    //     name: 'user settings',
    //     url: 'settings'
    // },
]

const vendorNavigations = [
    {
        name: 'home',
        url: 'vendorHome'
    },
    {
        name: 'orders',
        url: 'vendorOrder'
    },
    {
        name: 'products',
        url: 'vendorProducts'
    },
    {
        name: "Profile",
        url: "vendorProfile"
    },
    {
        name: "Settings",
        url: 'vendorSettings'
    }
    // Add more vendor-specific navigation items as needed
];


const DrawerComp = ({ isCustomer }) => {
    const navigation = useNavigation(); // Get the navigation object
    const authData = useSelector((state) => state.auth.data)
    const [isVendor, setisVendor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (data) => {
        setIsLoading(!isLoading)
        try {
            await authService.logout(data);
            setIsLoading(!isLoading)
            navigation.reset({ index: 0, routes: [{ name: 'dashboard' }] })
        } catch (error) {
            console.error('Logout failed:', error);
            setIsLoading(!isLoading)
        }
    };

    const changeView = () => {
        navigation.reset(isCustomer ? 'vendor' : 'home');
    }

    useEffect(() => {
        if (Array.isArray(authData?.roles) && authData?.roles.length > 1) {
            setisVendor(true);
        }
    }, [authData]); // Add any relevant dependencies here

    return (
        <View style={{ backgroundColor: bgColor, height: '100%' }}>
            <View style={styles.profileCont}>
                <View style={styles.imgBox}>
                    {/* <Image style={styles.userImg} source={require('../../../assets/images/user1.jpg')} /> */}
                    <Image style={styles.userImg} source={authData?.profile_picture ? { uri: authData?.profile_picture } : { uri: 'https://free99us.com/images/no-profile-img.jpg' }} />
                    <View style={styles.imgBg}></View>
                </View>
                <Text style={styles.userName}>{authData?.name}</Text>
            </View>
            <View style={[GlobalStyle.container, padding('top', 20), { height: 'auto' }]}>
                {isCustomer && (
                    <FlatList
                        data={navigations}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.linkBtn}
                                onPress={() => navigation.navigate(item.url)} // Navigate to the specified screen
                            >
                                <Text style={styles.linkBtnText}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
                {!isCustomer && (
                    <FlatList
                        data={vendorNavigations}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.linkBtn}
                                onPress={() => navigation.navigate(item.url)} // Navigate to the specified screen
                            >
                                <Text style={styles.linkBtnText}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>

            <SocialLinks />

            <View style={styles.overlayModal}>
                {isVendor && (
                    <TouchableOpacity
                        onPress={() => {isCustomer ? navigation.reset({ index: 0, routes: [{ name: 'vendor' }] }) : navigation.reset({ index: 0, routes: [{ name: 'dashboard' }] }) }}
                        style={[GlobalStyle.themeBtn, { width: '100%' }]}
                    >
                        <Text style={GlobalStyle.themeBtnText}>
                            {isCustomer ? 'Switch to Vendor' : 'Switch to Customer'}
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    onPress={onSubmit}
                    style={[GlobalStyle.themeBtn, { width: '100%', backgroundColor: "#9b0000", }]}
                >
                    <Text style={GlobalStyle.themeBtnText}>
                        Log out
                    </Text>
                </TouchableOpacity>
            </View>
            <NotiModal
                canHide
                modalIsVisible={isLoading}
                title={"Logging Out"}
            />
        </View>
    )
}

export default DrawerComp

const styles = StyleSheet.create({
    drawerCont: {
        position: 'absolute',
        backgroundColor: bgColor,
        top: 0,
        left: 0
    },
    profileCont: {
        backgroundColor: itemBg,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        paddingBottom: 30
    },
    userImg: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    imgBg: {
        width: '105%',
        height: '100%',
        backgroundColor: themeColor,
        position: 'absolute',
        borderRadius: 100,
        zIndex: -1,
        bottom: -3,
        left: '-2.5%'
    },
    imgBox: {
        width: 66,
        height: 68,
        borderRadius: 100,
    },
    userName: {
        color: textColor,
        ...fontFamily("medium"),
        fontSize: generalFontSize - 2,
        fontWeight: '600',
        marginTop: 5
    },
    linkBtn: {
        marginTop: 20,
    },
    linkBtnText: {
        ...fontFamily("regular"),
        color: textColor,
        fontSize: generalFontSize - 2,
        textTransform: 'uppercase'
    },
    overlayModal: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: 30,
        paddingTop: 10,
        paddingHorizontal: 20,
        gap: 10,
        flex: 1,
        width: '100%',
        zIndex: 111
    },
})