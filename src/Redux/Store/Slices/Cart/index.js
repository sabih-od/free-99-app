import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cartService } from '../../../../Services/cartService';

const initialState = async () => {
    return {
        data: [],
        totalPrice: 0,
        totalQuantity: 0,
        info: {},
        loading: false
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.data = action.payload.map(item => ({
                ...item,
                shipping_price: item.shipping_price // Ensure shipping_price is included
            }));
            AsyncStorage.setItem('cart', JSON.stringify(state.data));
            // Calculate totalPrice and totalQuantity here if necessary
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action?.payload;
        },
        setTotalQuantity: (state, action) => {
            state.totalQuantity = action?.payload;
        },
        setInfo: (state, action) => {
            state.info = {
                name: action?.payload?.name ?? null,
                email: action?.payload?.email ?? null,
                password: action?.payload?.password ?? null,
                phone: action?.payload?.phone ?? null,
                country: action?.payload?.country ?? null,
                city: action?.payload?.city ?? null,
                zip: action?.payload?.zip ?? null,
                state: action?.payload?.state ?? null,
                address: action?.payload?.address ?? null,
                shippingAddress: action?.payload?.shippingAddress ?? null
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // resetCart: () => initialState

    }
});

// Export the generated action creators and reducer
export const { setCart, setTotalPrice, setTotalQuantity, setLoading } = cartSlice.actions;
export default cartSlice.reducer;