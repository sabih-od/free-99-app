import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { GlobalStyle } from '../../Styles/Theme';
import Product from '../Product/Product';
import { useSelector } from 'react-redux';
import { shopService } from '../../Services/shopService';

const FeaturedSec = ({ featureTitle }) => {

    const featured = useSelector((state) => state.shop.allProducts)
    useEffect(() => {
        shopService.getAllCategoriesProducts()
    }, [])

    useEffect(() => {
    }, [featured])

    return (
        <View style={[GlobalStyle.borderContainer]}>
            <Text style={GlobalStyle.secHeading}>Featured Products</Text>
            <FlatList
                data={featured}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 20 }}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                renderItem={({ item, index }) => (
                    <Product
                        item={item}
                        key={index}
                    />
                )}
            />
        </View>
    )
}

export default FeaturedSec

const styles = StyleSheet.create({

})