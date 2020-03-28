import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Swiper from 'react-native-swiper';
import {PageControlJaloro} from 'react-native-chi-page-control';

export default class SwiperEaxample extends Component {
  state = {
    progress: 0,
  };

  constructor(props) {
    super(props);

    this.onIndexChanged = this.onIndexChanged.bind(this);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Swiper
          style={styles.wrapper}
          showsPagination={false}
          loop={false}
          onIndexChanged={this.onIndexChanged}
        >
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>
        <View style={styles.pageControlView}>
          <PageControlJaloro
            progress={this.state.progress}
            numberOfPages={3}
            animationDuration={300}
          />
        </View>
      </View>
    );
  }

  onIndexChanged(index) {
    this.setState({progress: index / 2});
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  pageControlView: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: 50,
  },
});
