import React, { useState } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function AddMediaTab() {
  const [url, setUrl] = useState(
    'https://open.spotify.com/track/1U8bwOTAtnqlWMCn1mwYyj?si=d7uCaWh6TfCWkiRH3oioJA',
  );
  
  const onOpenPress = () => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };
  
  const onChangeUrl = (text: string) => {
    setUrl(text);
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={'Enter playlist url'}
        onChangeText={onChangeUrl}
        value={url}
      />
      <TouchableOpacity style={styles.openButton} onPress={onOpenPress}>
        <Text style={styles.openButtonText}>Open In Spotify</Text>
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
  textInput: {
    height: 60,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2196f3',
    marginHorizontal: 15,
    padding: 10,
    fontSize: 16,
    alignSelf: 'stretch',
  },
  openButton: {
    marginHorizontal: 30,
    backgroundColor: '#2196f3',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  openButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
