import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GlobalStyle, isIpad, textColor, whiteColor, windowWidth } from '../../Styles/Theme';
import Product from '../Product/Product';
import { useNavigation } from '@react-navigation/native';

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

const Products = ({ title }) => {
    const width = Dimensions.get('window').width; // Get the window width
    const loading = useSelector(state => state.shop.loading); // Assume loading state from auth slice
    const categoryProduct = useSelector(state => state.shop.categoryProduct); // Products from the shop slice
    console.log('categoryProductcategoryProduct', categoryProduct)
    const navigation = useNavigation()

    return (
        <>
            {loading ? (
                <LoadingSkeleton />
            ) :
                (
                    <>
                        {categoryProduct?.length ? (
                            <FlatList
                                data={categoryProduct}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
                                columnWrapperStyle={{ justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap' }}
                                keyExtractor={item => item.id.toString()} // KeyExtractor expects a string
                                horizontal={false}
                                numColumns={isIpad ? 3 : 2}
                                renderItem={({ item, index }) => (
                                    <Product
                                        width={isIpad ? (windowWidth - 60) / 3 : (windowWidth - 60) / 2}
                                        height={isIpad ? windowWidth / 3 : windowWidth / 2}
                                        item={item}
                                        key={index}
                                    />
                                )}
                            />
                        ) : (
                            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                <Text style={{ ...GlobalStyle.secHeading, textAlign: 'center' }}>No Products Found</Text>
                            </View>
                        )}
                    </>
                )}
        </>
    );
}

export default Products;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skeletonItem: {
        width: '100%',
        height: 220,
        backgroundColor: '#525252',
        borderRadius: 8,
        marginBottom: 10,
    },
    row: {
        marginBottom: 20,
    },
    smallRow: {
        backgroundColor: '#525252',
        borderRadius: 4,
    },
});
