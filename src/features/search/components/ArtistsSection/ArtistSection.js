import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ArtistItem from './ArtistItem'

type ArtistSectionProps = {
  data: any[],
}

class ArtistSection extends React.PureComponent<ArtistSectionProps> {
  renderItem = ({ item, index }) => {
    const { images, name } = item
    const itemData = { name, image: images[2] }
    return <ArtistItem item={itemData} onItemPress={this.onItemPress} />
  }

  keyExtractor = (item, index) => {
    return item.id || index.toString()
  }

  onItemPress = (id: string) => {}

  render() {
    const { data } = this.props
    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        horizontal={true}
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    minHeight: '25%',
  },
  container: {
    paddingVertical: 15,
  },
})

export default ArtistSection
