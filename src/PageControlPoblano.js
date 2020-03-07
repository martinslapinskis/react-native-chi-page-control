import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Platform, ViewPropTypes } from 'react-native';

const DOT_RADIUS = 8;
const DOT_MARGINE = 6;
const MIDDLE_EXTRA_HIGHT = 4;
const ANIMATION_DURATION = Platform.OS == 'ios' ? 50 : 0;

class PageControlPoblano extends Component {

  translateX = new Animated.Value(0);

  componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
        const newTranslateX  = this.getDotViewTranslateX();
        this.animateDotViewTranslateX(newTranslateX);
    }
  };

  render(){
    const {
      style,
      numberOfPages,
      radius,
      margin,
      transparency,
      tintColor,
      inactiveBorderColor,
      hidesForSinglePage,
    } = this.props;

    const pages = Array.from(Array(numberOfPages).keys());
    const halfPageControlWidth = (((numberOfPages - 1) * (radius * 2)) + ((numberOfPages - 1) * margin)) / 2

    return (
      <View style={[style, {left: halfPageControlWidth}]}>
        { 
          numberOfPages <= 1 && hidesForSinglePage ? (
            null
          ) : (
            <View>
              <Animated.View style={[{flexDirection: 'row', transform: [{translateX: this.translateX}]}]}>
                {
                  pages.map((index) => 
                    <View
                      key={index}
                      style={{
                        width: radius * 2,
                        height: radius * 2,
                        marginRight: margin,
                        borderRadius: radius,
                        opacity: transparency,
                        backgroundColor: tintColor,
                      }}
                    />
                  )
                }
              </Animated.View>

              <View style={{
                top: -MIDDLE_EXTRA_HIGHT,
                left: -MIDDLE_EXTRA_HIGHT,
                width: (radius + MIDDLE_EXTRA_HIGHT) * 2,
                height: (radius + MIDDLE_EXTRA_HIGHT) * 2,
                borderRadius: radius + MIDDLE_EXTRA_HIGHT,
                borderWidth: 2,
                borderColor: inactiveBorderColor,
                position: 'absolute',
                opacity: 1,
              }}/>
            </View>
          )
        }
      </View>
    )
  };

  getDotViewTranslateX() {
    const { progress, numberOfPages, radius, margin } = this.props;
    const width = ((numberOfPages - 1) * (radius * 2)) + ((numberOfPages - 1) * margin);
      
    if (progress <= 0) {
      return 0;
    } else if (progress >= 1) {
      return -width;
    } else {
      return -width * progress;
    }
  };

  animateDotViewTranslateX(value) {
    Animated.timing(this.translateX, {
      toValue: value,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,      
    }).start();
  }
  
};

PageControlPoblano.propTypes = {
  style: ViewPropTypes.style,
  numberOfPages: PropTypes.number.isRequired,
  progress: PropTypes.number,
  radius: PropTypes.number,
  margin: PropTypes.number,
  transparency: PropTypes.number,
  tintColor: PropTypes.string,
  inactiveBorderColor: PropTypes.string,
  hidesForSinglePage: PropTypes.bool,
};

PageControlPoblano.defaultProps = {
  numberOfPages: 0,
  progress: 0,
  radius: DOT_RADIUS,
  margin: DOT_MARGINE,
  transparency: 1,
  tintColor: 'black',
  inactiveBorderColor: 'black',
  hidesForSinglePage: true
};

export default PageControlPoblano;