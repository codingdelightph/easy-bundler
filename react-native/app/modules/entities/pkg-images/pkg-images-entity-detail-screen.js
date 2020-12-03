import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { pkgImageEntityEditScreen } from '../../../navigation/layouts'

import PkgImageActions from './pkg-images.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './pkg-images-entity-detail-screen-style'

class PkgImageEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getPkgImage(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetPkgImages()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete PkgImage?',
      'Are you sure you want to delete the PkgImage?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deletePkgImage(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.pkgImage || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="pkgImageDetailScrollView">
        <Text>ID: {this.props.pkgImage.id}</Text>
        <Text testID="packageID">PackageID: {this.props.pkgImage.packageID}</Text>
        <Text testID="imageUrl">ImageUrl: {this.props.pkgImage.imageUrl}</Text>
        <RoundedButton text="Edit" onPress={pkgImageEntityEditScreen.bind(this, { entityId: this.props.pkgImage.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pkgImage: state.pkgImages.pkgImage,
    fetching: state.pkgImages.fetchingOne,
    deleting: state.pkgImages.deleting,
    errorDeleting: state.pkgImages.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPkgImage: (id) => dispatch(PkgImageActions.pkgImageRequest(id)),
    getAllPkgImages: (options) => dispatch(PkgImageActions.pkgImageAllRequest(options)),
    deletePkgImage: (id) => dispatch(PkgImageActions.pkgImageDeleteRequest(id)),
    resetPkgImages: () => dispatch(PkgImageActions.pkgImageReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PkgImageEntityDetailScreen)
