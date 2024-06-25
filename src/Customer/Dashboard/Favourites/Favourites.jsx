import { ActivityIndicator, Animated, FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { bgColor, GlobalStyle, margin, padding, textColor, themeColor, whiteColor, windowHeight, windowWidth } from '../../../Styles/Theme';
import { useSelector } from 'react-redux';
import { wishlistService } from '../../../Services/wishlistService';
import Product from '../../../Components/Product/Product';

const LoadingSkeleton = () => {
  const numSkeletonItems = 6; // Number of skeleton items to show
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
      ])
    ).start();
  }, [opacity]);

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
      {[...Array(numColumns).keys()].map((colIndex) => (
        <View key={colIndex} style={{ flex: 1, paddingHorizontal: 10 }}>
          {[...Array(skeletonItemsPerColumn).keys()].map((rowIndex) => (
            <View key={rowIndex + colIndex * skeletonItemsPerColumn}>
              <Animated.View style={[styles.skeletonItem, { opacity }]}></Animated.View>
              <View style={styles.row}>
                <Animated.View style={[styles.smallRow, { width: '100%', height: 10, marginBottom: 5, opacity }]}></Animated.View>
                <Animated.View style={[styles.smallRow, { width: '50%', height: 10, marginBottom: 5, opacity }]}></Animated.View>
                <Animated.View style={[styles.smallRow, { width: '30%', height: 10, opacity }]}></Animated.View>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const Favourites = ({ navigation }) => {
  const data = useSelector((state) => state.wishlist?.items?.data?.data);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token)


  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await wishlistService.getWishlist();
    } catch (error) {
      console.error('Failed to refresh wishlist:', error);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await wishlistService.getWishlist();
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Ensures this runs only once after the component mounts

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
      {token ? (
        <>
          {loading ?
            (
              <LoadingSkeleton />
            )
            :
            (
              <>
                {data?.length != 0 ? (

                  <View style={[GlobalStyle.container, padding('top', 15), padding("bottom", 50)]}>
                    <View style={margin("top", 10)}>
                      <FlatList
                        refreshControl={
                          <RefreshControl refreshing={refreshing} tintColor={whiteColor} onRefresh={onRefresh} />
                        }
                        style={{ minHeight: windowHeight - 150 }}
                        data={data}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
                        columnWrapperStyle={{ gap: 15, justifyContent: 'space-between' }}
                        keyExtractor={item => item.id.toString()} // KeyExtractor expects a string
                        horizontal={false}
                        numColumns={2}
                        renderItem={({ item, index }) => (
                          <Product
                            width={(windowWidth - 60) / 2}
                            height={windowWidth / 2}
                            item={item.product}
                            key={index}
                          />
                        )}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={[GlobalStyle.container]}>
                    <View style={{ flex: 1, justifyContent: 'space-between', height: '100%', paddingVertical: 50 }}>
                      <Text style={{ ...GlobalStyle.mainTitle, color: textColor }}>No Favorites Items Found</Text>
                      <TouchableOpacity
                        style={[GlobalStyle.themeBtn]}
                        onPress={() => navigation.navigate('home')}
                      >
                        <Text style={[GlobalStyle.themeBtnText]}>Go to shopping</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </>
            )
          }
        </>
      )
        : (
          <View style={styles.loadingContainer}>
            <Text style={[GlobalStyle.mainTitle]}>Login Required</Text>
            <Text style={[GlobalStyle.minTitle]}>You need to Login to add Products to wishlist</Text>
            <TouchableOpacity onPress={() => {
              navigation.reset({ index: 0, routes: [{ name: 'welcome' }] })
            }} style={[GlobalStyle.themeBtn, { marginTop: 'auto', marginBottom: 30 }]}>
              <Text style={[GlobalStyle.themeBtnText]}>Login In</Text>
            </TouchableOpacity>
          </View>
        )}
    </SafeAreaView >
  );
};

export default Favourites;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
