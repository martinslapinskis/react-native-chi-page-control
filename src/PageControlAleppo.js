import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Platform, ViewPropTypes } from 'react-native';

const DOT_RADIUS = 6;
const DOT_MARGINE = 6;
const ANIMATION_DURATION = Platform.OS == 'ios' ? 50 : 0;

class PageControlAleppo extends Component {

  translateX = new Animated.Value(0);
  width = new Animated.Value(DOT_RADIUS * 2);

  componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
        this.updateActiveDotTranslateX();
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
                width: this.width,
                height: radius * 2,
                marginRight: margin,
                borderRadius: radius,
                position: 'absolute',
                opacity: 1,
                backgroundColor: inactiveTintColor,
                transform: [{translateX: this.translateX}]
              }}/>
            </View>
          )
        }
      </View>
    )
  };

  updateActiveDotTranslateX() {
    const { progress, numberOfPages, radius, margin } = this.props;
    const width = ((numberOfPages - 1) * (radius * 2)) + ((numberOfPages - 1) * margin);
    const step = 1 / (numberOfPages - 1);
    const halfStep = step / 2;
    let translateX = 0;
    let newWidth = 0;
    let extraWidthConst = 0;

    if (progress < 0 || progress > 1) {
      extraWidthConst = 0
    } else if ((progress % step) > halfStep) {
      extraWidthConst = (halfStep - ((progress % step) - halfStep)) * (numberOfPages + 1)
    } else {
      extraWidthConst = (progress % halfStep) * (numberOfPages + 1)
    }

    newWidth = (DOT_RADIUS * 2) + ((DOT_RADIUS * 2) * extraWidthConst)

    if (progress <= 0) {
      translateX = 0;
    } else if (progress >= 1) {
      translateX = width;
    } else {
      translateX = width * progress - (((DOT_RADIUS * 2) * extraWidthConst) / 2);
    }

    Animated.parallel([
      Animated.timing(this.translateX, {
        toValue: translateX,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.width, {
        toValue: newWidth,
        duration: ANIMATION_DURATION,
      })
    ]).start();
  };
  
};

PageControlAleppo.propTypes = {
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

PageControlAleppo.defaultProps = {
  numberOfPages: 0,
  progress: 0,
  radius: DOT_RADIUS,
  margin: DOT_MARGINE,
  inactiveTransparency: 0.4,
  inactiveTintColor: 'black',
  tintColor: 'black',
  hidesForSinglePage: true
};

export default PageControlAleppo;