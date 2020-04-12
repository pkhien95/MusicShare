import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import COLORS from '../../../theme/colors'
import { StackNavigationProp } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TracksList from './tracks-list/TracksList'
import { showToast } from '../../toast/actions'
import { ToastType } from '../../toast/constants'

type ArtistDetailsProps = {
  route: RouteProp,
  navigation: StackNavigationProp,
  getArtistTopTracks: (id: string) => void,
  album: any,
  artists: Array<any>,
  tracks: Array<any>,
  showBottomActionSheet: (actions: Array<any>) => void,
}

class ArtistDetails extends React.Component<ArtistDetailsProps> {
  componentDidMount() {
    const { getArtistTopTracks, route } = this.props
    getArtistTopTracks(route.params.id)
  }

  onHeaderBackButtonPress = () => {
    this.props.navigation.goBack()
  }

  onHeaderMoreButtonPress = () => {
    const actions = [
      {
        icon: 'md-add',
        text: 'Add to my list',
        afterAction: showToast(
          ToastType.INFO,
          'Added to my list successfully.',
        ),
      },
    ]
    this.props.showBottomActionSheet(actions)
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
    const { artist, tracks, showBottomActionSheet } = this.props
    const { images, name } = artist

    const imageSource = !isEmpty(images)
      ? { url: images[0].url }
      : require('../../../assets/images/album.png')
    const subTitle = `has ${tracks.length} tracks`

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={imageSource} style={styles.artistImage} />
          <Text style={styles.artistNameText}>{name}</Text>
          <Text style={styles.subTitleText}>{subTitle}</Text>
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
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  artistNameText: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
  },
  subTitleText: {
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

export default ArtistDetails
