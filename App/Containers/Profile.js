import React, { Component } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

class Profile extends Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        size={20}
        name="user-circle"
        color={tintColor}
      />
    ),
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.informationContainer}>
          <Image style={styles.backgroundImage} source={require('../Images/profile-background.jpg')}>
            <View style={styles.overlay}>
              <View style={styles.navBar}>
                <Text style={styles.leftBarButton}></Text>
                <Text style={styles.title}>
                  Profile
                </Text>
                <Text style={styles.rightBarButton}>
                  Edit
                </Text>
              </View>
            </View>
          </Image>
        </View>
        <ScrollView style={styles.detailsContainer}>
          <View style={styles.summary}>
            <View style={styles.stat}>
              <Text style={[styles.statTitle, styles.statText]}>Age</Text>
              <Text style={[styles.statDetail, styles.statText]}>18 days</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statTitle, styles.statText]}>Weight</Text>
              <Text style={[styles.statDetail, styles.statText]}>3200 gr</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statTitle,styles.noBorder, styles.statText]}>Height</Text>
              <Text style={[styles.statDetail,styles.noBorder, styles.statText]}>56 cm</Text>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
