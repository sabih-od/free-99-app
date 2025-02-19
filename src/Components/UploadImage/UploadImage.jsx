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
import { APP_URL } from '../../Constants';

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

  const handleDelete = item => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: async () => {
            // const imageId = imageIds[index];
            // deleteImage(productId, imageId);

            deleteImage(productId, item?.id);
            setPhotos(prevPhotos => prevPhotos.filter(x => x?.id !== item?.id));
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
        {
          photos.length > 0 ? (
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
                  source={{uri: item?.sourceURL}}
                >
                  {deleteButton && (
                    <View
                      style={{
                        marginTop: 10,
                        marginRight: 10,
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity onPress={() => handleDelete(item)}>
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
          ) : 
          
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
        }
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
