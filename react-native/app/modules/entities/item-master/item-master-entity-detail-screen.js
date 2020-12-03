import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { itemMasterEntityEditScreen } from '../../../navigation/layouts'

import ItemMasterActions from './item-master.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './item-master-entity-detail-screen-style'

class ItemMasterEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getItemMaster(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetItemMasters()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete ItemMaster?',
      'Are you sure you want to delete the ItemMaster?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteItemMaster(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.itemMaster || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="itemMasterDetailScrollView">
        <Text>ID: {this.props.itemMaster.id}</Text>
        <Text testID="code">Code: {this.props.itemMaster.code}</Text>
        <Text testID="description">Description: {this.props.itemMaster.description}</Text>
        <RoundedButton text="Edit" onPress={itemMasterEntityEditScreen.bind(this, { entityId: this.props.itemMaster.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    itemMaster: state.itemMasters.itemMaster,
    fetching: state.itemMasters.fetchingOne,
    deleting: state.itemMasters.deleting,
    errorDeleting: state.itemMasters.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getItemMaster: (id) => dispatch(ItemMasterActions.itemMasterRequest(id)),
    getAllItemMasters: (options) => dispatch(ItemMasterActions.itemMasterAllRequest(options)),
    deleteItemMaster: (id) => dispatch(ItemMasterActions.itemMasterDeleteRequest(id)),
    resetItemMasters: () => dispatch(ItemMasterActions.itemMasterReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemMasterEntityDetailScreen)
