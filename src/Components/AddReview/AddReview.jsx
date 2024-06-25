import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { useForm } from 'react-hook-form';
import { generalFontSize, GlobalStyle, themeColor, windowWidth, whiteColor, itemBg } from '../../Styles/Theme';
import { useSelector } from 'react-redux';
import { authService } from '../../Services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { productReviewService } from '../../Services/productReviewService';

const AddReview = ({ modalIsVisible, closeModal, itemId }) => {
    const { handleSubmit, formState: { errors }, register, setValue, reset } = useForm();
    const [isModalVisible, setModalVisible] = useState(modalIsVisible);
    const [rating, setRating] = useState(0); // State for rating
    const [loading, setLoading] = useState()
    const commentRef = useRef()

    useEffect(() => {
        setModalVisible(modalIsVisible); // Update local state when modalIsVisible prop changes
        if (!modalIsVisible) {
            resetForm(); // Reset form and rating when modal is closed
        }
    }, [modalIsVisible]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        closeModal(); // Call the parent's close function
    };

    const resetForm = () => {
        setRating(0); // Reset rating to 0
        reset({ comment: '' }); // Reset form fields
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const reviewData = {
            product_id: itemId,
            comment: data.comment,
            rating: rating,
        };
        try {
            const response = await productReviewService.postProductReview(reviewData); // Adjust the service call as needed
            toggleModal(); // Close modal after successful submission
        } catch (error) {
            console.error('Review submission failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <View style={{ flex: 1 }}>
                    <Modal
                        isVisible={isModalVisible}
                        hasBackdrop={true}
                        onBackdropPress={toggleModal}
                        onSwipeComplete={toggleModal}
                        swipeDirection="down"
                        style={styles.modal}
                        avoidKeyboard={true}
                    // animationIn={'fadeIn'}
                    // animationOut={"fadeOut"}
                    >
                        <View style={styles.modalContent}>
                            <View style={styles.topbar}></View>
                            {loading ? (
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator
                                        color={themeColor}
                                        size={'large'}
                                    />
                                </View>
                            )
                                :
                                (
                                    <ScrollView style={styles.container}>
                                        <Text style={[GlobalStyle.mainTitle, { fontSize: generalFontSize + 4 }]}>Add a Review</Text>
                                        <View style={GlobalStyle.inputCont}>
                                            <Text style={GlobalStyle.inputLabel}>Comment</Text>
                                            <View style={[GlobalStyle.inputContainer, { overflow: 'visible' }]}>
                                                <TextInput
                                                    style={[GlobalStyle.input, { minHeight: 120, height: 'auto' }]}
                                                    multiline
                                                    placeholder='Comment'
                                                    placeholderTextColor={'#707070'}
                                                    keyboardType='default'
                                                    autoCapitalize='none'
                                                    {...register("comment", { required: 'Comment is required' })}
                                                    ref={commentRef}
                                                    onChangeText={(value) => setValue('comment', value)}
                                                />
                                            </View>
                                            {errors.comment && <Text style={{ color: 'red', marginTop: 5 }}>{errors.comment.message}</Text>}
                                        </View>

                                        <View style={GlobalStyle.inputCont}>
                                            <Text style={GlobalStyle.inputLabel}>Rating</Text>
                                            <View style={GlobalStyle.inputContainer}>
                                                <View style={[GlobalStyle.row, GlobalStyle.aic, { gap: 10 }]}>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <TouchableOpacity
                                                            key={star}
                                                            onPress={() => setRating(star)} // Set rating on click
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                color={star <= rating ? 'yellow' : whiteColor} // Change color based on rating
                                                                size={generalFontSize + 5}
                                                            />
                                                        </TouchableOpacity>
                                                    ))}
                                                </View>
                                            </View></View>
                                        <TouchableOpacity style={[GlobalStyle.themeBtn, { marginTop: 20 }]} onPress={handleSubmit(onSubmit)}>
                                            <Text style={[GlobalStyle.themeBtnText]}>Submit Review</Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                )
                            }
                        </View>
                    </Modal>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default AddReview

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: itemBg,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: '50%', // Ensure minimum height
        position: 'relative'
    },
    container: {
        flex: 1,
    },
    topbar: {
        position: 'absolute',
        top: 0,
        height: 3,
        width: windowWidth / 4,
        backgroundColor: whiteColor,
        left: (windowWidth / 2) - (windowWidth / 8)
    }
});
