import { store } from "./../Redux/Store";
import { setCart, setTotalPrice, setTotalQuantity, setLoading, setDiscount, setActualPrice } from "../Redux/Store/Slices/Cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorToast, successToast } from "../Utils/toast";
import { Alert } from "react-native";
import { BASE_URL } from '../Constants';
import axios from "axios";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
});

const fetchCart = async () => {
    try {
        const discount = (await store.getState().cart).discount;
        let cartItems = await AsyncStorage.getItem('cart');
        let totalPrice = 0;
        let totalQuantity = 0;

        if (cartItems && typeof cartItems === 'string') {
            cartItems = await JSON.parse(cartItems);
            
            if (cartItems?.length > 0) {
                cartItems.forEach(cartItem => {
                    totalPrice += (cartItem?.price * cartItem?.quantity) + Number(cartItem?.shippingPrice);
                    totalQuantity += cartItem?.quantity;
                });
            }

            await store.dispatch(setCart(cartItems));
            await store.dispatch(setActualPrice(totalPrice)); // set actual price
            await store.dispatch(setTotalQuantity(totalQuantity));
            
            if(discount && discount > 0) {
                const discountPercent = parseInt(discount) / 100;
                const discountedAmount = parseFloat(totalPrice) - (parseFloat(totalPrice) * discountPercent);

                await store.dispatch(setTotalPrice(discountedAmount)); // set total price with discount
            }
            else {
                await store.dispatch(setTotalPrice(totalPrice)); // set total price without discount
            }

            return cartItems;
        }

        return [];
    } catch (error) {
        console.log("Failed to get cart items:", error);
    }
}

const resetCart = async () => {
    await AsyncStorage.removeItem('cart');

    store.dispatch(setCart([]));
    store.dispatch(setTotalPrice(0));
    store.dispatch(setTotalQuantity(0));
    store.dispatch(setDiscount(0));
    store.dispatch(setActualPrice(0));
}

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

        await fetchCart();
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

        if(!cartItems || cartItems?.length === 0) await resetCart();

        await fetchCart();
        return cartItems;
    },
    remove: async () => await resetCart(),
    getCart: async () => await fetchCart(),
    applyVoucher: async (payload) => {
        store.dispatch(setLoading(true))
        try {
            const response = await apiClient.post('/apply/voucher', payload);
            console.log('response?.data', response?.data);

            successToast(response?.data.message);

            store.dispatch(setTotalPrice(response?.data?.data?.total_amount_with_discount));
            store.dispatch(setDiscount(response?.data?.data?.discounted_amount));

            store.dispatch(setLoading(false))
            return response?.data;
        } catch (error) {
            console.log('Error making request:', error?.response?.data?.message);
            errorToast(error?.response?.data?.message)
            store.dispatch(setLoading(false))
            throw error;
        }
    },
};