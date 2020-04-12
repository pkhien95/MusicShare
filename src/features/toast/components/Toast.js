import React from 'react'
import { Animated, StyleSheet, Text } from 'react-native'
import {
  TOAST_ANIMATED_DURATION,
  TOAST_SHOW_TIME,
  ToastType,
} from '../constants/index'
import COLORS from '../../../theme/colors'

type Props = {
  isShowing: boolean,
  message: 'string',
  type: $Values<ToastType>,
  hideToast: Function,
}

class Toast extends React.PureComponent<Props> {
  animatedValue: *

  constructor(props: Props) {
    super(props)

    this.animatedValue = new Animated.Value(0)
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { isShowing: showingProps, hideToast } = this.props

    if (prevProps.isShowing !== showingProps && showingProps) {
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: TOAST_ANIMATED_DURATION,
      }).start()

      setTimeout(() => {
        Animated.timing(this.animatedValue, {
          toValue: 0,
          duration: TOAST_ANIMATED_DURATION,
        }).start(() => {
          hideToast()
        })
      }, TOAST_SHOW_TIME - TOAST_ANIMATED_DURATION)
    }
  }

  getBackgroundFromType = (type: $Values<ToastType>) => {
    switch (type) {
      case ToastType.INFO:
        return COLORS.grassyGreen
      case ToastType.ERROR:
        return COLORS.tomato
      default:
        return COLORS.grassyGreen
    }
  }

  render() {
    const { isShowing, message, type } = this.props

    if (!isShowing) {
      return null
    }

    const animatedStyle = { opacity: this.animatedValue }
    const textStyle = { backgroundColor: this.getBackgroundFromType(type) }

    return (
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={[styles.message, textStyle]}>{message}</Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    paddingVertical: 18,
    paddingHorizontal: 22,
    backgroundColor: 'red',
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
    borderRadius: 4,
    overflow: 'hidden',
  },
})

export default Toast
