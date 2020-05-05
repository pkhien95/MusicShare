import React, { Component } from 'react'
import { FlatList, PixelRatio, StyleSheet, View } from 'react-native'
import HomeItem from './HomeItem'
import { remote } from 'react-native-spotify-remote'
import { useFocusEffect } from '@react-navigation/native'

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
      trackIsPlaying: null,
    }
  }

  onPlay = (item: any) => {
    const { id, uri } = item
    this.setState({
      trackIsPlaying: id,
    })
    remote.playUri(uri)
  }

  onPause = () => {
    remote.pause()
    this.setState({
      trackIsPlaying: null,
    })
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
