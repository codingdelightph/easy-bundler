import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import ItemPackageActions from './item-package.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { itemPackageEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './item-package-entity-edit-screen-style'

let Form = t.form.Form

class ItemPackageEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        packageID: t.maybe(t.Number),
        code: t.maybe(t.String),
        description: t.maybe(t.String),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          packageID: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('code').refs.input.focus(),
            testID: 'packageIDInput',
          },
          code: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('description').refs.input.focus(),
            testID: 'codeInput',
          },
          description: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'descriptionInput',
          },
        },
      },
      itemPackage: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getItemPackage(props.data.entityId)
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.itemPackage !== prevState.itemPackage && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.itemPackage), itemPackage: nextProps.itemPackage }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.itemPackage.id
        this.props.reset()
        this.props.getItemPackage(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: itemPackageEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  submitForm() {
    // call getValue() to get the values of the form
    const itemPackage = this.form.getValue()
    if (itemPackage) {
      // if validation fails, value will be null
      this.props.updateItemPackage(formValueToEntity(itemPackage))
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
        <KeyboardAwareScrollView testID="itemPackageEditScrollView">
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
    code: value.code || null,
    description: value.description || null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    packageID: value.packageID || null,
    code: value.code || null,
    description: value.description || null,
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    itemPackage: state.itemPackages.itemPackage,
    fetching: state.itemPackages.fetchingOne,
    updating: state.itemPackages.updating,
    error: state.itemPackages.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getItemPackage: (id) => dispatch(ItemPackageActions.itemPackageRequest(id)),
    getAllItemPackages: (options) => dispatch(ItemPackageActions.itemPackageAllRequest(options)),
    updateItemPackage: (itemPackage) => dispatch(ItemPackageActions.itemPackageUpdateRequest(itemPackage)),
    reset: () => dispatch(ItemPackageActions.itemPackageReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPackageEntityEditScreen)
