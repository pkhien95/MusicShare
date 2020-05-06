import { connect } from 'react-redux'
import Search from '../components/Search'
import { searchReset, searchRequest } from '../actions'
import { albumsSelector, artistsSelector, sourceSelector } from '../selectors'

const mapStateToProps = state => ({
  albums: albumsSelector(state),
  artists: artistsSelector(state),
  source: sourceSelector(state),
})

const mapDispatchToProps = dispatch => ({
  search: (source, keywords, types, limit, offset) =>
    dispatch(searchRequest(source, keywords, types, limit, offset)),
  reset: () => dispatch(searchReset()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)
