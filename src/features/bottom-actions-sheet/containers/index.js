import { connect } from 'react-redux'
import BottomActionSheet from '../components/BottomActionSheet'
import * as Actions from '../actions'

const mapStateToProps = state => {
  const { isShowing, actions } = state.bottomActionSheet

  return {
    isShowing,
    actions,
  }
}

const mapDispatchToProps = dispatch => ({
  show: (actions: Array<any>) =>
    dispatch(Actions.showBottomActionSheet(actions)),
  hide: () => dispatch(Actions.hideBottomActionSheet()),
  handleAfterAction: (type: string, payload: any) =>
    dispatch({ type, payload }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomActionSheet)
