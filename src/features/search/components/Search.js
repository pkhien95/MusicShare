import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SearchBar from './SearchBar'
import { debounce, isEmpty } from 'lodash'
import ArtistSection from './ArtistsSection/ArtistSection'
import AlbumsSection from './AlbumsSection/AlbumsSection'
import { StackNavigationProp } from '@react-navigation/stack'
import NAVIGATORS from '../../../constants/navigators'
import LottieView from 'lottie-react-native'
import { SOURCE } from '../../../constants'

type SearchProps = {
  navigation: StackNavigationProp<any, NAVIGATORS.search>,
  search: (
    keywords: string,
    types: string,
    limit: number,
    offset: number,
  ) => void,
  albums: any[],
  artists: any[],
  reset: () => void,
}

type State = {
  isSearching: boolean,
}

class Search extends React.Component<SearchProps, State> {
  constructor() {
    super()

    this.debouncedSearchByKeywords = debounce(this.searchByKeywords, 300, {
      trailing: true,
    })
    this.searchText = ''

    this.state = {
      isSearching: false,
      source: SOURCE.spotify,
    }
  }

  searchByKeywords = (text: string) => {
    this.props.search(text)
  }

  onSearchTextChange = (text: string) => {
    this.searchText = text
    if (isEmpty(text)) {
      this.props.reset()
      return
    }
    this.debouncedSearchByKeywords(text)
  }

  componentDidMount() {
    const { navigation, reset } = this.props
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: () => null,
      headerTitle: () => <SearchBar onTextChange={this.onSearchTextChange} />,
    })
    reset()
  }

  renderLoadingView = () => {
    return null
  }

  renderPlaceholderView = () => {
    return (
      <LottieView
        source={require('../../../assets/animations/search.json')}
        autoPlay
        loop
      />
    )
  }

  renderNoResultView = () => {
    return (
      <View style={styles.noResultContainer}>
        <Text style={styles.noResultText}>No result.</Text>
      </View>
    )
  }

  render() {
    const { albums, artists } = this.props
    const { isSearching } = this.state

    if (isSearching) {
      return this.renderLoadingView()
    }

    if (!isSearching && isEmpty(this.searchText)) {
      return this.renderPlaceholderView()
    }

    if (!isSearching && isEmpty(artists) && isEmpty(albums)) {
      return this.renderNoResultView()
    }

    return (
      <View style={styles.container}>
        {!isEmpty(artists) && <ArtistSection data={artists} />}
        <AlbumsSection data={albums} />
      </View>
    )
  }
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  noResultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultText: {
    fontSize: 16,
  },
})
