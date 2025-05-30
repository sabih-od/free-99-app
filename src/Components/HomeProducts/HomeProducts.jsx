import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {isIpad, windowWidth} from '../../Styles/Theme';
import Product from '../Product/Product';
import {shopService} from '../../Services/shopService';

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

const HomeProducts = () => {
  const [data, setData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(
    async (url = '/shop/category?page=1') => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await shopService.getAllCategoriesProducts(url);
        setData(prevData => [...prevData, ...response.data.products.data]);
        setNextPageUrl(response.data.products.next_page_url);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLoadMore = () => {
    if (nextPageUrl) {
      fetchOrders(nextPageUrl);
    }
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  return (
    <View style={{flex: 1}}>
      {data.length ? (
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
              width={isIpad ? (windowWidth - 60) / 3 : (windowWidth - 60) / 2}
              height={isIpad ? windowWidth / 3 : windowWidth / 2}
              item={item}
              key={index}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <LoadingSkeleton />
      )}
    </View>

    // <View style={{ flex: 1 }}>
    //     {data.length ? (
    //         <ScrollView
    //         showsVerticalScrollIndicator={false}
    //         contentContainerStyle={{
    //             flexDirection: 'row',
    //             flexWrap: 'wrap',
    //             gap: 20,
    //             paddingBottom: 20,
    //         }}
    //         >
    //         {data.map((item, index) => (
    //             <View
    //             key={item.id.toString()} // KeyExtractor expects a string, so use the unique ID
    //             style={{
    //                 width: isIpad ? (windowWidth - 60) / 3 : (windowWidth - 60) / 2,
    //                 marginBottom: 20,
    //             }}
    //             >
    //             <Product
    //                 width={isIpad ? (windowWidth - 60) / 3 : (windowWidth - 60) / 2}
    //                 height={isIpad ? windowWidth / 3 : windowWidth / 2}
    //                 item={item}
    //                 key={index}
    //             />
    //             </View>
    //         ))}
    //         </ScrollView>
    //     ) : (
    //         <LoadingSkeleton />
    //     )}
    // </View>
  );
};

export default HomeProducts;

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
