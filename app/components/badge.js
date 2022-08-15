import React from "react";
import { TouchableOpacity } from "react-native";

import StyledText from "./text";
import colors from "../config/colors";

function Badge({
  bgColor,
  width,
  height,
  radius,
  name,
  color = colors.light,
  size,
  weight = "100",
  font,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor,
        borderRadius: radius,
        width: width,
        height: height,
      }}
      onPress={onPress}
    >
      <StyledText color={color} font={font} size={size} weight={weight}>
        {name}
      </StyledText>
    </TouchableOpacity>
  );
}

export default Badge;
