import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../config/colors";

function StyledInput({ placeholder }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text}
        placeholder={placeholder}
        placeholderTextColor={colors.light}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 30,
    backgroundColor: colors.darkgrey,
    borderRadius: 25,
    width: "90%",
    height: 70,
  },
  text: {
    color: "white",
    width: "100%",
  },
});

export default StyledInput;
