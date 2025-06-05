import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image, ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { bgColor, generalFontSize, GlobalStyle, textColor, fontFamily, whiteColor, windowHeight, windowWidth } from '../../../Styles/Theme';
import UploadImage from '../../../Components/UploadImage/UploadImage';
import { TextInput } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from 'react-native-element-dropdown';
import { shopService } from '../../../Services/shopService';
import { productService } from '../../../Services/productService';
import { useSelector } from 'react-redux';
import { themeColor } from '../../../Styles/Theme';
import { useForm, Controller } from 'react-hook-form';
import NotiModal from '../../../Components/NotiModal/NotiModal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { errorToast, successToast } from '../../../Utils/toast';
import { APP_URL } from '../../../Constants';

const VendorUpdateProduct = ({ navigation, toggleUpdateModal, updateProduct }) => {
    const {token} = useSelector((state) => state.auth);
    const category = useSelector((state) => state.shop.category);
    const image_id = updateProduct?.media?.map((item) => item?.id)
    const product_id = updateProduct?.id

    const loading = useSelector((state) => state.auth.loading);
    const [photos, setPhotos] = useState([]);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [_category, _setCategory] = useState([]);
    const [cat, setCat] = useState('');
    const [imagePickerImage, setImagePickerImage] = useState(null);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isSale, setIsSale] = useState(false);
    const [isFavourites, setIsFavourites] = useState(false);
    const [imgErr, setImgErr] = useState(false);
    const [uptLoad, setUptLoad] = useState()
    const [isDeleted, setIsDeleted] = useState(false)

    const scrollViewRef = useRef();

    const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };

    // const imagePicker = () => {
    //     ImagePicker.openPicker({
    //         multiple: true,
    //         width: 400,
    //         height: 400,
    //         cropping: true
    //     }).then(images => {
    //         setPhotos(images);
    //         // setImagePickerImage(Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path);
    //         setImgErr(false);
    //     }).catch(error => {
    //         console.error('Image Picker Error:', error);
    //         Alert.alert('Error', 'An error occurred while picking the image. Please try again.');
    //     });
    // };

    const imagePicker = () => {
        ImagePicker.openPicker({
            multiple: true,
            width: 400,
            height: 400,
            cropping: true
        }).then(images => {
            const newPhotos = images.map(image => ({
                sourceURL: image.path,
                mime: image.mime,
                name: image.filename || `photo.${image.mime.split('/')[1]}`
            }));
            setPhotos([...photos, ...newPhotos]);
            setImgErr(false);
        }).catch(error => {
            console.error('Image Picker Error:', error);
            Alert.alert('Error', 'An error occurred while picking the image. Please try again.');
        });
    };

    const featuredImagePicker = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {
            setFeaturedImage(image);
            // setImagePickerImage(Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path);
            setImgErr(false);
        }).catch(error => {
            console.error('Image Picker Error:', error);
            Alert.alert('Error', 'An error occurred while picking the image. Please try again.');
        });
    };

    // const gelleryImagePicker = () => {
    //     ImagePicker.openPicker({
    //         multiple: true
    //     }).then(images => {
    //         setGallery(images);
    //     });
    // }

    // const deleteImage = () => {
    //     productService.removeGalleryImages(product_id, image_id)
    //     // setPhotos([]);
    //     // setIsDeleted(true)

    //     // setImagePickerImage(null);
    // }

    const deleteImage = (productId, imageId) => {
        console.log('productId, imageId', productId, imageId);

        productService.removeGalleryImages(productId, imageId)
            .then(() => {
                setPhotos((prevPhotos) => prevPhotos.filter(photo => photo?.id !== imageId));
                Alert.alert('Image Deleted')
                productService.getProducts();
                // handle success, e.g., update state to remove the deleted image from the UI
            })
            .catch(error => {
                console.error('Error deleting image:', error);
                Alert.alert('Error', 'An error occurred while deleting the image. Please try again.');
            });
    };

    const deleteFeaturedImage = () => {
        setFeaturedImage(null);
        // setImagePickerImage(null);
    }

    const updateProductFunc = async (data) => {
        setUptLoad(true)
        try {
            if (!featuredImage) {
                setImgErr(true);
                scrollViewRef.current.scrollTo({ y: 0, animated: true });
                setTimeout(() => {
                    setUptLoad(false)
                }, 2000);
                return;
            }

            if (data.featured) data.featured = 1; else data.featured = 0;
            if (data.sale) data.sale = 1; else data.sale = 0;
            if (data.favourites) data.favourites = 1; else data.favourites = 0;

            if (data.price <= 0 || data.price == null || data.price == undefined) {
                errorToast('Please enter a price greater than 0.');
                scrollViewRef.current.scrollTo({ y: 600, animated: true });
                setUptLoad(false)
                return;
            }

            if (data.shipping_price < 0 || data.price == null || data.price == undefined) {
                errorToast('Please enter shipping price greater than or equal to 0.');
                scrollViewRef.current.scrollTo({ y: 600, animated: true });
                setUptLoad(false)
                return;
            }

            if (data.stock_quantity <= 0 || data.stock_quantity == null || data.stock_quantity == undefined) {
                errorToast('Please enter a stock quantity greater than 0.');
                scrollViewRef.current.scrollTo({ y: 800, animated: true });
                setUptLoad(false)
                return;
            }

            // if (photos.length > 0) {
            //     if (photos[0].hasOwnProperty('mime')) {
            //         data.photos = photos.map(photo => (photo.hasOwnProperty('mime') ? {
            //             uri: Platform.OS === 'ios' ? photo.path.replace('file://', '') : photo.path,
            //             type: photo.mime,
            //             name: photo.filename || `photo.${photo.mime.split('/')[1]}`
            //         } : photo))
            //     }
            // }

            if (photos.length > 0) {
                const newPhotos = photos.filter(photo => photo.hasOwnProperty('mime')).map(photo => ({
                    uri: Platform.OS === 'ios' ? photo.sourceURL.replace('file://', '') : photo.sourceURL,
                    type: photo.mime,
                    name: photo.name
                }));
                data.photos = newPhotos;
            }

            // if (photos.length > 0) {
            //     data.photos = photos.map(photo => ({
            //         uri: Platform.OS === 'ios' ? photo.sourceURL.replace('file://', '') : photo.sourceURL,
            //         type: photo.mime,
            //         name: photo.name
            //     }));
            // }

            data.photo = {
                uri: Platform.OS === 'ios' ? featuredImage.path.replace('file://', '') : featuredImage.path,
                type: featuredImage.mime,
                name: featuredImage.filename || `featuredImage.${featuredImage.mime.split('/')[1]}`
            }

            // if (isDeleted) {
            //     data?.key = updateProduct.media.map(item => `${item.id}`)
            // }

            const formData = new FormData();
            formData.append('_method', 'PUT');

            // for (const key in data) {
            //     if (data.hasOwnProperty(key)) {
            //         if (key === 'photos') {
            //             data[key].forEach((photo, index) => {
            //                 formData.append(`gallery[${index}]`, photo);
            //             });

            //         }
            //         // else if ( key === 'key') {
            //         //     data[key].forEach((photo, index) => {
            //         //         formData.append(`key[${index}]`, photo);
            //         //     });
            //         // }

            //         else {
            //             formData.append(key, data[key]);
            //         }
            //     }
            // }
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key === 'photos') {
                        data[key].forEach((photo, index) => {
                            formData.append(`gallery[${index}]`, {
                                uri: photo.uri,
                                type: photo.type,
                                name: photo.name
                            });
                        });
                    } else {
                        formData.append(key, data[key]);
                    }
                }
            }

            await productService.updateProduct(updateProduct?.id, formData)
                .then(() => {
                    reset();
                    // setImagePickerImage(null);
                    setPhotos([])
                    setFeaturedImage(null)
                    productService.getProducts();
                    toggleUpdateModal(0);
                    successToast("Product Edited")
                    setUptLoad(false)
                });
        } catch (error) {
            console.error(error);
            setUptLoad(false)
            errorToast('An error occurred while updating the product.');
        }
    }

    useEffect(() => {
        shopService.getCategories();
    }, []);

    useEffect(() => {
        _setCategory(category?.map((item) => {
            return {
                label: item?.name,
                value: item?.id,
                children: item?.subcategories?.map(function (subItem) {
                    return { label: subItem?.name, value: subItem?.id }
                })
            };
        }));
    }, [category]);

    useEffect(() => {
        if (updateProduct) {
            setValue('name', updateProduct.name);
            setValue('description', updateProduct.description);
            setValue('category_id', updateProduct.category_id);
            setValue('price', updateProduct.price?.toString());
            setValue('shipping_price', updateProduct.shipping_price?.toString());
            setValue('stock_quantity', updateProduct.stock_quantity?.toString());
            setValue('brand', updateProduct.brand);
            setValue('featured', updateProduct.featured == 1);
            setValue('sale', updateProduct.sale == 1);
            setValue('favourites', updateProduct.favourites == 1);

            setIsFeatured(updateProduct.featured == 1);
            setIsSale(updateProduct.sale == 1);
            setIsFavourites(updateProduct.favourites == 1);
            
            if (updateProduct.media.length > 0) {
                const mediaImages = updateProduct.media.filter(item => item?.collection_name === 'product_gallery')
                                        .map(item => ({
                                            id: item?.id,
                                            sourceURL: `${APP_URL}/storage/${item?.id}/${item?.file_name}`,
                                            type: item?.mine_type,
                                            name: item?.file_name
                                        }));
                setPhotos(mediaImages)
                
                //     setPhotos(updateProduct.image.map(image => ({
                //         uri: image,
                //         type: 'image/jpeg',
                //         name: image.split('/').pop()
                //     })));
            }

            // set featured image
            setFeaturedImage(
                {
                    path: updateProduct.image,
                    mime: 'image/jpeg',
                    name: updateProduct.image.split('/').pop()
                }
            )
        }
    }, [updateProduct]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <ScrollView ref={scrollViewRef}>
                {uptLoad ? (
                    <View style={[GlobalStyle.row, GlobalStyle.aic, GlobalStyle.jc, { flex: 1, minHeight: windowHeight }]}>
                        <ActivityIndicator size={'large'} color={whiteColor} />
                    </View>
                ) : (
                    <View style={[GlobalStyle.container, { paddingTop: 30, paddingBottom: 50 }]}>
                        <View style={[GlobalStyle.row, GlobalStyle.aic]}>
                            <TouchableOpacity onPress={() => toggleUpdateModal(0)} style={{ padding: 10 }}>
                                <FontAwesomeIcon icon={faChevronLeft} size={generalFontSize} color={whiteColor} />
                            </TouchableOpacity>
                            <Text style={[GlobalStyle.secMainHeading]}>Upload Featured Image</Text>
                        </View>

                        {/* <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }]}>
                            <Text style={[GlobalStyle.secMainHeading]}>Upload Featured Image</Text>
                        </View> */}

                        <View style={[GlobalStyle.card, { marginTop: 10 }]}>
                            <ImageBackground
                                imageStyle={{ resizeMode: 'cover', borderRadius: 10, borderWidth: 1, borderColor: textColor }}
                                style={{
                                    width: '100%',
                                    borderRadius: 10,
                                    // objectFit: 'cover',
                                    height: windowWidth / 1.75,
                                    // borderWidth: 1,
                                    // borderColor: textColor
                                }} source={{ uri: featuredImage ? featuredImage?.path : 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg' }}>
                                <View style={{
                                    marginTop: 10,
                                    marginRight: 10,
                                    alignItems: 'flex-end',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            deleteFeaturedImage()
                                        }}
                                    >
                                        <Image style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: 'red', backgroundColor: 'white', borderRadius: 15 }} source={require('./../../../../assets/images/delete.png')} />
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { gap: 10 }]}>
                                {/* <TouchableOpacity
                                    style={[GlobalStyle.themeBtn, { marginTop: 30, flex: 1 }]}
                                    onPress={()=>{
                                        deleteFeaturedImage()
                                    }}
                                >
                                    <Text style={[GlobalStyle.themeBtnText, { fontSize: generalFontSize }]}>Delete image</Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    style={[GlobalStyle.themeBtn, { marginTop: 30, flex: 1 }]}
                                    onPress={() => {
                                        featuredImagePicker()
                                    }}
                                >
                                    <Text style={[GlobalStyle.themeBtnText, { fontSize: generalFontSize }]}>Upload featured image</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', marginTop: 20 }]}>
                            <Text style={[GlobalStyle.secMainHeading]}>Upload Gallery Images</Text>
                        </View>

                        <UploadImage
                            imagePicker={imagePicker}
                            photos={photos}
                            productId={updateProduct?.id}
                            imageIds={image_id}
                            setPhotos={setPhotos}
                            // gelleryImagePicker={gelleryImagePicker}
                            // imagePickerImage={imagePickerImage}
                            deleteImage={deleteImage}
                            deleteButton={true}
                        />
                        {/* {imgErr && <Text style={{ color: 'red', textAlign: 'center', fontSize: generalFontSize, marginTop: 10 }}>Image is Required</Text>} */}
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', marginTop: 20 }]}>
                            <Text style={[GlobalStyle.secMainHeading]}>General Information</Text>
                        </View>
                        <View style={[GlobalStyle.card, { marginTop: 10 }]}>
                            <View style={[GlobalStyle.inputCont, { width: '100%' }]}>
                                <Text style={GlobalStyle.inputLabel}>Product Name</Text>
                                <View style={[GlobalStyle.inputContainer, { marginTop: 5 }]}>
                                    <Controller
                                        control={control}
                                        rules={{ required: 'Product Name is required' }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={GlobalStyle.input}
                                                placeholder='Product Name'
                                                placeholderTextColor={'#707070'}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                        name="name"
                                    />
                                    {errors.name && <Text style={{ color: 'red', marginTop: 5 }}>{errors.name.message}</Text>}
                                </View>
                            </View>
                            <View style={[GlobalStyle.inputCont, { marginTop: 20, width: '100%' }]}>
                                <Text style={GlobalStyle.inputLabel}>Product Description</Text>
                                <View style={[GlobalStyle.inputContainer, { marginTop: 5 }]}>
                                    <Controller
                                        control={control}
                                        rules={{ required: 'Product Description is required' }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                textAlignVertical='top'
                                                style={[GlobalStyle.input, { minHeight: 120, height: 'auto' }]}
                                                placeholder='Product Description'
                                                placeholderTextColor={'#707070'}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                multiline
                                            />
                                        )}
                                        name="description"
                                    />
                                    {errors.description && <Text style={{ color: 'red', marginTop: 5 }}>{errors.description.message}</Text>}
                                </View>
                            </View>
                            <View style={[GlobalStyle.inputCont, { marginTop: 20, width: '100%' }]}>
                                <Text style={GlobalStyle.inputLabel}>Select Category</Text>
                                <View style={[GlobalStyle.inputContainer, { marginTop: 0 }]}>
                                    <Controller
                                        control={control}
                                        rules={{ required: 'Category is required' }}
                                        render={({ field: { onChange, value } }) => (
                                            <Dropdown
                                                style={GlobalStyle.input}
                                                placeholderStyle={{ color: '#707070' }}
                                                selectedTextStyle={{ color: '#000' }}
                                                inputSearchStyle={{ color: '#000' }}
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
                                    {errors.category_id && <Text style={{ color: 'red', marginTop: 5 }}>{errors.category_id.message}</Text>}
                                </View>
                            </View>
                        </View>

                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', marginTop: 30 }]}>
                            <Text style={[GlobalStyle.secMainHeading]}>Pricing and Stock</Text>
                        </View>
                        <View style={[GlobalStyle.card, { marginTop: 10 }]}>
                            <View style={[GlobalStyle.inputCont, { width: '100%' }]}>
                                <Text style={GlobalStyle.inputLabel}>Price</Text>
                                <View style={[GlobalStyle.inputContainer, { marginTop: 5 }]}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: 'Price is required', min: {
                                                value: 1,
                                                message: 'Price Should be minimum of 1'
                                            }
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={GlobalStyle.input}
                                                placeholder='Price'
                                                placeholderTextColor={'#707070'}
                                                keyboardType='numeric'
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                        name="price"
                                    />
                                    {errors.price && <Text style={{ color: 'red', marginTop: 5 }}>{errors.price.message}</Text>}
                                </View>
                            </View>

                            <View style={[GlobalStyle.inputCont, { width: '100%' }]}>
                                <Text style={GlobalStyle.inputLabel}>Shipping Price</Text>
                                <View style={[GlobalStyle.inputContainer, { marginTop: 5 }]}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: 'Shipping Price is required', min: {
                                                value: 0,
                                                message: 'Shipping price Should be minimum of 0'
                                            }
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={GlobalStyle.input}
                                                placeholder='Shipping Price'
                                                placeholderTextColor={'#707070'}
                                                keyboardType='numeric'
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                        name="shipping_price"
                                    />
                                    {errors.shipping_price && <Text style={{ color: 'red', marginTop: 5 }}>{errors.shipping_price.message}</Text>}
                                </View>
                            </View>

                            <View style={[GlobalStyle.inputCont, { marginTop: 20, width: '100%' }]}>
                                <Text style={GlobalStyle.inputLabel}>Stock</Text>
                                <View style={[GlobalStyle.inputContainer, { marginTop: 5 }]}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: 'Stock quantity is required', min: {
                                                value: 1,
                                                message: 'Quantity Should be minimum of 1'
                                            }
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={GlobalStyle.input}
                                                placeholder='Stock quantity'
                                                placeholderTextColor={'#707070'}
                                                keyboardType='numeric'
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                        name="stock_quantity"
                                    />
                                    {errors.stock_quantity && <Text style={{ color: 'red', marginTop: 5 }}>{errors.stock_quantity.message}</Text>}
                                </View>
                            </View>
                            <View style={[GlobalStyle.inputCont, { marginTop: 20, width: '100%' }]}>
                                <Text style={GlobalStyle.inputLabel}>Brand</Text>
                                <View style={[GlobalStyle.inputContainer, { marginTop: 5 }]}>
                                    <Controller
                                        control={control}
                                        // rules={{ required: 'Brand is required' }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={GlobalStyle.input}
                                                placeholder='Brand'
                                                placeholderTextColor={'#707070'}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                        name="brand"
                                    />
                                    {errors.brand && <Text style={{ color: 'red', marginTop: 5 }}>{errors.brand.message}</Text>}
                                </View>
                            </View>

                            <View style={[GlobalStyle.inputCont, { marginTop: 20, width: '100%' }]}>
                                <BouncyCheckbox
                                    size={25}
                                    fillColor={themeColor}
                                    unFillColor="#FFFFFF"
                                    text="Is Featured"
                                    iconStyle={{ borderColor: themeColor }}
                                    innerIconStyle={{ borderWidth: 2 }}
                                    textStyle={{ fontFamily: "FreightBigPro-Bold" }}
                                    isChecked={isFeatured}
                                    onPress={(isChecked) => {
                                        setIsFeatured(isChecked);
                                        setValue('featured', isChecked);
                                    }}
                                    style={{ marginBottom: 15 }}
                                />

                                <BouncyCheckbox
                                    size={25}
                                    fillColor={themeColor}
                                    unFillColor="#FFFFFF"
                                    text="Is Sale"
                                    iconStyle={{ borderColor: themeColor }}
                                    innerIconStyle={{ borderWidth: 2 }}
                                    textStyle={{ fontFamily: "FreightBigPro-Bold" }}
                                    isChecked={isSale}
                                    onPress={(isChecked) => {
                                        setIsSale(isChecked);
                                        setValue('sale', isChecked);
                                    }}
                                    style={{ marginBottom: 15 }}
                                />

                                <BouncyCheckbox
                                    size={25}
                                    fillColor={themeColor}
                                    unFillColor="#FFFFFF"
                                    text="Is Favourites"
                                    iconStyle={{ borderColor: themeColor }}
                                    innerIconStyle={{ borderWidth: 2 }}
                                    textStyle={{ fontFamily: "FreightBigPro-Bold" }}
                                    isChecked={isFavourites}
                                    onPress={(isChecked) => {
                                        setIsFavourites(isChecked);
                                        setValue('favourites', isChecked);
                                    }}
                                    style={{ marginBottom: 15 }}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            disabled={!featuredImage}
                            onPress={handleSubmit(updateProductFunc)}
                            style={[GlobalStyle.themeBtn, { marginTop: 30, width: '100%', backgroundColor: !featuredImage ? 'grey' : themeColor }]}
                        >
                            <Text style={[GlobalStyle.themeBtnText]}>Update product</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
            <NotiModal
                modalIsVisible={loading}
                title={"Loading"}
            />
        </SafeAreaView>
    )
}

export default VendorUpdateProduct;

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
        ...fontFamily('regular')
    },
    selectedTextStyle: {
        fontSize: generalFontSize,
        color: textColor,
        ...fontFamily('regular')
    },
    inputSearchStyle: {
        height: 40,
        fontSize: generalFontSize,
        color: textColor,
        ...fontFamily('regular')
    },
});
