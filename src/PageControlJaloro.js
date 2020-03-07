import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Platform, ViewPropTypes } from 'react-native';

const ELEMENT_WIDTH = 15;
const ELEMENT_HEIGHT = 6;
const ELEMENT_MARGINE = 4;
const ANIMATION_DURATION = Platform.OS == 'ios' ? 50 : 0;

class PageControlJaloro extends Component {

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
      width,
      height,
      margin,
      borderRadius,
      inactiveTransparency,
      tintColor,
      inactiveTintColor,
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
                      width,
                      height,
                      marginRight: margin,
                      opacity: inactiveTransparency,
                      backgroundColor: tintColor,
                      borderRadius
                    }}
                  />
                )
              }

              <Animated.View style={{
                width,
                height,
                marginRight: margin,
                position: 'absolute',
                opacity: 1,
                backgroundColor: inactiveTintColor,
                borderRadius,
                transform: [{translateX: this.translateX}]
              }}/>
            </View>
          )
        }
      </View>
    )
  };

  getActiveDotTranslateX() {
    const { progress, numberOfPages, width, margin } = this.props;
    const fullWidth = ((numberOfPages - 1) * width) + ((numberOfPages - 1) * margin);

    if (progress <= 0) {
      return 0;
    } else if (progress >= 1) {
      return fullWidth;
    } else {
      return fullWidth * progress;
    }
  };

  animateActiveDotTranslateX(value) {
    Animated.timing(this.translateX, {
      toValue: value,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,      
    }).start();
  };
  
};

PageControlJaloro.propTypes = {
  style: ViewPropTypes.style,
  numberOfPages: PropTypes.number.isRequired,
  progress: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
  borderRadius: PropTypes.number,
  inactiveTransparency: PropTypes.number,
  inactiveTintColor: PropTypes.string,
  tintColor: PropTypes.string,
  hidesForSinglePage: PropTypes.bool,
};

PageControlJaloro.defaultProps = {
  numberOfPages: 0,
  progress: 0,
  width: ELEMENT_WIDTH,
  height: ELEMENT_HEIGHT,
  margin: ELEMENT_MARGINE,
  borderRadius: ELEMENT_HEIGHT / 2,
  inactiveTransparency: 0.4,
  inactiveTintColor: 'black',
  tintColor: 'black',
  hidesForSinglePage: true
};

export default PageControlJaloro;