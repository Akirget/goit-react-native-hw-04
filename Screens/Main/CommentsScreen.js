import React, { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";

import Top from "../../assets/images/top.svg";
import { TextInput } from "react-native-gesture-handler";

import { commentPostArray } from "../../data/posts";

export const CommentsScreen = () => {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  const [posts, setPosts] = useState(commentPostArray);

  const [comment, setComment] = useState("");

  const commentHandler = (comment) => setComment(comment);

  const onSend = () => {
    if (!comment.trim()) {
      Alert.alert(`
      Введите свой комментарий, пожалуйста`);
      return;
    }
    Alert.alert(`Ваш комментарий успешно отправлен!`);
    console.log(comment);
    setComment("");
    Keyboard.dismiss();
  };

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
    <View
      onLayout={onLayoutRootView}
      style={{ backgroundColor: "#FFFFFF", alignItems: "center" }}
    >
      <View style={{ width: windowWidth - 32 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ ...styles.container, width: windowWidth - 32 }}>
              <Image
                style={styles.commentImage}
                source={require("../../assets/images/sunset.jpg")}
              />
            </View>
          }
          ListFooterComponent={
            <View style={{ marginBottom: 32 }}>
              <TextInput
                value={comment}
                style={styles.input}
                placeholder="Комментировать..."
                cursorColor={"#BDBDBD"}
                placeholderTextColor={"#BDBDBD"}
                onChangeText={commentHandler}
              ></TextInput>
              <TouchableOpacity style={styles.sendButton} onPress={onSend}>
                <Top />
              </TouchableOpacity>
            </View>
          }
          contentContainerStyle={{ width: windowWidth - 32 }}
          data={posts.commentsTexts}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.commentWrapper,
                width: windowWidth - 32,
              }}
            >
              <Image
                source={item.userAvatar}
                style={styles.commentAvatarImage}
              />
              <View
                style={{
                  ...styles.textWrapper,
                  width: windowWidth - 28 - 16 * 3,
                }}
              >
                <Text style={styles.commentText}>{item.text}</Text>
                <Text style={styles.commentDate}>
                  {item.date} | {item.time}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 32,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  commentImage: {
    width: "100%",
    marginBottom: 31,
    borderRadius: 8,
  },
  commentWrapper: {
    flexDirection: "row",
    marginBottom: 24,
  },
  textWrapper: {
    padding: 16,
    backgroundColor: "#00000008",
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  commentAvatarImage: {
    width: 28,
    height: 28,
    marginRight: 16,
    resizeMode: "cover",
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentDate: {
    marginTop: 8,
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  input: {
    marginTop: 7,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  sendButton: {
    position: "absolute",
    top: 15,
    right: 8,
  },
});
