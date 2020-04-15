import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import COLORS from '../../../theme/colors'

class Boostrap extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          color={COLORS.black}
          size={'large'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Boostrap
