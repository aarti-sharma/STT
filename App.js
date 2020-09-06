import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Voice from '@react-native-community/voice';
class App extends Component {
  state = {
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
  };

  constructor(props) {
    super(props);
    //Setting callbacks for the process status
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
  onSpeechStart = (e) => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart:::::: ', e);
    this.setState({
      started: 'Speech started',
    });
  };

  onSpeechEnd = (e) => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd:::::: ', e);
    this.setState({
      end: 'Speech end',
    });
  };

  onSpeechError = (e) => {
    //Invoked when an error occurs.
    console.log('onSpeechError::::: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults::::::: ', e);
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = (e) => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults::::::: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e) => {
    //Invoked when pitch that is recognized changed
    console.log('onSpeechVolumeChanged::::::::pitch ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    this.setState({
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
    this.setState({
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Speech to Text</Text>
          <View
            style={{
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#2E86C1',
                }}>
                {'Started:'}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#166e2e',
                }}>
                {this.state.started}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#2E86C1',
                }}>
                {'End:    '}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fc291e',
                }}>
                {this.state.end}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            {/*<Text*/}
            {/*  style={{*/}
            {/*    flex: 1,*/}
            {/*    textAlign: 'center',*/}
            {/*    color: '#B0171F',*/}
            {/*  }}>{`Pitch \n ${this.state.pitch}`}</Text>*/}
            {/*<Text*/}
            {/*  style={{*/}
            {/*    flex: 1,*/}
            {/*    textAlign: 'center',*/}
            {/*    color: '#2E86C1',*/}
            {/*  }}>{`Error \n ${this.state.error}`}</Text>*/}
          </View>
          {/*<TouchableHighlight*/}
          {/*  onPress={this._startRecognizing}*/}
          {/*  style={{*/}
          {/*    marginVertical: 20,*/}
          {/*   }}>*/}
          {/*  <Image source={require('./src/image/mike.png')} style={{width:50,height:60}} />*/}

          {/*</TouchableHighlight>*/}
          <Text
            style={{
              textAlign: 'center',
              color: '#2E86C1',
              marginBottom: 1,
              fontWeight: '700',
            }}>
            Partial Results
          </Text>
          <View
            style={{
              margin: 10,
              height: 150,
              width: '100%',
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            {this.state.partialResults.map((result, index) => {
              return (
                <Text
                  key={`partial-result-${index}`}
                  style={{
                    textAlign: 'center',
                    color: '#2E86C1',
                    marginBottom: 1,
                    fontWeight: '700',
                  }}>
                  {result}
                </Text>
              );
            })}
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: '#2E86C1',
              marginBottom: 1,
              fontWeight: '700',
            }}>
            Results
          </Text>
          <View
            style={{
              margin: 10,
              height: 150,
              width: '100%',
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            {this.state.results.map((result, index) => {
              return (
                <Text key={`result-${index}`} style={styles.stat}>
                  {result}
                </Text>
              );
            })}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'space-between',
              position: 'absolute',
              bottom: 0,
            }}>
            <TouchableHighlight
              onPress={this._startRecognizing}
              style={{flex: 1, backgroundColor: 'red'}}>
              <Text style={styles.action}>Start</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._stopRecognizing}
              style={{flex: 1, backgroundColor: 'red'}}>
              <Text style={styles.action}>Stop</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._cancelRecognizing}
              style={{flex: 1, backgroundColor: 'red'}}>
              <Text style={styles.action}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._destroyRecognizer}
              style={{flex: 1, backgroundColor: 'red'}}>
              <Text style={styles.action}>Destroy</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 8,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#2E86C1',
    marginBottom: 1,
    marginTop: 30,
  },
});
export default App;
