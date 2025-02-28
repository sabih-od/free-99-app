import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';;
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { COLORS } from '../../Constants/COLORS';
import { SIZES } from '../../Constants/Screens/Screens';
import { APP_URL } from '../../Constants';

const ListingCard = ({item, actions = null}) => {

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <View>
          <Image
              source={{
                  uri: item?.image 
                  ? APP_URL + '/storage/uploads/' + item?.image
                  : `${APP_URL}/images/no-profile-img.jpg`
              }}
              style={styles.image}
          />
        </View>
        
        {
          item?.user 
            ?
              (
                <View>
                  { item?.user?.name && <Text style={styles.title}>{ item?.user?.name }</Text> }
                  { item?.user?.email && <Text style={styles.title}>{ item?.user?.email }</Text> }
                  { item?.user?.phone && <Text style={styles.title}>{ item?.user?.phone }</Text> }
                  { item?.user?.address && <Text style={styles.title}>{ item?.user?.address }</Text> }
                </View>
              )
            :
              <Text style={styles.title}>{ item?.name }</Text>
        }
      </View>
      <View>
          <TouchableOpacity 
            style={[styles.button]}
            onPress={() => actions.conversation(item)}
          >
            <FontAwesomeIcon 
                icon={faMessage} 
                color={COLORS.white} 
                size={20} 
            />
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListingCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.black,
    fontSize: SIZES.fullWidth * 0.05
  },
  button: {
    backgroundColor: COLORS.black,
    padding: 10,
    borderRadius: 20
  },
  image: {
    resizeMode: 'contain',
    width: SIZES.fullWidth * 0.15,
    height: SIZES.fullWidth * 0.15,
    marginRight: 10,
    borderRadius: 50
  }
});
