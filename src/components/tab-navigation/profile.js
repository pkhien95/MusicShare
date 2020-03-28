import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ProfileTab() {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
}
export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
