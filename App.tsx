import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ViewToken,
  FlatListComponent,
} from "react-native";

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedRef,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

import { CircleView } from "./src/components/CircleView";
import { Dots } from "./src/components/Dots";

const data = ["This", "Is", "My", "Onboarding", "Jaia.Dev 🤌🏼"];

const { width, height } = Dimensions.get("screen");

export default function App() {
  const scrollX = useSharedValue(0);
  const flatListRef = useAnimatedRef<FlatList>();
  const flatListIndex = useSharedValue(0);

  const handleOnScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const handleScrollToNext = () => {
    const ITEMS_SIZE = data.length - 1;
    if (flatListIndex.value < ITEMS_SIZE)
      flatListRef.current.scrollToIndex({
        index: flatListIndex.value + 1,
      });
  };

  const renderItem = ({ item, index }) => {
    return <CircleView item={item} index={index} scrollX={scrollX} />;
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        horizontal
        ref={flatListRef}
        onViewableItemsChanged={onViewableItemsChanged}
        data={data}
        renderItem={renderItem}
        onScroll={handleOnScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        pagingEnabled
      />
      <View
        style={{
          position: "absolute",
          width,
          justifyContent: "center",
          alignItems: "center",
          bottom: height * 0.1,
          gap: 40,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 12,
          }}
        >
          {data.map((_, index) => {
            return <Dots index={index} scrollX={scrollX} key={index} />;
          })}
        </View>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            borderRadius: 30,
          }}
          onPress={handleScrollToNext}
        >
          <Feather name="arrow-right" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#65bfff",
  },
});
