import { connect } from 'react-redux'
import Search from '../components/Search'
import { searchReset, spotifySearchRequest } from '../actions'
import { albumsSelector, artistsSelector } from '../selectors'

const mapStateToProps = state => ({
  albums: albumsSelector(state),
  artists: artistsSelector(state),
})

const mapDispatchToProps = dispatch => ({
  search: (keywords, types, limit, offset) =>
    dispatch(spotifySearchRequest(keywords, types, limit, offset)),
  reset: () => dispatch(searchReset()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)
