import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  bgColor,
  gap,
  generalFontSize,
  GlobalStyle,
  margin,
  padding,
  secondColor,
  textColor,
  fontFamily,
  itemBg,
  windowWidth,
  windowHeight,
  themeColor,
  whiteColor,
  blackColor,
  isIpad,
} from '../../Styles/Theme';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faHeart,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-native-reanimated-carousel';
import {errorToast, successToast} from '../../Utils/toast';
import {useSelector, useDispatch} from 'react-redux';
import {cartService} from '../../Services/cartService';
import {wishlistService} from '../../Services/wishlistService';
import {shopService} from '../../Services/shopService';
import ProductRating from '../../Components/ProductRating/ProductRating';
import {productService} from '../../Services/productService';
import axios from 'axios';
import ImageModal from '../../Components/ImageModal';
import {BASE_URL} from '../../Constants';
import {chatService} from '../../Services/chatService';
// import Chat from '../Chat';
import Chat from '../../Components/Chat/Chat';
import {resetChatMessages} from '../../Redux/Store/Slices/Chat';

const LoadingSkeleton = () => {
  const [opacity] = useState(new Animated.Value(0.3));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <View>
      <View
        style={[
          styles.imgBoxSkeleton,
          {height: Dimensions.get('window').height / 2.2},
        ]}>
        <View
          style={[
            GlobalStyle.row,
            GlobalStyle.aic,
            styles.floatingBtnContSkeleton,
          ]}>
          <Animated.View style={[styles.quantityBtnSkeleton, {opacity}]} />
        </View>
        <Animated.View style={[styles.imgSkeleton, {opacity}]} />
      </View>
      <View style={[GlobalStyle.container, {height: '100%'}]}>
        <View
          style={[
            GlobalStyle.row,
            {justifyContent: 'space-between', marginTop: 25},
          ]}>
          <View style={{width: windowWidth - 150}}>
            <Animated.View style={[styles.titleSkeleton, {opacity}]} />
            <Animated.View style={[styles.subtitleSkeleton, {opacity}]} />
          </View>
          <View style={{alignItems: 'center'}}>
            <Animated.View style={[styles.priceSkeleton, {opacity}]} />
          </View>
        </View>
        <View
          style={[
            GlobalStyle.row,
            GlobalStyle.aic,
            {justifyContent: 'space-between', marginVertical: 10},
          ]}>
          <Animated.View style={[styles.minBtnSkeleton, {opacity}]} />
          <Animated.View
            style={[
              styles.minBtnSkeleton,
              {backgroundColor: 'grey', margin: 10, opacity},
            ]}
          />
          <Animated.View
            style={[
              GlobalStyle.themeBtn,
              {flex: 1, backgroundColor: 'grey', height: 50, opacity},
            ]}
          />
        </View>
        <View style={padding('bottom', 10)}>
          <View style={styles.sectionHeaderSkeleton}>
            <Animated.View style={[styles.headingSkeleton, {opacity}]} />
          </View>
          <Animated.View style={[styles.descSkeleton, {opacity}]} />
        </View>
        <View style={padding('bottom', 10)}>
          <View style={styles.sectionHeaderSkeleton}>
            <Animated.View style={[styles.headingSkeleton, {opacity}]} />
          </View>
          <Animated.View style={[styles.reviewSkeleton, {opacity}]} />
          <Animated.View style={[styles.reviewSkeleton, {opacity}]} />
        </View>
      </View>
    </View>
  );
};

