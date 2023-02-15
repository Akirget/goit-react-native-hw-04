import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";

import { PostsScreen } from "../Screens/Main/PostsScreen";
import { CreatePostsScreen } from "../Screens/Main/CreatePostsScreen";
import { ProfileScreen } from "../Screens/Main/ProfileScreen";

import Left from "../assets/images/left.svg";
import Grid from "../assets/images/grid.svg";
import User from "../assets/images/user.svg";
import Plus from "../assets/images/plus.svg";
import Logout from "../assets/images/logout.svg";

const BottomTab = createBottomTabNavigator();

export const BottomMenu = ({ navigation }) => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 80, justifyContent: "center" },
        headerTitleAlign: "center",

        headerRightContainerStyle: { paddingRight: 16, paddingBottom: 9 },
        headerLeftContainerStyle: { paddingLeft: 16, paddingBottom: 9 },
      }}
    >
      <BottomTab.Screen
        name="Публикации"
        component={PostsScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <Grid
                size={size}
                color={color}
                strokeOpacity={0.8}
                stroke={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
          headerRight: ({ focused, size, color }) => (
            <TouchableOpacity>
              <Logout size={size} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
      <BottomTab.Screen
        name="Создать публикацию"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <Plus
                size={size}
                color={color}
                fillOpacity={0.8}
                fill={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
          headerLeft: ({ focused, size, color }) => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Left size={size} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <User
                size={size}
                color={color}
                stroke={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
