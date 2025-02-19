import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Screens = {
  LoginScreen: 'LoginScreen',
  RegisterScreen: 'RegisterScreen',
  ForgotPasswordScreen: 'ForgotPasswordScreen',
  CreatePasswordScreen: 'CreatePasswordScreen',
  UserNav: 'UserNav',
  BottomNav: 'BottomNav',
  HomeScreen: 'HomeScreen',
  ProfileScreen: 'ProfileScreen',
  NotificationScreen: 'NotificationScreen',
  MarketScreen: 'MarketScreen',
  DatingScreen: 'DatingScreen',
  ProductDetailScreen: 'ProductDetailScreen',
  SettingScreen: 'SettingScreen',
  RecipesScreen: 'RecipesScreen',
  AddRecipeScreen: 'AddRecipeScreen',
  LocatorScreen: 'LocatorScreen',
  ContactUsScreen: 'ContactUsScreen',
  HikingScreen: 'HikingScreen',
  AdventureScreen: 'AdventureScreen',
  HowToScreen: 'HowToScreen',
  FriendsScreen: 'FriendsScreen',
  OtpScreen: 'OtpScreen',
  BlockedFriendsScreen: 'BlockedFriendsScreen'
};

export const SIZES = {
  fullHeight: height,
  halfHeight: height / 2,

  fullWidth: width,
  halfWidth: width / 2,
};
