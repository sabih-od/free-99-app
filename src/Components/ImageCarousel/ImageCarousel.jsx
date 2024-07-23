import { Dimensions, Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { isIpad, whiteColor, windowWidth } from '../../Styles/Theme';
import { bannerService } from '../../Services/bannerService';

const ImageCarousel = () => {
    const navigation = useNavigation();
    const [images, setImages] = useState();

    // Dummy data for fallback or initial setup
    const imageData = [
        { image: require("../../../assets/images/slide1.png") },
        { image: require("../../../assets/images/slide2.jpg") },
        { image: require("../../../assets/images/slide3.jpg") },
    ];

    const fetchImages = useCallback(async () => {
        const res = await bannerService.getBanners();
        setImages(res?.data)
        console.log(images)
    }, []);

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <>
            <Carousel
                loop
                width={windowWidth}
                height={isIpad ? windowWidth / 2.5 : windowWidth / 2}
                autoPlay={true}
                data={imageData} // Use fetched images if available, otherwise fallback to imageData
                style={{ overflow: 'hidden' }}
                scrollAnimationDuration={2000}
                renderItem={({ index, item }) => (
                    <TouchableHighlight
                        onPress={() => navigation.navigate('shop')}
                        style={[styles.imgContainer, {paddingHorizontal: 10, borderRadius: 5}]}
                    >
                        <Image
                            source={item.image}
                            style={[styles.imageStyle, {borderRadius: 5}]}
                        />
                    </TouchableHighlight>
                )}
            />
        </>
    );
};

export default ImageCarousel;

const styles = StyleSheet.create({
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Use resizeMode instead of objectFit for React Native Image component
        backgroundColor: 'grey'
    },
    imgContainer: {
        width: '100%',
        height: isIpad ? windowWidth / 2.5 : windowWidth / 2,
        overflow: "hidden",
    }
});
