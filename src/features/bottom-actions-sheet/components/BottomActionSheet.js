import React from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import COLORS from '../../../theme/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { isEmpty } from 'lodash'

type BottomActionSheetProps = {
  isShowing: boolean,
  actions: Array<any>,
  hide: () => void,
  handleAfterAction: (type: string, payload: any) => void,
}

class BottomActionSheet extends React.Component<BottomActionSheetProps> {
  onActionPress = action => {
    const { hide, handleAfterAction } = this.props
    hide()
    if (!isEmpty(action.afterAction)) {
      const {
        afterAction: { type, payload },
      } = action
      handleAfterAction(type, payload)
    }
  }

  onOverlayPress = () => {
    this.props.hide()
  }

  renderActionIcon = (icon, renderIcon) => {
    if (!icon && !renderIcon) {
      return null
    }

    return renderIcon ? (
      renderIcon()
    ) : (
      <Ionicons name={icon} size={20} color={COLORS.black} />
    )
  }

  renderActionText = (text, renderText) => {
    if (!text && !renderText) {
      return null
    }

    return renderText ? (
      renderText()
    ) : (
      <Text style={styles.actionText} numberOfLines={1}>
        {text}
      </Text>
    )
  }

  renderActions = (actions: Array<any>) => {
    return actions.map((action, index) => {
      const { icon, text, renderIcon, renderText } = action
      return (
        <TouchableHighlight
          style={styles.actionTouchable}
          key={index.toString()}
          underlayColor={COLORS.lightGrey}
          onPress={() => this.onActionPress(action)}>
          <View style={styles.actionContainer}>
            {this.renderActionIcon(icon, renderIcon)}
            {this.renderActionText(text, renderText)}
          </View>
        </TouchableHighlight>
      )
    })
  }

  render() {
    const { isShowing, actions } = this.props

    return (
      <Modal
        style={styles.modal}
        visible={isShowing}
        transparent={true}
        animationType={'fade'}>
        <TouchableWithoutFeedback
          style={[styles.containerTouchable]}
          onPress={this.onOverlayPress}>
          <View style={[styles.container, styles.overlay]}>
            <View style={styles.actionsContainer}>
              {this.renderActions(actions)}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  containerTouchable: {
    flex: 1,
  },
  container: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    flex: 1,
  },
  overlay: {
    backgroundColor: COLORS.overlay,
  },
  actionContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  actionsContainer: {
    backgroundColor: COLORS.white,
    paddingBottom: 20,
  },
  actionText: {
    marginLeft: 10,
    color: COLORS.black,
    fontWeight: '600',
  },
  actionTouchable: {
    alignItems: 'stretch',
  },
})

export default BottomActionSheet
