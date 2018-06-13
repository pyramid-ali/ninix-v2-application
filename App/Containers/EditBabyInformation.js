import React, { Component } from 'react'
import { ScrollView, Text, View, StatusBar, DatePickerAndroid, ActivityIndicator, Keyboard, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Header, ListItem } from 'react-native-elements'
import _ from 'lodash'
import moment from 'moment'

// Dependencies
import BabyAction from '../Redux/BabyRedux'
import DefaultTextInput from '../Components/DefaultTextInput'

// Styles
import styles from './Styles/EditBabyInformationStyle'
import Colors from '../Themes/Colors'


class EditBabyInformation extends Component {
  constructor (props) {
    super(props)
    const { baby } = this.props
    this.state = {
      name: baby.name,
      weight: baby.weight,
      height: baby.height,
      head: baby.head,
      gestation: baby.gestation,
      gender: baby.gender,
      birthDate: baby.birthDate,
      number: baby.number
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.tron.log({prevProps, props: this.props})
    if (prevProps.baby.fetch && !this.props.baby.fetch) {
      const { baby } = this.props
      this.setState({
        name: baby.name,
        weight: baby.weight,
        height: baby.height,
        head: baby.head,
        gestation: baby.gestation,
        gender: baby.gender,
        birthDate: baby.birthDate,
        number: baby.number
      })
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
              placeholder='What is your baby name?'
              icon='pencil-circle'
              value={this.state.name}
              onChangeText={this.onChangeText('name')}
            />
          </View>

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>BIRTH DATE</Text>
          </View>

          <View style={styles.section}>

            <DefaultTextInput
              label="weight"
              placeholder='Weight in birthday?'
              icon='weight-kilogram'
              value={this.state.weight}
              onChangeText={this.onChangeText('weight')}
            />

            <DefaultTextInput
              label="height"
              placeholder='Height in birthday?'
              icon='trending-up'
              value={this.state.height}
              onChangeText={this.onChangeText('height')}
            />

            <DefaultTextInput
              label="head"
              placeholder='Head in birthday?'
              icon='face'
              value={this.state.head}
              onChangeText={this.onChangeText('head')}
            />

            <DefaultTextInput
              label="gestation"
              placeholder='What is gestation year?'
              icon='coins'
              value={this.state.gestation}
              onChangeText={this.onChangeText('gestation')}
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

            <ListItem
              title='Gender'
              titleStyle={styles.labelStyle}
              leftIcon={{ name: 'gender-male-female', type: 'material-community' }}
              rightTitle={ this.state.gender ? this.state.gender : 'N/A'}
              rightTitleStyle={styles.labelStyle}
              chevron
              onPress={() => this.props.navigation.navigate('ListPicker', {
                onChange: (value) => this.setState({gender: value}),
                items: [
                  {
                    label: 'boy',
                    value: 'boy',
                    default: this.state.gender === 'boy'
                  },
                  {
                    label: 'girl',
                    value: 'girl',
                    default: this.state.gender === 'girl'
                  }
                ]
              })}
            />

            <ListItem
              title='Nth Child'
              titleStyle={styles.labelStyle}
              leftIcon={{ name: 'infinity', type: 'material-community' }}
              rightTitle={ this.state.number ? this.state.number + '' : 'N/A'}
              rightTitleStyle={styles.labelStyle}
              chevron
              onPress={() => this.props.navigation.navigate('ListPicker', {
                onChange: (value) => this.setState({number: value}),
                items: [
                  {
                    label: '1',
                    value: '1',
                    default: this.state.number === '1'
                  },
                  {
                    label: '2',
                    value: '2',
                    default: this.state.number === '2'
                  },
                  {
                    label: '3',
                    value: '3',
                    default: this.state.number === '3'
                  },
                  {
                    label: '4',
                    value: '4',
                    default: this.state.number === '4'
                  },
                  {
                    label: '5',
                    value: '5',
                    default: this.state.number === '5'
                  }
                ]
              })}
            />
          </View>

        </ScrollView>
      </View>

    )
  }

  submit () {
    Keyboard.dismiss()
    this.props.saveInformation(this.state)
  }

  cancel () {
    const attributes = ['name', 'weight', 'height', 'head', 'gestation', 'birthDate', 'gender', 'number']

    for (let i = 0; i < attributes.length; i++) {
      if (this.props.baby[attributes[i]] != this.state[attributes[i]]) {
        Alert.alert(
          'Unsaved Data',
          'you have unsaved data, are you sure you want to leave?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => this.props.navigation.goBack()},
          ],
          { cancelable: false }
        )
        return
      }
    }

    this.props.navigation.goBack()
  }

}

const mapStateToProps = (state) => {
  const { baby } = state
  return {
    baby
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveInformation: (payload) => dispatch(BabyAction.saveInformation(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBabyInformation)
