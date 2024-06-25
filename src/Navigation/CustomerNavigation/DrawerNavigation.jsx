import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../../Customer/Dashboard/Dashboard';
import DrawerComp from '../../Components/Drawer/Drawer';
import NavHeader from '../../Components/NavHeader/NavHeader';
import ProductsPg from '../../Customer/ProductsPg/Products';
import About from '../../Customer/About/About';
import CategoriesPg from '../../Customer/Categories/Categories';
import Settings from '../../Customer/Settings/Settings';
import ChangePassword from '../../Auth/ChangePassword';
import Contact from '../../Customer/Contact/Contact';
import Cart from '../../Customer/Cart/Cart';
import ProductDetail from '../../Customer/ProductDetail/ProductDetail';
import Notifications from '../../Customer/Notifications/Notifications';
import { useNavigation } from '@react-navigation/native';
import CustomerOrders from '../../Customer/CustomerOrders/CustomerOrders';
import ForgetPassword from '../../Auth/ForgetPassword';
import Addresses from '../../Customer/Addresses/Addresses';
import CustomerReviews from '../../Customer/CustomerReviews/CustomerReviews';
import PaymentMethods from '../../Customer/PaymentMethods/PaymentMethods';
import CustomerOrderDetail from '../../Customer/CustomerOrderDetail/CustomerOrderDetail';
import Vendor from '../../vendor/Vendor';
import Checkout from '../../Customer/Checkout/Checkout';
import Thankyou from '../../Customer/Thankyou/Thankyou';
import UserInfo from '../../Customer/UserInfo/UserInfo';
import NotificationSettings from '../../Customer/NotificationSettings/NotificationSettings';
import Packages from '../../Customer/Packages/Packages';
import { createStackNavigator } from '@react-navigation/stack';

const DrawerNavigation = () => {
    const navigation = useNavigation()
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName='dashboard'
            screenOptions={{ header: (props) => <NavHeader isCustomer {...props} navigation={navigation} additionalProp="Your Value" /> }}
            drawerContent={props => <DrawerComp isCustomer />}
        >
            <Stack.Screen
                name="dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen name="products" component={ProductsPg} /> */}
            <Stack.Screen name="about" component={About} />
            {/* <Stack.Screen name="categories" component={CategoriesPg} /> */}
            <Stack.Screen name="settings" component={Settings} />
            <Stack.Screen name="forgetPassword" component={ForgetPassword} />
            <Stack.Screen name='changePass' component={ChangePassword} />
            <Stack.Screen name='contact' component={Contact} />
            <Stack.Screen name='cart' component={Cart} />
            <Stack.Screen name='productDetail' component={ProductDetail} options={{ headerShown: false }} />
            <Stack.Screen name='notifications' component={Notifications} />
            <Stack.Screen name='myOrders' component={CustomerOrders} />
            <Stack.Screen name='address' component={Addresses} />
            <Stack.Screen name='reviews' component={CustomerReviews} />
            <Stack.Screen name='paymentMethods' component={PaymentMethods} />
            <Stack.Screen name='customerOrderDetail' component={CustomerOrderDetail} />
            <Stack.Screen name="vendor" component={Vendor} options={{ headerShown: false }} />
            <Stack.Screen name="checkout" component={Checkout} />
            <Stack.Screen name="thankyou" component={Thankyou} />
            <Stack.Screen name="userInfo" component={UserInfo} />
            <Stack.Screen name='notiSetting' component={NotificationSettings} />
            <Stack.Screen name='packages' component={Packages} />
        </Stack.Navigator>
    )
}

export default DrawerNavigation