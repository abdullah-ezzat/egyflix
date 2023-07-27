import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import StyledText from "./text";
import colors from "../config/colors";
import Icon from "./icon";
import Separator from "./separator";

function DetailedBadge({
  bgColor,
  width,
  height,
  radius,
  title,
  subTitle,
  subTitleColor = colors.light,
  subTitleSize,
  opacity = 0.5,
  icon,
  iconAnt,
  iconColor,
  iconSize,
  color = colors.light,
  borderColor,
  borderWidth,
  padding,
  size,
  weight = "100",
  font,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          borderRadius: radius,
          borderColor: borderColor,
          borderWidth: borderWidth,
          width: width,
          height: height,
          padding: padding,
        },
      ]}
      onPress={onPress}
      activeOpacity={opacity}
    >
      {icon && (
        <>
          <Icon name={icon} size={iconSize} color={iconColor} />
          {title && <Separator top={5} />}
        </>
      )}
      {iconAnt && (
        <>
          <AntDesign name={iconAnt} size={iconSize} color={iconColor} />
          {title && <Separator top={5} />}
        </>
      )}

      {title && (
        <>
          <StyledText color={color} font={font} size={size} weight={weight}>
            {title}
          </StyledText>
          {title && <Separator top={1} />}
        </>
      )}
      {subTitle && (
        <StyledText
          color={subTitleColor}
          font={font}
          size={subTitleSize}
          weight={weight}
        >
          {subTitle}
        </StyledText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 7,
  },
});

export default DetailedBadge;