const ProductDetail = ({navigation, route}) => {
  const {id} = route.params;
  const [item, setItem] = useState();
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const authData = useSelector(state => state.auth.data);
  const {messages} = useSelector(state => state.chat);
  const {event} = useSelector(state => state.pusher);

  const dispatch = useDispatch();

  const [isFav, setIsFav] = useState(false);
  const [disableBtn, setDisableBtn] = useState(item?.stock_quantity <= 0);
  const [prodLoading, setProdLoading] = useState();
  const [wishlistLoading, setWishlistLoading] = useState();
  const cartLoading = useSelector(state => state.cart.loading);
  const [img, setImg] = useState(null);
  const [bestOfferModalVisible, setBestOfferModalVisible] = useState(false);
  const [productFeedbackModalVisible, setProductFeedbackVisble] =
    useState(false);
  const [productFeedbackLoading, setProductFeedbackLoading] = useState(false);
  const [bestOfferLoading, setBestOfferLoading] = useState(false);
  const token = useSelector(state => state.auth.token);

  const ProductFeedbackModal = () => {
    const [feedback, setFeedack] = useState('');
    const submitFeedback = async () => {
      if (!feedback) {
        return Alert.alert('Error', 'Please enter a feedback.');
      }
      setProductFeedbackLoading(true);

      // Set up form data
      const formData = new FormData();
      formData.append('product_id', id);
      formData.append('feedback', feedback);

      // Set up headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.post(
          // 'https://dev.free99us.com/api/product/best/offer',
          'https://free99us.com/api/product-feedback',
          formData,
          {headers},
        );

        // Handle success response
        successToast(response.data.message);
        setProductFeedbackVisble(false);
        setFeedack('');
      } catch (error) {
        // Handle error response
        errorToast('Failed to submit feedback. Please try again.');
        console.error('Error submitting feedback:', error);
      } finally {
        setProductFeedbackLoading(false);
      }
    };
    return (
      <Modal
        avoidKeyboard={true}
        visible={productFeedbackModalVisible}
        transparent={true}
        onRequestClose={() => setProductFeedbackVisble(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: Dimensions.get('window').width - 40,
              height: 220,
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  color: blackColor,
                  fontSize: generalFontSize + 5,
                  ...fontFamily('regular'),
                }}>
                Enter Your Feedback
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setProductFeedbackVisble(false)}>
                <Image
                  source={require('../../../assets/images/close.png')}
                  style={{
                    height: 30,
                    width: 30,
                    resizeMode: 'contain',
                    tintColor: blackColor,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: Dimensions.get('window').width - 80,
                height: 55,
                alignSelf: 'center',
                borderRadius: 10,
                marginTop: 20,
                borderColor: 'black',
                borderWidth: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{
                    color: blackColor,
                    fontSize: generalFontSize,
                    ...fontFamily('regular'),
                  }}></Text>
                <TextInput
                  keyboardType="string"
                  style={{
                    color: blackColor,
                    flex: 1,
                    marginLeft: 5,
                    fontSize: generalFontSize,
                    ...fontFamily('regular'),
                  }}
                  placeholder="Enter Your Feedback"
                  placeholderTextColor={'grey'}
                  value={feedback}
                  onChangeText={setFeedack}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={submitFeedback}
              style={{
                backgroundColor: themeColor,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                width: Dimensions.get('window').width - 80,
                borderRadius: 10,
                alignSelf: 'center',
              }}
              disabled={productFeedbackLoading}>
              {productFeedbackLoading ? (
                <ActivityIndicator color={whiteColor} size={'small'} />
              ) : (
                <Text
                  style={{
                    color: whiteColor,
                    fontSize: generalFontSize + 5,
                    fontFamily: 'FreightBigPro-Bold',
                  }}>
                  SUBMIT
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  const BestOfferModal = () => {
    const [bestOfferPrice, setBestOfferPrice] = useState('');
    const submitBestOffer = async () => {
      if (!bestOfferPrice) {
        return Alert.alert('Error', 'Please enter a price.');
      }

      setBestOfferLoading(true);

      // Set up form data
      const formData = new FormData();
      formData.append('productId', id);
      formData.append('price', bestOfferPrice);

      // Set up headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.post(
          // 'https://dev.free99us.com/api/product/best/offer',
          // 'https://free99us.com/api/product/best/offer',
          `${BASE_URL}/product/best/offer`,
          formData,
          {headers},
        );

        // Handle success response
        successToast(response.data.message);
        setBestOfferModalVisible(false);
        setBestOfferPrice('');
      } catch (error) {
        // Handle error response
        errorToast('Failed to submit best offer. Please try again.');
        console.error('Error submitting best offer:', error);
      } finally {
        setBestOfferLoading(false);
      }
    };
    return (
      <Modal
        avoidKeyboard={true}
        visible={bestOfferModalVisible}
        transparent={true}
        onRequestClose={() => setBestOfferModalVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: Dimensions.get('window').width - 40,
              height: 220,
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  color: blackColor,
                  fontSize: generalFontSize + 5,
                  ...fontFamily('regular'),
                }}>
                Enter Your Best Price
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setBestOfferModalVisible(false)}>
                <Image
                  source={require('../../../assets/images/close.png')}
                  style={{
                    height: 30,
                    width: 30,
                    resizeMode: 'contain',
                    tintColor: blackColor,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: Dimensions.get('window').width - 80,
                height: 55,
                alignSelf: 'center',
                borderRadius: 10,
                marginTop: 20,
                borderColor: 'black',
                borderWidth: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{
                    color: blackColor,
                    fontSize: generalFontSize,
                    ...fontFamily('regular'),
                  }}>
                  $
                </Text>
                <TextInput
                  keyboardType="numeric"
                  style={{
                    color: blackColor,
                    flex: 1,
                    marginLeft: 5,
                    fontSize: generalFontSize,
                    ...fontFamily('regular'),
                  }}
                  placeholder="Enter Price"
                  placeholderTextColor={'grey'}
                  value={bestOfferPrice}
                  onChangeText={setBestOfferPrice}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={submitBestOffer}
              style={{
                backgroundColor: themeColor,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                width: Dimensions.get('window').width - 80,
                borderRadius: 10,
                alignSelf: 'center',
              }}
              disabled={bestOfferLoading}>
              {bestOfferLoading ? (
                <ActivityIndicator color={whiteColor} size={'small'} />
              ) : (
                <Text
                  style={{
                    color: whiteColor,
                    fontSize: generalFontSize + 5,
                    fontFamily: 'FreightBigPro-Bold',
                  }}>
                  SUBMIT
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const [isVisible, setIsVisible] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const imageZoomRef = useRef(null);

  const openImage = index => {
    // setCurrentIndex(index);
    setImg(index.image);
    setIsVisible(true);
  };

  const closeImageZoom = () => {
    setIsVisible(false);
    // setCurrentIndex(0);
  };

  const fetchProduct = useCallback(async () => {
    setProdLoading(prevFav => !prevFav);
    // const response = await productService.getProductDetail(id).then();
    await productService.getProductDetail(id).then(async resp => {
      await setItem(resp.data);
      setProdLoading(prevFav => !prevFav);
    });
  }, []);

  useEffect(() => {
    const isWishlist = async id => {
      try {
        const response = await wishlistService.isWishlisted(id);

        setIsFav(true);
      } catch (error) {
        console.error('Failed to fetch:', error);
        setIsFav(false);
      }
    };

    isWishlist(id);
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    setDisableBtn(item?.stock_quantity <= 0);
  }, [item?.stock_quantity]);

  const toggleWishlist = async () => {
    setWishlistLoading(true);
    try {
      if (isAuth) {
        try {
          await wishlistService.addToWishlist(item.id).then(() => {
            wishlistService.isWishlisted(id);
          });

          if (isFav) {
            successToast('Item Removed from Wishlist');
          } else {
            successToast('Item Added to Wishlist');
          }
          wishlistService.getWishlist();
          shopService.getCategories();
          shopService.getAllCategoriesProducts();
          setIsFav(prevFav => !prevFav);
        } catch (error) {
          errorToast('Something Went Wrong!');
        }
      } else {
        Alert.alert(
          'Login Required',
          'You need to Login to add items to wishlist',
          [
            {text: 'cancel'},
            {text: 'login', onPress: () => navigation.navigate('login')},
          ],
        );
      }
    } finally {
      setWishlistLoading(false);
      await productService.getProductDetail(id).then(async resp => {
        await setItem(resp.data);
      });
    }
  };

  const addToCart = useCallback(
    (item, url) => {
      if (disableBtn) {
        Alert.alert('Sorry', 'The Item is out of Stock.', [
          {text: 'Shop Now', onPress: () => navigation.navigate('shop')},
          {text: 'Ok'},
        ]);
        return;
      }

      if (isAuth) {
        cartService
          .addToCart(item)
          .then(() => {
            if (url != 'cart') {
              navigation.navigate(url);
            }
          })
          .catch(err => {
            console.error('err', err);
          });
      } else if (url === 'checkout') {
        Alert.alert('Login Required', 'You need to Login to proceed', [
          {text: 'cancel'},
          {text: 'login', onPress: () => navigation.navigate('login')},
        ]);
      } else {
        cartService
          .addToCart(item)
          .then(() => {
            if (url != 'cart') {
              navigation.navigate(url);
            }
          })
          .catch(err => {
            console.error('err', err);
          });
      }
    },
    [disableBtn, isAuth, navigation],
  );

  // const galleryImages = currentIndex => setImg(item?.media[currentIndex]?.image);

  return (
    <ScrollView
      style={{
        backgroundColor: bgColor,
        flex: 1,
        minHeight: windowHeight,
      }}
      keyboardShouldPersistTaps="always"
      // showsVerticalScrollIndicator={false}
    >
      {prodLoading ? (
        <LoadingSkeleton />
      ) : isVisible ? (
        <ImageModal
          isVisible={isVisible}
          closeImageZoom={closeImageZoom}
          imageZoomRef={imageZoomRef}
          img={img}
        />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View>
            <View style={styles.imgBox}>
              <View
                style={[
                  GlobalStyle.row,
                  GlobalStyle.aic,
                  styles.floatingBtnCont,
                ]}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.quantityBtn}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    size={generalFontSize}
                    color={'#fff'}
                  />
                </TouchableOpacity>
              </View>
              {item?.media.length > 1 ? (
                <Carousel
                  loop
                  width={windowWidth}
                  autoPlay={true}
                  data={item?.media}
                  scrollAnimationDuration={2000}
                  renderItem={({item: imgItem, index}) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => openImage(imgItem)}>
                      <ImageBackground
                        key={index}
                        source={{uri: imgItem.image}}
                        style={[
                          styles.img,
                          {alignItems: 'center', justifyContent: 'center'},
                        ]}>
                        {disableBtn && (
                          <Text style={styles.outofstocktext}>
                            Item is out of Stock.
                          </Text>
                        )}
                      </ImageBackground>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => openImage(item?.media[0])}>
                  <ImageBackground
                    source={{uri: item?.media[0].image}}
                    style={[
                      styles.img,
                      {alignItems: 'center', justifyContent: 'center'},
                    ]}>
                    {disableBtn && (
                      <Text style={styles.outofstocktext}>
                        Item is out of Stock.
                      </Text>
                    )}
                  </ImageBackground>
                </TouchableOpacity>
              )}
              {/* {isVisible && (
                <ImageModal
                  isVisible={isVisible}
                  closeImageZoom={closeImageZoom}
                  imageZoomRef={imageZoomRef}
                  img={img}
                />
              )} */}
              {/* {isVisible && (
                <ImageViewing
                  images={item?.media?.map(mediaItem => ({ uri: mediaItem?.image }))}
                  imageIndex={currentIndex}
                  visible={isVisible}
                  onRequestClose={() => setIsVisible(false)}
                  doubleTapToZoomEnabled={true}
                  swipeToCloseEnabled={true}
                />
              )} */}
            </View>
            <View style={[GlobalStyle.container, {height: '100%'}]}>
              <View
                style={[
                  GlobalStyle.row,
                  {justifyContent: 'space-between', marginTop: 25},
                ]}>
                <View style={{width: windowWidth - 150}}>
                  <Text style={styles.itemTitle}>{item?.name}</Text>
                  {item?.stock_quantity < 20 && (
                    <Text style={styles.minTitle}>
                      Only{' '}
                      <Text style={{color: 'red'}}>{item?.stock_quantity}</Text>{' '}
                      {item?.stock_quantity <= 1 ? 'item' : 'items'} remaining.
                    </Text>
                  )}
                  {item?.product_views?.length > 0 && (
                    <Text style={styles.minTitle}>
                      Viewed by {item?.product_views?.length} people.
                    </Text>
                  )}
                  {item?.shipping_price > 0 && (
                    <Text style={styles.minTitle}>
                      Shipping Price ${item?.shipping_price}
                    </Text>
                  )}
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.itemPrice}>${item?.price}</Text>
                </View>
              </View>
              <View
                style={[
                  GlobalStyle.row,
                  GlobalStyle.aic,
                  gap(10),
                  {justifyContent: 'space-between', marginVertical: 10},
                ]}>
                <TouchableOpacity
                  onPress={toggleWishlist}
                  style={styles.minBtn}
                  disabled={wishlistLoading}>
                  {wishlistLoading ? (
                    <ActivityIndicator color={textColor} size={'small'} />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      color={isFav ? 'red' : textColor}
                      size={generalFontSize}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={disableBtn}
                  onPress={() => {
                    if (
                      route?.params?.data?.user_id ===
                      authData?.user_subscription?.user_id
                    ) {
                      return Alert.alert('You cannot buy your own product');
                    }
                    addToCart(item, 'cart');
                  }}
                  style={[
                    styles.minBtn,
                    {backgroundColor: disableBtn ? '#ddd' : itemBg},
                  ]}>
                  {cartLoading ? (
                    <ActivityIndicator color={textColor} size={'small'} />
                  ) : (
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      color={disableBtn ? blackColor : whiteColor}
                      size={generalFontSize}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={disableBtn}
                  onPress={() => {
                    if (
                      route?.params?.data?.user_id ===
                      authData?.user_subscription?.user_id
                    ) {
                      return Alert.alert('You cannot buy your own product');
                    }
                    addToCart(item, 'checkout');
                  }}
                  style={[
                    GlobalStyle.themeBtn,
                    {
                      flex: 1,
                      backgroundColor: disableBtn ? '#ddd' : themeColor,
                    },
                  ]}>
                  <Text
                    style={[
                      GlobalStyle.themeBtnText,
                      {color: disableBtn ? blackColor : whiteColor},
                    ]}>
                    Buy Now
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={disableBtn}
                  onPress={() => {
                    if (
                      route?.params?.data?.user_id ===
                      authData?.user_subscription?.user_id
                    ) {
                      return Alert.alert(
                        'You cannot give best offer to your own product',
                      );
                    }
                    isAuth
                      ? setBestOfferModalVisible(true)
                      : Alert.alert(
                          'Login Required',
                          'You need to Login to add items to wishlist',
                          [
                            {text: 'cancel'},
                            {
                              text: 'login',
                              onPress: () => navigation.navigate('login'),
                            },
                          ],
                        );
                  }}
                  style={[
                    GlobalStyle.themeBtn,
                    {
                      flex: 1,
                      backgroundColor: disableBtn ? '#ddd' : themeColor,
                    },
                  ]}>
                  <Text
                    style={[
                      GlobalStyle.themeBtnText,
                      {color: disableBtn ? blackColor : whiteColor},
                    ]}>
                    Best Offer
                  </Text>
                </TouchableOpacity>
              </View>
              <BestOfferModal />
              <View style={padding('bottom', 10)}>
                <View style={styles.sectionHeader}>
                  <Text style={[GlobalStyle.secHeading, {marginBottom: 0}]}>
                    Description
                  </Text>
                </View>
                <Text style={styles.minDesc}>{item?.description}</Text>
              </View>
              <View style={padding('bottom', 10)}>
                <View style={styles.sectionHeader}>
                  <Text style={[GlobalStyle.secHeading, {marginBottom: 0}]}>
                    Reviews
                  </Text>
                </View>
                {item?.reviews?.map(review => (
                  <ProductRating key={review.id} review={review} />
                ))}
              </View>

              <View style={padding('bottom', 10)}>
                <TouchableOpacity
                  disabled={disableBtn}
                  onPress={() => {
                    if (
                      route?.params?.data?.user_id ===
                      authData?.user_subscription?.user_id
                    ) {
                      return Alert.alert(
                        'You cannot give feedback to your own product',
                      );
                    }
                    isAuth
                      ? setProductFeedbackVisble(true)
                      : Alert.alert(
                          'Login Required',
                          'You need to Login to add feeback',
                          [
                            {text: 'cancel'},
                            {
                              text: 'login',
                              onPress: () => navigation.navigate('login'),
                            },
                          ],
                        );
                  }}
                  style={[
                    GlobalStyle.themeBtn,
                    {
                      flex: 1,
                      backgroundColor: disableBtn ? '#ddd' : themeColor,
                    },
                  ]}>
                  <Text
                    style={[
                      GlobalStyle.themeBtnText,
                      {color: disableBtn ? blackColor : whiteColor},
                    ]}>
                    Product Feedback
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    marginTop: 25,
                  }}>
                  <Chat
                    participants={[
                      {
                        user: item?.user,
                        // user_id: item?.user?.id,
                        // name: item?.user?.name,
                      },
                    ]}
                    messages={messages}
                    get={({conversationalItem}) => {
                      chatService.fetchMessages(conversationalItem?.user?.id);
                    }}
                    post={({conversationalItem, payload}) => {
                      chatService
                        .sendMessages(conversationalItem?.user?.id, payload)
                        .then(() => {
                          chatService.fetchMessages(
                            conversationalItem?.user?.id,
                          );
                        });
                    }}
                    reset={() => dispatch(resetChatMessages())}
                    event={event}
                  />
                </View>
              </View>
              <ProductFeedbackModal />
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  itemTitle: {
    fontSize: generalFontSize + 10,
    color: textColor,
    fontFamily: 'FreightBigPro-Bold',
  },
  minTitle: {
    fontSize: generalFontSize - 2,
    color: textColor,
    ...fontFamily('regular'),
    marginTop: 5,
  },
  minDesc: {
    fontSize: generalFontSize - 4,
    color: textColor,
    ...fontFamily('regular'),
    lineHeight: 25,
  },
  itemPrice: {
    ...fontFamily('regular'),
    color: textColor,
    fontSize: generalFontSize + 4,
  },
  imgBox: {
    width: windowWidth,
    height: windowHeight / 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  quantityBtn: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  // quantity: {
  //   fontSize: generalFontSize - 4,
  //   color: bgColor,
  //   ...fontFamily('regular'),
  //   lineHeight: 25,
  // },
  // overlayModal: {
  //     position: 'absolute',
  //     bottom: 0,
  //     paddingBottom: 30,
  //     paddingTop: 10,
  //     width: windowWidth,
  //     paddingHorizontal: 20
  // },
  minBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: itemBg,
    alignItems: 'center', // Ensure the ActivityIndicator and FontAwesomeIcon are centered
    justifyContent: 'center', // Ensure the ActivityIndicator and FontAwesomeIcon are centered
    height: isIpad ? 60 : 40, // Added height to ensure proper spacing for ActivityIndicator
    width: isIpad ? 60 : 40, // Added width to ensure proper spacing for ActivityIndicator
  },
  floatingBtnCont: {
    justifyContent: 'space-between',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight,
    zIndex: 100,
    flex: 1,
    width: windowWidth,
    paddingHorizontal: 20,
  },
  outofstocktext: {
    color: textColor,
    fontSize: generalFontSize + 10,
    ...fontFamily('regular'),
    textTransform: 'uppercase',
  },
  sectionHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: itemBg,
    marginTop: 10,
    marginBottom: 5,
  },
  imgBoxSkeleton: {
    width: windowWidth,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingBtnContSkeleton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  quantityBtnSkeleton: {
    width: 40,
    height: 40,
    backgroundColor: 'grey',
    borderRadius: 20,
  },
  imgSkeleton: {
    width: '100%',
    height: 300,
    backgroundColor: 'grey',
  },
  titleSkeleton: {
    width: '80%',
    height: 20,
    backgroundColor: 'grey',
    borderRadius: 4,
    marginBottom: 10,
  },
  subtitleSkeleton: {
    width: '50%',
    height: 20,
    backgroundColor: 'grey',
    borderRadius: 4,
    marginBottom: 10,
  },
  priceSkeleton: {
    width: 60,
    height: 20,
    backgroundColor: 'grey',
    borderRadius: 4,
  },
  minBtnSkeleton: {
    width: 40,
    height: 40,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  sectionHeaderSkeleton: {
    marginBottom: 10,
  },
  headingSkeleton: {
    width: '30%',
    height: 20,
    backgroundColor: 'grey',
    borderRadius: 4,
  },
  descSkeleton: {
    width: '100%',
    height: 80,
    backgroundColor: 'grey',
    borderRadius: 4,
    marginBottom: 10,
  },
  reviewSkeleton: {
    width: '100%',
    height: 60,
    backgroundColor: 'grey',
    borderRadius: 4,
    marginBottom: 10,
  },
});
