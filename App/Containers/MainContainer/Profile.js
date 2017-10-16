import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import NavigationBar from '../../Components/NavigationBar'

import ParentAction from '../../Redux/ParentRedux'
import BabyAction from '../../Redux/BabyRedux'
import Api from '../../Services/Api'
import { ImageInput } from '../../Models/ImageModel'

// Styles
import styles from '../Styles/ProfileStyle'
import EditableImage from '../../Components/EditableImage'


class Profile extends Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        size={20}
        name="user-circle"
        color={tintColor}
      />
    )
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {

  }

  render () {

    const { mother, father, baby } = this.props
    const babyImage = baby.image ? {uri: baby.image.uri} : require('../../Images/Profile/3-3.jpg')
    const fatherImage = father.image ? {uri: father.image.uri} : require('../../Images/Profile/3-1.jpg')
    const motherImage = mother.image ? {uri: mother.image.uri} : require('../../Images/Profile/3-2.jpg')

    return (
      <View style={{flex: 1}}>
        <NavigationBar
          style={styles.navBar}
          rightButton={this.renderRightBarButton()}
          onPressRightButton={this.onPressRightBarButton.bind(this)}
        >
          Profile
        </NavigationBar>
        <ScrollView style={styles.container}>
          <Image style={styles.backgroundImage} source={require('../../Images/profile-background.jpg')}>
            <View style={styles.topContainer}>

              <View style={styles.imagesContainer}>
                <View style={styles.parentContainer}>
                  <EditableImage
                    progress={mother.progress}
                    size={80}
                    style={styles.parentImage}
                    source={motherImage}
                    onPress={() => null}
                  />
                  <Text style={styles.parentText}>{mother.name ? mother.name : 'Mother'}</Text>
                </View>
                <View style={styles.babyContainer}>
                  <Text style={styles.babyText}>{baby.name ? baby.name : 'Baby'}</Text>
                  <EditableImage
                    progress={baby.progress}
                    style={styles.babyImage}
                    size={120}
                    source={babyImage}
                    onPress={() => null}
                  />
                </View>
                <View style={styles.parentContainer}>
                  <EditableImage
                    progress={father.progress}
                    size={80}
                    style={styles.parentImage}
                    source={fatherImage}
                    onPress={() => null}
                  />
                  <Text style={styles.parentText}>{father.name ? father.name : 'Father'}</Text>
                </View>
              </View>
              <Text style={styles.bottomText}>A child's love could simply be one of the most beautiful sounds in the world.</Text>
            </View>
          </Image>
          <View style={styles.bottomContainer}>
          </View>
        </ScrollView>
      </View>
    )
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

  calculateProgress (e) {
    return Math.round(e.loaded / e.total * 100)
  }

  failure (response) {
    const message = response.data ? response.data.message : response.problem
    alert('something went wrong to upload image, please try again' + '\nReason: ' + message)
  }
}

const mapStateToProps = (state) => {
  const { mother, father, baby } = state
  return {
    mother, father, baby
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
