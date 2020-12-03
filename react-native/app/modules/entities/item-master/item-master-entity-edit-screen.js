import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import ItemMasterActions from './item-master.reducer'
import UserActions from '../../../shared/reducers/user.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { itemMasterEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './item-master-entity-edit-screen-style'

let Form = t.form.Form

class ItemMasterEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        code: t.maybe(t.String),
        description: t.maybe(t.String),
        userId: this.getUsers(),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          userId: {
            testID: 'userIdInput',
            label: 'User',
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
      itemMaster: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getItemMaster(props.data.entityId)
    }
    this.props.getAllUsers()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.itemMaster !== prevState.itemMaster && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.itemMaster), itemMaster: nextProps.itemMaster }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.itemMaster.id
        this.props.reset()
        this.props.getItemMaster(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: itemMasterEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  getUsers = () => {
    const users = {}
    this.props.users.forEach((user) => {
      users[user.id] = user.login ? user.login.toString() : user.id.toString()
    })
    return t.maybe(t.enums(users))
  }
  submitForm() {
    // call getValue() to get the values of the form
    const itemMaster = this.form.getValue()
    if (itemMaster) {
      // if validation fails, value will be null
      this.props.updateItemMaster(formValueToEntity(itemMaster))
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
        <KeyboardAwareScrollView testID="itemMasterEditScrollView">
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
    code: value.code || null,
    description: value.description || null,
    userId: value.user && value.user.id ? value.user.id : null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    code: value.code || null,
    description: value.description || null,
  }
  if (value.userId) {
    entity.user = { id: value.userId }
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users || [],
    itemMaster: state.itemMasters.itemMaster,
    fetching: state.itemMasters.fetchingOne,
    updating: state.itemMasters.updating,
    error: state.itemMasters.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getItemMaster: (id) => dispatch(ItemMasterActions.itemMasterRequest(id)),
    getAllItemMasters: (options) => dispatch(ItemMasterActions.itemMasterAllRequest(options)),
    updateItemMaster: (itemMaster) => dispatch(ItemMasterActions.itemMasterUpdateRequest(itemMaster)),
    reset: () => dispatch(ItemMasterActions.itemMasterReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemMasterEntityEditScreen)
