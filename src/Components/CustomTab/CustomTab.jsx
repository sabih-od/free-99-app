import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Defs, G, Image, Mask, Path, Pattern, Rect, Svg } from 'react-native-svg';
import { isDarkMode, isIpad, itemBg, secondColor, textColor, themeColor, whiteColor, windowWidth } from '../../Styles/Theme';

const CustomTab = ({ state, descriptors, navigation }) => {
  const routeNames = ['Home', 'Shop', 'Favourites', 'Profile'];

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => { // Limit to the first four routes
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getTabIcon = (tabName) => {
          switch (tabName) {
            case 'home':
              return (
                <Svg style={styles.svgIcon} width={isIpad ? "30" : "15"} height={isIpad ? "30" : "15"} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M8.28143 3.91399L3.00527 8.25953V12.9496C3.00527 13.2025 3.21026 13.4075 3.46314 13.4075L6.67 13.3992C6.92198 13.3979 7.12559 13.1933 7.12558 12.9413V10.2024C7.12558 9.94948 7.33058 9.74448 7.58346 9.74448H9.41496C9.66784 9.74448 9.87284 9.94948 9.87284 10.2024V12.9393C9.87246 13.061 9.92053 13.1778 10.0064 13.264C10.0924 13.3502 10.209 13.3986 10.3307 13.3986L13.5364 13.4075C13.7893 13.4075 13.9943 13.2025 13.9943 12.9496V8.25638L8.71928 3.91399C8.5915 3.811 8.40921 3.811 8.28143 3.91399ZM16.6156 6.86758L14.2232 4.89557V0.931787C14.2232 0.742128 14.0695 0.588379 13.8798 0.588379H12.2773C12.0876 0.588379 11.9339 0.742128 11.9339 0.931787V3.00969L9.37175 0.901738C8.86468 0.484465 8.13318 0.484465 7.6261 0.901738L0.382206 6.86758C0.235957 6.98846 0.215453 7.20504 0.336418 7.35122L1.06616 8.23835C1.12409 8.30879 1.20766 8.3533 1.29844 8.36205C1.38922 8.3708 1.47976 8.34308 1.55008 8.285L8.28143 2.74068C8.40921 2.63769 8.5915 2.63769 8.71928 2.74068L15.4509 8.285C15.5971 8.40596 15.8137 8.38546 15.9346 8.23921L16.6643 7.35208C16.7223 7.28147 16.7498 7.19065 16.7407 7.09972C16.7316 7.00878 16.6866 6.92524 16.6156 6.86758Z" fill={isFocused ? whiteColor : textColor} />
                </Svg>
              );
            case 'shop':
              return (
                <Svg style={styles.svgIcon} width={isIpad ? "30" : "15"} height={isIpad ? "30" : "15"} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M5.08174 13.9634C5.08174 14.459 4.67995 14.8608 4.1843 14.8608C3.68866 14.8608 3.28687 14.459 3.28687 13.9634C3.28687 13.4677 3.68866 13.0659 4.1843 13.0659C4.67995 13.0659 5.08174 13.4677 5.08174 13.9634Z" fill={isFocused ? whiteColor : textColor} />
                  <Path d="M13.4765 13.9634C13.4765 14.459 13.0747 14.8608 12.5791 14.8608C12.0834 14.8608 11.6816 14.459 11.6816 13.9634C11.6816 13.4677 12.0834 13.0659 12.5791 13.0659C13.0747 13.0659 13.4765 13.4677 13.4765 13.9634Z" fill={isFocused ? whiteColor : textColor} />
                  <Path d="M15.5444 3.05206C15.5182 2.96232 15.4397 2.90249 15.3499 2.89501L3.17095 1.71712C3.06625 1.7059 2.93911 1.63859 2.8905 1.54137C2.74841 1.27588 2.65866 1.12631 2.4343 0.845856C2.14637 0.49436 1.60417 0.505577 0.60951 0.498099C0.272971 0.494359 0 0.692544 0 1.02534C0 1.35067 0.258014 1.55259 0.583335 1.55259C0.908656 1.55259 1.37981 1.57129 1.55556 1.62364C1.73131 1.67599 1.8734 1.96391 1.92575 2.21445C1.92575 2.21819 1.92575 2.22193 1.92949 2.22567C1.93697 2.27054 2.00428 2.60708 2.00428 2.61082L3.50001 10.5232C3.58975 11.0654 3.77298 11.5142 4.04221 11.8582C4.35632 12.262 4.77138 12.4639 5.27245 12.4639H14.1197C14.4039 12.4639 14.6469 12.2471 14.6582 11.9629C14.6731 11.6637 14.4338 11.4169 14.1347 11.4169H5.26871H5.26497C5.19019 11.4169 5.08175 11.4169 4.95461 11.3122C4.82373 11.2001 4.64424 10.942 4.52459 10.34L4.3638 9.45379C4.3638 9.44257 4.36754 9.43509 4.37875 9.43135L14.7629 7.67387C14.8601 7.65891 14.9349 7.58039 14.9461 7.47942L15.5444 3.14928C15.5519 3.11937 15.5519 3.08571 15.5444 3.05206Z" fill={isFocused ? whiteColor : textColor} />
                </Svg>
              );
            case 'favourites':
              return (
                <Svg style={styles.svgIcon} width={isIpad ? "30" : "15"} height={isIpad ? "30" : "15"} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M14.5631 0.913436C12.9526 -0.458989 10.5574 -0.212129 9.07923 1.31311L8.50028 1.90969L7.92133 1.31311C6.44605 -0.212129 4.04798 -0.458989 2.43751 0.913436C0.591939 2.48864 0.494958 5.31578 2.14657 7.02323L7.83317 12.895C8.20052 13.2741 8.7971 13.2741 9.16445 12.895L14.8511 7.02323C16.5056 5.31578 16.4086 2.48864 14.5631 0.913436Z" fill={isFocused ? whiteColor : textColor} />
                </Svg>
              );
            case 'profile':
              return (
                <Svg style={styles.svgIcon} width={isIpad ? "30" : "15"} height={isIpad ? "30" : "15"} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M7.49997 6.9981C9.32175 6.9981 10.7973 5.52252 10.7973 3.70071C10.7973 1.8789 9.32175 0.40332 7.49997 0.40332C5.67818 0.40332 4.20262 1.8789 4.20262 3.70071C4.20262 5.52252 5.67818 6.9981 7.49997 6.9981ZM7.49997 8.64679C5.29899 8.64679 0.905273 9.75142 0.905273 11.9442V13.5929H14.0947V11.9442C14.0947 9.75142 9.70095 8.64679 7.49997 8.64679Z" fill={isFocused ? whiteColor : textColor} />
                </Svg>
              );
            case 'vendorHome':
              return (
                <Svg width={isIpad ? "30" : "15"} height={isIpad ? "30" : "15"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M0 8.88889H7.11111V0H0V8.88889ZM0 16H7.11111V10.6667H0V16ZM8.88889 16H16V7.11111H8.88889V16ZM8.88889 0V5.33333H16V0H8.88889Z" fill={isFocused ? whiteColor : textColor} />
                </Svg>
              );
            case 'vendorOrder':
              return (
                <Svg width={isIpad ? "30" : "15"} height={isIpad ? "30" : "15"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M4.44444 0.473373H16V2.36686H4.44444V0.473373ZM1.33333 2.84024C0.979711 2.84024 0.640573 2.69062 0.390524 2.42429C0.140476 2.15797 0 1.79676 0 1.42012C0 1.04348 0.140476 0.682267 0.390524 0.415943C0.640573 0.149619 0.979711 0 1.33333 0C1.68696 0 2.02609 0.149619 2.27614 0.415943C2.52619 0.682267 2.66667 1.04348 2.66667 1.42012C2.66667 1.79676 2.52619 2.15797 2.27614 2.42429C2.02609 2.69062 1.68696 2.84024 1.33333 2.84024ZM1.33333 9.46746C0.979711 9.46746 0.640573 9.31784 0.390524 9.05151C0.140476 8.78519 0 8.42398 0 8.04734C0 7.6707 0.140476 7.30949 0.390524 7.04316C0.640573 6.77684 0.979711 6.62722 1.33333 6.62722C1.68696 6.62722 2.02609 6.77684 2.27614 7.04316C2.52619 7.30949 2.66667 7.6707 2.66667 8.04734C2.66667 8.42398 2.52619 8.78519 2.27614 9.05151C2.02609 9.31784 1.68696 9.46746 1.33333 9.46746ZM1.33333 16C0.979711 16 0.640573 15.8504 0.390524 15.5841C0.140476 15.3177 0 14.9565 0 14.5799C0 14.2032 0.140476 13.842 0.390524 13.5757C0.640573 13.3094 0.979711 13.1598 1.33333 13.1598C1.68696 13.1598 2.02609 13.3094 2.27614 13.5757C2.52619 13.842 2.66667 14.2032 2.66667 14.5799C2.66667 14.9565 2.52619 15.3177 2.27614 15.5841C2.02609 15.8504 1.68696 16 1.33333 16ZM4.44444 7.10059H16V8.99408H4.44444V7.10059ZM4.44444 13.7278H16V15.6213H4.44444V13.7278Z" fill={isFocused ? whiteColor : textColor} />
                </Svg>
              );
            case 'addProduct':
              return (
                <Svg width={isIpad ? "30" : "15"} height={isIpad ? "30" : "15"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <Path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" fill={isFocused ? whiteColor : textColor} />
                </Svg>
              );
            case 'vendorProducts':
              return (
                <Svg width={isIpad ? "30" : "15"} height={isIpad ? "30" : "15"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <Path d="M248 0H208c-26.5 0-48 21.5-48 48V160c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V48c0-26.5-21.5-48-48-48H328V80c0 8.8-7.2 16-16 16H264c-8.8 0-16-7.2-16-16V0zM64 256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H184v80c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V256H64zM352 512H512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H472v80c0 8.8-7.2 16-16 16H408c-8.8 0-16-7.2-16-16V256H352c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2V464c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z" fill={isFocused ? whiteColor : textColor} />
                </Svg>
              );
            case 'vendorProfile':
              return (
                <Svg style={styles.svgIcon} width={isIpad ? "30" : "15"} height={isIpad ? "30" : "15"} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M7.49997 6.9981C9.32175 6.9981 10.7973 5.52252 10.7973 3.70071C10.7973 1.8789 9.32175 0.40332 7.49997 0.40332C5.67818 0.40332 4.20262 1.8789 4.20262 3.70071C4.20262 5.52252 5.67818 6.9981 7.49997 6.9981ZM7.49997 8.64679C5.29899 8.64679 0.905273 9.75142 0.905273 11.9442V13.5929H14.0947V11.9442C14.0947 9.75142 9.70095 8.64679 7.49997 8.64679Z" fill={isFocused ? whiteColor : textColor} />
                </Svg>
              );
            default:
              return null;
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[styles.tabBarButton, { borderBottomWidth: isFocused ? 2 : 0 }]}
          >
            <View style={[styles.iconCont, { backgroundColor: isFocused ? themeColor : 'transparent', borderColor: isFocused ? themeColor : textColor }]}>
              <View style={styles.svgIcon}>{getTabIcon(route.name)}</View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: itemBg,
    // position: 'absolute',
    bottom: 20,
    width: windowWidth - 40,
    marginHorizontal: 20,
    borderRadius: 30,
    paddingVertical: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#fff5",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'transparent',
  },
  iconCont: {
    width: isIpad ? 60 : 35,
    height: isIpad ? 60 : 35,
    borderRadius: 100,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  svgIcon: {
    width: isIpad ? 30 : 15,
    height: isIpad ? 30 : 15
  }
});

export default CustomTab;
