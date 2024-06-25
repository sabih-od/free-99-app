import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { bgColor, generalFontSize, GlobalStyle, padding, textColor, themeColor, windowWidth } from '../../Styles/Theme';
import PaymentMethodModal from '../../Components/PaymentMethodModal/PaymentMethodModal';

const PaymentMethods = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeCard, setActiveCard] = useState(1);

    const closeModal = () => {
        setShowModal(false);
    };

    const cards = [
        { id: 1, name: 'Visa', number: '4242 4242 4242 4242' },
        { id: 2, name: 'MasterCard', number: '4242 4242 4242 4242' },
        { id: 3, name: 'Apple Pay', number: '4242 4242 4242 4242' }
    ];

    const toggleCard = (cardId) => {
        setActiveCard(cardId);
    };

    return (
        <>
            <SafeAreaView style={{ backgroundColor: bgColor, height: '100%' }}>
                <View style={[GlobalStyle.container, { height: 'auto' }, padding('top', 20)]}>
                    <Text style={styles.mainHeading}>Shipping Address</Text>
                </View>
                <ScrollView>
                    <View style={[GlobalStyle.container]}>
                        <View style={[GlobalStyle.jc, { gap: 20 }]}>
                            {cards.map((card) => (
                                <TouchableOpacity
                                    key={card.id}
                                    style={[
                                        GlobalStyle.card,
                                        { paddingHorizontal: 30 },
                                        activeCard === card.id ? styles.activeCard : {}
                                    ]}
                                    onPress={() => toggleCard(card.id)}
                                >
                                    <Text style={[GlobalStyle.orderMainText, { minHeight: 30 }]}>{card.name}</Text>
                                    <Text style={GlobalStyle.orderMinText}>{card.number}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 30, width: (windowWidth - 40), left: 20 }}>
                    <TouchableOpacity onPress={() => setShowModal(!showModal)} style={[GlobalStyle.themeBtn]}>
                        <Text style={[GlobalStyle.themeBtnText]}>Add New Payment Method</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <PaymentMethodModal closeModal={closeModal} modalIsVisible={showModal} />
        </>
    );
};

export default PaymentMethods;

const styles = StyleSheet.create({
    mainHeading: {
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 8,
        fontWeight: '900',
        color: textColor,
        borderWidth: 1
    },
    activeCard: {
        borderWidth: 1,
        borderColor: themeColor
    }
});
