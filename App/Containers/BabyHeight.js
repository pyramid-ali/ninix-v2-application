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
import Colors from '../Themes/Colors'

// Styles
import styles from './Styles/BabyHeightStyle'

class BabyHeight extends Component {

  constructor (props) {
    super(props)
    const { heights } = this.props.data
    const today = heights[Object.keys(heights).sort().reverse()[0]]
    this.state = {
      counter: today ? today.value : 45
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
        { this.renderHighlightedText('Birth Height', '45', 'birth date: 1992/02/11') }
        { this.renderHighlightedText('Current Height', '50', 'last height record: 6 days ago') }
      </SkewedView>
    )

  }

  renderInputPage () {

    return (
      <View style={[styles.container, styles.inputContainer]}>
        <Text style={styles.inputTitle}>What is your baby height today?</Text>
        <Text style={styles.inputSubtitle}>track progress of your child gross by submitting today stats</Text>
        <Counter
          onPlusPress={() => this.setState({counter: this.state.counter + 1}, this.changeWeight.bind(this))}
          onMinusPress={() => this.setState({counter: this.state.counter - 1}, this.changeWeight.bind(this))}
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

  renderHighlightedText (title, text, subtitle) {
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <SuffixText
          textStyle={styles.focusText}
          suffixStyle={styles.suffix}
          suffix='cm'>
          {text}
        </SuffixText>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    )
  }

  changeWeight () {
    const { counter } = this.state
    this.props.addHeight(counter)
  }

  renderFooter() {
    const { heights } = this.props.data
    const today = heights[moment().format('YYYY-MM-DD')]

    return (
      <View
        style={{opacity: today ? 1 : 0}} >
        <TouchableOpacity
          onPress={() => this.props.removeHeight()} >
          <Text style={{paddingTop: 10, fontSize: 14, paddingHorizontal: 15, fontFamily: 'PoiretOne-Regular' , textAlign: 'center', color: Colors.secondary}}>Today's Height set to: { today ? today.value : 'N/A' }cm</Text>
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
    addHeight: (value) => dispatch(DataAction.addHeight(value)),
    removeHeight: () => dispatch(DataAction.removeHeight())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BabyHeight)
