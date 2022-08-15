import React from "react";
import { Image, TouchableOpacity } from "react-native";

function Card({ width, height, radius, image, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Image
        resizeMode="stretch"
        source={{ uri: image }}
        style={{ width: width, height: height, borderRadius: radius }}
      />
    </TouchableOpacity>
  );
}

export default Card;
