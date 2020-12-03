import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { itemPackageDetailEntityEditScreen } from '../../../navigation/layouts'

import ItemPackageDetailActions from './item-package-details.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './item-package-details-entity-detail-screen-style'

class ItemPackageDetailEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getItemPackageDetail(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetItemPackageDetails()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete ItemPackageDetail?',
      'Are you sure you want to delete the ItemPackageDetail?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteItemPackageDetail(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.itemPackageDetail || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="itemPackageDetailDetailScrollView">
        <Text>ID: {this.props.itemPackageDetail.id}</Text>
        <Text testID="packageID">PackageID: {this.props.itemPackageDetail.packageID}</Text>
        <Text testID="rowID">RowID: {this.props.itemPackageDetail.rowID}</Text>
        <Text testID="code">Code: {this.props.itemPackageDetail.code}</Text>
        <Text testID="description">Description: {this.props.itemPackageDetail.description}</Text>
        <RoundedButton text="Edit" onPress={itemPackageDetailEntityEditScreen.bind(this, { entityId: this.props.itemPackageDetail.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    itemPackageDetail: state.itemPackageDetails.itemPackageDetail,
    fetching: state.itemPackageDetails.fetchingOne,
    deleting: state.itemPackageDetails.deleting,
    errorDeleting: state.itemPackageDetails.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getItemPackageDetail: (id) => dispatch(ItemPackageDetailActions.itemPackageDetailRequest(id)),
    getAllItemPackageDetails: (options) => dispatch(ItemPackageDetailActions.itemPackageDetailAllRequest(options)),
    deleteItemPackageDetail: (id) => dispatch(ItemPackageDetailActions.itemPackageDetailDeleteRequest(id)),
    resetItemPackageDetails: () => dispatch(ItemPackageDetailActions.itemPackageDetailReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPackageDetailEntityDetailScreen)
