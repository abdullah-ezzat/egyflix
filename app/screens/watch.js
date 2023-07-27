import React from "react";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { Dimensions } from "react-native";

import colors from "../config/colors";

function VideoPlayScreen({ route }) {
  function setOrientation() {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

  return (
    <Video
      style={{ flex: 1, backgroundColor: colors.dark }}
      source={{ uri: route.params.link }}
      useNativeControls={true}
      onFullscreenUpdate={setOrientation}
      resizeMode="contain"
      shouldPlay={true}
    />
  );
}

export default VideoPlayScreen;
