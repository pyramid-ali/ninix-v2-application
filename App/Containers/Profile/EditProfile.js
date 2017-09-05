import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from '../../Components/NavigationBar'
import Icon from 'react-native-vector-icons/FontAwesome'

// Styles
import styles from '../Styles/EditProfileStyle'




class EditProfile extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const { mother, father, baby } = this.props
    const data = [
      {
        key: 1,
        title: 'Father',
        text: father.name,
        image: father.image ? {uri: father.image} : require('../../Images/Profile/3-1.jpg'),
        type: 'father'
      },
      {
        key: 2,
        title: 'Mother',
        text: mother.name,
        image: mother.image ? {uri: mother.image} : require('../../Images/Profile/3-2.jpg'),
        type: 'mother'
      },
      {
        key: 3,
        title: 'Infant',
        text: baby.name,
        image: baby.image ? {uri: baby.image} : require('../../Images/Profile/3-3.jpg'),
        type: 'infant'
      }
    ]

    return (
      <View style={{flex: 1}}>
        <NavigationBar
          style={styles.navBar}
          leftButton={this.renderLeftBarButton()}
          onPressLeftButton={this.onPressLeftBarButton.bind(this)}
        >
          Edit Profile
        </NavigationBar>
        <View style={styles.container}>
          <FlatList
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            data={data}
            renderItem={this.renderItem.bind(this)}
          />
        </View>

      </View>
    )
  }

  renderLeftBarButton () {
    return (
      <Text style={styles.leftBarButtonText}>
        <Icon name="angle-left" size={15} /> Back
      </Text>
    )
  }

  renderItem (value) {
    const { item } = value

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemImageContainer}>
          <Image style={styles.itemImage} source={item.image} />
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemText}>{item.text}</Text>
        </View>
        <View style={styles.itemButtonContainer}>
          <TouchableOpacity onPress={() => {
            if (value.index === 2) {
              this.props.navigation.navigate('BabySettings')
            }
            else {
              this.props.navigation.navigate('ProfileSetting', {type: item.type})
            }
          }}>
            <Text style={styles.itemTextButton}>
              Edit <Icon name="angle-right" size={24} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  onPressLeftBarButton () {
    const { navigation } = this.props
    navigation.goBack()
  }
}



const mapStateToProps = (state) => {
  const { father, mother, baby } = state
  return {
    father,
    mother,
    baby
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
