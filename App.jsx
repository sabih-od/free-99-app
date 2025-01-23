import 'react-native-gesture-handler';
import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/Navigation';
import {Provider} from 'react-redux';
import {store, persistor} from './src/Redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {StatusBar} from 'react-native';
import {blackColor} from './src/Styles/Theme';
import {StripeProvider} from '@stripe/stripe-react-native';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={DarkTheme}>
          <StripeProvider
            // publishableKey="pk_live_51OOl5PF4UgRmFXvmGgty0RI0iI0YUNVUmh1npCOsU7tudiBydFFoR1MjdsJeFDnI9oOyGbRTi0n3zyzkG93viDvR00cYCTer5n"
            publishableKey="pk_test_0rY5rGJ7GN1xEhCB40mAcWjg"
            urlScheme="free9" // required for 3D Secure and bank redirects
            merchantIdentifier="merchant.com.free99" // required for Apple Pay
          >
            <RootNavigation />
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={blackColor}
            />
            <Toast position="top" topOffset={50} />
          </StripeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
