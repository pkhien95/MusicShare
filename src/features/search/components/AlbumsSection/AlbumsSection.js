import React from 'react'
import { FlatList, PixelRatio, StyleSheet, View } from 'react-native'
import AlbumItem from './AlbumItem'

type AlbumsSectionProps = {
  data: any[],
}

class AlbumsSection extends React.PureComponent<AlbumsSectionProps> {
  renderItem = ({ item, index }) => {
    const { images, name } = item
    const itemData = { name, image: images[2] }
    return <AlbumItem item={itemData} />
  }

  keyExtractor = (item, index) => {
    return item.id || index.toString()
  }

  renderItemSeparator = () => {
    return <View style={styles.divider} />
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

export default AlbumsSection
