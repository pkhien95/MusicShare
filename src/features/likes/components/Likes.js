import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Likes() {
  return (
    <View style={styles.container}>
      <Text>Likes </Text>
    </View>
  )
}
export default Likes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
