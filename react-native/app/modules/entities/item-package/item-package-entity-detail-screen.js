import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { itemPackageEntityEditScreen } from '../../../navigation/layouts'

import ItemPackageActions from './item-package.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './item-package-entity-detail-screen-style'

class ItemPackageEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getItemPackage(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetItemPackages()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete ItemPackage?',
      'Are you sure you want to delete the ItemPackage?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteItemPackage(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.itemPackage || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="itemPackageDetailScrollView">
        <Text>ID: {this.props.itemPackage.id}</Text>
        <Text testID="packageID">PackageID: {this.props.itemPackage.packageID}</Text>
        <Text testID="code">Code: {this.props.itemPackage.code}</Text>
        <Text testID="description">Description: {this.props.itemPackage.description}</Text>
        <RoundedButton text="Edit" onPress={itemPackageEntityEditScreen.bind(this, { entityId: this.props.itemPackage.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    itemPackage: state.itemPackages.itemPackage,
    fetching: state.itemPackages.fetchingOne,
    deleting: state.itemPackages.deleting,
    errorDeleting: state.itemPackages.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getItemPackage: (id) => dispatch(ItemPackageActions.itemPackageRequest(id)),
    getAllItemPackages: (options) => dispatch(ItemPackageActions.itemPackageAllRequest(options)),
    deleteItemPackage: (id) => dispatch(ItemPackageActions.itemPackageDeleteRequest(id)),
    resetItemPackages: () => dispatch(ItemPackageActions.itemPackageReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPackageEntityDetailScreen)
