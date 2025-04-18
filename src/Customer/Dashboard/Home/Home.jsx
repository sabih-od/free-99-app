import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  FlatList,
  Animated,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  bgColor,
  generalFontSize,
  GlobalStyle,
  isIpad,
  padding,
  textColor,
  whiteColor,
  windowWidth,
} from '../../../Styles/Theme';
import ImageCarousel from '../../../Components/ImageCarousel/ImageCarousel';
import Categories from '../../../Components/Categories/Categories';
import FeaturedSec from '../../../Components/FeaturedSec/FeaturedSec';
import FeatureBanner from '../../../Components/FeatureBanner/FeatureBanner';
import Products from '../../../Components/Products/Products';
import HomeProducts from '../../../Components/HomeProducts/HomeProducts';
import {shopService} from '../../../Services/shopService';
import {productService} from '../../../Services/productService';
import Product from '../../../Components/Product/Product';
import {wishlistService} from '../../../Services/wishlistService';
import {logout} from '../../../Redux/Store/Slices/Auth';
import {store} from '../../../Redux/Store';
import {useSelector} from 'react-redux';
import {Pusher} from '@pusher/pusher-websocket-react-native';

const LoadingSkeleton = () => {
  const numSkeletonItems = 2; // Number of skeleton items to show
  const numColumns = 2; // Number of columns
  const skeletonItemsPerColumn = Math.ceil(numSkeletonItems / numColumns); // Calculate number of skeleton items per column
  const [opacity] = useState(new Animated.Value(0.3));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 20}}>
      {[...Array(numColumns).keys()].map(colIndex => (
        <View key={colIndex} style={{flex: 1, paddingHorizontal: 10}}>
          {[...Array(skeletonItemsPerColumn).keys()].map(rowIndex => (
            <View key={rowIndex + colIndex * skeletonItemsPerColumn}>
              <Animated.View
                style={[styles.skeletonItem, {opacity}]}></Animated.View>
              <View style={styles.row}>
                <Animated.View
                  style={[
                    styles.smallRow,
                    {width: '100%', height: 10, marginBottom: 5, opacity},
                  ]}></Animated.View>
                <Animated.View
                  style={[
                    styles.smallRow,
                    {width: '50%', height: 10, marginBottom: 5, opacity},
                  ]}></Animated.View>
                <Animated.View
                  style={[
                    styles.smallRow,
                    {width: '30%', height: 10, opacity},
                  ]}></Animated.View>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const authData = useSelector(state => state.auth.data);

  const onRefresh = () => {
    setRefreshing(true);
    shopService.getCategories();
    shopService.getAllCategoriesProducts();
    productService.getFeaturedProducts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const featuredProduct = useCallback(async () => {
    const response = await productService.getFeaturedProducts();
    setData(response.data.data);
  }, []);

  useEffect(() => {
    featuredProduct();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (authData) {
        try {
          //   setLoading(true);
          await wishlistService.getWishlist();
        } catch (error) {
          if (error.response && error.response.status === 401) {
            store.dispatch(logout());
            navigation.reset({index: 0, routes: [{name: 'welcome'}]});
          }
          console.error('Failed to fetch wishlist:', error);
        }
        // finally {
        //   setLoading(false);
        // }
      }
    };

    fetchData();
  }, [authData]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          tintColor={whiteColor}
          onRefresh={onRefresh}
        />
      }
      style={{backgroundColor: bgColor, flex: 1}}>
      <View style={padding('bottom', 20)}>
        <ImageCarousel />
      </View>
      <View style={[GlobalStyle.container, padding('top', 15)]}>
        <View style={[GlobalStyle.borderContainer]}>
          <Categories catTitle={'Explore Popular Categories'} />
        </View>
        {/* <FeaturedSec featureTitle={"Explore Popular Categories"} /> */}
        <View style={[GlobalStyle.borderContainer]}>
          <FeatureBanner
            img={require('../../../../assets/images/featureBanner.png')}
            title={'Ready-Set-Summer'}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'FreightBigPro-Bold',
              fontSize: generalFontSize + 8,
              fontWeight: '900',
              marginBottom: 20,
              color: textColor,
            }}>
            Featured Products
          </Text>
          {/* {data?.length ? (
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap: 20, paddingBottom: 20}}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
              keyExtractor={item => item.id.toString()} // KeyExtractor expects a string
              horizontal={false}
              numColumns={isIpad ? 3 : 2}
              renderItem={({item, index}) => (
                <Product
                  width={
                    isIpad ? (windowWidth - 60) / 3 : (windowWidth - 60) / 2
                  }
                  height={isIpad ? windowWidth / 3 : windowWidth / 2}
                  item={item}
                  key={index}
                />
              )}
            />
          ) : (
            <LoadingSkeleton />
          )} */}
          {data?.length ? (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 20,
                paddingBottom: 20,
              }}>
              {data.map((item, index) => (
                <Product
                  key={item.id.toString()} // You can use item.id as the key
                  width={
                    isIpad ? (windowWidth - 60) / 3 : (windowWidth - 60) / 2
                  }
                  height={isIpad ? windowWidth / 3 : windowWidth / 2}
                  item={item}
                />
              ))}
            </View>
          ) : (
            <LoadingSkeleton />
          )}
        </View>
        <View style={[GlobalStyle.borderContainer]}>
          <Text
            style={{
              fontFamily: 'FreightBigPro-Bold',
              fontSize: generalFontSize + 8,
              fontWeight: '900',
              marginBottom: 20,
              color: textColor,
            }}>
            All Products
          </Text>
          <HomeProducts />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  //   loadingContainer: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  skeletonItem: {
    width: '100%',
    height: 220,
    backgroundColor: 'grey',
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    marginBottom: 20,
  },
  smallRow: {
    backgroundColor: 'grey',
    borderRadius: 4,
  },
});
