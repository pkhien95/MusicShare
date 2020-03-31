import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

function AddMediaTab() {
  const imageUrl =
    'https://i.scdn.co/image/ab67616d0000b2738233b7f811afd19bbbcd3743';

  const albumUrl = 'https://open.spotify.com/album/5idokHIibbDsmLLHyvwwQp';

  const onOpenPress = () => {
    Linking.canOpenURL(albumUrl).then(supported => {
      if (supported) {
        Linking.openURL(albumUrl);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={onOpenPress}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
}

export default AddMediaTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {},
  image: {
    width: 200,
    height: 200,
  },
});
