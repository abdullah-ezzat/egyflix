import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import StyledText from "./text";
import Separator from "./separator";

function StyledList({
  title,
  titleSize = 20,
  titleWeight = "400",
  titleColor,
  titleFont,
  subTitle,
  subTitleSize = 20,
  subTitleWeight = "400",
  subTitleColor,
  subTitleFont,
  image,
  imageWidth = 60,
  imageHeight = 60,
  imageRadius = 50,
  icon,
  iconSize = 40,
  iconColor,
  top = 0,
  padding = 5,
}) {
  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={image}
          style={{
            width: imageWidth,
            height: imageHeight,
            borderRadius: imageRadius,
          }}
        />
      )}
      {icon && (
        <MaterialCommunityIcons name={icon} size={iconSize} color={iconColor} />
      )}
      <View style={[styles.textContainer, { paddingTop: padding }]}>
        <StyledText
          font={titleFont}
          size={titleSize}
          weight={titleWeight}
          color={titleColor}
        >
          {title}
        </StyledText>
        {subTitle && (
          <>
            <Separator top={top} />
            <StyledText
              size={subTitleSize}
              font={subTitleFont}
              weight={subTitleWeight}
              color={subTitleColor}
            >
              {subTitle}
            </StyledText>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  textContainer: {
    paddingLeft: 10,
    alignItems: "flex-start",
  },
});

export default StyledList;
