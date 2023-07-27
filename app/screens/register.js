import React from "react";
import { StyleSheet, View } from "react-native";

import StyledButton from "../components/button";
import StyledInput from "../components/input";
import StyledText from "../components/text";
import Separator from "../components/separator";
import Link from "../components/link";

import colors from "../config/colors";

function RegiserScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <StyledText size={30}>Create new account</StyledText>
        <Separator top={15} />
        <StyledText color={colors.light} size={13}>
          Please fill in the form to continue
        </StyledText>
      </View>
      <View style={styles.registerContainer}>
        <StyledInput placeholder="Full Name" />
        <Separator top={15} />
        <StyledInput placeholder="Email Address" />
        <Separator top={15} />
        <StyledInput placeholder="Phone Number" />
        <Separator top={15} />
        <StyledInput placeholder="Pasword" />
      </View>
      <View style={styles.signContainer}>
        <StyledButton title="Sign Up" font="opensans" />
        <Separator top={15} />
        <View style={styles.linkContainer}>
          <StyledText color={colors.light} size={14}>
            Have an account?
          </StyledText>
          <Link
            title=" Sign In"
            size={14}
            color={colors.secondary}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mediumdark,
  },
  registerContainer: {
    position: "absolute",
    top: "26%",
    width: "100%",
    alignItems: "center",
  },
  linkContainer: {
    flexDirection: "row",
  },
  signContainer: {
    position: "absolute",
    bottom: "6%",
    width: "100%",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    top: "10%",
  },
});

export default RegiserScreen;
