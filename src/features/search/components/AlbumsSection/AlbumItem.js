import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type ArtistItemProps = {
  item: any,
  onItemPress: (id: string) => void,
}

function AlbumItem(props: ArtistItemProps) {
  const {
    item: { id, image, name },
    onItemPress,
  } = props

  const onPress = () => {
    onItemPress(id)
  }

  const imageSource = image
    ? { uri: image.url }
    : require('../../../../assets/images/album.png')
  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      <View style={styles.container}>
        <Image style={[styles.image]} source={imageSource} />
        <Text style={styles.nameText} numberOfLines={2}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchable: {
    paddingHorizontal: 10,
  },
  container: {
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
