import React, { Component } from "react";
import { View, Animated, Platform, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const DOT_RADIUS = 6;
const DOT_MARGINE = 6;

class PageControlAji extends Component {
  translateX = new Animated.Value(0);
  animationDuration = Platform.OS == "ios" ? this.props.animationDuration : 0;

  componentDidMount() {
    this.updatePageControl(0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
      this.updatePageControl();
    }
  }

  render() {
    const {
      style,
      numberOfPages,
      radius,
      margin,
      inactiveTransparency,
      inactiveBorderColor,
      inactiveTintColor,
      activeTintColor,
      hidesForSinglePage
    } = this.props;

    const pages = Array.from(Array(numberOfPages).keys());

    return (
      <View style={style}>
        {(numberOfPages > 1 || !hidesForSinglePage) && (
          <View style={{ flexDirection: "row" }}>
            {pages.map(index => (
              <View
                key={index}
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  marginEnd: index === pages.length - 1 ? 0 : margin,
                  borderRadius: radius,
                  opacity: inactiveTransparency,
                  backgroundColor: inactiveTintColor,
                  borderColor: inactiveBorderColor || inactiveTintColor,
                  borderWidth: 1
                }}
              />
            ))}

            <Animated.View
              style={{
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
                position: "absolute",
                opacity: 1,
                backgroundColor: activeTintColor,
                transform: [{ translateX: this.translateX }]
              }}
            />
          </View>
        )}
      </View>
    );
  }

  updatePageControl(duration = this.animationDuration) {
    const newTranslateX = this.getActiveDotTranslateX();
    this.animateActiveDotTranslateX(newTranslateX, duration);
  }

  getActiveDotTranslateX() {
    const { progress, numberOfPages, radius, margin } = this.props;
    const width = (numberOfPages - 1) * (radius * 2) + (numberOfPages - 1) * margin;

    if (progress <= 0) {
      return 0;
    } else if (progress >= 1) {
      return width;
    } else {
      return width * progress;
    }
  }

  animateActiveDotTranslateX(value, duration) {
    if (isNaN(value)) return;

    Animated.timing(this.translateX, {
      toValue: value,
      duration: duration,
      useNativeDriver: true
    }).start();
  }
}

PageControlAji.propTypes = {
  style: ViewPropTypes.style,
  numberOfPages: PropTypes.number.isRequired,
  progress: PropTypes.number,
  animationDuration: PropTypes.number,
  radius: PropTypes.number,
  margin: PropTypes.number,
  inactiveTransparency: PropTypes.number,
  inactiveBorderColor: PropTypes.string,
  inactiveTintColor: PropTypes.string,
  activeTintColor: PropTypes.string,
  hidesForSinglePage: PropTypes.bool
};

PageControlAji.defaultProps = {
  numberOfPages: 0,
  progress: 0,
  animationDuration: 50,
  radius: DOT_RADIUS,
  margin: DOT_MARGINE,
  inactiveTransparency: 0.4,
  inactiveTintColor: "black",
  activeTintColor: "black",
  hidesForSinglePage: true
};

export default PageControlAji;
