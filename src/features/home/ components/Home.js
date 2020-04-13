import React, { Component } from 'react'
import { FlatList, PixelRatio, StyleSheet, View } from 'react-native'
import HomeItem from './HomeItem'
import Sound from 'react-native-sound'

type HomeProps = {}

type HomeState = {
  trackIsPlaying: number | null,
}

class Home extends Component<HomeProps, HomeState> {
  constructor() {
    super()

    this.state = {
      trackIsPlaying: null,
    }

    this.sound = null
    Sound.setCategory('Playback', true)
  }

  onPlay = (item: any) => {
    const { id, preview_url } = item
    if (this.sound && this.sound.isPlaying) {
      this.sound.stop()
    }
    this.sound = new Sound(preview_url, null, error => {
      if (error) {
        return
      }

      this.setState({
        trackIsPlaying: id,
      })
      // play when loaded
      if (this.sound.isPlaying()) {
        this.sound.stop(() => {
          this.sound.play(success => {
            this.sound.release()
          })
        })
      } else {
        this.sound.play(success => {
          this.sound.release()
        })
      }
    })
  }

  onPause = () => {
    this.sound.pause(() => {
      this.setState({
        trackIsPlaying: null,
      })
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
          data={items}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparator}
          extraData={this.state.trackIsPlaying}
        />
      </View>
    )
  }
}
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
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
