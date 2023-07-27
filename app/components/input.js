import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import Icon from "./icon";
import { AntDesign } from "@expo/vector-icons";
import Separator from "./separator";

function StyledInput({
  placeholder,
  textColor = "white",
  value,
  onChange,
  onFinish,
  width = "90%",
  icon,
  iconSize = 25,
  iconColor = "white",
  iconPress,
  radius = 25,
}) {
  return (
    <View style={[styles.container, { borderRadius: radius, width: width }]}>
      <TextInput
        onChangeText={onChange}
        onEndEditing={onFinish}
        value={value}
        style={{ width: "77%", color: textColor }}
        placeholder={placeholder}
        placeholderTextColor={textColor}
      />
      <Separator right={10} />
      {icon && (
        <TouchableOpacity onPress={iconPress}>
          <AntDesign name={icon} size={iconSize} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 30,
    backgroundColor: colors.darkgrey,
    height: 70,
  },
});

export default StyledInput;
