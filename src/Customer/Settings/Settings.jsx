import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { bgColor, generalFontSize, GlobalStyle, margin, padding, textColor, whiteColor } from '../../Styles/Theme';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { authService } from '../../Services/authService';
import { useSelector } from 'react-redux';
import NotiModal from '../../Components/NotiModal/NotiModal';

const Settings = () => {
    const navigation = useNavigation();
    const userID = useSelector((state) => state.auth?.data?.id)
    const loading = useSelector((state) => state.auth.loading)

    const deleteAcc = () => {
        Alert.alert("Are you sure?", "Are you sure you want to delete your account?", [
            {
                text: 'Cancel'
            },
            {
                text: "Yes",
                onPress: async () => {
                    try {
                        const res = await authService.deleteAccount(userID)
                        navigation.reset({ index: 0, routes: [{ name: 'dashboard' }] })
                    }
                    catch (error) {
                    }
                }
            }
        ])
    }

    return (
        <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
            <NotiModal
                modalIsVisible={loading}
                title={"Deleting Account"}
            />
            <View style={[GlobalStyle.container, padding('top', 30)]}>
                <Text style={styles.mainHeading}>Settings</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('userInfo')}
                    style={[GlobalStyle.row, GlobalStyle.aic, styles.optionBox, GlobalStyle.card, padding('vertical', 10)]}
                >
                    <View>
                        <Text style={styles.optionText}>Personal Information</Text>
                    </View>
                    <FontAwesomeIcon icon={faChevronRight} color={textColor} size={generalFontSize} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('updatePaasword', { title: 'Change Password' })}
                    style={[GlobalStyle.row, GlobalStyle.aic, styles.optionBox, GlobalStyle.card, padding('vertical', 10), { marginTop: 10 }]}
                >
                    <View>
                        <Text style={styles.optionText}>Change Password</Text>
                    </View>
                    <FontAwesomeIcon icon={faChevronRight} color={textColor} size={generalFontSize} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => deleteAcc()}
                    style={[GlobalStyle.row, GlobalStyle.aic, styles.optionBox, GlobalStyle.card, padding('vertical', 10), margin("top", 20), { backgroundColor: '#9b0000' }]}
                >
                    <View>
                        <Text style={[styles.optionText, { color: whiteColor }]}>Delete Account</Text>
                    </View>
                    <FontAwesomeIcon icon={faChevronRight} color={textColor} size={generalFontSize} />
                </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('notiSetting')}
                    style={[GlobalStyle.row, GlobalStyle.aic, styles.optionBox, GlobalStyle.card, padding('vertical', 10), { marginTop: 10 }]}
                >
                    <View>
                        <Text style={styles.optionText}>Notification Settings</Text>
                    </View>
                    <FontAwesomeIcon icon={faChevronRight} color={textColor} size={generalFontSize} />
                </TouchableOpacity> */}
                
            </View>
        </SafeAreaView >
    );
};

export default Settings;

const styles = StyleSheet.create({
    mainHeading: {
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 8,
        fontWeight: '900',
        marginBottom: 20,
        color: textColor
    },
    optionBox: {
        justifyContent: 'space-between',
    },
    optionText: {
        color: textColor,
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 2,
        marginBottom: 6,
    },
});
