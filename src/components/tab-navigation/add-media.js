import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AddMediaTab() {
  return (
    <View style={styles.container}>
      <Text>AddMediaTab</Text>
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
});
