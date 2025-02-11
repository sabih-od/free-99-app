import React from 'react';
import { View, TouchableOpacity, Image, Linking, StyleSheet } from 'react-native';

const SocialLinks = () => {

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Instagram Link */}
      <TouchableOpacity onPress={() => openLink('https://www.instagram.com/free99us/')}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png' }}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Facebook Link */}
      <TouchableOpacity onPress={() => openLink('https://www.facebook.com/profile.php?id=61557920109089')}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png' }}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* X (Twitter) Link */}
      <TouchableOpacity onPress={() => openLink('https://x.com/Free99us')}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/X_logo.jpg' }}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Pinterest Link */}
      <TouchableOpacity onPress={() => openLink('https://www.pinterest.com/free99us')}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png' }}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  icon: {
    width: 40,
    height: 40,
    margin: 10,
  },
});

export default SocialLinks;
