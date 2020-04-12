import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type ArtistItemProps = {
  item: any,
  onItemPress: (id: string) => void,
}

function ArtistItem(props: ArtistItemProps) {
  const {
    item: { id, image, name },
    onItemPress,
  } = props
  const imageSource = image
    ? { uri: image.url }
    : require('../../../../assets/images/default_avatar.png')

  const onPress = () => {
    onItemPress(id)
  }

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
    maxWidth: 100,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  nameText: {
    fontWeight: '600',
    textAlign: 'center',
  },
})

export default ArtistItem
