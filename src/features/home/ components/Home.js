import React, { Component } from 'react'
import { FlatList, PixelRatio, StyleSheet, View } from 'react-native'
import HomeItem from './HomeItem'
import { remote } from 'react-native-spotify-remote'
import { SOURCE } from '../../../constants'
import { MediaPlayer } from '@pkhien/react-native-apple-music'

type HomeProps = {
  checkSpotifyAuth: () => void,
  disconnectSpotifyRemote: () => void,
}

type HomeState = {
  trackIsPlaying: number | null,
}

class Home extends Component<HomeProps, HomeState> {
  constructor() {
    super()

    this.state = {
      trackPaused: null,
      trackIsPlaying: null,
    }
  }

  onPlay = (item: any) => {
    const { id, uri, source } = item
    const prevtrackIsPlaying = this.state.trackIsPlaying
    const prevtrackPaused = this.state.trackPaused

    this.setState(
      {
        trackPaused: null,
        trackIsPlaying: id,
      },
      () => {
        if (source !== SOURCE.appleMusic) {
          remote.playUri(uri)
        } else {
          if (
            !prevtrackPaused ||
            prevtrackPaused !== id ||
            (prevtrackIsPlaying && prevtrackIsPlaying !== id) ||
            (!prevtrackIsPlaying && !prevtrackPaused)
          ) {
            MediaPlayer.setQueue([id])
          }
          MediaPlayer.play()
        }
      },
    )
  }

  onPause = (item: any) => {
    const { source, id } = item
    this.setState(
      {
        trackPaused: id,
        trackIsPlaying: null,
      },
      () => {
        if (source !== SOURCE.appleMusic) {
          remote.pause()
        } else {
          MediaPlayer.pause()
        }
      },
    )
  }

  renderItem = ({ item, index }) => {
    return (
      <HomeItem
        item={item}
        onPlay={this.onPlay}
        onPause={this.onPause}
        isPlaying={item.id === this.state.trackIsPlaying}
      />
    )
  }

  renderItemSeparator = () => {
    return <View style={styles.divider} />
  }

  render() {
    const { items } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={items}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparator}
          extraData={this.state.trackIsPlaying}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flexGrow: 1,
  },
  listContainer: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  divider: {
    height: 1 / PixelRatio.get(),
    backgroundColor: 'lightgray',
    marginVertical: 10,
    marginHorizontal: 10,
  },
})

export default function(props) {
  const { checkSpotifyAuth, disconnectSpotifyRemote } = props
  // useFocusEffect(() => {
  //   checkSpotifyAuth()
  //   return disconnectSpotifyRemote
  // })
  return <Home {...props} />
}
