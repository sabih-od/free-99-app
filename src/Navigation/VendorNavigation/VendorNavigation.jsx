import React, { useEffect } from 'react'
import VendorDashboard from '../../vendor/VendorDashboard/VendorDashboard';
import NavHeader from '../../Components/NavHeader/NavHeader';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, useDrawerStatus } from '@react-navigation/drawer';
import DrawerComp from '../../Components/Drawer/Drawer';
import VendorOrderDetails from '../../vendor/VendorOrderDetails/VendorOrderDetails';
import VendorSettings from '../../vendor/VendorSettings/VendorSettings';
import VendorChangePassword from '../../vendor/VendorChangePassword/VendorChangePassword';
import VendorEditProfile from '../../vendor/VendorEditProfile/VendorEditProfile';
import VendorPayment from '../../vendor/VendorPayment/VendorPayment';
import VendorWallet from '../../vendor/VendorWallet/VendorWallet';
import VendorTransaction from '../../vendor/VendorTransaction/VendorTransaction';
import Customer from '../../Customer/Customer';

const VendorNavigation = () => {
    const navigation = useNavigation()
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            initialRouteName="vendorDashboard"
            screenOptions={{ header: (props) => <NavHeader {...props} navigation={navigation} additionalProp="Your Value" /> }}
            drawerContent={props => <DrawerComp />}
        >
            <Drawer.Screen name="vendorDashboard" component={VendorDashboard} />
            {/* <Drawer.Screen name="vendorOrders" component={VendorOrders} /> */}
            <Drawer.Screen name="vendorOrderDetails" component={VendorOrderDetails} />
            <Drawer.Screen name="vendorSettings" component={VendorSettings} />
            <Drawer.Screen name="vendorChangePassword" component={VendorChangePassword} />
            <Drawer.Screen name="vendorEditProfile" component={VendorEditProfile} />
            <Drawer.Screen name="vendorPayment" component={VendorPayment} />
            <Drawer.Screen name="vendorWallet" component={VendorWallet} />
            <Drawer.Screen name="vendorTransaction" component={VendorTransaction} />
            <Drawer.Screen name="customer" component={Customer} options={{ headerShown: false }} />
        </Drawer.Navigator>
    )
}

export default VendorNavigation