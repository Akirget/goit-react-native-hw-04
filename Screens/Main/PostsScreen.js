import React, { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
} from "react-native";

import { postsScreenArray } from "../../data/posts";

import Message from "../../assets/images/postImg/message.svg";
import Like from "../../assets/images/postImg/like.svg";
import Location from "../../assets/images/postImg/location.svg";

export const PostsScreen = ({ navigation }) => {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  const [posts, setPosts] = useState(postsScreenArray);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const [fonts] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fonts) {
      await SplashScreen.hideAsync();
    }
  }, [fonts]);
  if (!fonts) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.userContainer}>
            <Image
              style={styles.avatarImg}
              source={require("../../assets/images/userAvatar.jpg")}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Natali Romanova</Text>
              <Text style={styles.userEmail}>email@example.com</Text>
            </View>
          </View>
        }
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.itemList}>
            <Image
              source={item.img}
              style={{
                ...styles.cardImage,
                width: windowWidth - 16 * 2,
              }}
            />
            <Text style={styles.userPostTitle}>{item.title}</Text>
            <View style={styles.userCard}>
              <View style={styles.userCardInformation}>
                <TouchableOpacity
                  style={styles.wrap}
                  onPress={() => navigation.navigate("Комментарии")}
                >
                  <Message />
                  <Text style={styles.textStatistic}>{item.comments}</Text>
                </TouchableOpacity>
                <View style={{ ...styles.wrap, marginLeft: 24 }}>
                  <Like />
                  <Text style={styles.textStatistic}>{item.likes}</Text>
                </View>
              </View>
              <View style={styles.wrap}>
                <Location />
                <Text style={styles.textStatistic}>{item.location}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  userContainer: {
    marginVertical: 32,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 16,
    resizeMode: "cover",
  },
  userInfo: {
    marginLeft: 8,
    fontFamily: "RobotoBold",
  },
  userName: {
    color: "#212121",
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "Roboto",
  },
  userEmail: {
    color: "#212121",
    opacity: 0.8,
    fontSize: 11,
    lineHeight: 13,
  },
  cardSection: {
    alignItems: "center",
    width: "100%",
    marginTop: 32,
  },
  itemList: {},
  cardImage: {
    resizeMode: "cover",
    borderRadius: 8,
  },
  userPostTitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "RobotoMedium",
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 35,
  },
  userCardInformation: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textStatistic: {
    marginLeft: 4,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});
