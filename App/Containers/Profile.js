// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, View, Image, StatusBar } from 'react-native'


// Dependencies
import EditableImage from '../Components/EditableImage'
import ParentAction from '../Redux/ParentRedux'
import BabyAction from '../Redux/BabyRedux'

// Styles
import styles from './Styles/ProfileStyle'
import { Icon, ListItem} from 'react-native-elements'
import Colors from '../Themes/Colors'
import DailyStatHelper from "../Transform/DailyStatHelper";

class Profile extends Component {

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.primary)
    })
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  render () {
    const { mother, father, baby } = this.props
    const babyImage = baby.image ? {uri: baby.image.uri} : require('../Images/Profile/3-3.jpg')

    DailyStatHelper.getLastStatFor(this.props.stats, 'weight')

    const data = [
      {
        title: 'Height',
        icon: 'show-chart',
        value: `${DailyStatHelper.getLastStatFor(this.props.stats, 'height', '-')} cm`,
        rightSubtitle: DailyStatHelper.getLastDateFor(this.props.stats, 'height'),
        onPress: () => this.props.navigation.navigate('BabyHeight')
      },
      {
        title: 'Weight',
        icon: 'fitness-center',
        value: `${DailyStatHelper.getLastStatFor(this.props.stats, 'weight', '-')} gr`,
        rightSubtitle: DailyStatHelper.getLastDateFor(this.props.stats, 'weight'),
        onPress: () => this.props.navigation.navigate('BabyWeight')
      },
      {
        title: 'Head Circumference',
        icon: 'child-care',
        value: `${DailyStatHelper.getLastStatFor(this.props.stats, 'head', '-')} cm`,
        rightSubtitle: DailyStatHelper.getLastDateFor(this.props.stats, 'head'),
        onPress: () => this.props.navigation.navigate('BabyHead')
      },
    ]

    const parents =[
      {
        title: 'Father',
        avatar: require('../Images/Profile/3-1.jpg'),
        subtitle: 'Habib Shabani',
        type: 'father',
        onPress: () => this.props.navigation.navigate('EditFatherInformation')
      },
      {
        title: 'Mother',
        avatar: mother.image ? {uri: mother.image.uri} : require('../Images/Profile/3-2.jpg'),
        subtitle: 'Masume Shiri',
        type: 'mother',
        onPress: () => this.props.navigation.navigate('EditMotherInformation')
      }
    ]

    return (
      <ScrollView
        style={styles.container}>

        <StatusBar
          backgroundColor={Colors.secondary}
        />

        <View style={styles.topContainer}>
          <Image
            style={styles.backgroundImage}
            source={require('../Images/profile-background.png')} />

          <View style={styles.topWrapper}>

            <View style={styles.settingIcon}>
              <Icon
                name='settings'
                color='#fff'
                onPress={() => this.props.navigation.navigate('Settings')}
              />
            </View>

            <View
              style={styles.babyContainer}>
              <EditableImage
                progress={baby.progress}
                style={styles.babyImage}
                size={120}
                source={babyImage}
                onPress={this.setBabyImage.bind(this)}
              />
              <Text
                style={styles.title}>
                {baby.name ? baby.name : 'Baby'}
              </Text>
              <Text style={styles.description}>
                Your baby health is normal
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>

          <View style={styles.list}>
            <Text style={styles.listTitle}>
              baby Information
            </Text>
            <ListItem
              title='Baby Information'
              leftAvatar={{source: require('../Images/Profile/3-3.jpg')}}
              onPress={() => this.props.navigation.navigate('EditBabyInformation')}
              chevron
            />
          </View>

        </View>

        <View style={styles.bottomContainer}>

          <View style={styles.list}>
            <Text style={styles.listTitle}>
              Daily Information
            </Text>
            {
              data.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.title}
                  rightSubtitle={item.rightSubtitle}
                  leftIcon={{name: item.icon}}
                  rightTitle={item.value}
                  rightTitleStyle={styles.rightTitle}
                  onPress={item.onPress }
                  chevron
                />
              ))
            }
          </View>

        </View>

        <View style={styles.bottomContainer}>

          <View style={styles.list}>
            <Text style={styles.listTitle}>
              Parent Information
            </Text>
            {
              parents.map((item, i) => (
                <ListItem
                  scaleProps={{
                    friction: 90,
                    tension: 100,
                    activeScale: 0.95,
                  }}
                  key={i}
                  title={item.title}
                  onPress={item.onPress}
                  leftAvatar={{source: item.avatar}}
                  subtitle={item.subtitle}
                  chevron
                />
              ))
            }
          </View>

        </View>

      </ScrollView>
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

  failure (error) {
    alert('something went wrong to upload image, please try again' + '\nReason: ' + error.message)
  }
}

Profile.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={20}
      name="account-circle"
      color={tintColor}
    />
  )
}

const mapStateToProps = (state) => {
  const { mother, father, baby, dailyStats } = state
  return {
    mother, father, baby,
    stats: dailyStats.data
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
