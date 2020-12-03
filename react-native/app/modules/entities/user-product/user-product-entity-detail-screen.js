import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { userProductEntityEditScreen } from '../../../navigation/layouts'

import UserProductActions from './user-product.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './user-product-entity-detail-screen-style'

class UserProductEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getUserProduct(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetUserProducts()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete UserProduct?',
      'Are you sure you want to delete the UserProduct?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteUserProduct(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.userProduct || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="userProductDetailScrollView">
        <Text>ID: {this.props.userProduct.id}</Text>
        <Text testID="packageID">PackageID: {this.props.userProduct.packageID}</Text>
        <Text testID="imageUrl">ImageUrl: {this.props.userProduct.imageUrl}</Text>
        <Text testID="user">User: {this.props.userProduct.User}</Text>
        <RoundedButton text="Edit" onPress={userProductEntityEditScreen.bind(this, { entityId: this.props.userProduct.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userProduct: state.userProducts.userProduct,
    fetching: state.userProducts.fetchingOne,
    deleting: state.userProducts.deleting,
    errorDeleting: state.userProducts.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProduct: (id) => dispatch(UserProductActions.userProductRequest(id)),
    getAllUserProducts: (options) => dispatch(UserProductActions.userProductAllRequest(options)),
    deleteUserProduct: (id) => dispatch(UserProductActions.userProductDeleteRequest(id)),
    resetUserProducts: () => dispatch(UserProductActions.userProductReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProductEntityDetailScreen)
