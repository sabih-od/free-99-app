import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { bgColor, GlobalStyle, padding } from '../../Styles/Theme'
import Categories from '../../Components/Categories/Categories'

const CategoriesPg = () => {
    return (
        <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
            <View style={[GlobalStyle.container, padding("top", 30)]}>
                <Categories
                    mainTitle={"Explore Popular Categories"}
                    isVertical
                />
            </View>
        </SafeAreaView>
    )
}

export default CategoriesPg

const styles = StyleSheet.create({})