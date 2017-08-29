import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import NavigationBar from '../../Components/NavigationBar'
import ImagePicker from 'react-native-image-picker'

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
    this.state = {
      babyImage: require('../../Images/Profile/3-3.jpg'),
      motherImage: require('../../Images/Profile/3-2.jpg'),
      fatherImage: require('../../Images/Profile/3-1.jpg'),

    }
  }

  render () {
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
                    size={80}
                    style={styles.parentImage}
                    source={this.state.motherImage}
                    onPress={this.showMotherImagePicker.bind(this)}
                  />
                  <Text style={styles.parentText}>Mother</Text>
                </View>
                <View style={styles.babyContainer}>
                  <Text style={styles.babyText}>Masht Mamad</Text>
                  <EditableImage
                    style={styles.babyImage}
                    size={120}
                    source={this.state.babyImage}
                    onPress={this.showBabyImagePicker.bind(this)}
                  />
                </View>
                <View style={styles.parentContainer}>
                  <EditableImage
                    size={80}
                    style={styles.parentImage}
                    source={this.state.fatherImage}
                    onPress={this.showFatherImagePicker.bind(this)}
                  />
                  <Text style={styles.parentText}>Father</Text>
                </View>
              </View>
              <Text style={styles.bottomText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
            </View>
          </Image>
          <View style={styles.bottomContainer}>
            <Text>Bottom</Text>
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

  showBabyImagePicker () {
    this.ShowImagePicker((response) => {
      let source = { uri: response.uri }
      this.setState({
        babyImage: source
      });
    })
  }

  showFatherImagePicker () {
    this.ShowImagePicker((response) => {
      let source = { uri: response.uri }
      this.setState({
        fatherImage: source
      });
    })
  }

  showMotherImagePicker () {
    this.ShowImagePicker((response) => {
      let source = { uri: response.uri }
      this.setState({
        motherImage: source
      });
    })
  }

  ShowImagePicker (callback) {
    ImagePicker.showImagePicker(options = null, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        callback(response)
      }
    })
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
