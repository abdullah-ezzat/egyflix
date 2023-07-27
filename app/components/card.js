import React from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../config/colors";
import Badge from "./badge";
import Icon from "./icon";
import StyledText from "./text";

function Card({
  width,
  height,
  radius,
  title,
  image,
  onPress,
  padding,
  rating,
  resizeMode = "stretch",
  badgePadding = 5,
  fullSize = false,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        {image && (
          <Image
            resizeMode={resizeMode}
            source={{
              uri: `https://image.tmdb.org/t/p/${
                fullSize ? "original" : "w500"
              }${image}`,
            }}
            style={{
              width: width,
              height: height,
              borderRadius: radius,
              margin: padding,
              alignSelf: "center",
            }}
          />
        )}
        {image == null && (
          <View
            style={{
              width: width,
              height: height,
              borderRadius: radius,
              margin: padding,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.mediumdark,
              alignSelf: "center",
            }}
          >
            <Icon name="movie" size={50} color={colors.secondary} />
            <View
              style={{ position: "absolute", bottom: 20, width: width - 20 }}
            >
              {title && <StyledText size={15}>{title}</StyledText>}
            </View>
          </View>
        )}
        {rating > 0 && (
          <View style={[styles.badgeContainer, { padding: badgePadding }]}>
            <Badge
              name={Number(rating).toFixed(1)}
              bgColor={colors.primary}
              color="white"
              size={10}
              radius={7}
              padding={5}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    zIndex: 10,
  },
});

export default Card;
