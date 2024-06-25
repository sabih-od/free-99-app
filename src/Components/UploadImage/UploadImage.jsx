import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { bgColor, generalFontSize, GlobalStyle, textColor, windowWidth } from '../../Styles/Theme';

const COUNT = 4;

const UploadImage = ({ imagePicker, imagePickerImage, deleteImage, deleteButton }) => {
    return (
        <>
            <View style={[GlobalStyle.card, { marginTop: 10 }]}>
                <View>
                    <Image style={styles.mainImg} source={imagePickerImage ? { uri: imagePickerImage } : { uri: 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg', cache: 'force-cache' }} />
                </View>
                <View style={[GlobalStyle.row, GlobalStyle.aic, { gap: 10 }]}>
                    {deleteButton &&
                        <TouchableOpacity
                            style={[GlobalStyle.themeBtn, { marginTop: 30, flex: 1 }]}
                            onPress={deleteImage}
                        >
                            <Text style={[GlobalStyle.themeBtnText, { fontSize: generalFontSize }]}>Delete image</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity
                        style={[GlobalStyle.themeBtn, { marginTop: 30, flex: 1 }]}
                        onPress={imagePicker}
                    >
                        <Text style={[GlobalStyle.themeBtnText, { fontSize: generalFontSize }]}>Upload image</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default UploadImage;

const styles = StyleSheet.create({
    mainImg: {
        width: '100%',
        borderRadius: 10,
        objectFit: 'cover',
        height: windowWidth / 1.75,
        borderWidth: 1,
        borderColor: textColor
    },
    image: {
        width: 95,
        height: 70,
        objectFit: 'cover',
        borderRadius: 10,
        overflow: 'hidden'
    }
});
