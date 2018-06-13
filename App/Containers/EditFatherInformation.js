import React, { Component } from 'react'
import { ScrollView, Text, View, StatusBar, DatePickerAndroid, ActivityIndicator, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {Input, Icon, Header, ListItem} from 'react-native-elements'
import moment from 'moment'
import _ from 'lodash'

// Styles
import styles from './Styles/EditFatherInformationStyle'
import Colors from '../Themes/Colors'
import DefaultTextInput from "../Components/DefaultTextInput";

class EditFatherInformation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      birthDate: null
    }
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.secondary)
    })
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  onChangeText (state) {
    return (text) => this.setState({[state]: text})
  }

  submit () {
    Keyboard.dismiss()
    this.props.saveInformation(this.state)
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <Header
          statusBarProps={{ backgroundColor: Colors.secondary }}
          backgroundColor={Colors.primary}
          leftComponent={{ icon: 'clear', color: '#fff', onPress: this.cancel.bind(this) }}
          centerComponent={{ text: 'Edit Information', style: { color: '#fff' } }}
          rightComponent={this.props.baby.fetch ?
            <ActivityIndicator color='#fff' size={18} /> :
            { icon: 'check', color: '#fff', onPress: this.submit.bind(this) }}
        />

        <ScrollView style={styles.container}>

          { this.props.baby.error ?
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{ this.props.baby.error }</Text>
            </View> :
            null
          }


          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>GENERAL</Text>
          </View>

          <View style={styles.section}>
            <DefaultTextInput
              label="name"
              placeholder='Name?'
              icon='pencil-circle'
              value={this.state.name}
              onChangeText={this.onChangeText('name')}
            />
          </View>

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>OTHER</Text>
          </View>

          <View style={styles.section}>
            <ListItem
              title='Birth Date'
              rightTitle={ this.state.birthDate ? moment(this.state.birthDate).format('YYYY-MM-DD') : 'N/A'}
              rightTitleStyle={[styles.labelStyle, {fontSize: 12}]}
              titleStyle={styles.labelStyle}
              leftIcon={{ name: 'cake-variant', type: 'material-community' }}
              chevron
              onPress={() => {
                try {

                  DatePickerAndroid.open({
                    date: new Date()
                  }).then(res => this.setState({birthDate: moment(_.pick(res, ['year', 'month', 'day']))}))

                } catch ({code, message}) {
                  console.warn('Cannot open date picker', message);
                }
              }}
            />
          </View>

        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditFatherInformation)
