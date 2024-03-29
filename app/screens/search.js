import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import colors from "../config/colors";
import Separator from "../components/separator";
import useApi from "../hooks/useApi";
import get from "../api/get";
import Card from "../components/card";
import Loading from "../components/loading";
import PaginationDot from "react-native-animated-pagination-dot";
import Badge from "../components/badge";
import StyledInput from "../components/input";

function SearchScreen({ navigation }) {
  const getData = useApi(get.searchData);
  const [currentPage, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const updateData = (page) => {
    setPage(page);
    if (page == getData.data.total_pages) page = page - 1;
    getData.request(search, page + 1);
  };

  return (
    <View style={styles.container}>
      <Separator top={20} />
      <View style={styles.searchContainer}>
        <StyledInput
          icon="search1"
          onFinish={() => getData.request(search, 1)}
          iconPress={() => getData.request(search, 1)}
          iconColor={colors.secondary}
          textColor={colors.secondary}
          onChange={(text) => setSearch(text)}
          placeholder="Search"
          width="75%"
          radius={15}
        />
        <Separator right={5} />
        <Badge
          icon="filter"
          iconColor={colors.secondary}
          bgColor={colors.mediumdark}
          width={70}
          height={70}
          radius={15}
        />
      </View>
      <Separator top={20} />
      <Loading visible={getData.loading} />
      <ScrollView>
        <FlatList
          data={getData.data.results}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "center" }}
          renderItem={({ item }) => (
            <>
              {!getData.loading && (
                <Card
                  title={
                    item.original_title ??
                    item.title ??
                    item.original_name ??
                    item.name
                  }
                  image={item.poster_path}
                  rating={item.vote_average}
                  badgePadding={10}
                  width={160}
                  height={250}
                  radius={15}
                  padding={5}
                  onPress={() =>
                    navigation.navigate("Details", {
                      type: item.media_type,
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
      {!getData.loading && getData.data.total_pages > 1 && (
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
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default SearchScreen;
