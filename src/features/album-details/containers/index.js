import { connect } from 'react-redux'
import AlbumDetails from '../components/AlbumDetails'
import { getAlbumDetailsRequest } from '../actions'
import {
  albumSelector,
  artistsSelector,
  tracksSelector,
  appleArtistsSelector,
  appleTrackSelector,
} from '../selectors'
import { showBottomActionSheet } from '../../bottom-actions-sheet/actions'
import * as HomeActions from '../../home/actions'
import { showToast } from '../../toast/actions'
import { SOURCE } from '../../../constants'

const mapStateToProps = (state, ownProps) => {
  return {
    album: albumSelector(state, ownProps),
    artists:
      state.app.source === SOURCE.appleMusic
        ? appleArtistsSelector(state, ownProps)
        : artistsSelector(state, ownProps),
    tracks:
      state.app.source === SOURCE.appleMusic
        ? appleTrackSelector(state, ownProps)
        : tracksSelector(state, ownProps),
  }
}

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
