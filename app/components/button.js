import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import StyledText from "./text";
import colors from "../config/colors";

function StyledButton({
  title,
  onPress,
  color = colors.primary,
  colorText = "white",
  radius = 25,
  width = "90%",
  height = 70,
  iconPadding,
  font,
  icon,
  imgIcon,
  imgWidth,
  imgHeight,
  iconColor = "black",
  iconSize = 17,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          paddingRight: icon ? 15 : 0,
          backgroundColor: color,
          borderRadius: radius,
          width: width,
          height: height,
        },
      ]}
      onPress={onPress}
    >
      {icon && (
        <MaterialCommunityIcons
          style={{ paddingRight: iconPadding }}
          name={icon}
          size={iconSize}
          color={iconColor}
        />
      )}
      {imgIcon && (
        <Image
          source={imgIcon}
          style={{ width: imgWidth, height: imgHeight, marginRight: 10 }}
        />
      )}
      <StyledText weight="400" color={colorText} font={font}>
        {title}
      </StyledText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default StyledButton;
