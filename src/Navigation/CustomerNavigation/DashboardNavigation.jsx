import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../Customer/Dashboard/Home/Home';
import Favourites from '../../Customer/Dashboard/Favourites/Favourites';
import Profile from '../../Customer/Dashboard/Profile/Profile';
import Shop from '../../Customer/Dashboard/Shop/Shop';
import CustomTab from '../../Components/CustomTab/CustomTab';
import NavHeader from '../../Components/NavHeader/NavHeader';

const DashboardNavigation = ({ navigation }) => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="home"
            screenOptions={{ header: (props) => <NavHeader isCustomer {...props} navigation={navigation} additionalProp="Your Value" /> }}
            tabBar={(props) => <CustomTab {...props} />}
        >
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="shop" component={Shop} />
            <Tab.Screen name="favourites" component={Favourites} />
            <Tab.Screen
                name="profile"
                component={Profile}
                options={{
                    headerTitle: 'My Profile'
                }}
            />
        </Tab.Navigator>
    )
}

export default DashboardNavigation