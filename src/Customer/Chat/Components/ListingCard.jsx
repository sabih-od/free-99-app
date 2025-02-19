import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';
import {COLORS} from '../../../Constants/COLORS';
import {SIZES} from '../../../Constants/Screens/Screens';
import {Images} from '../../../Constants/Images';
import { Routes } from '../../../Constants/Routes';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ListingCard = ({item, actions = null}) => {

  return (
    <View style={styles.cont}>
      <View style={styles.row}>
        {
          item?.blocked_user_detail?.profile_image &&
            <Image
              source={{
                uri: item?.blocked_user_detail?.profile_image 
                  ? Routes.serverUrl + '/storage/uploads/' + item?.blocked_user_detail?.profile_image
                  : `${Routes.serverUrl}assets/images/ph-avatar.jpg`
              }}
              style={styles.image}
              // onError={(error) => console.log("Image load error: ", error)}
              // onLoad={() => console.log("Image loaded successfully")}
            />
        }
        
        {
          item?.media_upload?.url &&
            <Image
              source={{
                uri: item?.media_upload?.url 
                  ? item?.media_upload?.url
                  : `${Routes.serverUrl}assets/images/ph-avatar.jpg`
              }}
              style={styles.image}
              // onError={(error) => console.log("Image load error: ", error)}
              // onLoad={() => console.log("Image loaded successfully")}
            />
        }

        {
          item?.image &&
            <Image
              source={{ uri: item?.image }}
              style={styles.image}
              // onError={(error) => console.log("Image load error: ", error)}
              // onLoad={() => console.log("Image loaded successfully")}
            />
        }

        <View style={styles.nameView}>
          <Text style={styles.name}>{item?.name ?? item?.blocked_user_detail?.name ?? item?.title}</Text>
        </View>

        <View  style={styles.actionView}>
          {
            actions?.unblockFriend && 
              <TouchableOpacity 
                style={styles.chatBtn}
                onPress={() => actions?.unblockFriend(item?.user_id)}
              >
                <Text style={styles.chatText}> Unblock </Text>
              </TouchableOpacity>
          }

          {
            actions?.conversation && 
              <TouchableOpacity 
                style={[styles.chatBtn, { 
                  // marginRight: 5 
                }]}
                onPress={() => actions?.conversation(item)}
              >
                <FontAwesomeIcon 
                  icon={faMessage} 
                  color={'#FFFFFF'} 
                  size={20} 
                />
              </TouchableOpacity>
          }

          {
            actions?.unfriend && 
              <TouchableOpacity 
                style={styles.chatBtn}
                onPress={() => actions?.unfriend(item?.user_id)}
              >
                <Text style={styles.chatText}> Unfriend </Text>
              </TouchableOpacity>
          }

          {
            (actions?.joinGroup && !item?.channel?.i_am_participant) &&
              <TouchableOpacity 
                style={[styles.chatBtn, { 
                  marginRight: 5 
                }]}
                onPress={() => actions?.joinGroup(item)}
              >
                <Text style={{color: "#FFFFFF"}}>Group</Text>
              </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  );
};

export default ListingCard;

const styles = StyleSheet.create({
  chatText: {
    color: COLORS.white,
  },
  chatBtn: {
    backgroundColor: COLORS.black,
    padding: 10,
    borderRadius: 20,
  },
  mutualFriend: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  mutual: {
    fontSize: SIZES.fullWidth * 0.035,
    color: COLORS.gray2,
  },
  name: {
    fontSize: SIZES.fullWidth * 0.05,
    color: COLORS.black,
  },
  nameView: {
    width: '40%',
    overflow: 'hidden',
  },
  actionView: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {
    resizeMode: 'contain',
    width: SIZES.fullWidth * 0.15,
    height: SIZES.fullWidth * 0.15,
    marginRight: 10,
    borderRadius: 50
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cont: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
  },
});
