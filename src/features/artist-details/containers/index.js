import { connect } from 'react-redux'
import ArtistDetails from '../components/ArtistDetails'
import { getArtistTopTracksRequest } from '../actions'
import {
  artistSelector,
  tracksSelector,
  appleTrackSelector,
} from '../selectors'
import { showBottomActionSheet } from '../../bottom-actions-sheet/actions'
import { showToast } from '../../toast/actions'
import { SOURCE } from '../../../constants'

const mapStateToProps = (state, ownProps) => ({
  artist: artistSelector(state, ownProps),
  tracks: tracksSelector(state, ownProps),
})

const mapDispatchToProps = dispatch => ({
  getArtistTopTracks: (id: string) => dispatch(getArtistTopTracksRequest(id)),
  showBottomActionSheet: (actions: Array<any>) =>
    dispatch(showBottomActionSheet(actions)),
  showToast: (toastType: string, message: string) =>
    dispatch(showToast(toastType, message)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistDetails)
