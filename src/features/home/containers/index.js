import Home from '../ components/Home'
import { connect } from 'react-redux'
import { itemSelector } from '../selectors'
import {
  checkSpotifyAuth,
  disconnectSpotifyRemote,
} from '../../../sagas/actions'

const mapStateToProps = state => ({
  items: itemSelector(state),
})

const mapDispatchToProps = dispatch => ({
  checkSpotifyAuth: () => dispatch(checkSpotifyAuth()),
  disconnectSpotifyRemote: () => dispatch(disconnectSpotifyRemote()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
