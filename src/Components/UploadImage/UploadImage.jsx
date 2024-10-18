import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  bgColor,
  generalFontSize,
  GlobalStyle,
  textColor,
  windowWidth,
} from '../../Styles/Theme';
import Carousel from 'react-native-reanimated-carousel';

const defaultImage =
  'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg';

const UploadImage = ({
  imagePicker,
  photos,
  imagePickerImage,
  deleteImage,
  deleteButton,
  productId,
  imageIds,
  setPhotos,
}) => {
  const handleDelete = index => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: async () => {
            const imageId = imageIds[index];
            deleteImage(productId, imageId);
            setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
          },
        },
      ],
      {cancelable: false},
    );
  };

  const imageData = photos.length > 0 ? photos : [defaultImage];
  return (
    <>
      <View style={[GlobalStyle.card, {marginTop: 10}]}>
        {photos.length > 1 ? (
          <Carousel
            // autoPlay
            loop
            data={imageData}
            height={windowWidth / 1.75}
            width={Dimensions.get('window').width - 60}
            scrollAnimationDuration={2000}
            renderItem={({item, index}) => (
              <ImageBackground
                style={styles.mainImg}
                imageStyle={{
                  resizeMode: 'cover',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: textColor,
                }}
                source={
                  Platform.OS == 'ios'
                    ? {uri: item?.sourceURL}
                    : {uri: item.path}
                }>
                {/* <View style={{ position: 'absolute', bottom: 10, left: (Dimensions.get('window').width - 80) / 2 }}>
                        <Text style={{ textAlign: 'center', fontSize: 30, color: 'white' }}>
                            {index + 1}
                        </Text>
                    </View> */}
                {deleteButton && (
                  <View
                    style={{
                      marginTop: 10,
                      marginRight: 10,
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity onPress={() => handleDelete(index)}>
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                          resizeMode: 'contain',
                          tintColor: 'red',
                          backgroundColor: 'white',
                          borderRadius: 15,
                        }}
                        source={require('./../../../assets/images/delete.png')}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </ImageBackground>
            )}
          />
        ) : photos.length === 0 ? (
          <Image
            style={[
              styles.mainImg,
              {
                borderRadius: 10,
                resizeMode: 'cover',
                borderColor: textColor,
                borderWidth: 1,
              },
            ]}
            source={{uri: defaultImage}}
          />
        ) : (
          <ImageBackground
            style={styles.mainImg}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: textColor,
            }}
            source={
              Platform.OS == 'ios'
                ? {uri: imageData[0]?.sourceURL}
                : {uri: imageData[0]?.path}
            }>
            {/* {deleteButton &&
                <View style={{
                    marginTop: 10,
                    marginRight: 10,
                    alignItems: 'flex-end'
                }}>
                    <TouchableOpacity
                        onPress={deleteImage}
                    >
                        <Image style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: 'red', backgroundColor: 'white', borderRadius: 15 }} source={require('./../../../assets/images/delete.png')} />
                    </TouchableOpacity>
                </View>
            } */}
          </ImageBackground>
        )}
        <View style={[GlobalStyle.row, GlobalStyle.aic, {gap: 10}]}>
          {/* {deleteButton &&
                <TouchableOpacity
                    style={[GlobalStyle.themeBtn, { marginTop: 30, flex: 1 }]}
                    onPress={deleteImage}
                >
                    <Text style={[GlobalStyle.themeBtnText, { fontSize: generalFontSize }]}>Delete image</Text>
                </TouchableOpacity>
            } */}
          <TouchableOpacity
            style={[GlobalStyle.themeBtn, {marginTop: 30, flex: 1}]}
            onPress={imagePicker}>
            <Text
              style={[GlobalStyle.themeBtnText, {fontSize: generalFontSize}]}>
              Upload gallery images
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  mainImg: {
    width: '100%',
    // borderRadius: 10,
    // objectFit: 'cover',
    height: windowWidth / 1.75,
    // borderWidth: 1,
    // borderColor: textColor
  },
  image: {
    width: 95,
    height: 70,
    objectFit: 'cover',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
