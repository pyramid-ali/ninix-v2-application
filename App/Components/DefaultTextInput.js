import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import styles from './Styles/DefaultTextInputStyle'
import Colors from "../Themes/Colors"

export default class DefaultTextInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      focus: ''
    }
  }

  render () {

    const { placeholder, label, icon, suffix, onChangeText, value } = this.props

    return (
      <Input
        placeholder={placeholder}
        autoCapatilize
        label={label}
        labelStyle={styles.labelStyle}
        selectionColor={Colors.dark}
        containerStyle={{marginLeft: 15, marginVertical: 15}}
        placeholderTextColor={Colors.gray}
        inputStyle={{fontFamily: 'PoiretOne-Regular', padding: 0}}
        onFocus={() => this.setState({focus: true})}
        onBlur={() => this.setState({focus: false})}
        onChangeText={onChangeText}
        inputContainerStyle={[styles.inputContainer, {borderBottomColor: this.state.focus ? Colors.primary : Colors.gray}]}
        value={typeof value === 'number' ? value + '' : value}
        leftIcon={
          <Icon
            type='material-community'
            name={icon}
            size={24}
            color='black'
          />
        }
        rightIcon={
          <Text style={styles.suffix}>{ suffix }</Text>
        }
      />
    )
  }

}

DefaultTextInput.defaultProps = {

}

DefaultTextInput.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  suffix: PropTypes.string,
  onChangeText: PropTypes.func.isRequired
}

