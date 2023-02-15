import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./Routes/useRoute";

export default function App() {
  const routing = useRoute(false);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
