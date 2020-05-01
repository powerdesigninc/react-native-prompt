import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, SafeAreaView} from 'react-native';

import prompt from '@powerdesigninc/react-native-prompt';

const App = () => {
  const [input, setInput] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.result}>You typed: {input}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            prompt('Title', null, setInput);
          }}>
          <Text style={styles.text}>Only Title</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            prompt('Title', 'Message', setInput);
          }}>
          <Text style={styles.text}>Title, Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            prompt('Title', 'Message', setInput, 'secure-text');
          }}>
          <Text style={styles.text}>Title, Message, secure-text</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            prompt(
              'Title',
              'Message',
              setInput,
              'secure-text',
              '0000',
              'numeric',
            );
          }}>
          <Text style={styles.text}>
            Title, Message, secure-text, defaultValue, Number Keyboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            prompt('Title', 'Message', [{text: 'OK', onPress: setInput}]);
          }}>
          <Text style={styles.text}>One button</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            prompt('Title', 'Message', [
              {text: 'Button1', onPress: setInput},
              {text: 'Button2', onPress: setInput},
              {text: 'Button3', onPress: setInput, style: 'destructive'},
            ]);
          }}>
          <Text style={styles.text}>Three button</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flexGrow: 0,
    textAlign: 'center',
    margin: 12,
  },
  buttonContainer: {
    flexGrow: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 20,
    padding: 20,
    width: '80%',
    backgroundColor: '#5fc4b7',
  },
  text: {
    textAlign: 'center',
  },
});

export default App;
