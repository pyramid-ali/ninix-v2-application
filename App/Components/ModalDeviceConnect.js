import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import styles from './Styles/ModalDeviceConnectStyle'

export default class ModalDeviceConnect extends Component {
  // Prop type warnings
  static propTypes = {
    visible: PropTypes.bool,
  }

  // Defaults for props
  static defaultProps = {
    visible: false,
    title: 'connecting...',
    children: <Text>Lorem Ipsum</Text>
  }

  render () {
    const { visible, title, children, buttons, onRequestClose } = this.props
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
