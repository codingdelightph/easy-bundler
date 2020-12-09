import React, {Component} from 'react'
import { ScrollView, Text, Image, View, Platform, Button } from 'react-native'
import { DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen'
import { Navigation } from 'react-native-navigation'

import LearnMoreLinks from './learn-more-links.component.js'
import { Images } from '../../shared/themes'
import styles from './launch-screen.styles'
import SimpleImagePicker from './SimpleImagePicker';
import ImagePicker from 'react-native-image-picker';

export default class LaunchScreen extends React.Component {

  state = {
    photo: null,
  };
 
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
  }

  

  componentDidAppear() {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          enabled: true,
          visible: false,
        },
      },
    })
  }

  showSideMenu() {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    })
  }

  navigationButtonPressed({ buttonId }) {
    this.showSideMenu()
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({ photo: response });
        //console.log(this.state.photo);
      }
    });
  };

  render() {
    return (
      
      <View style={styles.mainContainer} testID="launchScreen">
         <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.centered}>
            <Image source={Images.logoJhipster} style={styles.logo} />
            <Text style={styles.welcomeText}>{'Welcome to your Ignite JHipster app. dfgdfgdfg'}</Text>
            <Button title="Add an avatar" onPress={()=>this.handleChoosePhoto()} /> 
            {this.state.photo && (
              <Image
                source={{ uri: this.state.photo.uri }}
                style={{ width: 300, height: 300 }}
              />
            )}  
         
          </View>
          <View style={styles.hairline} />
          {/* <Header /> */}
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            {Platform.OS === 'ios' ? null : (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step Zero</Text>
                <Text style={styles.sectionDescription}>
                  Run <Text style={styles.highlight}>adb reverse tcp:8080 tcp:8080</Text> to be able to connect to your JHipster backend
                  (Android only).
                </Text>
              </View>
            )}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>app/modules/home/launch-screen.js</Text> to change this screen and then come back to see
                your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </View>
    )
  }
}
