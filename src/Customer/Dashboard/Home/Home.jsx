import { SafeAreaView, ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { bgColor, generalFontSize, GlobalStyle, margin, padding, themeColor, whiteColor } from '../../../Styles/Theme';
import ImageCarousel from '../../../Components/ImageCarousel/ImageCarousel';
import Categories from '../../../Components/Categories/Categories';
import FeaturedSec from '../../../Components/FeaturedSec/FeaturedSec';
import FeatureBanner from '../../../Components/FeatureBanner/FeatureBanner';
import Products from '../../../Components/Products/Products';
import HomeProducts from '../../../Components/HomeProducts/HomeProducts';
import { shopService } from '../../../Services/shopService';

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        shopService.getCategories()
        shopService.getAllCategoriesProducts()
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    return (
        <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} tintColor={whiteColor} onRefresh={onRefresh} />
                }
            >
                <View style={padding('bottom', 20)}>
                    <ImageCarousel />
                </View>
                <View style={[GlobalStyle.container, padding('top', 15)]}>
                    <View style={[GlobalStyle.borderContainer]}>
                        <Categories catTitle={"Explore Popular Categories"} />
                    </View>
                    {/* <FeaturedSec featureTitle={"Explore Popular Categories"} /> */}
                    <View style={[GlobalStyle.borderContainer]}>
                        <FeatureBanner
                            img={require("../../../../assets/images/featureBanner.png")}
                            title={'Ready-Set-Summer'}
                        />
                    </View>
                    <View style={[GlobalStyle.borderContainer]}>
                        <HomeProducts />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})