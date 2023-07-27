import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

import StyledSlideList from "../components/watchList";
import Separator from "../components/separator";
import colors from "../config/colors";

import get from "../api/get";
import useApi from "../hooks/useApi";
import Loading from "../components/loading";
import Card from "../components/card";
import Carousel from "react-native-reanimated-carousel";
import Badge from "../components/badge";

function HomeScreen({ navigation }) {
  const [status, setStatus] = useState("Movies");
  const [currentHero, setHero] = useState();
  const { width } = Dimensions.get("screen");

  const getNowPlaying = useApi(get.getData);
  const getTrending = useApi(get.getData);
  const getTopRated = useApi(get.getData);
  const getPopular = useApi(get.getData);
  const getDiscover = useApi(get.getData);
  const nowPlaying = getNowPlaying.data.results;

  useEffect(() => {
    getResquests();
  }, []);

  const getResquests = () => {
    if (status == "Movies") getMoviesRequests();
    if (status == "Series") getSeriesRequests();
  };

  const getMoviesRequests = () => {
    getPopular.request("movie", "popular", 1);
    getDiscover.request(
      "discover",
      "movie",
      1,
      "&region=EG&year=2022&primary_release_year=2022"
    );
    getTrending.request("trending", "movie/week", 1);
    getNowPlaying.request("movie", "now_playing", 1);
    getTopRated.request("movie", "top_rated", 1, "&region=EG");
  };

  const getSeriesRequests = () => {
    getDiscover.request("tv", "on_the_air", 1);
    getTrending.request("trending", "tv/week", 1);
    getPopular.request("tv", "popular", 1);
    getNowPlaying.request("tv", "airing_today", 1);
    getTopRated.request("tv", "top_rated", 1);
  };

  const changeStatus = (current) => {
    if (status == "Movies") current = "Series";
    else current = "Movies";

    setStatus(current);
    if (current == "Movies") getMoviesRequests();
    if (current == "Series") getSeriesRequests();
  };

  const goToDetails = (id, title) => {
    let type;
    if (status == "Movies") type = "movie";
    if (status == "Series") type = "tv";
    navigation.navigate("Details", { type: type, id: id, title: title });
  };

  return (
    <View style={styles.bgContainer}>
      <Loading
        visible={
          getDiscover.loading ||
          getNowPlaying.loading ||
          getPopular.loading ||
          getTopRated.loading ||
          getTrending.loading
        }
      />
      {!getDiscover.loading &&
        !getNowPlaying.loading &&
        !getPopular.loading &&
        !getTopRated.loading &&
        !getTrending.loading && (
          <ScrollView>
            <Carousel
              loop
              autoPlay
              width={width}
              height={width}
              enabled={false}
              autoPlayInterval={10000}
              data={nowPlaying}
              onSnapToItem={(index) =>
                setHero({
                  id: nowPlaying[index].id,
                  title: nowPlaying[index].title ?? nowPlaying[index].name,
                })
              }
              renderItem={({ item }) => (
                <>
                  <Card image={item.poster_path} width={width} height={width} />
                  <View
                    style={{
                      position: "absolute",
                      top: width - 80,
                      left: 15,
                      flexDirection: "row",
                    }}
                  >
                    <Badge
                      name="Play"
                      iconAnt="play"
                      iconSize={20}
                      onPress={() =>
                        goToDetails(
                          currentHero.id ?? nowPlaying[0].id,
                          currentHero.title
                        )
                      }
                      bgColor={colors.primary}
                      width={90}
                      height={40}
                      radius={20}
                      color="white"
                      iconColor="white"
                    />
                    <Separator right={10} />
                    <Badge
                      name="My List"
                      iconAnt="plus"
                      bgColor={colors.dark}
                      iconSize={20}
                      width={105}
                      height={40}
                      radius={20}
                      color="white"
                      iconColor="white"
                    />
                  </View>
                </>
              )}
            />
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => changeStatus(status)}>
                <Image
                  source={require("../assets/images/logo-ico.png")}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                top: Constants.statusBarHeight + 20,
                flexDirection: "row",
                position: "absolute",
                right: 10,
              }}
            >
              <Badge
                width={50}
                height={50}
                radius={15}
                iconAnt="search1"
                iconSize={25}
                iconColor="white"
                onPress={() => navigation.navigate("Search")}
              />
              <Badge
                width={50}
                height={50}
                radius={15}
                iconAnt="download"
                iconSize={25}
                iconColor="white"
              />
            </View>
            <Separator top={20} />
            <View style={styles.mainContainer}>
              <StyledSlideList
                title={`Top 20 ${status} This Week`}
                data={getTrending.data.results}
                viewMorePress={() =>
                  navigation.navigate("ViewMore", {
                    args: getNowPlaying.args,
                    title: `Top 20 ${status} This Week`,
                  })
                }
                width={150}
                height={220}
                radius={15}
                right={7}
                onPress={(id, title) => goToDetails(id, title)}
              />
              <Separator top={20} />
              <StyledSlideList
                title={`Now Playing ${
                  status == "Movies" ? "in Cinemas" : "on TV"
                }`}
                data={getNowPlaying.data.results}
                viewMorePress={() =>
                  navigation.navigate("ViewMore", {
                    args: getNowPlaying.args,
                    title: `Now Playing ${
                      status == "Movies" ? "in Cinemas" : "on TV"
                    }`,
                  })
                }
                width={150}
                height={220}
                radius={15}
                right={7}
                onPress={(id, title) => goToDetails(id, title)}
              />
              <Separator top={20} />
              <StyledSlideList
                title="Latest in Egypt"
                data={getDiscover.data.results}
                viewMorePress={() =>
                  navigation.navigate("ViewMore", {
                    args: getDiscover.args,
                    title: "Latest in Egypt",
                  })
                }
                width={150}
                height={220}
                radius={15}
                right={7}
                onPress={(id, title) => goToDetails(id, title)}
              />
              <Separator top={20} />
              <StyledSlideList
                title={`Top Rated ${status}`}
                data={getTopRated.data.results}
                viewMorePress={() =>
                  navigation.navigate("ViewMore", {
                    args: getTopRated.args,
                    title: `Top Rated ${status}`,
                  })
                }
                width={150}
                height={220}
                radius={15}
                right={7}
                onPress={(id, title) => goToDetails(id, title)}
              />
            </View>
            <Separator top={20} />
          </ScrollView>
        )}
    </View>
  );
}
const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: colors.primary_dark,
  },
  mainContainer: {
    paddingLeft: 10,
  },
  iconsContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: Constants.statusBarHeight + 20,
    left: 5,
  },
});

export default HomeScreen;
