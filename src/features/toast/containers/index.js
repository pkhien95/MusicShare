import { connect } from 'react-redux'
import { hideToast } from '../actions'
import Toast from '../components/Toast'

const mapStateToProps = state => {
  const { isShowing, type, message } = state.toast

  return {
    isShowing,
    type,
    message,
  }
}

const mapDispatchToProps = dispatch => ({
  hideToast: () => dispatch(hideToast()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toast)
