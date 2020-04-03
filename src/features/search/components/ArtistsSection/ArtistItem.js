import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

type ArtistItemProps = {
  item: any,
}

function ArtistItem(props: ArtistItemProps) {
  const {
    item: { image, name },
  } = props
  console.log('props: ', props)
  const imageSource = image
    ? { uri: image.url }
    : require('../../../../assets/images/default_avatar.png')
  return (
    <View style={styles.container}>
      <Image style={[styles.image]} source={imageSource} />
      <Text style={styles.nameText}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  nameText: {
    fontWeight: '600'
  },
})

export default ArtistItem
