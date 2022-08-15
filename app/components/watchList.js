import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";

import StyledText from "./text";
import Separator from "./separator";
import Card from "./card";

function StyledSlideList({
  title,
  width,
  height,
  radius,
  visible,
  data,
  right = 15,
  onPress,
}) {
  if (data) {
    return (
      <View>
        <View style={styles.textAlign}>
          <StyledText font="opensans" weight="400" size={23}>
            {title}
          </StyledText>
        </View>
        <ScrollView horizontal style={{ flexDirection: "row", paddingLeft: 5 }}>
          <FlatList
            data={data}
            horizontal
            renderItem={({ item }) => (
              <>
                {!visible && (
                  <Card
                    image={item.image}
                    width={width}
                    height={height}
                    radius={radius}
                    onPress={() => onPress(item.link)}
                  />
                )}
                <Separator right={right} />
              </>
            )}
          />
        </ScrollView>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  textAlign: {
    alignItems: "flex-start",
    paddingBottom: 15,
    paddingLeft: 6,
  },
});

export default StyledSlideList;
