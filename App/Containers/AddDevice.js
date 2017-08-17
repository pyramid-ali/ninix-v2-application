import React, { Component } from 'react'
import { ScrollView, Text, BackHandler, TouchableOpacity, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import Connector from '../Bluetooth/Connector'
import NinixDevice from '../Components/NinixDevice'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddDeviceStyle'
import Colors from '../Themes/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import NavigationBar from '../Components/NavigationBar'
import FoundedDeviceItem from '../Components/FoundedDeviceItem'

class AddDevice extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {

    this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null)
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render () {
    const data = [
      {key: 1, text: `NINIX 1 Demo`},
      {key: 2, text: 'NINIX 2'},
      {key: 3, text: 'NINIX 3'},
      {key: 4, text: `NINIX 1 Demo`},
      {key: 5, text: 'NINIX 2'},
      {key: 6, text: 'NINIX 3'},
      {key: 7, text: `NINIX 1 Demo`},
      {key: 8, text: 'NINIX 2'},
      {key: 9, text: 'NINIX 3'},
    ]
    return (
      <View style={{flex: 1}}>
        <NavigationBar
          style={styles.navBar}
          textStyle={styles.title}
          leftButton={this.renderLeftBarButton()}
          onPressLeftButton={() => alert('pressed')}
        >
          Add Device
        </NavigationBar>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <NinixDevice logo="Bluetooth is off" blink={false} lightColor={Colors.alert} />
          </View>
          <FlatList
            ItemSeparatorComponent={this.separatorComponent.bind(this)}
            ListHeaderComponent={this.listHeaderComponent.bind(this)}
            style={{flex: 1, backgroundColor: Colors.white}}
            data={data}
            renderItem={({item}) => this.renderItem(item)}
          />
        </View>
      </View>
    )
  }

  renderLeftBarButton() {
    return (
      <View style={styles.backButton}>
        <Icon style={styles.backButtonIcon} name="angle-left" size={22} color="white" />
        <Text style={styles.backButtonText}>Back</Text>
      </View>
    )
  }

  renderItem(item) {
    return (
      <FoundedDeviceItem text={item.text} />
    )
  }

  listHeaderComponent() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Founded Devices</Text>
      </View>
    )
  }

  separatorComponent() {
    return (
      <View style={styles.line} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddDevice)
