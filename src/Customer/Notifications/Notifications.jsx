import { FlatList, SafeAreaView, StyleSheet, Text, View, Platform, RefreshControl, Alert, ActivityIndicator, Animated, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { generalFontSize, GlobalStyle, textColor, fontFamily, padding, bgColor, itemBg, whiteColor, isDarkMode, themeColor } from '../../Styles/Theme'
import { notiData } from '../../data/notifications'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SwipeListView } from 'react-native-swipe-list-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons'
import { notificationService } from '../../Services/notificationService'
import { useSelector } from 'react-redux'
import moment from 'moment'
import RenderHtml from 'react-native-render-html';

const { width } = Dimensions.get('window')

const LoadingSkeleton = () => {
    const numSkeletonItems = 6; // Number of skeleton items to show
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
                <View key={index} style={styles.skeletonItemBox}>
                    <Animated.View style={[styles.skeletonText, { width: '90%', height: 20, opacity }]} />
                    <Animated.View style={[styles.skeletonText, { width: '70%', height: 20, opacity }]} />
                    <Animated.View style={[styles.skeletonTime, { opacity }]} />
                </View>
            ))}
        </View>
    );
};

const Notifications = () => {
    const data = useSelector((state) => state.notifications.notifications);
    const [refreshing, setRefreshing] = useState(false);
    const loading = useSelector((state) => state.notifications.loading)

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await notificationService.getNotifications();
        } catch (error) {
            console.error('Failed to refresh notifications:', error);
        } finally {
            setRefreshing(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await notificationService.getNotifications();
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        fetchData();
    }, []);
    const delNotification = async (id) => {

        try {

            const res = await notificationService.delete(id)
            await notificationService.getNotifications();
            fetchData()
        }
        catch (error) {
        }

    }
    return (
        <SafeAreaView style={{ backgroundColor: bgColor, height: '100%' }}>
            <View style={[GlobalStyle.container, padding("top", 30)]}>
                <Text style={[styles.mainHeading]}>Notifications</Text>
                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <SwipeListView
                        refreshControl={
                            <RefreshControl refreshing={refreshing} tintColor={whiteColor} onRefresh={onRefresh} />
                        }
                        disableRightSwipe
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ gap: 10 }}
                        data={data}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity activeOpacity={1} style={[GlobalStyle.row, styles.itemBox]} onPress={() => { }}>
                                <View key={index} style={styles.box}>
                                    {/* <Text style={styles.itemTitle}>{item.content_body}</Text> */}
                                    <RenderHtml
                                        contentWidth={width}
                                        source={{ html: item.content_body }}
                                        baseStyle={{ color: '#fff' }}
                                    />
                                </View>
                                <Text style={styles.itemTime}>
                                    {moment(item?.created_at).format('LT')}
                                </Text>
                            </TouchableOpacity>
                        )}
                        renderHiddenItem={({ item }, rowMap) => (
                            <View key={rowMap} style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'flex-end', height: '100%', paddingRight: 5 }]}>
                                <TouchableOpacity onPress={() => delNotification(item.id)} style={[styles.dltBtn, { backgroundColor: '#9b0000' }]}>
                                    <FontAwesomeIcon icon={faTrash} color={whiteColor} />
                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={45}
                        rightOpenValue={-50}
                    />

                )}
            </View>
        </SafeAreaView>
    )
}

export default Notifications

const styles = StyleSheet.create({
    mainHeading: {
        fontFamily: 'FreightBigPro-Bold',
        fontSize: generalFontSize + 8,
        fontWeight: '900',
        marginBottom: 20,
        color: textColor
    },
    itemTitle: {
        color: textColor,
        ...fontFamily("regular"),
        fontSize: generalFontSize,
        lineHeight: 25
    },
    itemTime: {
        color: textColor,
        ...fontFamily("regular"),
        fontSize: generalFontSize - 8,
        lineHeight: 25,
        position: 'absolute',
        bottom: 0,
        right: 20
    },
    itemBox: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: itemBg,
        borderRadius: 10,
    },
    dltBtn: {
        height: 40,
        width: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25 / 2,
        ...Platform.select({
            ios: {
                shadowColor: '#333',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    skeletonItemBox: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'grey',
        borderRadius: 10,
        marginBottom: 10,
    },
    skeletonText: {
        backgroundColor: '#c0c0c0',
        borderRadius: 4,
        marginBottom: 10,
    },
    skeletonTime: {
        width: 80,
        height: 10,
        backgroundColor: '#c0c0c0',
        borderRadius: 4,
        position: 'absolute',
        bottom: 10,
        right: 20,
    },
})
