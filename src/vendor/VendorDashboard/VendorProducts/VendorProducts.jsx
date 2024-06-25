import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, ActivityIndicator, RefreshControl, Dimensions, Animated, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import VendorProductCard from '../../../Components/VendorProductCard/VendorProductCard';
import { bgColor, generalFontSize, GlobalStyle, isIpad, itemBg, padding, whiteColor, windowWidth } from '../../../Styles/Theme';
import { productService } from '../../../Services/productService';
import { useSelector } from 'react-redux';
import DeleteConfirmationModal from '../../../Components/DeleteConfirmationModal/DeleteConfirmationModal';
import NotiModal from '../../../Components/NotiModal/NotiModal';
import VendorUpdateProduct from '../VendorUpdateProduct/VendorUpdateProduct';
import Modal from 'react-native-modal';

const LoadingSkeleton = () => {
    const numSkeletonItems = 6;
    const skeletonItems = [...Array(numSkeletonItems).keys()];
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
        <View style={{ marginTop: 20 }}>
            {skeletonItems.map((index) => (
                <View key={index} style={styles.card}>
                    <View style={[GlobalStyle.row, { gap: 20 }]}>
                        <View style={{ justifyContent: 'space-between' }}>
                            <Animated.View style={[styles.image, { opacity }]}></Animated.View>
                            <View style={{ marginTop: 20 }}>
                                <Animated.View style={[styles.smallRow, { width: 60, height: 10, opacity }]}></Animated.View>
                                <Animated.View style={[styles.switchSkeleton, { opacity }]}></Animated.View>
                            </View>
                        </View>
                        <View>
                            <Animated.View style={[styles.smallRow, styles.title, { opacity }]}></Animated.View>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { gap: 20 }]}>
                                <View>
                                    <Animated.View style={[styles.smallRow, { width: 40, height: 10, marginBottom: 5, opacity }]}></Animated.View>
                                    <Animated.View style={[styles.smallRow, { width: 50, height: 10, opacity }]}></Animated.View>
                                </View>
                                <View>
                                    <Animated.View style={[styles.smallRow, { width: 60, height: 10, marginBottom: 5, opacity }]}></Animated.View>
                                    <Animated.View style={[styles.smallRow, { width: 50, height: 10, opacity }]}></Animated.View>
                                </View>
                            </View>
                            <View style={styles.dateSkeleton}>
                                <Animated.View style={[styles.smallRow, { width: 80, height: 10, marginBottom: 5, opacity }]}></Animated.View>
                                <Animated.View style={[styles.smallRow, { width: 60, height: 10, opacity }]}></Animated.View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.btnCont}>
                        <Animated.View style={[styles.actionBtn, { opacity }]}></Animated.View>
                        <Animated.View style={[styles.actionBtn, { opacity }]}></Animated.View>
                    </View>
                </View>
            ))}
        </View>
    );
};

const VendorProducts = () => {
    const [product, setProduct] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [delProductId, setDelProductId] = useState(0);
    const [search, setSearch] = useState('');
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [updateProduct, setUpdateProduct] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        productService.getProducts();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    const productData = useSelector((state) => state.product.products);
    const loading = useSelector(state => state.product.loading);

    const toggleDeleteModal = (id) => {
        setDelProductId(id);
        setModalVisible(!isModalVisible);
    };

    const handleDelete = async () => {
        setModalVisible(false);

        await productService.removeProduct(delProductId)
            .then(() => {
                productService.getProducts();
            });
    };

    const toggleUpdateModal = (data) => {
        setUpdateProduct(data);
        setIsUpdateModalVisible(!isUpdateModalVisible);
    };

    useEffect(() => {
        productService.getProducts();
    }, [])

    useEffect(() => {
        setProduct(productData);

    }, [productData])

    useEffect(() => {
        if (!isModalVisible) setDelProductId(0);
    }, [isModalVisible])

    useEffect(() => {
        productService.getProducts({ search: search });
    }, [search])

    const filteredProducts = product.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <TouchableOpacity
                    activeOpacity={1}
                    style={{width: Dimensions.get('window').width - 40, alignSelf: 'center', marginTop: 30}}
                >
                    <View style={[GlobalStyle.input, GlobalStyle.row, GlobalStyle.aic, { height: 40, paddingHorizontal: 0, paddingLeft: 20 }]}>
                        <FontAwesomeIcon icon={faSearch} color={'#828282'} size={generalFontSize - 4} />
                        <TextInput
                            // ref={searchInputRef}
                            style={{ marginLeft: 10, height: 40, flex: 1 }} // Adjust spacing as needed
                            placeholder="Search"
                            placeholderTextColor="#828282"
                            value={search}
                            onChangeText={(text) => setSearch(text)}
                        />
                        {/* <TouchableOpacity
                            style={{ marginRight: 15, backgroundColor: '#307504', height: 35, width: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                            onPress={()=>{}}>
                            <FontAwesomeIcon icon={faSearch} color={'#ffffff'} size={generalFontSize - 4} />
                        </TouchableOpacity> */}
                    </View>
                </TouchableOpacity>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} tintColor={whiteColor} onRefresh={onRefresh} />
                }
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyle.container, padding('top', 20)]}>
                    {loading ? (
                        <LoadingSkeleton />
                    ) : (

                        <>
                            <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }]}>
                                <Text style={[GlobalStyle.secMainHeading]}>My Store</Text>
                            </View>
                            <View
                                style={{ marginTop: 20, height: '100%', gap: 20 }}
                            >
                                {
                                    filteredProducts.length > 0 ? (
                                        filteredProducts.map((item) => (
                                            <VendorProductCard
                                                key={item.id}
                                                item={item}
                                                toggleDeleteModal={toggleDeleteModal}
                                                toggleUpdateModal={toggleUpdateModal}
                                            />
                                        ))
                                    ) : (
                                        <View style={[GlobalStyle.row, GlobalStyle.aic, GlobalStyle.jc, { flex: 1 }]}>
                                            <Text style={[GlobalStyle.mainTitle]}>No Products Available</Text>
                                        </View>
                                    )
                                }
                            </View>
                        </>
                    )}
                    <DeleteConfirmationModal
                        isVisible={isModalVisible}
                        onConfirm={handleDelete}
                        onCancel={toggleDeleteModal}
                    />

                    <Modal
                        hasBackdrop={true}
                        isVisible={isUpdateModalVisible}
                        onBackdropPress={toggleUpdateModal}
                        style={styles.modal}
                        onBackButtonPress={toggleUpdateModal}
                    >
                        <VendorUpdateProduct toggleUpdateModal={toggleUpdateModal} updateProduct={updateProduct} />
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default VendorProducts;

const styles = StyleSheet.create({
    modal: {
        margin: 0
    },
    image: {
        width: 75,
        height: 75,
        backgroundColor: 'grey',
        borderRadius: 5,
    },
    card: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: itemBg,
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#fff5',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    title: {
        width: Dimensions.get('window').width - 180,
        height: 20,
        marginBottom: 10,
    },
    smallRow: {
        backgroundColor: 'grey',
        borderRadius: 4,
    },
    switchSkeleton: {
        width: 50,
        height: 20,
        backgroundColor: 'grey',
        borderRadius: 10,
        marginTop: 5,
    },
    dateSkeleton: {
        marginTop: 10,
    },
    btnCont: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        gap: 5,
    },
    actionBtn: {
        width: 30,
        height: 30,
        backgroundColor: 'grey',
        borderRadius: 100,
    },
});
