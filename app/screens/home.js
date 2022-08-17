import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";

import StyledSlideList from "../components/watchList";
import StyledList from "../components/list";
import Badge from "../components/badge";
import Separator from "../components/separator";
import colors from "../config/colors";

import get from "../api/get";
import useApi from "../hooks/useApi";
import Loading from "../components/loading";
import Icon from "../components/icon";

function HomeScreen({ navigation }) {
  const [status, setStatus] = useState("Movies");

  var getTrending = useApi(get.getData);
  var getNew = useApi(get.getData);
  var getTopRated = useApi(get.getData);
  var getLatest = useApi(get.getData);
  var getPopular = useApi(get.getData);

  useEffect(() => {
    getResquests();
  }, []);

  const getResquests = () => {
    if (status == "Movies") getMoviesRequests();
    if (status == "Series") getSeriesRequests();
    if (status == "Animes") getAnimesRequests();
  };

  const getMoviesRequests = () => {
    getTrending.request("trending", 2);
    getNew.request("movies", 2);
    getTopRated.request("movies-top", 2);
    getLatest.request("movies-latest", 2);
    getPopular.request("movies-popular", 2);
  };

  const getSeriesRequests = () => {
    getTrending.request("tv", 2);
    getNew.request("tv-new", 2);
    getTopRated.request("tv-top", 2);
    getLatest.request("tv-latest", 2);
    getPopular.request("tv-popular", 2);
  };

  const getAnimesRequests = () => {
    getTrending.request("animes", 2);
    getNew.request("animes-new", 2);
    getTopRated.request("animes-top", 2);
    getLatest.request("animes-latest", 2);
    getPopular.request("animes-popular", 2);
  };

  const changeStatus = (current) => {
    setStatus(current);
    if (current == "Movies") getMoviesRequests();
    if (current == "Series") getSeriesRequests();
    if (current == "Animes") getAnimesRequests();
  };

  return (
    <View style={styles.bgContainer}>
      <Loading
        visible={
          getTrending.loading &&
          getNew.loading &&
          getLatest.loading &&
          getTopRated.loading &&
          getPopular.loading
        }
      />
      <View style={styles.container}>
        <StyledList
          title="Hello,"
          titleWeight="100"
          titleSize={18}
          titleColor={colors.light}
          subTitle="DARKBUG"
          subTitleFont="Acme"
          subTitleWeight="400"
          image={require("../assets/images/pic1.png")}
          padding={5}
        />
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Icon name="magnify" size={30} color={colors.light} />
          </TouchableOpacity>
        </View>
        <Separator top={30} />
        <View style={styles.rowContainer}>
          <Badge name="Movies" onPress={() => changeStatus("Movies")} />
          <Badge name="TV Shows" onPress={() => changeStatus("Series")} />
          <Badge name="Anime" onPress={() => changeStatus("Animes")} />
          <Badge name="My List" />
        </View>
        <Separator top={15} />
        <ScrollView>
          <Separator top={15} />
          <StyledSlideList
            title={!getTrending.loading ? `Trending ${status}` : ""}
            data={getTrending.data}
            visible={getTrending.loading}
            onPress={(link) => navigation.navigate("Details", { link: link })}
            width={170}
            height={258}
            radius={15}
            right={20}
          />
          <Separator bottom={50} />
          <StyledSlideList
            title={!getNew.loading ? `New ${status}` : ""}
            data={getNew.data}
            visible={getNew.loading}
            onPress={(link) => navigation.navigate("Details", { link: link })}
            width={170}
            height={258}
            radius={15}
            right={20}
          />
          <Separator bottom={50} />
          <StyledSlideList
            title={!getTopRated.loading ? `Top Rated ${status}` : ""}
            data={getTopRated.data}
            visible={getTopRated.loading}
            onPress={(link) => navigation.navigate("Details", { link: link })}
            width={170}
            height={258}
            radius={15}
            right={20}
          />
          <Separator bottom={50} />
          <StyledSlideList
            title={!getLatest.loading ? `Latest ${status}` : ""}
            data={getLatest.data}
            visible={getLatest.loading}
            onPress={(link) => navigation.navigate("Details", { link: link })}
            width={170}
            height={258}
            radius={15}
            right={20}
          />
          <Separator bottom={50} />
          <StyledSlideList
            title={!getPopular.loading ? `Popular ${status}` : ""}
            data={getPopular.data}
            visible={getPopular.loading}
            onPress={(link) => navigation.navigate("Details", { link: link })}
            width={170}
            height={258}
            radius={15}
            right={20}
          />
          <Separator bottom={50} />
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 20,
    left: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    left: -10,
  },
  searchContainer: {
    position: "absolute",
    top: Constants.statusBarHeight - 10,
    right: 40,
  },
  textAlign: {
    alignItems: "flex-start",
    paddingBottom: 15,
    paddingLeft: 6,
  },
});

export default HomeScreen;
