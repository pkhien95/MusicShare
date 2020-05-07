import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../../../theme/colors'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { HOME_SCREEN_ITEM_TYPE } from '../constants'
import { capitalize, get } from 'lodash'
import { getArtistsNamesFromList } from '../../../utils'
import { openInSpotify } from '../../../utils/linking'
import { SOURCE } from '../../../constants'

type HomeItemProps = {
  item: any,
  isPlaying: boolean,
  onPlay: (item: any) => void,
  onPause: (item: any) => void,
}

class HomeItem extends React.PureComponent<HomeItemProps> {
  onPlayButtonPress = () => {
    const { item, onPlay } = this.props
    onPlay(item)
  }

  onPauseButtonPress = () => {
    const { item, onPause } = this.props
    onPause(item)
  }

  onOpenInSpotifyButtonPress = () => {
    const url = get(this.props.item, 'external_urls.spotify')
    if (url) {
      openInSpotify(url)
    }
  }

  renderIcon = (type: string) => {
    if (type === HOME_SCREEN_ITEM_TYPE.ALBUM) {
      return (
        <MaterialIcons name={'library-music'} size={50} color={COLORS.black} />
      )
    }
    return <Ionicons name={'md-disc'} size={50} color={COLORS.black} />
  }

  render() {
    const { type, name, artists, source } = this.props.item
    const buttonHitSlop = { top: 12, right: 12, bottom: 12, left: 12 }

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>{this.renderIcon(type)}</View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.subTitleText} numberOfLines={1}>
            {capitalize(type)} by {getArtistsNamesFromList(artists)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.playButton}
          hitSlop={buttonHitSlop}
          onPress={
            this.props.isPlaying
              ? this.onPauseButtonPress
              : this.onPlayButtonPress
          }>
          <Ionicons
            name={this.props.isPlaying ? 'ios-pause' : 'md-play'}
            size={20}
            color={COLORS.black}
          />
        </TouchableOpacity>
        {source === SOURCE.spotify && (
          <TouchableOpacity
            hitSlop={buttonHitSlop}
            onPress={this.onOpenInSpotifyButtonPress}>
            <Entypo name={'spotify'} size={20} color={COLORS.black} />
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    height: 50,
    paddingHorizontal: 15,
  },
  iconContainer: {
    width: 50,
    alignItems: 'center',
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

export default HomeItem
