import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View, Button, Platform  } from 'react-native'
import { connect } from 'react-redux'
import UserProductActions from './user-product.reducer'
import UserActions from '../../../shared/reducers/user.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { userProductEntityDetailScreen } from '../../../navigation/layouts'
import t from 'tcomb-form-native'
import styles from './user-product-entity-edit-screen-style'
import ImagePicker from 'react-native-image-picker';

let Form = t.form.Form

class UserProductEntityEditScreen extends React.Component {
  
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        packageID: t.maybe(t.Number),
        imageUrl: t.maybe(t.String),
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
      userProduct: {},
      isNewEntity: true,
      photo: {},      
    }

    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getUserProduct(props.data.entityId)
    }
    this.props.getAllUsers()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userProduct !== prevState.userProduct && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.userProduct), userProduct: nextProps.userProduct }
    }
    return null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.userProduct.id
        this.props.reset()
        this.props.getUserProduct(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: userProductEntityDetailScreen.bind(this, { entityId }),
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
    const userProduct = this.form.getValue()
    if (userProduct) {
      // if validation fails, value will be null
      //this.props.updateUserProduct(formValueToEntity(this.state.imageUrl ,userProduct))
      const imgPath = this.state.imageUrl;
      const imgFileName = this.state.imageFileName
      
      const uploadData = new FormData();
      photo = this.state.photo
      const imgKey = userProduct.packageID + "_" + photo.fileName
      this.props.updateUserProduct(formValueToEntity(imgKey,userProduct))
      uploadData.append('file', {
        uri: photo.uri,
        name: imgKey,
        fileName: userProduct.packageID,
        fileKey: userProduct.packageID,
        type: 'img/png',
        uri:
          Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
      });
      uploadData.append('Content-Type', 'img/png');
      console.log(" userProduct.packageID " + imgKey)      
      this.props.updateUserProductImage(uploadData);
    } 
 }

 

  formChange(newValue) {
    //console.log("Form value ");
    this.setState({
      formValue: newValue,
    })
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    /**
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {        
        //this.setState(this.imageUrl = response.uri)
        //console.log(">>> Response:" + response)
        console.log(">>> Response Data:" + response.data)
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log(">>> Response:" + source)
        this.setState({ imageUrl: response.uri,
            imageFileName: response.fileName
         })        
        //console.log("ppp " + this.state.imageUrl)      
      }
    });
    */
    ImagePicker.showImagePicker({
      title:'Select an awesome picture',
      takePhotoButtonTitle:'Take a super pretty one !!',
      chooseFromLibraryButtonTitle:'really? and oldie ?'
    },response => {
      if(response.didCancel){
        console.log('user canceled')
      } else if (response.error){
        console.log(response.error)
      } else {
        //const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({ photo: response });
        //console.log(source)
  
      }
    })
       
  };

  buildFormData = async (imageUrl, productId) => {
    // Check if any file is selected or not
    let formData = new FormData();
    formData.append('file', {
      uri : imageUrl,
      name : productId,
      contentType : 'multipart/form-data',
    });
    console.log("buildFormData formData: " + formData.toString());
    return formData;
  };
  
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
        <KeyboardAwareScrollView testID="userProductEditScrollView">
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
        <Button title="Add an avatar" onPress={()=>this.handleChoosePhoto()} /> 
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
    userId: value.user && value.user.id ? value.user.id : null,
  }
}
const formValueToEntity = (imgName, value) => {
  console.log("formValueToEntity:" + imgName)  
  const entity = {
    id: value.id || null,
    packageID: value.packageID || null,
    imageUrl: imgName || null,
  }
  console.log("formValueToEntity:" + entity.imageUrl)
  if (value.userId) {
    entity.user = { id: value.userId }
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users || [],
    userProduct: state.userProducts.userProduct,
    fetching: state.userProducts.fetchingOne,
    updating: state.userProducts.updating,
    error: state.userProducts.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getUserProduct: (id) => dispatch(UserProductActions.userProductRequest(id)),
    getAllUserProducts: (options) => dispatch(UserProductActions.userProductAllRequest(options)),
    updateUserProduct: (userProduct) => dispatch(UserProductActions.userProductUpdateRequest(userProduct)),
    updateUserProductImage: (formData) => dispatch(UserProductActions.userProductUpdateImageRequest(formData)),
    reset: () => dispatch(UserProductActions.userProductReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProductEntityEditScreen)
