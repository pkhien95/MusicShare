import React from 'react'
import { FlatList, PixelRatio, StyleSheet, View } from 'react-native'
import AlbumItem from './AlbumItem'
import NAVIGATORS from '../../../../constants/navigators'
import { useNavigation } from '@react-navigation/native'

type AlbumsSectionProps = {
  data: any[],
}

class AlbumsSection extends React.PureComponent<AlbumsSectionProps> {
  renderItem = ({ item, index }) => {
    const { id, images, name } = item
    const image = images && images.length > 2 ? images[2] : images[0]

    const itemData = { id, name, image }
    return <AlbumItem item={itemData} onItemPress={this.onItemPress} />
  }

  keyExtractor = (item, index) => {
    return item.id || index.toString()
  }

  renderItemSeparator = () => {
    return <View style={styles.divider} />
  }

  onItemPress = (id: string) => {
    this.props.navigation.navigate(NAVIGATORS.albumDetails, { id })
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
        keyboardShouldPersistTaps={'always'}
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

export default function(props) {
  const navigation = useNavigation()

  return <AlbumsSection {...props} navigation={navigation} />
}
