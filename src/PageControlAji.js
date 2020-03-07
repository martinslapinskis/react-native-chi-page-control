import React, { Component } from 'react';
import { View, Animated, Platform, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const DOT_RADIUS = 8;
const DOT_MARGINE = 6;
const ANIMATION_DURATION = Platform.OS == 'ios' ? 50 : 0;

class PageControlAji extends Component {

  translateX = new Animated.Value(0);

  componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
        const newTranslateX  = this.getActiveDotTranslateX();
        this.animateActiveDotTranslateX(newTranslateX);
    }
  };

  render(){
    const {
      style,
      numberOfPages,
      radius,
      margin,
      inactiveTransparency,
      inactiveBorderColor,
      inactiveTintColor,
      tintColor,
      hidesForSinglePage,
    } = this.props;

    const pages = Array.from(Array(numberOfPages).keys());

    return (
      <View style={style}>
        {
          numberOfPages <= 1 && hidesForSinglePage ? (
            null
          ) : (
            <View style={{flexDirection: 'row'}}>
              {
                pages.map((index) =>
                  <View
                    key={index}
                    style={{
                      width: radius * 2,
                      height: radius * 2,
                      marginRight: margin,
                      borderRadius: radius,
                      opacity: inactiveTransparency,
                      backgroundColor: tintColor,
                      borderColor: inactiveBorderColor || tintColor,
                      borderWidth: 1
                    }}
                  />
                )
              }

              <Animated.View style={{
                width: radius * 2,
                height: radius * 2,
                marginRight: margin,
                borderRadius: radius,
                position: 'absolute',
                opacity: 1,
                backgroundColor: inactiveTintColor,
                transform: [{translateX: this.translateX}]
              }}
              />
            </View>
          )
        }
      </View>
    )
  };

  getActiveDotTranslateX() {
    const { progress, numberOfPages, radius, margin } = this.props;
    const width = ((numberOfPages - 1) * (radius * 2)) + ((numberOfPages - 1) * margin);

    if (progress <= 0) {
      return 0;
    } else if (progress >= 1) {
      return width;
    } else {
      return width * progress;
    }
  };

  animateActiveDotTranslateX(value) {
    Animated.timing(this.translateX, {
      toValue: value,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,      
    }).start();
  }

};

PageControlAji.propTypes = {
  style: ViewPropTypes.style,
  numberOfPages: PropTypes.number.isRequired,
  progress: PropTypes.number,
  radius: PropTypes.number,
  margin: PropTypes.number,
  inactiveTransparency: PropTypes.number,
  inactiveBorderColor: PropTypes.string,
  inactiveTintColor: PropTypes.string,
  tintColor: PropTypes.string,
  hidesForSinglePage: PropTypes.bool,
};

PageControlAji.defaultProps = {
  numberOfPages: 0,
  progress: 0,
  radius: DOT_RADIUS,
  margin: DOT_MARGINE,
  inactiveTransparency: 0.4,
  inactiveTintColor: 'black',
  tintColor: 'black',
  hidesForSinglePage: true
};

export default PageControlAji;
