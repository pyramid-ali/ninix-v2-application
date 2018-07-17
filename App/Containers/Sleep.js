import { connect } from 'react-redux';
import Sound from 'react-native-sound';
import React, { Component } from 'react';
import Swiper from '@nart/react-native-swiper';
import { Slider, Icon } from 'react-native-elements';
import BackgroundTimer from 'react-native-background-timer';
import { View, Text, Image, StatusBar, Platform } from 'react-native';

// Models
import { sounds, durations } from '../Models';

// Dependencies
import Banner from '../Components/Banner';

// Styles
import styles from './Styles/SleepStyle';
import { Colors } from '../Themes/';

class Sleep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      playing: false,
      progress: 0,
      background: sounds[0].background,
      duration: durations[0].value,
      error: null,
    };

    Sound.setCategory('Playback');
  }

  componentDidMount() {
    StatusBar.setBackgroundColor(Colors.dark);
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.dark);
    });
  }

  componentWillUnmount() {
    this.stopSound();
    this._navListener.remove();
  }

  renderItem(item) {
    return (
      <View key={item.id} style={[styles.itemWrapper]}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Image style={styles.itemImage} source={item.source} />
      </View>
    );
  }

  render() {
    return (
      <View
        style={[styles.container, { backgroundColor: this.state.background }]}
      >
        <Banner
          title="Sleep Sounds"
          subtitle="play white noise sounds to sleep your baby"
          type="typical"
        />
        <View style={styles.middleContainer}>
          <Icon
            reverse
            containerStyle={{ margin: 0 }}
            name={this.state.playing ? 'stop' : 'play'}
            type="material-community"
            color={Colors.white}
            reverseColor={Colors.dark}
            size={30}
            onPress={this.play.bind(this)}
          />
          <Slider
            style={styles.slider}
            trackStyle={styles.trackStyle}
            minimumTrackTintColor="#F9690E"
            thumbStyle={styles.thumbStyle}
            value={this.state.progress}
            disabled
            onValueChange={progress => this.setState({ progress })}
          />
        </View>
        <Swiper
          style={styles.swiper}
          dotColor={'#ccc'}
          dotStyle={styles.swiperDot}
          activeDotColor={Colors.white}
          activeDotStyle={styles.swiperActiveDot}
          loop={false}
          onIndexChanged={index =>
            this.setState(
              { index, background: sounds[index].background },
              this.replay.bind(this)
            )
          }
        >
          {sounds.map(this.renderItem.bind(this))}
        </Swiper>
        <Icon
          containerStyle={styles.setting}
          name={'timer'}
          type="material-community"
          color={Colors.white}
          size={30}
          onPress={this.selectDuration.bind(this)}
        />
      </View>
    );
  }

  selectDuration() {
    this.props.navigation.navigate('ListPicker', {
      onChange: value =>
        this.setState({ duration: value }, this.replay.bind(this)),
      value: this.state.duration,
      backgroundHeader: Colors.dark,
      items: durations,
    });
  }

  play() {
    if (this.state.playing) {
      this.stopSound();
      return;
    }
    this.playSound();
  }

  replay() {
    if (this.state.playing) {
      this.stopSound();
      this.playSound();
    }
  }

  playSound() {
    this.sound = new Sound(
      sounds[this.state.index].sound,
      Sound.MAIN_BUNDLE,
      (error, props) => {
        if (error) {
          this.setState({ error });
          this.stopSound();
          return;
        }
        this.setTimerLoop(props.duration);
        this.setTracker();
        this.sound.play(() => {
          this.stopSound();
        });
        this.setState({ playing: true });
      }
    );
  }

  stopSound() {
    this.sound.stop(() => {
      this.sound.release();
      this.setState({ playing: false, progress: 0 });
      BackgroundTimer.clearTimeout(this.timeout);
      BackgroundTimer.clearInterval(this.trackerInterval);
    });
  }

  setTimerLoop(duration) {
    if (duration) {
      this.sound.setNumberOfLoops(
        Math.round((this.state.duration * 60) / duration - 1)
      );
    } else {
      this.sound.setNumberOfLoops(Infinity);
    }

    if (Platform.OS === 'android') {
      if (this.state.duration > 0) {
        this.timeout = BackgroundTimer.setTimeout(() => {
          this.stopSound();
          BackgroundTimer.clearTimeout(this.timeout);
          this.timeout = null;
        }, this.state.duration * 60 * 1000);
      }
    }
  }

  setTracker() {
    if (this.state.duration > 0) {
      this.trackerInterval = BackgroundTimer.setInterval(() => {
        this.setState({
          progress: this.state.progress + 1 / (this.state.duration * 60),
        });
      }, 1000);
    }
  }
}

Sleep.navigationOptions = {
  tabBarLabel: 'Sleep',
  tabBarIcon: ({ tintColor }) => (
    <Icon size={20} type="material-community" name="sleep" color={tintColor} />
  ),
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sleep);
