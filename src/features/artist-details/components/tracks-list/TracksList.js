import React from 'react'
import { FlatList, PixelRatio, StyleSheet, View } from 'react-native'
import TrackItem from './TrackItem'
import { ToastType } from '../../../toast/constants'
import { addNewTrackRequest } from '../../../home/actions'

type TracksListProps = {
  data: any[],
  showBottomActionSheet: (actions: Array<any>) => void,
  showToast: (toastType: string, message: string) => void,
}

class TracksList extends React.PureComponent<TracksListProps> {
  renderItem = ({ item, index }) => {
    const { id, name, artists } = item
    const itemData = { id, name, artists }
    return (
      <TrackItem
        item={itemData}
        onItemPress={this.onItemPress}
        onTrackPlayPress={this.onTrackPlayPress}
        onTrackViewMorePress={this.onTrackViewMorePress}
      />
    )
  }

  keyExtractor = (item, index) => {
    return item.id || index.toString()
  }

  renderItemSeparator = () => {
    return <View style={styles.divider} />
  }

  onItemPress = (id: string) => {}

  onTrackPlayPress = (id: string) => {}

  onTrackViewMorePress = (id: string) => {
    const { showBottomActionSheet, showToast } = this.props
    const actions = [
      {
        icon: 'md-add',
        text: 'Add to my list',
        afterAction: addNewTrackRequest(id),
      },
    ]

    showToast(ToastType.INFO, 'Added to my list successfully.')
    showBottomActionSheet(actions)
  }

  render() {
    const { data } = this.props

    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        style={styles.list}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ItemSeparatorComponent={this.renderItemSeparator}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
  container: {
    paddingVertical: 15,
    alignItems: 'stretch',
  },
  divider: {
    height: 1 / PixelRatio.get(),
    backgroundColor: 'lightgray',
    marginVertical: 10,
    marginHorizontal: 10,
  },
})

export default TracksList
