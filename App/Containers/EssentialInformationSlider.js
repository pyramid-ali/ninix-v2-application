import React, { Component } from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EssentialInformationSliderStyle'
import SingleInputPage from '../Components/SingleInputPage';

class EssentialInformationSlider extends Component {

  constructor (props) {
    super(props)
    this.state = {
      step: 0,
      height: ''
    }

    this.lastStep = 4
  }

  componentDidMount () {
    console.tron.log({children: this.props.children})
  }

  render () {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        behavior='position'
      >
        <View style={styles.contentWrapper}>
          <View style={styles.leftSide}>
            <View style={styles.item}>
              <Text style={styles.itemTitle}>Height</Text>
              <Text style={styles.itemValue}>{ this.state.height || '-' } cm</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemTitle}>Weight</Text>
              <Text style={styles.itemValue}>3200 gr</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemTitle}>Head</Text>
              <Text style={styles.itemValue}>3200 gr</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemTitle}>Gestation</Text>
              <Text style={styles.itemValue}>26 years</Text>
            </View>
          </View>
          <View style={styles.rightSide}>
            <SingleInputPage title='Height' suffix='cm' value={this.state.height} onChange={value => {
              console.tron.log({value})
              this.setState({height: value})
            }}/>
          </View>
        </View>
        { this.renderFooter() }
      </KeyboardAvoidingView>
    )
  }

  renderStep () {
    switch (this.state.step) {
      case 0:
        return
      case 1:
        return
      case 2:
        return
    }
  }

  renderFooter () {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerBack}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerSkip}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerApply}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EssentialInformationSlider)
