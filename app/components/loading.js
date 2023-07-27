import React from "react";
import LottieView from "lottie-react-native";

function Loading({ visible = false }) {
  if (!visible) return null;
  return (
    <LottieView
      autoPlay
      loop
      source={require("../assets/animation/loader.json")}
    />
  );
}

export default Loading;
