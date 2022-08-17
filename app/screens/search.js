import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import colors from "../config/colors";
import StyledInput from "../components/input";
import Separator from "../components/separator";
import useApi from "../hooks/useApi";
import get from "../api/get";
import Card from "../components/card";
import Loading from "../components/loading";

function SearchScreen({ navigation }) {
  const [text, onChangeText] = useState("");
  const search = useApi(get.search);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <StyledInput
          onChange={onChangeText}
          value={text}
          placeholder="Search..."
          icon="magnify"
          radius={15}
          iconPadding={35}
          iconPress={() => search.request(text)}
        />
      </View>
      <Separator top={25} />
      <Loading visible={search.loading} />
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <FlatList
          data={search.data}
          numColumns={2}
          renderItem={({ item }) => (
            <>
              {!search.loading && (
                <Card
                  image={item.image}
                  width={160}
                  height={250}
                  radius={15}
                  padding={5}
                  onPress={() =>
                    navigation.navigate("Details", { link: item.link })
                  }
                />
              )}
            </>
          )}
        />
        <Separator top={20} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default SearchScreen;
