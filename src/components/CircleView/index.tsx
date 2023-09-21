import React from "react";
import { Dimensions, View, Text } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

interface CircleViewProps {
  item: string;
  index: number;
  scrollX: Animated.SharedValue<number>;
}

const SIZE = width * 0.6;

export const CircleView = ({ item, index, scrollX }: CircleViewProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const backgroundContainerAnimatedStyle = useAnimatedStyle(() => {
    // Possivelmente dê para alterar a lógica para usar o index, mas estou com sono agora, vou dormir.
    const inputRange = [0, width, 2 * width, 3 * width, 4 * width];
    const outputRange = ["#89CFF0", "#7FFFD4", "#E6E6FA", "#FFE5B4", "#FFB6C1"];

    return {
      backgroundColor: interpolateColor(scrollX.value, inputRange, outputRange),
    };
  });

  const backgroundCircleAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [0, width, 2 * width, 3 * width, 4 * width];

    const outputRange = ["#6CAFE3", "#66CDA9", "#B19CD9", "#FFCC99", "#FFA5B5"];

    return {
      backgroundColor: interpolateColor(scrollX.value, inputRange, outputRange),
    };
  });

  const scaleAnimatedStyle = useAnimatedStyle(() => {
    const outputRange = [0, 1, 0];

    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const borderRadiusAnimatedStyle = useAnimatedStyle(() => {
    const outputRange = [0, SIZE / 2, 0];

    return {
      borderRadius: interpolate(
        scrollX.value,
        inputRange,
        outputRange,
        Extrapolate.CLAMP
      ),
    };
  });

  const opacityAnimatedStyle = useAnimatedStyle(() => {
    const outputRange = [0, 1, 0];

    return {
      opacity: interpolate(
        scrollX.value,
        inputRange,
        outputRange,
        Extrapolate.CLAMP
      ),
    };
  });

  const translateYAnimatedStyle = useAnimatedStyle(() => {
    const outputRange = [width / 2, 0, -width / 2];

    return {
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        backgroundContainerAnimatedStyle,
        {
          flex: 1,
          width,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Animated.View
        style={[
          borderRadiusAnimatedStyle,
          opacityAnimatedStyle,
          scaleAnimatedStyle,
          backgroundCircleAnimatedStyle,
          {
            width: SIZE,
            height: SIZE,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Animated.Text
          style={[
            translateYAnimatedStyle,
            {
              textTransform: "uppercase",
              fontSize: 32,
              fontWeight: "bold",
              color: "#fff",
            },
          ]}
        >
          {item}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};
