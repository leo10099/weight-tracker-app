import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Containers
import IdealWeight from "./containers/IdealWeight";

// Utils
import { colors } from "./utils/theme";

export default function App() {
  return (
    <View style={styles.container}>
      <IdealWeight />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
});
