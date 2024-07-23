import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { textColor, fontFamily, generalFontSize, GlobalStyle, windowWidth, isIpad, whiteColor } from '../../Styles/Theme';
import { shopService } from '../../Services/shopService.js';
import { useSelector } from 'react-redux';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const Categories = ({ catTitle, mainTitle, isVertical, onCategoryPress }) => {
    const category = useSelector((state) => state.shop.category)
    const navigation = useNavigation();

    // Function to retrieve the current route name
    const currentRouteName = useNavigationState((state) => state.routes[state.index].name);

    useEffect(() => {
        shopService.getCategories()
        console.log("category=> ", category)
    }, [])

    const activeCategory = (slug) => {
        shopService.getCategoryProducts(slug)
        if (currentRouteName == 'home') {
            navigation.navigate("shop")
        }
    }

    return (
        <View>
            {mainTitle && <Text style={styles.mainHeading}>{mainTitle}</Text>}
            {catTitle && <Text style={GlobalStyle.secHeading}>{catTitle}</Text>}
            {category ? (<FlatList
                data={category}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 20 }}
                columnWrapperStyle={isVertical ? { gap: 15, justifyContent: 'space-between' } : null}
                keyExtractor={item => item.id.toString()} // KeyExtractor expects a string
                horizontal={isVertical ? false : true}
                numColumns={isVertical ? 3 : 0} // Set numColumns based on isVertical prop
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => {
                        onCategoryPress()
                        activeCategory(item.slug); // Logging current route name on item press
                    }}>
                        <View key={index} style={styles.box}>
                            <Image
                                style={styles.boxImg}
                                source={item?.image ? { uri: item?.image } : { uri: 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg', cache: 'force-cache' }}  // Constructing image source path
                            />
                            <Text style={styles.itemTitle}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />) : (
                <ActivityIndicator size="large" color={whiteColor} />
            )}
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    itemTitle: {
        color: textColor,
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize,
        textAlign: 'center',
        marginTop: 7
    },
    mainHeading: {
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 8,
        fontWeight: '900',
        marginBottom: 20,
        color: textColor
    },
    box: {
        width: isIpad ? (windowWidth) / 6 : (windowWidth) / 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxImg: {
        width: isIpad ? (windowWidth) / 6 : (windowWidth) / 4,
        height: isIpad ? (windowWidth) / 6 : (windowWidth) / 4,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: 'grey'
    }
});
