import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
/* eslint-disable no-unused-vars */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {
  loginScreen,
  itemMasterEntityScreen,
  itemPackageEntityScreen,
  itemPackageDetailEntityScreen,
  pkgImageEntityScreen,
  userProductEntityScreen,
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/* eslint-enable */

import styles from './entities-screen.styles'

class EntitiesScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container} testID="entityScreenScrollList">
        <Text style={styles.centerText}>JHipster Entities will appear below</Text>
        <RoundedButton text="ItemMaster" onPress={itemMasterEntityScreen} testID="itemMasterEntityScreenButton" />
        <RoundedButton text="ItemPackage" onPress={itemPackageEntityScreen} testID="itemPackageEntityScreenButton" />
        <RoundedButton text="ItemPackageDetail" onPress={itemPackageDetailEntityScreen} testID="itemPackageDetailEntityScreenButton" />
        <RoundedButton text="PkgImage" onPress={pkgImageEntityScreen} testID="pkgImageEntityScreenButton" />
        <RoundedButton text="UserProduct" onPress={userProductEntityScreen} testID="userProductEntityScreenButton" />
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // for developer convenience
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesScreen)
