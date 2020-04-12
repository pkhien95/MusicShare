import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import COLORS from '../../../../theme/colors'
import { getArtistsNamesFromList } from '../../../../utils'

type ArtistItemProps = {
  item: any,
  onItemPress: (id: string) => void,
  onTrackPlayPress: (id: string) => void,
  onTrackViewMorePress: (id: string) => void,
}

function TrackItem(props: ArtistItemProps) {
  const {
    item: { id, name, artists },
    onItemPress,
    onTrackPlayPress,
    onTrackViewMorePress,
  } = props

  // const onPress = () => {
  //   onItemPress(id)
  // }

  const onTrackPlayButtonPress = () => {
    onTrackPlayPress(id)
  }

  const onTrackViewMoreButtonPress = () => {
    onTrackViewMorePress(id)
  }

  const buttonHitSlop = { top: 12, right: 12, bottom: 12, left: 12 }

  return (
    <View style={styles.touchable}>
      <View style={styles.container}>
        <Ionicons name={'md-disc'} size={50} color={COLORS.black} />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.subTitleText} numberOfLines={1}>
            by {getArtistsNamesFromList(artists)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.playButton}
          hitSlop={buttonHitSlop}
          onPress={onTrackPlayButtonPress}>
          <Ionicons name={'md-play'} size={20} color={COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity hitSlop={buttonHitSlop}>
          <Ionicons
            name={'ios-more'}
            size={20}
            color={COLORS.black}
            onPress={onTrackViewMoreButtonPress}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  touchable: {
    paddingHorizontal: 15,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    height: 50,
  },
  titleContainer: {
    alignSelf: 'stretch',
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  subTitleText: {
    fontSize: 14,
    color: COLORS.lightGrey,
  },
  sideColumn: {
    flexDirection: 'row',
  },
  playButton: {
    marginRight: 20,
  },
})

export default TrackItem
