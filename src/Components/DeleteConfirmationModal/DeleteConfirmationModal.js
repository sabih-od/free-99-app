// DeleteConfirmationModal.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import { generalFontSize, GlobalStyle, isIpad, itemBg, textColor, windowWidth } from '../../Styles/Theme';

const DeleteConfirmationModal = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <SafeAreaView>
      <Modal
        isVisible={isVisible}
        hasBackdrop={true}
        swipeDirection="down"
        style={styles.modal}
        avoidKeyboard={true}
        animationIn={'fadeIn'}
        animationOut={"fadeOut"}
      >
        <View style={styles.modalContent}>
          <Text style={[GlobalStyle.mainTitle, { fontSize: generalFontSize + 4 }]}>Are you sure you want to delete this item?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[GlobalStyle.themeBtn, { width: '100%' }]} onPress={onCancel}>
              <Text style={GlobalStyle.themeBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[GlobalStyle.themeBtn, { width: '100%', backgroundColor: '#9b0000' }]} onPress={onConfirm}>
              <Text style={[GlobalStyle.themeBtnText, { color: textColor }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        paddingBottom: 30,
      },
      android: {
        paddingBottom: 60,
      },
    }),
  },
  modal: {
    margin: 0
  },
  modalContent: {
    backgroundColor: itemBg,
    paddingHorizontal: 20,
    width: windowWidth - 40,
    minHeight: windowWidth / 2,
    paddingVertical: 20,
    borderRadius: isIpad ? 20 : 10,
    marginHorizontal: 'auto',
    maxWidth: isIpad ? windowWidth / 2 : ''
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 20,
    marginTop: 'auto'
  }
});

export default DeleteConfirmationModal;
