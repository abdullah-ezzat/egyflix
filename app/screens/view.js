import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import colors from "../config/colors";
import Separator from "../components/separator";
import useApi from "../hooks/useApi";
import get from "../api/get";
import Card from "../components/card";
import Loading from "../components/loading";
import PaginationDot from "react-native-animated-pagination-dot";
import Badge from "../components/badge";

function ViewMoreScreen({ navigation, route }) {
  const getData = useApi(get.getData);
  const args = route.params.args;
  const [currentPage, setPage] = useState(0);

  useEffect(() => {
    getData.request(args[0], args[1], currentPage + 1, args[3]);
  }, []);

  const updateData = (page) => {
    setPage(page);
    if (page == getData.data.total_pages) page = page - 1;
    getData.request(args[0], args[1], page + 1, args[3]);
  };

  return (
    <View style={styles.container}>
      <Loading visible={getData.loading} />
      <Separator top={20} />
      <ScrollView>
        <FlatList
          data={getData.data.results}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "center" }}
          renderItem={({ item }) => (
            <>
              {!getData.loading && (
                <Card
                  title={item.original_title ?? item.original_name}
                  image={item.poster_path}
                  rating={item.vote_average}
                  badgePadding={10}
                  width={160}
                  height={250}
                  radius={15}
                  padding={5}
                  onPress={() =>
                    navigation.navigate("Details", {
                      type: item.title || item.original_title ? "movie" : "tv",
                      id: item.id,
                      title: item.title ?? item.name,
                    })
                  }
                />
              )}
            </>
          )}
        />
        <Separator top={20} />
      </ScrollView>
      <Separator top={10} />
      {!getData.loading && (
        <View style={styles.pagesContainer}>
          <Badge
            name="<"
            width={40}
            height={40}
            color="white"
            bgColor={colors.secondary}
            radius={10}
            onPress={() => updateData(currentPage > 0 ? currentPage - 1 : 0)}
          />
          <PaginationDot
            sizeRatio={2}
            activeDotColor={colors.secondary}
            curPage={currentPage}
            maxPage={getData.data.total_pages}
          />
          <Badge
            name=">"
            width={40}
            height={40}
            color="white"
            bgColor={colors.secondary}
            radius={10}
            onPress={() =>
              updateData(
                currentPage < getData.data.total_pages
                  ? currentPage + 1
                  : getData.data.total_pages
              )
            }
          />
        </View>
      )}
      <Separator top={15} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  pagesContainer: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ViewMoreScreen;
