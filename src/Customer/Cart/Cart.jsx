import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { bgColor, padding, GlobalStyle, generalFontSize, textColor, itemBg, fontFamily, gap, margin, isIpad } from '../../Styles/Theme';
// import cartData from '../../data/cart';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { cartService } from '../../Services/cartService';

const windowHeight = Dimensions.get('window').height;

const Cart = ({ navigation, route }) => {
    const cartItemsData = route?.params?.item ? route.params.item : '';
    const isAuth = useSelector((state) => state.auth.isAuthenticated)
    const [cartItems, setCartItems] = useState(cartData);
    const cartData = useSelector((state) => state.cart.data);
    const authData = useSelector((state) => state.auth.data)
    const showAlert = () => {
        if (cartData?.length <= 0) {
            // navigation.navigate("home")
            Alert.alert("Sorry", "No items available in Cart.", [
                {
                    text: 'Shop Now',
                    onPress: () => navigation.navigate('home')
                },
                {
                    text: 'Ok',
                    // onPress:()=> Alert.alert
                }
            ])
        }
    }
    useEffect(() => {
        cartService.getCart();
        showAlert()
    }, [])

    useEffect(() => {
        setCartItems(cartData)
    }, [cartData])

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });
        return totalPrice.toFixed(2); // Return the total price rounded to 2 decimal places
    };

    const clearCart = () => {
        cartService.remove()
        setCartItems([]);
    };

    const incrementQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity++;
        setCartItems(updatedCartItems);
    };

    const decrementQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 0) {
            updatedCartItems[index].quantity--;
        }
        setCartItems(updatedCartItems);
    };

    const checkout = () => {
        if (isAuth) {
            navigation.navigate("checkout")
        }
        else {
            Alert.alert("Login Required", "You need Login to proceed", [
                {
                    text: 'cancel'
                },
                {
                    text: 'login',
                    onPress: () => { navigation.reset({ index: 0, routes: [{ name: 'welcome' }] }) }
                }
            ])
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
            <View style={[GlobalStyle.container, padding('top', 20)]}>
                <Text style={styles.mainHeading}>{cartItems?.length ? 'Confirm Your Purchase' : 'please add an Item to cart'}</Text>

                <View style={styles.itemBox}>
                    <Text style={styles.itemBoxTitle}>{cartItems?.length ?? 0} items</Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={cartItems}
                    renderItem={({ item, index }) => (
                        <View style={[GlobalStyle.row, GlobalStyle.aic, styles.cartItem]} key={index}>
                            <Image style={styles.cartItemImage} source={{ uri: item?.image }} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.cartItemTitle}>{item.name}</Text>
                                <Text style={styles.cartItemName}>{item.sellerName}</Text>
                                {item.rating && (
                                    <View style={styles.ratingContainer}>
                                        <FontAwesomeIcon icon={faStar} color={"#FFA161"} size={generalFontSize - 4} />
                                        <Text style={styles.cartItemRating}>{item.rating}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={[GlobalStyle.aic, gap(5), { marginTop: 'auto' }]}>
                                <Text style={styles.cartItemPrice}>Price: ${(item.price * item.quantity).toFixed(2)}</Text>
                                <View style={[GlobalStyle.row, GlobalStyle.aic, gap(10), margin("horizontal", "auto")]}>
                                    <TouchableOpacity onPress={() => cartService.subtract(item)} style={[styles.quantityBtn]}>
                                        <FontAwesomeIcon icon={faMinus} size={generalFontSize} color={textColor} />
                                    </TouchableOpacity>
                                    <Text style={styles.cartItemPrice}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => cartService.addToCart(item)} style={styles.quantityBtn}>
                                        <FontAwesomeIcon icon={faPlus} size={generalFontSize} color={textColor} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    style={{ height: windowHeight / 2 }}
                />
                {cartItems?.length > 0 && (
                    <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }, padding('vertical', 25)]}>
                        <Text style={[styles.mainHeading, { fontSize: generalFontSize, marginBottom: 0 }]}>
                            Total Price:
                        </Text>
                        <Text style={styles.cartItemPrice}>${calculateTotalPrice()}</Text>
                    </View>
                )}
                <TouchableOpacity style={GlobalStyle.themeBtn} onPress={cartItems?.length > 0 ? () => checkout() : () => navigation.navigate('dashboard')}>
                    <Text style={GlobalStyle.themeBtnText}>{cartItems?.length > 0 ? "Proceed to pay" : "go to shopping"}</Text>
                </TouchableOpacity>
                {cartItems?.length > 0 && (
                    <TouchableOpacity
                        onPress={clearCart}
                        style={[GlobalStyle.row, GlobalStyle.jc, GlobalStyle.aic, { width: '100%', marginTop: 'auto' }, margin('top', 20)]}
                    >
                        <Text style={[GlobalStyle.themeBtnText, { fontSize: 13, textTransform: 'none', textDecorationLine: 'underline' }]}>
                            Clear Cart
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Cart;

const styles = StyleSheet.create({
    mainHeading: {
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 8,
        fontWeight: '900',
        marginBottom: 0,
        color: textColor,
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    itemBox: {
        backgroundColor: itemBg,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignSelf: 'flex-start',
        marginHorizontal: 'auto',
        borderRadius: 5,
        marginTop: 10
    },
    itemBoxTitle: {
        color: textColor,
        ...fontFamily("regular"),
        fontSize: generalFontSize - 4
    },
    cartItem: {
        borderBottomColor: '#707070',
        borderBottomWidth: 1,
        paddingVertical: 25,
        gap: 18
    },
    cartItemImage: {
        width: isIpad ? 150 : 75,
        height: isIpad ? 150 : 75,
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: textColor,
        borderWidth: 1
    },
    cartItemTitle: {
        color: textColor,
        ...fontFamily("regular"),
        fontSize: generalFontSize - 2,
        fontWeight: '600',
        flex: 1
    },
    cartItemName: {
        color: textColor,
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize,
        fontWeight: '600'
    },
    cartItemRating: {
        color: textColor,
        ...fontFamily('regular'),
        fontSize: generalFontSize - 4
    },
    cartItemPrice: {
        color: textColor,
        ...fontFamily('medium'),
        fontSize: generalFontSize - 2,
        fontWeight: "600"
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    quantityBtn: {
        borderWidth: 1,
        borderColor: textColor,
        padding: 5,
        borderRadius: 5
    },
});
