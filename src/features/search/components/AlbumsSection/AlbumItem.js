import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

type ArtistItemProps = {
  item: any,
}

function AlbumItem(props: ArtistItemProps) {
  const {
    item: { image, name },
  } = props
  console.log('props: ', props)
  const imageSource = image
    ? { uri: image.url }
    : require('../../../../assets/images/album.png')
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
    flexDirection: 'row',
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginRight: 10,
  },
  nameText: {
    fontWeight: '600',
    flex: 1,
  },
})

export default AlbumItem
