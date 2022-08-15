import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

import StyledButton from "../components/button";
import StyledText from "../components/text";

import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={7}
      source={{ uri: "https://flxt.tmsimg.com/assets/p12991665_b_v13_am.jpg" }}
      style={styles.backgroundImg}
      resizeMode="cover"
    >
      <View style={styles.textContainer}>
        <StyledText size={50} weight="400" font="Acme">
          EGYFLIX
        </StyledText>
        <View style={styles.padding}>
          <StyledText size={25} weight="400" font="Acme">
            Watch your favourite movies or series on only one platform. You can
            watch it anytime and anywere.
          </StyledText>
        </View>
      </View>
      <View style={styles.container}>
        <StyledButton
          color={colors.primary}
          title="Get Started"
          onPress={() => navigation.navigate("Login")}
          font="Acme"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    bottom: "5%",
  },
  backgroundImg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  textContainer: {
    position: "absolute",
    bottom: "20%",
    textAlign: "center",
  },
  padding: {
    padding: 15,
  },
});

export default WelcomeScreen;
