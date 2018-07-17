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
import Colors from '../Themes/Colors';
import styles from './Styles/BabyHeightStyle';

class BabyHeight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: DailyStatHelper.getLastStatFor(this.props.stats, 'height', 40),
    };
    this.changeHeight = _.debounce(this.changeHeight, 500);
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
    const lastHeight = DailyStatHelper.getLastStatFor(
      this.props.stats,
      'height'
    );
    const lastDate = DailyStatHelper.getLastDateFor(this.props.stats, 'height');
    return (
      <SkewedView degree={15}>
        {this.renderHighlightedText(
          'Birth Height',
          this.props.birthHeight || 'Unknown',
          `birth date: ${birthDate}`,
          this.props.birthHeight
        )}
        {this.renderHighlightedText(
          'Current Height',
          lastHeight || 'Not Measured yet',
          lastDate ? `last updated: ${lastDate}` : '',
          lastHeight
        )}
      </SkewedView>
    );
  }

  renderInputPage() {
    return (
      <View style={[styles.container, styles.inputContainer]}>
        <Text style={styles.inputTitle}>What is your baby height today?</Text>
        <Text style={styles.inputSubtitle}>
          track progress of your child gross by submitting today stats
        </Text>
        <Counter
          onPlusPress={() =>
            this.setState(
              { counter: this.state.counter + 1 },
              this.changeHeight.bind(this)
            )
          }
          onMinusPress={() =>
            this.setState(
              { counter: this.state.counter - 1 },
              this.changeHeight.bind(this)
            )
          }
        >
          <SuffixText
            containerStyle={{ paddingVertical: 30 }}
            textStyle={{ fontSize: 64, fontFamily: 'DancingScript-Regular' }}
            suffixStyle={{ color: 'black' }}
            suffix="cm"
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
          suffix={suffix ? 'cm' : ''}
        >
          {text}
        </SuffixText>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    );
  }

  changeHeight() {
    console.tron.log({ log: 'change height' });
    const { counter } = this.state;
    this.props.addHeight(counter);
  }

  renderFooter() {
    const todayHeight = DailyStatHelper.getTodayStatFor(
      this.props.stats,
      'height'
    );

    return (
      <View style={{ opacity: todayHeight ? 1 : 0 }}>
        <TouchableOpacity onPress={() => this.props.removeHeight()}>
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
            Today's Height set to: {todayHeight} cm
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
    birthHeight: baby.height,
    birthDate: baby.birthDate,
    stats: dailyStats.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addHeight: value => dispatch(DailyStatAction.set({ height: value })),
    removeHeight: () => dispatch(DailyStatAction.set({ height: null })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BabyHeight);
