import React, { Component } from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import NavigationBar from '../../Components/NavigationBar'
import ImagePicker from 'react-native-image-picker'
import ParentAction from '../../Redux/ParentRedux'

// Styles
import styles from '../Styles/ProfileStyle'
import EditableImage from '../../Components/EditableImage'
import GrowthChart from '../GrowthChart'


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
    this.state = {
      babyImage: require('../../Images/Profile/3-3.jpg'),
      motherImage: mother.image ? {uri: mother.image} : require('../../Images/Profile/3-2.jpg'),
      fatherImage: father.image ? {uri: father.image} : require('../../Images/Profile/3-1.jpg'),
    }
  }

  render () {

    const { mother, father } = this.props

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
                  <Text style={styles.parentText}>{mother.name ? mother.name : 'Mother'}</Text>
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
                  <Text style={styles.parentText}>{father.name ? father.name : 'Father'}</Text>
                </View>
              </View>
              <Text style={styles.bottomText}>A child's love could simply be one of the most beautiful sounds in the world.</Text>
            </View>
          </Image>
          <View style={styles.bottomContainer}>
            <GrowthChart />
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
      })
      this.props.updateFatherImage({image: response.uri})
    })

  }

  showMotherImagePicker () {
    this.ShowImagePicker((response) => {
      let source = { uri: response.uri }
      this.setState({
        motherImage: source
      })
      this.props.updateMotherImage({image: response.uri})
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
  const { mother, father } = state
  return {
    mother, father
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFatherImage: (payload) => dispatch(ParentAction.updateFather(payload)),
    updateMotherImage: (payload) => dispatch(ParentAction.updateMother(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
