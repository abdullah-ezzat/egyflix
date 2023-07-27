import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import StyledButton from "../components/button";
import StyledInput from "../components/input";
import StyledText from "../components/text";
import Separator from "../components/separator";
import Link from "../components/link";

import colors from "../config/colors";

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <StyledText size={30}>Welcome Back!</StyledText>
        <Separator top={15} />
        <StyledText color={colors.light} size={13}>
          Please sign in to your account
        </StyledText>
      </View>
      <View style={styles.loginContainer}>
        <StyledInput placeholder="Email" />
        <Separator top={15} />
        <StyledInput placeholder="Password" />
        <Separator top={15} />
        <TouchableOpacity style={styles.alignRight}>
          <StyledText color={colors.light} size={13}>
            Forget Password?
          </StyledText>
        </TouchableOpacity>
      </View>
      <View style={styles.signContainer}>
        <StyledButton title="Sign in" color={colors.primary} font="opensans" />
        <Separator top={15} />
        <StyledButton
          title="Sign in with Google"
          color="white"
          colorText="black"
          font="opensans"
          imgIcon={require("../assets/icons/google.png")}
          imgWidth={20}
          imgHeight={20}
        />
        <Separator top={15} />
        <View style={styles.linkContainer}>
          <StyledText color={colors.light} size={14}>
            Don't have an account?
          </StyledText>
          <Link
            title=" Sign Up"
            color={colors.secondary}
            size={14}
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alignRight: {
    alignSelf: "flex-end",
    right: 27,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mediumdark,
  },
  googleIcon: {
    width: 70,
    height: 70,
  },
  loginContainer: {
    position: "absolute",
    top: "30%",
    width: "100%",
    alignItems: "center",
  },
  lightColor: {
    color: colors.light,
  },
  linkContainer: {
    flexDirection: "row",
  },
  signContainer: {
    position: "absolute",
    width: "100%",
    bottom: "5%",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    top: "10%",
  },
});

export default LoginScreen;
