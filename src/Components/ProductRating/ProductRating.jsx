import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { generalFontSize, GlobalStyle, secondColor, whiteColor } from '../../Styles/Theme';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const ProductRating = ({ review }) => {

    const [rating, setRating] = useState(review.rating); // State for rating

    // Function to format the created_at timestamp
    const formatTimestamp = (timestamp) => {
        const currentTime = new Date();
        const reviewTime = new Date(timestamp);
        const timeDifference = Math.abs(currentTime - reviewTime); // Difference in milliseconds
        const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours
        const daysAgo = Math.floor(hoursAgo / 24); // Convert hours to days

        // If the review happened today, return "today"
        if (
            currentTime.getDate() === reviewTime.getDate() &&
            currentTime.getMonth() === reviewTime.getMonth() &&
            currentTime.getFullYear() === reviewTime.getFullYear()
        ) {
            return "today";
        }

        // If the review happened yesterday, return "yesterday"
        if (
            currentTime.getDate() - reviewTime.getDate() === 1 &&
            currentTime.getMonth() === reviewTime.getMonth() &&
            currentTime.getFullYear() === reviewTime.getFullYear()
        ) {
            return "yesterday";
        }

        // Otherwise, return "X days ago"
        return `${daysAgo} days ago`;
    };


    return (
        <View style={styles.ratingBox}>
            <View style={[GlobalStyle.row, { gap: 10, justifyContent: 'space-between' }]}>
                <Image
                    style={styles.userImg}
                    source={
                        review?.user?.image !== '' ?
                            { uri: review?.user?.image, cache: 'force-cache' } :
                            { uri: 'https://free99us.com/images/no-profile-img.jpg', cache: 'force-cache' }
                    }
                />
                {/* <Image
                    source={
                        authData?.profile_picture !== '' ?
                            { uri: authData?.profile_picture, cache: 'force-cache' } :
                            { uri: 'https://free99us.com/images/no-profile-img.jpg', cache: 'force-cache' }
                    }
                    style={[styles.image, isProfile ? styles.profileImg : null]}
                /> */}
                <View style={{ marginLeft: 0, marginRight: 'auto' }}>
                    <Text style={GlobalStyle.orderMainText}>{review?.user?.name}</Text>
                    <View style={[GlobalStyle.row, GlobalStyle.aic, { gap: 5, marginTop: 5 }]}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <View key={star}>
                                <FontAwesomeIcon
                                    icon={faStar}
                                    color={star <= rating ? 'yellow' : whiteColor} // Change color based on rating
                                    size={generalFontSize - 4}
                                />
                            </View>
                        ))}
                    </View>
                </View>
                <Text style={[GlobalStyle.orderMinText]}>
                    {formatTimestamp(review.created_at)}
                </Text>
            </View>
            <Text style={[GlobalStyle.orderMinText, { marginTop: 10 }]}>
                {review.comment}
            </Text>
        </View>
    );
};


export default ProductRating

const styles = StyleSheet.create({
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'grey'
    },
    ratingBox: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomColor: secondColor,
        borderBottomWidth: 1,
    }
})