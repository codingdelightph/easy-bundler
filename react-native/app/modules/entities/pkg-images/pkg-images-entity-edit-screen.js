import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import PkgImageActions from './pkg-images.reducer'
import ItemPackageActions from '../item-package/item-package.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { pkgImageEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './pkg-images-entity-edit-screen-style'

let Form = t.form.Form

class PkgImageEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        packageID: t.maybe(t.Number),
        imageUrl: t.maybe(t.String),
        itemPackageId: this.getItemPackages(),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          itemPackageId: {
            testID: 'itemPackageIdInput',
            label: 'Pkg',
          },
          packageID: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('imageUrl').refs.input.focus(),
            testID: 'packageIDInput',
          },
          imageUrl: {
            testID: 'imageUrlInput',
          },
        },
      },
      pkgImage: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getPkgImage(props.data.entityId)
    }
    this.props.getAllItemPackages()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pkgImage !== prevState.pkgImage && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.pkgImage), pkgImage: nextProps.pkgImage }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.pkgImage.id
        this.props.reset()
        this.props.getPkgImage(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: pkgImageEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  getItemPackages = () => {
    const itemPackages = {}
    this.props.itemPackages.forEach((itemPackage) => {
      itemPackages[itemPackage.id] = itemPackage.id ? itemPackage.id.toString() : itemPackage.id.toString()
    })
    return t.maybe(t.enums(itemPackages))
  }
  submitForm() {
    // call getValue() to get the values of the form
    const pkgImage = this.form.getValue()
    if (pkgImage) {
      // if validation fails, value will be null
      this.props.updatePkgImage(formValueToEntity(pkgImage))
    }
  }

  formChange(newValue) {
    this.setState({
      formValue: newValue,
    })
  }

  render() {
    if (this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView testID="pkgImageEditScrollView">
          <Form
            ref={(c) => {
              this.form = c
            }}
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
        </KeyboardAwareScrollView>
        <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor="#99d9f4" testID="submitButton">
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {}
  }
  return {
    id: value.id || null,
    packageID: value.packageID || null,
    imageUrl: value.imageUrl || null,
    itemPackageId: value.itemPackage && value.itemPackage.id ? value.itemPackage.id : null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    packageID: value.packageID || null,
    imageUrl: value.imageUrl || null,
  }
  if (value.itemPackageId) {
    entity.itemPackage = { id: value.itemPackageId }
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    itemPackages: state.itemPackages.itemPackages || [],
    pkgImage: state.pkgImages.pkgImage,
    fetching: state.pkgImages.fetchingOne,
    updating: state.pkgImages.updating,
    error: state.pkgImages.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItemPackages: (options) => dispatch(ItemPackageActions.itemPackageAllRequest(options)),
    getPkgImage: (id) => dispatch(PkgImageActions.pkgImageRequest(id)),
    getAllPkgImages: (options) => dispatch(PkgImageActions.pkgImageAllRequest(options)),
    updatePkgImage: (pkgImage) => dispatch(PkgImageActions.pkgImageUpdateRequest(pkgImage)),
    reset: () => dispatch(PkgImageActions.pkgImageReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PkgImageEntityEditScreen)
