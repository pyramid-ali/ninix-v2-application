import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import NavigationBar from '../../Components/NavigationBar'
import ImagePicker from 'react-native-image-picker'
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
    const { mother, father } = props
  }

  componentDidMount () {
    this.api = Api.createAuthorized()
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
                    onPress={this.showMotherImagePicker.bind(this)}
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
                    onPress={this.showBabyImagePicker.bind(this)}
                  />
                </View>
                <View style={styles.parentContainer}>
                  <EditableImage
                    progress={father.progress}
                    size={80}
                    style={styles.parentImage}
                    source={fatherImage}
                    onPress={this.showFatherImagePicker.bind(this)}
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

  showBabyImagePicker () {
    const currentImage = this.props.baby.image
    this.ShowImagePicker((image, data) => {
      this.props.updateBabyImage(image)
      this.api.uploadBabyImage(data, (e) => {
        this.props.setBabyImageProgress(this.calculateProgress(e))
      }).then( response => {
        this.props.setBabyImageProgress(null)
        if (!response.ok) {
          this.failure(response)
          this.props.updateBabyImage(currentImage)
        }
      })
    })
  }

  showFatherImagePicker () {
    const currentImage = this.props.father.image
    this.ShowImagePicker((image, data) => {
      this.props.updateFatherImage(image)
      this.api.uploadBabyImage(data, (e) => {
        this.props.setFatherImageProgress(this.calculateProgress(e))
      }).then( response => {
        this.props.setFatherImageProgress(null)
        if (!response.ok) {
          this.failure(response)
          this.props.updateFatherImage(currentImage)
        }
      })
    })

  }

  showMotherImagePicker () {
    const currentImage = this.props.mother.image
    this.ShowImagePicker((image, data) => {
      this.props.updateMotherImage(image)
      this.api.uploadBabyImage(data, (e) => {
        this.props.setMotherImageProgress(this.calculateProgress(e))
      }).then( response => {
        this.props.setMotherImageProgress(null)
        if (!response.ok) {
          this.failure(response)
          this.props.updateMotherImage(currentImage)
        }
      })
    })
  }

  ShowImagePicker (callback) {
    ImagePicker.showImagePicker(options = null, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        const data = ImageInput(response.uri, response.type, 'avatar')
        callback(response, data)
      }
    })
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
    updateFatherImage: (image) => dispatch(ParentAction.updateFatherWithoutSync({image})),
    setFatherImageProgress: (progress) => dispatch(ParentAction.updateFatherWithoutSync({progress})),
    updateMotherImage: (image) => dispatch(ParentAction.updateMotherWithoutSync({image})),
    setMotherImageProgress: (progress) => dispatch(ParentAction.updateMotherWithoutSync({progress})),
    updateBabyImage: (image) => dispatch(BabyAction.updateWithoutSync({image})),
    setBabyImageProgress: (progress) => dispatch(BabyAction.updateWithoutSync({progress})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
