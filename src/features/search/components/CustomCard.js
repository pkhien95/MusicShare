/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import { Image, Text } from 'react-native'

import {
  Body,
  Button,
  Card,
  CardItem,
  Icon,
  Left,
  Thumbnail,
} from 'native-base'

class CustomCard extends Component {
  render() {
    // const images = {
    //   '1': require('../../../assets/images/feed_images/1.jpg'),
    //   '2': require('../../../assets/images/feed_images/2.jpg'),
    //   '3': require('../../../assets/images/feed_images/3.png'),
    // }

    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={require('../../../assets/images/me.png')} />
            <Body>
              <Text>Varun </Text>
              <Text note>Jan 15, 2018</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{
              uri: 'https://open.spotify.com/artist/2JFiletIm3BQ5bhx19Vusf',
            }}
            style={{ height: 200, width: 200, flex: 1 }}
          />
        </CardItem>
        <CardItem style={{ height: 45 }}>
          <Left>
            <Button transparent>
              <Icon name="ios-heart" style={{ color: 'black' }} />
            </Button>
            <Button transparent>
              <Icon name="ios-chatbubbles" style={{ color: 'black' }} />
            </Button>
            <Button transparent>
              <Icon name="ios-send" style={{ color: 'black' }} />
            </Button>
          </Left>
        </CardItem>

        <CardItem style={{ height: 20 }}>
          <Text>{this.props.likes} </Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              <Text style={{ fontWeight: '900' }}>varun</Text>
              Ea do Lorem occaecat laborum do. Minim ullamco ipsum minim eiusmod
              dolore cupidatat magna exercitation amet proident qui. Est do
              irure magna dolor adipisicing do quis labore excepteur. Commodo
              veniam dolore cupidatat nulla consectetur do nostrud ea cupidatat
              ullamco labore. Consequat ullamco nulla ullamco minim.
            </Text>
          </Body>
        </CardItem>
      </Card>
    )
  }
}
export default CustomCard

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// })
