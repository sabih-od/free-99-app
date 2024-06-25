import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { bgColor, generalFontSize, GlobalStyle, textColor, fontFamily, padding, margin, themeColor } from '../../../Styles/Theme';
import ProfileHorizontalView from '../../../Components/ProfileHorizontalView/ProfileHorizontalView';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { authService } from '../../../Services/authService';
import NotiModal from '../../../Components/NotiModal/NotiModal';
const Profile = () => {

  const userInfo = useSelector((state) => state.auth.data)
  const navigation = useNavigation();
  const isAuth = useSelector((state) => state.auth.isAuthenticated)
  const authData = useSelector((state) => state.auth.data)
  const [isVendor, setisVendor] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (data) => {
    if (isAuth) {
      try {
        setIsLoading(!isLoading)
        const res = await authService.logout(data);
        setIsLoading(!isLoading)
        navigation.reset({ index: 0, routes: [{ name: 'dashboard' }] })
      } catch (error) {
        console.error('Logout failed:', error);
        setIsLoading(!isLoading)
      }
    }
    else {
      navigation.reset({ index: 0, routes: [{ name: 'welcome' }] })
    }
  };

  const becomeVendor = () => {
    navigation.navigate("package")
  }

  useEffect(() => {
    if (authData?.roles && authData?.roles?.find(x => x.name === 'vendor')) {
      setisVendor(true);
    }
  }, [authData]); // Add any relevant dependencies here
  // Define your options in a JSON object
  const options = [
    { title: 'My Orders', description: 'View and manage your order history', url: 'myOrders', argument: true && isAuth },
    // { title: 'Shipping Addresses', description: 'Manage and update your shipping addresses', url: 'address' },
    // { title: 'Payment Methods', description: 'Review and edit your saved payment methods', url: 'paymentMethods' },
    // { title: 'My Reviews', description: 'View your product reviews', url: 'reviews', argument: true && isAuth },
    { title: 'Settings', description: 'Adjust your user and application settings', url: 'settings', argument: true && isAuth },
    // { title: 'Contact Us', description: 'Get in touch with us for any inquiries or assistance', url: 'contact' },
    
    { title: 'Plans', description: 'Get the subscription plan', url: 'packages', argument: isAuth },
    // { title: 'Become a vendor', description: 'Get start to come a vendor', url: 'packages', argument: !isVendor && isAuth }
  ];

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
      <View style={[GlobalStyle.container, padding('top', 15)]}>
        {isAuth && (
          <ProfileHorizontalView user={userInfo} />
        )}
        <FlatList
          data={options}
          keyExtractor={(item, index) => index.toString()}
          style={margin('top', 20)}
          renderItem={({ item, index }) => (
            (item?.argument) &&
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.url)} // Navigate to the specified screen
              style={[GlobalStyle.row, GlobalStyle.aic, styles.optionBox, padding('vertical', 10)]}
            >
              <View>
                <Text style={styles.optionText}>{item.title}</Text>
                <Text style={styles.optionMinText}>{item.description}</Text>
              </View>
              <FontAwesomeIcon icon={faChevronRight} color={textColor} size={generalFontSize} />
            </TouchableOpacity>
          )}
        />
        <View style={[GlobalStyle.row, GlobalStyle.aic, { gap: 10, marginBottom: 10 }]}>
          {isVendor && (
            <TouchableOpacity
              onPress={() => navigation.reset({ index: 0, routes: [{ name: 'vendor' }] })}
              style={[GlobalStyle.themeBtn, { flex: 1 }]}
            >
              <Text style={[GlobalStyle.themeBtnText, { fontSize: generalFontSize - 2, fontWeight: '700' }]}>
                Switch To Vendor
              </Text>
            </TouchableOpacity>
          )}
          {/* {!isVendor && (
            <TouchableOpacity
              onPress={() => { becomeVendor() }}
              style={[GlobalStyle.themeBtn, { flex: 1 }]}
            >
              <Text style={[GlobalStyle.themeBtnText, { fontSize: generalFontSize - 2, fontWeight: '700' }]}>
                Become a Vendor
              </Text>
            </TouchableOpacity>
          )} */}
          <TouchableOpacity
            onPress={onSubmit}
            style={[GlobalStyle.themeBtn, { backgroundColor: !isAuth ? themeColor : 'red', flex: 1 }]}
          >
            <Text style={[GlobalStyle.themeBtnText, { fontSize: generalFontSize - 2, fontWeight: '700' }]}>
              {!isAuth ? "Login / Signup" : 'Log out'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <NotiModal
        canHide
        modalIsVisible={isLoading}
        title={"Logging Out"}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  optionBox: {
    justifyContent: 'space-between',
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
  },
  optionText: {
    color: textColor,
    fontFamily: 'FreightBigPro-Bold',
    fontSize: generalFontSize + 2,
    marginBottom: 6,
  },
  optionMinText: {
    color: textColor,
    ...fontFamily('regular'),
    fontSize: generalFontSize - 6,
    marginBottom: 16,
  },
});
