import { store } from "./../Redux/Store";
import { setCart, setTotalPrice, setTotalQuantity, setLoading } from "../Redux/Store/Slices/Cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorToast, successToast } from "../Utils/toast";
import { Alert } from "react-native";

// Cart Services
export const cartService = {
    addToCart: async (item) => {
        store.dispatch(setLoading(true));
        const productToAdd = {
            id: item.id,
            name: item.name,
            quantity: 1,
            price: item.price,
            shippingPrice: item.shipping_price,
            stock_quantity: item.stock_quantity,
            image: item?.media ? item?.media[0]?.image : item.image
        };

        let cartItems = await AsyncStorage.getItem('cart');

        if (cartItems && typeof cartItems === 'string') {
            cartItems = JSON.parse(cartItems);

            const findCartItemIndex = cartItems.findIndex(x => x.id === productToAdd.id);

            // if found this item in the cart
            if (findCartItemIndex !== -1) {
                const findCartItem = cartItems[findCartItemIndex];
                if (findCartItem?.stock_quantity > findCartItem.quantity) {
                    findCartItem.quantity++;
                    successToast("Item quantity updated in Cart.");
                } else {
                    Alert.alert("Sorry", "The Item is out of Stock.");
                }
            } else {
                if (productToAdd.stock_quantity > 0) {
                    cartItems.push(productToAdd);
                    successToast("Item Added to Cart.");
                } else {
                    Alert.alert("Sorry", "The Item is out of Stock.");
                }
            }
        } else {
            if (productToAdd.stock_quantity > 0) {
                cartItems = [productToAdd];
                successToast("Item Added to Cart.");
            } else {
                Alert.alert("Sorry", "The Item is out of Stock.");
            }
        }

        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
        store.dispatch(setLoading(false));
        store.dispatch(setCart(cartItems));
        return cartItems;
    },
    subtract: async (item) => {
        let cartItems = await AsyncStorage.getItem('cart');

        if (cartItems && typeof cartItems === 'string') {
            cartItems = JSON.parse(cartItems);
            const findCartItemIndex = cartItems.findIndex(x => x.id === item.id);
            if (findCartItemIndex !== -1) {
                const findCartItem = cartItems[findCartItemIndex];
                if (findCartItem?.quantity > 1) {
                    findCartItem.quantity--;
                } else {
                    cartItems.splice(findCartItemIndex, 1);
                }
            }
        }

        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));

        store.dispatch(setCart(cartItems));
        return cartItems;
    },
    remove: async () => {
        await AsyncStorage.removeItem('cart');

        store.dispatch(setCart([]));
        store.dispatch(setTotalPrice(0));
        store.dispatch(setTotalQuantity(0));
        // Remove setInfo dispatch as it is not defined in this context
    },

    getCart: async () => {
        try {
            let cartItems = await AsyncStorage.getItem('cart');
            let totalPrice = 0;
            let totalQuantity = 0;

            if (cartItems && typeof cartItems === 'string') {
                cartItems = JSON.parse(cartItems);
                if (cartItems?.length > 0) {
                    cartItems.forEach(cartItem => {
                        totalPrice += (cartItem?.price * cartItem?.quantity) + Number(cartItem?.shippingPrice);
                        totalQuantity += cartItem?.quantity;
                    });
                }

                store.dispatch(setCart(cartItems));
                store.dispatch(setTotalPrice(totalPrice));
                store.dispatch(setTotalQuantity(totalQuantity));

                return cartItems;
            }

            return [];
        } catch (error) {
            console.log("Failed to get cart items:", error);
        }
    }
};
