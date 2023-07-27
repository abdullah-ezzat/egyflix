import { useEffect, useState } from "react";
import { FlatList, Linking, ScrollView, StyleSheet, View } from "react-native";
import imdbId from "imdb-id";

import useApi from "../hooks/useApi";
import get from "../api/get";
import colors from "../config/colors";
import Card from "../components/card";
import Separator from "../components/separator";
import DetailedBadge from "../components/detailedBadge";
import Badge from "../components/badge";
import StyledText from "../components/text";
import Loading from "../components/loading";

function DetailsScreen({ route, navigation }) {
  const [season, setSeason] = useState();
  const [episode, setEpisode] = useState();

  let getDetails = useApi(get.getDetails);
  let getCasting = useApi(get.getCasting);
  let getVideos = useApi(get.getVideos);
  let getMovieDownload = useApi(get.getMovieDownload);
  let getSeriesDownload = useApi(get.getSeriesDownload);

  let videos = getVideos.data.results;
  let casting = getCasting.data.cast;
  let details = getDetails.data;

  useEffect(() => {
    getDetails.request(route.params.type, route.params.id);
    getCasting.request(route.params.type, route.params.id);
    getVideos.request(route.params.type, route.params.id);
  }, []);

  const clockFormat = (mins) => {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}h ${minutes}m`;
  };

  const getTrailer = () => {
    let trailer;
    for (const i in videos) {
      if (videos[i].type == "Trailer") {
        trailer = videos[i].key;
      }
    }
    if (trailer) Linking.openURL(`https://www.youtube.com/embed/${trailer}`);
  };

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const getDownloadLink = async () => {
    // if (route.params.type == "movie") {
    //   getMovieDownload.request(details.id);
    //   console.log(getMovieDownload.data);
    // } else {
    //   getSeriesDownload.request(details.id, season, episode);
    //   console.log(getSeriesDownload.data);
    // }
    const id = await imdbId(route.params.title);
    console.log(id);
  };

  return (
    <View style={styles.bgContainer}>
      <Loading visible={getDetails.loading} />
      {!getDetails.loading && (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.rowContainer}>
            <Card
              image={details.poster_path}
              width={220}
              height={300}
              radius={25}
            />
            <Separator right={-15} />
            <View style={{ zIndex: -10 }}>
              <DetailedBadge
                iconAnt="staro"
                iconSize={23}
                iconColor={colors.primary}
                title={details.vote_average && details.vote_average.toFixed(1)}
                subTitle="Rating"
                color="white"
                opacity={1}
                bgColor={colors.mediumdark}
                width={120}
                height={91}
                radius={20}
              />
              <Separator top={10} />
              <DetailedBadge
                iconAnt="clockcircleo"
                iconSize={23}
                iconColor={colors.primary}
                title={
                  (details.runtime && clockFormat(details.runtime)) ||
                  (details.episode_run_time &&
                    clockFormat(details.episode_run_time[0]))
                }
                subTitle="Duration"
                color="white"
                opacity={1}
                bgColor={colors.mediumdark}
                width={120}
                height={91}
                radius={20}
              />
              <Separator top={10} />
              <DetailedBadge
                iconAnt="calendar"
                iconSize={23}
                iconColor={colors.primary}
                title={
                  (details.release_date &&
                    details.release_date.split("-")[0]) ||
                  (details.last_air_date && details.last_air_date.split("-")[0])
                }
                subTitle="Year"
                color="white"
                opacity={1}
                bgColor={colors.mediumdark}
                width={120}
                height={91}
                radius={20}
              />
            </View>
          </View>
          <Separator top={40} />
          <View style={{ flexDirection: "row" }}>
            <Badge
              iconAnt="sharealt"
              width={60}
              height={60}
              iconSize={25}
              radius={100}
              iconColor="white"
              bgColor={colors.mediumdark}
            />
            <Separator right={20} />
            <Badge
              iconAnt="clouddownloado"
              width={60}
              height={60}
              iconSize={30}
              radius={100}
              bgColor={colors.mediumdark}
              iconColor="white"
              onPress={() => getDownloadLink()}
            />
            <Separator right={20} />
            <Badge
              iconAnt="staro"
              width={60}
              height={60}
              iconSize={25}
              radius={100}
              iconColor="white"
              bgColor={colors.mediumdark}
            />
            <Separator right={20} />
            <Badge
              iconAnt="youtube"
              width={60}
              height={60}
              iconSize={25}
              radius={100}
              bgColor={colors.mediumdark}
              iconColor="white"
              onPress={() => getTrailer()}
            />
          </View>
          <Separator top={40} />
          <View style={styles.detailsContainer}>
            <StyledText size={22}>Plot Overview</StyledText>
            <Separator top={20} />
            <StyledText color={colors.light} size={15} align="left">
              {details.overview}
            </StyledText>
            <Separator top={40} />
            <StyledText size={22}>Casting</StyledText>
            <Separator top={20} />
            <FlatList
              horizontal
              data={casting}
              renderItem={({ item }) => (
                <>
                  <View style={{ flexDirection: "column" }}>
                    <Card
                      resizeMode="contain"
                      image={item.profile_path}
                      width={100}
                      height={100}
                      radius={15}
                    />
                    <Separator top={10} />
                    <StyledText size={14}>{item.name}</StyledText>
                    <Separator top={5} />
                    <StyledText size={13} color={colors.light}>
                      {item.character}
                    </StyledText>
                  </View>
                  <Separator right={40} />
                </>
              )}
            />
            <Separator top={20} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  rowContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  detailsContainer: {
    alignItems: "flex-start",
    paddingLeft: 10,
  },
});

export default DetailsScreen;
