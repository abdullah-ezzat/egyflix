import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";

import StyledText from "./text";
import Separator from "./separator";
import Card from "./card";
import Badge from "./badge";
import colors from "../config/colors";

function StyledSlideList({
  title,
  width,
  height,
  radius,
  data,
  right = 15,
  onPress,
  viewMorePress,
}) {
  if (data !== undefined) {
    return (
      <View>
        <View style={styles.detailsContainer}>
          <View style={styles.textAlign}>
            <StyledText font="opensans" weight="600" size={20}>
              {title}
            </StyledText>
          </View>
          <View style={styles.viewMore}>
            <Badge
              name="See all"
              color={colors.secondary}
              width={60}
              height={30}
              size={12}
              onPress={() => viewMorePress()}
            />
          </View>
        </View>
        <ScrollView horizontal style={{ flexDirection: "row", paddingLeft: 5 }}>
          <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <>
                  <Card
                    title={item.title ?? item.name}
                    image={item.poster_path}
                    width={width}
                    height={height}
                    radius={radius}
                    rating={item.vote_average}
                    onPress={() => onPress(item.id, item.title ?? item.name)}
                  />
                  <Separator right={right} />
                </>
              );
            }}
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
    paddingLeft: 6,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  viewMore: {
    right: 15,
  },
});

export default StyledSlideList;
