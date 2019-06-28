import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import Board from "./Components/Board/Board";
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Snake Game</Text>
      <Board />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    ...Platform.select({
      android: {
        marginVertical: 35
      }
    })
  },
  heading: {
    fontSize: 50,
    fontWeight: "600"
  }
});
