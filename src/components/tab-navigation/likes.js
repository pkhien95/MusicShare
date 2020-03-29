import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function LikesTab() {
  return (
    <View style={styles.container}>
      <Text>Likes </Text>
    </View>
  );
}
export default LikesTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
