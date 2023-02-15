import React, { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import Location from "../../assets/images/postImg/location.svg";
import AddPhoto from "../../assets/images/addPhoto.svg";
import Delete from "../../assets/images/trash.svg";

export const CreatePostsScreen = ({ navigation }) => {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [title, setTitle] = useState("");
  const [isFocusedTitle, setIsFocusedTitle] = useState(false);

  const [location, setLocation] = useState("");
  const [isFocusedLocation, setIsFocusedLocation] = useState(false);

  const [isDisabledPublish, setIsDisabledPublish] = useState(true);
  const [isDelete, setIsDelete] = useState(true);

  const titleHandler = (title) => setTitle(title);
  const locationHandler = (location) => setLocation(location);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    title && location
      ? setIsDisabledPublish(false)
      : setIsDisabledPublish(true);
  }, [title, location]);

  useEffect(() => {
    title || location ? setIsDelete(false) : setIsDelete(true);
  }, [title, location]);

  const onPublish = () => {
    if (!title.trim() || !location.trim()) {
      Alert.alert(`Все поля должны быть заполнены!`);
      return;
    }
    Alert.alert(`Пост успешно был создан`);
    console.log(title, location);
    setTitle("");
    setLocation("");
    Keyboard.dismiss();
  };

  const onDelete = () => {
    setTitle("");
    setLocation("");
    Alert.alert(`Удаление прошло успешно`);
    Keyboard.dismiss();
  };

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
    <KeyboardAvoidingView
      onLayout={onLayoutRootView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.section}>
          <View style={{ ...styles.contentSection, width: windowWidth - 30 }}>
            <TouchableOpacity>
              <AddPhoto />
            </TouchableOpacity>
          </View>
          <View style={styles.contantTitle}>
            <Text style={styles.text}>Загрузите фото</Text>
          </View>
          <View style={{ width: windowWidth - 32 }}>
            <TextInput
              style={{
                ...styles.input,
                borderColor: isFocusedTitle ? "#FF6C00" : "#E8E8E8",
              }}
              onFocus={() => setIsFocusedTitle(true)}
              onBlur={() => setIsFocusedTitle(false)}
              value={title}
              placeholder="Название..."
              cursorColor={"#BDBDBD"}
              placeholderTextColor={"#BDBDBD"}
              onChangeText={titleHandler}
            ></TextInput>
            <TextInput
              style={{
                ...styles.input,
                borderColor: isFocusedLocation ? "#FF6C00" : "#E8E8E8",
                paddingLeft: 25,
              }}
              onFocus={() => setIsFocusedLocation(true)}
              onBlur={() => setIsFocusedLocation(false)}
              value={location}
              textContentType={"location"}
              placeholder="Местность..."
              cursorColor={"#BDBDBD"}
              placeholderTextColor={"#BDBDBD"}
              onChangeText={locationHandler}
              onPressIn={() => navigation.navigate("Map")}
            ></TextInput>
            <Location style={styles.locationIcon} />
          </View>
          <TouchableOpacity
            style={{
              ...styles.button,
              width: windowWidth - 32,
              backgroundColor: isDisabledPublish ? "#F6F6F6" : "#FF6C00",
            }}
            onPress={onPublish}
          >
            <Text
              style={{
                ...styles.textButton,
                color: isDisabledPublish ? "#BDBDBD" : "#FFFFFF",
              }}
            >
              Опубликовать
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.deleteImg,
              backgroundColor: isDelete ? "#F6F6F6" : "#FF6C00",
            }}
            onPress={onDelete}
          >
            <Delete stroke={isDelete ? "#BDBDBD" : "#FFFFFF"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  section: {
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 16,
  },
  contentSection: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  contantTitle: {
    width: "100%",
    lignItems: "flex-start",
  },
  text: {
    marginTop: 8,
    marginBottom: 16,
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
  },
  input: {
    marginTop: 16,
    paddingTop: 0,
    paddingBottom: 0,
    height: 56,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto",
  },
  locationIcon: {
    position: "absolute",
    bottom: 16,
  },
  button: {
    height: 40,
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 100,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  deleteImg: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    width: 70,
    height: 40,
    borderRadius: 20,
  },
});
