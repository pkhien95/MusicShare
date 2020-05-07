import React from 'react'
import { StyleSheet, View } from 'react-native'
import RadioForm from 'react-native-simple-radio-button'

const source_from = [
  { label: 'Spotify', value: 'SPOTIFY' },
  { label: 'Apple Music', value: 'APPLE_MUSIC' },
]

type Props = {
  source: string,
  selectSource: value => void,
}

class Profile extends React.Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      selected: source_from.findIndex(source => source.value === props.source),
    }
  }

  selectSource = value => {
    const { selectSource } = this.props
    this.setState({ selected: value })
    selectSource(value)
  }

  render() {
    const { selected } = this.state
    return (
      <View style={styles.container}>
        <RadioForm
          radio_props={source_from}
          initial={selected}
          onPress={this.selectSource}
        />
      </View>
    )
  }
}
export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
