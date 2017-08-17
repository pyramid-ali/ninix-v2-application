import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native'
import styles from './Styles/CharacterInputSerieStyle'

export default class CharacterInputSerie extends Component {
  // Prop type warnings
  static propTypes = {
    size: PropTypes.number.isRequired,
    containerStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ]),
    disabled: PropTypes.bool
  }

  // Defaults for props
  static defaultProps = {
    containerStyle: null,
    disabled: false
  }
  constructor(props) {
    super(props)
    this.codeArray = new Array(props.size)
  }

  render () {
    const { size, containerStyle, disabled } = this.props
    const placeholder = ['C', 'O', 'D', 'E']

    return (
      <View style={[styles.container, containerStyle]}>
        {Array.from(new Array(size), (value, index) => (index)).map((index) => {
          return (
            <TextInput
              ref={index}
              editable={!disabled}
              keyboardType="numeric"
              returnKeyType="next"
              key={index}
              maxLength={1}
              underlineColorAndroid="transparent"
              selectionColor="black"
              placeholderTextColor='#ccc'
              style={styles.input}
              placeholder={placeholder[index]}
              onChangeText={(text) => this.textInputChange(text, index)}
            />
          )
        })}
      </View>
    )
  }

  getCodeFromArray() {
    return this.codeArray.join('')
  }

  textInputChange(text, index) {
    const { onFinish, size } = this.props
    this.codeArray[index] = text
    const code = this.getCodeFromArray()
    if(code.length === size) {
      onFinish(code)
      this.refs[index].blur()
    }
    else {
      if(text.length && index < size - 1) {
        this.refs[index + 1].focus()
      }
      else if (text.length === 0 && index > 0) {
        this.refs[index - 1].focus()
      }
    }
  }
}
