import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {ImageZoom, ZOOM_TYPE} from '@likashefqet/react-native-image-zoom';

const ImageModal = ({isVisible, closeImageZoom, imageZoomRef, img}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={closeImageZoom}
      style={{zIndex: 90}}>
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
          }}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={closeImageZoom}
          style={{
            position: 'absolute',
            top: 40,
            right: 20,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 50,
            padding: 10,
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
    </Modal>
  );
};

export default ImageModal;
