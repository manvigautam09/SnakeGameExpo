import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");

const board = [
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
    ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29"],
    ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39"],
    ["40", "41", "42", "43", "44", "45", "46", "47", "48", "49"],
    ["50", "51", "52", "53", "54", "55", "56", "57", "58", "59"],
    ["60", "61", "62", "63", "64", "65", "66", "67", "68", "69"],
    ["70", "71", "72", "73", "74", "75", "76", "77", "78", "79"],
    ["80", "81", "82", "83", "84", "85", "86", "87", "88", "89"],
    ["90", "91", "92", "93", "94", "95", "96", "97", "98", "99"]
  ],
  snakePosition = [],
  foodPosition = "",
  displayFlag = 0,
  direction = "";
let length = 0;
var up, down, left, right;
export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board,
      snakePosition,
      foodPosition,
      displayFlag,
      direction
    };
  }

  generateFood() {
    const fPosition = Math.floor(Math.random() * 100);
    if (
      fPosition < 10 ||
      fPosition > 90 ||
      fPosition % 10 === 0 ||
      fPosition % 10 === 9 ||
      this.state.snakePosition.includes(String(fPosition))
    ) {
      this.generateFood();
      return;
    }
    const foodPosition = String(fPosition);

    this.setState({ foodPosition });
  }
  getSnakeHeadPosition() {
    const snakeHead = this.state.snakePosition[0];
    const snakeHeadInteger = parseInt(this.state.snakePosition[0]);
    return snakeHeadInteger;
  }
  upMovementLoop() {
    up = setTimeout(this.snakeUpwardMove, 1000);
  }
  upMovementTerminate() {
    clearTimeout(up);
  }
  downMovementLoop() {
    down = setTimeout(this.snakeDownwardMove, 1000);
  }
  downMovementTerminate() {
    clearTimeout(down);
  }
  leftMovementLoop() {
    left = setTimeout(this.snakeLeftMove, 1000);
  }
  leftMovementTerminate() {
    clearTimeout(left);
  }
  rightMovementLoop() {
    right = setTimeout(this.snakeRightMove, 1000);
  }
  rightMovementTerminate() {
    clearTimeout(right);
  }
  snakeUpwardMove = () => {
    this.setState({ direction: "up" });
    this.leftMovementTerminate();
    this.rightMovementTerminate();
    this.downMovementTerminate();
    const snakeHeadInteger = this.getSnakeHeadPosition();
    let newSnakeHeadInteger;
    if (snakeHeadInteger < 10) {
      newSnakeHeadInteger = snakeHeadInteger + 90;
    } else {
      newSnakeHeadInteger = snakeHeadInteger - 10;
    }

    const newSnakeHead = String(newSnakeHeadInteger);
    if (newSnakeHead == this.state.snakePosition[1]) {
      return;
    }
    if (this.state.snakePosition.includes(newSnakeHead)) {
      length = this.state.snakePosition.length;
      this.setState({ displayFlag: 1 });
      this.setState({
        board,
        snakePosition,
        foodPosition
      });
      return;
    }
    if (newSnakeHead == this.state.foodPosition) {
      this.generateFood();
      const snakePosition = this.state.snakePosition;
      snakePosition.unshift(newSnakeHead);
      this.setState({ snakePosition }, () => this.upMovementLoop());
    } else {
      const snakePosition = this.state.snakePosition;
      snakePosition.unshift(newSnakeHead);
      snakePosition.pop();
      this.setState({ snakePosition }, () => this.upMovementLoop());
    }
  };

  snakeLeftMove = () => {
    this.setState({ direction: "left" });
    this.upMovementTerminate();
    this.downMovementTerminate();
    this.rightMovementTerminate();
    const snakeHeadInteger = this.getSnakeHeadPosition();
    let newSnakeHeadInteger;
    if (snakeHeadInteger % 10 == 0) {
      newSnakeHeadInteger = snakeHeadInteger + 9;
    } else {
      newSnakeHeadInteger = snakeHeadInteger - 1;
    }
    const newSnakeHead = String(newSnakeHeadInteger);
    if (newSnakeHead == this.state.snakePosition[1]) {
      return;
    }
    if (this.state.snakePosition.includes(newSnakeHead)) {
      length = this.state.snakePosition.length;
      this.setState({ displayFlag: 1 });
      this.setState({
        board,
        snakePosition,
        foodPosition
      });
      return;
    }
    if (newSnakeHead == this.state.foodPosition) {
      this.generateFood();
      const snakePosition = this.state.snakePosition;
      snakePosition.unshift(newSnakeHead);
      this.setState({ snakePosition }, () => this.leftMovementLoop());
    } else {
      const snakePosition = this.state.snakePosition;
      snakePosition.unshift(newSnakeHead);
      snakePosition.pop();
      this.setState({ snakePosition }, () => this.leftMovementLoop());
    }
  };
  snakeRightMove = () => {
    this.setState({ direction: "right" });
    this.upMovementTerminate();
    this.downMovementTerminate();
    this.leftMovementTerminate();
    const snakeHeadInteger = this.getSnakeHeadPosition();
    let newSnakeHeadInteger;
    if (snakeHeadInteger % 10 == 9) {
      newSnakeHeadInteger = snakeHeadInteger - 9;
    } else {
      newSnakeHeadInteger = snakeHeadInteger + 1;
    }

    const newSnakeHead = String(newSnakeHeadInteger);
    if (newSnakeHead == this.state.snakePosition[1]) {
      return;
    }
    if (this.state.snakePosition.includes(newSnakeHead)) {
      length = this.state.snakePosition.length;
      this.setState({ displayFlag: 1 });
      this.setState({
        board,
        snakePosition,
        foodPosition
      });
      return;
    }
    if (newSnakeHead == this.state.foodPosition) {
      this.generateFood();
      const snakePosition = this.state.snakePosition;
      snakePosition.unshift(newSnakeHead);
      this.setState({ snakePosition }, () => this.rightMovementLoop());
    } else {
      const snakePosition = this.state.snakePosition;
      snakePosition.unshift(newSnakeHead);
      snakePosition.pop();
      this.setState({ snakePosition }, () => this.rightMovementLoop());
    }
  };
  snakeDownwardMove = () => {
    this.setState({ direction: "down" });
    this.upMovementTerminate();
    this.leftMovementTerminate();
    this.rightMovementTerminate();
    const snakeHeadInteger = this.getSnakeHeadPosition();
    let newSnakeHeadInteger;
    if (snakeHeadInteger > 89) {
      newSnakeHeadInteger = snakeHeadInteger - 90;
    } else {
      newSnakeHeadInteger = snakeHeadInteger + 10;
    }

    const newSnakeHead = String(newSnakeHeadInteger);
    if (newSnakeHead == this.state.snakePosition[1]) {
      return;
    }
    if (this.state.snakePosition.includes(newSnakeHead)) {
      length = this.state.snakePosition.length;
      this.setState({ displayFlag: 1 });
      this.setState({
        board,
        snakePosition,
        foodPosition
      });
      return;
    }
    if (newSnakeHead == this.state.foodPosition) {
      this.generateFood();
      const snakePosition = this.state.snakePosition;
      snakePosition.unshift(newSnakeHead);
      this.setState({ snakePosition }, () => this.downMovementLoop());
    } else {
      const snakePosition = this.state.snakePosition;
      snakePosition.unshift(newSnakeHead);
      snakePosition.pop();
      this.setState({ snakePosition }, () => this.downMovementLoop());
    }
  };

  startGame() {
    length = 0;
    this.setState({ displayFlag: 0 });
    const snakePosition = ["54", "64", "74"];
    this.setState({ snakePosition }, () => {
      this.snakeUpwardMove();
      this.generateFood();
    });
  }
  render() {
    console.log(this.state.snakePosition, "snakePosition");
    return (
      <View style={styles.container}>
        <View style={styles.snakeGameContainer}>
          {this.state.board.map((item, index) => {
            return (
              <View key={index} style={styles.simple}>
                {item.map((position, i) => {
                  return (
                    <View
                      key={i}
                      style={[
                        styles.boardMatrices,
                        {
                          backgroundColor: this.state.snakePosition.includes(
                            position
                          )
                            ? "red"
                            : "skyblue"
                        }
                      ]}
                    >
                      {position == this.state.foodPosition ? (
                        <Text>F</Text>
                      ) : null}
                      {position == this.state.snakePosition[0] ? (
                        <Text>H</Text>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
        <View style={styles.lowerPart}>
          <View style={styles.simple}>
            <Button title="Start" onPress={() => this.startGame()} />
            {/* <Button title="Pause" /> */}
          </View>
          <View style={styles.simple}>
            <Button
              style={{ marginTop: 15 }}
              icon={<Icon name="arrow-left" size={15} color="white" />}
              onPress={
                this.state.direction == "left"
                  ? null
                  : () => this.snakeLeftMove()
              }
            />
            <View>
              <Button
                icon={<Icon name="arrow-up" size={15} color="white" />}
                onPress={
                  this.state.direction == "up"
                    ? null
                    : () => this.snakeUpwardMove()
                }
              />
              <Button
                icon={<Icon name="arrow-down" size={15} color="white" />}
                onPress={
                  this.state.direction == "down"
                    ? null
                    : () => this.snakeDownwardMove()
                }
              />
            </View>
            <Button
              style={{ marginTop: 15 }}
              icon={<Icon name="arrow-right" size={15} color="white" />}
              onPress={
                this.state.direction == "right"
                  ? null
                  : () => this.snakeRightMove()
              }
            />
          </View>
        </View>
        {this.state.displayFlag == 1 ? (
          <View>
            <Text>Game Over</Text>
            <Text>Score={length}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {},
  snakeGameContainer: {
    marginTop: 100,
    height: 300,
    width: 300
  },
  indicators: {
    flexDirection: "row",
    alignItems: "center"
  },
  boardMatrices: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  },
  simple: { flexDirection: "row" },
  lowerPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20
  }
});
