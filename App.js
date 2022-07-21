import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Gauge from './src/screens/Gauge';

const App = () => {
  let [sample, setSample] = useState([
    {msg: 'empty', color: '#de14af'},
    {msg: 'nearing empty', color: '#228ed6'},
    {msg: 'really hungry', color: '#22d6be'},
    {msg: 'hungry', color: '#22d670'},
    // {msg: 'slightly hungry', color: '#c1e314'},
    // {msg: 'neutral', color: '#22d6be'},
    // {msg: 'slightly satisfied', color: '#22d670'},
    // {msg: 'satisfied', color: '#c1e314'},
    // {msg: 'full', color: '#22d6be'},
    // {msg: 'stuffed', color: '#22d670'},
  ]);
  let [rotateValOuter, setRotateValOuter] = useState(90);
  let [rotateValInner, setRotateValInner] = useState(90);
  let diffVal = 10;
  let degreeDiff = 270 / sample.length;
  let [selectedText, setSelectedText] = useState({
    id: '',
    color: undefined,
    data: undefined,
  });
  let [size, setSize] = useState(400);
  let [innerCircleSize, setInnerCircleSize] = useState(size - 50);
  const percentValue = parseInt((size * (diffVal / 4)) / 100);
  console.log('asssss', degreeDiff, innerCircleSize * 0.075, percentValue);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignSelf: 'center'}}>
        <View
          style={[
            styles.outerCircle,
            {
              width: innerCircleSize,
              height: innerCircleSize,
              borderRadius: innerCircleSize / 2,
            },
          ]}>
          {sample.map((data, index) => {
            if (index != 0) {
              rotateValOuter += diffVal;
              console.log('text rotate', rotateValOuter);
            }
            return (
              <>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedText({
                      id: index.toString(),
                      color: data.color.toString(),
                      data: data.msg.toString(),
                    })
                  }
                  style={[
                    styles.halfCircle,
                    {
                      backgroundColor: data.color.toString(),
                      width: innerCircleSize / 2,
                      height: innerCircleSize / 2,
                      borderBottomLeftRadius: innerCircleSize,
                      transform: [
                        index == 0
                          ? {translateX: 1}
                          : {
                              translateX: parseInt(
                                innerCircleSize * (90 / (rotateValOuter * 10)),
                              ),
                            },
                        {rotate: `${parseInt(rotateValOuter)}deg`},
                        index == 0
                          ? {translateX: -1}
                          : {
                              translateX: -parseInt(
                                innerCircleSize * (90 / (rotateValOuter * 10)),
                              ),
                            },
                      ],
                    },
                  ]}>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        transform: [{rotate: `180deg`}],
                        fontSize: percentValue,
                        alignSelf: 'flex-end',
                        padding:
                          index < 10 ? percentValue - 2 : percentValue - 3,
                      },
                    ]}>
                    {index.toString()}
                  </Text>
                </TouchableOpacity>
              </>
            );
          })}
          {/* <View
            style={[
              styles.innerCircle,
              {
                width: parseInt((70 / 100) * innerCircleSize),
                height: parseInt((70 / 100) * innerCircleSize),
                borderRadius: innerCircleSize,
              },
            ]}>
            <Text
              style={[
                styles.textStyle,
                selectedText.color != undefined
                  ? {color: selectedText.color}
                  : {color: 'black'},
                {fontSize: percentValue * 1.5},
              ]}>
              {selectedText.data != undefined
                ? selectedText.data.toString().toUpperCase()
                : ''}
            </Text>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  outerCircle: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 1,
    // transform: [{rotate: `180deg`}],
    // borderColor: 'black',
    // borderWidth: 1,
  },
  halfCircle: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#ff0000',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderColor: 'white',
    // borderWidth: 5,
    // overflow: 'hidden',
    left: 0,
    position: 'absolute',
    top: 0,
  },
  innerCircle: {
    alignItems: 'center',
    backgroundColor: 'white',
    // borderTopLeftRadius: 200,
    // borderTopRightRadius: 200,
    height: 75,
    // justifyContent: 'flex-end',
    overflow: 'hidden',
    paddingLeft: 3,
    paddingRight: 3,
    width: 150,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    // position: 'absolute',
  },
});

export default App;
