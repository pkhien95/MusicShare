import Home from '../ components/Home'
import { connect } from 'react-redux'
import { itemSelector } from '../selectors'

const mapStateToProps = state => ({
  items: itemSelector(state),
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
