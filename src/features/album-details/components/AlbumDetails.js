import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import COLORS from '../../../theme/colors'
import { getArtistsNamesFromList } from '../../../utils'
import { StackNavigationProp } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TracksList from './tracks-list/TracksList'
import { addNewAlbumRequest } from '../../home/actions'

type AlbumDetailsProps = {
  route: RouteProp,
  navigation: StackNavigationProp,
  getAlbumDetails: (id: string) => void,
  album: any,
  artists: Array<any>,
  tracks: Array<any>,
  showBottomActionSheet: (actions: Array<any>) => void,
}

class AlbumDetails extends React.Component<AlbumDetailsProps> {
  componentDidMount() {
    const { getAlbumDetails, route } = this.props
    getAlbumDetails(route.params.id)
  }

  onHeaderBackButtonPress = () => {
    this.props.navigation.goBack()
  }

  onHeaderMoreButtonPress = () => {
    const { showBottomActionSheet, route } = this.props

    const actions = [
      {
        icon: 'md-add',
        text: 'Add to my list',
        afterAction: addNewAlbumRequest(route.params.id),
      },
    ]

    showBottomActionSheet(actions)
  }

  renderScreenHeader = () => {
    const buttonHitSlop = { top: 12, right: 12, bottom: 12, left: 12 }
    return (
      <View style={styles.screenHeader}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={this.onHeaderBackButtonPress}
          hitSlop={buttonHitSlop}>
          <Ionicons name={'ios-arrow-back'} size={20} color={COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerMoreButton}
          onPress={this.onHeaderMoreButtonPress}
          hitSlop={buttonHitSlop}>
          <Ionicons name={'ios-more'} size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const {
      album,
      artists,
      tracks,
      showBottomActionSheet,
    } = this.props
    const { images, name } = album

    const imageSource = !isEmpty(images)
      ? { url: images[0].url }
      : require('../../../assets/images/album.png')
    const albumArtistsText = `by ${getArtistsNamesFromList(artists)}`

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={imageSource} style={styles.albumImage} />
          <Text style={styles.albumNameText}>{name}</Text>
          <Text style={styles.albumArtistsText}>{albumArtistsText}</Text>
        </View>
        <TracksList
          data={tracks}
          showBottomActionSheet={showBottomActionSheet}
        />
        {this.renderScreenHeader()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: COLORS.white,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
  },
  albumImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  albumNameText: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
  },
  albumArtistsText: {
    fontSize: 16,
    color: COLORS.lightGrey,
  },
  screenHeader: {
    width: '100%',
    position: 'absolute',
    top: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  headerBackButton: {},
  headerMoreButton: {},
})

export default AlbumDetails
