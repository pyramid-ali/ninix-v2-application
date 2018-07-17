import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Swiper from '@nart/react-native-swiper';
import moment from 'moment';
import _ from 'lodash';

import DailyStatHelper from '../Transform/DailyStatHelper';
import SkewedView from '../Components/SkewedView';
import Counter from '../Components/Counter';
import SuffixText from '../Components/SuffixText';
import DailyStatAction from '../Redux/DailyStatRedux';

// Styles
import styles from './Styles/BabyWeightStyle';
import Colors from '../Themes/Colors';

class BabyWeight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: DailyStatHelper.getLastStatFor(this.props.stats, 'weight', 3000),
    };
    this.changeWeight = _.debounce(this.changeWeight, 500);
  }

  componentDidMount() {
    StatusBar.setBackgroundColor(Colors.secondary);
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.secondary);
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <Swiper
        horizontal={false}
        loop={false}
        index={0}
        style={styles.container}
        showsPagination={false}
        showsButtons={false}
      >
        {this.renderAtAGlancePage()}
        {this.renderInputPage()}
      </Swiper>
    );
  }

  renderAtAGlancePage() {
    const birthDate = this.props.birthDate
      ? moment(this.props.birthDate).format('YYYY/MM/DD')
      : 'Unknown';
    const lastWeight = DailyStatHelper.getLastStatFor(
      this.props.stats,
      'weight'
    );
    const lastDate = DailyStatHelper.getLastDateFor(this.props.stats, 'weight');
    return (
      <SkewedView degree={15}>
        {this.renderHighlightedText(
          'Birth Weight',
          this.props.birthWeight || 'Unknown',
          `birth date: ${birthDate}`,
          this.props.birthWeight
        )}
        {this.renderHighlightedText(
          'Current Weight',
          lastWeight || 'Not weighted yet',
          lastDate ? `last updated: ${lastDate}` : '',
          lastWeight
        )}
      </SkewedView>
    );
  }

  renderInputPage() {
    return (
      <View style={[styles.container, styles.inputContainer]}>
        <Text style={styles.inputTitle}>What is your baby weight today?</Text>
        <Text style={styles.inputSubtitle}>
          track progress of your child gross by submitting today stats
        </Text>
        <Counter
          onPlusPress={() =>
            this.setState(
              { counter: this.state.counter + 50 },
              this.changeWeight.bind(this)
            )
          }
          onMinusPress={() =>
            this.setState(
              { counter: this.state.counter - 50 },
              this.changeWeight.bind(this)
            )
          }
        >
          <SuffixText
            containerStyle={{ paddingVertical: 30 }}
            textStyle={{ fontSize: 64, fontFamily: 'DancingScript-Regular' }}
            suffixStyle={{ color: 'black' }}
            suffix="gr"
          >
            {this.state.counter}
          </SuffixText>
        </Counter>
        {this.renderFooter()}
      </View>
    );
  }

  renderHighlightedText(title, text, subtitle, suffix) {
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <SuffixText
          textStyle={styles.focusText}
          suffixStyle={styles.suffix}
          suffix={suffix ? 'gr' : ''}
        >
          {text}
        </SuffixText>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    );
  }

  changeWeight() {
    console.tron.log({ log: 'change weight' });
    const { counter } = this.state;
    this.props.addWeight(counter);
  }

  renderFooter() {
    const todayWeight = DailyStatHelper.getTodayStatFor(
      this.props.stats,
      'weight'
    );

    return (
      <View style={{ opacity: todayWeight ? 1 : 0 }}>
        <TouchableOpacity onPress={() => this.props.removeWeight()}>
          <Text
            style={{
              paddingTop: 10,
              fontSize: 14,
              paddingHorizontal: 15,
              fontFamily: 'PoiretOne-Regular',
              textAlign: 'center',
              color: Colors.secondary,
            }}
          >
            Today's Weight set to: {todayWeight} gr
          </Text>
          <Text
            style={{
              paddingTop: 10,
              fontSize: 18,
              paddingHorizontal: 15,
              color: Colors.dark,
              fontFamily: 'PoiretOne-Regular',
              textAlign: 'center',
            }}
          >
            Tap to remove
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { dailyStats, baby } = state;
  return {
    birthWeight: baby.weight,
    birthDate: baby.birthDate,
    stats: dailyStats.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addWeight: value => dispatch(DailyStatAction.set({ weight: value })),
    removeWeight: () => dispatch(DailyStatAction.set({ weight: null })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BabyWeight);
