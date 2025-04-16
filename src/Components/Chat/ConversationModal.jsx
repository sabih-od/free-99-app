import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCircleXmark,
  faPaperclip,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

import {SendChatMessageAPI} from '../../../Store/Actions/ChatActions';
import {setPaginateData} from '../../../Store/Reducers/ChatReducers';

const {width, height} = Dimensions.get('window');

const SIZES = {
  fullHeight: height,
  halfHeight: height / 2,

  fullWidth: width,
  halfWidth: width / 2,
};

const ConversationModal = ({
  isVisible = false,
  user = null,
  data = [],
  onClose = null,
  onSubmit = null,
  onScroll = null,
  onStart = null,
  autoScrollEnd = false,
  isDisableInputArea = false,
}) => {
  const {authId} = useSelector(state => state.auth);
  const {chatMessages} = useSelector(state => state.chat);
  const flatListRef = useRef(null);

  const [message, setMessage] = useState('');
  const [attachmentImage, setAttachmentImage] = useState(null);

  useEffect(() => {
    if (autoScrollEnd) flatListRef?.current?.scrollToEnd({animated: true});
  }, [data]);

  const handleSendMessage = async () => {
    // const payload = new FormData();

    // if (attachmentImage === null) payload.append('message', message);

    // else {
    //   payload.append('message', 'Attachment');

    //   const fileData = {
    //     uri:
    //       Platform.OS === 'ios'
    //         ? attachmentImage.url.replace('file://', '')
    //         : attachmentImage.path,
    //     type: attachmentImage.mime,
    //     name:
    //       attachmentImage.filename ||
    //       `attachmentImage.${attachmentImage.mime.split('/')[1]}`,
    //   };

    //   payload.append('file', fileData);
    // }

    const payload = {
      message: message,
    };

    onSubmit(payload).then(() => {
      setMessage('');
      setAttachmentImage(null);
    });
  };

  const imagePickerFunc = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      forceJpg: true,
      cropping: true,
      //  width: 400,
      //  height: 400,
      //  compressImageMaxWidth: 400,
      //  compressImageMaxHeight: 400,
      //  includeBase64: true
    }).then(image => {
      setAttachmentImage(image);
    });
  };

  const renderMessage = ({item}) => {
    if (item?.content === 'Attachment') {
      return (
        item?.media_upload?.url && (
          <View
            style={
              item?.sender_id === authId
                ? [styles.messageContainer, styles.sentMessage]
                : [styles.messageContainer, styles.receivedMessage]
            }>
            <Image
              source={{uri: item?.media_upload?.url}}
              style={styles.messageImage}
            />
          </View>
        )
      );
    }

    // all chats
    if (item?.content)
      return (
        <View
          style={[
            styles.messageContainer,
            item?.sender_id === authId
              ? styles.sentMessage
              : styles.receivedMessage,
          ]}>
          {item?.image && (
            <Image
              source={{uri: item?.image}}
              style={styles.image}
              // onError={(error) => console.log("Image load error: ", error)}
              // onLoad={() => console.log("Image loaded successfully...")}
            />
          )}
          <Text
            style={[
              styles.messageText,
              item?.sender_id === authId ? {color: '#FFFFFF'} : {},
            ]}>
            {item.content}
          </Text>
        </View>
      );
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} animationType="slide">
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Chat</Text>
          <Text style={styles.headerText}>
            {' '}
            {user ? user?.name : 'Anonymous Person'}{' '}
          </Text>
          <TouchableOpacity onPress={onClose}>
            {/* <Icon name="close" size={24} color="black" /> */}
            <FontAwesomeIcon
              icon={faCircleXmark}
              // color={'#FFFFFF'}
              size={30}
            />
          </TouchableOpacity>
        </View>

        {/* Message List */}
        {data?.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={data}
            keyExtractor={(item, index) => {
              const id = item.id || `fallback-id-${index}`;
              const timestamp = item.timestamp || new Date().getTime();
              return `${id}-${timestamp}`;
            }}
            renderItem={renderMessage}
            contentContainerStyle={styles.messageList}
            onScroll={onScroll}
            onStartReached={onStart}
            onContentSizeChange={() => {
              if (isVisible && autoScrollEnd) {
                flatListRef.current.scrollToEnd({animated: true});
              }
            }}
          />
        ) : (
          <View style={[styles.messageList, {marginTop: 50}]}>
            <Text style={styles.emptyBox}>Empty Box!</Text>
          </View>
        )}

        {/* Input Section */}
        {!isDisableInputArea && (
          <View>
            <View style={styles.inputContainer}>
              {user?.type !== 'uncle-buck' && (
                <TouchableOpacity
                  style={styles.attachmentButton}
                  onPress={imagePickerFunc}>
                  <FontAwesomeIcon
                    icon={faPaperclip}
                    color={'#000000'}
                    size={20}
                  />
                </TouchableOpacity>
              )}

              <TextInput
                style={styles.input}
                placeholder="Type a message"
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendMessage}>
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  color={'#FFFFFF'}
                  size={20}
                />
              </TouchableOpacity>
            </View>

            {attachmentImage && (
              <View style={styles.attachmentContainer}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    objectFit: 'cover',
                    borderWidth: 1,
                    borderColor: '#000000',
                  }}
                  source={{uri: attachmentImage?.path}}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ConversationModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: SIZES.fullHeight * 0.06,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageList: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#000000',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F1F1',
  },
  messageText: {
    fontSize: 16,
  },
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  attachmentContainer: {
    marginTop: 5,
  },
  attachmentButton: {
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginHorizontal: 5,
  },
  sendButton: {
    backgroundColor: '#000000',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBox: {
    // fontWeight: '600',
    textAlign: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: SIZES.fullWidth * 0.1,
    height: SIZES.fullWidth * 0.1,
    marginRight: 10,
    borderRadius: 50,
  },
});
