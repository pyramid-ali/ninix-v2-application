import React, { Component } from 'react'
import { ScrollView, Text, View, StatusBar, DatePickerAndroid } from 'react-native'
import { connect } from 'react-redux'
import {Input, Icon, Header, ListItem} from 'react-native-elements'

// Styles
import styles from './Styles/EditBabyInformationStyle'
import Colors from '../Themes/Colors'

class EditBabyInformation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
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

  render () {
    return (
      <View style={{flex: 1}}>
        <Header
          statusBarProps={{ backgroundColor: Colors.secondary }}
          backgroundColor={Colors.primary}
          leftComponent={{ icon: 'clear', color: '#fff' }}
          centerComponent={{ text: 'Edit Information', style: { color: '#fff' } }}
          rightComponent={{ icon: 'check', color: '#fff' }}
        />

        <ScrollView style={styles.container}>

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>General Information</Text>
          </View>

          <View style={styles.section}>
            <Input
              placeholder='What is your baby name?'
              autoCapatilize
              label="name"
              labelStyle={styles.labelStyle}
              selectionColor={Colors.dark}
              containerStyle={{marginLeft: 15, marginVertical: 15}}
              placeholderTextColor={Colors.gray}
              inputStyle={{fontFamily: 'PoiretOne-Regular', padding: 0}}
              onFocus={() => this.setState({focus: true})}
              onBlur={() => this.setState({focus: false})}
              onChangeText={(text) => this.setState({name: text})}
              inputContainerStyle={[styles.inputContainer, {borderBottomColor: this.state.focus ? Colors.primary : Colors.gray}]}
              leftIcon={
                <Icon
                  type='material-community'
                  name='pencil-circle'
                  size={24}
                  color='black'
                />
              }
            />
          </View>

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>BirthDate Information</Text>
          </View>

          <View style={styles.section}>

            <Input
              placeholder='Weight in birthday?'
              autoCapatilize
              label="weight"
              labelStyle={styles.labelStyle}
              selectionColor={Colors.dark}
              containerStyle={{marginLeft: 15, marginVertical: 15}}
              placeholderTextColor={Colors.gray}
              inputStyle={{fontFamily: 'PoiretOne-Regular', padding: 0}}
              onFocus={() => this.setState({focus: true})}
              onBlur={() => this.setState({focus: false})}
              onChangeText={(text) => this.setState({name: text})}
              inputContainerStyle={[styles.inputContainer, {borderBottomColor: this.state.focus ? Colors.primary : Colors.gray}]}
              leftIcon={
                <Icon
                  type='material-community'
                  name='weight-kilogram'
                  size={24}
                  color='black'
                />
              }
              rightIcon={
                <Text style={styles.suffix}>gr
                </Text>
              }
            />

            <Input
              placeholder='Height in birthday?'
              autoCapatilize
              label="height"
              labelStyle={styles.labelStyle}
              selectionColor={Colors.dark}
              containerStyle={{marginLeft: 15, marginVertical: 15}}
              placeholderTextColor={Colors.gray}
              inputStyle={{fontFamily: 'PoiretOne-Regular', padding: 0}}
              onFocus={() => this.setState({focus: true})}
              onBlur={() => this.setState({focus: false})}
              onChangeText={(text) => this.setState({name: text})}
              inputContainerStyle={[styles.inputContainer, {borderBottomColor: this.state.focus ? Colors.primary : Colors.gray}]}
              leftIcon={
                <Icon
                  type='material-community'
                  name='trending-up'
                  size={24}
                  color='black'
                />
              }
              rightIcon={
                <Text style={styles.suffix}>cm</Text>
              }
            />

            <Input
              placeholder='Head in birthday?'
              autoCapatilize
              label="head"
              labelStyle={styles.labelStyle}
              selectionColor={Colors.dark}
              containerStyle={{marginLeft: 15, marginVertical: 15}}
              placeholderTextColor={Colors.gray}
              inputStyle={{fontFamily: 'PoiretOne-Regular', padding: 0}}
              onFocus={() => this.setState({focus: true})}
              onBlur={() => this.setState({focus: false})}
              onChangeText={(text) => this.setState({name: text})}
              inputContainerStyle={[styles.inputContainer, {borderBottomColor: this.state.focus ? Colors.primary : Colors.gray}]}
              leftIcon={
                <Icon
                  type='material-community'
                  name='face'
                  size={24}
                  color='black'
                />
              }
              rightIcon={
                <Text style={styles.suffix}>cm</Text>
              }
            />

            <Input
              placeholder="What is gestation year?"
              autoCapatilize
              label="gestation"
              labelStyle={styles.labelStyle}
              selectionColor={Colors.dark}
              containerStyle={{marginLeft: 15, marginVertical: 15}}
              placeholderTextColor={Colors.gray}
              inputStyle={{fontFamily: 'PoiretOne-Regular', padding: 0}}
              onFocus={() => this.setState({focus: true})}
              onBlur={() => this.setState({focus: false})}
              onChangeText={(text) => this.setState({name: text})}
              inputContainerStyle={[styles.inputContainer, {borderBottomColor: this.state.focus ? Colors.primary : Colors.gray}]}
              leftIcon={
                <Icon
                  type='material-community'
                  name='coins'
                  size={24}
                  color='black'
                />
              }
              rightIcon={
                <Text style={styles.suffix}>years old</Text>
              }
            />
          </View>

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
          </View>

          <View style={styles.section}>
            <ListItem
              title='Birth Date'
              rightTitle='2017-01-12'
              rightTitleStyle={styles.labelStyle}
              titleStyle={styles.labelStyle}
              leftIcon={{ name: 'cake-variant', type: 'material-community' }}
              chevron
              onPress={() => {
                try {

                  DatePickerAndroid.open({
                    // Use `new Date()` for current date.
                    // May 25 2020. Month 0 is January.
                    date: new Date(2020, 4, 25)
                  }).then((res) => console.tron.log(res))

                } catch ({code, message}) {
                  console.warn('Cannot open date picker', message);
                }
              }}
            />

            <ListItem
              title='Gender'
              titleStyle={styles.labelStyle}
              leftIcon={{ name: 'gender-male-female', type: 'material-community' }}
              rightTitle='boy'
              rightTitleStyle={styles.labelStyle}
              chevron
              onPress={() => this.props.navigation.navigate('ListPicker', {
                onChange: (value) => console.tron.log(value),
                items: [
                  {
                    label: 'male',
                    value: 0,
                    default: true
                  },
                  {
                    label: 'female',
                    value: 0
                  }
                ]
              })}
            />

            <ListItem
              title='Nth Child'
              titleStyle={styles.labelStyle}
              leftIcon={{ name: 'gender-male-female', type: 'material-community' }}
              rightTitle='2'
              rightTitleStyle={styles.labelStyle}
              chevron
              onPress={() => this.props.navigation.navigate('ListPicker', {
                onChange: (value) => console.tron.log(value),
                items: [
                  {
                    label: 1,
                    value: 1,
                  },
                  {
                    label: 2,
                    value: 2,
                    default: true
                  },
                  {
                    label: 3,
                    value: 3
                  },
                  {
                    label: 4,
                    value: 5
                  },
                  {
                    label: 6,
                    value: 7
                  }
                ]
              })}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditBabyInformation)
