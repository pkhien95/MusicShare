import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ArtistItem from './ArtistItem'
import { useNavigation } from '@react-navigation/native'
import NAVIGATORS from '../../../../constants/navigators'

type ArtistSectionProps = {
  data: any[],
}

class ArtistSection extends React.PureComponent<ArtistSectionProps> {
  renderItem = ({ item, index }) => {
    const { id, images, name } = item
    const itemData = { id, name, image: images[2] }
    return <ArtistItem item={itemData} onItemPress={this.onItemPress} />
  }

  keyExtractor = (item, index) => {
    return item.id || index.toString()
  }

  onItemPress = (id: string) => {
    this.props.navigation.navigate(NAVIGATORS.artistDetails, { id })
  }

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
        keyboardShouldPersistTaps={'always'}
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

export default function(props) {
  const navigation = useNavigation()

  return <ArtistSection {...props} navigation={navigation} />
}
