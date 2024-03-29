import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Acme_400Regular } from "@expo-google-fonts/acme";
import { OpenSans_600SemiBold } from "@expo-google-fonts/open-sans";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

function StyledText({
  children,
  color = "white",
  size = 16,
  weight = "bold",
  font = "Roboto",
  align = "center",
}) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Acme: Acme_400Regular,
          opensans: OpenSans_600SemiBold,
        });
      } catch {
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Text
      style={{
        color: color,
        fontSize: size,
        fontWeight: weight,
        fontFamily: font,
        textAlign: align,
      }}
      onLayout={onLayout}
    >
      {children}
    </Text>
  );
}

export default StyledText;
