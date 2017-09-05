import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native'
import styles from './Styles/SettingListStyle'
import StringSetting from './Setting/StringSetting'
import BooleanSetting from './Setting/BooleanSetting'
import SliderSetting from './Setting/SliderSetting'
import ListSetting from './Setting/ListSettings'
import DateSetting from './Setting/DateSetting'

export default class SettingComponent extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  constructor(props) {
    super(props)
    this.settings = this.props.settings.map((setting) => {
      return {
        key: setting.key,
        value: setting.value
      }
    })
  }

  componentDidMount () {

  }

  render () {
    console.log('render')
    const { settings, style, ...props } = this.props
    return (
      <FlatList
        data={settings}
        style={[styles.container, style]}
        {...props}
        renderItem={(item) => this.renderItem(item)}
        ItemSeparatorComponent={this.separatorComponent}
      />
    )
  }

  renderItem (value) {
    const { item } = value
    const { type } = item
    switch (type) {
      case 'string':
        return this.renderStringItem(value)
      case 'boolean':
        return this.renderBooleanItem(value)
      case 'slider':
        return this.renderSliderItem(value)
      case 'list':
        return this.renderListItem(value)
      case 'date':
        return this.renderDateItem(value)
      default:
        return null
    }
  }

  separatorComponent () {
    return (
      <View style={styles.line} />
    )
  }


  /*
   * render Items
   */
  renderStringItem (itemContainer) {
    const { item, index } = itemContainer
    const { value, ...props } = item
    return (
      <StringSetting
        onChangeText={(text) => {
          this.onStringChange(text, index)
        }}
        {...props}
        defaultValue={value}
      />
    )
  }

  renderBooleanItem (value) {
    const { item, index } = value
    const current = this.settings[index]
    let currentValue = current.value

    return (
      <BooleanSetting
        onValueChange={(value) => {
          this.onBooleanChange(value, index)
        }}
        currentValue={currentValue}
        {...item}
      />
    )
  }

  renderSliderItem (value) {
    const { item, index } = value
    return (
      <SliderSetting
        {...item}
      />
    )
  }

  renderListItem (value) {
    const {index, item} = value
    const current = this.settings[index]
    let currentValue = current.value
    return (
      <ListSetting
        onSelect={(itemValue, itemIndex) => this.onChangeList(itemValue, itemIndex, index)}
        {...item}
        value={currentValue}
      />
    )
  }

  renderDateItem (value) {
    const {index, item} = value
    const current = this.settings[index]
    let currentValue = current.value
    return (
      <DateSetting
        title={item.title}
        value={currentValue}
        onChange={(year, month, day) => {
          this.onDateChange(new Date(year, month, day), index)
        }}
      />
    )
  }

  /*
   * set listener for value changes
   */
  onStringChange(text, index) {
    const currentSetting = this.settings[index]
    const settings = this.changeCurrentSetting({
      ...currentSetting,
      value: text
    }, index)

    this.didSettingsChanged(settings)
  }

  onBooleanChange (value, index) {

    const currentSetting = this.settings[index]
    const settings = this.changeCurrentSetting(
      {
        ...currentSetting,
        value: value
      }, index)

    this.didSettingsChanged(settings)
    this.forceUpdate()
  }

  onChangeList (itemValue, itemIndex, index) {
    const currentSetting = this.settings[index]
    const settings = this.changeCurrentSetting(
      {
        ...currentSetting,
        value: itemValue
      }, index)

    this.didSettingsChanged(settings)
    this.forceUpdate()
  }

  onSliderChange (value, index) {

  }

  onDateChange (value, index) {
    const currentSetting = this.settings[index]
    console.log(value, index, currentSetting, 'date setting')
    const settings = this.changeCurrentSetting(
      {
        ...currentSetting,
        value: value
      }, index)

    this.didSettingsChanged(settings)
    console.log(settings, 'date settings')
    this.forceUpdate()
  }

  changeCurrentSetting (currentSetting, index) {
    const settings = [
      ...this.settings.slice(0, index),
      currentSetting,
      ...this.settings.slice(index + 1, this.settings.length)
    ]
    return settings
  }

  didSettingsChanged (settings) {
    this.settings = settings
    this.props.onChange(this.settings)
  }
}
