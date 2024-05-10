import { View, Text, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { theme } from "../theme";

const { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View
      style={{ height, width }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail
        strokeCap="square"
        spinDuration={500}
        thickness={12}
        size={160}
        color={["#800080", "#944e87", , "#800080", "#d56cff"]}
      />
    </View>
  );
}
