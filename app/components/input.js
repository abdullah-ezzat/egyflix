import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import Icon from "./icon";
import Separator from "./separator";

function StyledInput({
  placeholder,
  value,
  onChange,
  icon,
  iconSize = 25,
  iconColor = "white",
  iconPress,
  radius = 25,
}) {
  return (
    <View style={[styles.container, { borderRadius: radius }]}>
      <TextInput
        onChangeText={onChange}
        value={value}
        style={styles.text}
        placeholder={placeholder}
        placeholderTextColor={colors.light}
      />
      {icon && (
        <TouchableOpacity onPress={iconPress}>
          <Icon name={icon} size={iconSize} color={iconColor} />
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
    width: "90%",
    height: 70,
  },
  text: {
    color: "white",
    width: "85%",
  },
});

export default StyledInput;
