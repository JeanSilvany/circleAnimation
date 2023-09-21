import React from "react";
import { View, Text, Dimensions } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface DotsProps {
  index: number;
  scrollX: Animated.SharedValue<number>;
}

const { width } = Dimensions.get("screen");

export const Dots = ({ index, scrollX }: DotsProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const widthAnimatedStyle = useAnimatedStyle(() => {
    const outputRange = [10, 20, 10];

    return {
      width: interpolate(
        scrollX.value,
        inputRange,
        outputRange,
        Extrapolate.CLAMP
      ),
    };
  });

  const widthOpacityStyle = useAnimatedStyle(() => {
    const outputRange = [0.5, 1, 0.5];

    return {
      opacity: interpolate(
        scrollX.value,
        inputRange,
        outputRange,
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <Animated.View
      style={[
        widthAnimatedStyle,
        widthOpacityStyle,
        {
          width: 10,
          height: 10,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
        },
      ]}
    />
  );
};
