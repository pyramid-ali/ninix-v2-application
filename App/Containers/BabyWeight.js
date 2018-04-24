import React, { Component } from 'react'
import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Swiper from '@nart/react-native-swiper'
import moment from 'moment'

import SkewedView from '../Components/SkewedView'
import Counter from '../Components/Counter'
import SuffixText from '../Components/SuffixText'
import DataAction from '../Redux/DataRedux'

// Styles
import styles from './Styles/BabyWeightStyle'
import Colors from '../Themes/Colors'


class BabyWeight extends Component {

  constructor (props) {
    super(props)
    const { weights } = this.props.data
    const today = weights[Object.keys(weights).sort().reverse()[0]]
    this.state = {
      counter: today ? today.value : 3000
    }
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

    return (
      <SkewedView degree={15}>
        { this.renderHighlightedText('Birth Weight', '3200', 'birth date: 1992/02/11') }
        { this.renderHighlightedText('Current Weight', '3600', 'last weighted: 6 days ago') }
      </SkewedView>
    )

  }

  renderInputPage () {

    return (
      <View style={[styles.container, styles.inputContainer]}>
        <Text style={styles.inputTitle}>What is your baby weight today?</Text>
        <Text style={styles.inputSubtitle}>track progress of your child gross by submitting today stats</Text>
        <Counter
          onPlusPress={() => this.setState({counter: this.state.counter + 50}, this.changeWeight.bind(this))}
          onMinusPress={() => this.setState({counter: this.state.counter - 50}, this.changeWeight.bind(this))}
        >
          <SuffixText
            containerStyle={{paddingVertical: 30}}
            textStyle={{fontSize: 64, fontFamily: 'DancingScript-Regular'}}
            suffixStyle={{color: 'black'}}
            suffix='gr'>
            { this.state.counter }
          </SuffixText>
        </Counter>
        { this.renderFooter() }
      </View>
    )

  }

  renderHighlightedText (title, text, subtitle) {
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <SuffixText
          textStyle={styles.focusText}
          suffixStyle={styles.suffix}
          suffix='gr'>
          {text}
        </SuffixText>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    )
  }

  changeWeight () {
    const { counter } = this.state
    this.props.addWeight(counter)
  }

  renderFooter() {
    const { weights } = this.props.data
    const today = weights[moment().format('YYYY-MM-DD')]

    return (
      <View
        style={{opacity: today ? 1 : 0}} >
        <TouchableOpacity
          onPress={() => this.props.removeWeight()} >
          <Text style={{paddingTop: 10, fontSize: 14, paddingHorizontal: 15, fontFamily: 'PoiretOne-Regular' , textAlign: 'center', color: Colors.secondary}}>Today's Weight set to: { today ? today.value : 'N/A' }gr</Text>
          <Text style={{paddingTop: 10, fontSize: 18, paddingHorizontal: 15, color: Colors.dark, fontFamily: 'PoiretOne-Regular' , textAlign: 'center'}}>Tap to remove</Text>
        </TouchableOpacity>
      </View>

    )
  }

}

const mapStateToProps = (state) => {
  const { data } = state
  return {
    data
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    addWeight: (value) => dispatch(DataAction.addWeight(value)),
    removeWeight: () => dispatch(DataAction.removeWeight())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BabyWeight)
