import { connect } from 'react-redux'
import AlbumDetails from '../components/AlbumDetails'
import { getAlbumDetailsRequest } from '../actions'
import { albumSelector, artistsSelector, tracksSelector } from '../selectors'
import { showBottomActionSheet } from '../../bottom-actions-sheet/actions'
import * as HomeActions from '../../home/actions'
import { showToast } from '../../toast/actions'

const mapStateToProps = (state, ownProps) => ({
  album: albumSelector(state, ownProps),
  artists: artistsSelector(state, ownProps),
  tracks: tracksSelector(state, ownProps),
})

const mapDispatchToProps = dispatch => ({
  getAlbumDetails: (id: string) => dispatch(getAlbumDetailsRequest(id)),
  showBottomActionSheet: (actions: Array<any>) =>
    dispatch(showBottomActionSheet(actions)),
  showToast: (toastType: string, message: string) =>
    dispatch(showToast(toastType, message)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumDetails)
