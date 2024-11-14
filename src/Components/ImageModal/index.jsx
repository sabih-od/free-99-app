import React, {createRef, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ImageZoom, ZOOM_TYPE} from '@likashefqet/react-native-image-zoom';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const ImageModal = ({isVisible, closeImageZoom, imageZoomRef, img}) => {
  // const panRef = useRef();

  // // Scaling and translation
  // const baseScale = useRef(new Animated.Value(1)).current;
  // const translateX = useRef(new Animated.Value(0)).current;
  // const translateY = useRef(new Animated.Value(0)).current;

  // let lastScale = 1;
  // let lastOffset = {x: 0, y: 0};
  // const maxScale = 3; // Maximum zoom level
  // const doubleTapTimeout = 300;
  // let lastTapTime = 0;
  // let zoomOutTimeout;

  // Handle pan gesture event
  // const onPanEvent = Animated.event(
  //   [
  //     {
  //       nativeEvent: {
  //         translationX: translateX,
  //         translationY: translateY,
  //       },
  //     },
  //   ],
  //   {
  //     useNativeDriver: true,
  //     listener: event => {
  //       // Calculate the scaled width and height of the image
  //       const scaledWidth = width * lastScale;
  //       const scaledHeight = height * lastScale;

  //       // Calculate the maximum allowed translation in each direction
  //       const maxTranslateX = Math.max(0, (scaledWidth - width) / 2);
  //       const maxTranslateY = Math.max(0, (scaledHeight - height) / 2);

  //       // Apply constraints to translateX and translateY
  //       const clampedX = Math.min(
  //         Math.max(
  //           event.nativeEvent.translationX + lastOffset.x,
  //           -maxTranslateX,
  //         ),
  //         maxTranslateX,
  //       );
  //       const clampedY = Math.min(
  //         Math.max(
  //           event.nativeEvent.translationY + lastOffset.y,
  //           -maxTranslateY,
  //         ),
  //         maxTranslateY,
  //       );

  //       // Set the clamped values
  //       translateX.setValue(clampedX - lastOffset.x);
  //       translateY.setValue(clampedY - lastOffset.y);
  //     },
  //   },
  // );

  // Handle pan state change
  // const handlePanStateChange = ({nativeEvent}) => {
  //   if (nativeEvent.oldState === State.ACTIVE) {
  //     // Update lastOffset with clamped values
  //     lastOffset.x += nativeEvent.translationX;
  //     lastOffset.y += nativeEvent.translationY;

  //     translateX.setOffset(lastOffset.x);
  //     translateX.setValue(0);
  //     translateY.setOffset(lastOffset.y);
  //     translateY.setValue(0);
  //   }
  // };

  // Handle double-tap to zoom
  // const handleDoubleTap = event => {
  //   const now = Date.now();
  //   if (now - lastTapTime < doubleTapTimeout) {
  //     const {locationX, locationY} = event.nativeEvent;
  //     const newScale = lastScale === 1 ? maxScale : 1;

  //     if (newScale === 1) {
  //       // Reset translation values and center the image
  //       translateX.setValue(0);
  //       translateX.setOffset(0);
  //       translateY.setValue(0);
  //       translateY.setOffset(0);
  //     } else {
  //       // Calculate new translation to zoom in around the tap location
  //       const newTranslateX = -(locationX - width / 2) * (maxScale - 1);
  //       const newTranslateY = -(locationY - height / 2) * (maxScale - 1);

  //       translateX.setValue(newTranslateX);
  //       translateY.setValue(newTranslateY);
  //       lastOffset = {x: newTranslateX, y: newTranslateY};
  //     }

  //     // Animate scale change
  //     Animated.timing(baseScale, {
  //       toValue: newScale,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }).start();

  //     lastScale = newScale;

  //     // If zoomed in, reset to zoomed-out state after 3 seconds
  //     if (zoomOutTimeout) clearTimeout(zoomOutTimeout);
  //     if (newScale > 1) {
  //       zoomOutTimeout = setTimeout(() => {
  //         // Reset to original scale and centered position
  //         Animated.parallel([
  //           Animated.timing(baseScale, {
  //             toValue: 1,
  //             duration: 300,
  //             useNativeDriver: true,
  //           }),
  //           Animated.timing(translateX, {
  //             toValue: 0,
  //             duration: 300,
  //             useNativeDriver: true,
  //           }),
  //           Animated.timing(translateY, {
  //             toValue: 0,
  //             duration: 300,
  //             useNativeDriver: true,
  //           }),
  //         ]).start();

  //         lastScale = 1;
  //         lastOffset = {x: 0, y: 0};
  //       }, 3000); // 3 seconds
  //     }
  //   }
  //   lastTapTime = now;
  // };

  return (
    // <Modal
    //   visible={isVisible}
    //   transparent={true}
    //   onRequestClose={closeImageZoom}
    //   style={{zIndex: 90}}>
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
      }}>
      <ImageZoom
        ref={imageZoomRef}
        uri={img}
        minScale={0.5}
        maxScale={5}
        doubleTapScale={3}
        minPanPointers={1}
        isDoubleTapEnabled
        onDoubleTap={zoomType => {
          if (zoomType === ZOOM_TYPE.ZOOM_IN) {
            setTimeout(() => {
              imageZoomRef.current?.reset();
            }, 3000);
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          zIndex: 150,
        }}
        resizeMode="contain"
      />
      {/* <GestureHandlerRootView style={styles.mainContainer}>
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={onPanEvent}
          onHandlerStateChange={handlePanStateChange}
          shouldCancelWhenOutside>
          <Animated.View style={[styles.wrapper]}>
            <TouchableWithoutFeedback
              onPress={handleDoubleTap}
              style={{zIndex: 130}}>
              <Animated.View style={styles.imageContainer}>
                <Animated.Image
                  style={[
                    styles.pinchableImage,
                    {
                      transform: [
                        {scale: baseScale},
                        {translateX},
                        {translateY},
                      ],
                    },
                  ]}
                  source={{uri: img}}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView> */}
      <TouchableOpacity
        onPress={closeImageZoom}
        style={{
          position: 'absolute',
          top: 40,
          right: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 50,
          padding: 10,
          zIndex: 200,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
          }}>
          Close
        </Text>
      </TouchableOpacity>
    </View>
    // </Modal>
  );
};

export default ImageModal;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     zIndex: 110,
//   },
//   wrapper: {
//     flex: 1,
//     zIndex: 120,
//   },
//   imageContainer: {
//     zIndex: 140,
//     backgroundColor: '#00000090',
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'scroll',
//   },
//   pinchableImage: {
//     width: width,
//     height: height,
//     resizeMode: 'contain',
//     zIndex: 150,
//   },
// });
