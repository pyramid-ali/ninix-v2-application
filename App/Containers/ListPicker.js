import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import {ListItem, Header} from 'react-native-elements'

// Styles
import styles from './Styles/ListPickerStyle'
import Colors from '../Themes/Colors';


class ListPicker extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {

    const { params } = this.props.navigation.state

    return (
      <View style={{flex: 1}}>
        <Header
          statusBarProps={{ backgroundColor: Colors.secondary }}
          backgroundColor={Colors.primary}
          leftComponent={{ icon: 'arrow-left', color: '#fff', type: 'material-community', onPress: () => this.props.navigation.goBack() }}
          centerComponent={{ text: 'Select One', style: { color: '#fff' } }}
        />

        <ScrollView style={styles.container}>

          { params.items.map((item, index) => {

            return (
              <ListItem
                key={index}
                title={item.label}
                titleStyle={styles.labelStyle}
                leftIcon={{ name: 'chevron-right', type: 'material-community' }}
                rightIcon={item.default ? {name: 'check', type: 'material-community', color: Colors.primary} : null}
                onPress={() => {
                  params.onChange(item.value)
                  this.props.navigation.goBack()
                }}
              />
            )


          })}

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

export default connect(mapStateToProps, mapDispatchToProps)(ListPicker)
