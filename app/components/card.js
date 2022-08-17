import React from "react";
import { Image, TouchableOpacity } from "react-native";

function Card({ width, height, radius, image, onPress, padding }) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Image
        resizeMode="stretch"
        source={{ uri: image }}
        style={{
          width: width,
          height: height,
          borderRadius: radius,
          margin: padding,
        }}
      />
    </TouchableOpacity>
  );
}

export default Card;
