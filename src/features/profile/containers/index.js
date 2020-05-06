import { connect } from 'react-redux'
import Profile from '../components/Profile'
import { selectSource } from '../actions'

const mapDispatchToProps = dispatch => ({
  selectSource: source => dispatch(selectSource(source)),
})

export default connect(
  null,
  mapDispatchToProps,
)(Profile)
