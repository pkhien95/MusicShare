import { connect } from 'react-redux'
import AlbumDetails from '../components/AlbumDetails'
import { getAlbumDetailsRequest } from '../actions'
import { albumSelector, artistsSelector, tracksSelector } from '../selectors'
import { showBottomActionSheet } from '../../bottom-actions-sheet/actions'

const mapStateToProps = (state, ownProps) => ({
  album: albumSelector(state, ownProps),
  artists: artistsSelector(state, ownProps),
  tracks: tracksSelector(state, ownProps),
})

const mapDispatchToProps = dispatch => ({
  getAlbumDetails: (id: string) => dispatch(getAlbumDetailsRequest(id)),
  showBottomActionSheet: (actions: Array<any>) =>
    dispatch(showBottomActionSheet(actions)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumDetails)
