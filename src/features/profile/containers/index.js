import { connect } from 'react-redux'
import Profile from '../components/Profile'
import { selectSource } from '../actions'

const mapStateToProps = state => ({
  source: state.app.source,
})

const mapDispatchToProps = dispatch => ({
  selectSource: source => dispatch(selectSource(source)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)
