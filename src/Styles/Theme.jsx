import { StyleSheet, Appearance, Platform, Dimensions, useColorScheme } from 'react-native';

Appearance.setColorScheme('light')
const colorScheme = Appearance.getColorScheme();
export const isDarkMode = colorScheme === 'dark'
export const windowHeight = Dimensions.get("window").height
export const windowWidth = Dimensions.get("window").width

export const isIpad = windowWidth > 700 ? true : false;

export const themeColor = '#307504';
export const whiteColor = '#ffffff';
export const blackColor = '#000000';

export const textColor = '#F9F9F9'
export const secondColor = '#666666'
export const minTextColor = '#929292'
export const bgColor = '#000'
export const itemBg = '#131313'

export const generalFontSize = isIpad ? 24 : 16;

export const gap = (value) => {
    return {
        gap: value,
    };
};

export const margin = (position, value) => {
    return {
        [`margin${position.charAt(0).toUpperCase() + position.slice(1)}`]: value,
    };
};

export const padding = (position, value) => {
    return {
        [`padding${position.charAt(0).toUpperCase() + position.slice(1)}`]: value,
    };
};

export const fontFamily = (weight) => {
    const capitalizedWeight = weight.charAt(0).toUpperCase() + weight.slice(1);
    return {
        fontFamily: `Poppins-${capitalizedWeight}`,
    };
};

export const GlobalStyle = StyleSheet.create({
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
        backgroundColor: bgColor,
        height: '100%',
    },
    minTitle: {
        ...fontFamily('regular'),
        color: textColor,
        fontSize: generalFontSize,
        fontWeight: '500',
        lineHeight: isIpad ? 36 : generalFontSize,
        textAlign: 'center',
        marginTop: 5
    },
    mainTitle: {
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 20,
        textAlign: 'center',
        color: textColor,
    },
    row: {
        flexDirection: 'row',
    },
    aic: {
        alignItems: 'center',
    },
    jc: {
        justifyContent: 'center',
    },
    bgImage: {
        position: 'absolute',
        bottom: 20,
        right: 0
    },
    themeBtn: {
        backgroundColor: themeColor,
        width: isIpad ? (windowWidth / 2) - 40 : windowWidth - 40,
        paddingVertical: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        borderRadius: 10,
        marginHorizontal: 'auto'
    },
    themeBtnText: {
        ...fontFamily('regular'),
        color: whiteColor,
        fontSize: generalFontSize + 2,
        textTransform: 'uppercase'
    },
    altrThemeBtn: {
        backgroundColor: 'transparent',
        width: isIpad ? (windowWidth / 2) - 40 : windowWidth - 40,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: textColor,
        borderWidth: 2,
        borderStyle: 'solid',
        ...Platform.select({
            ios: {
                shadowColor: blackColor,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
                backgroundColor: bgColor
            },
        }),
        borderRadius: 10
    },
    altrThemeBtnText: {
        ...fontFamily('regular'),
        fontSize: generalFontSize + 2,
        textTransform: 'uppercase',
        color: textColor
    },
    inputCont: {
        marginTop: 15,
        position: 'relative',
        width: isIpad ? (windowWidth / 2) - 40 : windowWidth - 40
    },
    input: {
        paddingVertical: 15,
        height: isIpad ? 70 : 50,
        paddingHorizontal: 20,
        backgroundColor: whiteColor,
        borderRadius: 10,
        ...fontFamily('regular'),
        fontSize: generalFontSize - 4,
        fontWeight: '400',
        lineHeight: isIpad ? generalFontSize + 10 : null,
        textAlign: 'left',
        color: '#828282',
        borderColor: '#0005',
        borderWidth: 1
    },
    inputText: {
        ...fontFamily('regular'),
        fontSize: generalFontSize - 4,
        fontWeight: '400',
        lineHeight: isIpad ? generalFontSize + 10 : null,
        textAlign: 'left',
        color: '#828282',
    },
    inputLabel: {
        ...fontFamily('medium'),
        fontSize: generalFontSize - 1,
        fontWeight: '400',
        lineHeight: isIpad ? generalFontSize + 10 : null,
        textAlign: 'left',
        color: textColor,
        marginBottom: 0
    },
    inputContainer: {
        position: 'relative',
        overflow: 'hidden',
        marginTop: 10,
    },
    showPassword: {
        position: 'absolute',
        right: 0,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    showPasswordIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        ...fontFamily('regular'),
        fontSize: generalFontSize - 5,
        fontWeight: '400',
        lineHeight: isIpad ? generalFontSize + 10 : null,
        color: '#63EF08',
        textAlign: 'right',
        textDecorationLine: "underline"
    },
    linkCont: {
        marginTop: 12,
        alignSelf: 'flex-start',
        marginLeft: 'auto'
    },
    borderContainer: {
        borderTopColor: '#707070',
        borderTopWidth: 1,
        paddingVertical: 24,
    },
    secHeading: {
        color: textColor,
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 2,
        marginBottom: 16
    },
    circleBtn: {
        backgroundColor: themeColor,
        padding: 10,
        borderRadius: 100,
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
    },
    secMainHeading: {
        color: textColor,
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 6,
    },
    featureBox: {
        backgroundColor: itemBg,
        width: (windowWidth - 60) / 2,
        borderRadius: 5,
        padding: 14,
        marginTop: 10,
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
    },
    featureBoxIcon: {
        backgroundColor: themeColor,
        padding: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureBoxStatus: {
        ...fontFamily('regular'),
        fontSize: generalFontSize - 2,
        color: themeColor
    },
    featureBoxTitle: {
        ...fontFamily('regular'),
        fontSize: generalFontSize + 6,
        lineHeight: isIpad ? generalFontSize + 10 : null,
        color: textColor
    },
    featureBoxDesc: {
        color: minTextColor,
        fontSize: generalFontSize - 4,
        lineHeight: isIpad ? generalFontSize + 10 : null,
        ...fontFamily('regular')
    },
    orderBox: {
        backgroundColor: itemBg,
        padding: 14,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        widthL:'100%'
    },
    orderMinText: {
        ...fontFamily('regular'),
        fontWeight: '400',
        fontSize: generalFontSize - 4,
        color: minTextColor,
        marginBottom: 10,
        textTransform: 'capitalize'
    },
    orderMainText: {
        color: textColor,
        fontSize: generalFontSize,
        ...fontFamily('regular')
    },
    spacer: {
        marginVertical: 10
    },
    invoiceBtn: {
        borderRadius: 100,
        width: 100,
        height: 100,
        marginTop: 'auto',
        // marginBottom: 20
    },
    orderPrice: {
        color: textColor,
        ...fontFamily('medium'),
        fontSize: generalFontSize + 6,
    },
    orderPriceStatus: {
        color: themeColor,
        fontSize: generalFontSize - 4,
        paddingLeft: 5,
        ...fontFamily('medium'),
        textTransform: 'capitalize'
    },
    orderContent: {
        width: '60%'
    },
    card: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: itemBg,
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
    },
    fullWidth: {
        width: (windowWidth - 40)
    },
    themeBtn2: {
        backgroundColor: itemBg,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
        gap: 10,
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
    },
    themeBtn2Text: {
        ...fontFamily('regular'),
        fontSize: generalFontSize,
        color: textColor,
        fontWeight: '400'
    }
});