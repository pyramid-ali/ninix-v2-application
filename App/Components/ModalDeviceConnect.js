// Libraries
import React, { Component } from 'react'
import { View, Text, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

// Styles
import styles from './Styles/ModalDeviceConnectStyle'

export default class ModalDeviceConnect extends Component {

  render () {
    const {
      buttons,
      children,
      onRequestClose,
      title,
      visible,
    } = this.props
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose ? onRequestClose : () => {}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <View style={styles.header}>
              <Text style={styles.title}>
                {this.ucFirst(title)}
              </Text>
              <ActivityIndicator size={20} />
            </View>
            <View style={styles.content}>
              {children}
            </View>
            <View style={styles.buttonGroup}>
              {buttons ? buttons.map((button, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={button.onPress}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                      {button.text}
                    </Text>
                  </TouchableOpacity>
                )
              }) :
              null}
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  ucFirst(str: string)
  {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

ModalDeviceConnect.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.array),
  onRequestClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
}

ModalDeviceConnect.defaultProps = {
  onRequestClose: () => {}
}
