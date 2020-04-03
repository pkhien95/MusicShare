import React, { useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import type { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheet'
import Ionicons from 'react-native-vector-icons/Ionicons'
import COLORS from '../../../theme/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { isEmpty } from 'lodash'

type SearchBarProps = {
  containerStyle?: ViewStyle<View>,
  inputStyle?: ViewStyle<View>,
  onTextChange: (text: string) => void,
}

const { width: SCREEN_WIDTH } = Dimensions.get('screen')
const MARGIN_HORIZONTAL = 15

const SearchBar = (props: SearchBarProps) => {
  const [value, setValue] = useState('')

  const onChangeText = (text: string) => {
    setValue(text)
    props.onTextChange(text)
  }

  const onClearButtonPress = () => {
    setValue('')
    props.onTextChange('')
  }

  const { containerStyle, inputStyle, ...rest } = props
  return (
    <View style={[styles.container, containerStyle]}>
      <Ionicons name={'ios-search'} color={COLORS.black} size={20} />
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        autoFocus={true}
        placeholder={'Search for albums or artists'}
        {...rest}
      />
      {!isEmpty(value) && (
        <TouchableOpacity
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          onPress={onClearButtonPress}>
          <MaterialIcons name={'clear'} color={COLORS.black} size={20} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '80%',
    borderRadius: 20,
    width: SCREEN_WIDTH - MARGIN_HORIZONTAL * 2,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
})

export default SearchBar
