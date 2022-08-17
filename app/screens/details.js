import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import StarRatingBar from "react-native-star-rating-view/StarRatingBar";

import StyledText from "../components/text";
import Separator from "../components/separator";
import Icon from "../components/icon";
import Badge from "../components/badge";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import get from "../api/get";
import Loading from "../components/loading";
import StyledButton from "../components/button";

function DetailsScreen({ route, navigation }) {
  let getDetails = useApi(get.getDetails);
  let getEpisodes = useApi(get.getEpisodes);
  let getLinks = useApi(get.getLinks);

  const [modalVisible, setModalVisible] = useState(false);
  const [downloadVisible, setDownloadVisible] = useState(false);
  const [watchVisible, setWatchVisible] = useState(false);

  useEffect(() => {
    getDetails.request(route.params.link);
  }, []);

  return (
    <View style={styles.container}>
      <Loading visible={getDetails.loading} />
      {!getDetails.loading && (
        <>
          <View style={styles.padding}>
            <TouchableOpacity
              onPress={() => Linking.openURL(getDetails.data.video)}
            >
              <Image
                source={{ uri: getDetails.data.videoImg }}
                resizeMode="stretch"
                blurRadius={3}
                style={styles.banner}
              />
              <View style={styles.icon}>
                <Icon name="youtube" size={70} color="#ddd" />
              </View>
            </TouchableOpacity>
            <Separator top={5} />
            <StyledText size={30} weight="bold">
              {getDetails.data.name}
            </StyledText>
            <Separator top={7} />
            <View style={styles.rowContainer}>
              <StyledText color={colors.light} weight="normal">
                {getDetails.data.release_date}
              </StyledText>
              <Separator right={8} />
              <Octicons name="dot-fill" size={12} color={colors.light} />
              <Separator left={8} />
              <StyledText color={colors.light} weight="normal">
                {getDetails.data.duration}
              </StyledText>

              <Separator right={8} />
              <Octicons name="dot-fill" size={12} color={colors.light} />
              <Separator left={8} />
              <StyledText color={colors.light} weight="normal">
                {getDetails.data.quality}
              </StyledText>
            </View>
            <Separator top={7} />
            <View style={styles.rowContainer}>
              <StarRatingBar
                score={Number(getDetails.data.rating) / 2}
                scoreText=" / 5"
                dontShowScore={false}
                allowsHalfStars={true}
                accurateHalfStars={true}
              />
            </View>
            <Separator top={15} />
            <FlatList
              data={getDetails.data.genre}
              centerContent
              horizontal
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
              renderItem={({ item }) => (
                <View style={styles.rowContainer}>
                  <Badge
                    name={item.name}
                    bgColor={colors.lightgrey}
                    radius={8}
                    size={15}
                    width={70}
                    height={35}
                  />
                  <Separator right={5} />
                </View>
              )}
            />
          </View>
          <View style={[styles.rowContainer, styles.buttonContainer]}>
            <StyledButton
              title="Watch | Download"
              radius={20}
              onPress={() => {
                setModalVisible(true);
                getLinks.request(route.params.link);
              }}
            />
          </View>
          <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={styles.iconContainer}>
                  <View style={styles.iconBG}>
                    <Icon name="close" size={60} />
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: "15%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledButton
                  title="Watch"
                  icon="play-outline"
                  iconColor="white"
                  iconSize={25}
                  onPress={() => setWatchVisible(true)}
                />
                <Separator top={25} />
                <StyledButton
                  title="Download"
                  icon="download-outline"
                  iconColor="white"
                  iconPadding={5}
                  iconSize={20}
                  onPress={() => setDownloadVisible(true)}
                />
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            visible={downloadVisible}
            transparent={true}
          >
            <View style={[styles.modalContainer, { height: "70%" }]}>
              <Loading visible={getLinks.loading} />
              <TouchableOpacity onPress={() => setDownloadVisible(false)}>
                <View style={styles.iconContainer}>
                  <View style={styles.iconBG}>
                    <Icon name="close" size={60} />
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: "15%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FlatList
                  data={getLinks.data.watch}
                  renderItem={({ item }) => (
                    <>
                      {!getLinks.loading && (
                        <StyledButton
                          title={`${item.quality}p | ${item.size}`}
                          width="100%"
                          onPress={() => Linking.openURL(item.link)}
                        />
                      )}
                      <Separator top={25} />
                    </>
                  )}
                />
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            visible={watchVisible}
            transparent={true}
          >
            <View style={[styles.modalContainer, { height: "70%" }]}>
              <Loading visible={getLinks.loading} />
              <TouchableOpacity onPress={() => setWatchVisible(false)}>
                <View style={styles.iconContainer}>
                  <View style={styles.iconBG}>
                    <Icon name="close" size={60} />
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: "15%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FlatList
                  data={getLinks.data.watch}
                  renderItem={({ item }) => (
                    <>
                      {!getLinks.loading && (
                        <StyledButton
                          title={`${item.quality}p | ${item.size}`}
                          width="100%"
                          onPress={() =>
                            navigation.navigate("Play", { link: item.link })
                          }
                        />
                      )}
                      <Separator top={25} />
                    </>
                  )}
                />
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  banner: {
    width: "100%",
    height: 300,
  },
  icon: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  padding: {
    marginTop: "3%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "5%",
    left: 0,
    right: 0,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    height: "35%",
    width: "100%",
    backgroundColor: colors.darkgrey,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-26%",
  },
  iconBG: {
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: colors.darkgrey,
  },
});

export default DetailsScreen;
