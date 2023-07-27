import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import StyledText from "./text";
import colors from "../config/colors";
import Icon from "./icon";
import Separator from "./separator";

function Badge({
  bgColor,
  width,
  height,
  radius,
  name,
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
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor,
        borderRadius: radius,
        borderColor: borderColor,
        borderWidth: borderWidth,
        width: width,
        height: height,
        padding: padding,
      }}
      onPress={onPress}
    >
      {icon && (
        <>
          <Icon name={icon} size={iconSize} color={iconColor} />
          {name && <Separator right={5} />}
        </>
      )}
      {iconAnt && (
        <>
          <AntDesign name={iconAnt} size={iconSize} color={iconColor} />
          {name && <Separator right={5} />}
        </>
      )}

      {name && (
        <StyledText color={color} font={font} size={size} weight={weight}>
          {name}
        </StyledText>
      )}
    </TouchableOpacity>
  );
}

export default Badge;
