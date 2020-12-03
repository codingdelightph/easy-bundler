import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import ItemPackageDetailActions from './item-package-details.reducer'
import ItemPackageActions from '../item-package/item-package.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { itemPackageDetailEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './item-package-details-entity-edit-screen-style'

let Form = t.form.Form

class ItemPackageDetailEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        packageID: t.maybe(t.Number),
        rowID: t.maybe(t.Number),
        code: t.maybe(t.String),
        description: t.maybe(t.String),
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
            onSubmitEditing: () => this.form.getComponent('rowID').refs.input.focus(),
            testID: 'packageIDInput',
          },
          rowID: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('code').refs.input.focus(),
            testID: 'rowIDInput',
          },
          code: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('description').refs.input.focus(),
            testID: 'codeInput',
          },
          description: {
            testID: 'descriptionInput',
          },
        },
      },
      itemPackageDetail: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getItemPackageDetail(props.data.entityId)
    }
    this.props.getAllItemPackages()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.itemPackageDetail !== prevState.itemPackageDetail && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.itemPackageDetail), itemPackageDetail: nextProps.itemPackageDetail }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.itemPackageDetail.id
        this.props.reset()
        this.props.getItemPackageDetail(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: itemPackageDetailEntityDetailScreen.bind(this, { entityId }),
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
    const itemPackageDetail = this.form.getValue()
    if (itemPackageDetail) {
      // if validation fails, value will be null
      this.props.updateItemPackageDetail(formValueToEntity(itemPackageDetail))
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
        <KeyboardAwareScrollView testID="itemPackageDetailEditScrollView">
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
    rowID: value.rowID || null,
    code: value.code || null,
    description: value.description || null,
    itemPackageId: value.itemPackage && value.itemPackage.id ? value.itemPackage.id : null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    packageID: value.packageID || null,
    rowID: value.rowID || null,
    code: value.code || null,
    description: value.description || null,
  }
  if (value.itemPackageId) {
    entity.itemPackage = { id: value.itemPackageId }
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    itemPackages: state.itemPackages.itemPackages || [],
    itemPackageDetail: state.itemPackageDetails.itemPackageDetail,
    fetching: state.itemPackageDetails.fetchingOne,
    updating: state.itemPackageDetails.updating,
    error: state.itemPackageDetails.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItemPackages: (options) => dispatch(ItemPackageActions.itemPackageAllRequest(options)),
    getItemPackageDetail: (id) => dispatch(ItemPackageDetailActions.itemPackageDetailRequest(id)),
    getAllItemPackageDetails: (options) => dispatch(ItemPackageDetailActions.itemPackageDetailAllRequest(options)),
    updateItemPackageDetail: (itemPackageDetail) => dispatch(ItemPackageDetailActions.itemPackageDetailUpdateRequest(itemPackageDetail)),
    reset: () => dispatch(ItemPackageDetailActions.itemPackageDetailReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPackageDetailEntityEditScreen)
