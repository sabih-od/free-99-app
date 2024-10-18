import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {
  bgColor,
  generalFontSize,
  GlobalStyle,
  margin,
  padding,
  windowWidth,
  textColor,
  fontFamily,
} from '../../../Styles/Theme';
import UploadImage from '../../../Components/UploadImage/UploadImage';
import {TextInput} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Dropdown} from 'react-native-element-dropdown';
import {shopService} from '../../../Services/shopService';
import {productService} from '../../../Services/productService';
import {useSelector} from 'react-redux';
import {themeColor} from '../../../Styles/Theme';
import {useForm, Controller} from 'react-hook-form';
import {request, PERMISSIONS, openSettings} from 'react-native-permissions';
import NotiModal from '../../../Components/NotiModal/NotiModal';
import {errorToast} from '../../../Utils/toast';
import StripePayment from '../../../Components/Payment/StripePayment';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const VendorAddProduct = ({navigation}) => {
  const [load, setLoad] = useState(false);
  const authData = useSelector(state => state.auth.data);
  const category = useSelector(state => state.shop.category);
  const loading = useSelector(state => state.product.loading);
  const [photos, setPhotos] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  // const [gallery, setGallery] = useState([]);
  const [_category, _setCategory] = useState([]);
  const [cat, setCat] = useState('');
  //   const [imagePickerImage, setImagePickerImage] = useState(null);
  const stripePaymentRef = useRef();
  const [featured, setFeatured] = useState(false);
  const [sale, setSale] = useState(false);
  const [favourites, setFavourites] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
  } = useForm();

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  //   const requestGalleryPermission = async () => {
  //     try {
  //       if (Platform.OS === 'ios') {
  //         let granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
  //         while (granted !== 'granted') {
  //           granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
  //           if (granted !== 'granted') {
  //             Alert.alert(
  //               'Permission Needed',
  //               'This app needs access to your photo library to pick images. Please enable it from Settings.',
  //             );
  //             return;
  //           }
  //         }
  //       } else if (Platform.OS === 'android') {
  //         let granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //           {
  //             title: 'Access Storage',
  //             message: 'This app needs access to your storage to pick images.',
  //             buttonNegative: 'Cancel',
  //             buttonPositive: 'OK',
  //           },
  //         );

  //         while (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //           if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
  //             Alert.alert(
  //               'Permission Needed',
  //               'Storage access is required to pick images. Please enable it from settings.',
  //             );
  //             return;
  //           } else {
  //             granted = await PermissionsAndroid.request(
  //               PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //               {
  //                 title: 'Access Storage',
  //                 message:
  //                   'This app needs access to your storage to pick images.',
  //                 buttonNegative: 'Cancel',
  //                 buttonPositive: 'OK',
  //               },
  //             );
  //           }
  //         }
  //       }

  //       imagePicker();
  //     } catch (error) {
  //       console.error('Error requesting gallery permission:', error);
  //     }
  //   };

  const imagePicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      forceJpg: true,
      //   width: 400,
      //   height: 400,
      //   compressImageMaxWidth: 400,
      //   compressImageMaxHeight: 400,
      // includeBase64: true,
      cropping: true,
      maxFiles: 25,
    }).then(images => {
      setPhotos(images);
      // setImagePickerImage(Platform.OS === 'ios' ? images.path.replace('file://', '') : images.path);
    });
  };

  const featuredImagePicker = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      forceJpg: true,
      //   width: 400,
      //   height: 400,
      //   compressImageMaxWidth: 400,
      //   compressImageMaxHeight: 400,
      // includeBase64: true,
      cropping: true,
    }).then(image => {
      setFeaturedImage(image);
      // setImagePickerImage(Platform.OS === 'ios' ? images.path.replace('file://', '') : images.path);
    });
  };

  // const gelleryImagePicker = () => {
  //     ImagePicker.openPicker({
  //         multiple: true
  //     }).then(images => {
  //         setGallery(images);
  //     });
  // };

  const validateData = data => {
    // if (photos.length === 0) {
    //     return errorToast('Please select at least one image.');
    // }

    if (!featuredImage) {
      return errorToast('Please select featured image.');
    }

    if (data.featured) data.featured = 1;
    else data.featured = 0;
    if (data.sale) data.sale = 1;
    else data.sale = 0;
    if (data.favourites) data.favourites = 1;
    else data.favourites = 0;

    if (data.price <= 0 || data.price == null || data.price == undefined) {
      return errorToast('Please enter a price greater than 0.');
    }

    if (
      data.shipping_price < 0 ||
      data.price == null ||
      data.price == undefined
    ) {
      return errorToast('Please enter a price greater than or equal to 0.');
    }

    if (
      data.stock_quantity <= 0 ||
      data.stock_quantity == null ||
      data.stock_quantity == undefined
    ) {
      return errorToast('Please enter a stock quantity greater than 0.');
    }

    data.photos = photos.map(photo => ({
      uri:
        Platform.OS === 'ios' ? photo.path.replace('file://', '') : photo.path,
      type: photo.mime,
      name: photo.filename || `photo.${photo.mime.split('/')[1]}`,
    }));

    data.photo = {
      uri:
        Platform.OS === 'ios'
          ? featuredImage.path.replace('file://', '')
          : featuredImage.path,
      type: featuredImage.mime,
      name:
        featuredImage.filename ||
        `featuredImage.${featuredImage.mime.split('/')[1]}`,
    };

    return data;
  };

  const createProduct = async data => {
    const _data = validateData(data);

    const formData = new FormData();
    for (const key in _data) {
      if (_data.hasOwnProperty(key)) {
        if (key === 'photos') {
          _data[key].forEach((photo, index) => {
            // formData.append('photo', photo);
            formData.append(`gallery[${index}]`, photo);
          });
        } else {
          formData.append(key, _data[key]);
        }
      }
    }

    try {
      await productService.createProduct(formData).then(() => {
        reset();
        // setImagePickerImage(null);
        setPhotos([]);
        setFeaturedImage(null);
        setFeatured(false);
        setSale(false);
        setFavourites(false);
        productService.getProducts();
        navigation.navigate('vendorProducts');
      });
    } catch (error) {
      console.log('error', error.response.data);
      errorToast(error.response.data.message);
      // navigation.navigate("vendorWallet");
    }
  };

  const pay = data => {
    if (authData?.stripe_account_id == null) {
      errorToast('Please Connect your Stripe Wallet');
      navigation.navigate('vendorWallet');
    } else {
      stripePaymentRef?.current?.initializePaymentSheet(data);
    }
  };

  const callback = async data => {
    setLoad(true);
    // console.log('callback data', data);

    const _data = validateData(data?.data);
    const formData = new FormData();
    for (const key in _data) {
      if (_data.hasOwnProperty(key)) {
        if (key === 'photos') {
          _data[key].forEach((photo, index) => {
            // formData.append('photo', photo);
            formData.append(`gallery[${index}]`, photo);
          });
        } else {
          formData.append(key, _data[key]);
        }
      }
    }

    if (data?.paymentIntentId)
      formData.append('payment_intent_id', data?.paymentIntentId);

    try {
      await productService.createProduct(formData).then(() => {
        reset();
        // setImagePickerImage(null);
        setPhotos([]);
        setFeaturedImage(null);
        setFeatured(false);
        setSale(false);
        setFavourites(false);
        productService.getProducts();
        setLoad(false);
        navigation.navigate('vendorProducts');
      });
    } catch (error) {
      console.log('error', error);
      errorToast(error.response.data.message);
      // navigation.navigate("vendorWallet");
    }
  };

  useEffect(() => {
    shopService.getCategories();
  }, []);

  useEffect(() => {
    _setCategory(
      category?.map(item => {
        return {
          label: item?.name,
          value: item?.id,
          children: item?.subcategories?.map(function (subItem) {
            return {label: subItem?.name, value: subItem?.id};
          }),
        };
      }),
    );
  }, [category]);

  useEffect(() => {
    reset(); // Reset form state
    setFeatured(false);
    setSale(false);
    setFavourites(false);
  }, [reset]);

  // useFocusEffect(
  //     React.useCallback(() => {
  //         setFeatured(false);
  //         setSale(false);
  //         setFavourites(false)
  //     }, [])
  // );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor}}>
      <NotiModal modalIsVisible={loading} title={'Loading'} />
      <ScrollView>
        {load ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={themeColor} />
          </View>
        ) : (
          <>
            <View
              style={[
                GlobalStyle.container,
                {paddingTop: 30, paddingBottom: 50},
              ]}>
              <View
                style={[
                  GlobalStyle.row,
                  GlobalStyle.aic,
                  {justifyContent: 'space-between'},
                ]}>
                <Text style={[GlobalStyle.secMainHeading]}>
                  Upload Featured Image
                </Text>
              </View>

              <View style={[GlobalStyle.card, {marginTop: 10}]}>
                <Image
                  style={{
                    width: '100%',
                    borderRadius: 10,
                    objectFit: 'cover',
                    height: windowWidth / 1.75,
                    borderWidth: 1,
                    borderColor: textColor,
                  }}
                  source={{
                    uri: featuredImage
                      ? featuredImage?.path
                      : 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg',
                  }}
                />
                <TouchableOpacity
                  style={[
                    GlobalStyle.themeBtn,
                    {
                      marginTop: 30,
                      flex: 1,
                      width: Dimensions.get('window').width - 65,
                    },
                  ]}
                  onPress={() => featuredImagePicker()}>
                  <Text
                    style={[
                      GlobalStyle.themeBtnText,
                      {fontSize: generalFontSize},
                    ]}>
                    Upload featured image
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  GlobalStyle.row,
                  GlobalStyle.aic,
                  {justifyContent: 'space-between', marginTop: 20},
                ]}>
                <Text style={[GlobalStyle.secMainHeading]}>
                  Upload Gallery Images
                </Text>
              </View>

              <UploadImage
                imagePicker={imagePicker}
                // gelleryImagePicker={gelleryImagePicker}
                imagePickerImages={photos}
                photos={photos}
                // gallery={gallery}
              />

              <View
                style={[
                  GlobalStyle.row,
                  GlobalStyle.aic,
                  {justifyContent: 'space-between', marginTop: 30},
                ]}>
                <Text style={[GlobalStyle.secMainHeading]}>
                  General Information
                </Text>
              </View>
              <View style={[GlobalStyle.card, {marginTop: 10}]}>
                <View style={[GlobalStyle.inputCont, {width: '100%'}]}>
                  <Text style={GlobalStyle.inputLabel}>Product Name</Text>
                  <View style={[GlobalStyle.inputContainer, {marginTop: 5}]}>
                    <Controller
                      control={control}
                      rules={{required: 'Product Name is required'}}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          style={GlobalStyle.input}
                          placeholder="Enter Product Name"
                          placeholderTextColor={'#707070'}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="name"
                    />
                    {errors.name && (
                      <Text style={{color: 'red', marginTop: 5}}>
                        {errors.name.message}
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={[
                    GlobalStyle.inputCont,
                    {marginTop: 20, width: '100%'},
                  ]}>
                  <Text style={GlobalStyle.inputLabel}>
                    Product Description
                  </Text>
                  <View style={[GlobalStyle.inputContainer, {marginTop: 5}]}>
                    <Controller
                      control={control}
                      rules={{required: 'Product Description is required'}}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          textAlignVertical="top"
                          style={[
                            GlobalStyle.input,
                            {minHeight: 120, height: 'auto'},
                          ]}
                          placeholder="Enter Product Description"
                          placeholderTextColor={'#707070'}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          multiline
                        />
                      )}
                      name="description"
                    />
                    {errors.description && (
                      <Text style={{color: 'red', marginTop: 5}}>
                        {errors.description.message}
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={[
                    GlobalStyle.inputCont,
                    {marginTop: 20, width: '100%'},
                  ]}>
                  <Text style={GlobalStyle.inputLabel}>Select Category</Text>
                  <View style={[GlobalStyle.inputContainer, {marginTop: 0}]}>
                    <Controller
                      control={control}
                      rules={{required: 'Category is required'}}
                      render={({field: {onChange, value}}) => (
                        <Dropdown
                          style={GlobalStyle.input}
                          placeholderStyle={{color: '#707070'}}
                          selectedTextStyle={{color: '#000'}}
                          inputSearchStyle={{color: '#000'}}
                          data={_category}
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select item"
                          value={value}
                          onChange={item => {
                            setCat(item.value);
                            onChange(item.value);
                          }}
                          renderItem={renderItem}
                        />
                      )}
                      name="category_id"
                    />
                    {errors.category_id && (
                      <Text style={{color: 'red', marginTop: 5}}>
                        {errors.category_id.message}
                      </Text>
                    )}
                  </View>
                </View>
              </View>

              <View
                style={[
                  GlobalStyle.row,
                  GlobalStyle.aic,
                  {justifyContent: 'space-between', marginTop: 30},
                ]}>
                <Text style={[GlobalStyle.secMainHeading]}>
                  Pricing and Stock
                </Text>
              </View>
              <View style={[GlobalStyle.card, {marginTop: 10}]}>
                <View style={[GlobalStyle.inputCont, {width: '100%'}]}>
                  <Text style={GlobalStyle.inputLabel}>Price</Text>
                  <View style={[GlobalStyle.inputContainer, {marginTop: 5}]}>
                    <Controller
                      control={control}
                      rules={{
                        required: 'Price is required',
                        min: {
                          value: 1,
                          message: 'Price Should be minimum of 1',
                        },
                      }}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          style={GlobalStyle.input}
                          placeholder="Enter Price"
                          placeholderTextColor={'#707070'}
                          keyboardType="numeric"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="price"
                    />
                    {errors.price && (
                      <Text style={{color: 'red', marginTop: 5}}>
                        {errors.price.message}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={[GlobalStyle.inputCont, {width: '100%'}]}>
                  <Text style={GlobalStyle.inputLabel}>Shipping Price</Text>
                  <View style={[GlobalStyle.inputContainer, {marginTop: 5}]}>
                    <Controller
                      control={control}
                      rules={{
                        required: 'Price is required',
                        min: {
                          value: 0,
                          message: 'Price Should be minimum of 0',
                        },
                      }}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          style={GlobalStyle.input}
                          placeholder="Enter Price"
                          placeholderTextColor={'#707070'}
                          keyboardType="numeric"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="shipping_price"
                    />
                    {errors.shipping_price && (
                      <Text style={{color: 'red', marginTop: 5}}>
                        {errors.shipping_price.message}
                      </Text>
                    )}
                  </View>
                </View>

                <View
                  style={[
                    GlobalStyle.inputCont,
                    {marginTop: 20, width: '100%'},
                  ]}>
                  <Text style={GlobalStyle.inputLabel}>Stock</Text>
                  <View style={[GlobalStyle.inputContainer, {marginTop: 5}]}>
                    <Controller
                      control={control}
                      rules={{
                        required: 'Stock quantity is required',
                        min: {
                          value: 1,
                          message: 'Quantity Should be minimum of 1',
                        },
                      }}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          style={GlobalStyle.input}
                          placeholder="Enter Stock quantity"
                          placeholderTextColor={'#707070'}
                          keyboardType="numeric"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="stock_quantity"
                    />
                    {errors.stock_quantity && (
                      <Text style={{color: 'red', marginTop: 5}}>
                        {errors.stock_quantity.message}
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={[
                    GlobalStyle.inputCont,
                    {marginTop: 20, width: '100%'},
                  ]}>
                  <Text style={GlobalStyle.inputLabel}>Brand</Text>
                  <View style={[GlobalStyle.inputContainer, {marginTop: 5}]}>
                    <Controller
                      control={control}
                      // rules={{ required: 'Brand is required' }}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          style={GlobalStyle.input}
                          placeholder="Enter Brand"
                          placeholderTextColor={'#707070'}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="brand"
                    />
                    {errors.brand && (
                      <Text style={{color: 'red', marginTop: 5}}>
                        {errors.brand.message}
                      </Text>
                    )}
                  </View>
                </View>

                <View
                  style={[
                    GlobalStyle.inputCont,
                    {marginTop: 20, width: '100%'},
                  ]}>
                  <BouncyCheckbox
                    size={25}
                    fillColor={themeColor}
                    unFillColor="#FFFFFF"
                    text="Is Featured"
                    iconStyle={{borderColor: themeColor}}
                    innerIconStyle={{borderWidth: 2}}
                    textStyle={{fontFamily: 'FreightBigPro-Bold'}}
                    onPress={isChecked => {
                      setValue('featured', isChecked);
                      setFeatured(isChecked);
                    }}
                    style={{marginBottom: 15}}
                    isChecked={featured}
                  />

                  <BouncyCheckbox
                    size={25}
                    fillColor={themeColor}
                    unFillColor="#FFFFFF"
                    text="Is Sale"
                    iconStyle={{borderColor: themeColor}}
                    innerIconStyle={{borderWidth: 2}}
                    textStyle={{fontFamily: 'FreightBigPro-Bold'}}
                    onPress={isChecked => {
                      setValue('sale', isChecked);
                      setSale(isChecked);
                    }}
                    style={{marginBottom: 15}}
                    isChecked={sale}
                  />

                  <BouncyCheckbox
                    size={25}
                    fillColor={themeColor}
                    unFillColor="#FFFFFF"
                    text="Is Favourites"
                    iconStyle={{borderColor: themeColor}}
                    innerIconStyle={{borderWidth: 2}}
                    textStyle={{fontFamily: 'FreightBigPro-Bold'}}
                    onPress={isChecked => {
                      setValue('favourites', isChecked);
                      setFavourites(isChecked);
                    }}
                    style={{marginBottom: 15}}
                    isChecked={favourites}
                  />
                </View>
              </View>

              {authData?.user_subscription?.subscription?.limitation ===
                'unlimited' && (
                <TouchableOpacity
                  disabled={!featuredImage}
                  onPress={() => {
                    if (!authData?.stripe_account_id) {
                      errorToast('Please Connect your Stripe Wallet');
                      navigation.navigate('vendorWallet');
                      return;
                    }
                    handleSubmit(createProduct)();
                  }}
                  style={[
                    GlobalStyle.themeBtn,
                    {
                      marginTop: 30,
                      backgroundColor: !featuredImage ? 'grey' : themeColor,
                    },
                  ]}>
                  <Text style={[GlobalStyle.themeBtnText]}>Add product</Text>
                </TouchableOpacity>
              )}

              {authData?.user_subscription?.subscription?.limitation ===
                'limited' && (
                <TouchableOpacity
                  disabled={!featuredImage}
                  onPress={() => {
                    if (!authData?.stripe_account_id) {
                      errorToast('Please Connect your Stripe Wallet');
                      navigation.navigate('vendorWallet');
                      return;
                    }
                    handleSubmit(pay)();
                  }}
                  style={[
                    GlobalStyle.themeBtn,
                    {
                      marginTop: 30,
                      backgroundColor: !featuredImage ? 'grey' : themeColor,
                    },
                  ]}>
                  <Text style={[GlobalStyle.themeBtnText]}>Pay</Text>
                </TouchableOpacity>
              )}
            </View>

            {authData?.user_subscription?.subscription?.price_per_product >
              0 && (
              <View>
                <StripePayment
                  amount={parseInt(
                    authData?.user_subscription?.subscription
                      ?.price_per_product,
                  )}
                  ref={stripePaymentRef}
                  callback={callback}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VendorAddProduct;

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 10,
    height: 50,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: textColor,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: generalFontSize,
  },
  placeholderStyle: {
    fontSize: generalFontSize,
    color: textColor,
    ...fontFamily('regular'),
  },
  selectedTextStyle: {
    fontSize: generalFontSize,
    color: textColor,
    ...fontFamily('regular'),
  },
  inputSearchStyle: {
    height: 40,
    fontSize: generalFontSize,
    color: textColor,
    ...fontFamily('regular'),
  },
});
