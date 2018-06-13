import React, { Component } from 'react'
import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Swiper from '@nart/react-native-swiper'
import moment from 'moment'
import _ from 'lodash'

import DailyStatHelper from '../Transform/DailyStatHelper'
import SkewedView from '../Components/SkewedView'
import Counter from '../Components/Counter'
import SuffixText from '../Components/SuffixText'
import DailyStatAction from '../Redux/DailyStatRedux'

// Styles
import Colors from '../Themes/Colors'
import styles from './Styles/BabyHeadStyle'

class BabyHead extends Component {

  constructor (props) {
    super(props)
    this.state = {
      counter: DailyStatHelper.getLastStatFor(this.props.stats, 'head', 30)
    }
    this.changeHead = _.debounce(this.changeHead, 500)
  }

  componentDidMount() {
    StatusBar.setBackgroundColor(Colors.secondary)
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.secondary)
    })
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  render () {

    return (
      <Swiper
        horizontal={false}
        loop={false}
        index={0}
        style={styles.container}
        showsPagination={false}
        showsButtons={false}
      >

        { this.renderAtAGlancePage() }
        { this.renderInputPage() }

      </Swiper>
    )
  }

  renderAtAGlancePage () {
    const birthDate = this.props.birthDate ? moment(this.props.birthDate).format('YYYY/MM/DD') : 'Unknown'
    const lastHead = DailyStatHelper.getLastStatFor(this.props.stats, 'head')
    const lastDate = DailyStatHelper.getLastDateFor(this.props.stats, 'head')
    return (
      <SkewedView degree={15}>
        { this.renderHighlightedText(
          'Birth Head',
          this.props.birthHead || 'Unknown',
          `birth date: ${birthDate}`,
          this.props.birthHead)
        }
        { this.renderHighlightedText(
          'Current Head',
          lastHead || 'Not measured yet' ,
          lastDate ? `last updated: ${lastDate}` : '',
          lastHead)
        }
      </SkewedView>
    )

  }

  renderInputPage () {

    return (
      <View style={[styles.container, styles.inputContainer]}>
        <Text style={styles.inputTitle}>What is your baby head today?</Text>
        <Text style={styles.inputSubtitle}>track progress of your child gross by submitting today stats</Text>
        <Counter
          onPlusPress={() => this.setState({counter: this.state.counter + 1}, this.changeHead.bind(this))}
          onMinusPress={() => this.setState({counter: this.state.counter - 1}, this.changeHead.bind(this))}
        >
          <SuffixText
            containerStyle={{paddingVertical: 30}}
            textStyle={{fontSize: 64, fontFamily: 'DancingScript-Regular'}}
            suffixStyle={{color: 'black'}}
            suffix='cm'>
            { this.state.counter }
          </SuffixText>
        </Counter>
        { this.renderFooter() }
      </View>
    )

  }

  renderHighlightedText (title, text, subtitle, suffix) {
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <SuffixText
          textStyle={styles.focusText}
          suffixStyle={styles.suffix}
          suffix={suffix ? 'cm' : ''}>
          {text}
        </SuffixText>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    )
  }

  changeHead () {
    const { counter } = this.state
    this.props.addHead(counter)
  }

  renderFooter() {
    const todayHead = DailyStatHelper.getTodayStatFor(this.props.stats, 'head')

    return (
      <View
        style={{opacity: todayHead ? 1 : 0}} >
        <TouchableOpacity
          onPress={() => this.props.removeHead()} >
          <Text style={{paddingTop: 10, fontSize: 14, paddingHorizontal: 15, fontFamily: 'PoiretOne-Regular' , textAlign: 'center', color: Colors.secondary}}>Today's Head set to: { todayHead } cm</Text>
          <Text style={{paddingTop: 10, fontSize: 18, paddingHorizontal: 15, color: Colors.dark, fontFamily: 'PoiretOne-Regular' , textAlign: 'center'}}>Tap to remove</Text>
        </TouchableOpacity>
      </View>

    )
  }

}

const mapStateToProps = (state) => {
  const { dailyStats, baby } = state
  return {
    birthHead: baby.head,
    birthDate: baby.birthDate,
    stats: dailyStats.data
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    addHead: (value) => dispatch(DailyStatAction.set({head: value})),
    removeHead: () => dispatch(DailyStatAction.set({head: null}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BabyHead)
