import { ActivityIndicator, Alert, Animated, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { bgColor, generalFontSize, GlobalStyle, isIpad, margin, padding, whiteColor, windowWidth } from '../../Styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Product from '../../Components/Product/Product';
import productsData from '../../data/products';
import { useFocusEffect } from '@react-navigation/native';
import { productService } from '../../Services/productService';
import { useSelector } from 'react-redux';

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

const ProductsPg = () => {
    const loading = useSelector((state) => state.product.loading)
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);

    // useEffect(() => {
    //     if (searchQuery.length > 0) {
    //         const delayDebounceFn = setTimeout(() => {
    //             productService.searchProduct(searchQuery).then((res) => {
    //                 setResults(res.data.data);
    //             });
    //         }, 300); // Delay to debounce search input

    //         return () => clearTimeout(delayDebounceFn);
    //     } else {
    //         setResults([]); // Clear results when search query is empty
    //     }
    // }, [searchQuery]);

    useFocusEffect(
        React.useCallback(() => {
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, [])
    );

    const handleSearch = async () => {
        if (searchQuery.trim() !== "") {
            try {
                const res = await productService.searchProduct(searchQuery);

                const products = res?.data?.data; 

                if (products && products.length > 0) {
                    setResults(products);
                } else {
                    Alert.alert("No Products Found", "No products matched your search criteria.");
                    setResults([]);
                }
            } catch (error) {
                console.error("Error searching for products:", error);
                Alert.alert("Error", "There was an error while searching for products. Please try again.");
                setResults([]);
            }
        } else {
            setResults([]); // Clear results when search query is empty
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
            <View style={[GlobalStyle.container, padding('top', 15)]}>
                <TouchableOpacity
                    activeOpacity={1}
                >
                    <View style={[GlobalStyle.input, GlobalStyle.row, GlobalStyle.aic, { height: 40, paddingHorizontal: 0, paddingLeft: 20 }]}>
                        <FontAwesomeIcon icon={faSearch} color={'#828282'} size={generalFontSize - 4} />
                        <TextInput
                            ref={searchInputRef}
                            style={{ marginLeft: 10, height: 40, flex: 1 }}  
                            placeholder="Search"
                            placeholderTextColor="#828282"
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text ?? "")}
                        />
                        <TouchableOpacity
                            style={{ marginRight: 15, backgroundColor: '#307504', height: 35, width: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                            onPress={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} color={'#ffffff'} size={generalFontSize - 4} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <View style={margin("top", 30)}>
                    {loading ? (
                        <LoadingSkeleton />
                    )
                        : (
                            <FlatList data={results}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
                                columnWrapperStyle={{ justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap' }}
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
                        )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProductsPg

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
})