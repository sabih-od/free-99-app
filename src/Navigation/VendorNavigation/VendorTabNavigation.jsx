import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import VendorHome from '../../vendor/VendorDashboard/VendorHome/VendorHome';
import NavHeader from '../../Components/NavHeader/NavHeader';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTab from '../../Components/CustomTab/CustomTab';
import VendorOrders from '../../vendor/VendorDashboard/VendorOrders/VendorOrders';
import VendorProducts from '../../vendor/VendorDashboard/VendorProducts/VendorProducts';
import VendorAddProduct from '../../vendor/VendorDashboard/VendorAddProduct/VendorAddProduct';
import VendorProfile from '../../vendor/VendorDashboard/VendorProfile/VendorProfile';

function VendorTabNavigation() {
    const navigation = useNavigation()
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName='vendorHome'
            screenOptions={{
                headerShown: false
            }}
            tabBar={(props) => <CustomTab {...props} />}
        >
            <Tab.Screen
                name="vendorHome"
                component={VendorHome}
            />
            <Tab.Screen
                name="vendorOrder"
                component={VendorOrders}
            />
            <Tab.Screen
                name="addProduct"
                component={VendorAddProduct}
            />
            <Tab.Screen
                name="vendorProducts"
                component={VendorProducts}
            />
            <Tab.Screen
                name="vendorProfile"
                component={VendorProfile}
            />
        </Tab.Navigator>
    )
}

export default VendorTabNavigation