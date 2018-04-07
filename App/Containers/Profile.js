// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, View, Image, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

// Dependencies
import EditableImage from '../Components/EditableImage'
import ParentAction from '../Redux/ParentRedux'
import BabyAction from '../Redux/BabyRedux'

// Styles
import styles from './Styles/ProfileStyle'
import {Header} from 'react-native-elements'
import Colors from '../Themes/Colors'

class Profile extends Component {

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.dark)
    })
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  render () {
    const { mother, father, baby } = this.props
    const babyImage   = baby.image   ? {uri: baby.image.uri}   : require('../Images/Profile/3-3.jpg')
    const fatherImage = father.image ? {uri: father.image.uri} : require('../Images/Profile/3-1.jpg')
    const motherImage = mother.image ? {uri: mother.image.uri} : require('../Images/Profile/3-2.jpg')

    return (
      <View style={{flex: 1}}>

        <Header
          statusBarProps={{backgroundColor: Colors.dark}}
          backgroundColor={Colors.dark}
          centerComponent={{ text: 'PROFILE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'edit', color: '#fff', onPress: () => this.props.navigation.navigate('EditProfile') }}
        />

        <ScrollView
          style={styles.container}>
          <Image
            style={styles.backgroundImage}
            source={require('../Images/profile-background.jpg')} />

          <View
            style={styles.topContainer}>

            <View
              style={styles.imagesContainer}>

              {/* mother view */}
              <View
                style={styles.parentContainer}>
                <EditableImage
                  progress={mother.progress}
                  size={80}
                  style={styles.parentImage}
                  source={motherImage}
                  onPress={this.setMotherImage.bind(this)} />
                <Text
                  style={styles.parentText}>
                  {mother.name ? mother.name : 'Mother'}
                </Text>
              </View>

              {/* baby view */}
              <View
                style={styles.babyContainer}>
                <Text
                  style={styles.babyText}>
                  {baby.name ? baby.name : 'Baby'}
                </Text>
                <EditableImage
                  progress={baby.progress}
                  style={styles.babyImage}
                  size={120}
                  source={babyImage}
                  onPress={this.setBabyImage.bind(this)}
                />
              </View>

              {/* father view */}
              <View
                style={styles.parentContainer}>
                <EditableImage
                  progress={father.progress}
                  size={80}
                  style={styles.parentImage}
                  source={fatherImage}
                  onPress={this.setFatherImage.bind(this)}
                />
                <Text
                  style={styles.parentText}>
                  {father.name ? father.name : 'Father'}
                </Text>
              </View>
            </View>
            <Text
              style={styles.bottomText}>
              A child's love could simply be one of the most beautiful sounds in the world.
            </Text>
          </View>

          <View style={styles.bottomContainer}>
            { /* bottom container of profile */ }
          </View>

        </ScrollView>
      </View>
    )
  }

  setMotherImage (response) {
    if (response.data) {
      this.props.setMotherImage(response, this.props.mother.image, this.failure)
    }
  }

  setFatherImage (response) {
    if (response.data) {
      this.props.setFatherImage(response, this.props.father.image, this.failure)
    }
  }

  setBabyImage (response) {
    if (response.data) {
      this.props.setBabyImage(response, this.props.baby.image, this.failure)
    }
  }

  renderRightBarButton () {
    return (
      <Text style={styles.rightBarButtonText}>
        Edit <Icon name="edit" size={16} color="white"/>
      </Text>
    )
  }

  onPressRightBarButton () {
    const { navigation } = this.props
    navigation.navigate('EditProfile')
  }

  failure (error) {
    alert('something went wrong to upload image, please try again' + '\nReason: ' + error.message)
  }
}

Profile.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={20}
      name="user-circle"
      color={tintColor}
    />
  )
}

const mapStateToProps = (state) => {
  const { mother, father, baby } = state
  return {
    mother, father, baby
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFatherImage: (image, previousImage, failure) => dispatch(ParentAction.setFatherImage({image, previousImage, failure})),
    setMotherImage: (image, previousImage, failure) => dispatch(ParentAction.setMotherImage({image, previousImage, failure})),
    setBabyImage: (image, previousImage, failure) => dispatch(BabyAction.setImage({image, previousImage, failure})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
