import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { Header, Icon } from 'react-native-elements'

// Dependencies
import LineChart from "../Components/LineChart"
import { transformTemperature, transformRespiratory } from '../Transform/ArrayDataManipulate'

// Styles
import styles from './Styles/ChartsStyle'
import Colors from '../Themes/Colors'


class Charts extends Component {

  constructor (props) {
    super(props)
    this.state = {
      chart: 'temperature'
    }
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.secondary, true)
    })

  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  render() {

    return (
      <View style={{flex: 1}}>
        <Header
          statusBarProps={{backgroundColor: Colors.secondary}}
          backgroundColor={Colors.secondary}
          centerComponent={{ text: 'ANALYSIS', style: { color: '#fff' } }}
        />

        { this.renderContents() }

      </View>
    )
  }

  renderContents() {
    return this.props.isConnected ? this.renderCharts() : this.renderNoConnection()
  }

  renderCharts () {
    const temperatures = transformTemperature(this.props.stream)
    const respiratory = transformRespiratory(this.props.stream)
    console.tron.log({temperatures, respiratory})
    return (
      <View style={{flex: 1}}>
        { temperatures ?
          <LineChart
            title='Temperature'
            data={temperatures}
            formatLabel={value => `${value}˚C`}
          /> :
          null
        }
        { respiratory ?
          <LineChart
            title='Respiratory'
            data={respiratory}
            backgroundColor='#22c1c3'
            formatLabel={value => `${value}BPS`}
          /> :
          null
        }
      </View>

    )
  }

  renderNoConnection () {
    return (
      <View style={styles.textWrapper}>
        <Text style={styles.title}>No Connection</Text>
        <Icon type='material-community' name='bluetooth-off' size={60} />
        <Text style={styles.subtitle}>There is no connection between app and device, for viewing real time charts please connect to a ninix gadget</Text>
      </View>
    )
  }

}

Charts.navigationOptions = {
  tabBarLabel: 'Charts',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={20}
      name="show-chart"
      color={tintColor}
    />
  ),
}

const mapStateToProps = (state) => {
  const { data, bluetooth } = state
  return {
    stream: data.stream,
    isConnected: bluetooth.isConnected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Charts)
