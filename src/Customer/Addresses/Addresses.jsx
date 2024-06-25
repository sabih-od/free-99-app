import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { bgColor, generalFontSize, GlobalStyle, padding, textColor, themeColor, windowWidth } from '../../Styles/Theme'
import AddressModal from '../../Components/AddressModal/AddressModal'

const Addresses = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeCard, setActiveCard] = useState(0); // State to track active card, default to the first card (index 0)

    const closeModal = () => {
        setShowModal(false);
    };

    const handleCardSelect = (index) => {
        setActiveCard(index); // Set active card index
    };

    const addresses = [
        { id: 0, label: 'Home', address: 'xyz, abc street, nyc, usa' },
        { id: 1, label: 'Office', address: 'xyz, abc street, nyc, usa' },
        { id: 2, label: '', address: 'xyz, abc street, nyc, usa' },
    ];

    return (
        <>
            <SafeAreaView style={{ backgroundColor: bgColor, height: '100%' }}>
                <ScrollView>
                    <View style={[GlobalStyle.container, padding('top', 20)]}>
                        <Text style={styles.mainHeading}>Shipping Address</Text>
                        <View style={[GlobalStyle.jc, { gap: 20 }]}>
                            {addresses.map((item, index) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => handleCardSelect(index)}
                                    style={[
                                        GlobalStyle.card,
                                        { paddingHorizontal: 30 },
                                        activeCard === index && styles.activeCard, // Apply activeCard styles if this is the active card
                                    ]}>
                                    <Text style={[GlobalStyle.orderMainText, { minHeight: 30 }]}>{item.label || 'Unnamed Address'}</Text>
                                    <Text style={GlobalStyle.orderMinText}>{item.address}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 30, width: (windowWidth - 40), left: 20 }}>
                    <TouchableOpacity onPress={() => setShowModal(!showModal)} style={[GlobalStyle.themeBtn]}>
                        <Text style={[GlobalStyle.themeBtnText]}>Add New Address</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <AddressModal modalIsVisible={showModal} closeModal={closeModal} />
        </>
    )
}

export default Addresses

const styles = StyleSheet.create({
    mainHeading: {
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 8,
        fontWeight: '900',
        marginBottom: 20,
        color: textColor,
        borderWidth: 1,
    },
    activeCard: {
        borderWidth: 1,
        borderColor: themeColor, // Example color for active state
    },
});
